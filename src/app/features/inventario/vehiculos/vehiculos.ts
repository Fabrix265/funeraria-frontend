import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { VehiculoService } from '../../../core/services/vehiculo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideDynamicIcon } from '@lucide/angular';
import { Vehiculo, TipoVehiculo } from '../../../core/models/vehiculo.model';
import { RouterLink } from '@angular/router';
import { esAdminActual } from '../../../core/utils/auth.utils';
import { puedeCrear, puedeActualizar, puedeEliminar } from '../../../core/utils/auth.utils';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideDynamicIcon],
  templateUrl: './vehiculos.html',
  styleUrls: ['./vehiculos.css'],
})
export class Vehiculos implements OnInit {
  puedeCrear = puedeCrear('vehiculos');
  puedeEditar = puedeActualizar('vehiculos');
  puedeEliminar = puedeEliminar('vehiculos');

  vehiculos: Vehiculo[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  filtroActivo = 'true';

  readonly tiposVehiculo: TipoVehiculo[] = [
    'porta_ataud',
    'porta_flores',
    'mixto',
    'auto',
    'microbus',
  ];

  readonly etiquetasTipo: Record<TipoVehiculo, string> = {
    porta_ataud: 'Porta ataúd',
    porta_flores: 'Porta flores',
    mixto: 'Mixto',
    auto: 'Auto',
    microbus: 'Microbús',
  };

  modalAbierto = false;
  modoEdicion = false;
  vehiculoSeleccionado: Vehiculo | null = null;
  form = { tipo: '' as TipoVehiculo | '' };

  modalToggleAbierto = false;
  itemToggle: any = null;

  modalEliminarAbierto = false;
  vehiculoEliminar: Vehiculo | null = null;

  // --- Imágenes ---
  modalImagenesAbierto = false;
  vehiculoImagenes: Vehiculo | null = null;
  previewIndex = 0;
  subiendoImagen = false;
  zoomAbierto = false;

  constructor(
    private vehiculoService: VehiculoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.vehiculoService.listar(undefined, this.filtroActivo).subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.mostrarMensaje(e.error?.detail || 'Error al cargar vehículos', 'error');
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  etiqueta(tipo: TipoVehiculo): string {
    return this.etiquetasTipo[tipo] ?? tipo;
  }

  abrirModalCrear(): void {
    this.modoEdicion = false;
    this.vehiculoSeleccionado = null;
    this.form = { tipo: '' };
    this.modalAbierto = true;
  }

  abrirModalEditar(v: Vehiculo): void {
    this.modoEdicion = true;
    this.vehiculoSeleccionado = v;
    this.form = { tipo: v.tipo };
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  guardar(): void {
    if (!this.form.tipo) {
      this.mostrarMensaje('Selecciona un tipo de vehículo', 'error');
      return;
    }
    if (this.modoEdicion && this.vehiculoSeleccionado) {
      this.vehiculoService.actualizar(this.vehiculoSeleccionado.id, this.form).subscribe({
        next: () => {
          this.mostrarMensaje('Vehículo actualizado', 'exito');
          this.cerrarModal();
          this.cargar();
        },
        error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al actualizar', 'error'),
      });
    } else {
      this.vehiculoService.crear(this.form).subscribe({
        next: () => {
          this.mostrarMensaje('Vehículo creado', 'exito');
          this.cerrarModal();
          this.cargar();
        },
        error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al crear', 'error'),
      });
    }
  }

  abrirModalEliminar(v: Vehiculo): void {
    this.vehiculoEliminar = v;
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false;
    this.vehiculoEliminar = null;
  }

  confirmarEliminar(): void {
    if (!this.vehiculoEliminar) return;
    this.vehiculoService.eliminar(this.vehiculoEliminar.id).subscribe({
      next: () => {
        this.mostrarMensaje('Vehículo eliminado', 'exito');
        this.cerrarModalEliminar();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al eliminar', 'error'),
    });
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.cdr.detectChanges();
    }, 3500);
  }

  toggleActivo(v: Vehiculo): void {
    const nuevoEstado = !v.activo;
    this.itemToggle = { ...v, nuevoEstado, nombre: `${this.etiqueta(v.tipo)} #${v.id}` };
    this.modalToggleAbierto = true;
  }

  cerrarModalToggle(): void {
    this.modalToggleAbierto = false;
    this.itemToggle = null;
  }

  confirmarToggle(): void {
    if (!this.itemToggle) return;
    const { id, nuevoEstado } = this.itemToggle;
    const accion = nuevoEstado ? 'activar' : 'desactivar';
    this.vehiculoService.cambiarEstado(id, nuevoEstado).subscribe({
      next: () => {
        this.mostrarMensaje(`${accion === 'activar' ? 'Activado' : 'Desactivado'} correctamente`, 'exito');
        this.cerrarModalToggle();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || `Error al ${accion}`, 'error'),
    });
  }

  limpiarFiltros(): void {
    this.filtroActivo = 'true';
    this.cargar();
  }

  // --- Imágenes ---

  abrirModalImagenes(v: Vehiculo): void {
    this.vehiculoImagenes = v;
    this.previewIndex = 0;
    this.modalImagenesAbierto = true;
  }

  cerrarModalImagenes(): void {
    this.modalImagenesAbierto = false;
    this.vehiculoImagenes = null;
  }

  seleccionarPreview(index: number): void {
    this.previewIndex = index;
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.vehiculoImagenes) return;

    const archivo = input.files[0];
    this.subiendoImagen = true;
    this.vehiculoService.agregarImagen(this.vehiculoImagenes.id, archivo).subscribe({
      next: (vehiculoActualizado) => {
        this.vehiculoImagenes = vehiculoActualizado;
        this.actualizarEnLista(vehiculoActualizado);
        this.previewIndex = vehiculoActualizado.imagenes.length - 1;
        this.subiendoImagen = false;
        input.value = '';
        this.mostrarMensaje('Imagen agregada', 'exito');
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.subiendoImagen = false;
        input.value = '';
        this.mostrarMensaje(e.error?.detail || 'Error al subir imagen', 'error');
        this.cdr.detectChanges();
      },
    });
  }

  eliminarImagenActual(): void {
    if (!this.vehiculoImagenes) return;
    const imagen = this.vehiculoImagenes.imagenes[this.previewIndex];
    if (!imagen) return;

    this.vehiculoService.eliminarImagen(this.vehiculoImagenes.id, imagen.id).subscribe({
      next: (vehiculoActualizado) => {
        this.vehiculoImagenes = vehiculoActualizado;
        this.actualizarEnLista(vehiculoActualizado);
        if (this.previewIndex >= vehiculoActualizado.imagenes.length) {
          this.previewIndex = Math.max(0, vehiculoActualizado.imagenes.length - 1);
        }
        this.mostrarMensaje('Imagen eliminada', 'exito');
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.mostrarMensaje(e.error?.detail || 'Error al eliminar imagen', 'error');
        this.cdr.detectChanges();
      },
    });
  }

  private actualizarEnLista(vehiculoActualizado: Vehiculo): void {
    const idx = this.vehiculos.findIndex((v) => v.id === vehiculoActualizado.id);
    if (idx !== -1) this.vehiculos[idx] = vehiculoActualizado;
  }

  abrirZoom(): void {
    if (!this.vehiculoImagenes?.imagenes?.length) return;
    this.zoomAbierto = true;
  }

  cerrarZoom(): void {
    this.zoomAbierto = false;
  }
}