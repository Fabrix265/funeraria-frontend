# Documentación de Metodologías Aplicadas

> **Proyecto:** Sistema web con funcionalidades predictivas para mejorar la eficiencia de gestión del inventario en la Funeraria Aranzabal
> **Autores:** Prieto Meléndez Alexander Antonio & Vidal Rodríguez Fabrizio
> **Asesor:** Díaz Sánchez Jaime Eduardo
> **Institución:** Universidad Privada Antenor Orrego

---

## 1. SCRUM

### 1.1 Product Backlog

El Product Backlog consolida la totalidad de requerimientos del sistema, conformado por 30 Requisitos Funcionales (RF) y 19 Requisitos No Funcionales (RNF), clasificados según la priorización MoSCoW definida en el TE5.

#### 1.1.1 Requisitos Funcionales

| ID | Nombre | Descripción | MoSCoW | SP | Sprint |
|:---|:-------|:------------|:-------|:---|:-------|
| RF-01 | Inicio de sesión | Yo como Usuario, quiero autenticarme en el sistema introduciendo mi usuario y contraseña, para acceder de manera segura a las funcionalidades correspondientes, con la condición de que el sistema me retorne un token JWT válido con un tiempo de expiración de 8 horas. | Must | 3 | 1 |
| RF-02 | Cierre de sesión | Yo como Usuario, quiero cerrar mi sesión activa, para proteger mi cuenta al dejar de usar el sistema, con la condición de que se elimine el token del almacenamiento local y se me redirija automáticamente al formulario de login. | Must | 1 | 1 |
| RF-03 | Gestión de usuarios | Yo como Administrador, quiero crear, listar, editar, activar/desactivar y eliminar usuarios del sistema, para mantener el control del personal que accede a la plataforma, con la condición de que los cambios queden registrados de forma centralizada. | Must | 5 | 1 |
| RF-04 | Gestión de roles | Yo como Administrador, quiero crear roles personalizados y asignar permisos organizados por módulo, para definir las funciones de los empleados según su puesto, con la condición de estructurarlos correctamente en la base de datos. | Must | 3 | 1 |
| RF-05 | Gestión de permisos | Yo como Administrador, quiero disponer de 28 permisos granulares con el patrón módulo:acción, para controlar de manera específica el acceso a cada funcionalidad, con la condición de que sirvan de base para la seguridad del sistema. | Must | 3 | 1 |
| RF-06 | Control de acceso basado en roles | Yo como Usuario, quiero que mi acceso a las rutas y funcionalidades esté restringido según mi rol y permisos, para no ingresar a secciones no autorizadas, con la condición de que cualquier intento prohibido sea denegado con una redirección al dashboard. | Must | 3 | 1 |
| RF-07 | Edición de perfil | Yo como Usuario, quiero actualizar mi propio nombre de usuario y contraseña desde la página de perfil, para mantener mis credenciales de acceso actualizadas, con la condición de validar la seguridad de los nuevos datos. | Should | 2 | 1 |
| RF-08 | Dashboard permisionado | Yo como Usuario, quiero visualizar módulos de acceso condicionados a mis permisos, para navegar de forma limpia por la interfaz, con la condición de que el sistema oculte automáticamente aquellas secciones para las que no tengo autorización. | Should | 3 | 1 |
| RF-09 | CRUD de servicios funerarios | Yo como Usuario, quiero crear, listar, editar y eliminar servicios funerarios, para administrar los contratos de la funeraria, con la condición de incluir obligatoriamente la selección de ataúd, capilla, vehículos, tipo de pago, dirección de velación, fecha y cantidad de cargadores. | Must | 8 | 2 |
| RF-10 | Creación automática de contratante | Yo como Usuario, quiero que el sistema verifique si el contratante ya existe por su DNI al momento de crear un servicio, para agilizar el proceso de registro, con la condición de reutilizar su información existente o crear un nuevo registro automáticamente. | Should | 3 | 2 |
| RF-11 | Creación automática de fallecido | Yo como Usuario, quiero que el sistema genere automáticamente un registro del fallecido asociado al crear un servicio, para mantener vinculada la información del difunto, con la condición de asegurar la integridad de los datos de la operación. | Must | 2 | 2 |
| RF-12 | Control de stock de ataúdes | Yo como Usuario, quiero que el stock de ataúdes se reduzca automáticamente al asignar uno a un servicio, para controlar el inventario físico en tiempo real, con la condición de que al eliminar el servicio este se restaure correctamente sin quedar nunca en valores negativos. | Must | 3 | 2 |
| RF-13 | Control de stock de capillas | Yo como Usuario, quiero que el stock de capillas se reduzca automáticamente al asignar una a un servicio, para conocer la disponibilidad de los espacios de velación, con la condición de que al eliminar el servicio este se restaure correctamente sin quedar nunca en valores negativos. | Must | 3 | 2 |
| RF-14 | Asignación de vehículos | Yo como Usuario, quiero asignar uno o más vehículos a un servicio, para planificar los traslados del cortejo funerario, con la condición de validar estrictamente que las unidades se encuentren en estado activo. | Must | 3 | 2 |
| RF-15 | Paginación y filtrado de servicios | Yo como Usuario, quiero listar los servicios con paginación y filtros específicos, para realizar búsquedas eficientes dentro de la plataforma, con la condición de poder filtrar por nombre, DNI del contratante, DNI del fallecido y fecha. | Should | 3 | 2 |
| RF-16 | CRUD de ataúdes | Yo como Usuario, quiero crear, listar, editar, eliminar, ajustar stock y activar/desactivar registros de ataúdes, para gestionar el catálogo de productos disponibles, con la condición de poder aplicar filtros por modelo y color. | Must | 5 | 1 |
| RF-17 | CRUD de capillas | Yo como Usuario, quiero crear, listar, editar, eliminar, ajustar stock y activar/desactivar registros de capillas, para administrar la infraestructura de velatorios de la empresa, con la condición de aplicar filtros de búsqueda por modelo. | Must | 5 | 1 |
| RF-18 | CRUD de vehículos | Yo como Usuario, quiero crear, listar, editar, eliminar y activar/desactivar vehículos, para controlar la flota de transporte de la funeraria, con la condición de organizarlos en hasta 5 tipos diferentes. | Must | 3 | 1 |
| RF-19 | CRUD de contratantes | Yo como Usuario, quiero listar, editar y activar/desactivar contratantes, para mantener actualizado el registro de clientes, con la condición de aplicar filtros por nombre y DNI, validando la unicidad de este último documento. | Must | 3 | 1 |
| RF-20 | CRUD de fallecidos | Yo como Usuario, quiero listar, editar y activar/desactivar registros de fallecidos, para gestionar el histórico de personas atendidas, con la condición de utilizar filtros y bloquear la eliminación si existen servicios activos asociados. | Must | 3 | 1 |
| RF-21 | Predicción de demanda con ML | Yo como Usuario, quiero visualizar predicciones mensuales de servicios e ingresos totales utilizando el motor de Machine Learning, para planificar las estrategias comerciales de la empresa, con la condición de emplear seis modelos predictivos en un horizonte de 1 a 24 meses. | Must | 13 | 2 |
| RF-22 | Visualización de métricas | Yo como Usuario, quiero revisar las métricas de precisión del modelo predictivo, para evaluar la fiabilidad de las proyecciones del sistema, con la condición de analizar los indicadores de MAE, RMSE, R2 y MAPE. | Could | 3 | 2 |
| RF-23 | Distribución de inventario | Yo como Usuario, quiero predecir la distribución de ataúdes y capillas por tipo necesarios en cada mes, para optimizar el stock físico futuro, con la condición de calcularlo en base al rango de meses seleccionado. | Should | 5 | 2 |
| RF-24 | Visualización de datos históricos | Yo como Usuario, quiero visualizar gráficos de series temporales con los datos históricos de servicios e ingresos totales, para evaluar la evolución del negocio en el tiempo, con la condición de mostrar la información recopilada desde mayo de 2022 hasta febrero de 2026. | Must | 3 | 2 |
| RF-25 | Gráficos interactivos | Yo como Usuario, quiero interactuar con gráficos de área, líneas, barras y barras apiladas utilizando ApexCharts, para analizar de forma dinámica las predicciones y distribuciones, con la condición de que la interfaz responda de manera fluida. | Should | 3 | 2 |
| RF-26 | Eliminación en cascada | Yo como Usuario, quiero que al eliminar un servicio se desencadene la eliminación en cascada de sus datos vinculados, para mantener la consistencia y limpieza de los datos, con la condición de remover pasajeros, enlaces de vehículos y registros huérfanos, además de restaurar el inventario. | Won't | 3 | 2 |
| RF-27 | Sidebar responsivo | Yo como Usuario, quiero que el sidebar de navegación se colapse automáticamente en pantallas menores a 768px, para utilizar el sistema cómodamente desde dispositivos móviles, con la condición de mostrar un botón tipo hamburguesa para desplegarlo. | Should | 2 | 1 |
| RF-28 | Notificaciones toast | Yo como Usuario, quiero recibir notificaciones toast de éxito, error e información, para conocer al instante el resultado de mis acciones, con la condición de que tengan una duración automática en pantalla de 3.5 segundos. | Should | 2 | 1 |
| RF-29 | Diálogos de confirmación | Yo como Usuario, quiero responder a una solicitud de confirmación explícita, para evitar la ejecución de errores involuntarios, con la condición de que aparezca antes de realizar cualquier acción destructiva en el sistema. | Must | 2 | 1 |
| RF-30 | Autenticación automática expirada | Yo como Usuario, quiero ser redirigido automáticamente al login si el guard de autenticación detecta que el token ha caducado, para proteger la seguridad de la información del sistema, con la condición de activarse inmediatamente tras cumplirse las 8 horas de expiración. | Could | 2 | 1 |

#### 1.1.2 Requisitos No Funcionales

| ID | Nombre | Descripción | MoSCoW | SP | Sprint |
|:---|:-------|:------------|:-------|:---|:-------|
| RNF-01 | Autenticación JWT | La plataforma debe utilizar tokens JWT con algoritmo HS256 y expiración de 8 horas para la gestión de sesiones. | Must | 3 | 1 |
| RNF-02 | Hashing de contraseñas | La base de datos debe almacenar contraseñas hasheadas con bcrypt, garantizando que no se guarden en texto plano. | Must | 1 | 1 |
| RNF-03 | Arquitectura de microservicios | El proyecto debe estar compuesto por al menos tres servicios independientes: frontend Angular, backend operativo y backend de IA/modelos, desplegables por separado. | Must | 5 | 1 |
| RNF-04 | CORS habilitado | El backend debe configurar CORS para permitir solicitudes desde el dominio del frontend, habilitando headers de autorización. | Must | 1 | 1 |
| RNF-05 | API RESTful | El backend operativo debe exponer una API RESTful con endpoints estandarizados siguiendo convenciones HTTP. | Must | 3 | 1 |
| RNF-06 | Validación de datos | La arquitectura debe validar todos los datos de entrada mediante esquemas Pydantic en el backend y modelos TypeScript en el frontend. | Must | 3 | 1 |
| RNF-07 | Manejo de errores | Las respuestas deben retornar códigos HTTP apropiados con mensajes descriptivos en caso de error. | Must | 2 | 1 |
| RNF-08 | Middleware de errores global | El backend debe implementar un middleware que capture excepciones no manejadas y retorne respuestas consistentes. | Must | 2 | 1 |
| RNF-09 | Seed automático | La base de datos debe crear automáticamente al primer inicio: permisos, roles por defecto (Administrador, Trabajador) y el usuario administrador. | Must | 2 | 1 |
| RNF-10 | Migración automática de esquema | El backend debe crear las tablas de la base de datos automáticamente al iniciar el servidor mediante SQLModel metadata. | Must | 2 | 1 |
| RNF-11 | Independencia de base de datos de IA | El backend de IA/modelos no debe depender de una base de datos relacional, utilizando archivos serializados (.pkl, .keras) y metadatos en JSON. | Should | 2 | 2 |
| RNF-12 | Componentes standalone Angular | El frontend debe utilizar componentes standalone de Angular (sin NgModules) para una arquitectura modular y lazy-loading nativo. | Must | 3 | 1 |
| RNF-13 | Lazy loading de rutas | Los módulos de roles y predicciones deben implementar lazy loading para optimizar el tiempo de carga inicial. | Should | 2 | 2 |
| RNF-14 | Diseño responsivo | La interfaz del frontend debe adaptarse a pantallas de escritorio y móviles, con punto de quiebre en 768px para el sidebar. | Must | 3 | 1 |
| RNF-15 | Persistencia de estado de autenticación | El navegador debe almacenar el token JWT, roles y permisos en localStorage para persistir entre recargas de página. | Must | 1 | 1 |
| RNF-16 | Interceptor HTTP | El frontend debe implementar un interceptor HTTP que adjunte automáticamente el token Bearer en todas las solicitudes al backend. | Must | 2 | 1 |
| RNF-17 | Protección de registros base | El sistema debe proteger los roles "Administrador" y "Superadmin", así como el usuario semilla, contra eliminación accidental. | Must | 2 | 1 |
| RNF-18 | Unicidad de DNI de contratante | La base de datos debe garantizar la unicidad del DNI del contratante a nivel de tabla, retornando error 409 en caso de duplicidad. | Must | 2 | 2 |
| RNF-19 | Serialización del modelo ML | El servidor debe cargar los modelos de machine learning en formato .pkl/.keras para asegurar una carga rápida sin reentrenamiento. | Must | 2 | 2 |

### 1.2 Sprint Backlog

#### Sprint 1 — Módulo Base e Inventario

**Requisitos asignados:** 17 RFs + 15 RNFs = 32 items

| ID | Nombre | Tipo | Desglose Técnico |
|:---|:-------|:-----|:-----------------|
| RF-01 | Inicio de sesión | RF | **Backend:** Configurar librería python-jose para JWT; crear endpoint POST `/auth/login`; implementar validación de credenciales con bcrypt; generar token HS256 con expiración de 8 horas. **Frontend:** Crear `login.component.ts` con formulario reactivo; implementar `AuthService.login()` con manejo de errores; configurar `AuthGuard` para protección de rutas; almacenar token en localStorage. **Testing:** Unit tests para generación de token, validación de credenciales, expiración. |
| RF-02 | Cierre de sesión | RF | **Backend:** Crear endpoint POST `/auth/logout` (invalidación opcional). **Frontend:** Implementar `AuthService.logout()` que elimine token de localStorage; redirigir a `/login` con `Router.navigate()`. **Testing:** Unit test para eliminación de token y redirección. |
| RF-03 | Gestión de usuarios | RF | **Backend:** Crear modelo SQLModel `Usuario`; CRUD endpoints (`GET /usuarios`, `POST /usuarios`, `PUT /usuarios/{id}`, `DELETE /usuarios/{id}`); paginación con offset/limit. **Frontend:** Crear `usuarios.component.ts` con tabla, formulario y diálogos CRUD; implementar `UsuariosService` con métodos HTTP. **Testing:** Unit tests para cada operación CRUD y validación de datos. |
| RF-04 | Gestión de roles | RF | **Backend:** Crear modelo `Rol`; CRUD endpoints (`/roles`); relación many-to-many con permisos. **Frontend:** Crear `roles.component.ts` con formulario de asignación de permisos. **Testing:** Unit tests para creación de roles y asignación de permisos. |
| RF-05 | Gestión de permisos | RF | **Backend:** Crear modelo `Permiso` con 28 registros semilla (patrón módulo:acción); endpoint GET `/permisos`. **Frontend:** Componente de visualización de permisos agrupados por módulo. **Testing:** Unit test para verificación de los 28 permisos semilla. |
| RF-06 | Control de acceso basado en roles | RF | **Backend:** Middleware de autorización que verifique permisos del token JWT. **Frontend:** `RoleGuard` en rutas del Angular Router; redirección al dashboard en caso de denegación. **Testing:** Unit tests para verificación de acceso permitido/denegado. |
| RF-07 | Edición de perfil | RF | **Backend:** Endpoint PUT `/usuarios/perfil` con validación de contraseña actual. **Frontend:** `perfil.component.ts` con formulario de edición; validación de seguridad. **Testing:** Unit tests para actualización de nombre y contraseña. |
| RF-08 | Dashboard permisionado | RF | **Frontend:** `dashboard.component.ts` con módulos condicionados por permisos del usuario; directiva `*ngIf` basada en permisos del AuthService. **Testing:** Unit test para ocultamiento de módulos no autorizados. |
| RF-16 | CRUD de ataúdes | RF | **Backend:** Modelo `Ataude`; CRUD endpoints (`/ataudes`); filtros por modelo y color; ajuste de stock. **Frontend:** `ataudes.component.ts` con tabla, filtros, formulario y diálogos. **Testing:** Unit tests para CRUD, filtros y ajuste de stock. |
| RF-17 | CRUD de capillas | RF | **Backend:** Modelo `Capilla`; CRUD endpoints (`/capillas`); filtros por modelo; ajuste de stock. **Frontend:** `capillas.component.ts` con tabla, filtros y formulario. **Testing:** Unit tests para CRUD y filtros. |
| RF-18 | CRUD de vehículos | RF | **Backend:** Modelo `Vehiculo`; CRUD endpoints (`/vehiculos`); campo tipo con 5 valores permitidos. **Frontend:** `vehiculos.component.ts` con formulario y select de tipos. **Testing:** Unit tests para CRUD y validación de tipos. |
| RF-19 | CRUD de contratantes | RF | **Backend:** Modelo `Contratante`; endpoints (`/contratantes`); filtros por nombre y DNI; unicidad de DNI. **Frontend:** `contratantes.component.ts` con tabla y filtros. **Testing:** Unit tests para CRUD y validación de unicidad DNI. |
| RF-20 | CRUD de fallecidos | RF | **Backend:** Modelo `Fallecido`; endpoints (`/fallecidos`); bloqueo de eliminación con servicios activos. **Frontend:** `fallecidos.component.ts` con tabla y filtros. **Testing:** Unit tests para CRUD y verificación de bloqueo. |
| RF-27 | Sidebar responsivo | RF | **Frontend:** Modificar `sidebar.component.ts`; breakpoint en 768px con `@media`; botón hamburguesa con `@Output()`; toggle de estado open/closed. **Testing:** Unit test para cambio de estado en resize. |
| RF-28 | Notificaciones toast | RF | **Frontend:** Integrar `angular/toast` o similar; servicio `NotificationService` con métodos `success()`, `error()`, `info()`; duración automática de 3.5 segundos. **Testing:** Unit test para creación de toast y duración. |
| RF-29 | Diálogos de confirmación | RF | **Frontend:** `ConfirmDialogComponent` reutilizable; `MatDialog` o similar; callback de confirmación/cancelación. **Testing:** Unit test para apertura y cierre del diálogo. |
| RF-30 | Autenticación automática expirada | RF | **Frontend:** `AuthGuard` con verificación de expiración del token al acceder a rutas protegidas; redirección automática a `/login` si token expirado. **Testing:** Unit test para detección de token expirado. |
| RNF-01 | Autenticación JWT | RNF | **Backend:** Configurar python-jose con algoritmo HS256; claims con `sub`, `exp`, `roles`, `permisos`; expiración de 8 horas. **Testing:** Unit test para generación y validación de tokens. |
| RNF-02 | Hashing de contraseñas | RNF | **Backend:** Integrar librería bcrypt; hashing al crear usuario; verificación al autenticar. **Testing:** Unit test para hashing y verificación. |
| RNF-03 | Arquitectura de microservicios | RNF | **Infraestructura:** Configurar 3 servicios independientes: frontend Angular (Vercel), backend operativo FastAPI (Render), backend IA FastAPI (Cloudflare Tunnel). **Testing:** Verificación de despliegue independiente. |
| RNF-04 | CORS habilitado | RNF | **Backend:** Configurar middleware CORS en FastAPI; permitir origin del frontend; habilitar headers Authorization y Content-Type. **Testing:** Unit test para verificación de headers CORS. |
| RNF-05 | API RESTful | RNF | **Backend:** Seguir convenciones HTTP (GET, POST, PUT, DELETE); códigos de respuesta (200, 201, 400, 404, 409, 500); endpoints con naming coherente. **Testing:** Unit tests para verificación de códigos de respuesta. |
| RNF-06 | Validación de datos | RNF | **Backend:** Esquemas Pydantic para cada endpoint; validación de tipos y obligatoriedad. **Frontend:** Modelos TypeScript con interfaces; validación en formularios reactivos. **Testing:** Unit tests para validación de esquemas. |
| RNF-07 | Manejo de errores | RNF | **Backend:** Endpoints retornan códigos HTTP correctos (400 Bad Request, 404 Not Found, 409 Conflict, 500 Internal Server Error); mensajes descriptivos en JSON. **Testing:** Unit tests para cada código de error. |
| RNF-08 | Middleware de errores global | RNF | **Backend:** Crear middleware `@app.exception_handler` en FastAPI; capturar excepciones no manejadas; retornar respuesta JSON consistente. **Testing:** Unit test para excepción no manejada. |
| RNF-09 | Seed automático | RNF | **Backend:** Script de inicialización al primer inicio; crear 28 permisos, roles Administrador/Trabajador, usuario admin semilla. **Testing:** Unit test para verificación de datos semilla. |
| RNF-10 | Migración automática de esquema | RNF | **Backend:** Configurar `SQLModel.metadata.create_all()` al iniciar FastAPI; crear tablas automáticamente. **Testing:** Unit test para creación de tablas. |
| RNF-12 | Componentes standalone Angular | RNF | **Frontend:** Configurar todos los componentes como standalone (sin NgModules); importar módulos necesarios directamente en `imports` del componente. **Testing:** Verificación de arquitectura modular. |
| RNF-14 | Diseño responsivo | RNF | **Frontend:** CSS con breakpoints en 768px; sidebar colapsable; layouts flexibles con Flex Layout o CSS Grid. **Testing:** Verificación visual en diferentes tamaños de pantalla. |
| RNF-15 | Persistencia de estado de autenticación | RNF | **Frontend:** Almacenar token JWT, roles y permisos en localStorage; recuperar al recargar página; limpiar al cerrar sesión. **Testing:** Unit test para persistencia y limpieza. |
| RNF-16 | Interceptor HTTP | RNF | **Frontend:** Crear `AuthInterceptor` con `HTTP_INTERCEPTORS`; adjuntar header `Authorization: Bearer {token}` automáticamente. **Testing:** Unit test para adjunción del header. |
| RNF-17 | Protección de registros base | RNF | **Backend:** Validación en endpoints de eliminación de roles y usuarios; verificar si es registro semilla antes de eliminar; retornar 403 si es protegido. **Testing:** Unit test para protección de registros semilla. |

#### Sprint 2 — Módulo Predictivo y Servicios

**Requisitos asignados:** 13 RFs + 4 RNFs = 17 items

| ID | Nombre | Tipo | Desglose Técnico |
|:---|:-------|:-----|:-----------------|
| RF-09 | CRUD de servicios funerarios | RF | **Backend:** Modelo `Servicio` con relaciones a Ataude, Capilla, Vehiculo, Contratante, Fallecido; CRUD endpoints (`/servicios`); incluir selección obligatoria de ataúd, capilla, vehículos, tipo de pago, dirección de velación, fecha y cantidad de cargadores. **Frontend:** `servicios.component.ts` con formulario multi-sección; selectores dependientes; validación completa. **Testing:** Unit tests para CRUD y validación de campos obligatorios. |
| RF-10 | Creación automática de contratante | RF | **Backend:** Endpoint de creación de servicio que verifique DNI del contratante; si existe, reutilizar; si no, crear nuevo registro automáticamente. **Frontend:** Lógica en formulario de servicio que verifique DNI en tiempo real. **Testing:** Unit tests para reutilización y creación automática. |
| RF-11 | Creación automática de fallecido | RF | **Backend:** Al crear servicio, generar registro de fallecido automáticamente; mantener vinculación foránea. **Testing:** Unit test para creación automática e integridad de datos. |
| RF-12 | Control de stock de ataúdes | RF | **Backend:** Al asignar ataúd a servicio, reducir stock automáticamente; al eliminar servicio, restaurar stock; validación de stock mínimo (nunca negativo). **Frontend:** Indicador de stock disponible en selector de ataúdes. **Testing:** Unit tests para reducción, restauración y validación de stock no negativo. |
| RF-13 | Control de stock de capillas | RF | **Backend:** Al asignar capilla a servicio, reducir stock automáticamente; al eliminar servicio, restaurar stock; validación de stock mínimo. **Testing:** Unit tests para reducción, restauración y validación. |
| RF-14 | Asignación de vehículos | RF | **Backend:** Relación many-to-many Servicio-Vehiculo; validación de estado activo del vehículo; endpoint de asignación múltiple. **Frontend:** Selector múltiple de vehículos con estado. **Testing:** Unit tests para asignación y validación de estado. |
| RF-15 | Paginación y filtrado de servicios | RF | **Backend:** Endpoint GET `/servicios` con parámetros de paginación (page, limit) y filtros (nombre, DNI contratante, DNI fallecido, fecha). **Frontend:** Tabla con paginación; barra de filtros. **Testing:** Unit tests para paginación y cada filtro. |
| RF-21 | Predicción de demanda con ML | RF | **Backend (IA):** Implementar 6 modelos predictivos (SARIMA, Prophet, XGBoost, LightGBM, LSTM, ETS); endpoint POST `/predict` con parámetros horizonte y modelo; serialización con joblib (.pkl) y SavedModel (.keras). **Frontend:** `predicciones.component.ts` con selectores de modelo y horizonte; gráficos ApexCharts. **Testing:** Unit tests para cada modelo y validación de entrada/salida. |
| RF-22 | Visualización de métricas | RF | **Backend (IA):** Endpoint GET `/metrics` que retorne MAE, RMSE, R², MAPE del modelo seleccionado. **Frontend:** `metricas.component.ts` con tarjetas de métricas; gráfico de barras comparativo. **Testing:** Unit test para cálculo de métricas. |
| RF-23 | Distribución de inventario | RF | **Backend (IA):** Endpoint POST `/predict/distribution` que calcule distribución de ataúdes y capillas por tipo; basado en predicciones de demanda. **Frontend:** `distribucion.component.ts` con gráficos de barras apiladas por tipo. **Testing:** Unit test para cálculo de distribución. |
| RF-24 | Visualización de datos históricos | RF | **Backend (IA):** Endpoint GET `/historical` que retorne datos de mayo 2022 a febrero 2026. **Frontend:** `historico.component.ts` con gráficos de series temporales. **Testing:** Unit test para rango de fechas. |
| RF-25 | Gráficos interactivos | RF | **Frontend:** Integrar ApexCharts; tipos de gráfico: área, líneas, barras, barras apiladas; interactividad con tooltips y zoom. **Testing:** Unit test para renderizado de gráficos. |
| RF-26 | Eliminación en cascada | RF | **Backend:** Al eliminar servicio: eliminar pasajeros, enlaces vehículos, registros huérfanos; restaurar inventario de ataúdes y capillas. **Testing:** Unit tests para cada paso de la cascada. |
| RNF-11 | Independencia de base de datos de IA | RNF | **Backend (IA):** Cargar modelos desde archivos .pkl/.keras; metadatos en JSON; sin conexión a PostgreSQL. **Testing:** Verificación de carga independiente. |
| RNF-13 | Lazy loading de rutas | RNF | **Frontend:** Configurar rutas de predicciones y roles con `loadChildren()` para lazy loading; verificar carga diferida. **Testing:** Unit test para verificación de carga lazy. |
| RNF-18 | Unicidad de DNI de contratante | RNF | **Backend:** Constraint UNIQUE en columna DNI de tabla Contratantes; endpoint retorna 409 en caso de duplicidad. **Testing:** Unit test para verificación de unicidad y error 409. |
| RNF-19 | Serialización del modelo ML | RNF | **Backend (IA):** Guardar modelos entrenados en formato .pkl (joblib) y .keras (SavedModel); cargar al iniciar servidor sin reentrenamiento. **Testing:** Unit test para carga de modelo serializado. |

### 1.3 Estimación en Story Points

La estimación se realizó utilizando la escala de Fibonacci (1, 2, 3, 5, 8, 13) con los criterios:

| Punto | Criterio |
|:------|:---------|
| 1 | Tarea trivial, menos de 4 horas de desarrollo |
| 2 | Tarea simple, entre 4 y 8 horas |
| 3 | Tarea moderada, entre 8 y 16 horas |
| 5 | Tarea compleja, entre 16 y 32 horas |
| 8 | Tarea muy compleja, entre 32 y 48 horas |
| 13 | Tarea extremadamente compleja, más de 48 horas |

**Resumen por Sprint:**

| Sprint | RFs | RNFs | Total Items | Total SP |
|:-------|:----|:-----|:------------|:---------|
| Sprint 1 | 17 | 15 | 32 | 85 |
| Sprint 2 | 13 | 4 | 17 | 63 |
| **Total** | **30** | **19** | **49** | **148** |

---

## 2. XP (Extreme Programming)

### 2.1 Tarjetas de Historias de Usuario — Requisitos Funcionales

---

#### RF-01: Inicio de sesión

**Ficha técnica:**
Yo como Usuario, quiero autenticarme en el sistema introduciendo mi usuario y contraseña, para acceder de manera segura a las funcionalidades correspondientes.

**Criterios de Aceptación:**
- [ ] CA-1: El sistema valida que usuario y contraseña no estén vacíos
- [ ] CA-2: El sistema retorna un token JWT válido con algoritmo HS256
- [ ] CA-3: El token tiene un tiempo de expiración de exactamente 8 horas
- [ ] CA-4: Las credenciales incorrectas retornan error 401 con mensaje descriptivo
- [ ] CA-5: El token contiene los claims: sub (ID usuario), exp, roles, permisos

**Pruebas Unitarias Asociadas:**
  - test_login_exitoso(): POST /auth/login con credenciales válidas retorna token JWT
  - test_login_credenciales_invalidas(): POST /auth/login con credenciales incorrectas retorna 401
  - test_token_expiry_8_horas(): El token generado expira exactamente después de 8 horas
  - test_token_contiene_claims(): El token contiene sub, exp, roles y permisos

---

#### RF-02: Cierre de sesión

**Ficha técnica:**
Yo como Usuario, quiero cerrar mi sesión activa, para proteger mi cuenta al dejar de usar el sistema.

**Criterios de Aceptación:**
- [ ] CA-1: Se elimina el token JWT del almacenamiento local
- [ ] CA-2: Se redirige automáticamente al formulario de login
- [ ] CA-3: Las rutas protegidas quedan inaccesibles tras el cierre

**Pruebas Unitarias Asociadas:**
  - test_logout_elimina_token(): AuthService.logout() elimina el token de localStorage
  - test_logout_redirige_login(): Tras logout, se navega a /login automáticamente

---

#### RF-03: Gestión de usuarios

**Ficha técnica:**
Yo como Administrador, quiero crear, listar, editar, activar/desactivar y eliminar usuarios del sistema, para mantener el control del personal que accede a la plataforma.

**Criterios de Aceptación:**
- [ ] CA-1: El administrador puede crear usuarios con nombre, contraseña y rol
- [ ] CA-2: El administrador puede listar todos los usuarios con paginación
- [ ] CA-3: El administrador puede editar datos de un usuario existente
- [ ] CA-4: El administrador puede activar/desactivar un usuario
- [ ] CA-5: El administrador puede eliminar un usuario (excepto el semilla)
- [ ] CA-6: Los cambios se registran de forma centralizada

**Pruebas Unitarias Asociadas:**
  - test_crear_usuario(): POST /usuarios crea un usuario con datos válidos
  - test_listar_usuarios(): GET /usuarios retorna lista paginada de usuarios
  - test_editar_usuario(): PUT /usuarios/{id} actualiza datos del usuario
  - test_activar_desactivar_usuario(): PATCH /usuarios/{id}/estado cambia estado del usuario
  - test_eliminar_usuario(): DELETE /usuarios/{id} elimina usuario no semilla
  - test_no_eliminar_usuario_semilla(): DELETE /usuarios/{id} retorna 403 para usuario semilla

---

#### RF-04: Gestión de roles

**Ficha técnica:**
Yo como Administrador, quiero crear roles personalizados y asignar permisos organizados por módulo, para definir las funciones de los empleados según su puesto.

**Criterios de Aceptación:**
- [ ] CA-1: El administrador puede crear nuevos roles
- [ ] CA-2: El administrador puede asignar permisos a cada rol
- [ ] CA-3: Los permisos están organizados por módulo
- [ ] CA-4: Los roles se estructuran correctamente en la base de datos

**Pruebas Unitarias Asociadas:**
  - test_crear_rol(): POST /roles crea un rol con permisos asignados
  - test_asignar_permisos(): PUT /roles/{id} actualiza permisos del rol
  - test_rol_con_permisos_organizados(): GET /roles retorna roles con permisos agrupados por módulo

---

#### RF-05: Gestión de permisos

**Ficha técnica:**
Yo como Administrador, quiero disponer de 28 permisos granulares con el patrón módulo:acción, para controlar de manera específica el acceso a cada funcionalidad.

**Criterios de Aceptación:**
- [ ] CA-1: Existen exactamente 28 permisos semilla
- [ ] CA-2: Cada permiso sigue el patrón `módulo:acción`
- [ ] CA-3: Los permisos sirven de base para la seguridad del sistema

**Pruebas Unitarias Asociadas:**
  - test_28_permisos_semilla(): La base de datos contiene exactamente 28 permisos
  - test_patron_modulo_accion(): Cada permiso sigue el patrón módulo:acción
  - test_permisos_base_seguridad(): Los permisos se utilizan correctamente en la verificación de acceso

---

#### RF-06: Control de acceso basado en roles

**Ficha técnica:**
Yo como Usuario, quiero que mi acceso a las rutas y funcionalidades esté restringido según mi rol y permisos, para no ingresar a secciones no autorizadas.

**Criterios de Aceptación:**
- [ ] CA-1: Las rutas protegidas verifican el token JWT
- [ ] CA-2: Los permisos del token determinan el acceso a funcionalidades
- [ ] CA-3: El acceso no autorizado redirige al dashboard
- [ ] CA-4: Las secciones no autorizadas se ocultan automáticamente

**Pruebas Unitarias Asociadas:**
  - test_acceso_permitido(): Ruta protegida permite acceso con token válido y permisos correctos
  - test_acceso_denegado(): Ruta protegida deniega acceso sin permisos requeridos
  - test_redireccion_dashboard(): Acceso no autorizado redirige a /dashboard

---

#### RF-07: Edición de perfil

**Ficha técnica:**
Yo como Usuario, quiero actualizar mi propio nombre de usuario y contraseña desde la página de perfil, para mantener mis credenciales de acceso actualizadas.

**Criterios de Aceptación:**
- [ ] CA-1: El usuario puede editar su nombre de usuario
- [ ] CA-2: El usuario puede cambiar su contraseña validando la actual
- [ ] CA-3: Los nuevos datos se validan por seguridad

**Pruebas Unitarias Asociadas:**
  - test_editar_nombre_usuario(): PUT /usuarios/perfil actualiza nombre de usuario
  - test_cambiar_contrasena(): PUT /usuarios/perfil con contraseña actual válida cambia contraseña
  - test_contrasena_actual_incorrecta(): PUT /usuarios/perfil con contraseña actual incorrecta retorna 400

---

#### RF-08: Dashboard permisionado

**Ficha técnica:**
Yo como Usuario, quiero visualizar módulos de acceso condicionados a mis permisos, para navegar de forma limpia por la interfaz.

**Criterios de Aceptación:**
- [ ] CA-1: Los módulos se muestran según permisos del usuario
- [ ] CA-2: Las secciones no autorizadas se ocultan automáticamente
- [ ] CA-3: La interfaz se renderiza de forma limpia

**Pruebas Unitarias Asociadas:**
  - test_modulos_según_permisos(): Dashboard muestra solo módulos autorizados por permisos del usuario
  - test_ocultar_secciones_no_autorizadas(): Secciones no autorizadas no aparecen en el DOM

---

#### RF-09: CRUD de servicios funerarios

**Ficha técnica:**
Yo como Usuario, quiero crear, listar, editar y eliminar servicios funerarios, para administrar los contratos de la funeraria.

**Criterios de Aceptación:**
- [ ] CA-1: El formulario incluye selección obligatoria de ataúd, capilla, vehículos
- [ ] CA-2: El formulario incluye tipo de pago, dirección de velación, fecha y cantidad de cargadores
- [ ] CA-3: El servicio se crea con todas las relaciones obligatorias
- [ ] CA-4: El administrador puede listar, editar y eliminar servicios

**Pruebas Unitarias Asociadas:**
  - test_crear_servicio(): POST /servicios crea servicio con todas las relaciones obligatorias
  - test_servicio_requiere_ataude(): POST /servicio sin ataúd retorna 400
  - test_listar_servicios(): GET /servicios retorna lista de servicios
  - test_editar_servicio(): PUT /servicios/{id} actualiza datos del servicio
  - test_eliminar_servicio(): DELETE /servicios/{id} elimina servicio y restaura inventario

---

#### RF-10: Creación automática de contratante

**Ficha técnica:**
Yo como Usuario, quiero que el sistema verifique si el contratante ya existe por su DNI al momento de crear un servicio, para agilizar el proceso de registro.

**Criterios de Aceptación:**
- [ ] CA-1: El sistema busca contratante por DNI al crear servicio
- [ ] CA-2: Si el contratante existe, se reutiliza su información
- [ ] CA-3: Si no existe, se crea un nuevo registro automáticamente

**Pruebas Unitarias Asociadas:**
  - test_contratante_existente_se_reutiliza(): Si DNI existe en Contratante, se reutiliza el registro
  - test_contratante_nuevo_se_crea(): Si DNI no existe, se crea nuevo Contratante automáticamente

---

#### RF-11: Creación automática de fallecido

**Ficha técnica:**
Yo como Usuario, quiero que el sistema genere automáticamente un registro del fallecido asociado al crear un servicio, para mantener vinculada la información del difunto.

**Criterios de Aceptación:**
- [ ] CA-1: Al crear servicio se genera registro de fallecido automáticamente
- [ ] CA-2: Se mantiene la integridad de los datos de la operación

**Pruebas Unitarias Asociadas:**
  - test_fallecido_se_crea_con_servicio(): Al crear servicio, se genera registro de fallecido automáticamente
  - test_integridad_datos_operacion(): La vinculación Servicio-Fallecido se mantiene íntegra

---

#### RF-12: Control de stock de ataúdes

**Ficha técnica:**
Yo como Usuario, quiero que el stock de ataúdes se reduzca automáticamente al asignar uno a un servicio, para controlar el inventario físico en tiempo real.

**Criterios de Aceptación:**
- [ ] CA-1: Al asignar ataúd a servicio, el stock se reduce automáticamente
- [ ] CA-2: Al eliminar servicio, el stock se restaura correctamente
- [ ] CA-3: El stock nunca queda en valores negativos

**Pruebas Unitarias Asociadas:**
  - test_stock_se_reduce(): Al asignar ataúd a servicio, stock del ataúd se reduce en 1
  - test_stock_se_restaura(): Al eliminar servicio, stock del ataúd se restaura en 1
  - test_stock_nunca_negativo(): Intento de asignar ataúd sin stock retorna error

---

#### RF-13: Control de stock de capillas

**Ficha técnica:**
Yo como Usuario, quiero que el stock de capillas se reduzca automáticamente al asignar una a un servicio, para conocer la disponibilidad de los espacios de velación.

**Criterios de Aceptación:**
- [ ] CA-1: Al asignar capilla a servicio, el stock se reduce automáticamente
- [ ] CA-2: Al eliminar servicio, el stock se restaura correctamente
- [ ] CA-3: El stock nunca queda en valores negativos

**Pruebas Unitarias Asociadas:**
  - test_stock_capilla_se_reduce(): Al asignar capilla a servicio, stock se reduce en 1
  - test_stock_capilla_se_restaura(): Al eliminar servicio, stock de capilla se restaura
  - test_stock_capilla_nunca_negativo(): Intento de asignar capilla sin stock retorna error

---

#### RF-14: Asignación de vehículos

**Ficha técnica:**
Yo como Usuario, quiero asignar uno o más vehículos a un servicio, para planificar los traslados del cortejo funerario.

**Criterios de Aceptación:**
- [ ] CA-1: Se pueden asignar uno o más vehículos a un servicio
- [ ] CA-2: Solo se pueden asignar vehículos en estado activo
- [ ] CA-3: La validación de estado es estricta

**Pruebas Unitarias Asociadas:**
  - test_asignar_multiples_vehiculos(): Se pueden asignar múltiples vehículos a un servicio
  - test_vehiculo_inactivo_rechazado(): Intento de asignar vehículo inactivo retorna error
  - test_estado_vehiculo_validado(): Solo vehículos con estado 'activo' aparecen en el selector

---

#### RF-15: Paginación y filtrado de servicios

**Ficha técnica:**
Yo como Usuario, quiero listar los servicios con paginación y filtros específicos, para realizar búsquedas eficientes dentro de la plataforma.

**Criterios de Aceptación:**
- [ ] CA-1: Los servicios se listan con paginación (page, limit)
- [ ] CA-2: Se puede filtrar por nombre del contratante
- [ ] CA-3: Se puede filtrar por DNI del contratante
- [ ] CA-4: Se puede filtrar por DNI del fallecido
- [ ] CA-5: Se puede filtrar por fecha

**Pruebas Unitarias Asociadas:**
  - test_paginacion_servicios(): GET /servicios?page=1&limit=10 retorna página correcta
  - test_filtro_por_nombre(): GET /servicios?nombre=X retorna solo servicios con ese nombre
  - test_filtro_por_dni_contratante(): GET /servicios?dni_contratante=X filtra correctamente
  - test_filtro_por_fecha(): GET /servicios?fecha=2025-01-01 filtra por fecha

---

#### RF-16: CRUD de ataúdes

**Ficha técnica:**
Yo como Usuario, quiero crear, listar, editar, eliminar, ajustar stock y activar/desactivar registros de ataúdes, para gestionar el catálogo de productos disponibles.

**Criterios de Aceptación:**
- [ ] CA-1: Se puede crear un ataúd con modelo, color y stock
- [ ] CA-2: Se puede listar con filtros por modelo y color
- [ ] CA-3: Se puede editar y ajustar stock
- [ ] CA-4: Se puede activar/desactivar y eliminar

**Pruebas Unitarias Asociadas:**
  - test_crear_ataude(): POST /ataudes crea un ataúd con datos válidos
  - test_listar_ataudes_con_filtros(): GET /ataudes?modelo=X&color=Y filtra correctamente
  - test_ajustar_stock_ataude(): PATCH /ataudes/{id}/stock ajusta stock del ataúd
  - test_eliminar_ataude(): DELETE /ataudes/{id} elimina ataúd

---

#### RF-17: CRUD de capillas

**Ficha técnica:**
Yo como Usuario, quiero crear, listar, editar, eliminar, ajustar stock y activar/desactivar registros de capillas, para administrar la infraestructura de velatorios de la empresa.

**Criterios de Aceptación:**
- [ ] CA-1: Se puede crear una capilla con modelo y stock
- [ ] CA-2: Se puede listar con filtro por modelo
- [ ] CA-3: Se puede editar y ajustar stock
- [ ] CA-4: Se puede activar/desactivar y eliminar

**Pruebas Unitarias Asociadas:**
  - test_crear_capilla(): POST /capillas crea una capilla con datos válidos
  - test_listar_capillas_con_filtro(): GET /capillas?modelo=X filtra correctamente
  - test_ajustar_stock_capilla(): PATCH /capillas/{id}/stock ajusta stock
  - test_eliminar_capilla(): DELETE /capillas/{id} elimina capilla

---

#### RF-18: CRUD de vehículos

**Ficha técnica:**
Yo como Usuario, quiero crear, listar, editar, eliminar y activar/desactivar vehículos, para controlar la flota de transporte de la funeraria.

**Criterios de Aceptación:**
- [ ] CA-1: Se puede crear un vehículo con tipo, placa y estado
- [ ] CA-2: Los tipos se limitan a 5 valores diferentes
- [ ] CA-3: Se puede listar, editar, activar/desactivar y eliminar

**Pruebas Unitarias Asociadas:**
  - test_crear_vehiculo(): POST /vehiculos crea un vehículo con tipo válido
  - test_tipo_limitado_5_valores(): POST /vehiculo con tipo fuera de los 5 permitidos retorna 400
  - test_listar_vehiculos(): GET /vehiculos retorna lista de vehículos
  - test_eliminar_vehiculo(): DELETE /vehiculos/{id} elimina vehículo

---

#### RF-19: CRUD de contratantes

**Ficha técnica:**
Yo como Usuario, quiero listar, editar y activar/desactivar contratantes, para mantener actualizado el registro de clientes.

**Criterios de Aceptación:**
- [ ] CA-1: Se puede listar contratantes con filtros por nombre y DNI
- [ ] CA-2: Se puede editar información de contratante
- [ ] CA-3: Se puede activar/desactivar contratante
- [ ] CA-4: La unicidad del DNI se valida a nivel de base de datos

**Pruebas Unitarias Asociadas:**
  - test_listar_contratantes(): GET /contratantes retorna lista de contratantes
  - test_filtro_por_dni(): GET /contratantes?dni=X filtra por DNI
  - test_unicidad_dni(): POST /contratantes con DNI duplicado retorna 409
  - test_editar_contratante(): PUT /contratantes/{id} actualiza datos

---

#### RF-20: CRUD de fallecidos

**Ficha técnica:**
Yo como Usuario, quiero listar, editar y activar/desactivar registros de fallecidos, para gestionar el histórico de personas atendidas.

**Criterios de Aceptación:**
- [ ] CA-1: Se puede listar fallecidos con filtros
- [ ] CA-2: Se puede editar información de fallecido
- [ ] CA-3: Se puede activar/desactivar fallecido
- [ ] CA-4: La eliminación se bloquea si existen servicios activos asociados

**Pruebas Unitarias Asociadas:**
  - test_listar_fallecidos(): GET /fallecidos retorna lista de fallecidos
  - test_editar_fallecido(): PUT /fallecidos/{id} actualiza datos
  - test_bloquear_eliminacion_con_servicios(): DELETE /fallecidos/{id} con servicios activos retorna 409

---

#### RF-21: Predicción de demanda con ML

**Ficha técnica:**
Yo como Usuario, quiero visualizar predicciones mensuales de servicios e ingresos totales utilizando el motor de Machine Learning, para planificar las estrategias comerciales de la empresa.

**Criterios de Aceptación:**
- [ ] CA-1: Se emplean seis modelos predictivos (SARIMA, Prophet, XGBoost, LightGBM, LSTM, ETS)
- [ ] CA-2: El horizonte de predicción es de 1 a 24 meses
- [ ] CA-3: Se visualizan predicciones de servicios e ingresos totales
- [ ] CA-4: El usuario puede seleccionar el modelo y el horizonte

**Pruebas Unitarias Asociadas:**
  - test_prediccion_con_6_modelos(): POST /predict con cada uno de los 6 modelos retorna predicciones válidas
  - test_horizonte_1_a_24_meses(): POST /predict con horizonte fuera de rango retorna 400
  - test_prediccion_servicios_e_ingresos(): La respuesta contiene predicciones de servicios_totales y monto_total
  - test_seleccion_modelo(): POST /predict con model=prophet usa Prophet para predecir

---

#### RF-22: Visualización de métricas

**Ficha técnica:**
Yo como Usuario, quiero revisar las métricas de precisión del modelo predictivo, para evaluar la fiabilidad de las proyecciones del sistema.

**Criterios de Aceptación:**
- [ ] CA-1: Se muestran los indicadores MAE, RMSE, R² y MAPE
- [ ] CA-2: Las métricas corresponden al modelo seleccionado

**Pruebas Unitarias Asociadas:**
  - test_metricas_mae_rmse_r2_mape(): GET /metrics retorna MAE, RMSE, R2 y MAPE
  - test_metricas_modelo_seleccionado(): GET /metrics?model=prophet retorna métricas de Prophet

---

#### RF-23: Distribución de inventario

**Ficha técnica:**
Yo como Usuario, quiero predecir la distribución de ataúdes y capillas por tipo necesarios en cada mes, para optimizar el stock físico futuro.

**Criterios de Aceptación:**
- [ ] CA-1: Se calcula distribución de ataúdes por tipo
- [ ] CA-2: Se calcula distribución de capillas por tipo
- [ ] CA-3: El cálculo se basa en el rango de meses seleccionado

**Pruebas Unitarias Asociadas:**
  - test_distribucion_ataudes_por_tipo(): POST /predict/distribution retorna distribución de ataúdes por tipo
  - test_distribucion_capillas_por_tipo(): POST /predict/distribution retorna distribución de capillas por tipo
  - test_rango_meses(): POST /predict/distribution con rango de meses válido retorna distribución

---

#### RF-24: Visualización de datos históricos

**Ficha técnica:**
Yo como Usuario, quiero visualizar gráficos de series temporales con los datos históricos de servicios e ingresos totales, para evaluar la evolución del negocio en el tiempo.

**Criterios de Aceptación:**
- [ ] CA-1: Se muestran datos desde mayo de 2022 hasta febrero de 2026
- [ ] CA-2: Se visualizan servicios e ingresos totales

**Pruebas Unitarias Asociadas:**
  - test_datos_historicos_rango(): GET /historical retorna datos desde 2022-05 hasta 2026-02
  - test_datos_servicios_e_ingresos(): GET /historical contiene servicios_totales y monto_total

---

#### RF-25: Gráficos interactivos

**Ficha técnica:**
Yo como Usuario, quiero interactuar con gráficos de área, líneas, barras y barras apiladas utilizando ApexCharts, para analizar de forma dinámica las predicciones y distribuciones.

**Criterios de Aceptación:**
- [ ] CA-1: Se utilizan gráficos de área, líneas, barras y barras apiladas
- [ ] CA-2: La librería utilizada es ApexCharts
- [ ] CA-3: La interfaz responde de manera fluida

**Pruebas Unitarias Asociadas:**
  - test_tipos_grafico(): El componente renderiza gráficos de área, líneas, barras y apiladas
  - test_fluid_interfaz(): Los gráficos se renderizan sin bloqueo de la interfaz

---

#### RF-26: Eliminación en cascada

**Ficha técnica:**
Yo como Usuario, quiero que al eliminar un servicio se desencadene la eliminación en cascada de sus datos vinculados, para mantener la consistencia y limpieza de los datos.

**Criterios de Aceptación:**
- [ ] CA-1: Al eliminar servicio se remueven pasajeros vinculados
- [ ] CA-2: Se remueven enlaces de vehículos
- [ ] CA-3: Se remueven registros huérfanos
- [ ] CA-4: Se restaura el inventario de ataúdes y capillas

**Pruebas Unitarias Asociadas:**
  - test_eliminacion_pasajeros(): Al eliminar servicio, pasajeros vinculados se eliminan
  - test_eliminacion_enlaces_vehiculos(): Al eliminar servicio, enlaces Vehiculo-Servicio se eliminan
  - test_restauracion_inventario(): Al eliminar servicio, stock de ataúd y capilla se restaura

---

#### RF-27: Sidebar responsivo

**Ficha técnica:**
Yo como Usuario, quiero que el sidebar de navegación se colapse automáticamente en pantallas menores a 768px, para utilizar el sistema cómodamente desde dispositivos móviles.

**Criterios de Aceptación:**
- [ ] CA-1: El sidebar se colapsa en pantallas menores a 768px
- [ ] CA-2: Se muestra un botón tipo hamburguesa para desplegarlo
- [ ] CA-3: El sidebar se despliega/colapsa con animación

**Pruebas Unitarias Asociadas:**
  - test_sidebar_colapsa(): En pantalla < 768px, el sidebar cambia a estado colapsado
  - test_boton_hamburguesa_visible(): En pantalla < 768px, se muestra botón hamburguesa
  - test_toggle_sidebar(): Al hacer clic en hamburguesa, el sidebar se despliega/colapsa

---

#### RF-28: Notificaciones toast

**Ficha técnica:**
Yo como Usuario, quiero recibir notificaciones toast de éxito, error e información, para conocer al instante el resultado de mis acciones.

**Criterios de Aceptación:**
- [ ] CA-1: Se muestran notificaciones de tipo éxito, error e información
- [ ] CA-2: La duración automática en pantalla es de 3.5 segundos
- [ ] CA-3: Las notificaciones se muestran de forma no intrusiva

**Pruebas Unitarias Asociadas:**
  - test_toast_exito(): NotificationService.success() muestra toast de éxito
  - test_toast_error(): NotificationService.error() muestra toast de error
  - test_duracion_3_5_segundos(): El toast se cierra automáticamente después de 3.5 segundos

---

#### RF-29: Diálogos de confirmación

**Ficha técnica:**
Yo como Usuario, quiero responder a una solicitud de confirmación explícita, para evitar la ejecución de errores involuntarios.

**Criterios de Aceptación:**
- [ ] CA-1: El diálogo aparece antes de acciones destructivas
- [ ] CA-2: El usuario puede confirmar o cancelar
- [ ] CA-3: La acción solo se ejecuta al confirmar

**Pruebas Unitarias Asociadas:**
  - test_dialogo_antes_destruccion(): Eliminar servicio muestra diálogo de confirmación
  - test_confirmacion_ejecuta_accion(): Al confirmar, la acción destructiva se ejecuta
  - test_cancelacion_no_ejecuta(): Al cancelar, la acción destructiva no se ejecuta

---

#### RF-30: Autenticación automática expirada

**Ficha técnica:**
Yo como Usuario, quiero ser redirigido automáticamente al login si el guard de autenticación detecta que el token ha caducado, para proteger la seguridad de la información del sistema.

**Criterios de Aceptación:**
- [ ] CA-1: El guard detecta token expirado al acceder a rutas protegidas
- [ ] CA-2: Se redirige automáticamente a `/login`
- [ ] CA-3: La activación es inmediata al cumplirse las 8 horas

**Pruebas Unitarias Asociadas:**
  - test_token_expirado_detectado(): AuthGuard detecta token con exp < Date.now()
  - test_redireccion_login(): Token expirado redirige a /login automáticamente
  - test_activacion_inmediata(): Al cumplirse 8 horas, el guard redirige inmediatamente

---

### 2.2 Tarjetas de Historias de Usuario — Requisitos No Funcionales

---

#### RNF-01: Autenticación JWT

**Ficha técnica:**
La plataforma debe utilizar tokens JWT con algoritmo HS256 y expiración de 8 horas para la gestión de sesiones.

**Criterios de Aceptación:**
- [ ] CA-1: Se utiliza el algoritmo HS256 para firmar tokens
- [ ] CA-2: Los tokens expiran después de 8 horas
- [ ] CA-3: Los claims incluyen sub, exp, roles y permisos

**Pruebas Unitarias Asociadas:**
  - test_algoritmo_hs256(): El token se firma con algoritmo HS256
  - test_expiracion_8_horas(): El token expira exactamente después de 28800 segundos
  - test_claims_completos(): El token contiene sub, exp, roles y permisos

---

#### RNF-02: Hashing de contraseñas

**Ficha técnica:**
La base de datos debe almacenar contraseñas hasheadas con bcrypt, garantizando que no se guarden en texto plano.

**Criterios de Aceptación:**
- [ ] CA-1: Las contraseñas se hashean con bcrypt antes de almacenar
- [ ] CA-2: Nunca se almacenan contraseñas en texto plano
- [ ] CA-3: La verificación utiliza bcrypt.checkpw()

**Pruebas Unitarias Asociadas:**
  - test_contrasena_hasheada_bcrypt(): La contraseña almacenada comienza con $2b$ (bcrypt)
  - test_no_texto_plano(): La contraseña en BD no coincide con el texto plano ingresado
  - test_verificacion_bcrypt(): bcrypt.checkpw() retorna True con contraseña correcta

---

#### RNF-03: Arquitectura de microservicios

**Ficha técnica:**
El proyecto debe estar compuesto por al menos tres servicios independientes: frontend Angular, backend operativo y backend de IA/modelos, desplegables por separado.

**Criterios de Aceptación:**
- [ ] CA-1: Existen 3 servicios independientes
- [ ] CA-2: Cada servicio es desplegable por separado
- [ ] CA-3: Los servicios se comunican vía HTTP/REST

**Pruebas Unitarias Asociadas:**
  - test_tres_servicios_independientes(): Frontend, backend operativo y backend IA son desplegables por separado
  - test_comunicacion_http(): Los servicios se comunican mediante peticiones HTTP

---

#### RNF-04: CORS habilitado

**Ficha técnica:**
El backend debe configurar CORS para permitir solicitudes desde el dominio del frontend, habilitando headers de autorización.

**Criterios de Aceptación:**
- [ ] CA-1: CORS permite solicitudes desde el dominio del frontend
- [ ] CA-2: Se habilitan los headers Authorization y Content-Type
- [ ] CA-3: Los métodos permitidos incluyen GET, POST, PUT, DELETE, PATCH

**Pruebas Unitarias Asociadas:**
  - test_cors_origen_frontend(): El header Access-Control-Allow-Origin incluye el dominio del frontend
  - test_cors_headers_autorizacion(): El header Access-Control-Allow-Headers incluye Authorization
  - test_cors_metodos_permitidos(): Los métodos permitidos incluyen GET, POST, PUT, DELETE, PATCH

---

#### RNF-05: API RESTful

**Ficha técnica:**
El backend operativo debe exponer una API RESTful con endpoints estandarizados siguiendo convenciones HTTP.

**Criterios de Aceptación:**
- [ ] CA-1: Los endpoints usan métodos HTTP correctos (GET, POST, PUT, DELETE)
- [ ] CA-2: Los códigos de respuesta son apropiados (200, 201, 400, 404, 409, 500)
- [ ] CA-3: El naming de endpoints es coherente y consistente

**Pruebas Unitarias Asociadas:**
  - test_metodos_http_correctos(): GET para lectura, POST para creación, PUT para actualización, DELETE para eliminación
  - test_codigos_respuesta(): Los endpoints retornan códigos HTTP apropiados
  - test_naming_endpoints(): Los endpoints siguen convención /recurso o /recurso/{id}

---

#### RNF-06: Validación de datos

**Ficha técnica:**
La arquitectura debe validar todos los datos de entrada mediante esquemas Pydantic en el backend y modelos TypeScript en el frontend.

**Criterios de Aceptación:**
- [ ] CA-1: El backend valida con esquemas Pydantic en cada endpoint
- [ ] CA-2: El frontend valida con modelos TypeScript en cada formulario
- [ ] CA-3: Los datos inválidos se rechazan antes de llegar a la base de datos

**Pruebas Unitarias Asociadas:**
  - test_pydantic_validacion(): Datos inválidos en endpoint retornan error 422 de Pydantic
  - test_typescript_modelos(): Los formularios Angular validan con interfaces TypeScript
  - test_rechazo_datos_invalidos(): Los datos inválidos no se almacenan en la base de datos

---

#### RNF-07: Manejo de errores

**Ficha técnica:**
Las respuestas deben retornar códigos HTTP apropiados con mensajes descriptivos en caso de error.

**Criterios de Aceptación:**
- [ ] CA-1: Los errores retornan códigos HTTP correctos
- [ ] CA-2: Los mensajes de error son descriptivos
- [ ] CA-3: La respuesta tiene formato JSON consistente

**Pruebas Unitarias Asociadas:**
  - test_error_400_bad_request(): Datos inválidos retornan 400 con mensaje descriptivo
  - test_error_404_not_found(): Recurso inexistente retorna 404 con mensaje
  - test_error_409_conflict(): Conflicto de duplicidad retorna 409 con mensaje
  - test_formato_json_errores(): Los errores retornan JSON con clave 'detail'

---

#### RNF-08: Middleware de errores global

**Ficha técnica:**
El backend debe implementar un middleware que capture excepciones no manejadas y retorne respuestas consistentes.

**Criterios de Aceptación:**
- [ ] CA-1: El middleware captura excepciones no manejadas
- [ ] CA-2: Las respuestas de error son consistentes en formato
- [ ] CA-3: Los errores se registran en logs

**Pruebas Unitarias Asociadas:**
  - test_middleware_captura_excepciones(): Excepción no manejada es capturada por el middleware
  - test_respuesta_consistente(): El middleware retorna JSON con formato consistente
  - test_errores_en_logs(): Los errores se registran en el sistema de logging

---

#### RNF-09: Seed automático

**Ficha técnica:**
La base de datos debe crear automáticamente al primer inicio: permisos, roles por defecto (Administrador, Trabajador) y el usuario administrador.

**Criterios de Aceptación:**
- [ ] CA-1: Al primer inicio se crean 28 permisos
- [ ] CA-2: Se crean los roles Administrador y Trabajador
- [ ] CA-3: Se crea el usuario administrador semilla

**Pruebas Unitarias Asociadas:**
  - test_permisos_semilla_creados(): Al iniciar, se crean 28 permisos en la base de datos
  - test_roles_por_defecto(): Al iniciar, existen los roles Administrador y Trabajador
  - test_usuario_admin_semilla(): Al iniciar, existe el usuario administrador semilla

---

#### RNF-10: Migración automática de esquema

**Ficha técnica:**
El backend debe crear las tablas de la base de datos automáticamente al iniciar el servidor mediante SQLModel metadata.

**Criterios de Aceptación:**
- [ ] CA-1: Las tablas se crean automáticamente al iniciar FastAPI
- [ ] CA-2: Se utiliza SQLModel.metadata.create_all()
- [ ] CA-3: No se requiere ejecución manual de migraciones

**Pruebas Unitarias Asociadas:**
  - test_tablas_creadas_al_iniciar(): Al iniciar el servidor, todas las tablas existen en la BD
  - test_sqlmodel_metadata(): Se utiliza SQLModel.metadata.create_all() para crear tablas

---

#### RNF-11: Independencia de base de datos de IA

**Ficha técnica:**
El backend de IA/modelos no debe depender de una base de datos relacional, utilizando archivos serializados (.pkl, .keras) y metadatos en JSON.

**Criterios de Aceptación:**
- [ ] CA-1: El backend IA carga modelos desde archivos .pkl/.keras
- [ ] CA-2: Los metadatos se almacenan en JSON
- [ ] CA-3: No existe conexión a PostgreSQL desde el backend IA

**Pruebas Unitarias Asociadas:**
  - test_modelos_desde_archivos(): El backend IA carga modelos desde archivos .pkl/.keras
  - test_metadatos_json(): Los metadatos del modelo se almacenan en JSON
  - test_sin_conexion_postgresql(): El backend IA no tiene conexión a PostgreSQL

---

#### RNF-12: Componentes standalone Angular

**Ficha técnica:**
El frontend debe utilizar componentes standalone de Angular (sin NgModules) para una arquitectura modular y lazy-loading nativo.

**Criterios de Aceptación:**
- [ ] CA-1: Todos los componentes son standalone
- [ ] CA-2: No se utilizan NgModules
- [ ] CA-3: Los módulos se importan directamente en el componente

**Pruebas Unitarias Asociadas:**
  - test_componentes_standalone(): Todos los componentes tienen standalone: true
  - test_sin_ngmodules(): No existen archivos .module.ts en el proyecto

---

#### RNF-13: Lazy loading de rutas

**Ficha técnica:**
Los módulos de roles y predicciones deben implementar lazy loading para optimizar el tiempo de carga inicial.

**Criterios de Aceptación:**
- [ ] CA-1: Las rutas de predicciones usan loadChildren()
- [ ] CA-2: Las rutas de roles usan loadChildren()
- [ ] CA-3: Los módulos se cargan bajo demanda

**Pruebas Unitarias Asociadas:**
  - test_lazy_loading_predicciones(): La ruta /predicciones usa loadChildren() para carga diferida
  - test_lazy_loading_roles(): La ruta /roles usa loadChildren() para carga diferida

---

#### RNF-14: Diseño responsivo

**Ficha técnica:**
La interfaz del frontend debe adaptarse a pantallas de escritorio y móviles, con punto de quiebre en 768px para el sidebar.

**Criterios de Aceptación:**
- [ ] CA-1: La interfaz se adapta a escritorio y móvil
- [ ] CA-2: El sidebar tiene breakpoint en 768px
- [ ] CA-3: Los layouts son flexibles con Flex Layout o CSS Grid

**Pruebas Unitarias Asociadas:**
  - test_adaptable_escritorio_movil(): La interfaz se renderiza correctamente en ambos tamaños
  - test_breakpoint_768px(): El sidebar cambia de estado a 768px

---

#### RNF-15: Persistencia de estado de autenticación

**Ficha técnica:**
El navegador debe almacenar el token JWT, roles y permisos en localStorage para persistir entre recargas de página.

**Criterios de Aceptación:**
- [ ] CA-1: El token JWT se almacena en localStorage
- [ ] CA-2: Los roles y permisos se almacenan en localStorage
- [ ] CA-3: Los datos persisten entre recargas de página
- [ ] CA-4: Se limpian al cerrar sesión

**Pruebas Unitarias Asociadas:**
  - test_token_en_localstorage(): El token JWT se almacena en localStorage después del login
  - test_roles_en_localstorage(): Los roles se almacenan en localStorage
  - test_persistencia_recarga(): Los datos persisten al recargar la página
  - test_limpieza_logout(): Al cerrar sesión, localStorage se limpia

---

#### RNF-16: Interceptor HTTP

**Ficha técnica:**
El frontend debe implementar un interceptor HTTP que adjunte automáticamente el token Bearer en todas las solicitudes al backend.

**Criterios de Aceptación:**
- [ ] CA-1: El interceptor agrega el header Authorization automáticamente
- [ ] CA-2: El formato es `Bearer {token}`
- [ ] CA-3: Se aplica a todas las solicitudes HTTP del frontend

**Pruebas Unitarias Asociadas:**
  - test_interceptor_agrega_bearer(): El interceptor agrega Authorization: Bearer {token}
  - test_aplica_todas_solicitudes(): Todas las peticiones HTTP incluyen el header de autorización

---

#### RNF-17: Protección de registros base

**Ficha técnica:**
El sistema debe proteger los roles "Administrador" y "Superadmin", así como el usuario semilla, contra eliminación accidental.

**Criterios de Aceptación:**
- [ ] CA-1: El rol "Administrador" no se puede eliminar
- [ ] CA-2: El rol "Superadmin" no se puede eliminar
- [ ] CA-3: El usuario semilla no se puede eliminar
- [ ] CA-4: La eliminación retorna error 403

**Pruebas Unitarias Asociadas:**
  - test_no_eliminar_rol_administrador(): DELETE /roles/{id_admin} retorna 403
  - test_no_eliminar_rol_superadmin(): DELETE /roles/{id_superadmin} retorna 403
  - test_no_eliminar_usuario_semilla(): DELETE /usuarios/{id_semilla} retorna 403

---

#### RNF-18: Unicidad de DNI de contratante

**Ficha técnica:**
La base de datos debe garantizar la unicidad del DNI del contratante a nivel de tabla, retornando error 409 en caso de duplicidad.

**Criterios de Aceptación:**
- [ ] CA-1: La columna DNI tiene constraint UNIQUE
- [ ] CA-2: La inserción con DNI duplicado retorna error 409
- [ ] CA-3: La unicidad se verifica a nivel de base de datos

**Pruebas Unitarias Asociadas:**
  - test_dni_unico_constraint(): La tabla Contratantes tiene constraint UNIQUE en DNI
  - test_dni_duplicado_409(): INSERT con DNI duplicado retorna error 409

---

#### RNF-19: Serialización del modelo ML

**Ficha técnica:**
El servidor debe cargar los modelos de machine learning en formato .pkl/.keras para asegurar una carga rápida sin reentrenamiento.

**Criterios de Aceptación:**
- [ ] CA-1: Los modelos se guardan en formato .pkl (joblib) y .keras (SavedModel)
- [ ] CA-2: Los modelos se cargan al iniciar el servidor
- [ ] CA-3: No se realiza reentrenamiento al cargar

**Pruebas Unitarias Asociadas:**
  - test_modelos_pkl_keras(): Los modelos se guardan en formato .pkl y .keras
  - test_carga_sin_reentrenamiento(): Al iniciar el servidor, los modelos se cargan sin reentrenar
  - test_modelos_funcionales(): Los modelos cargados generan predicciones válidas

---

## 3. CRISP-DM

### 3.1 Comprensión del Negocio

#### 3.1.1 Contexto del Problema

La Funeraria Aranzabal, ubicada en Trujillo, enfrenta una dualidad crítica que afecta su competitividad:

> *"La gestión actual del inventario en la funeraria enfrenta una dualidad crítica que afecta su competitividad: por un lado, una ineficiencia operativa debido a procesos de control manuales y descentralizados, lo que genera retrasos en el flujo de información y susceptibilidad a errores en el registro de existencias; y por otro lado, una deficiencia estratégica al basar la reposición de stock únicamente en la intuición y la experiencia empírica; provocando quiebres de inventario (desabastecimiento de ataúdes u otros insumos críticos) o sobrecostos logísticos por exceso de almacenamiento, limitando la toma de decisiones óptimas en la empresa."*
> — Project Charter

El caso de negocio se fundamenta en la necesidad crítica de modernizar la gestión de existencias, donde la actual dependencia de procesos de registro manuales e intuitivos compromete la rentabilidad y la continuidad operativa. La carencia de una herramienta tecnológica centralizada genera un escenario de incertidumbre en el control de almacén, lo que deriva en quiebres de stock recurrentes y sobrecostos logísticos debido a compras de último minuto.

#### 3.1.2 Transformación a Problema Técnico de Machine Learning

El problema de negocio se traduce en un problema técnico de **predicción de series temporales**:

- **Variable objetivo 1:** Demanda mensual de servicios funerarios (`servicios_totales`)
- **Variable objetivo 2:** Ingresos mensuales totales (`monto_total`)
- **Horizonte de predicción:** 1 a 24 meses
- **Frecuencia:** Mensual
- **Datos históricos:** Mayo 2022 — Febrero 2026 (46 meses)

La solución implica investigar, comparar y optimizar modelos de series temporales en Python para predecir la demanda futura, permitiendo una transición de una gestión puramente empírica a una estrategia guiada por evidencia analítica.

#### 3.1.3 Objetivos del Proyecto

**Objetivo General:**
> Desarrollar e implementar un sistema web con funcionalidades predictivas mediante un modelo de Machine Learning de series temporales para mejorar la eficiencia en la gestión del inventario y mitigar los quiebres de stock en la Funeraria Aranzabal de Trujillo, en un periodo aproximado de 10 semanas y con un costo de infraestructura inicial optimizado.

**Objetivos Específicos:**

1. **Implementar los módulos transaccionales del sistema web** para centralizar la gestión operativa de la Funeraria Aranzabal.

2. **Implementar el modelo de Machine Learning de series temporales** para la predicción de la demanda de suministros de la funeraria.

3. **Integrar el módulo predictivo optimizado** dentro de la arquitectura del sistema web, garantizando una comunicación eficiente entre el backend analítico y la interfaz de usuario.

4. **Desplegar el sistema web con funcionalidades predictivas** garantizando la viabilidad financiera, temporal y la adopción de usuarios.

### 3.2 Comprensión de los Datos

#### 3.2.1 Fuentes de Datos

El proyecto utiliza múltiples versiones del dataset a lo largo del pipeline:

| Archivo | Descripción | Registros | Columnas |
|:--------|:------------|:----------|:---------|
| `Dataset_crudo.xlsx` | Cuaderno digitalizado (crudo) | 340 | 18 |
| `dataset_limpio.xlsx` | Dataset limpiado y preprocesado | 340 | 16 |
| `dataset_mensual.xlsx` | Agregación mensual (modelo ML) | 46 | 219 |
| `comparativa_modelos.xlsx` | Resultados de comparación | 12 | 7 |
| `predicciones_todos_modelos.xlsx` | Predicciones puntuales | 144 | 6 |

**Dataset principal para ML:** `dataset_mensual.xlsx` (46 registros mensuales × 219 columnas)

**Período histórico:** Mayo 2022 — Febrero 2026 (46 meses consecutivos)

#### 3.2.2 Variables del Dataset

**Variables de salida (target):**

| Variable | Tipo | Rango | Descripción |
|:---------|:-----|:------|:------------|
| `servicios_totales` | Entera | 0 — 21 | Cantidad total de servicios funerarios por mes |
| `monto_total` | Numérica | S/ 0 — S/ 881,350 | Ingresos totales del mes |

**Variables de entrada (features):**

| Categoría | Cantidad | Ejemplos |
|:----------|:---------|:---------|
| `Ataud_Modelo_*` | 85 columnas | `Ataud_Modelo_Americano`, `Ataud_Modelo_Lincoln`, `Ataud_Modelo_Biblia`, `Ataud_Modelo_Principe`, `Ataud_Modelo_Madera`, `Ataud_Modelo_Imperial`, `Ataud_Modelo_sin_ataud` |
| `Ataud_Color_*` | 45 columnas | `Ataud_Color_Madera`, `Ataud_Color_Blanco`, `Ataud_Color_Natural`, `Ataud_Color_Perla`, `Ataud_Color_Mate`, `Ataud_Color_no_especificado` |
| `Capilla_*` | 79 columnas | `Capilla_Iluminada`, `Capilla_Capilla Americana`, `Capilla_Milano`, `Capilla_Iluminada de Madera`, `Capilla_sin_capilla` |
| Auxiliares | 8 columnas | `Periodo`, `monto_promedio`, `monto_mediana`, `carroza_count`, `carroza_flores_count`, `auto_count`, `microbus_count`, `cargadores_total` |

**Variables del dataset individual (`dataset_limpio.xlsx`, 340 registros):**

| Variable | Tipo | Descripción |
|:---------|:-----|:------------|
| `Fecha` | datetime | Fecha del servicio (2022-05-16 a 2026-02-06) |
| `Forma de pago` | string | directo (90), mixto (107), seguro (72), no_especificado (71) |
| `Ataud_Modelo` | string | Modelo del ataúd utilizado |
| `Ataud_Color` | string | Color del ataúd |
| `Capilla` | string | Capilla asignada |
| `Carroza` | int | Servicio incluye carroza (0/1) |
| `Carroza flores` | int | Servicio incluye carroza de flores (0/1) |
| `Cargadores` | int | Cantidad de cargadores |
| `Auto` | int | Servicio incluye auto (0/1) |
| `Microbus` | int | Servicio incluye microbús (0/1) |
| `Monto` | float | Monto del servicio (S/ 180 — S/ 870,000) |
| `Monto_winsorizado` | float | Monto con winsorización aplicada |
| `Periodo` | string | Período en formato YYYY-MM |

#### 3.2.3 Análisis Exploratorio (EDA)

**Distribución de variables objetivo (dataset_mensual.xlsx, 46 meses):**

  - servicios_totales:
  - Total:    340 servicios (suma de 46 meses)
  - Media:    7.39 servicios/mes
  - Mínimo:   0 servicios (6 meses sin servicios)
  - Máximo:   21 servicios
  - Meses con servicios: 40 de 46
  - monto_total:
  - Total:    S/ 3,735,321 (suma de 46 meses)
  - Media:    S/ 81,202.63/mes
  - Mínimo:   S/ 0 (6 meses sin ingresos)
  - Máximo:   S/ 881,350
  - Meses con ingresos: 40 de 46

**Distribución de formas de pago (340 servicios):**

| Forma de pago | Cantidad | Porcentaje |
|:--------------|:---------|:-----------|
| Mixto | 107 | 31.5% |
| Directo | 90 | 26.5% |
| Seguro | 72 | 21.2% |
| No especificado | 71 | 20.9% |

**Problemas de calidad detectados:**

| Problema | Cantidad | Detalle |
|:---------|:---------|:--------|
| Fechas imputadas | 42 registros | Interpolación lineal aplicada |
| Outliers en monto | 19 registros (5.59%) | Winsorización aplicada |
| Lagunas temporales | 6 meses | Meses sin registros en el dataset |
| Integridad de datos | 97.94% | Después de preprocesamiento |
| Cambios totales preprocesamiento | 1,335 | Transformaciones aplicadas |

**Variables con mayor presencia (Ataud_Modelo):**

| Categoría | Meses presentes |
|:----------|:----------------|
| `Ataud_Color_no_especificado` | 32 |
| `Ataud_Modelo_Americano` | 27 |
| `Ataud_Color_Madera` | 23 |
| `Ataud_Modelo_Lincoln` | 20 |
| `Ataud_Color_Blanco` | 17 |
| `Ataud_Color_Natural` | 17 |
| `Ataud_Modelo_Imperial` | 17 |
| `Ataud_Modelo_Biblia` | 16 |
| `Ataud_Modelo_Principe` | 16 |
| `Ataud_Modelo_Madera` | 15 |
| `Ataud_Modelo_sin_ataud` | 14 |

### 3.3 Preparación de los Datos

#### 3.3.1 Limpieza

| Tarea | Descripción | Resultado |
|:------|:------------|:----------|
| Corrección de tipos | `Fecha` convertido a datetime; `Monto` a float | Tipos correctos |
| Tratamiento de nulos | Interpolación lineal para fechas faltantes | 42 fechas imputadas |
| Winsorización | Tratamiento de 19 outliers en `Monto` | Outliers controlados |
| Integridad | Verificación de consistencia entre registros | 97.94% integridad |

#### 3.3.2 Transformación

| Tarea | Descripción |
|:------|:------------|
| Agregación mensual | Conversión de 340 registros individuales a 46 registros mensuales |
| One-Hot Encoding | 85 categorías de Ataud_Modelo + 45 de Ataud_Color + 79 de Capilla = 209 columnas |
| Variables auxiliares | `Periodo`, `monto_promedio`, `monto_mediana`, `carroza_count`, `carroza_flores_count`, `auto_count`, `microbus_count`, `cargadores_total` |
| Separación train/test | Train: 2022-05 a 2025-02 (34 meses) / Test: 2025-03 a 2026-02 (12 meses) |

#### 3.3.3 Variables Derivadas (Lags)

Los modelos utilizan rezagos (lags) de la serie temporal para predicción:

| Variable | Descripción |
|:---------|:------------|
| `lag_1` | Valor del mes anterior |
| `lag_2` | Valor de hace 2 meses |
| `lag_3` | Valor de hace 3 meses |
| `lag_6` | Valor de hace 6 meses |

### 3.4 Modelado

#### 3.4.1 Modelos Seleccionados

Se implementaron y compararon 6 modelos de series temporales:

| # | Modelo | Tipo | Archivo serializado | Tiempo entrenamiento |
|:--|:-------|:-----|:--------------------|:---------------------|
| 1 | **SARIMA** | Estadístico | `sarima_*.pkl` | 0.17s (servicios) / 0.05s (monto) |
| 2 | **Prophet** | Probabilístico | `prophet_*.pkl` | 3.41s (servicios) / 0.35s (monto) |
| 3 | **XGBoost** | ML clásico | `xgboost_*.pkl` | 1.34s (servicios) / 0.12s (monto) |
| 4 | **LightGBM** | ML clásico | `lgbm_*.pkl` | 1.91s (servicios) / 0.04s (monto) |
| 5 | **LSTM** | Deep Learning | `lstm_*.keras` | 17.51s (servicios) / 17.05s (monto) |
| 6 | **ETS** | Estadístico | `ets_*.pkl` | 0.14s (servicios) / 0.08s (monto) |

#### 3.4.2 Configuración del Entrenamiento

| Parámetro | Valor |
|:----------|:------|
| Período de entrenamiento | 2022-05 a 2025-02 (34 meses) |
| Período de prueba | 2025-03 a 2026-02 (12 meses) |
| Lags utilizados | 1, 2, 3, 6 |
| Variables objetivo | `servicios_totales`, `monto_total` |
| Total de modelos serializados | 14 (7 por variable objetivo) |

#### 3.4.3 Serialización

Los modelos se serializan para carga rápida en producción sin reentrenamiento:

| Modelo | Formato | Herramienta |
|:-------|:--------|:------------|
| SARIMA | `.pkl` | joblib |
| Prophet | `.pkl` | joblib |
| XGBoost | `.pkl` | joblib |
| LightGBM | `.pkl` | joblib |
| ETS | `.pkl` | joblib |
| LSTM | `.keras` | SavedModel |
| Scaler | `.pkl` | joblib |

### 3.5 Evaluación

#### 3.5.1 Métricas de Evaluación

| Métrica | Fórmula | Objetivo |
|:--------|:--------|:---------|
| **MAE** | Media del error absoluto | Cuanto menor, mejor |
| **RMSE** | Raíz del error cuadrático medio | Penaliza errores grandes |
| **R²** | Coeficiente de determinación | Cuanto mayor (≤1), mejor |
| **MAPE** | Error porcentual absoluto medio | Objetivo: < 20% |

#### 3.5.2 Comparativa de Modelos — servicios_totales

| Modelo | MAE | RMSE | R² | MAPE (%) | Tiempo (s) |
|:-------|:----|:-----|:---|:---------|:-----------|
| **ETS** | **3.34** | **4.65** | **0.2521** | **34.57** | 0.14 |
| LightGBM | 4.06 | 4.66 | 0.2492 | 50.53 | 1.91 |
| LSTM | 4.23 | 5.21 | 0.0625 | 82.94 | 17.51 |
| SARIMA | 4.47 | 6.43 | -0.4287 | 42.34 | 0.17 |
| XGBoost | 4.89 | 5.49 | -0.0432 | 58.54 | 1.34 |
| Prophet | 5.75 | 6.43 | -0.4284 | 109.22 | 3.41 |

#### 3.5.3 Comparativa de Modelos — monto_total

| Modelo | MAE | RMSE | R² | MAPE (%) | Tiempo (s) |
|:-------|:----|:-----|:---|:---------|:-----------|
| **XGBoost** | **50,956** | **99,520** | **-0.096** | **77.55** | 0.12 |
| Prophet | 101,538 | 129,807 | -0.865 | 970.13 | 0.35 |
| LightGBM | 119,793 | 270,016 | -7.068 | 2515.13 | 0.04 |
| ETS | 141,005 | 186,215 | -2.837 | 759.49 | 0.08 |
| SARIMA | 160,447 | 331,177 | -11.137 | 2657.26 | 0.05 |
| LSTM | 164,471 | 230,480 | -4.878 | 1622.12 | 17.05 |

#### 3.5.4 Forecast Bias

| Variable | Modelo | Forecast Bias | Objetivo (±5%) | Estado |
|:---------|:-------|:--------------|:---------------|:-------|
| servicios_totales | ETS | -20.46% | ±5% | ❌ No cumple |
| monto_total | XGBoost | +34.52% | ±5% | ❌ No cumple |

#### 3.5.5 Selección de Modelos

Para **servicios_totales** se seleccionó **ETS** por:
- Menor MAE (3.34) y RMSE (4.65)
- Mayor R² positivo (0.2521)
- Menor MAPE (34.57%)
- Tiempo de entrenamiento mínimo (0.14s)

Para **monto_total** se seleccionó **XGBoost** por:
- Menor MAE (50,956) y RMSE (99,520)
- Menor MAPE (77.55%)
- Mejor R² entre los modelos (-0.096, el menos negativo)

> **Nota:** Ninguno de los modelos cumple estrictamente los objetivos de MAPE < 20% y Forecast Bias ±5% establecidos en el Project Charter. Esto se atribuye al volumen limitado de datos históricos (46 meses) y la alta variabilidad de la demanda funeraria.

### 3.6 Despliegue

#### 3.6.1 Arquitectura de Despliegue

El sistema se compone de tres servicios principales desplegados de forma independiente:

El Frontend está construido con Angular y desplegado en Vercel. Se comunica con el Backend Operativo, desarrollado en FastAPI con SQLModel y alojado en Render. Este Backend Operativo se conecta a una base de datos PostgreSQL en Supabase y también se comunica con el Backend de IA.

El Backend de IA es una API FastAPI separada que se ejecuta a través de un túnel de Cloudflare. Este servicio carga los modelos de machine learning serializados en formato pickle y Keras desde archivos, sin depender de una base de datos relacional.

El flujo de datos es: el usuario interactúa con el Frontend Angular, que envía peticiones al Backend Operativo en Render. Cuando se requiere una predicción, el Backend Operativo consulta al Backend de IA, que carga el modelo serializado correspondiente y retorna las predicciones.

#### 3.6.2 Stack Tecnológico

| Componente | Tecnología | Plataforma |
|:-----------|:-----------|:-----------|
| Frontend | Angular 21 | Vercel |
| Backend operativo | FastAPI + SQLModel | Render |
| Backend de IA | FastAPI + Pandas + Statsmodels + Scikit-Learn + XGBoost + LightGBM + TensorFlow/Keras | Cloudflare Tunnel |
| Base de datos | PostgreSQL | Supabase |
| Modelos ML | SARIMA, Prophet, XGBoost, LightGBM, LSTM, ETS | Archivos .pkl/.keras |
| ML API | FastAPI (puerto 9000) | Cloudflare Tunnel |

#### 3.6.3 Endpoints de la API Predictiva

| Método | Endpoint | Descripción |
|:-------|:---------|:------------|
| POST | `/predict` | Predicción de demanda con modelo seleccionado |
| GET | `/metrics` | Métricas de precisión del modelo |
| POST | `/predict/distribution` | Distribución de inventario por tipo |
| GET | `/historical` | Datos históricos de mayo 2022 a febrero 2026 |
| GET | `/models` | Lista de modelos disponibles |

#### 3.6.4 Flujo de Predicción

1. El usuario selecciona modelo, horizonte de predicción y rango de meses
2. El frontend envía petición POST a `/predict`
3. El backend de IA carga el modelo serializado (.pkl/.keras)
4. El modelo genera predicciones para el horizonte solicitado
5. Se retornan las predicciones de servicios e ingresos totales
6. El frontend visualiza los resultados en gráficos ApexCharts

---

> **Referencias:**
> - Project Charter — Sistema web con funcionalidades predictivas para Funeraria Aranzabal
> - TE5 — Solución Tecnológica
> - `dataset_mensual.xlsx` — Dataset agregado mensual (46 × 219)
> - `dataset_limpio.xlsx` — Dataset limpio (340 × 16)
> - `comparativa_modelos.xlsx` — Comparativa de 6 modelos
> - `model_metadata.json` — Metadatos y configuración de modelos
> - `00_calculo_metricas.ipynb` — Notebook de métricas del modelo