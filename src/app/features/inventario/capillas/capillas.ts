import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CapillaService } from '../../../core/services/capilla';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Capilla } from '../../../core/models/capilla.model'
import { RouterLink } from '@angular/router';
import { puedeCrear, puedeActualizar, puedeEliminar, tienePermiso} from '../../../core/utils/auth.utils';

@Component({
  selector: 'app-capillas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './capillas.html',
  styleUrls: ['./capillas.css'],
})
export class Capillas implements OnInit {
  puedeCrear = puedeCrear('capillas');
  puedeEditar = puedeActualizar('capillas');
  puedeEliminar = puedeEliminar('capillas');
  puedeActualizarStock = tienePermiso('capillas:actualizar');

  capillas: Capilla[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  modeloQuery = '';
  modelosUnicos: string[] = [];
  modelosFiltrados: string[] = [];
  mostrarDrop = false;

  filtroActivo = 'true';

  modalAbierto = false;
  modoEdicion = false;
  capillaSeleccionada: Capilla | null = null;
  form = { modelo: '', stock: 0 };

  modalStockAbierto = false;
  capillaStock: Capilla | null = null;
  cantidadStock = 0;

  modalToggleAbierto = false;
  itemToggle: any = null;

  modalEliminarAbierto = false;
  capillaEliminar: Capilla | null = null;

  constructor(
    private capillaService: CapillaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.capillaService.listar(this.modeloQuery || undefined, this.filtroActivo).subscribe({
      next: (data) => {
        this.capillas = data;
        this.modelosUnicos = [...new Set(data.map((c) => c.modelo))].sort();
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.mostrarMensaje(e.error?.detail || 'Error al cargar capillas', 'error');
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  onModeloInput(): void {
    this.modelosFiltrados = this.modelosUnicos.filter((m) =>
      m.toLowerCase().includes(this.modeloQuery.toLowerCase()),
    );
    this.mostrarDrop = true;
  }

  abrirDrop(): void {
    this.modelosFiltrados = [...this.modelosUnicos];
    this.mostrarDrop = true;
  }

  seleccionarModelo(m: string): void {
    this.modeloQuery = m;
    this.mostrarDrop = false;
  }

  cerrarDrop(): void {
    setTimeout(() => {
      this.mostrarDrop = false;
    }, 150);
  }

  aplicarFiltro(): void {
    this.cargar();
  }

  limpiarFiltro(): void {
    this.modeloQuery = '';
    this.filtroActivo = 'true';
    this.cargar();
  }

  abrirModalCrear(): void {
    this.modoEdicion = false;
    this.capillaSeleccionada = null;
    this.form = { modelo: '', stock: 0 };
    this.modalAbierto = true;
  }

  abrirModalEditar(c: Capilla): void {
    this.modoEdicion = true;
    this.capillaSeleccionada = c;
    this.form = { modelo: c.modelo, stock: c.stock };
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  guardar(): void {
    if (!this.form.modelo) {
      this.mostrarMensaje('El modelo es requerido', 'error');
      return;
    }
    if (this.modoEdicion && this.capillaSeleccionada) {
      this.capillaService.actualizar(this.capillaSeleccionada.id, this.form).subscribe({
        next: () => {
          this.mostrarMensaje('Capilla actualizada', 'exito');
          this.cerrarModal();
          this.cargar();
        },
        error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al actualizar', 'error'),
      });
    } else {
      this.capillaService.crear(this.form).subscribe({
        next: () => {
          this.mostrarMensaje('Capilla creada', 'exito');
          this.cerrarModal();
          this.cargar();
        },
        error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al crear', 'error'),
      });
    }
  }

  abrirModalEliminar(c: Capilla): void {
    this.capillaEliminar = c;
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false;
    this.capillaEliminar = null;
  }

  confirmarEliminar(): void {
    if (!this.capillaEliminar) return;
    this.capillaService.eliminar(this.capillaEliminar.id).subscribe({
      next: () => {
        this.mostrarMensaje('Capilla eliminada', 'exito');
        this.cerrarModalEliminar();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al eliminar', 'error'),
    });
  }

  abrirModalStock(c: Capilla): void {
    this.capillaStock = c;
    this.cantidadStock = 0;
    this.modalStockAbierto = true;
  }

  cerrarModalStock(): void {
    this.modalStockAbierto = false;
    this.capillaStock = null;
  }

  actualizarStock(): void {
    if (!this.capillaStock) return;
    this.capillaService.actualizarStock(this.capillaStock.id, this.cantidadStock).subscribe({
      next: () => {
        this.mostrarMensaje('Stock actualizado', 'exito');
        this.cerrarModalStock();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al actualizar stock', 'error'),
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

  toggleActivo(c: Capilla): void {
    const nuevoEstado = !c.activo;
    this.itemToggle = { ...c, nuevoEstado, nombre: c.modelo };
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
    this.capillaService.cambiarEstado(id, nuevoEstado).subscribe({
      next: () => {
        this.mostrarMensaje(`${accion === 'activar' ? 'Activado' : 'Desactivado'} correctamente`, 'exito');
        this.cerrarModalToggle();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || `Error al ${accion}`, 'error'),
    });
  }
}
