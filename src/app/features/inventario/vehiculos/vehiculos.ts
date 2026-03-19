import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { VehiculoService } from '../../../core/services/vehiculo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vehiculo, TipoVehiculo } from '../../../core/models/vehiculo.model';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehiculos.html',
  styleUrls: ['./vehiculos.css']
})
export class Vehiculos implements OnInit {

  esAdmin = localStorage.getItem('cargo') === 'administrador'

  vehiculos: Vehiculo[] = []
  cargando = false
  mensaje = ''
  tipoMensaje: 'exito' | 'error' = 'exito'

  readonly tiposVehiculo: TipoVehiculo[] = [
    'porta_ataud',
    'porta_flores',
    'mixto',
    'auto',
    'microbus'
  ]

  readonly etiquetasTipo: Record<TipoVehiculo, string> = {
    porta_ataud:  'Porta ataúd',
    porta_flores: 'Porta flores',
    mixto:        'Mixto',
    auto:         'Auto',
    microbus:     'Microbús'
  }

  modalAbierto = false
  modoEdicion  = false
  vehiculoSeleccionado: Vehiculo | null = null
  form = { tipo: '' as TipoVehiculo | '' }

  modalEliminarAbierto = false
  vehiculoEliminar: Vehiculo | null = null

  constructor(
    private vehiculoService: VehiculoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar(): void {
    this.cargando = true
    this.vehiculoService.listar().subscribe({
      next: (data) => {
        this.vehiculos = data
        this.cargando = false
        this.cdr.detectChanges()
      },
      error: () => {
        this.mostrarMensaje('Error al cargar vehículos', 'error')
        this.cargando = false
        this.cdr.detectChanges()
      }
    })
  }

  etiqueta(tipo: TipoVehiculo): string {
    return this.etiquetasTipo[tipo] ?? tipo
  }

  abrirModalCrear(): void {
    this.modoEdicion = false
    this.vehiculoSeleccionado = null
    this.form = { tipo: '' }
    this.modalAbierto = true
  }

  abrirModalEditar(v: Vehiculo): void {
    this.modoEdicion = true
    this.vehiculoSeleccionado = v
    this.form = { tipo: v.tipo }
    this.modalAbierto = true
  }

  cerrarModal(): void { this.modalAbierto = false }

  guardar(): void {
    if (!this.form.tipo) {
      this.mostrarMensaje('Selecciona un tipo de vehículo', 'error')
      return
    }
    if (this.modoEdicion && this.vehiculoSeleccionado) {
      this.vehiculoService.actualizar(this.vehiculoSeleccionado.id, this.form).subscribe({
        next: () => { this.mostrarMensaje('Vehículo actualizado', 'exito'); this.cerrarModal(); this.cargar() },
        error: () => this.mostrarMensaje('Error al actualizar', 'error')
      })
    } else {
      this.vehiculoService.crear(this.form).subscribe({
        next: () => { this.mostrarMensaje('Vehículo creado', 'exito'); this.cerrarModal(); this.cargar() },
        error: () => this.mostrarMensaje('Error al crear', 'error')
      })
    }
  }

  abrirModalEliminar(v: Vehiculo): void {
    this.vehiculoEliminar = v
    this.modalEliminarAbierto = true
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false
    this.vehiculoEliminar = null
  }

  confirmarEliminar(): void {
    if (!this.vehiculoEliminar) return
    this.vehiculoService.eliminar(this.vehiculoEliminar.id).subscribe({
      next: () => { this.mostrarMensaje('Vehículo eliminado', 'exito'); this.cerrarModalEliminar(); this.cargar() },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    })
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje = texto
    this.tipoMensaje = tipo
    setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges() }, 3500)
  }

}