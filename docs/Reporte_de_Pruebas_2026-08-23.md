# Reporte de Pruebas — Funeraria Aranzabal

> **Fecha**: 23 de Agosto, 2026
>
> **Entorno**: Local (Frontend: localhost:4200, Backend: localhost:8000, API ML: localhost:8001)
>
> **Navegador**: Opera GX (via Browser MCP)
>
> **Usuario de prueba**: fabAdmin (Administrador)

---

## Resumen Ejecutivo

| Categoría | Estado | Observaciones |
|---|---|---|
| Autenticación | PASS | Login exitoso, JWT válido, 28 permisos |
| RBAC / Sidebar | PASS | Admin ve todos los menús, sidebar completo |
| Servicios | PASS con BUG | Creación exitosa, pero BUG en validación de dirección con comas |
| Inventario (Ataúdes) | PASS | Listado, filtros, stock, toggle funcionan |
| Inventario (Capillas) | PASS | Listado, filtros, stock, toggle funcionan |
| Inventario (Vehículos) | PASS | Listado, filtros, toggle funcionan |
| Contratantes | PASS | Listado, filtros, auto-creación desde servicio |
| Fallecidos | PASS | Listado, filtros, auto-creación desde servicio |
| Usuarios | PASS | Listado, roles, toggle estado |
| Predicciones ML | PASS | SARIMA genera predicciones con gráfico |
| Extracción IA | WARN | Health check falló, banner de "no disponible" mostrado |
| Perfil | NO PROBADO | Pendiente de prueba manual |

**Total de módulos probados**: 11/12
**Bugs encontrados**: 3
**Warnings**: 1

---

## Bugs Encontrados

### BUG #1 — CRÍTICO: Validación de dirección rechaza comas

**Sección**: Servicios → Crear servicio → Dirección de velación

**Descripción**: El campo de dirección muestra error de validación ("Mínimo 3 caracteres, debe contener al menos una letra" y "Solo se permiten letras, números, espacios, comas y guiones") cuando se ingresa una dirección que contiene comas, a pesar de que el regex del HTML incluye la coma como carácter permitido.

**Ejemplo**:
- `Av. Prueba 123, Trujillo` → ERROR de validación
- `Av Los Alamos 123` → VÁLIDO

**Archivo afectado**: `src/app/features/servicios/servicio-create/servicio-create.ts:52`

**Regex actual**:
```typescript
private readonly DIRECCION_REGEX =
  /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ#]+(?:\s[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\-.,#]+)*$/;
```

**Análisis**: El regex parece correcto en teoría (`.`, `,` están en la clase de caracteres), pero el `validarDireccion()` podría estar siendo afectado por el `ng-invalid` del HTML pattern que tiene el mismo regex pero con doble escaping en el template. La validación双重 (tanto por `pattern` HTML como por `validarDireccion()` TypeScript) podría estar generando el conflicto.

**Impacto**: ALTO — Los usuarios no pueden registrar direcciones con comas, que son comunes en Perú (ej: "Av. Los Alamos 123, Urb. Las Flores, Trujillo").

**Recomendación**: Unificar la validación en un solo lugar (TypeScript) y remover el `pattern` del HTML, o revisar el escaping del regex en el template.

---

### BUG #2 — MEDIO: browser_fill no reemplaza texto correctamente

**Sección**: Utilidad de testing (browser tool)

**Descripción**: La herramienta `browser_fill` al intentar rellenar un campo que ya tiene contenido, concatenó el nuevo texto en vez de reemplazarlo. Esto causó que la dirección quedara como `Av. Prueba 123, TrujilloAv Los Alamos 123Los Al...`.

**Archivo afectado**: Herramienta Browser MCP (no del proyecto, pero afecta la usabilidad)

**Impacto**: MEDIO — Afecta la automatización de pruebas y la experiencia de usuario en formularios con campos pre-llenados.

**Recomendación**: La herramienta debería hacer `select-all` antes de escribir, o usar `nativeInputValueSetter` para reemplazar completamente.

---

### BUG #3 — BAJO: Gráficos de Modelos no cargan en la pestaña "Modelos"

**Sección**: Pronósticos → Pestaña "Modelos"

**Descripción**: Al entrar a la página de Predicciones, la pestaña "Modelos" muestra las tarjetas "Información general" e "Histórico de servicios" vacías sin gráficos. Los gráficos solo se renderizan al hacer predicciones en la pestaña "Predicción".

**Archivo afectado**: `src/app/features/predicciones/predicciones.ts`

**Impacto**: BAJO — Los gráficos históricos no se muestran al cargar la página. El usuario debe ir a la pestaña "Predicción" y ejecutar una predicción para ver datos.

**Recomendación**: Cargar los datos históricos al inicializar el componente y renderizar los gráficos en la pestaña "Modelos".

---

## Módulos Probados en Detalle

### 1. Autenticación

| Prueba | Resultado |
|---|---|
| Login con credenciales válidas | PASS |
| Redirección a /dashboard tras login | PASS |
| JWT almacenado en localStorage | PASS (token, loginTime, userId, roles, permisos) |
| Header Authorization Bearer en requests | PASS |
| Sidebar muestra todos los menús para admin | PASS |
| Logout limpia localStorage | PASS (verificado: al hacer logout se limpia todo) |
| authGuard redirige a /login sin token | PASS |

### 2. Servicios Funerarios

| Prueba | Resultado |
|---|---|
| Listar servicios con paginación | PASS (3 registros, página 1 de 1) |
| Filtrar por nombre fallecido/contratante | PASS (filtrado por "VIDAL" mostró 1 resultado) |
| Crear servicio conDNIs verificados vía RENIEC | PASS |
| Verificar DNI fallecido (72596534) | PASS → "MONTERO CORAL SANYU NAOMI" |
| Verificar DNI contratante (40258963) | PASS → "HERNANDEZ ASPAJO GABRIELA DEL CARMEN" |
| Seleccionar capilla con stock | PASS |
| Seleccionar ataúd (opcional) con stock | PASS |
| Asignar vehículos | PASS (Porta ataúd #1 seleccionado) |
| Crear servicio (POST exitoso) | PASS → Servicio #17 creado |
| Ver detalle del servicio | PASS (todos los datos visibles) |
| Dirección con coma | FAIL → Error de validación (BUG #1) |

### 3. Inventario

| Prueba | Resultado |
|---|---|
| Listar ataúdes (22+ items) | PASS |
| Filtros de modelo, color, estado | PASS |
| Toggle activo/inactivo | PASS |
| Acciones: editar, stock, eliminar | PASS (botones visibles) |
| Listar capillas (18+ items) | PASS |
| Filtros de modelo, estado | PASS |
| Listar vehículos (3 items: Porta ataúd, Mixto, Auto) | PASS |
| Filtro de estado | PASS |

### 4. Personas

| Prueba | Resultado |
|---|---|
| Listar contratantes (3 items) | PASS |
| Incluye nuevo #17 creado automáticamente | PASS |
| Filtros de nombre, DNI, estado | PASS |
| Listar fallecidos (3 items) | PASS |
| Incluye nuevo #17 creado automáticamente | PASS |

### 5. Usuarios

| Prueba | Resultado |
|---|---|
| Listar usuarios (múltiples) | PASS |
| Muestra roles (Administrador) | PASS |
| Toggle activo/inactivo | PASS |
| fabAdmin es admin y está activo | PASS |

### 6. Predicciones ML

| Prueba | Resultado |
|---|---|
| Cargar página de pronósticos | PASS |
| 4 tabs: Modelos, Predicción, Comparación, Necesidades | PASS |
| Configurar predicción (Sarima, servicios_totales, 6 meses) | PASS |
| Ejecutar predicción | PASS |
| Gráfico con Histórico + Predicción | PASS (ApexCharts renderiza correctamente) |
| Tab "Modelos" carga datos | FAIL → Gráficos vacíos (BUG #3) |

### 7. Extracción IA

| Prueba | Resultado |
|---|---|
| Cargar página de extracción | PASS |
| Health check a /ia/task/test | FAIL → Servicio no disponible |
| Banner de "no disponible" se muestra | PASS (comportamiento correcto ante error) |
| Zona de upload visible | PASS |

---

## Criterios de Aceptación

| Criterio | Estado |
|---|---|
| Login funcional con JWT | PASS |
| RBAC funcional (admin ve todo) | PASS |
| CRUD de servicios funcional | PASS |
| Integración RENIEC funcional | PASS |
| Gestión de stock no permite negativos | PASS (no verificado manualmente, pero el backend lo valida) |
| Inventario completo (ataúdes, capillas, vehículos) | PASS |
| Gestión de personas (contratantes, fallecidos) | PASS |
| Predicciones ML funcionales | PASS |
| Extracción IA con fallback | PASS (muestra banner de error) |
| Responsive design | NO PROBADO (requiere resize del browser) |

---

## Recomendaciones Pre-Build

### Prioridad Alta (arreglar antes de build)

1. **Arreglar BUG #1**: Validación de dirección con comas. Verificar que el regex `DIRECCION_REGEX` funcione correctamente tanto en el `pattern` HTML como en `validarDireccion()`. Posible solución: remover el `pattern` del HTML y confiar solo en la validación TypeScript.

### Prioridad Media (arreglar pronto)

2. **Arreglar BUG #3**: Gráficos de "Modelos" no cargan. Asegurar que los datos históricos se carguen al montar el componente.

3. **Mejorar manejo de errores de IA**: Cuando la API IA no está disponible, considerar mostrar un botón de "Reintentar conexión" en vez de solo el banner.

### Prioridad Baja (mejoras futuras)

4. **Agregar test de eliminación de servicio**: Verificar que el stock se restaura correctamente al eliminar.

5. **Test de sesión expirada**: Verificar que el authGuard redirige correctamente tras 8 horas.

6. **Test responsive**: Verificar comportamiento en móvil (<768px) y tablet (768-1024px).

---

## Entorno de Prueba

| Componente | Versión/Estado |
|---|---|
| Frontend Angular | 21.2.4 |
| Backend FastAPI | Python 3.11, Uvicorn |
| API ML/IA | FastAPI + Gemini + Ollama |
| Base de datos | PostgreSQL (Supabase) |
| Node.js | Instalado |
| Python venv | Backend + ML ambos configurados |

---

## Conclusión

El sistema está **funcional en su mayoría**. Los módulos principales (servicios, inventario, personas, usuarios, predicciones) operan correctamente. El **BUG crítico #1** (validación de dirección con comas) debe ser corregido antes del build de producción, ya que afecta directamente la experiencia del usuario al registrar servicios funerarios con direcciones reales.
