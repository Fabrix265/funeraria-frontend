import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Servicio } from '../../../core/services/servicio'

@Component({
  selector: 'app-servicio-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './servicio-list.html',
  styleUrls: ['./servicio-list.css']
})
export class ServicioList implements OnInit {

  servicios: any[] = []
  cargando = false
  total    = 0
  limit    = 10
  offset   = 0

  filtros = { nombre: '', dni: '', fecha: '' }

  constructor(
    private servicioService: Servicio,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar(): void {
    this.cargando = true
    const params: any = {}
    if (this.filtros.nombre) params['nombre'] = this.filtros.nombre
    if (this.filtros.dni)    params['dni']    = this.filtros.dni
    if (this.filtros.fecha)  params['fecha']  = this.filtros.fecha

    this.servicioService.listar(params, this.offset, this.limit).subscribe({
      next: (res) => {
        this.total     = res.total
        this.servicios = (res.data || []).sort((a: any, b: any) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        )
        this.cargando = false
        this.cdr.detectChanges()
      },
      error: () => {
        this.cargando = false
        this.cdr.detectChanges()
      }
    })
  }

  aplicarFiltros(): void { this.offset = 0; this.cargar() }

  limpiar(): void {
    this.filtros = { nombre: '', dni: '', fecha: '' }
    this.offset  = 0
    this.cargar()
  }

  cambiarPagina(delta: number): void {
    this.offset = Math.max(0, this.offset + delta)
    this.cargar()
  }

  get paginaActual(): number  { return Math.floor(this.offset / this.limit) + 1 }
  get totalPaginas(): number  { return Math.ceil(this.total / this.limit) || 1 }
  get hayAnterior(): boolean  { return this.offset > 0 }
  get haySiguiente(): boolean { return (this.offset + this.limit) < this.total }

}