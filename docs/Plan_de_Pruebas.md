# Plan de Pruebas — Funeraria Aranzabal

> Sistema completo: Frontend Angular 21 + Backend FastAPI + API ML/IA
>
> Última actualización: Agosto 2026

---

## 1. Pre-requisitos y Configuración

### 1.1 URLs del Sistema

| Servicio | URL | Puerto |
|---|---|---|
| Frontend (dev) | `http://localhost:4200` | 4200 |
| Backend API | `https://funeraria-inventario-inteligente-wv7g.onrender.com` | — |
| API ML/IA | `https://stuff-coordinates-caught-come.trycloudflare.com` | — |

### 1.2 Credenciales de Prueba

| Rol | Usuario | Contraseña | Permisos |
|---|---|---|---|
| Administrador | `fabAdmin` | `265336aaaa` | Todos (28 permisos) |
| Trabajador | *(crear uno de prueba)* | *(definir)* | 12 permisos limitados |

### 1.3 Herramientas Necesarias

- Navegador (Opera GX / Chrome / Edge)
- Consola del navegador (F12) — para ver errores de red y logs
- Postman o similar (opcional, para pruebas directas de API)

### 1.4 Base de Datos

- PostgreSQL en Supabase
- Verificar conexión: `GET /` al backend debe retornar `{"message":"Funcionando"}`

---

## 2. Autenticación y Seguridad

### 2.1 Login

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 2.1.1 | Login exitoso | Ingresar `fabAdmin` / `265336aaaa`, dar click en "Ingresar" | Redirige a `/dashboard`. Se almacenan `token`, `loginTime`, `userId`, `roles`, `permisos` en `localStorage` |
| 2.1.2 | Login con usuario inexistente | Ingresar `noexiste` / `123456` | Muestra error: credenciales inválidas. NO redirige |
| 2.1.3 | Login con contraseña incorrecta | Ingresar `fabAdmin` / `wrongpass` | Muestra error: credenciales inválidas |
| 2.1.4 | Login con campos vacíos | No ingresar nada, intentar enviar | Botón deshabilitado o muestra validación de campos requeridos |
| 2.1.5 | Login con username muy corto | Ingresar `ab` (< 3 caracteres) | Validación: mínimo 3 caracteres |
| 2.1.6 | Login con password muy corto | Ingresar `12345` (< 6 caracteres) | Validación: mínimo 6 caracteres |
| 2.1.7 | Toggle mostrar/ocultar contraseña | Click en ícono de ojo | La contraseña alterna entre visible y oculta |
| 2.1.8 | Mensaje de cuenta deshabilitada | Login con usuario `activo=false` | Backend retorna 403. Frontend muestra mensaje de cuenta deshabilitada |
| 2.1.9 | Verificar estructura del token | Tras login exitoso, inspeccionar `localStorage` | `token` es JWT válido, `roles` es JSON array, `permisos` es JSON array |

### 2.2 JWT y Sesión

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 2.2.1 | Token en headers | Abrir consola → pestaña Network → hacer cualquier request | Header `Authorization: Bearer <token>` presente en todas las peticiones API |
| 2.2.2 | Token expirado (8 horas) | Modificar `loginTime` en `localStorage` a hace 9 horas, recargar página | `authGuard` detecta expiración, limpia `localStorage`, redirige a `/login` |
| 2.2.3 | Token close a expirar | Modificar `loginTime` a hace 7h 59min, navegar | La sesión sigue activa. Al pasar 8h, se expira |
| 2.2.4 | Sin token | Eliminar `token` de `localStorage`, recargar | `authGuard` redirige a `/login` |
| 2.2.5 | Token inválido en localStorage | Poner un string basura en `token`, recargar | El backend retorna 401. El interceptor limpia `localStorage` y redirige a `/login` |
| 2.2.6 | Logout | Click en "Cerrar sesión" en el navbar | Limpia todo `localStorage`, redirige a `/login` |
| 2.2.7 | Navegar a ruta protegida sin login | Abrir directamente `http://localhost:4200/servicios` | `authGuard` redirige a `/login` |

### 2.3 Interceptor HTTP

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 2.3.1 | Request con token válido | Hacer login y navegar normalmente | Todas las requests incluyen `Authorization: Bearer` |
| 2.3.2 | Request sin token | Borrar token, intentar navegar a `/dashboard` | Request sale sin header Authorization. Si el endpoint requiere auth, retorna 401 |
| 2.3.3 | Respuesta 401 automática | Mantener token expirado, intentar listar servicios | Interceptor detecta 401 → limpia localStorage → redirige a `/login` |

---

## 3. RBAC — Control de Acceso por Roles

### 3.1 Role Guard (Rutas Admin)

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 3.1.1 | Admin accede a `/usuarios` | Login como `fabAdmin`, navegar a `/usuarios` | Acceso permitido, muestra lista de usuarios |
| 3.1.2 | Admin accede a `/roles` | Login como `fabAdmin`, navegar a `/roles` | Acceso permitido, muestra lista de roles |
| 3.1.3 | Trabajador accede a `/usuarios` | Login como trabajador, intentar navegar a `/usuarios` | Redirige a `/dashboard` |
| 3.1.3 | Trabajador accede a `/roles` | Login como trabajador, intentar navegar a `/roles` | Redirige a `/dashboard` |
| 3.1.4 | Trabajador accede directamente por URL | Trabajador escribe `http://localhost:4200/usuarios` en barra | Redirige a `/dashboard` |

### 3.2 Permiso Guard (Rutas con Permisos Específicos)

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 3.2.1 | Admin accede a crear servicio | Login admin, navegar a `/servicios/crear` | Acceso permitido |
| 3.2.2 | Trabajador con permiso `servicios:crear` accede | Login trabajador con ese permiso, navegar a `/servicios/crear` | Acceso permitido |
| 3.2.3 | Trabajador sin permiso intenta crear servicio | Login trabajador sin `servicios:crear`, navegar a `/servicios/crear` | Redirige a `/dashboard` |
| 3.2.4 | Trabajador sin permiso intenta editar servicio | Trabajador sin `servicios:actualizar`, navegar a `/servicios/editar/1` | Redirige a `/dashboard` |

### 3.3 Visibilidad del Sidebar

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 3.3.1 | Admin ve todo el sidebar | Login como admin | Todos los menús visibles: Servicios, Extracción, Inventario, Personas, Usuarios, Roles, Predicciones |
| 3.3.2 | Trabajador ve sidebar limitado | Login como trabajador | NO ve: Usuarios, Roles. Sí ve: Servicios, Inventario, Personas |
| 3.3.3 | Botón "Crear servicio" visible solo con permiso | Trabajador con `servicios:crear` | Botón "+" visible en lista de servicios |
| 3.3.4 | Botón "Crear servicio" oculto sin permiso | Trabajador sin `servicios:crear` | Botón NO visible |

---

## 4. Gestión de Usuarios (Solo Admin)

### 4.1 CRUD Usuarios

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 4.1.1 | Listar usuarios | Login admin, ir a `/usuarios` | Muestra tabla con todos los usuarios, incluyendo estado (activo/inactivo) |
| 4.1.2 | Crear usuario nuevo | Click "Crear", ingresar username `testUser01`, password `123456`, rol `Trabajador` | Usuario creado aparece en la lista |
| 4.1.3 | Crear usuario con username duplicado | Intentar crear otro con `testUser01` | Error: "El nombre de usuario ya existe" |
| 4.1.4 | Editar usuario — cambiar username | Seleccionar usuario, cambiar username a `testUser02` | Username actualizado |
| 4.1.5 | Editar usuario — cambiar contraseña | Seleccionar usuario, ingresar nueva contraseña | Contraseña cambiada (verificar con login) |
| 4.1.6 | Editar usuario — cambiar rol | Cambiar rol de `Trabajador` a `Administrador` | Rol actualizado, permisos cambian |
| 4.1.7 | Desactivar usuario | Click toggle de estado de un usuario activo | Usuario queda inactivo. Al intentar login con ese usuario, falla |
| 4.1.8 | Activar usuario | Click toggle de un usuario inactivo | Usuario vuelve a estar activo |
| 4.1.9 | Eliminar usuario | Click eliminar en un usuario | Usuario eliminado de la lista |

### 4.2 Protecciones de Usuario

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 4.2.1 | **No desactivarse a sí mismo** | Login admin, intentar desactivar su propio usuario | Error: "No puedes desactivar tu propio usuario" |
| 4.2.2 | **No desactivar último admin** | Si solo hay 1 admin activo, intentar desactivarlo | Error: "No se puede desactivar el último administrador activo" |
| 4.2.3 | Desactivar admin habiendo otros admins | Haber 2+ admins, desactivar uno de ellos | Permitido, se desactiva |

### 4.3 Perfil Propio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 4.3.1 | Ver perfil | Login, ir a `/perfil` | Muestra username actual (decodificado del JWT) y roles |
| 4.3.2 | Cambiar username propio | Modificar username, guardar | Username actualizado. Verificar que el JWT se actualiza |
| 4.3.3 | Cambiar contraseña propia | Ingresar nueva contraseña, confirmar | Contraseña cambiada. Verificar que el login con la vieja falla |
| 4.3.4 | Confirmar contraseña no coincide | Ingresar contraseñas diferentes | Error de validación: contraseñas no coinciden |

---

## 5. Gestión de Roles

### 5.1 CRUD Roles

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 5.1.1 | Listar roles | Login admin, ir a `/roles` | Muestra roles existentes (Administrador, Trabajador) con sus permisos |
| 5.1.2 | Crear rol nuevo | Crear rol "Cajero" con permisos limitados | Rol creado aparece en la lista |
| 5.1.3 | Crear rol con permisos | Seleccionar checkboxes de permisos específicos | Permisos asignados correctamente |
| 5.1.4 | Eliminar rol propio | Intentar eliminar el rol "Administrador" | Error: "No se pueden eliminar los roles base del sistema" |
| 5.1.5 | Eliminar rol asignado | Intentar eliminar un rol que tiene usuarios asignados | Verificar comportamiento (puede dar error o permitir) |
| 5.1.6 | Eliminar rol no asignado | Eliminar el rol "Cajero" creado en 5.1.2 | Rol eliminado |

### 5.2 Permisos Disponibles

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 5.2.1 | Listar permisos | Click en "Ver permisos" o similar | Muestra los 28 permisos del sistema (excluyendo `usuarios:*`) |
| 5.2.2 | Permisos agrupados | Visualizar permisos | Agrupados por módulo: servicios, ataudes, capillas, vehiculos, fallecidos, contratantes, roles |

---

## 6. Inventario: Ataúdes

### 6.1 CRUD Ataúdes

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 6.1.1 | Listar ataúdes | Ir a `/ataudes` | Muestra tabla con modelo, color, stock, estado |
| 6.1.2 | Filtrar por modelo | Escribir "Americano" en filtro de modelo | Filtra resultados que contengan "Americano" |
| 6.1.3 | Filtrar por color | Escribir "Negro" en filtro de color | Filtra resultados |
| 6.1.4 | Filtrar por stock | Ingresar número en filtro de stock | Filtra por stock exacto |
| 6.1.5 | Crear ataúd | Click "Crear", ingresar modelo `Ataud Premium`, color `Dorado`, stock `5` | Ataud creado aparece en la lista |
| 6.1.6 | Editar ataúd | Modificar color de "Dorado" a "Blanco" | Cambios guardados |
| 6.1.7 | Activar/Desactivar ataúd | Toggle de estado | Ataud cambia de activo a inactivo y viceversa |

### 6.2 Gestión de Stock

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 6.2.1 | Agregar stock | Click en gestión de stock, ingresar cantidad `+3` | Stock incrementa. Ej: de 5 pasa a 8 |
| 6.2.2 | Restar stock válido | Restar `2` de un stock de 8 | Stock decrementa a 6 |
| 6.2.3 | **Restar stock negativo** | Intentar restar `10` de un stock de 6 | **Error 400**: "El stock no puede ser negativo". Stock se queda en 6 |
| 6.2.4 | Stock en cero | Stock actual es 0, intentar restar 1 | **Error 400**: stock insuficiente |
| 6.2.5 | Stock exacto | Stock es 5, restar exactamente 5 | Stock queda en 0. Permitido |

### 6.3 Integridad — Ataúd en Uso

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 6.3.1 | Desactivar ataúd asignado a servicio activo | Desactivar un ataúd que está en un servicio | Verificar comportamiento: puede dar error o permitir (el servicio ya tiene el ID) |
| 6.3.2 | Eliminar ataúd asignado | Intentar eliminar un ataúd con servicios asociados | Error de integridad referencial |

---

## 7. Inventario: Capillas

### 7.1 CRUD Capillas

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 7.1.1 | Listar capillas | Ir a `/capillas` | Muestra tabla con modelo, stock, estado |
| 7.1.2 | Filtrar por modelo | Escribir "Americana" en filtro | Filtra resultados |
| 7.1.3 | Crear capilla | Crear "Capilla VIP", stock `3` | Capilla creada |
| 7.1.4 | Editar capilla | Modificar modelo | Cambios guardados |
| 7.1.5 | Activar/Desactivar capilla | Toggle de estado | Estado cambia |

### 7.2 Gestión de Stock

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 7.2.1 | Agregar stock | Stock `+2` | Stock incrementa |
| 7.2.2 | Restar stock válido | Restar `1` | Stock decrementa |
| 7.2.3 | **Restar stock negativo** | Intentar restar más de lo disponible | **Error 400**: stock no puede ser negativo |

---

## 8. Inventario: Vehículos

### 8.1 CRUD Vehículos

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 8.1.1 | Listar vehículos | Ir a `/vehiculos` | Muestra tabla con tipo, estado |
| 8.1.2 | Filtrar por tipo | Seleccionar "Porta ataúd" | Filtra resultados |
| 8.1.3 | Crear vehículo | Crear vehículo tipo `auto` | Vehículo creado |
| 8.1.4 | Editar vehículo | Modificar tipo | Cambios guardados |
| 8.1.5 | Activar/Desactivar vehículo | Toggle de estado | Estado cambia |
| 8.1.6 | Tipos disponibles | Verificar dropdown de tipos | Opciones: porta_ataud, porta_flores, mixto, auto, microbus |

---

## 9. Personas: Contratantes

### 9.1 CRUD Contratantes

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 9.1.1 | Listar contratantes | Ir a `/contratantes` | Muestra tabla con nombre, DNI, teléfono, estado |
| 9.1.2 | Filtrar por nombre | Escribir "Garcia" | Filtra resultados que contengan "Garcia" |
| 9.1.3 | Filtrar por DNI | Ingresar `12345678` | Filtra por DNI exacto |
| 9.1.4 | Editar contratante | Modificar teléfono | Cambios guardados |
| 9.1.5 | Activar/Desactivar contratante | Toggle de estado | Estado cambia |

### 9.2 Integridad Referencial

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 9.2.1 | **No eliminar contratante con servicio activo** | Intentar eliminar contratante que tiene servicios | **Error**: "No se puede eliminar, tiene servicios asociados" |
| 9.2.2 | Eliminar contratante sin servicios | Eliminar contratante huérfano | Eliminado exitosamente |
| 9.2.3 | Eliminar contratante cuyo servicio fue eliminado | Crear servicio → eliminar servicio → intentar eliminar contratante | Si el servicio fue eliminado, el contratante puede ser eliminado (si no tiene otros servicios) |

---

## 10. Personas: Fallecidos

### 10.1 CRUD Fallecidos

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 10.1.1 | Listar fallecidos | Ir a `/fallecidos` | Muestra tabla con nombre, DNI, estado |
| 10.1.2 | Filtrar por nombre | Escribir "Lopez" | Filtra resultados |
| 10.1.3 | Filtrar por DNI fallecido | Ingresar `87654321` | Filtra por DNI |
| 10.1.4 | Editar fallecido | Modificar nombre | Cambios guardados |
| 10.1.5 | Activar/Desactivar fallecido | Toggle de estado | Estado cambia |

### 10.2 Integridad Referencial

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 10.2.1 | **No eliminar fallecido con servicio activo** | Intentar eliminar fallecido vinculado a servicio | **Error**: "No se puede eliminar, está asociado a un servicio" |
| 10.2.2 | Eliminar fallecido huérfano | Eliminar fallecido sin servicios | Eliminado exitosamente |

---

## 11. Servicios Funerarios (Módulo Core)

> **Este es el módulo más crítico del sistema.** Maneja transacciones complejas, integridad referencial, y gestión de stock.

### 11.1 Listar Servicios

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 11.1.1 | Listar servicios | Ir a `/servicios` | Muestra tabla paginada con fecha, contratante, fallecido, costo |
| 11.1.2 | Paginación | Si hay >20 servicios, click en siguiente página | Cambia de página |
| 11.1.3 | Filtrar por nombre contratante | Escribir nombre | Filtra resultados |
| 11.1.4 | Filtrar por DNI contratante | Ingresar 8 dígitos | Filtra por DNI |
| 11.1.5 | Filtrar por DNI fallecido | Ingresar 8 dígitos | Filtra por DNI del fallecido |
| 11.1.6 | Filtrar por fecha | Seleccionar fecha | Filtra servicios de esa fecha |
| 11.1.7 | Filtros combinados | Aplicar nombre + fecha | Filtra por ambas condiciones |

### 11.2 Crear Servicio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 11.2.1 | **Crear servicio completo (flujo feliz)** | 1. Ir a `/servicios/crear` 2. Verificar DNI fallecido con RENIEC 3. Verificar DNI contratante con RENIEC 4. Completar dirección, fecha, capilla, ataúd (opcional), vehículos, costo 5. Guardar | Servicio creado. Redirige a `/servicios`. Stock de ataúd y capilla decrementados |
| 11.2.2 | **Verificar DNI fallecido** | Ingresar DNI válido (8 dígitos), click "Verificar" | Llama a RENIEC API. Nombre se auto-llena. Checkmark de verificado |
| 11.2.3 | **DNI fallecido inválido** | Ingresar DNI inexistente o con error | Error: "DNI no encontrado en RENIEC". Nombre queda vacío |
| 11.2.4 | **DNI fallecido con menos de 8 dígitos** | Ingresar solo 7 dígitos | Error de validación: "Ingresa un DNI válido de 8 dígitos" |
| 11.2.5 | **Verificar DNI contratante** | Mismo flujo que fallecido | Nombre auto-llenado, checkmark |
| 11.2.6 | **Cambiar DNI después de verificar** | Verificar DNI, luego modificar un dígito | Se pierde la verificación. Nombre se limpia. Debe verificar de nuevo |
| 11.2.7 | **Sin verificar DNIs, intentar guardar** | Llenar todo pero no verificar DNIs | **Error**: "Verifica el DNI del Fallecido/Contratante con RENIEC antes de continuar" |
| 11.2.8 | **Dirección vacía** | No ingresar dirección | **Error**: "Completa los campos requeridos: dirección, fecha y capilla" |
| 11.2.9 | **Dirección con caracteres inválidos** | Ingresar `@#$%^&*()` | **Error**: "La dirección contiene caracteres no permitidos" |
| 11.2.10 | **Fecha pasada** | Seleccionar fecha de ayer | **Error**: "La fecha del servicio no puede ser anterior al día de hoy" |
| 11.2.11 | **Costo menor a S/ 100** | Ingresar `50` | **Error**: "El costo mínimo es S/ 100" |
| 11.2.12 | **Costo no múltiplo de 10** | Ingresar `115` | **Error**: "El costo debe variar en múltiplos de 10" |
| 11.2.13 | **Costo válido** | Ingresar `150` | Sin error, costo aceptado |
| 11.2.14 | **Sin seleccionar capilla** | No elegir capilla del dropdown | Formulario inválido, no permite guardar |
| 11.2.15 | **Seleccionar ataúd (opcional)** | Elegir ataúd del dropdown | Ataud seleccionado |
| 11.2.16 | **Sin ataúd (servicio sin ataúd)** | No seleccionar ataúd (dejar en null) | Servicio creado sin ataúd. No se descuenta stock de ataúd |
| 11.2.17 | **Seleccionar vehículos** | Marcar 2+ vehículos | Vehículos asignados al servicio |
| 11.2.18 | **Sin vehículos** | No marcar ningún vehículo | Servicio creado sin vehículos (puede ser válido o no según backend) |
| 11.2.19 | **Teléfono contratante — no numérico** | Ingresar letras en teléfono | Se filtran solo números (solo acepta dígitos) |
| 11.2.20 | **Teléfono con menos de 9 dígitos** | Ingresar `1234567` (7 dígitos) | Formulario inválido (requiere exactamente 9 dígitos) |
| 11.2.21 | **Stock de ataúd agotado** | Seleccionar ataúd con stock 0 | Backend retorna error: stock insuficiente |
| 11.2.22 | **Stock de capilla agotado** | Seleccionar capilla con stock 0 | Backend retorna error: stock insuficiente |
| 11.2.23 | **Error del backend al guardar** | Simular error de red o backend 500 | Mensaje: "Error al crear el servicio". Formulario NO se pierde |

### 11.3 Editar Servicio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 11.3.1 | **Editar servicio existente** | Ir a `/servicios/editar/:id`, modificar dirección, guardar | Servicio actualizado |
| 11.3.2 | **Cambiar ataúd** | Cambiar de "Ataud A" a "Ataud B" | Stock de "Ataud A" se restaura, stock de "Ataud B" se decrementa |
| 11.3.3 | **Cambiar capilla** | Cambiar de "Capilla X" a "Capilla Y" | Stock de "Capilla X" se restaura, stock de "Capilla Y" se decrementa |
| 11.3.4 | **Cambiar vehículos** | Quitar vehículo A, agregar vehículo B | Pivot table actualizada |
| 11.3.5 | **Quitar todos los vehículos** | Desmarcar todos los vehículos | Servicio queda sin vehículos |
| 11.3.6 | **Datos pre-cargados** | Abrir formulario de edición | Todos los campos vienen con los datos actuales del servicio |

### 11.4 Detalle del Servicio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 11.4.1 | Ver detalle | Click en un servicio de la lista | Muestra toda la información: contratante, fallecido, capilla, ataúd (con color), vehículos, costo, fecha |
| 11.4.2 | Volver a la lista | Click en "Volver" | Redirige a `/servicios` |

### 11.5 Eliminar Servicio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 11.5.1 | **Eliminar servicio** | Click en eliminar servicio, confirmar en diálogo | Servicio eliminado. Stock de ataúd y capilla restaurados |
| 11.5.2 | **Verificar restauración de stock** | Anotar stock antes → crear servicio → eliminar servicio | Stock vuelve al valor original |
| 11.5.3 | **Cancelar eliminación** | Click eliminar, luego cancelar en diálogo | Servicio NO se elimina |
| 11.5.4 | **Eliminar servicio con vehículo** | Eliminar servicio que tiene vehículos asignados | Pivot table `servicio_vehiculo` limpia registros. Vehículos NO se eliminan |

---

## 12. Extracción IA (Contratos)

### 12.1 Pre-requisitos

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 12.1.1 | Verificar disponibilidad del servicio IA | Ir a `/ia` | Se hace ping a `/ia/task/test`. Si falla, muestra banner "Servicio de IA no disponible" |
| 12.1.2 | Servicio IA no disponible | Apagar API ML, ir a `/ia` | Banner de error visible. Botón de subir imágenes deshabilitado o con warning |

### 12.2 Upload y Procesamiento

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 12.2.1 | **Subir imagen de contrato** | Seleccionar archivo JPG/PNG del contrato | Imagen en cola con estado "pendiente". Se inicia procesamiento automático |
| 12.2.2 | **Subir múltiples imágenes** | Seleccionar 3+ archivos | Todos en cola. Se procesan secuencialmente (uno a la vez) |
| 12.2.3 | **Procesamiento exitoso** | Subir imagen clara de contrato | Estado cambia a "listo". Datos extraídos visibles: nombre, DNI, fecha, costo, etc. |
| 12.2.4 | **Procesamiento con error** | Subir imagen borrosa o ilegible | Estado cambia a "error". Mensaje: "Error al procesar la imagen" |
| 12.2.5 | **Reintentar imagen fallida** | Click en "Reintentar" en ítem con error | Vuelve a estado "pendiente" y se re-procesa |
| 12.2.6 | **Eliminar imagen de la cola** | Click en "Eliminar" | Ítem removido de la cola |
| 12.2.7 | **Seleccionar ítem para ver datos** | Click en un ítem procesado | Panel derecho muestra los datos extraídos |

### 12.3 Datos Extraídos

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 12.3.1 | **Datos correctos del contratante** | Revisar campos extraídos | `contratante_nombre`, `contratante_dni` (8 dígitos), `contratante_telefono` (9 dígitos) |
| 12.3.2 | **Datos correctos del fallecido** | Revisar campo | `fallecido_nombre` presente |
| 12.3.3 | **Tipo de pago** | Revisar campo | Uno de: `directo`, `seguro`, `mixto` |
| 12.3.4 | **Ataúd detectado** | Revisar campo | `ataud_modelo` y `ataud_color` presentes |
| 12.3.5 | **Capilla detectada** | Revisar campo | `capilla_modelo` presente |
| 12.3.6 | **Vehículos detectados** | Revisar campo | Array de tipos de vehículo |
| 12.3.7 | **Costo detectado** | Revisar campo | Valor numérico |
| 12.3.8 | **Editar datos extraídos** | Modificar un campo manualmente | Campo modificado, se puede guardar con el cambio |

### 12.4 Guardar desde IA

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 12.4.1 | **Guardar servicio desde extracción** | Click "Guardar" en un ítem procesado | Crea servicio en backend. Toast: "Servicio guardado correctamente" |
| 12.4.2 | **Guardar con datos incompletos** | Guardar sin dirección o fecha | Toast error: "Completa al menos la dirección y la fecha" |
| 12.4.3 | **Mapeo de vehículos** | Verificar que los tipos detectados se mapean a IDs reales | Los vehículos de la BD se matchean por tipo |

### 12.5 Comportamiento de Cola

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 12.5.1 | **Cola secuencial** | Subir 3 imágenes | Se procesan una por una (no en paralelo) |
| 12.5.2 | **Compresión de imagen** | Subir imagen de 5MB+ | Se comprime antes de enviar (máx 2000px, calidad 85%) |
| 12.5.3 | **Polling** | Observar procesamiento | Cada 3 segundos consulta el estado de la tarea |

---

## 13. Predicciones ML

### 13.1 Modelos Disponibles

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 13.1.1 | Ver modelos disponibles | Ir a `/predicciones`, pestaña "Modelos" | Muestra: SARIMA, Prophet, XGBoost, LightGBM, LSTM, ETS |
| 13.1.2 | Ver datos históricos | Pestaña "Modelos" | Gráfico con datos históricos de servicios y monto |

### 13.2 Generar Predicción

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 13.2.1 | **Predicción con SARIMA** | Seleccionar modelo SARIMA, target "servicios_totales", horizon 3 meses | Gráfico con línea histórica + predicción |
| 13.2.2 | **Predicción con Prophet** | Cambiar modelo a Prophet | Nuevo gráfico con predicción de Prophet |
| 13.2.3 | **Predicción de monto** | Seleccionar target "monto_total" | Predicción en soles |
| 13.2.4 | **Horizon máximo** | Seleccionar 24 meses | Muestra predicción a 2 años |
| 13.2.5 | **Horizon mínimo** | Seleccionar 1 mes | Muestra predicción a 1 mes |

### 13.3 Comparación de Modelos

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 13.3.1 | Ver comparativa | Pestaña "Comparación" | Gráfico de barras con MAE, RMSE, R2, MAPE para cada modelo |
| 13.3.2 | Mejor modelo servicios | Revisar métricas | ETS debería ser mejor para servicios_totales (MAE=3.34) |
| 13.3.3 | Mejor modelo monto | Revisar métricas | XGBoost debería ser mejor para monto_total |

### 13.4 Distribución / Necesidades

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 13.4.1 | **Predecir necesidades de ataúdes** | Pestaña "Necesidades", seleccionar rango de fechas | Muestra distribución por tipo: Americano, Biblia, Diamante, etc. |
| 13.4.2 | **Predecir necesidades de capillas** | Verificar distribución de capillas | Capilla Americana, De Madera, Iluminada, etc. |
| 13.4.3 | **Gráfico de barras apiladas** | Visualizar distribución | Gráfico con barras apiladas por tipo de ataúd/capilla |
| 13.4.4 | **Rango de fechas** | Seleccionar inicio y fin | Predicción para el rango seleccionado |

---

## 14. Casos Borde y Errores

### 14.1 Conectividad

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.1.1 | **Backend caído** | Apagar backend, intentar login | Mensaje de error de conexión. La app NO crashea |
| 14.1.2 | **Backend lento (timeout)** | Simular latencia alta | Spinner de carga visible. No se queda colgado indefinidamente |
| 14.1.3 | **API ML caída** | Apagar API ML, ir a predicciones | Mensaje de error. La app maneja el fallo gracefully |
| 14.1.4 | **API IA caída** | Apagar API ML, ir a `/ia` | Banner "Servicio no disponible" |

### 14.2 Navegación

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.2.1 | **Ruta inexistente** | Navegar a `/rutaquenoexiste` | Redirige a `/dashboard` (wildcard `**`) |
| 14.2.2 | **Navegación atrás del browser** | Login → ir a servicios → botón atrás | Comportamiento del browser (vuelve a login si expiró, o a página anterior) |
| 14.2.3 | **Recargar página en ruta protegida** | F5 en `/servicios` | Si token válido, mantiene la página. Si no, redirige a login |

### 14.3 Formularios

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.3.1 | **Nombre con caracteres especiales** | Ingresar `Juan@Pedro#!` en nombre | Validación rechaza: solo letras y espacios |
| 14.3.2 | **DNI con letras** | Ingresar `1234567A` en campo DNI | Se filtra: solo se permiten números |
| 14.3.3 | **Teléfono con guiones** | Ingresar `999-888-777` | Se filtra: solo números, queda `999888777` |
| 14.3.4 | **Costo con decimales** | Ingresar `150.50` | Verificar comportamiento: puede redondear o rechazar |
| 14.3.5 | **Costo negativo** | Ingresar `-100` | Validación rechaza: mínimo S/ 100 |
| 14.3.6 | **Fecha en formato incorrecto** | Intentar ingresar fecha manualmente | El input tipo `date` del browser controla el formato |
| 14.3.7 | **Campos con espacios al inicio/final** | Ingresar `  Juan Perez  ` | Trim aplicado antes de enviar |
| 14.3.8 | **Dirección solo números** | Ingresar `12345` | Rechazado: debe contener al menos una letra |

### 14.4 Seguridad

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.4.1 | **XSS en campos de texto** | Ingresar `<script>alert('xss')</script>` en nombre | Angular sanitiza el input. No se ejecuta script |
| 14.4.2 | **SQL Injection en login** | Ingresar `' OR 1=1 --` en username | Login falla. Backend parametrizado |
| 14.4.3 | **Token manipulado** | Modificar payload del JWT en localStorage | Firma inválida. Backend rechaza con 401 |
| 14.4.4 | **localStorage limpiado manualmente** | Abrir DevTools, borrar localStorage | Al recargar, authGuard redirige a login |

### 14.5 Responsive / UI

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.5.1 | **Vista móvil (< 768px)** | Reducir ventana del navegador | Sidebar colapsa. Botón hamburguesa para abrir |
| 14.5.2 | **Sidebar en móvil** | Click en hamburguesa | Sidebar se desliza desde la izquierda |
| 14.5.3 | **Tablet (768-1024px)** | Ventana tamaño tablet | Sidebar colapsado solo con íconos |
| 14.5.4 | **Desktop (> 1024px)** | Ventana completa | Sidebar expandido con texto |
| 14.5.5 | **Tablas en móvil** | Ver tabla de servicios en móvil | Tabla scrollable horizontalmente o cards |
| 14.5.6 | **Formulario largo en móvil** | Formulario de crear servicio en móvil | Scroll correcto, campos accesibles |

### 14.6 Estado de Carga

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 14.6.1 | **Spinner al cargar datos** | Navegar a cualquier lista | Spinner visible mientras carga |
| 14.6.2 | **Spinner al guardar** | Click guardar en formulario | Botón deshabilitado, spinner visible |
| 14.6.3 | **Doble click en guardar** | Click rápido múltiple en guardar | Solo se envía una petición (botón se deshabilita) |
| 14.6.4 | **Datos vacíos en tabla** | Listar servicios sin datos | Mensaje "No hay servicios registrados" o similar |

---

## 15. Pruebas de Integración Frontend-Backend

### 15.1 Flujo Completo: Contrato IA → Servicio

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 15.1.1 | **Flujo end-to-end IA** | 1. Subir imagen en `/ia` 2. Esperar procesamiento 3. Revisar datos 4. Click "Guardar" 5. Verificar en `/servicios` | Servicio creado con datos de la imagen. Stock decrementado |

### 15.2 Flujo Completo: Crear → Editar → Eliminar

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 15.2.1 | **Ciclo de vida completo** | 1. Crear servicio 2. Verificar en lista 3. Editar (cambiar dirección) 4. Verificar cambio 5. Eliminar 6. Verificar eliminación | Todo funciona. Stock restaurado al eliminar |
| 15.2.2 | **Stock se mantiene consistente** | Anotar stock A=5, B=3. Crear servicio con A y B. Stock: A=4, B=2. Eliminar servicio. Stock: A=5, B=3 | Stock siempre consistente |

### 15.3 Sesiones Concurrentes

| # | Prueba | Pasos | Resultado Esperado |
|---|---|---|---|
| 15.3.1 | **Dos pestañas con el mismo usuario** | Abrir 2 pestañas, login en ambas | Ambas funcionan. Al cerrar sesión en una, la otra también pierde acceso |
| 15.3.2 | **Dos usuarios diferentes** | Login como admin en pestaña 1, trabajador en pestaña 2 | Cada uno ve sus permisos. No se cruzan datos |

---

## 16. Checklist Pre-Build

Antes de pasar a modo build, verificar:

- [ ] **Backend corriendo** en Render (o local) y accesible
- [ ] **API ML/IA** corriendo y accesible (Cloudflare tunnel activo)
- [ ] **Base de datos** con datos de prueba (ataúdes, capillas, vehículos con stock)
- [ ] **Credenciales** de admin funcionales
- [ ] **RENIEC API** con token válido y funcionando
- [ ] **Variables de entorno** del frontend apuntando a URLs correctas
- [ ] ** Sin errores en consola** del navegador al hacer login
- [ ] **Compilación exitosa**: `ng build` sin errores
- [ ] **Lint**: `ng lint` sin errores críticos
- [ ] **RSpec/Vitest**: ejecutar tests unitarios existentes
- [ ] **CORS**: verificar que el backend acepta requests del frontend

---

## 17. Errores Comunes y Soluciones

| Error | Causa | Solución |
|---|---|---|
| `401 Unauthorized` en todas las requests | Token expirado o inexistente | Re-login. Verificar `authInterceptor` |
| `403 Forbidden` al acceder a ruta | Rol sin permisos suficientes | Verificar `roles` en localStorage y `roleGuard` |
| CORS error en consola | Backend no permite origen del frontend | Verificar CORS config en `main.py` del backend |
| `Cannot read property of undefined` | Datos null del backend | Verificar null checks en componentes |
| Spinner infinito | Request al backend no retorna | Verificar URL del backend en `environment.ts` |
| Login redirige a dashboard pero no muestra nada | Token guardado pero permisos no parseados | Verificar que `roles` y `permisos` se guardan como JSON válido |
| RENIEC no resuelve DNI | Token de Decolecta expirado o inválido | Verificar `RENIEC_TOKEN` en `.env` del backend |
| IA no procesa imagen | API ML apagada o tunnel caído | Verificar `iaApiUrl` en `environment.ts` y que el tunnel Cloudflare esté activo |
| Stock no se restaura al eliminar servicio | Error en transacción del backend | Verificar logs del backend. La eliminación debería ser transaccional |
| Fecha mínima no funciona | `fechaMinima` calculada mal | Verificar `new Date().toISOString().split('T')[0]` |

---

> **Nota**: Este plan cubre tanto pruebas manuales (para hacer en el navegador) como aspectos que verificar técnicamente. Las pruebas marcadas con **negrita** son las más críticas y deben priorizarse.
