import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { PersonaService } from '../../../core/services/persona'

@Component({
  selector: 'app-fallecidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fallecidos.html',
  styleUrls: ['./fallecidos.css']
})
export class Fallecidos implements OnInit {

  fallecidos: any[] = []
  cargando = false
  mensaje = ''
  tipoMensaje: 'exito' | 'error' = 'exito'

  nombreQuery = ''
  dniQuery    = ''
  nombresUnicos: string[] = []
  nombresFiltrados: string[] = []
  mostrarDropNombre = false

  modalAbierto = false
  fallecidoSeleccionado: any = null
  form = { nombre: '', dni: '' }

  modalEliminarAbierto = false
  fallecidoEliminar: any = null

  constructor(
    private personaService: PersonaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar(): void {
    this.cargando = true
    this.personaService.listarFallecidos(
      this.nombreQuery || undefined,
      this.dniQuery    || undefined
    ).subscribe({
      next: (data) => {
        this.fallecidos    = data
        this.nombresUnicos = [...new Set(data.map((f: any) => f.nombre))].sort()
        this.cargando      = false
        this.cdr.detectChanges()
      },
      error: () => {
        this.cargando = false
        this.cdr.detectChanges()
      }
    })
  }

  onNombreInput(): void {
    this.nombresFiltrados  = this.nombresUnicos.filter(n =>
      n.toLowerCase().includes(this.nombreQuery.toLowerCase())
    )
    this.mostrarDropNombre = true
  }

  abrirDropNombre(): void {
    this.nombresFiltrados  = [...this.nombresUnicos]
    this.mostrarDropNombre = true
  }

  seleccionarNombre(n: string): void {
    this.nombreQuery       = n
    this.mostrarDropNombre = false
  }

  cerrarDropNombre(): void {
    setTimeout(() => { this.mostrarDropNombre = false }, 150)
  }

  aplicarFiltros(): void { this.cargar() }

  limpiarFiltros(): void {
    this.nombreQuery = ''
    this.dniQuery    = ''
    this.cargar()
  }

  abrirModalEditar(f: any): void {
    this.fallecidoSeleccionado = f
    this.form = { nombre: f.nombre, dni: f.dni }
    this.modalAbierto = true
  }

  cerrarModal(): void { this.modalAbierto = false }

  guardar(): void {
    if (!this.fallecidoSeleccionado) return
    if (!this.form.nombre || !this.form.dni) {
      this.mostrarMensaje('Nombre y DNI son requeridos', 'error')
      return
    }
    this.personaService.actualizarFallecido(this.fallecidoSeleccionado.id, this.form).subscribe({
      next: () => {
        this.mostrarMensaje('Fallecido actualizado', 'exito')
        this.cerrarModal()
        this.cargar()
      },
      error: () => this.mostrarMensaje('Error al actualizar', 'error')
    })
  }

  abrirModalEliminar(f: any): void {
    this.fallecidoEliminar    = f
    this.modalEliminarAbierto = true
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false
    this.fallecidoEliminar    = null
  }

  confirmarEliminar(): void {
    if (!this.fallecidoEliminar) return
    this.personaService.eliminarFallecido(this.fallecidoEliminar.id).subscribe({
      next: () => {
        this.mostrarMensaje('Fallecido eliminado', 'exito')
        this.cerrarModalEliminar()
        this.cargar()
      },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    })
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje     = texto
    this.tipoMensaje = tipo
    setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges() }, 3500)
  }

}