import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AtaudService } from '../../../core/services/ataud';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideDynamicIcon } from '@lucide/angular';
import { Ataud } from '../../../core/models/ataud.model';
import { RouterLink } from '@angular/router';
import { puedeCrear, puedeActualizar, puedeEliminar, tienePermiso } from '../../../core/utils/auth.utils'

const MINIMO_IMAGENES = 3;

@Component({
  selector: 'app-ataudes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideDynamicIcon],
  templateUrl: './ataudes.html',
  styleUrls: ['./ataudes.css'],
})
export class Ataudes implements OnInit {
  puedeCrear = puedeCrear('ataudes');
  puedeEditar = puedeActualizar('ataudes');
  puedeEliminar = puedeEliminar('ataudes');
  puedeActualizarStock = tienePermiso('ataudes:actualizar_stock');

  ataudes: Ataud[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  filtroModelo = '';
  filtroColor = '';
  filtroActivo = 'true';
  modeloQuery = '';
  colorQuery = '';
  modelosUnicos: string[] = [];
  coloresUnicos: string[] = [];
  modelosFiltrados: string[] = [];
  coloresFiltrados: string[] = [];
  mostrarDropModelo = false;
  mostrarDropColor = false;

  ataudSeleccionado: Ataud | null = null;
  detalleForm = { modelo: '', color: '', stock: 0 };

  modalCrearAbierto = false;
  form = { modelo: '', color: '', stock: 0 };

  modalStockAbierto = false;
  cantidadStock = 0;

  modalToggleAbierto = false;
  itemToggle: any = null;

  modalEliminarAbierto = false;

  previewIndex = 0;
  subiendoImagen = false;
  zoomAbierto = false;

  readonly MINIMO_IMAGENES = MINIMO_IMAGENES;

  constructor(
    private ataudService: AtaudService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    const filtros: any = {};
    if (this.filtroModelo) filtros['modelo'] = this.filtroModelo;
    if (this.filtroColor) filtros['color'] = this.filtroColor;
    if (this.filtroActivo) filtros['activo'] = this.filtroActivo;

    this.ataudService.listar(filtros).subscribe({
      next: (data) => {
        this.ataudes = data;
        this.actualizarUnicos(data);
        this.cargando = false;
        if (this.ataudSeleccionado) {
          const actualizado = data.find((a) => a.id === this.ataudSeleccionado!.id);
          this.ataudSeleccionado = actualizado || null;
          if (actualizado) this.sincronizarDetalleForm(actualizado);
        }
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.mostrarMensaje(e.error?.detail || 'Error al cargar ataúdes', 'error');
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  private actualizarUnicos(data: Ataud[]): void {
    this.modelosUnicos = [...new Set(data.map((a) => a.modelo))].sort();
    this.coloresUnicos = [...new Set(data.map((a) => a.color))].sort();
  }

  onModeloInput(): void {
    this.modelosFiltrados = this.modelosUnicos.filter((m) =>
      m.toLowerCase().includes(this.modeloQuery.toLowerCase()),
    );
    this.mostrarDropModelo = true;
  }

  abrirDropModelo(): void {
    this.modelosFiltrados = [...this.modelosUnicos];
    this.mostrarDropModelo = true;
  }

  seleccionarModelo(m: string): void {
    this.modeloQuery = m;
    this.filtroModelo = m;
    this.mostrarDropModelo = false;
    this.cargar();
  }

  cerrarDropModelo(): void {
    setTimeout(() => {
      this.mostrarDropModelo = false;
    }, 150);
  }

  onColorInput(): void {
    this.coloresFiltrados = this.coloresUnicos.filter((c) =>
      c.toLowerCase().includes(this.colorQuery.toLowerCase()),
    );
    this.mostrarDropColor = true;
  }

  abrirDropColor(): void {
    this.coloresFiltrados = [...this.coloresUnicos];
    this.mostrarDropColor = true;
  }

  seleccionarColor(c: string): void {
    this.colorQuery = c;
    this.filtroColor = c;
    this.mostrarDropColor = false;
    this.cargar();
  }

  cerrarDropColor(): void {
    setTimeout(() => {
      this.mostrarDropColor = false;
    }, 150);
  }

  aplicarFiltros(): void {
    this.filtroModelo = this.modeloQuery;
    this.filtroColor = this.colorQuery;
    this.cargar();
  }

  limpiarFiltros(): void {
    this.filtroModelo = '';
    this.filtroColor = '';
    this.filtroActivo = 'true';
    this.modeloQuery = '';
    this.colorQuery = '';
    this.cargar();
  }

  seleccionarAtaud(a: Ataud): void {
    this.ataudSeleccionado = a;
    this.sincronizarDetalleForm(a);
    this.previewIndex = 0;
  }

  cerrarDetalle(): void {
    this.ataudSeleccionado = null;
  }

  private sincronizarDetalleForm(a: Ataud): void {
    this.detalleForm = { modelo: a.modelo, color: a.color, stock: a.stock };
  }

  guardarDetalle(): void {
    if (!this.ataudSeleccionado) return;
    if (!this.detalleForm.modelo || !this.detalleForm.color) {
      this.mostrarMensaje('Completa todos los campos requeridos', 'error');
      return;
    }
    this.ataudService.actualizar(this.ataudSeleccionado.id, this.detalleForm).subscribe({
      next: (actualizado) => {
        this.ataudSeleccionado = actualizado;
        this.actualizarEnLista(actualizado);
        this.mostrarMensaje('Ataúd actualizado', 'exito');
        this.cdr.detectChanges();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al actualizar', 'error'),
    });
  }

  abrirModalCrear(): void {
    this.form = { modelo: '', color: '', stock: 0 };
    this.modalCrearAbierto = true;
  }

  cerrarModalCrear(): void {
    this.modalCrearAbierto = false;
  }

  guardarNuevo(): void {
    if (!this.form.modelo || !this.form.color) {
      this.mostrarMensaje('Completa todos los campos requeridos', 'error');
      return;
    }
    this.ataudService.crear(this.form).subscribe({
      next: () => {
        this.mostrarMensaje('Ataúd creado correctamente', 'exito');
        this.cerrarModalCrear();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al crear', 'error'),
    });
  }

  abrirModalEliminar(): void {
    if (!this.ataudSeleccionado) return;
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false;
  }

  confirmarEliminar(): void {
    if (!this.ataudSeleccionado) return;
    const id = this.ataudSeleccionado.id;
    this.ataudService.eliminar(id).subscribe({
      next: () => {
        this.mostrarMensaje('Ataúd eliminado', 'exito');
        this.cerrarModalEliminar();
        this.ataudSeleccionado = null;
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al eliminar', 'error'),
    });
  }

  // --- Stock ---

  abrirModalStock(): void {
    if (!this.ataudSeleccionado) return;
    this.cantidadStock = 0;
    this.modalStockAbierto = true;
  }

  cerrarModalStock(): void {
    this.modalStockAbierto = false;
  }

  actualizarStock(): void {
    if (!this.ataudSeleccionado) return;
    this.ataudService.actualizarStock(this.ataudSeleccionado.id, this.cantidadStock).subscribe({
      next: (actualizado) => {
        this.ataudSeleccionado = actualizado;
        this.sincronizarDetalleForm(actualizado);
        this.actualizarEnLista(actualizado);
        this.mostrarMensaje('Stock actualizado', 'exito');
        this.cerrarModalStock();
        this.cdr.detectChanges();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al actualizar stock', 'error'),
    });
  }

  // --- Estado ---

  toggleActivo(): void {
    if (!this.ataudSeleccionado) return;
    const a = this.ataudSeleccionado;
    const nuevoEstado = !a.activo;
    this.itemToggle = { id: a.id, nuevoEstado, nombre: a.modelo };
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
    this.ataudService.cambiarEstado(id, nuevoEstado).subscribe({
      next: (actualizado) => {
        this.mostrarMensaje(
          `${accion === 'activar' ? 'Activado' : 'Desactivado'} correctamente`,
          'exito',
        );
        if (this.ataudSeleccionado?.id === id) {
          this.ataudSeleccionado = actualizado;
          this.sincronizarDetalleForm(actualizado);
        }
        this.actualizarEnLista(actualizado);
        this.cerrarModalToggle();
        this.cdr.detectChanges();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || `Error al ${accion}`, 'error'),
    });
  }

  // --- Imágenes ---

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.ataudSeleccionado) return;

    const archivo = input.files[0];
    this.subiendoImagen = true;
    this.ataudService.agregarImagen(this.ataudSeleccionado.id, archivo).subscribe({
      next: (actualizado) => {
        this.ataudSeleccionado = actualizado;
        this.actualizarEnLista(actualizado);
        this.previewIndex = (actualizado.imagenes?.length || 1) - 1;
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
    if (!this.ataudSeleccionado) return;
    const imagen = this.ataudSeleccionado.imagenes[this.previewIndex];
    if (!imagen) return;

    this.ataudService.eliminarImagen(this.ataudSeleccionado.id, imagen.id).subscribe({
      next: (actualizado) => {
        this.ataudSeleccionado = actualizado;
        this.actualizarEnLista(actualizado);
        if (this.previewIndex >= actualizado.imagenes.length) {
          this.previewIndex = Math.max(0, actualizado.imagenes.length - 1);
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

  seleccionarPreview(index: number): void {
    this.previewIndex = index;
  }

  abrirZoom(): void {
    if (!this.ataudSeleccionado?.imagenes?.length) return;
    this.zoomAbierto = true;
  }

  cerrarZoom(): void {
    this.zoomAbierto = false;
  }

  private actualizarEnLista(actualizado: Ataud): void {
    const idx = this.ataudes.findIndex((a) => a.id === actualizado.id);
    if (idx !== -1) this.ataudes[idx] = actualizado;
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.cdr.detectChanges();
    }, 3500);
  }

    imagenAnterior(): void {
    if (!this.ataudSeleccionado?.imagenes?.length) return;
    const total = this.ataudSeleccionado.imagenes.length;
    this.previewIndex = (this.previewIndex - 1 + total) % total;
  }

  imagenSiguiente(): void {
    if (!this.ataudSeleccionado?.imagenes?.length) return;
    const total = this.ataudSeleccionado.imagenes.length;
    this.previewIndex = (this.previewIndex + 1) % total;
  }
}