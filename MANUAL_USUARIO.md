# Manual de Usuario

## Sistema de Inventario Inteligente — Funeraria Máximo Aranzabal

---

## Índice

1. [Introducción](#1-introducción)
2. [Requisitos del Sistema](#2-requisitos-del-sistema)
3. [Ingreso al Sistema](#3-ingreso-al-sistema)
4. [Panel de Control (Dashboard)](#4-panel-de-control-dashboard)
5. [Gestión de Servicios Funerarios](#5-gestión-de-servicios-funerarios)
   - 5.1 [Lista de Servicios](#51-lista-de-servicios)
   - 5.2 [Crear un Servicio](#52-crear-un-servicio)
   - 5.3 [Detalle de un Servicio](#53-detalle-de-un-servicio)
   - 5.4 [Eliminar un Servicio](#54-eliminar-un-servicio)
6. [Gestión de Inventario](#6-gestión-de-inventario)
   - 6.1 [Ataúdes](#61-ataúdes)
   - 6.2 [Capillas](#62-capillas)
   - 6.3 [Vehículos](#63-vehículos)
7. [Gestión de Personas](#7-gestión-de-personas)
   - 7.1 [Contratantes](#71-contratantes)
   - 7.2 [Fallecidos](#72-fallecidos)
8. [Extracción IA de Contratos](#8-extracción-ia-de-contratos)
9. [Pronósticos y Predicciones](#9-pronósticos-y-predicciones)
   - 9.1 [Información de Modelos](#91-información-de-modelos)
   - 9.2 [Realizar una Predicción](#92-realizar-una-predicción)
   - 9.3 [Comparación de Modelos](#93-comparación-de-modelos)
   - 9.4 [Necesidades de Inventario](#94-necesidades-de-inventario)
10. [Pagos con Stripe](#10-pagos-con-stripe)
11. [Gestión de Usuarios y Roles](#11-gestión-de-usuarios-y-roles)
    - 11.1 [Usuarios](#111-usuarios)
    - 11.2 [Roles y Permisos](#112-roles-y-permisos)
12. [Mi Perfil](#12-mi-perfil)
13. [Cerrar Sesión](#13-cerrar-sesión)
14. [Preguntas Frecuentes](#14-preguntas-frecuentes)

---

## 1. Introducción

El **Sistema de Inventario Inteligente** es una plataforma web diseñada para la gestión integral de la Funeraria Máximo Aranzabal. Permite administrar servicios funerarios, controlar el inventario de productos y recursos, gestionar la información de clientes y fallecidos, realizar pagos electrónicos y utilizar inteligencia artificial para la extracción automática de datos de contratos y la predicción de necesidades futuras.

### Módulos principales

| Módulo | Descripción |
|--------|-------------|
| **Servicios** | Registro, consulta y gestión de contratos de servicios funerarios |
| **Inventario** | Control de ataúdes, capillas y vehículos |
| **Personas** | Gestión de contratantes (clientes) y fallecidos |
| **Extracción IA** | Lectura automática de contratos en imagen mediante inteligencia artificial |
| **Pronósticos** | Predicción de demanda futura y necesidades de inventario |
| **Pagos** | Registro de pagos electrónicos mediante Stripe |
| **Sistema** | Administración de usuarios, roles y permisos |

---

## 2. Requisitos del Sistema

- **Navegador web** actualizado (Google Chrome, Mozilla Firefox, Microsoft Edge o Safari).
- **Conexión a internet** estable.
- Resolución de pantalla recomendada: **1024x768** o superior.
- La sesión expira automáticamente después de **8 horas** de inactividad.

---

## 3. Ingreso al Sistema

1. Abra su navegador y acceda a la dirección del sistema.
2. Se mostrará la página de inicio de sesión.
3. Ingrese su **Usuario** y **Contraseña**.
4. Haga clic en el botón **Ingresar**.
5. Si los datos son correctos, será redirigido al **Panel de Control**.

> **Nota:** Si la cuenta está desactivada, verá el mensaje *"La cuenta está desactivada. Contacte al administrador."*

---

## 4. Panel de Control (Dashboard)

El Panel de Control es la pantalla principal que se muestra después de iniciar sesión. Presenta tarjetas de acceso rápido organizadas por sección:

### Secciones del Dashboard

- **Servicios:** Acceso rápido a la lista de servicios funerarios.
- **Extracción (IA):** Acceso a la herramienta de lectura automática de contratos por imagen.
- **Inventario:** Acceso directo a Ataúdes, Capillas, Vehículos y Pronósticos.
- **Personas:** Acceso a Contratantes y Fallecidos.

Haga clic en cualquier tarjeta para navegar directamente a ese módulo.

---

## 5. Gestión de Servicios Funerarios

### 5.1 Lista de Servicios

Para acceder, seleccione **Servicios** en el menú lateral.

La pantalla muestra una tabla con todos los servicios registrados, ordenados por fecha (más recientes primero).

#### Filtros de búsqueda

Puede filtrar los servicios por:

- **Nombre del fallecido o contratante:** Escriba un nombre para buscar.
- **DNI del contratante:** Ingrese el número de documento.
- **DNI del fallecido:** Ingrese el número de documento (8 dígitos).
- **Fecha:** Seleccione una fecha específica.

Use los botones **Buscar** para aplicar los filtros o **Limpiar** para restablecerlos.

#### Información mostrada en la tabla

| Columna | Descripción |
|---------|-------------|
| ID | Número identificador del servicio |
| Fallecido | Nombre de la persona fallecida |
| Contratante | Nombre de quien contrató el servicio |
| Dirección | Dirección de velación |
| Fecha | Fecha del servicio (formato dd/mm/aaaa) |
| Costo | Monto en Soles (S/) |
| Pago | Tipo de pago: Directo, Seguro o Mixto |
| Acciones | Botón para ver el detalle del servicio |

#### Paginación

La tabla muestra **10 registros por página**. Use los botones **Anterior** y **Siguiente** para navegar entre páginas. Se indica la página actual y el total de registros.

### 5.2 Crear un Servicio

1. Haga clic en el botón **+ Nuevo servicio** en la parte superior.
2. Complete los siguientes campos:

#### Datos del servicio
- **Dirección de velación:** Dirección donde se realizará la velación (requerido, mínimo 3 caracteres).
- **Fecha:** Fecha del servicio (requerido).
- **Costo (S/):** Monto total del servicio.
- **Tipo de pago:** Seleccione entre *Directo*, *Seguro* o *Mixto*.
- **Cantidad de cargadores:** Seleccione *Sin cargadores*, *4* o *6*.

#### Datos del fallecido
- **DNI del fallecido:** Ingrese el número de 8 dígitos y haga clic en **Verificar** para consultar automáticamente en RENIEC.
- **Nombre completo:** Se completa automáticamente con la verificación de RENIEC (campo de solo lectura).

#### Datos del contratante
- **DNI:** Ingrese el número de 8 dígitos y haga clic en **Verificar**.
- **Nombre completo:** Se completa automáticamente.
- **Teléfono:** Número de 9 dígitos.

#### Capilla
- Seleccione una capilla del desplegable. Se muestra el modelo y el stock disponible.

#### Ataúd (opcional)
- Seleccione un ataúd del desplegable. Se muestra el modelo, color y stock disponible.

#### Vehículos asignados
- Marque con un clic los vehículos que se asignarán al servicio. Puede seleccionar varios.

#### Pasajeros (opcional)
- Solo disponible si se seleccionó un vehículo tipo **Auto** o **Microbús**.
- Haga clic en **+ Agregar pasajero** y complete: Nombre y DNI (8 dígitos).

3. Haga clic en **Crear servicio** para guardar.

> **Importante:** El sistema verifica automáticamente el stock. Al crear un servicio, se descuentan 1 unidad de stock de la capilla y del ataúd seleccionados.

### 5.3 Detalle de un Servicio

Para ver el detalle completo de un servicio, haga clic en el ícono de ojo () en la columna de acciones de la tabla.

La pantalla de detalle muestra toda la información del servicio organizada en tarjetas:

- **Datos del servicio:** Dirección, fecha, costo, tipo de pago.
- **Fallecido:** Nombre y DNI.
- **Contratante:** Nombre, DNI y teléfono.
- **Capilla:** Modelo asignado.
- **Ataúd:** Modelo y color (o "Sin ataúd asignado").
- **Vehículos asignados:** Lista de vehículos con su tipo.
- **Pasajeros:** Lista de pasajeros registrados (si aplica).
- **Pago del servicio:** Historial de pagos realizados.

#### Acciones disponibles desde el detalle

- **Editar:** Modificar los datos del servicio (requiere permiso `servicios:actualizar`).
- **Eliminar:** Eliminar el servicio (requiere permiso `servicios:eliminar`).
- **Registrar pago:** Realizar un pago electrónico con tarjeta (ver sección 10).
- **Gestionar pasajeros:** Agregar, editar o eliminar pasajeros.

### 5.4 Eliminar un Servicio

1. Desde el detalle del servicio, haga clic en **Eliminar**.
2. Aparecerá un mensaje de confirmación mostrando el ID del servicio y el nombre del fallecido.
3. Confirme la eliminación.

> **Nota:** Al eliminar un servicio se restaura automáticamente el stock de la capilla y el ataúd que estaban asignados. También se eliminan los pasajeros y asignaciones de vehículos asociados.

---

## 6. Gestión de Inventario

### 6.1 Ataúdes

Para acceder, seleccione **Ataúdes** en el menú lateral (sección Inventario).

#### Lista de ataúdes

La tabla muestra: ID, Modelo, Color, Stock y Estado.

- **Stock bajo:** Cuando el stock es menor a 3 unidades, se resalta en color rojo.
- **Estado:** Use el interruptor (toggle) para activar o desactivar un ataúd. Los ataúdes inactivos aparecen atenuados y no se pueden asignar a servicios.

#### Filtros

- **Modelo:** Autocompletado con los modelos existentes.
- **Color:** Autocompletado con los colores existentes.
- **Estado:** Todos, Activos o Inactivos.

#### Crear un ataúd

1. Haga clic en **+ Nuevo ataúd**.
2. Ingrese: Stock inicial, Modelo y Color.
3. Haga clic en **Crear**.

#### Modificar stock

1. Haga clic en el botón **Stock** en la columna de acciones.
2. Ingrese la cantidad: **número positivo** para agregar stock, **número negativo** para restar.
3. Confirme la operación.

> **Nota:** El stock nunca puede ser negativo. Si intenta restar más de lo disponible, se mostrará un error.

#### Editar un ataúd

1. Haga clic en el botón de editar (lápiz) en la columna de acciones.
2. Modifique el modelo y/o color.
3. Haga clic en **Guardar**.

### 6.2 Capillas

Para acceder, seleccione **Capillas** en el menú lateral.

El funcionamiento es idéntico al módulo de Ataúdes:

- **Crear:** Ingrese modelo y stock inicial.
- **Modificar stock:** Agregue o reste unidades.
- **Editar:** Modifique el modelo.
- **Activar/Desactivar:** Use el interruptor de estado.
- **Eliminar:** Confirme la eliminación.

> **Nota:** El stock se resalta en rojo cuando es menor a 2 unidades.

### 6.3 Vehículos

Para acceder, seleccione **Vehículos** en el menú lateral.

#### Lista de vehículos

La tabla muestra: ID, Tipo, Estado y Acciones.

Los tipos de vehículo disponibles son:

| Tipo | Descripción |
|------|-------------|
| Porta ataud | Vehículo para transporte de ataúd |
| Porta flores | Vehículo para transporte de flores |
| Mixto | Vehículo multiuso |
| Auto | Automóvil (permite asignar pasajeros) |
| Microbús | Minibús (permite asignar pasajeros) |

Cada tipo se muestra con un color distintivo en la tabla.

#### Crear un vehículo

1. Haga clic en **+ Nuevo vehículo**.
2. Seleccione el tipo de vehículo del desplegable.
3. Haga clic en **Crear**.

#### Activar/Desactivar y Eliminar

Use los botones de la columna de acciones. Los vehículos inactivos no se pueden asignar a servicios.

---

## 7. Gestión de Personas

### 7.1 Contratantes

Para acceder, seleccione **Contratantes** en el menú lateral (sección Personas).

Los contratantes representan a las personas que contratan los servicios funerarios.

#### Lista de contratantes

La tabla muestra: ID, Nombre, DNI, Teléfono, Estado y Acciones.

#### Filtros

- **Nombre:** Autocompletado con los nombres existentes.
- **DNI:** Búsqueda por número de documento.
- **Estado:** Todos, Activos o Inactivos.

#### Editar un contratante

1. Haga clic en el botón de editar (lápiz).
2. Modifique el nombre, DNI o teléfono.
3. Haga clic en **Guardar**.

> **Nota:** Los contratantes se crean automáticamente cuando se registra un servicio funerario. No es necesario crearlos previamente desde este módulo.

### 7.2 Fallecidos

Para acceder, seleccione **Fallecidos** en el menú lateral.

Los registros de fallecidos almacenan la información de las personas fallecidas.

#### Lista de fallecidos

La tabla muestra: ID, Nombre, DNI, Estado y Acciones.

#### Filtros

- **Nombre:** Autocompletado.
- **DNI:** Búsqueda por número.
- **Estado:** Todos, Activos o Inactivos.

#### Editar un fallecido

1. Haga clic en el botón de editar (lápiz).
2. Modifique el nombre o DNI.
3. Haga clic en **Guardar**.

> **Nota:** Al igual que los contratantes, los fallecidos se crean automáticamente al registrar un servicio.

---

## 8. Extracción IA de Contratos

Esta funcionalidad utiliza inteligencia artificial (Google Gemini) para leer automáticamente contratos funerarios en formato imagen y extraer los datos para crear un servicio.

Para acceder, seleccione **Extracción (IA)** en el menú lateral.

### Proceso paso a paso

1. **Subir imágenes:**
   - Arrastre archivos de imagen al área designada, o
   - Haga clic en **+ Agregar imágenes** para seleccionar archivos.
   - Formatos aceptados: PNG, JPG, JPEG. Puede subir múltiples archivos a la vez.

2. **Cola de procesamiento:**
   - Las imágenes aparecen en una lista a la izquierda con estados: *En cola*, *Procesando...*, *Listo* o *Error*.
   - Las imágenes se procesan una por una automáticamente.

3. **Revisar resultados:**
   - Al completar el procesamiento, seleccione una imagen de la cola.
   - A la derecha se muestra la imagen original y un formulario con los datos extraídos por la IA:
     - Fecha, dirección de velación, tipo de pago, costo.
     - Nombre del fallecido.
     - Nombre, DNI y teléfono del contratante.
     - Modelo y color del ataúd detectado.
     - Modelo de la capilla detectada.
     - Vehículos detectados y cantidad de cargadores.

4. **Editar y guardar:**
   - Revise y corrija cualquier campo si es necesario.
   - Haga clic en **Aceptar y guardar** para crear el servicio automáticamente.

5. **En caso de error:**
   - Haga clic en **Reintentar** para procesar la imagen nuevamente.

> **Consejo:** La IA no es infalible. Revise siempre los datos extraídos antes de guardar el servicio.

---

## 9. Pronósticos y Predicciones

Esta funcionalidad utiliza modelos de inteligencia artificial para predecir la demanda futura de servicios y calcular las necesidades de inventario.

Para acceder, seleccione **Pronóstico** en el menú lateral (sección Inventario).

### 9.1 Información de Modelos

La pestaña **Modelos** muestra información general del sistema de predicción:

- **Período de entrenamiento:** Datos históricos utilizados para capacitar los modelos.
- **Período de prueba:** Datos utilizados para evaluar el rendimiento.
- **Modelos disponibles:** SARIMA, Prophet, XGBoost, LightGBM, LSTM, ETS.
- **Variables objetivo:** Cantidad total de servicios o Monto total de ingresos.
- **Gráfico histórico:** Muestra la evolución mensual de servicios en el tiempo.

### 9.2 Realizar una Predicción

1. Seleccione la pestaña **Predicción**.
2. Configure los parámetros:
   - **Modelo:** Seleccione uno de los 6 modelos disponibles.
   - **Variable objetivo:** *Servicios totales* o *Monto total*.
   - **Meses a predecir:** Ingrese un número del 1 al 24.
3. Haga clic en **Predecir**.
4. Se mostrará un gráfico de línea con:
   - **Línea sólida:** Datos históricos.
   - **Línea punteada:** Predicción.
5. Debajo del gráfico se muestra una tabla con el mes y el valor estimado para cada período.

### 9.3 Comparación de Modelos

1. Seleccione la pestaña **Comparación**.
2. Elija la variable objetivo (*Servicios totales* o *Monto total*).
3. Se mostrará:
   - Un gráfico de barras comparando los errores (MAE, RMSE, MAPE) de todos los modelos.
   - Una tabla detallada con las métricas de cada modelo: MAE, RMSE, R² y MAPE (%).

> **Interpretación:** Un valor de MAPE más bajo indica mayor precisión. Un R² más cercano a 1 indica mejor ajuste.

### 9.4 Necesidades de Inventario

Esta herramienta proyecta cuántos ataúdes y capillas de cada tipo se necesitarán en un período futuro.

1. Seleccione la pestaña **Necesidades**.
2. Configure:
   - **Modelo:** Elija el modelo de predicción a utilizar.
   - **Mes inicio:** Seleccione el mes de inicio.
   - **Mes fin:** Seleccione el mes de fin.
3. Haga clic en **Calcular**.
4. Se mostrarán:
   - **Gráfico de barras apiladas:** Ataúdes estimados por mes (desglose por tipo).
   - **Gráfico de barras apiladas:** Capillas estimadas por mes (desglose por tipo).
   - **Tablas detalladas:** Cantidad estimada de cada tipo de ataúd y capilla por mes.

> **Uso práctico:** Esta información es útil para planificar compras de inventario y anticiparse a la demanda.

---

## 10. Pagos con Stripe

El sistema integra pagos electrónicos con tarjeta de crédito/débito mediante la plataforma **Stripe**.

### Realizar un pago

1. Ingrese al detalle de un servicio funerario.
2. En la sección **Pago del servicio**, haga clic en **Registrar pago**.
3. Se abrirá un modal con el monto a cobrar.
4. Ingrese los datos de la tarjeta:
   - Número de tarjeta.
   - Fecha de vencimiento.
   - Código CVC.
5. Haga clic en **Pagar**.
6. Si el pago es exitoso, se mostrará el mensaje *"¡Pago realizado con éxito!"*.

> **Modo de prueba (Test):** Para probar el sistema, use el número de tarjeta `4242 4242 4242 4242`, cualquier fecha futura y cualquier CVC.

### Estados de pago

| Estado | Descripción |
|--------|-------------|
| Pendiente | Pago registrado, esperando confirmación |
| Completado | Pago procesado exitosamente |
| Fallido | El pago no pudo procesarse |
| Cancelado | Pago cancelado |

### Historial de pagos

En la sección **Pago del servicio** se muestra el historial de todos los pagos registrados para ese servicio, con su monto, estado y fecha.

---

## 11. Gestión de Usuarios y Roles

> **Nota:** Estas funciones están disponibles únicamente para usuarios con rol de **Administrador**.

### 11.1 Usuarios

Para acceder, seleccione **Usuarios** en el menú lateral (sección Sistema).

#### Lista de usuarios

La tabla muestra: ID, Usuario, Cargo (rol), Estado y Acciones.

#### Crear un usuario

1. Haga clic en **+ Nuevo usuario**.
2. Complete:
   - **Usuario:** Nombre de usuario (3-30 caracteres).
   - **Contraseña:** Mínimo 6 caracteres.
   - **Cargo:** Seleccione un rol del desplegable.
3. Haga clic en **Crear**.

#### Modificar un usuario

1. Haga clic en el botón de editar (lápiz).
2. Puede cambiar:
   - El nombre de usuario.
   - El rol asignado.
   - La contraseña (opcional).
3. Haga clic en **Guardar**.

#### Activar/Desactivar un usuario

Use el interruptor (toggle) en la columna de Estado. Los usuarios desactivados no pueden iniciar sesión.

#### Eliminar un usuario

1. Haga clic en el botón de eliminar (X).
2. Confirme la eliminación.

### 11.2 Roles y Permisos

Para acceder, seleccione **Roles** en el menú lateral.

#### Roles predeterminados

El sistema incluye dos roles predefinidos:

| Rol | Descripción |
|-----|-------------|
| **Administrador** | Acceso total a todas las funciones del sistema |
| **Trabajador** | Acceso operativo: crear y consultar servicios, gestionar inventario y personas. No puede gestionar usuarios ni eliminar registros. |

#### Permisos disponibles

Los permisos se organizan por módulo:

- **Ataúdes:** leer, crear, actualizar, eliminar, actualizar stock.
- **Capillas:** leer, crear, actualizar, eliminar.
- **Vehículos:** leer, crear, actualizar, eliminar.
- **Servicios:** leer, crear, actualizar, eliminar.
- **Fallecidos:** leer, crear, actualizar, eliminar.
- **Contratantes:** leer, crear, actualizar, eliminar.
- **Pasajeros:** listar, crear, actualizar, eliminar.

#### Crear un rol personalizado

1. Haga clic en **+ Nuevo rol**.
2. Ingrese el **Nombre del rol** (mínimo 3 caracteres).
3. Marque los permisos que desea asignar, organizados por módulo.
4. Haga clic en **Crear**.

#### Eliminar un rol

1. Haga clic en el botón de eliminar (X) junto al rol.
2. Confirme la eliminación.

> **Nota:** No se puede eliminar el rol *Administrador* ya que es un rol del sistema.

---

## 12. Mi Perfil

Para acceder, seleccione **Perfil** en el menú lateral.

### Información actual

Se muestra su nombre de usuario y el rol asignado.

### Modificar perfil

1. **Nuevo usuario:** Ingrese un nuevo nombre de usuario (déjelo vacío para mantener el actual).
2. **Nueva contraseña:** Ingrese una nueva contraseña (mínimo 6 caracteres).
3. **Confirmar contraseña:** Repita la nueva contraseña.
4. Haga clic en **Guardar cambios**.

> **Nota:** Si cambia su nombre de usuario, deberá volver a iniciar sesión.

---

## 13. Cerrar Sesión

Haga clic en el botón **Cerrar sesión** en la parte inferior del menú lateral. Esto cerrará su sesión y lo redirigirá a la página de inicio de sesión.

> **Recordatorio:** La sesión también se cierra automáticamente después de 8 horas.

---

## 14. Preguntas Frecuentes

**¿Qué hago si olvidé mi contraseña?**
Contacte al administrador del sistema para que la restablezca desde el módulo de Usuarios.

**¿Por qué no veo ciertas opciones en el menú?**
Su rol puede no tener los permisos necesarios. Contacte al administrador para solicitar acceso.

**¿Cómo registro un servicio si no tengo los datos del contratante?**
El sistema verifica automáticamente los datos de nombre completo mediante RENIEC al ingresar el DNI. Solo necesita tener el número de documento.

**¿Qué sucede si no hay stock de ataúdes o capillas?**
El sistema no permitirá crear un servicio si la capilla o el ataúd seleccionado no tiene stock disponible.

**¿Puedo desactivar un producto que estoy usando en un servicio activo?**
Puede desactivarlo, pero no se asignará a nuevos servicios. Los servicios existentes no se ven afectados.

**¿Cómo sé si un pago fue procesado correctamente?**
Revise la sección de **Pago del servicio** en el detalle del servicio. Los pagos exitosos se muestran con el estado *Completado* en verde.

**¿La extracción IA reemplaza la digitación manual?**
No. La IA extrae los datos automáticamente, pero usted debe revisarlos y confirmarlos antes de guardar. Esto reduce el tiempo de digitación pero no elimina la supervisión.

---

*Manual de usuario — Sistema de Inventario Inteligente — Funeraria Máximo Aranzabal*
