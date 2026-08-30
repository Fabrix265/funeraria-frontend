## **ALCANCE**

El alcance del proyecto contempla el diseño, desarrollo e implementación integral de un sistema web centralizado en la Funeraria Aranzabal (Trujillo) para el Área de Almacén y Logística, orientado a la digitalización y optimización del control de inventarios (altas, bajas y modificaciones de suministros y ataúdes) y a la transición hacia una estrategia de reposición de stock guiada por la evidencia analítica. La solución tecnológica comprende la investigación, comparación y optimización de modelos de series temporales en lenguaje Python para la predicción de la demanda, excluyendo explícitamente migraciones desde sistemas legados, adquisición de hardware, desarrollo de aplicaciones móviles nativas o integraciones con plataformas administrativas ajenas al almacén. Todo el proceso se ejecutará en un plazo estricto de 12 semanas, empleando metodologías híbridas que combinan la gestión por Sprints de Scrum, prácticas de ingeniería de software de Extreme Programming (XP) y el ciclo de vida de ciencia de datos CRISP-DM.  

Para garantizar el éxito de la implementación, el sistema se soportará en una arquitectura que incluye una base de datos relacional PostgreSQL alojada en Supabase, una interfaz de usuario desplegada en Vercel y una API predictiva en Python (desarrollada con Pandas, Statsmodels y Scikit-Learn) alojada en un servidor en la nube de Digital Ocean. La calidad del producto y del proceso de desarrollo de software se medirá rigurosamente bajo el estándar internacional ISO/IEC 25010, evaluando los atributos de adecuación funcional y eficiencia de desempeño a través del tiempo de respuesta y la cobertura de requerimientos. Asimismo, se adoptarán métricas clave del estándar DORA propuesto por Google, específicamente el tiempo de ciclo de cambios (Lead Time for Changes) para cuantificar la agilidad en la integración de módulos mediante XP, y la tasa de fallos en cambios (Change Failure Rate) para asegurar la estabilidad de los despliegues predictivos en producción.

Por el contrario, se delimita explícitamente fuera del alcance de esta investigación cualquier proceso de migración automatizada desde sistemas legados externos o la adquisición y provisión de componentes de hardware para la empresa. De igual manera, quedan excluidas del desarrollo tanto la construcción de una aplicación móvil nativa como la integración del sistema con plataformas de terceros o módulos administrativos ajenos al control estricto del almacén.

1. ## **REQUISITOS FUNCIONALES**

| ID | Nombre | Descripción |
| :---- | :---- | :---- |
| **RF-01** | Inicio de sesión | Yo como Usuario, quiero autenticarme en el sistema introduciendo mi usuario y contraseña, para acceder de manera segura a las funcionalidades correspondientes, con la condición de que el sistema me retorne un token JWT válido con un tiempo de expiración de 8 horas. |
| **RF-02** | Cierre de sesión | Yo como Usuario, quiero cerrar mi sesión activa, para proteger mi cuenta al dejar de usar el sistema, con la condición de que se elimine el token del almacenamiento local y se me redirija automáticamente al formulario de login. |
| **RF-03** | Gestión de usuarios | Yo como Administrador, quiero crear, listar, editar, activar/desactivar y eliminar usuarios del sistema, para mantener el control del personal que accede a la plataforma, con la condición de que los cambios queden registrados de forma centralizada. |
| **RF-04** | Gestión de roles | Yo como Administrador, quiero crear roles personalizados y asignar permisos organizados por módulo, para definir las funciones de los empleados según su puesto, con la condición de estructurarlos correctamente en la base de datos. |
| **RF-05** | Gestión de permisos | Yo como Administrador, quiero disponer de 28 permisos granulares con el patrón módulo:acción , para controlar de manera específica el acceso a cada funcionalidad, con la condición de que sirvan de base para la seguridad del sistema. |
| **RF-06** | Control de acceso basado en roles | Yo como Usuario, quiero que mi acceso a las rutas y funcionalidades esté restringido según mi rol y permisos , para no ingresar a secciones no autorizadas, con la condición de que cualquier intento prohibido sea denegado con una redirección al dashboard. |
| **RF-07** | Edición de perfil | Yo como Usuario, quiero actualizar mi propio nombre de usuario y contraseña desde la página de perfil, para mantener mis credenciales de acceso actualizadas, con la condición de validar la seguridad de los nuevos datos. |
| **RF-08** | Dashboard permisionado | Yo como Usuario, quiero visualizar módulos de acceso condicionados a mis permisos , para navegar de forma limpia por la interfaz, con la condición de que el sistema oculte automáticamente aquellas secciones para las que no tengo autorización. |
| **RF-09** | CRUD de servicios funerarios | Yo como Usuario, quiero crear, listar, editar y eliminar servicios funerarios , para administrar los contratos de la funeraria, con la condición de incluir obligatoriamente la selección de ataúd, capilla, vehículos, tipo de pago, dirección de velación, fecha y cantidad de cargadores. |
| **RF-10** | Creación automática de contratante | Yo como Usuario, quiero que el sistema verifique si el contratante ya existe por su DNI al momento de crear un servicio , para agilizar el proceso de registro, con la condición de reutilizar su información existente o crear un nuevo registro automáticamente. |
| **RF-11** | Creación automática de fallecido | Yo como Usuario, quiero que el sistema genere automáticamente un registro del fallecido asociado al crear un servicio, para mantener vinculada la información del difunto, con la condición de asegurar la integridad de los datos de la operación. |
| **RF-12** | Control de stock de ataúdes | Yo como Usuario, quiero que el stock de ataúdes se reduzca automáticamente al asignar uno a un servicio , para controlar el inventario físico en tiempo real, con la condición de que al eliminar el servicio este se restaure correctamente sin quedar nunca en valores negativos. |
| **RF-13** | Control de stock de capillas | Yo como Usuario, quiero que el stock de capillas se reduzca automáticamente al asignar una a un servicio , para conocer la disponibilidad de los espacios de velación, con la condición de que al eliminar el servicio este se restaure correctamente sin quedar nunca en valores negativos. |
| **RF-14** | Asignación de vehículos | Yo como Usuario, quiero asignar uno o más vehículos a un servicio , para planificar los traslados del cortejo funerario, con la condición de validar estrictamente que las unidades se encuentren en estado activo. |
| **RF-15** | Paginación y filtrado de servicios | Yo como Usuario, quiero listar los servicios con paginación y filtros específicos , para realizar búsquedas eficientes dentro de la plataforma, con la condición de poder filtrar por nombre, DNI del contratante, DNI del fallecido y fecha. |
| **RF-16** | CRUD de ataúdes | Yo como Usuario, quiero crear, listar, editar, eliminar, ajustar stock y activar/desactivar registros de ataúdes , para gestionar el catálogo de productos disponibles, con la condición de poder aplicar filtros por modelo y color. |
| **RF-17** | CRUD de capillas | Yo como Usuario, quiero crear, listar, editar, eliminar, ajustar stock y activar/desactivar registros de capillas , para administrar la infraestructura de velatorios de la empresa, con la condición de aplicar filtros de búsqueda por modelo. |
| **RF-18** | CRUD de vehículos | Yo como Usuario, quiero crear, listar, editar, eliminar y activar/desactivar vehículos , para controlar la flota de transporte de la funeraria, con la condición de organizarlos en hasta 5 tipos diferentes. |
| **RF-19** | CRUD de contratantes | Yo como Usuario, quiero listar, editar y activar/desactivar contratantes , para mantener actualizado el registro de clientes, con la condición de aplicar filtros por nombre y DNI, validando la unicidad de este último documento. |
| **RF-20** | CRUD de fallecidos | Yo como Usuario, quiero listar, editar y activar/desactivar registros de fallecidos , para gestionar el histórico de personas atendidas, con la condición de utilizar filtros y bloquear la eliminación si existen servicios activos asociados. |
| **RF-21** | Predicción de demanda con ML | Yo como Usuario, quiero visualizar predicciones mensuales de servicios e ingresos totales utilizando el motor de Machine Learning , para planificar las estrategias comerciales de la empresa, con la condición de emplear seis modelos predictivos en un horizonte de 1 a 24 meses. |
| **RF-22** | Visualización de métricas | Yo como Usuario, quiero revisar las métricas de precisión del modelo predictivo , para evaluar la fiabilidad de las proyecciones del sistema, con la condición de analizar los indicadores de MAE, RMSE, R2 y MAPE. |
| **RF-23** | Distribución de inventario | Yo como Usuario, quiero predecir la distribución de ataúdes y capillas por tipo necesarios en cada mes , para optimizar el stock físico futuro, con la condición de calcularlo en base al rango de meses seleccionado. |
| **RF-24** | Visualización de datos históricos | Yo como Usuario, quiero visualizar gráficos de series temporales con los datos históricos de servicios e ingresos totales , para evaluar la evolución del negocio en el tiempo, con la condición de mostrar la información recopilada desde mayo de 2022 hasta febrero de 2026\. |
| **RF-25** | Gráficos interactivos | Yo como Usuario, quiero interactuar con gráficos de área, líneas, barras y barras apiladas utilizando ApexCharts , para analizar de forma dinámica las predicciones y distribuciones, con la condición de que la interfaz responda de manera fluida. |
| **RF-26** | Eliminación en cascada | Yo como Usuario, quiero que al eliminar un servicio se desencadene la eliminación en cascada de sus datos vinculados , para mantener la consistencia y limpieza de los datos, con la condición de remover pasajeros, enlaces de vehículos y registros huérfanos, además de restaurar el inventario. |
| **RF-27** | Sidebar responsivo | Yo como Usuario, quiero que el sidebar de navegación se colapse automáticamente en pantallas menores a 768px , para utilizar el sistema cómodamente desde dispositivos móviles, con la condición de mostrar un botón tipo hamburguesa para desplegarlo. |
| **RF-28** | Notificaciones toast | Yo como Usuario, quiero recibir notificaciones toast de éxito, error e información , para conocer al instante el resultado de mis acciones, con la condición de que tengan una duración automática en pantalla de 3.5 segundos. |
| **RF-29** | Diálogos de confirmación | Yo como Usuario, quiero responder a una solicitud de confirmación explícita , para evitar la ejecución de errores involuntarios, con la condición de que aparezca antes de realizar cualquier acción destructiva en el sistema. |
| **RF-30** | Autenticación automática expirada | Yo como Usuario, quiero ser redirigido automáticamente al login si el guard de autenticación detecta que el token ha caducado , para proteger la seguridad de la información del sistema, con la condición de activarse inmediatamente tras cumplirse las 8 horas de expiración. |

2. ## **REQUISITOS NO FUNCIONALES**

| ID | Nombre | Descripción |
| :---- | :---- | :---- |
| **RNF-01** | Autenticación JWT | La plataforma debe utilizar tokens JWT con algoritmo HS256 y expiración de 8 horas para la gestión de sesiones.  |
| **RNF-02** | Hashing de contraseñas | La base de datos debe almacenar contraseñas hasheadas con bcrypt, garantizando que no se guarden en texto plano.  |
| **RNF-03** | Arquitectura de microservicios | El proyecto debe estar compuesto por al menos tres servicios independientes: frontend Angular, backend operativo y backend de IA/modelos, desplegables por separado.  |
| **RNF-04** | CORS habilitado | El backend debe configurar CORS para permitir solicitudes desde el dominio del frontend, habilitando headers de autorización.  |
| **RNF-05** | API RESTful | El backend operativo debe exponer una API RESTful con endpoints estandarizados siguiendo convenciones HTTP.  |
| **RNF-06** | Validación de datos | La arquitectura debe validar todos los datos de entrada mediante esquemas Pydantic en el backend y modelos TypeScript en el frontend.  |
| **RNF-07** | Manejo de errores | Las respuestas deben retornar códigos HTTP apropiados con mensajes descriptivos en caso de error.  |
| **RNF-08** | Middleware de errores global | El backend debe implementar un middleware que capture excepciones no manejadas y retorne respuestas consistentes.  |
| **RNF-09** | Seed automático | La base de datos debe crear automáticamente al primer inicio: permisos, roles por defecto (Administrador, Trabajador) y el usuario administrador.  |
| **RNF-10** | Migración automática de esquema | El backend debe crear las tablas de la base de datos automáticamente al iniciar el servidor mediante SQLModel metadata.  |
| **RNF-11** | Independencia de base de datos de IA | El backend de IA/modelos no debe depender de una base de datos relacional, utilizando archivos serializados (.pkl, .keras) y metadatos en JSON.  |
| **RNF-12** | Componentes standalone Angular | El frontend debe utilizar componentes standalone de Angular (sin NgModules) para una arquitectura modular y lazy-loading nativo.  |
| **RNF-13** | Lazy loading de rutas | Los módulos de roles y predicciones deben implementar lazy loading para optimizar el tiempo de carga inicial.  |
| **RNF-14** | Diseño responsivo | La interfaz del frontend debe adaptarse a pantallas de escritorio y móviles, con punto de quiebre en 768px para el sidebar.  |
| **RNF-15** | Persistencia de estado de autenticación | El navegador debe almacenar el token JWT, roles y permisos en localStorage para persistir entre recargas de página.  |
| **RNF-16** | Interceptor HTTP | El frontend debe implementar un interceptor HTTP que adjunte automáticamente el token Bearer en todas las solicitudes al backend.  |
| **RNF-17** | Protección de registros base | El sistema debe proteger los roles "Administrador" y "Superadmin", así como el usuario semilla, contra eliminación accidental.  |
| **RNF-18** | Unicidad de DNI de contratante | La base de datos debe garantizar la unicidad del DNI del contratante a nivel de tabla, retornando error 409 en caso de duplicidad.  |
| **RNF-19** | Serialización del modelo ML | El servidor debe cargar los modelos de machine learning en formato .pkl/.keras para asegurar una carga rápida sin reentrenamiento.  |

3. ## **PRIORIZACIÓN DE REQUISITOS FUNCIONALES**

| ID | Nombre del Requisito | M | S | C | W |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **RF-01** | Inicio de sesión  | X |  |  |  |
| **RF-02** | Cierre de sesión  | X |  |  |  |
| **RF-03** | Gestión de usuarios  | X |  |  |  |
| **RF-04** | Gestión de roles  | X |  |  |  |
| **RF-05** | Gestión de permisos  | X |  |  |  |
| **RF-06** | Control de acceso basado en roles  | X |  |  |  |
| **RF-07** | Edición de perfil  |  | X |  |  |
| **RF-08** | Dashboard permisionado  |  | X |  |  |
| **RF-09** | CRUD de servicios funerarios  | X |  |  |  |
| **RF-10** | Creación automática de contratante  |  | X |  |  |
| **RF-11** | Creación automática de fallecido  | X |  |  |  |
| **RF-12** | Control de stock de ataúdes  | X |  |  |  |
| **RF-13** | Control de stock de capillas  | X |  |  |  |
| **RF-14** | Asignación de vehículos  | X |  |  |  |
| **RF-15** | Paginación y filtrado de servicios  |  | X |  |  |
| **RF-16** | CRUD de ataúdes  | X |  |  |  |
| **RF-17** | CRUD de capillas  | X |  |  |  |
| **RF-18** | CRUD de vehículos  | X |  |  |  |
| **RF-19** | CRUD de contratantes  | X |  |  |  |
| **RF-20** | CRUD de fallecidos  | X |  |  |  |
| **RF-21** | Predicción de demanda con ML  | X |  |  |  |
| **RF-22** | Visualización de métricas |  |  | X |  |
| **RF-23** | Distribución de inventario  |  | X |  |  |
| **RF-24** | Visualización de datos históricos  | X |  |  |  |
| **RF-25** | Gráficos interactivos  |  | X |  |  |
| **RF-26** | Eliminación en cascada  |  |  |  | X |
| **RF-27** | Sidebar responsivo  |  | X |  |  |
| **RF-28** | Notificaciones toast  |  | X |  |  |
| **RF-29** | Diálogos de confirmación  | X |  |  |  |
| **RF-30** | Autenticación automática expirada |  |  | X |  |

4. ## **PRIORIZACIÓN DE REQUISITOS NO FUNCIONALES**

| ID | Nombre del Requisito | M | S | C | W |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **RNF-01** | Autenticación JWT | X |  |  |  |
| **RNF-02** | Hashing de contraseñas | X |  |  |  |
| **RNF-03** | Arquitectura de microservicios | X |  |  |  |
| **RNF-04** | CORS habilitado | X |  |  |  |
| **RNF-05** | API RESTful | X |  |  |  |
| **RNF-06** | Validación de datos | X |  |  |  |
| **RNF-07** | Manejo de errores | X |  |  |  |
| **RNF-08** | Middleware de errores global | X |  |  |  |
| **RNF-09** | Seed automático | X |  |  |  |
| **RNF-10** | Migración automática de esquema | X |  |  |  |
| **RNF-11** | Independencia de base de datos de IA |  | X |  |  |
| **RNF-12** | Componentes standalone Angular | X |  |  |  |
| **RNF-13** | Lazy loading de rutas |  | X |  |  |
| **RNF-14** | Diseño responsivo | X |  |  |  |
| **RNF-15** | Persistencia de estado de autenticación | X |  |  |  |
| **RNF-16** | Interceptor HTTP | X |  |  |  |
| **RNF-17** | Protección de registros base | X |  |  |  |
| **RNF-18** | Unicidad de DNI de contratante | X |  |  |  |
| **RNF-19** | Serialización del modelo ML | X |  |  |  |

5. **CLASIFICACIÓN DE REQUISITOS POR SPRINT**

   1. **PRIMER SPRINT**

      1. **REQUISITOS FUNCIONALES**

| Sprint | ID | Nombre |
| ----- | ----- | ----- |
| **Sprint 1** | RF-01 | Inicio de sesión |
| **Sprint 1** | RF-02 | Cierre de sesión |
| **Sprint 1** | RF-03 | Gestión de usuarios |
| **Sprint 1** | RF-04 | Gestión de roles |
| **Sprint 1** | RF-05 | Gestión de permisos |
| **Sprint 1** | RF-06 | Control de acceso basado en roles |
| **Sprint 1** | RF-07 | Edición de perfil |
| **Sprint 1** | RF-08 | Dashboard permisionado |
| **Sprint 1** | RF-16 | CRUD de ataúdes |
| **Sprint 1** | RF-17 | CRUD de capillas |
| **Sprint 1** | RF-18 | CRUD de vehículos |
| **Sprint 1** | RF-19 | CRUD de contratantes |
| **Sprint 1** | RF-20 | CRUD de fallecidos |
| **Sprint 1** | RF-27 | Sidebar responsivo |
| **Sprint 1** | RF-28 | Notificaciones toast |
| **Sprint 1** | RF-29 | Diálogos de confirmación |
| **Sprint 1** | RF-30 | Autenticación automática expirada |

      2. **REQUISITOS NO FUNCIONALES**

| Sprint | ID | Nombre |
| ----- | ----- | ----- |
| **Sprint 1** | RNF-01 | Autenticación JWT |
| **Sprint 1** | RNF-02 | Hashing de contraseñas |
| **Sprint 1** | RNF-03 | Arquitectura de microservicios |
| **Sprint 1** | RNF-04 | CORS habilitado |
| **Sprint 1** | RNF-05 | API RESTful |
| **Sprint 1** | RNF-06 | Validación de datos |
| **Sprint 1** | RNF-07 | Manejo de errores |
| **Sprint 1** | RNF-08 | Middleware de errores global |
| **Sprint 1** | RNF-09 | Seed automático |
| **Sprint 1** | RNF-10 | Migración automática de esquema |
| **Sprint 1** | RNF-12 | Componentes standalone Angular |
| **Sprint 1** | RNF-14 | Diseño responsivo |
| **Sprint 1** | RNF-15 | Persistencia de estado de autenticación |
| **Sprint 1** | RNF-16 | Interceptor HTTP |
| **Sprint 1** | RNF-17 | Protección de registros base |

   2. **SEGUNDO SPRINT**

      1. **REQUISITOS FUNCIONALES**

| Sprint | ID | Nombre |
| ----- | ----- | ----- |
| **Sprint 2** | RF-09 | CRUD de servicios funerarios |
| **Sprint 2** | RF-10 | Creación automática de contratante |
| **Sprint 2** | RF-11 | Creación automática de fallecido |
| **Sprint 2** | RF-12 | Control de stock de ataúdes |
| **Sprint 2** | RF-13 | Control de stock de capillas |
| **Sprint 2** | RF-14 | Asignación de vehículos |
| **Sprint 2** | RF-15 | Paginación y filtrado de servicios |
| **Sprint 2** | RF-21 | Predicción de demanda con ML |
| **Sprint 2** | RF-22 | Visualización de métricas |
| **Sprint 2** | RF-23 | Distribución de inventario |
| **Sprint 2** | RF-24 | Visualización de datos históricos |
| **Sprint 2** | RF-25 | Gráficos interactivos |
| **Sprint 2** | RF-26 | Eliminación en cascada |

      2. **REQUISITOS NO FUNCIONALES**

| Sprint | ID | Nombre |
| ----- | ----- | ----- |
| **Sprint 2** | RNF-11 | Independencia de base de datos de IA |
| **Sprint 2** | RNF-13 | Lazy loading de rutas |
| **Sprint 2** | RNF-18 | Unicidad de DNI de contratante |
| **Sprint 2** | RNF-19 | Serialización del modelo ML |

