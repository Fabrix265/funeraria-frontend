import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { VehiculoService } from '../../../core/services/vehiculo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vehiculo, TipoVehiculo } from '../../../core/models/vehiculo.model';
import { RouterLink } from '@angular/router';
import { esAdminActual } from '../../../core/utils/auth.utils';
import { puedeCrear, puedeActualizar, puedeEliminar } from '../../../core/utils/auth.utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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

  modalEliminarAbierto = false;
  vehiculoEliminar: Vehiculo | null = null;

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
      error: () => {
        this.mostrarMensaje('Error al cargar vehículos', 'error');
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
        error: () => this.mostrarMensaje('Error al actualizar', 'error'),
      });
    } else {
      this.vehiculoService.crear(this.form).subscribe({
        next: () => {
          this.mostrarMensaje('Vehículo creado', 'exito');
          this.cerrarModal();
          this.cargar();
        },
        error: () => this.mostrarMensaje('Error al crear', 'error'),
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
      error: () => this.mostrarMensaje('Error al eliminar', 'error'),
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
    const accion = nuevoEstado ? 'activar' : 'desactivar';

    Swal.fire({
      title: `¿${accion.charAt(0).toUpperCase() + accion.slice(1)} registro?`,
      text: `¿Deseas ${accion} el vehículo "${this.etiqueta(v.tipo)}" #${v.id}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.cambiarEstado(v.id, nuevoEstado).subscribe({
          next: () => {
            this.mostrarMensaje(`Vehículo ${accion}do`, 'exito');
            this.cargar();
          },
          error: () => this.mostrarMensaje(`Error al ${accion}`, 'error'),
        });
      }
    });
  }

  limpiarFiltros(): void {
    this.filtroActivo = 'true';
    this.cargar();
  }
}
