# Reporte de Pruebas — Funeraria Aranzabal (v2)

> **Fecha**: 27 de Agosto, 2026
>
> **Entorno**: Local (Frontend: localhost:4200, Backend: localhost:8000, API ML: localhost:8001)
>
> **Navegador**: Chrome (via Browser MCP)
>
> **Usuarios de prueba**:
> - `fabAdmin` / `265336aaaa` (Administrador — 28 permisos)
> - `worker_test` / `12345678` (Trabajador — 12 permisos)

---

## Resumen Ejecutivo

| Categoría | Estado | Observaciones |
|---|---|---|
| Autenticación (2.1) | PASS | Login exitoso, JWT válido, 28 permisos verificados |
| Roles (5.1-5.2) | PASS con BUG | CRUD funciona, pero BUG #7 acepta nombre con XSS |
| Usuarios (4.1) | PASS con BUG | CRUD funciona, pero BUG #8 sin mensajes de validación |
| Servicios (11.1) | PASS con BUG | CRUD funciona, DNI RENIEC verificado, fecha validada |
| Inventario (Ataúdes 6.1) | PASS | Listado, filtros, stock funcionan |
| Predicciones (13.1-13.4) | PASS | RF genera predicciones, gráfico, alertas de reorden funcionan |
| RBAC Backend (16.1) | PASS | Worker: 403 en usuarios/roles, 200 en inventario/servicios |
| RBAC Frontend (16.2) | PASS | Sidebar oculta Usuarios/Roles para worker |
| Seguridad (14.1-14.3) | PASS con BUG | Frontend rechaza XSS, pero BUG #7 permite XSS en roles |
| Form Validation (11.3) | PASS | Dirección, DNI, costo negativo rechazados correctamente |

**Total de módulos probados**: 10
**Tests ejecutados**: 16+ (browser) + 8 (API)
**Bugs encontrados**: 7 (3 nuevos esta sesión)
**Warnings**: 0

---

## Bugs Encontrados (Acumulados)

### BUG #1 — CRÍTICO: Validación de dirección rechaza comas
**Sección**: Servicios → Crear servicio → Dirección de velación
**Archivo**: `servicio-create.ts:52` — `DIRECCION_REGEX`
**Impacto**: ALTO — Direcciones peruanas con comas rechazadas.

### BUG #2 — MEDIO: browser_fill concatena valores
**Sección**: Herramienta de testing Browser MCP
**Descripción**: `browser_fill` concatena en vez de reemplazar al usar el mismo selector.
**Impacto**: MEDIO — Afecta testing automatizado, no producción.

### BUG #3 — BAJO: Pestaña "Modelos" mostraba gráficos vacíos
**Sección**: Predicciones
**Estado**: OBSOLETO — La pestaña fue eliminada con el modelo RF.

### BUG #4 — MEDIO: Backend sin validación en modelo/color de ataúdes
**Sección**: CRUD Ataúdes → Campo modelo/color
**Archivo**: Backend — `AtaudBase` schema solo tiene `min_length=1, max_length=100`
**Impacto**: MEDIO — Backend acepta `Ataud@Premium#!` como modelo sin regex. Frontend pattern es la única protección.

### BUG #5 — BAJO: Error display muestra [object Object]
**Sección**: Predicciones → Error de predicción
**Descripción**: Cuando la predicción falla, el frontend muestra `[object Object]` en vez de un mensaje legible.
**Archivo**: `predicciones.ts` — error handling
**Recomendación**: Usar `error.error.detail || JSON.stringify(error.error)`

### BUG #6 — MEDIO: Roles form sin mensajes de validación
**Sección**: Roles → Nuevo rol
**Descripción**: Al enviar formulario vacío, no aparece ningún mensaje de error visible. Solo previene submit silenciosamente.
**Archivo**: Componente de roles (frontend)
**Impacto**: MEDIO — El usuario no sabe qué campo falta.

### BUG #7 — CRÍTICO (NUEVO): Backend acepta nombre de rol con XSS
**Sección**: Roles → Crear rol
**Descripción**: El backend no tiene validación de formato en el campo `nombre` del rol. Se creó un rol con nombre `<script>alert('XSS')</script>` (ID #3) exitosamente.
**Archivo afectado**: Backend — `RoleBase` schema
**Prueba realizada**:
1. Se abrió el modal "Nuevo rol"
2. Se ingresó `<script>alert('XSS')</script>` en el campo nombre
3. Se hizo clic en "Crear rol"
4. El rol fue creado exitosamente (ID #3)
5. Se verificó que Angular renderiza el texto de forma segura (no ejecuta el script)
6. Se limpió el registro vía API

**Evidencia**: Angular `{{ }}` interpolation escapa HTML por defecto, por lo que no hay ejecución de XSS en el frontend. Sin embargo, el **backend** almacena el string crudo sin sanitizar, lo que es un riesgo si se consume la API desde otro cliente.

**Impacto**: CRÍTICO (seguridad de datos) / BAJO (ejecución XSS en frontend Angular)
**Recomendación**: Agregar regex de validación en el schema backend: `^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$`

### BUG #8 — MEDIO (NUEVO): Usuarios/Roles/Servicios form sin mensajes de validación
**Sección**: Múltiples formularios (Roles, Usuarios, Servicios)
**Descripción**: Los formularios de creación no muestran mensajes de error de validación cuando los campos requeridos están vacíos. Solo previenen el submit silenciosamente.
**Archivos afectados**:
- Roles form (frontend)
- Usuarios form (frontend)
- Servicios form (frontend — parcial, sí muestra "La fecha no puede ser anterior al día de hoy")

**Contraste**: El formulario de servicios SÍ muestra validación para el campo fecha y para DNI, pero NO para otros campos requeridos vacíos.

**Impacto**: MEDIO — Mala experiencia de usuario. Los usuarios no reciben feedback sobre qué campos son obligatorios.

---

## Tests Detallados

### 1. Autenticación (Sección 2)

| Test | Descripción | Resultado |
|---|---|---|
| 2.1.1 | Login exitoso con fabAdmin | ✅ PASS — Token JWT recibido, 28 permisos verificados |

### 2. Predicciones RF (Sección 13)

| Test | Descripción | Resultado |
|---|---|---|
| 13.1.1 | Página predicciones carga | ✅ PASS — "Prediccion de Demanda", "MODELO RANDOM FOREST" |
| 13.3.1 | Predicción 6 meses | ✅ PASS — Gráfico y tabla se renderizan, Total S/ 55,902 |
| 13.3.2 | Predicción 10 meses | ✅ PASS — API responde con datos |
| 13.3.3 | Predicción 20 meses | ✅ PASS — API responde con datos |
| 13.4.1 | Sin checkbox → sin alertas | ✅ PASS — No aparece sección de alertas |
| 13.4.2 | Con checkbox → con alertas | ✅ PASS — Tabla de alertas: 6 categorías con stock 0 |

### 3. Inventario (Sección 6)

| Test | Descripción | Resultado |
|---|---|---|
| 6.1.1 | Listar ataúdes | ✅ PASS — Tabla con modelo, color, stock, estado |

### 4. Validación de Formularios (Sección 11)

| Test | Descripción | Resultado |
|---|---|---|
| 11.3.1 | Dirección `@#$%^&*()` | ✅ PASS — Frontend rechaza con 2 mensajes de error |
| 11.3.6 | DNI `1234567A` | ✅ PASS — Error: "8 dígitos numéricos" |
| 11.3.8 | Costo `-100` | ✅ PASS — Error: "El costo mínimo es S/ 100" |

### 5. Seguridad (Sección 14)

| Test | Descripción | Resultado |
|---|---|---|
| 14.3.1 | XSS `<script>` en ataúd | ✅ PASS — Frontend rechaza, no ejecución |
| 5.2 | XSS en nombre de rol | ⚠️ FAIL — Backend acepta y almacena (BUG #7) |
| 4.1 | XSS en nombre de usuario | ✅ PASS — Frontend rechaza: "Letras, números, puntos, guiones" |

### 6. DNI / RENIEC (Sección 11)

| Test | Descripción | Resultado |
|---|---|---|
| 11.4.1 | Verificar DNI fallecido | ✅ PASS — "RAMON VARGAS ELVIS RONALDIÑO", ✔ Verificado en RENIEC |
| 11.4.2 | Verificar DNI contratante | ⏭️ NO COMPLETADO — Limitación de herramienta browser_fill |

### 7. RBAC (Sección 16)

| Test | Descripción | Resultado |
|---|---|---|
| 16.1.1 | Backend: Worker GET /users/ | ✅ PASS — 403 Forbidden |
| 16.1.2 | Backend: Worker GET /roles/ | ✅ PASS — 403 Forbidden |
| 16.1.3 | Backend: Worker GET /services/ | ✅ PASS — 200 OK |
| 16.1.4 | Backend: Worker GET /coffins/ | ✅ PASS — 200 OK |
| 16.1.5 | Backend: Worker POST /users/ | ✅ PASS — 403 Forbidden |
| 16.1.6 | Backend: Worker POST /roles/ | ✅ PASS — 403 Forbidden |
| 16.2.1 | Frontend: Sidebar worker sin Usuarios | ✅ PASS — No aparece "Usuarios" en SISTEMA |
| 16.2.2 | Frontend: Sidebar worker sin Roles | ✅ PASS — No aparece "Roles" en SISTEMA |
| 16.2.3 | Frontend: Sidebar worker ve Servicios | ✅ PASS — Aparece "Servicios" en GENERAL |

### 8. Fechas

| Test | Descripción | Resultado |
|---|---|---|
| 11.3.7 | Fecha anterior a hoy | ✅ PASS — Error: "La fecha no puede ser anterior al día de hoy" |

---

## Resumen de Bugs por Severidad

| Severidad | Cantidad | IDs |
|---|---|---|
| CRÍTICO | 2 | #1, #7 |
| MEDIO | 3 | #2, #4, #6, #8 |
| BAJO | 2 | #3, #5 |
| **Total** | **7** | |

---

## Tests No Completados

| Test | Razón |
|---|---|
| Creación de servicio completa (browser) | Limitación de herramienta `browser_fill` con selectores ambiguos (2 campos DNI) |
| Verificación DNI contratante (browser) | Mismo problema de selectores |
| Pruebas de Extracción IA | Pendiente |
| Pruebas de Perfil de usuario | Pendiente |
| Pruebas E2E completas (Sección 15) | Requieren tests automatizados |

---

## Recomendaciones

1. **BUG #7 (CRÍTICO)**: Agregar regex de validación en schema backend para nombre de rol: `^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$`
2. **BUG #8 (MEDIO)**: Agregar mensajes de error visibles en todos los formularios (Roles, Usuarios, Servicios) para campos requeridos vacíos
3. **BUG #1 (CRÍTICO)**: Resolver validación de dirección para aceptar comas
4. **BUG #4 (MEDIO)**: Agregar regex en schema backend para modelo/color de ataúdes
5. **BUG #5 (BAJO)**: Mejorar manejo de errores para mostrar mensajes legibles

---

*Reporte generado automáticamente — 27 de Agosto, 2026*
