# Manual de Usuario — Funeraria Aranzabal

> Sistema de gestión integral para la funeraria.
> Versión 1.0 — Junio 2026

---

## Tabla de contenidos

1. [Iniciar sesión](#1-iniciar-sesión)
2. [Panel de control (Dashboard)](#2-panel-de-control-dashboard)
3. [Gestión de Servicios](#3-gestión-de-servicios)
4. [Inventario — Ataúdes](#4-inventario--ataúdes)
5. [Inventario — Capillas](#5-inventario--capillas)
6. [Inventario — Vehículos](#6-inventario--vehículos)
7. [Personas — Contratantes](#7-personas--contratantes)
8. [Personas — Fallecidos](#8-personas--fallecidos)
9. [Gestión de Usuarios](#9-gestión-de-usuarios)
10. [Gestión de Roles](#10-gestión-de-roles)
11. [Extracción IA](#11-extracción-ia)
12. [Predicción de Demanda](#12-predicción-de-demanda)
13. [Mi Perfil](#13-mi-perfil)
14. [Cerrar sesión](#14-cerrar-sesión)
15. [Roles y permisos](#15-roles-y-permisos)

---

## 1. Iniciar sesión

Abra el sistema en el navegador. Verá la pantalla de inicio de sesión.

![Pantalla de login](capturas/01_login.png)

Ingrese su **usuario** y **contraseña**, luego haga clic en **Ingresar**.

![Formulario de login](capturas/02_login_formulario.png)

- Si los datos son correctos, ingresará al **Panel de control**.
- Si son incorrectos, aparecerá un mensaje de error en rojo. Verifique sus credenciales.

> **Nota:** Si es la primera vez que ingresa, use las credenciales que le fueron asignadas por el administrador.

---

## 2. Panel de control (Dashboard)

Al iniciar sesión verá el **Dashboard**, que muestra un resumen del sistema con acceso rápido a cada módulo.

![Dashboard](capturas/03_dashboard.png)

En el **menú lateral izquierdo** encontrará todas las secciones disponibles según su rol:

![Menú lateral](capturas/04_sidebar.png)

Los módulos se organizan en secciones:

| Sección | Módulos |
|---|---|
| **GENERAL** | Servicios, Extracción IA |
| **INVENTARIO** | Ataúdes, Capillas, Vehículos, Pronóstico |
| **PERSONAS** | Contratantes, Fallecidos |
| **SISTEMA** | Usuarios, Roles, Perfil *(solo administradores)* |

> **Importante:** Si es **Trabajador**, no verá las opciones de Usuarios, Roles ni algunas opciones de inventario. Esto es normal y depende de los permisos de su cuenta.

---

## 3. Gestión de Servicios

El módulo de **Servicios** es el más importante. Aquí registra cada servicio funerario.

### 3.1 Ver lista de servicios

Haga clic en **Servicios** en el menú lateral. Verá una tabla con todos los servicios registrados.

![Lista de servicios](capturas/05_servicios_lista.png)

Puede **buscar** por nombre del contratante, DNI o fecha usando los filtros superiores.

### 3.2 Crear un nuevo servicio

Haga clic en el botón **+ Nuevo servicio**. Se abrirá el formulario dividido en secciones:

**Paso 1 — Datos del servicio:**
Ingrese la dirección de velación, seleccione la fecha y el costo.

![Formulario crear servicio](capturas/06_servicio_crear.png)

**Paso 2 — Datos del fallecido:**
Ingrese el DNI del fallecido y haga clic en **Verificar**. El sistema consultará RENIEC y completará el nombre automáticamente.

![Fallecido verificado](capturas/08_servicio_fallecido.png)

**Paso 3 — Datos del contratante:**
Ingrese el DNI del contratante y haga clic en **Verificar**. También se completará automáticamente con datos de RENIEC.

![Contratante verificado](capturas/09_servicio_contratante.png)

**Paso 4 — Seleccionar capilla y ataúd:**
Elija la capilla y el ataúd del inventario disponible.

![Capilla y ataúd](capturas/10_servicio_capilla_ataud.png)

**Paso 5 — Guardar:**
Haga clic en **Crear servicio**. Si todo está correcto, el servicio se guardará y el stock se actualizará automáticamente.

![Servicio creado](capturas/11_servicio_creado.png)

### 3.3 Ver detalle de un servicio

En la lista de servicios, haga clic en el **ícono de ojo** o en el nombre para ver los datos completos del servicio.

![Detalle del servicio](capturas/12_servicio_detalle.png)

### 3.4 Editar un servicio

En la lista, haga clic en el **ícono de lápiz** para modificar datos del servicio como la dirección, fecha o costo. Si cambia el ataúd o la capilla, el stock se ajustará automáticamente.

### 3.5 Eliminar un servicio

Haga clic en el **ícono de X roja** y confirme la eliminación. El stock del ataúd y capilla se restaurará.

> **Nota:** Solo los administradores pueden eliminar servicios. Si es trabajador, no verá este botón.

---

## 4. Inventario — Ataúdes

### 4.1 Ver lista de ataúdes

Haga clic en **Ataúdes** en el menú. Verá la tabla con el modelo, color, stock y estado de cada uno.

![Lista de ataúdes](capturas/13_ataudes_lista.png)

### 4.2 Crear un ataúd nuevo

Haga clic en **+ Nuevo ataúd**. Se abrirá un formulario.

![Modal crear ataúd](capturas/14_ataudes_modal_crear.png)

Complete los campos:
- **Modelo** *(obligatorio)*: Nombre del modelo
- **Color** *(obligatorio)*: Color del ataúd
- **Stock inicial**: Cantidad que ingresa (empieza en 0)

Haga clic en **Crear** para guardar.

![Ataúd creado](capturas/16_ataudes_creado.png)

### 4.3 Ajustar stock

Para agregar o restar stock, haga clic en el **ícono de ajuste** junto al ataúd. Ingrese la cantidad (+ para agregar, - para restar) y confirme.

![Ajustar stock](capturas/17_ataudes_stock.png)

### 4.4 Activar / Desactivar

Cada ataúd tiene un interruptor para activarlo o desactivarlo. Los ataúdes desactivados no aparecen al momento de crear un servicio.

---

## 5. Inventario — Capillas

El funcionamiento es igual al de Ataúdes.

### 5.1 Ver lista de capillas

![Lista de capillas](capturas/18_capillas_lista.png)

### 5.2 Crear una capilla

Haga clic en **+ Nueva capilla**, ingrese el modelo y haga clic en **Crear**.

![Crear capilla](capturas/19_capillas_modal_crear.png)

### 5.3 Ajustar stock

Igual que los ataúdes, use el ícono de ajuste para agregar o restar unidades disponibles.

![Stock capilla](capturas/21_capillas_stock.png)

---

## 6. Inventario — Vehículos

### 6.1 Ver lista de vehículos

Haga clic en **Vehículos** en el menú. Verá la tabla con el tipo y estado de cada vehículo.

### 6.2 Crear un vehículo

Haga clic en **+ Nuevo vehículo**. Seleccione el tipo:
- Porta ataúd
- Porta flores
- Mixto
- Auto
- Microbús

Haga clic en **Crear** para guardar.

---

## 7. Personas — Contratantes

### 7.1 Ver lista de contratantes

Haga clic en **Contratantes**. Verá la tabla con nombre, DNI y teléfono de cada persona que ha contratado servicios.

### 7.2 Buscar un contratante

Use los filtros por **nombre** o **DNI** para encontrar rápidamente a una persona.

### 7.3 Editar un contratante

Haga clic en el **ícono de lápiz** para modificar teléfono u otros datos.

---

## 8. Personas — Fallecidos

### 8.1 Ver lista de fallecidos

Haga clic en **Fallecidos**. Verá la tabla con los registros de personas atendidas.

### 8.2 Buscar un fallecido

Use el filtro por **nombre** para encontrar un registro específico.

> **Nota:** No puede eliminar un fallecido que esté asociado a un servicio activo.

---

## 9. Gestión de Usuarios

> *Solo visible para administradores.*

### 9.1 Ver lista de usuarios

Haga clic en **Usuarios** en la sección SISTEMA del menú. Verá la tabla con todos los usuarios registrados.

![Lista de usuarios](capturas/22_usuarios_lista.png)

### 9.2 Crear un usuario nuevo

Haga clic en **+ Nuevo usuario**. Complete los campos:

- **Usuario** *(obligatorio)*: Nombre de usuario (mínimo 3 caracteres, sin espacios)
- **Contraseña** *(obligatorio)*: Mínimo 6 caracteres
- **Cargo/Rol** *(obligatorio)*: Seleccione el rol (Administrador o Trabajador)

Haga clic en **Crear usuario**.

![Crear usuario](capturas/23_usuarios_modal_crear.png)

### 9.3 Cambiar el estado de un usuario

Use el **interruptor** en la columna "Estado" para activar o desactivar un usuario. Aparecerá una confirmación.

![Confirmar cambio de estado](capturas/26_usuarios_estado.png)

> **Precaución:** No puede desactivar su propio usuario. Tampoco puede desactivar al único administrador activo del sistema.

### 9.4 Cambiar el rol de un usuario

Haga clic en el **ícono de lápiz** para modificar el rol de un usuario.

### 9.5 Eliminar un usuario

Haga clic en la **X roja** y confirme.

> **Nota:** Si es **Trabajador**, no tiene acceso a este módulo. La opción no aparecerá en el menú.

---

## 10. Gestión de Roles

> *Solo visible para administradores.*

### 10.1 Ver lista de roles

Haga clic en **Roles** en el menú. Verá los roles existentes y sus permisos asignados.

### 10.2 Crear un nuevo rol

Haga clic en **+ Nuevo rol**. Ingrese un nombre (solo letras, espacios y guiones) y seleccione los permisos que desea asignar marcando las casillas.

Los permisos se agrupan por módulo:
- **Ataúdes**: Ver, Crear, Actualizar, Eliminar, Ajustar stock
- **Capillas**: Ver, Crear, Actualizar, Eliminar, Ajustar stock
- **Servicios**: Ver, Crear, Actualizar, Eliminar
- *(y así con cada módulo)*

Haga clic en **Crear rol** para guardar.

### 10.3 Eliminar un rol

Haga clic en la **X roja**. No puede eliminar el rol "Administrador" (es el rol base del sistema).

> **Nota:** Si es **Trabajador**, no tiene acceso a este módulo.

---

## 11. Extracción IA

Este módulo utiliza inteligencia artificial para extraer datos de contratos escaneados o fotografiados.

### 11.1 Subir imágenes

Haga clic en **+ Agregar imágenes** o arrastre archivos directamente al área de carga.

> **Formatos aceptados:** PNG, JPG, JPEG. Puede subir varias imágenes a la vez.

### 11.2 Procesamiento

Las imágenes se procesan automáticamente en orden. Verá el estado de cada imagen:
- **En cola**: Esperando ser procesada
- **Procesando...**: La IA está extrayendo los datos
- **Listo**: Datos extraídos y listos para revisar
- **Error**: No se pudo procesar (puede reintentar)

### 11.3 Revisar y editar datos

Seleccione una imagen procesada. A la derecha verá los datos extraídos por la IA. Puede **corregir** cualquier campo antes de guardar.

Los datos incluyen:
- Fecha del servicio
- Dirección de velación
- Nombre del fallecido y contratante
- DNI del contratante
- Tipo de pago y costo
- Ataúd y capilla detectados
- Vehículos detectados

### 11.4 Guardar como servicio

Una vez revisados los datos, haga clic en **Aceptar y guardar**. El sistema creará automáticamente un servicio funerario con esos datos.

> **Requisito mínimo:** Debe tener al menos la **dirección** y la **fecha** para poder guardar.

---

## 12. Predicción de Demanda

Este módulo utiliza inteligencia artificial para predecir cuántos ataúdes necesitará en los próximos meses.

### 12.1 Configurar la predicción

- **Meses a predecir**: Ingrese el número de meses hacia el futuro (1 a 24). Por defecto son 6.
- **Usar stock actual**: Marque esta casilla si desea que el sistema compare el stock que tiene con la demanda predicha y le avise qué necesita comprar.

### 12.2 Calcular

Haga clic en **Calcular demanda**. Espere unos segundos mientras el modelo procesa.

### 12.3 Ver resultados

Verá tres secciones:

**Gráfico de barras:** Cantidad predicha por categoría de ataúd (Americano, Lincoln, Imperial, etc.)

**Tabla de ingreso esperado:** Cada categoría con su cantidad predicha, precio promedio y monto esperado.

**Alertas de reorden** *(solo si marcó "Usar stock actual")*: El sistema le indica qué categorías necesitan reposición y cuántas unidades comprar.

> **Nota:** Si el servicio de predicción no está disponible, verá un mensaje de advertencia y el botón quedará deshabilitado.

---

## 13. Mi Perfil

Haga clic en **Perfil** en el menú. Podrá ver y modificar sus datos.

### 13.1 Ver información actual

Se muestra su nombre de usuario y el rol asignado.

### 13.2 Cambiar usuario

Ingrese el nuevo nombre de usuario en el campo correspondiente y haga clic en **Guardar cambios**.

### 13.3 Cambiar contraseña

Ingrese la nueva contraseña y confírmela. Haga clic en **Guardar cambios**.

> **Importante:** Si no desea cambiar la contraseña, deje los campos vacíos. Solo se actualizará lo que ingrese.

---

## 14. Cerrar sesión

Haga clic en **Cerrar sesión** al final del menú lateral. El sistema cerrará su sesión y regresará a la pantalla de login.

![Cerrar sesión](capturas/27_logout.png)

> **Recomendación:** Siempre cierre sesión al terminar de usar el sistema, especialmente si comparte computadora.

---

## 15. Roles y permisos

El sistema tiene dos tipos de usuario:

### Administrador
- Acceso **completo** a todos los módulos
- Puede crear, editar y eliminar usuarios y roles
- Puede gestionar todo el inventario y servicios

### Trabajador
- Puede ver y crear **servicios**
- Puede ver el **inventario** (ataúdes, capillas, vehículos)
- Puede ver **contratantes** y **fallecidos**
- **NO** puede gestionar usuarios ni roles
- **NO** puede eliminar servicios (solo crear y editar)

> Si una opción no aparece en el menú, es porque su rol no tiene permiso para acceder a ella. Contacte al administrador si necesita acceso adicional.

---

## Información de contacto

Si tiene problemas con el sistema o necesita soporte técnico, contacte al equipo de desarrollo.

---

*Manual de usuario generado para Funeraria Aranzabal — Versión 1.0*
