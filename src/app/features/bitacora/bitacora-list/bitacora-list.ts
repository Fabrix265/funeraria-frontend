import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { LucideDynamicIcon } from '@lucide/angular'
import { BitacoraService } from '../../../core/services/bitacora'
import { BitacoraEntry } from '../../../core/models/bitacora.model'
import { formatearFechaHora } from '../../../core/utils/fecha.utils'

@Component({
  selector: 'app-bitacora-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideDynamicIcon],
  templateUrl: './bitacora-list.html',
  styleUrls: ['./bitacora-list.css'],
})
export class BitacoraList implements OnInit {
  entradas: BitacoraEntry[] = []
  total = 0
  paginaActual = 1
  limite = 20
  cargando = false
  totalPaginas = 1
  exportando = false

  filtros = {
    fecha_inicio: '',
    fecha_fin: '',
    accion: '',
    modulo: '',
  }

  accionesDisponibles = [
    { valor: '', label: 'Todas' },
    { valor: 'login_exitoso', label: 'Login exitoso' },
    { valor: 'login_fallido', label: 'Login fallido' },
    { valor: 'crear', label: 'Crear' },
    { valor: 'actualizar', label: 'Actualizar' },
    { valor: 'eliminar', label: 'Eliminar' },
    { valor: 'cambiar_estado', label: 'Cambiar estado' },
    { valor: 'actualizar_stock', label: 'Actualizar stock' },
    { valor: 'restaurar', label: 'Restaurar' },
    { valor: 'descargar', label: 'Descargar' },
  ]

  modulosDisponibles = [
    { valor: '', label: 'Todos' },
    { valor: 'auth', label: 'Autenticacion' },
    { valor: 'servicios', label: 'Servicios' },
    { valor: 'ataudes', label: 'Ataudes' },
    { valor: 'capillas', label: 'Capillas' },
    { valor: 'vehiculos', label: 'Vehiculos' },
    { valor: 'contratantes', label: 'Contratantes' },
    { valor: 'fallecidos', label: 'Fallecidos' },
    { valor: 'usuarios', label: 'Usuarios' },
    { valor: 'roles', label: 'Roles' },
    { valor: 'drive', label: 'Google Drive' },
    { valor: 'respaldos', label: 'Respaldos' },
  ]

  constructor(private bitacoraService: BitacoraService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarDatos()
  }

  cargarDatos(): void {
    this.cargando = true
    const offset = (this.paginaActual - 1) * this.limite
    this.bitacoraService.listar(this.filtros, offset, this.limite).subscribe({
      next: (res) => {
        this.entradas = res.items
        this.total = res.total
        this.totalPaginas = res.total_paginas
        this.cargando = false
        this.cdr.detectChanges()
      },
      error: () => {
        this.cargando = false
        this.cdr.detectChanges()
      },
    })
  }

  aplicarFiltros(): void {
    this.paginaActual = 1
    this.cargarDatos()
  }

  limpiarFiltros(): void {
    this.filtros = { fecha_inicio: '', fecha_fin: '', accion: '', modulo: '' }
    this.paginaActual = 1
    this.cargarDatos()
  }

  cambiarPagina(delta: number): void {
    const nuevaPagina = this.paginaActual + delta
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina
      this.cargarDatos()
    }
  }

  get hayAnterior(): boolean {
    return this.paginaActual > 1
  }

  get haySiguiente(): boolean {
    return this.paginaActual < this.totalPaginas
  }

  getModuloColor(modulo: string): string {
    const colores: Record<string, string> = {
      auth: 'badge--auth',
      servicios: 'badge--servicios',
      ataudes: 'badge--ataudes',
      capillas: 'badge--capillas',
      vehiculos: 'badge--vehiculos',
      contratantes: 'badge--contratantes',
      fallecidos: 'badge--fallecidos',
      usuarios: 'badge--usuarios',
      roles: 'badge--roles',
      drive: 'badge--drive',
      respaldos: 'badge--respaldos',
    }
    return colores[modulo] || 'badge--default'
  }

  getAccionLabel(accion: string): string {
    const labels: Record<string, string> = {
      login_exitoso: 'Login',
      login_fallido: 'Login fallido',
      crear: 'Crear',
      actualizar: 'Actualizar',
      eliminar: 'Eliminar',
      cambiar_estado: 'Cambiar estado',
      actualizar_stock: 'Actualizar stock',
      restaurar: 'Restaurar',
      descargar: 'Descargar',
    }
    return labels[accion] || accion
  }

  getModuloLabel(modulo: string): string {
    const labels: Record<string, string> = {
      auth: 'Auth',
      servicios: 'Servicios',
      ataudes: 'Ataudes',
      capillas: 'Capillas',
      vehiculos: 'Vehiculos',
      contratantes: 'Contratantes',
      fallecidos: 'Fallecidos',
      usuarios: 'Usuarios',
      roles: 'Roles',
      drive: 'Drive',
      respaldos: 'Respaldos',
    }
    return labels[modulo] || modulo
  }

  formatDate(dateStr: string): string {
    return formatearFechaHora(dateStr)
  }

  exportarExcel(): void {
    this.exportando = true
    this.bitacoraService.exportar(this.filtros).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `bitacora_${new Date().toISOString().slice(0, 10)}.xlsx`
        a.click()
        window.URL.revokeObjectURL(url)
        this.exportando = false
        this.cdr.detectChanges()
      },
      error: () => {
        this.exportando = false
        this.cdr.detectChanges()
      },
    })
  }
}
