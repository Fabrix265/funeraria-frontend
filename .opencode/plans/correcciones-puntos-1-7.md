# Plan de Correcciones — Puntos 1-7

## Punto 1: Pasajeros apretados

### `servicio-create.css` — línea 97
Agregar después de `.form-card--full { grid-column: 1 / -1; }`:
```css
.form-card--full .form-card__body > * { grid-column: 1 / -1; }
```

### `styles.css` — líneas 482-510
Cambiar `.pasajeros-list` gap de `0.5rem` a `0.75rem`.
Cambiar `.pasajero-row` padding de `0.6rem 0.8rem` a `0.75rem 1rem`.
Cambiar `.pasajero-row__acciones` gap de `0.3rem` a `0.5rem`.

---

## Punto 2: Servicios con costo 0

### `servicio-create.ts` — método `guardar()`
Antes de la llamada HTTP, agregar validación:
```typescript
if (this.form.costo <= 0) {
  this.mostrarMensaje('El costo del servicio debe ser mayor a 0', 'error');
  return;
}
```

### `servicio-create.html` — input de costo
Agregar `min="0.01"` al input:
```html
<input class="field__input" type="number" [(ngModel)]="form.costo" name="costo" min="0.01" step="0.01" />
```

---

## Punto 3: Línea de pronóstico negra

### `predicciones.html` — línea ~75 (gráfico histórico)
Agregar `[stroke]` binding al `<apx-chart>`:
```html
<apx-chart
  [series]="chartHistorial.series!"
  [chart]="chartHistorial.chart!"
  [xaxis]="chartHistorial.xaxis!"
  [yaxis]="chartHistorial.yaxis!"
  [colors]="chartHistorial.colors!"
  [legend]="chartHistorial.legend!"
  [fill]="chartHistorial.fill!"
  [tooltip]="chartHistorial.tooltip!"
  [grid]="chartHistorial.grid!"
  [stroke]="chartHistorial.stroke!"
></apx-chart>
```

---

## Punto 4: Backend — Filtro "Todos" en fallecidos/contratantes

Cambiar la lógica en 5 archivos del backend para que `activo=None` devuelva TODOS los registros:

### `src/services/fallecido_service.py` — líneas 16-19
```python
# ANTES:
if activo is None:
    query = query.where(Fallecido.activo == True)
else:
    query = query.where(Fallecido.activo == activo)

# DESPUÉS:
if activo is not None:
    query = query.where(Fallecido.activo == activo)
```

### `src/services/contratante_service.py` — líneas 16-19
```python
# ANTES:
if activo is None:
    query = query.where(Contratante.activo == True)
else:
    query = query.where(Contratante.activo == activo)

# DESPUÉS:
if activo is not None:
    query = query.where(Contratante.activo == activo)
```

### `src/services/user_service.py` — líneas 44-47
```python
# ANTES:
if activo is None:
    query = query.where(User.activo == True)
else:
    query = query.where(User.activo == activo)

# DESPUÉS:
if activo is not None:
    query = query.where(User.activo == activo)
```

### `src/services/ataud_service.py` — líneas 26-27
```python
# ANTES:
if activo is None:
    query = query.where(Ataud.activo == True)
else:
    query = query.where(Ataud.activo == activo)

# DESPUÉS:
if activo is not None:
    query = query.where(Ataud.activo == activo)
```

### `src/services/capilla_service.py` — líneas 19-20
```python
# ANTES:
if activo is None:
    query = query.where(Capilla.activo == True)
else:
    query = query.where(Capilla.activo == activo)

# DESPUÉS:
if activo is not None:
    query = query.where(Capilla.activo == activo)
```

### `src/services/vehiculo_service.py` — líneas 19-20
```python
# ANTES:
if activo is None:
    query = query.where(Vehiculo.activo == True)
else:
    query = query.where(Vehiculo.activo == activo)

# DESPUÉS:
if activo is not None:
    query = query.where(Vehiculo.activo == activo)
```

---

## Punto 5: Toast éxito al guardar servicio

### `servicio-create.ts` — método `guardar()` líneas 243-259
```typescript
// ANTES (crear):
next: () => this.zone.run(() => this.router.navigate(['/servicios'])),

// DESPUÉS:
next: () => this.zone.run(() => {
  this.mostrarMensaje('Servicio creado correctamente', 'exito');
  setTimeout(() => this.router.navigate(['/servicios']), 1200);
}),

// ANTES (actualizar):
next: () => this.zone.run(() => this.router.navigate(['/servicios', this.idEditar])),

// DESPUÉS:
next: () => this.zone.run(() => {
  this.mostrarMensaje('Servicio actualizado correctamente', 'exito');
  setTimeout(() => this.router.navigate(['/servicios', this.idEditar]), 1200);
}),
```

---

## Punto 7: Toasts faltantes en servicio-detail

### `servicio-detail.ts` — Método `guardarPasajero()` (líneas 111-125)
Reemplazar los `error: () => {}` vacíos y `alert()` por toasts:
```typescript
guardarPasajero(): void {
  if (!this.formPasajero.nombre || !this.formPasajero.dni_pasajero) return;

  if (this.modoEdicionPasajero && this.pasajeroSeleccionado) {
    this.pasajeroService.actualizar(this.pasajeroSeleccionado.id, this.formPasajero).subscribe({
      next: () => {
        this.mostrarMensaje('Pasajero actualizado', 'exito');
        this.cargarPasajeros();
        this.cerrarModalPasajero();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al actualizar pasajero', 'error'),
    });
  } else {
    this.pasajeroService.crear(this.servicio.id, this.formPasajero).subscribe({
      next: () => {
        this.mostrarMensaje('Pasajero agregado', 'exito');
        this.cargarPasajeros();
        this.cerrarModalPasajero();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al crear pasajero', 'error'),
    });
  }
}
```

### `servicio-detail.ts` — Método `confirmarEliminarPasajero()`
```typescript
confirmarEliminarPasajero(): void {
  if (!this.pasajeroEliminar) return;
  this.pasajeroService.eliminar(this.pasajeroEliminar.id).subscribe({
    next: () => {
      this.mostrarMensaje('Pasajero eliminado', 'exito');
      this.cargarPasajeros();
      this.cerrarModalEliminarPasajero();
    },
    error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al eliminar pasajero', 'error'),
  });
}
```

### `servicio-detail.ts` — Método `confirmarEliminar()` (eliminar servicio)
```typescript
confirmarEliminar(): void {
  if (!this.servicio) return;
  this.servicioService.eliminar(this.servicio.id).subscribe({
    next: () => {
      this.mostrarMensaje('Servicio eliminado', 'exito');
      setTimeout(() => this.router.navigate(['/servicios']), 1200);
    },
    error: (e) => {
      this.mostrarMensaje(e.error?.detail || 'Error al eliminar servicio', 'error');
      this.cerrarModalEliminar();
    },
  });
}
```

### Nota: servicio-detail.ts necesita método `mostrarMensaje`
Agregar si no existe:
```typescript
mensaje = '';
tipoMensaje: 'exito' | 'error' = 'exito';

mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
  this.mensaje = texto;
  this.tipoMensaje = tipo;
  setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges(); }, 3500);
}
```

Y agregar toast HTML en `servicio-detail.html` (al inicio del page-wrapper):
```html
<div class="toast" [class.visible]="mensaje" [class.toast--error]="tipoMensaje === 'error'">
  <span class="toast__icon">{{ tipoMensaje === 'exito' ? '✓' : '✕' }}</span>
  {{ mensaje }}
</div>
```
