# Plan de Pruebas — Funeraria Aranzabal

> Sistema completo: Frontend Angular 21 + Backend FastAPI (CRUD) + API ML/IA (Predicciones + Extracción)
>
> Última actualización: Agosto 2026

---

## 1. Pre-requisitos y Configuración

### 1.1 URLs del Sistema (Desarrollo Local)

| Servicio | URL | Puerto |
|---|---|---|
| Frontend (dev) | `http://localhost:4200` | 4200 |
| Backend CRUD API | `http://localhost:8000` | 8000 |
| API ML/IA | `http://localhost:8001` | 8001 |

### 1.2 Credenciales de Prueba

| Rol | Usuario | Contraseña | Permisos |
|---|---|---|---|
| Administrador | `fabAdmin` | `265336aaaa` | Todos (26 permisos) |
| Trabajador | *(crear uno de prueba)* | *(definir)* | 12 permisos limitados |

### 1.3 Herramientas Necesarias

- Navegador (Opera GX / Chrome / Edge)
- Consola del navegador (F12) — para ver errores de red y logs
- PowerShell o terminal — para verificar puertos

### 1.4 Base de Datos

- PostgreSQL en Supabase
- Verificar conexión: `GET http://localhost:8000/` al backend debe retornar respuesta

### 1.5 Servicios que deben estar corriendo

```bash
# Backend CRUD (puerto 8000)
cd Funeraria_Inventario_Inteligente
venv\Scripts\python.exe -m uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

# ML/IA Backend (puerto 8001)
cd Funeraria_Aranzabal_modelo
venv\Scripts\python.exe -m uvicorn src.main:app --host 0.0.0.0 --port 8001 --reload

# Frontend (puerto 4200)
cd funeraria-frontend
ng serve
```

---

## 2. Autenticación y Seguridad

### 2.1 Login

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 2.1.1 | Login exitoso | Ingresar `fabAdmin` / `265336aaaa`, click "Ingresar" | Redirige a `/dashboard`. Se almacenan `token`, `loginTime`, `userId`, `roles`, `permisos` en `localStorage` |
| 2.1.2 | Login con usuario inexistente | Ingresar `noexiste` / `123456` | Muestra error: credenciales inválidas. NO redirige |
| 2.1.3 | Login con contraseña incorrecta | Ingresar `fabAdmin` / `wrongpass` | Muestra error: credenciales inválidas |
| 2.1.4 | Login con campos vacíos | No ingresar nada, intentar enviar | Botón deshabilitado |
| 2.1.5 | Login con username muy corto | Ingresar `ab` (< 3 caracteres) | Validación: mínimo 3 caracteres. Botón deshabilitado |
| 2.1.6 | Login con password muy corto | Ingresar `12345` (< 6 caracteres) | Validación: mínimo 6 caracteres. Botón deshabilitado |
| 2.1.7 | Toggle mostrar/ocultar contraseña | Click en ícono de ojo | La contraseña alterna entre visible y oculta |
| 2.1.8 | Mensaje de cuenta deshabilitada | Login con usuario `activo=false` | Backend retorna 403. Frontend muestra "La cuenta está desactivada" |
| 2.1.9 | Verificar estructura del token | Tras login exitoso, inspeccionar `localStorage` | `token` es JWT válido, `roles` es JSON array, `permisos` es JSON array |
| 2.1.10 | **SQL Injection en login** | Ingresar `' OR 1=1 --` en username | Login falla. Backend parametrizado, no vulnerable |
| 2.1.11 | **XSS en login** | Ingresar `<script>alert('xss')</script>` en username | Angular sanitiza. No se ejecuta script. Login falla normalmente |

### 2.2 JWT y Sesión

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 2.2.1 | Token en headers | Abrir consola → Network → hacer request | Header `Authorization: Bearer <token>` presente |
| 2.2.2 | Token expirado (8 horas) | Modificar `loginTime` a hace 9 horas, recargar | `authGuard` detecta expiración, limpia `localStorage`, redirige a `/login` |
| 2.2.3 | Sin token | Eliminar `token` de `localStorage`, recargar | `authGuard` redirige a `/login` |
| 2.2.4 | Token inválido | Poner string basura en `token`, recargar | Backend retorna 401. Interceptor limpia y redirige a `/login` |
| 2.2.5 | Logout | Click "Cerrar sesión" | Limpia todo `localStorage`, redirige a `/login` |
| 2.2.6 | Navegar a ruta protegida sin login | Abrir `http://localhost:4200/servicios` directamente | `authGuard` redirige a `/login` |

### 2.3 Interceptor HTTP

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 2.3.1 | Request con token válido | Login y navegar | Todas las requests incluyen `Authorization: Bearer` |
| 2.3.2 | Respuesta 401 automática | Mantener token expirado, listar servicios | Interceptor detecta 401 → limpia localStorage → redirige a `/login` |

---

## 3. RBAC — Control de Acceso por Roles

### 3.1 Role Guard (Rutas Admin)

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 3.1.1 | Admin accede a `/usuarios` | Login admin, navegar a `/usuarios` | Acceso permitido |
| 3.1.2 | Admin accede a `/roles` | Login admin, navegar a `/roles` | Acceso permitido |
| 3.1.3 | Trabajador accede a `/usuarios` | Login trabajador, navegar a `/usuarios` | Redirige a `/dashboard` |
| 3.1.4 | Trabajador por URL directa | Trabajador escribe `http://localhost:4200/usuarios` | Redirige a `/dashboard` |

### 3.2 Permiso Guard

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 3.2.1 | Admin accede a crear servicio | Login admin, `/servicios/crear` | Acceso permitido |
| 3.2.2 | Trabajador con permiso `servicios:crear` | Login trabajador con permiso, `/servicios/crear` | Acceso permitido |
| 3.2.3 | Trabajador sin permiso `servicios:crear` | Login trabajador sin permiso, `/servicios/crear` | Redirige a `/dashboard` |

### 3.3 Visibilidad del Sidebar

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 3.3.1 | Admin ve todo el sidebar | Login admin | Todos los menús visibles |
| 3.3.2 | Trabajador ve sidebar limitado | Login trabajador | NO ve: Usuarios, Roles |

---

## 4. Gestión de Usuarios (Solo Admin)

### 4.1 CRUD Usuarios

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 4.1.1 | Listar usuarios | Login admin, ir a `/usuarios` | Muestra tabla con usuarios y estado |
| 4.1.2 | Crear usuario nuevo | Crear `testUser01`, password `123456`, rol `Trabajador` | Usuario creado |
| 4.1.3 | Crear usuario con username duplicado | Intentar crear otro con `testUser01` | Error: "El nombre de usuario ya existe" |
| 4.1.4 | Editar usuario | Cambiar username | Actualizado |
| 4.1.5 | Desactivar usuario | Toggle de estado | Usuario inactivo. Login falla |
| 4.1.6 | Activar usuario | Toggle de inactivo | Vuelve a activo |
| 4.1.7 | Eliminar usuario | Click eliminar | Eliminado |

### 4.2 Validación de Formulario de Usuarios

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 4.2.1 | **Username con espacios** | `test user` | Rechazado: "Letras, números, puntos, guiones. Sin espacios ni signos especiales" |
| 4.2.2 | **Username con caracteres especiales** | `test@user#!` | Rechazado por pattern |
| 4.2.3 | **Username muy corto** | `ab` (< 3 chars) | Rechazado: mínimo 3 caracteres |
| 4.2.4 | **Password muy corta** | `12345` (< 6 chars) | Rechazado: mínimo 6 caracteres |
| 4.2.5 | **Password vacía** | (vacío) | Rechazado si es obligatorio |
| 4.2.6 | **Sin seleccionar rol** | role_id = 0 | Rechazado: "Todos los campos son requeridos" |

### 4.3 Protecciones de Usuario

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 4.3.1 | **No desactivarse a sí mismo** | Admin intenta desactivar su propio usuario | Error: "No puedes desactivar tu propio usuario" |
| 4.3.2 | **No desactivar último admin** | Solo 1 admin activo, intentar desactivarlo | Error: "No se puede desactivar el último administrador activo" |

### 4.4 Perfil Propio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 4.4.1 | Ver perfil | Login, ir a `/perfil` | Muestra username actual y roles |
| 4.4.2 | Cambiar username propio | Modificar username, guardar | Actualizado |
| 4.4.3 | Cambiar contraseña propia | Ingresar nueva contraseña | Contraseña cambiada. Login con la vieja falla |
| 4.4.4 | Confirmar contraseña no coincide | Ingresar contraseñas diferentes | Error: "Las contraseñas no coinciden" |

### 4.5 Validación de Perfil

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 4.5.1 | **Username muy corto** | `ab` | Rechazado: mínimo 3 caracteres |
| 4.5.2 | **Password muy corta** | `12345` | Rechazado: mínimo 6 caracteres |
| 4.5.3 | **Ambos campos vacíos** | Dejar todo vacío, intentar guardar | Toast: "Debes ingresar al menos un dato para actualizar" |
| 4.5.4 | **Password sin confirmar** | Ingresar password sin confirmar | Si se ingresa password, debe confirmarse |

---

## 5. Gestión de Roles

### 5.1 CRUD Roles

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 5.1.1 | Listar roles | Login admin, ir a `/roles` | Muestra roles existentes |
| 5.1.2 | Crear rol nuevo | Crear "Cajero" con permisos limitados | Rol creado |
| 5.1.3 | Eliminar rol propio | Intentar eliminar "Administrador" | Error: "No se pueden eliminar los roles base del sistema" |
| 5.1.4 | Eliminar rol creado | Eliminar "Cajero" | Rol eliminado |

### 5.2 Validación de Formulario de Roles

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 5.2.1 | **Nombre con caracteres especiales** | `Cajero@123` | Rechazado: "Solo letras, espacios y guiones" |
| 5.2.2 | **Nombre muy corto** | `Ca` (< 3 chars) | Rechazado: mínimo 3 caracteres |
| 5.2.3 | **Nombre vacío** | (vacío) | Rechazado |

---

## 6. Inventario: Ataúdes

### 6.1 CRUD Ataúdes

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 6.1.1 | Listar ataúdes | Ir a `/ataudes` | Muestra tabla con modelo, color, stock, estado |
| 6.1.2 | Filtrar por modelo | Escribir "Americano" | Filtra resultados |
| 6.1.3 | Crear ataúd | Modelo `Premium`, Color `Dorado`, Stock `5` | Ataud creado |
| 6.1.4 | Editar ataúd | Cambiar color | Cambios guardados |
| 6.1.5 | Activar/Desactivar | Toggle de estado | Estado cambia |

### 6.2 Validación de Formulario Ataúdes

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 6.2.1 | **Modelo con caracteres especiales** | `Ataud@Premium#!` | Rechazado: "Letras, números, espacios, guiones, puntos o comas" |
| 6.2.2 | **Modelo con solo números** | `12345` | Rechazado por pattern (debe empezar con letra) |
| 6.2.3 | **Modelo muy largo** | > 100 caracteres | Rechazado: maxlength=100 |
| 6.2.4 | **Modelo vacío** | (vacío) | Rechazado: minlength=1 |
| 6.2.5 | **Color con números** | `Negro123` | Rechazado: "Solo letras, espacios y guiones" |
| 6.2.6 | **Color con caracteres especiales** | `Negro@#$` | Rechazado por pattern |
| 6.2.7 | **Color vacío** | (vacío) | Rechazado: minlength=1 |
| 6.2.8 | **Stock negativo** | `-5` | Rechazado: "Solo números enteros positivos" |
| 6.2.9 | **Stock con decimales** | `5.5` | Rechazado por pattern `^[0-9]+$` |
| 6.2.10 | **Stock con letras** | `abc` | Rechazado por pattern |
| 6.2.11 | **Stock vacío (crear)** | (vacío) | Rechazado por pattern |

### 6.3 Gestión de Stock

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 6.3.1 | Agregar stock | Ingresar `+3` | Stock incrementa |
| 6.3.2 | Restar stock válido | Restar `2` de stock 8 | Stock = 6 |
| 6.3.3 | **Restar stock negativo** | Restar `10` de stock 6 | **Error 400**: stock no puede ser negativo |
| 6.3.4 | **Stock en cero** | Stock 0, restar 1 | **Error 400**: stock insuficiente |
| 6.3.5 | **Ajuste con texto** | Ingresar `abc` en ajuste | Rechazado: "Solo números enteros" |
| 6.3.6 | **Ajuste vacío** | No ingresar cantidad | Botón deshabilitado o error |

---

## 7. Inventario: Capillas

### 7.1 CRUD Capillas

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 7.1.1 | Listar capillas | Ir a `/capillas` | Muestra tabla |
| 7.1.2 | Crear capilla | Modelo "VIP", stock `3` | Capilla creada |
| 7.1.3 | Editar capilla | Modificar modelo | Guardado |

### 7.2 Validación de Formulario Capillas

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 7.2.1 | **Modelo con caracteres especiales** | `Capilla@VIP` | Rechazado por pattern |
| 7.2.2 | **Modelo vacío** | (vacío) | Rechazado |
| 7.2.3 | **Stock negativo** | `-3` | Rechazado |
| 7.2.4 | **Stock con letras** | `abc` | Rechazado |

### 7.3 Gestión de Stock

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 7.3.1 | Agregar stock | `+2` | Incrementa |
| 7.3.2 | Restar stock válido | Restar `1` | Decrementa |
| 7.3.3 | **Restar más de disponible** | Restar más del stock actual | **Error 400** |

---

## 8. Inventario: Vehículos

### 8.1 CRUD Vehículos

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 8.1.1 | Listar vehículos | Ir a `/vehiculos` | Muestra tabla |
| 8.1.2 | Crear vehículo | Tipo `auto` | Vehículo creado |
| 8.1.3 | Editar vehículo | Cambiar tipo | Guardado |
| 8.1.4 | Tipos disponibles | Verificar dropdown | Opciones: porta_ataud, porta_flores, mixto, auto, microbus |

### 8.2 Validación de Formulario Vehículos

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 8.2.1 | **Sin seleccionar tipo** | Dejar dropdown vacío, guardar | Rechazado: "Selecciona un tipo de vehículo" |
| 8.2.2 | **Tipo inválido** | (verificar que solo acepta los 5 tipos del enum) | Solo valores válidos aceptados |

---

## 9. Personas: Contratantes

### 9.1 CRUD Contratantes

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 9.1.1 | Listar contratantes | Ir a `/contratantes` | Muestra tabla |
| 9.1.2 | Filtrar por nombre | Escribir "Garcia" | Filtra |
| 9.1.3 | Filtrar por DNI | Ingresar `12345678` | Filtra |
| 9.1.4 | Editar contratante | Modificar teléfono | Guardado |

### 9.2 Validación de Formulario Contratantes

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 9.2.1 | **Nombre con caracteres especiales** | `Juan@Pedro#!` | Rechazado: "Solo letras, espacios y guiones" |
| 9.2.2 | **Nombre con números** | `Juan123` | Rechazado por pattern |
| 9.2.3 | **Nombre vacío** | (vacío) | Rechazado: required |
| 9.2.4 | **DNI con letras** | `1234567A` | Rechazado: "Debe ser exactamente 8 dígitos numéricos" |
| 9.2.5 | **DNI con menos de 8 dígitos** | `1234567` (7 dígitos) | Rechazado por pattern `^[0-9]{8}$` |
| 9.2.6 | **DNI con más de 8 dígitos** | `123456789` (9 dígitos) | Rechazado: maxlength=8 |
| 9.2.7 | **DNI vacío** | (vacío) | Rechazado |
| 9.2.8 | **Teléfono con letras** | `999abc777` | Rechazado: "Debe ser exactamente 9 dígitos numéricos" |
| 9.2.9 | **Teléfono con guiones** | `999-888-777` | Rechazado por pattern `^[0-9]{9}$` |
| 9.2.10 | **Teléfono con menos de 9 dígitos** | `1234567` (7 dígitos) | Rechazado |
| 9.2.11 | **Teléfono vacío** | (vacío) | Rechazado |

### 9.3 Integridad Referencial

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 9.3.1 | **No eliminar contratante con servicio** | Intentar eliminar contratante con servicios | Error: "No se puede eliminar, tiene servicios asociados" |
| 9.3.2 | Eliminar contratante huérfano | Eliminar sin servicios | Eliminado |

---

## 10. Personas: Fallecidos

### 10.1 CRUD Fallecidos

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 10.1.1 | Listar fallecidos | Ir a `/fallecidos` | Muestra tabla |
| 10.1.2 | Filtrar por nombre | Escribir "Lopez" | Filtra |
| 10.1.3 | Editar fallecido | Modificar nombre | Guardado |

### 10.2 Validación de Formulario Fallecidos

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 10.2.1 | **Nombre con caracteres especiales** | `Maria@Lopez` | Rechazado: "Solo letras, espacios y guiones" |
| 10.2.2 | **Nombre con números** | `Maria123` | Rechazado por pattern |
| 10.2.3 | **DNI con letras** | `8765432A` | Rechazado: "Debe ser exactamente 8 dígitos numéricos" |
| 10.2.4 | **DNI incorrecto** | `12345` (5 dígitos) | Rechazado por pattern |

### 10.3 Integridad Referencial

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 10.3.1 | **No eliminar fallecido con servicio** | Intentar eliminar vinculado a servicio | Error |
| 10.3.2 | Eliminar fallecido huérfano | Sin servicios | Eliminado |

---

## 11. Servicios Funerarios (Módulo Core)

> **Módulo más crítico.** Transacciones complejas, integridad referencial, gestión de stock.

### 11.1 Listar Servicios

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 11.1.1 | Listar servicios | Ir a `/servicios` | Tabla paginada |
| 11.1.2 | Filtrar por nombre contratante | Escribir nombre | Filtra |
| 11.1.3 | Filtrar por DNI | Ingresar 8 dígitos | Filtra |
| 11.1.4 | Filtrar por fecha | Seleccionar fecha | Filtra |

### 11.2 Crear Servicio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 11.2.1 | **Flujo feliz** | Verificar DNIs con RENIEC → completar campos → guardar | Servicio creado. Stock decrementado |
| 11.2.2 | **Verificar DNI fallecido** | DNI válido, click "Verificar" | RENIEC resuelve. Nombre auto-llenado |
| 11.2.3 | **DNI fallecido inválido** | DNI inexistente | Error RENIEC |
| 11.2.4 | **Sin verificar DNIs, guardar** | Llenar todo sin verificar DNI | Error: "Verifica el DNI con RENIEC" |
| 11.2.5 | **Dirección vacía** | No ingresar dirección | Error: campos requeridos |
| 11.2.6 | **Fecha pasada** | Seleccionar fecha de ayer | Error: "La fecha no puede ser anterior al día de hoy" |
| 11.2.7 | **Costo menor a S/ 100** | Ingresar `50` | Error: "El costo mínimo es S/ 100" |
| 11.2.8 | **Costo no múltiplo de 10** | Ingresar `115` | Error: "El costo debe variar en múltiplos de 10" |
| 11.2.9 | **Sin seleccionar capilla** | No elegir capilla | Formulario inválido |
| 11.2.10 | **Stock de ataúd agotado** | Seleccionar ataúd con stock 0 | Error: stock insuficiente |
| 11.2.11 | **Stock de capilla agotado** | Seleccionar capilla con stock 0 | Error: stock insuficiente |
| 11.2.12 | **Teléfono sin 9 dígitos** | Ingresar `1234567` | Formulario inválido |

### 11.3 Validación de Contenido Inválido en Servicios

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 11.3.1 | **Dirección con caracteres especiales** | `@#$%^&*()` | Rechazado: "Solo se permiten letras, números, espacios, comas y guiones" |
| 11.3.2 | **Dirección solo números** | `12345` | Rechazado: "debe contener al menos una letra" |
| 11.3.3 | **Dirección con scripts** | `<script>alert('xss')</script>` | Angular sanitiza. Rechazado por pattern |
| 11.3.4 | **Nombre fallecido con números** | `Juan123 Perez` | Rechazado: "Solo letras y espacios" |
| 11.3.5 | **Nombre contratante con @** | `Juan@Perez` | Rechazado por pattern |
| 11.3.6 | **DNI con puntos** | `12.345.678` | Rechazado: solo 8 dígitos, sin puntos |
| 11.3.7 | **DNI con espacios** | `1234 5678` | Rechazado por pattern |
| 11.3.8 | **Costo negativo** | `-100` | Rechazado: mínimo S/ 100 |
| 11.3.9 | **Costo con letras** | `abc` | Rechazado: no es número válido |
| 11.3.10 | **Costo decimales** | `150.50` | Verificar comportamiento (debería rechazar o redondear) |
| 11.3.11 | **Fecha en formato texto** | `mañana` | Input date no acepta texto |
| 11.3.12 | **Espacios al inicio/final** | `  Juan Perez  ` | Trim aplicado antes de enviar |

### 11.4 Editar Servicio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 11.4.1 | Editar servicio | Modificar dirección | Actualizado |
| 11.4.2 | **Cambiar ataúd** | Cambiar de A a B | Stock A restaurado, B decrementado |
| 11.4.3 | **Cambiar capilla** | Cambiar de X a Y | Stock X restaurado, Y decrementado |
| 11.4.4 | **Datos pre-cargados** | Abrir edición | Campos con datos actuales |

### 11.5 Eliminar Servicio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 11.5.1 | Eliminar servicio | Confirmar en diálogo | Eliminado. Stock restaurado |
| 11.5.2 | **Verificar restauración de stock** | Anotar stock → crear → eliminar | Stock vuelve al valor original |
| 11.5.3 | Cancelar eliminación | Click cancelar | NO se elimina |

---

## 12. Extracción IA (Contratos)

### 12.1 Pre-requisitos

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 12.1.1 | Verificar servicio IA | Ir a `/ia` | Ping a `/ia/task/test`. Si falla, banner "Servicio no disponible" |

### 12.2 Upload y Procesamiento

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 12.2.1 | **Subir imagen** | Seleccionar JPG/PNG | Imagen en cola, procesamiento automático |
| 12.2.2 | **Procesamiento exitoso** | Imagen clara | Estado "listo". Datos extraídos visibles |
| 12.2.3 | **Procesamiento con error** | Imagen borrosa | Estado "error" |
| 12.2.4 | **Reintentar** | Click "Reintentar" | Re-procesa |
| 12.2.5 | **Múltiples imágenes** | Subir 3+ archivos | Procesamiento secuencial |

### 12.3 Guardar desde IA

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 12.3.1 | **Guardar servicio** | Click "Guardar" | Servicio creado en backend |
| 12.3.2 | **Guardar con datos incompletos** | Sin dirección o fecha | Error: "Completa al menos la dirección y la fecha" |

---

## 13. Predicciones ML — Demanda Random Forest

> **Sistema actual:** Solo modelo Random Forest para predicción de demanda por categoría de ataúd.
> **Endpoint:** `POST http://localhost:8001/predictions/demanda`

### 13.1 Configuración de Predicción

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 13.1.1 | **Ir a predicciones** | Login, navegar a `/predicciones` | Página carga con título "Predicción de Demanda", campo de meses y checkbox |
| 13.1.2 | **Meses por defecto** | Verificar campo de meses | Valor inicial: 6 |
| 13.1.3 | **Ingresar meses válidos** | Ingresar `12` | Aceptado |
| 13.1.4 | **Ingresar 1 mes** | Ingresar `1` | Aceptado (mínimo) |
| 13.1.5 | **Ingresar 24 meses** | Ingresar `24` | Aceptado (máximo) |

### 13.2 Validación de Campo "Meses"

| # | Prueba | Input Inválido | Resultado Esperado |
|---|---|---|---|
| 13.2.1 | **Meses con letras** | `abc` | Rechazado: pattern `^[0-9]{1,2}$` |
| 13.2.2 | **Meses negativos** | `-5` | Rechazado por pattern |
| 13.2.3 | **Meses con decimales** | `6.5` | Rechazado por pattern |
| 13.2.4 | **Meses vacío** | (vacío) | El campo tiene valor por defecto 6 |
| 13.2.5 | **Meses > 99** | `100` (3 dígitos) | Rechazado: pattern `^[0-9]{1,2}$` solo acepta 1-2 dígitos |
| 13.2.6 | **Meses = 0** | `0` | Aceptado por pattern pero debería validar en backend (ge=1) |

### 13.3 Generar Predicción (Flujo Feliz)

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 13.3.1 | **Predicción a 6 meses** | Ingresar `6`, click "Calcular demanda" | Spinner → Gráfico de barras + Tabla de ingreso + Desglose por modelo |
| 13.3.2 | **Predicción a 10 meses** | Cambiar a `10`, calcular | Resultados diferentes a 6 meses (walk-forward iterativo) |
| 13.3.3 | **Predicción a 20 meses** | Cambiar a `20`, calcular | Resultados diferentes a 6 y 10 meses |
| 13.3.4 | **Verificar variación** | Comparar resultados de 6, 10 y 20 meses | Los montos totales y cantidades deben variar |
| 13.3.5 | **Gráfico de barras** | Visualizar después de calcular | Muestra 8 categorías: Americano, Biblia, Imperial, Lincoln, Madera, Otros, Principe, sin_ataud |
| 13.3.6 | **Tabla de ingreso esperado** | Revisar tabla | Columnas: Categoría, Cantidad predicha, Precio promedio, Monto esperado. Total al pie |
| 13.3.7 | **Desglose por modelo** | Revisar debajo de la tabla | Por cada categoría, sub-tabla con modelos específicos y cantidades |

### 13.4 Alertas de Reorden

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 13.4.1 | **Sin stock (sin checkbox)** | Calcular sin marcar checkbox | NO aparece sección de alertas (alertas_reorden = []) |
| 13.4.2 | **Con stock, sin alertas** | Marcar checkbox, calcular con stock suficiente | Aparece sección de alertas pero vacía o sin filas rojas |
| 13.4.3 | **Con stock, con alertas** | Marcar checkbox, calcular con stock bajo | Tabla de alertas: Categoría, Stock actual, Demanda predicha, Unidades a comprar |
| 13.4.4 | **Lógica de reorden** | Stock = 0, demanda = 1.4 | Alerta: unidades_a_comprar = 1.4 × 1.2 = 1.7 |
| 13.4.5 | **Stock suficiente** | Stock = 10, demanda = 1.4 | NO hay alerta (10 > 1.7) |

### 13.5 Comportamiento del Modelo

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 13.5.1 | **Predicciones no negativas** | Calcular con cualquier valor de meses | Todas las cantidades ≥ 0 |
| 13.5.2 | **Categorías consistentes** | Calcular múltiples veces | Las 8 categorías siempre aparecen |
| 13.5.3 | **Precios consistentes** | Verificar precios promedio | Mismos precios en cada cálculo (vienen de metadata) |
| 13.5.4 | **Monto total = suma de categorías** | Verificar | `monto_esperado_total` = suma de todos los `monto_esperado` |

### 13.6 Errores del Servicio ML

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 13.6.1 | **API ML apagada** | Apagar API ML, calcular demanda | Mensaje de error. La app NO crashea |
| 13.6.2 | **Error del modelo** | (verificar comportamiento con datos extremos) | Mensaje de error descriptivo |

### 13.7 Validación Backend ML

| # | Prueba | Input | Resultado Esperado |
|---|---|---|---|
| 13.7.1 | **meses = 0** | `{"meses": 0}` | Error 422: ge=1 |
| 13.7.2 | **meses > 24** | `{"meses": 25}` | Error 422: le=24 |
| 13.7.3 | **meses negativo** | `{"meses": -1}` | Error 422: ge=1 |
| 13.7.4 | **meses no numérico** | `{"meses": "abc"` | Error 422: tipo inválido |
| 13.7.5 | **stock_actual con valores negativos** | `{"stock_actual": {"Lincoln": -5}}` | Aceptado (el backend no valida negativos en stock_actual) |
| 13.7.6 | **stock_actual con categorías inválidas** | `{"stock_actual": {"FakeCategory": 10}}` | Aceptado sin error (no afecta predicción) |
| 13.7.7 | **Request vacío** | `{}` | Aceptado: meses default=6, stock_actual=None |
| 13.7.8 | **GET en vez de POST** | GET `/predictions/demanda` | 405 Method Not Allowed |

---

## 14. Casos Borde y Errores

### 14.1 Conectividad

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.1.1 | **Backend CRUD caído** | Apagar backend, intentar login | Error de conexión. App NO crashea |
| 14.1.2 | **API ML caída** | Apagar ML, ir a predicciones | Mensaje de error gracefully |
| 14.1.3 | **Ambos backends caídos** | Apagar ambos, login | Error de conexión visible |

### 14.2 Navegación

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.2.1 | **Ruta inexistente** | Navegar a `/rutaquenoexiste` | Redirige a `/dashboard` |
| 14.2.2 | **Recargar página protegida** | F5 en `/servicios` | Si token válido, mantiene. Si no, redirige a login |

### 14.3 Formularios — Contenido No Válido

| # | Prueba | Input | Resultado Esperado |
|---|---|---|---|
| 14.3.1 | **XSS en cualquier campo de texto** | `<script>alert('xss')</script>` | Angular sanitiza. No se ejecuta. Pattern rechaza |
| 14.3.2 | **SQL Injection en campos de texto** | `' OR 1=1 --` | Backend parametrizado. Login falla normalmente |
| 14.3.3 | **HTML injection** | `<img src=x onerror=alert(1)>` | Angular sanitiza el output |
| 14.3.4 | **Unicode/emoji en campos de nombre** | `Juan ñ áéíóú` | Aceptado (los patterns incluyen caracteres latinos) |
| 14.3.5 | **Emojis en campos de nombre** | `Juan 😀` | Rechazado por pattern |
| 14.3.6 | **Números en campo de nombre** | `Juan123` | Rechazado: pattern solo permite letras y espacios |
| 14.3.7 | **Espacios múltiples en nombre** | `Juan  Perez` | Trim o pattern rechaza (depende del componente) |
| 14.3.8 | **Caracteres de control** | `\n\t\r` en campos | Rechazados o filtrados |
| 14.3.9 | **Strings extremadamente largos** | > 200 caracteres en dirección | maxlength del input lo limita |
| 14.3.10 | **Campos solo espacios** | `     ` | Trim resulta en string vacío. Rechazado |

### 14.4 Seguridad

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.4.1 | **Token manipulado** | Modificar payload JWT en localStorage | Firma inválida. Backend rechaza 401 |
| 14.4.2 | **localStorage limpiado** | Borrar localStorage manualmente | authGuard redirige a login |
| 14.4.3 | **Permisos manipulados** | Agregar permisos falsos a localStorage | Backend valida permisos reales del JWT. Acceso denegado 403 |

### 14.5 Responsive / UI

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.5.1 | **Móvil (< 768px)** | Reducir ventana | Sidebar colapsa. Botón hamburguesa |
| 14.5.2 | **Tablet (768-1024px)** | Ventana media | Sidebar colapsado solo íconos |
| 14.5.3 | **Desktop (> 1024px)** | Ventana completa | Sidebar expandido |

### 14.6 Estado de Carga

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.6.1 | **Spinner al cargar** | Navegar a cualquier lista | Spinner visible |
| 14.6.2 | **Spinner al guardar** | Click guardar | Botón deshabilitado, spinner |
| 14.6.3 | **Doble click en guardar** | Click rápido múltiple | Solo una petición enviada |
| 14.6.4 | **Tabla vacía** | Listar sin datos | Mensaje "No hay registros" |

---

## 15. Pruebas de Integración End-to-End

### 15.1 Flujo: Crear Servicio → Verificar Stock → Eliminar

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 15.1.1 | **Ciclo de vida completo** | 1. Anotar stock ataúd A=5, capilla X=3 2. Crear servicio con A y X 3. Verificar stock: A=4, X=2 4. Eliminar servicio 5. Verificar stock: A=5, X=3 | Stock siempre consistente |
| 15.1.2 | **Múltiples servicios** | Crear 3 servicios con mismo ataúd | Stock decrementa 3 veces. Eliminar 1 → stock +1 |

### 15.2 Flujo: Predicción de Demanda

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 15.2.1 | **Predicción → Compra → Actualización** | 1. Predecir demanda 6 meses 2. Ver alertas de reorden 3. "Comprar" stock (ajustar manualmente) 4. Predecir de nuevo con checkbox 5. Alertas deben cambiar | Stock actualizado afecta alertas |
| 15.2.2 | **Cambiar meses recalcula** | Predecir con 6 meses, anotar Total. Cambiar a 12 meses, calcular. Comparar | Total diferente (walk-forward produce diferentes resultados) |

### 15.3 Flujo: Extracción IA → Servicio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 15.3.1 | **IA → Servicio** | 1. Subir imagen en `/ia` 2. Esperar procesamiento 3. Revisar datos 4. Guardar 5. Verificar en `/servicios` | Servicio creado con datos de la imagen |

### 15.4 Flujo: Login → CRUD → Logout

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 15.4.1 | **Sesión completa** | Login → Crear ataúd → Editar → Desactivar → Eliminar → Logout | Todo funciona. Sesión limpia |
| 15.4.2 | **Permisos en acción** | Login como trabajador sin permiso de crear → intentar crear servicio | Redirige a dashboard. No puede crear |

### 15.5 Sesiones Concurrentes

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 15.5.1 | **Dos pestañas, mismo usuario** | Abrir 2 pestañas, login en ambas | Ambas funcionan |
| 15.5.2 | **Dos usuarios diferentes** | Admin en pestaña 1, trabajador en pestaña 2 | Cada uno ve sus permisos |

### 15.6 Consistencia de Datos

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 15.6.1 | **Crear servicio, verificar fallecido** | Crear servicio con fallecido "Juan Perez" | Fallecido existe en BD con DNI correcto |
| 15.6.2 | **Crear servicio, verificar contratante** | Crear servicio con contratante DNI 12345678 | Contratante existe. Si ya existía, se reutiliza |
| 15.6.3 | **Eliminar servicio, verificar huérfanos** | Crear servicio → eliminar → buscar contratante | Contratante eliminado si no tiene otros servicios |

---

## 16. Checklist Pre-Build

- [ ] **Backend CRUD** corriendo en `http://localhost:8000`
- [ ] **API ML/IA** corriendo en `http://localhost:8001`
- [ ] **Frontend** corriendo en `http://localhost:4200`
- [ ] **Base de datos** con datos de prueba (ataúdes, capillas, vehículos con stock)
- [ ] **Credenciales** de admin funcionales
- [ ] **RENIEC API** con token válido
- [ ] **Variables de entorno** del frontend apuntando a URLs correctas
- [ ] **Sin errores en consola** del navegador al hacer login
- [ ] **Compilación exitosa**: `ng build` sin errores
- [ ] **CORS**: verificar que el backend acepta requests del frontend

---

## 17. Errores Comunes y Soluciones

| Error | Causa | Solución |
|---|---|---|
| `401 Unauthorized` en todas las requests | Token expirado o inexistente | Re-login. Verificar `authInterceptor` |
| `403 Forbidden` al acceder a ruta | Rol sin permisos suficientes | Verificar `roles` en localStorage y `roleGuard` |
| CORS error en consola | Backend no permite origen | Verificar CORS config en `main.py` |
| Spinner infinito | Request al backend no retorna | Verificar URL en `environment.ts` |
| Login redirige pero no muestra nada | Token guardado pero permisos no parseados | Verificar `roles` y `permisos` como JSON válido |
| RENIEC no resuelve DNI | Token de Decolecta expirado | Verificar `RENIEC_TOKEN` en `.env` |
| IA no procesa imagen | API ML apagada | Verificar `iaApiUrl` en `environment.ts` |
| Stock no se restaura al eliminar | Error en transacción | Verificar logs del backend |
| Predicción no cambia con diferentes meses | Bug walk-forward corregido | Verificar que `demanda_service.py` usa `mes`, `anio`, `t` en features |
| Predicción muestra mismos valores | Modelo RF ignora lags | Verificar que lags se propagan iterativamente |

---

> **Nota**: Este plan cubre pruebas manuales (navegador) y aspectos técnicos. Las pruebas en **negrita** son las más críticas. Las pruebas de la sección 13 (Predicciones ML) deben ejecutarse con los 3 servicios corriendo.
