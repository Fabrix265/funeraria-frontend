import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { AtaudService } from '../../../core/services/ataud';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ataud, TipoAtaud } from '../../../core/models/ataud.model'

@Component({
  selector: 'app-ataudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ataudes.html',
  styleUrls: ['./ataudes.css']
})
export class Ataudes implements OnInit {

  esAdmin = localStorage.getItem('cargo') === 'administrador'

  ataudes: Ataud[] = []
  cargando = false
  mensaje = ''
  tipoMensaje: 'exito' | 'error' = 'exito'

  filtroModelo  = ''
  filtroColor   = ''
  filtroTipo    = ''
  modeloQuery   = ''
  colorQuery    = ''
  modelosUnicos: string[] = []
  coloresUnicos: string[] = []
  modelosFiltrados: string[] = []
  coloresFiltrados: string[] = []
  mostrarDropModelo = false
  mostrarDropColor  = false

  readonly tiposAtaud: TipoAtaud[] = ['economico', 'vip']

  modalAbierto = false
  modoEdicion  = false
  ataudSeleccionado: Ataud | null = null
  form = { modelo: '', color: '', tipo: '' as TipoAtaud | '', stock: 0 }

  modalStockAbierto = false
  ataudStock: Ataud | null = null
  cantidadStock = 0

  modalEliminarAbierto = false
  ataudEliminar: Ataud | null = null

  constructor(
    private ataudService: AtaudService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar(): void {
    this.cargando = true
    const filtros: any = {}
    if (this.filtroModelo) filtros['modelo'] = this.filtroModelo
    if (this.filtroColor)  filtros['color']  = this.filtroColor
    if (this.filtroTipo)   filtros['tipo']   = this.filtroTipo

    this.ataudService.listar(filtros).subscribe({
      next: (data) => {
        this.ataudes = data
        this.actualizarUnicos(data)
        this.cargando = false
        this.cdr.detectChanges()
      },
      error: () => {
        this.mostrarMensaje('Error al cargar ataúdes', 'error')
        this.cargando = false
        this.cdr.detectChanges()
      }
    })
  }

  private actualizarUnicos(data: Ataud[]): void {
    this.modelosUnicos = [...new Set(data.map(a => a.modelo))].sort()
    this.coloresUnicos = [...new Set(data.map(a => a.color))].sort()
  }

  onModeloInput(): void {
    this.modelosFiltrados = this.modelosUnicos.filter(m =>
      m.toLowerCase().includes(this.modeloQuery.toLowerCase())
    )
    this.mostrarDropModelo = true
  }

  abrirDropModelo(): void {
    this.modelosFiltrados = [...this.modelosUnicos]
    this.mostrarDropModelo = true
  }

  seleccionarModelo(m: string): void {
    this.modeloQuery   = m
    this.filtroModelo  = m
    this.mostrarDropModelo = false
  }

  limpiarModelo(): void {
    this.modeloQuery  = ''
    this.filtroModelo = ''
  }

  cerrarDropModelo(): void {
    setTimeout(() => { this.mostrarDropModelo = false }, 150)
  }

  onColorInput(): void {
    this.coloresFiltrados = this.coloresUnicos.filter(c =>
      c.toLowerCase().includes(this.colorQuery.toLowerCase())
    )
    this.mostrarDropColor = true
  }

  abrirDropColor(): void {
    this.coloresFiltrados = [...this.coloresUnicos]
    this.mostrarDropColor = true
  }

  seleccionarColor(c: string): void {
    this.colorQuery  = c
    this.filtroColor = c
    this.mostrarDropColor = false
  }

  limpiarColor(): void {
    this.colorQuery  = ''
    this.filtroColor = ''
  }

  cerrarDropColor(): void {
    setTimeout(() => { this.mostrarDropColor = false }, 150)
  }

  aplicarFiltros(): void {
    this.filtroModelo = this.modeloQuery
    this.filtroColor  = this.colorQuery
    this.cargar()
  }

  limpiarFiltros(): void {
    this.filtroModelo = ''
    this.filtroColor  = ''
    this.filtroTipo   = ''
    this.modeloQuery  = ''
    this.colorQuery   = ''
    this.cargar()
  }

  abrirModalCrear(): void {
    this.modoEdicion = false
    this.ataudSeleccionado = null
    this.form = { modelo: '', color: '', tipo: '', stock: 0 }
    this.modalAbierto = true
  }

  abrirModalEditar(ataud: Ataud): void {
    this.modoEdicion = true
    this.ataudSeleccionado = ataud
    this.form = { modelo: ataud.modelo, color: ataud.color, tipo: ataud.tipo, stock: ataud.stock }
    this.modalAbierto = true
  }

  cerrarModal(): void { this.modalAbierto = false }

  guardar(): void {
    if (!this.form.modelo || !this.form.color || !this.form.tipo) {
      this.mostrarMensaje('Completa todos los campos requeridos', 'error')
      return
    }
    if (this.modoEdicion && this.ataudSeleccionado) {
      this.ataudService.actualizar(this.ataudSeleccionado.id, this.form).subscribe({
        next: () => { this.mostrarMensaje('Ataúd actualizado', 'exito'); this.cerrarModal(); this.cargar() },
        error: () => this.mostrarMensaje('Error al actualizar', 'error')
      })
    } else {
      this.ataudService.crear(this.form).subscribe({
        next: () => { this.mostrarMensaje('Ataúd creado correctamente', 'exito'); this.cerrarModal(); this.cargar() },
        error: () => this.mostrarMensaje('Error al crear', 'error')
      })
    }
  }

  abrirModalEliminar(ataud: Ataud): void {
    this.ataudEliminar = ataud
    this.modalEliminarAbierto = true
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false
    this.ataudEliminar = null
  }

  confirmarEliminar(): void {
    if (!this.ataudEliminar) return
    this.ataudService.eliminar(this.ataudEliminar.id).subscribe({
      next: () => { this.mostrarMensaje('Ataúd eliminado', 'exito'); this.cerrarModalEliminar(); this.cargar() },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    })
  }

  abrirModalStock(ataud: Ataud): void {
    this.ataudStock   = ataud
    this.cantidadStock = 0
    this.modalStockAbierto = true
  }

  cerrarModalStock(): void {
    this.modalStockAbierto = false
    this.ataudStock = null
  }

  actualizarStock(): void {
    if (!this.ataudStock) return
    this.ataudService.actualizarStock(this.ataudStock.id, this.cantidadStock).subscribe({
      next: () => { this.mostrarMensaje('Stock actualizado', 'exito'); this.cerrarModalStock(); this.cargar() },
      error: () => this.mostrarMensaje('Error al actualizar stock', 'error')
    })
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje = texto
    this.tipoMensaje = tipo
    setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges() }, 3500)
  }

}