import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router, RouterLink } from '@angular/router'

type EstadoItem = 'pendiente' | 'procesando' | 'listo' | 'error'
type TipoPago = 'directo' | 'seguro' | 'mixto'

interface ItemContrato {
  id: number
  archivo: File
  previewUrl: string
  estado: EstadoItem
  datos: DatosContrato | null
  error: string
}

interface DatosContrato {
  fecha: string
  contratante_nombre: string
  contratante_dni: string
  contratante_telefono: string
  fallecido_nombre: string
  direccion_velacion: string
  tipo_pago: TipoPago | ''
  ataud_modelo: string
  ataud_color: string
  capilla_modelo: string
  ids_vehiculos_detectados: string[]
  cantidad_cargadores: number | null
  costo: string
}

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ia.html',
  styleUrls: ['./ia.css']
})
export class Ia implements OnInit {

  items: ItemContrato[] = []
  itemSeleccionado: ItemContrato | null = null
  contadorId = 0
  procesandoCola = false

  readonly tiposPago: TipoPago[] = ['directo', 'seguro', 'mixto']
  readonly tiposVehiculo = [
    { key: 'porta_ataud',  label: 'Porta ataúd' },
    { key: 'porta_flores', label: 'Porta flores' },
    { key: 'mixto',        label: 'Mixto' },
    { key: 'auto',         label: 'Auto' },
    { key: 'microbus',     label: 'Microbús' },
  ]

  mensaje = ''
  tipoMensaje: 'exito' | 'error' = 'exito'
  guardando = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onArchivosSeleccionados(event: Event): void {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    Array.from(input.files).forEach(archivo => {
      const item: ItemContrato = {
        id: ++this.contadorId,
        archivo,
        previewUrl: URL.createObjectURL(archivo),
        estado: 'pendiente',
        datos: null,
        error: ''
      }
      this.items.push(item)
    })

    if (!this.itemSeleccionado) {
      this.itemSeleccionado = this.items[0]
    }

    input.value = ''
    this.procesarCola()
  }

  private async procesarCola(): Promise<void> {
    if (this.procesandoCola) return
    this.procesandoCola = true

    while (true) {
      const pendiente = this.items.find(i => i.estado === 'pendiente')
      if (!pendiente) break

      pendiente.estado = 'procesando'
      this.cdr.detectChanges()

      try {
        const datos = await this.enviarImagen(pendiente.archivo)
        pendiente.datos = this.mapearDatos(datos)
        pendiente.estado = 'listo'

        if (!this.itemSeleccionado || this.itemSeleccionado.estado === 'procesando') {
          this.itemSeleccionado = pendiente
        }
      } catch {
        pendiente.estado = 'error'
        pendiente.error = 'Error al procesar la imagen'
      }

      this.cdr.detectChanges()
    }

    this.procesandoCola = false
  }

  private enviarImagen(archivo: File): Promise<any> {
    const form = new FormData()
    form.append('file', archivo)

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8000/ia/procesar-contrato', form).subscribe({
        next: resolve,
        error: reject
      })
    })
  }

  private mapearDatos(raw: any): DatosContrato {
    return {
      fecha:                    raw.fecha                ?? '',
      contratante_nombre:       raw.contratante_nombre   ?? '',
      contratante_dni:          raw.contratante_dni       ?? '',
      contratante_telefono:     raw.contratante_telefono ?? '',
      fallecido_nombre:         raw.fallecido_nombre     ?? '',
      direccion_velacion:       raw.direccion_velacion   ?? '',
      tipo_pago:                raw.tipo_pago            ?? '',
      ataud_modelo:             raw.ataud_modelo         ?? '',
      ataud_color:              raw.ataud_color          ?? '',
      capilla_modelo:           raw.capilla_modelo       ?? '',
      ids_vehiculos_detectados: raw.ids_vehiculos_detectados ?? [],
      cantidad_cargadores:      raw.cantidad_cargadores  ?? null,
      costo:                    raw.costo?.toString()    ?? ''
    }
  }

  seleccionar(item: ItemContrato): void {
    this.itemSeleccionado = item
  }

  toggleVehiculo(key: string): void {
    if (!this.itemSeleccionado?.datos) return
    const lista = this.itemSeleccionado.datos.ids_vehiculos_detectados
    const idx = lista.indexOf(key)
    if (idx >= 0) lista.splice(idx, 1)
    else lista.push(key)
  }

  vehiculoSeleccionado(key: string): boolean {
    return this.itemSeleccionado?.datos?.ids_vehiculos_detectados.includes(key) ?? false
  }

  reintentar(item: ItemContrato): void {
    item.estado = 'pendiente'
    item.error = ''
    item.datos = null
    this.procesarCola()
  }

  eliminar(item: ItemContrato): void {
    URL.revokeObjectURL(item.previewUrl)
    this.items = this.items.filter(i => i.id !== item.id)
    if (this.itemSeleccionado?.id === item.id) {
      this.itemSeleccionado = this.items.find(i => i.estado === 'listo') ?? this.items[0] ?? null
    }
  }

  guardar(): void {
    if (!this.itemSeleccionado?.datos) return
    const d = this.itemSeleccionado.datos

    if (!d.direccion_velacion || !d.fecha) {
      this.mostrarMensaje('Completa al menos la dirección y la fecha', 'error')
      return
    }

    const payload: any = {
      direccion_velacion:   d.direccion_velacion,
      tipo_pago:            d.tipo_pago || 'directo',
      costo:                parseFloat(d.costo) || 0,
      fecha:                d.fecha,
      cantidad_cargadores:  d.cantidad_cargadores || null,
      fallecido:            { nombre: d.fallecido_nombre },
      contratante:          {
        nombre:   d.contratante_nombre,
        dni:      d.contratante_dni,
        telefono: d.contratante_telefono
      },
      ids_vehiculos:        [],
      id_ataud:             null,
      id_capilla:           null,
      ataud_modelo_nuevo:   d.ataud_modelo   || null,
      color_ataud_nuevo:    d.ataud_color    || null,
      capilla_modelo_nuevo: d.capilla_modelo || null,
    }

    this.guardando = true
    this.http.post('http://localhost:8000/servicios/', payload).subscribe({
      next: () => {
        this.mostrarMensaje('Servicio guardado correctamente', 'exito')
        const item = this.itemSeleccionado!
        setTimeout(() => { this.eliminar(item) }, 1200)
        this.guardando = false
      },
      error: (err) => {
        const detalle = err?.error?.detail ?? 'Error al guardar el servicio'
        this.mostrarMensaje(detalle, 'error')
        this.guardando = false
      }
    })
  }

  get totalPendientes(): number { return this.items.filter(i => i.estado === 'pendiente' || i.estado === 'procesando').length }
  get totalListos(): number     { return this.items.filter(i => i.estado === 'listo').length }
  get totalErrores(): number    { return this.items.filter(i => i.estado === 'error').length }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje = texto
    this.tipoMensaje = tipo
    setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges() }, 3500)
  }

}