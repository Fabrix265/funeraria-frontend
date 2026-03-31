import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { RouterLink, Router, ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Servicio } from '../../../core/services/servicio'

@Component({
  selector: 'app-servicio-create',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './servicio-create.html',
  styleUrls: ['./servicio-create.css']
})
export class ServicioCreate implements OnInit {

  ataudes: any[] = []
  capillas: any[] = []
  vehiculos: any[] = []

  esEdicion = false
  idEditar: number | null = null
  guardando = false
  mensaje = ''
  tipoMensaje: 'exito' | 'error' = 'exito'

  form: any = {
    direccion_velacion: '',
    tipo_pago: 'directo',
    costo: 0,
    fecha: '',
    id_capilla: null,
    id_ataud: null,
    fallecido: { nombre: '', dni: '' },
    contratante: { nombre: '', dni: '', telefono: '' },
    ids_vehiculos: []
  }

  readonly tiposPago = ['directo', 'seguro', 'mixto']

  constructor(
    private servicioService: Servicio,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos()
    const idParam = this.route.snapshot.paramMap.get('id')
    if (idParam) {
      this.esEdicion = true
      this.idEditar = Number(idParam)
      this.cargarDatos(this.idEditar)
    }
  }

  cargarCatalogos(): void {
    const api = 'http://localhost:8000'
    this.http.get<any[]>(`${api}/ataudes`).subscribe(res => { this.ataudes = res; this.cdr.detectChanges() })
    this.http.get<any[]>(`${api}/capillas`).subscribe(res => { this.capillas = res; this.cdr.detectChanges() })
    this.http.get<any[]>(`${api}/vehiculos`).subscribe(res => { this.vehiculos = res; this.cdr.detectChanges() })
  }

  cargarDatos(id: number): void {
    this.servicioService.obtener(id).subscribe({
      next: (res: any) => {
        this.form = {
          direccion_velacion: res.direccion_velacion,
          tipo_pago: res.tipo_pago,
          costo: res.costo,
          fecha: res.fecha ? res.fecha.split('T')[0] : '',
          id_capilla: res.capilla?.id ?? null,
          id_ataud: res.ataud?.id ?? null,
          fallecido: { nombre: res.fallecido?.nombre || '', dni: res.fallecido?.dni || '' },
          contratante: { nombre: res.contratante?.nombre || '', dni: res.contratante?.dni || '', telefono: res.contratante?.telefono || '' },
          ids_vehiculos: res.vehiculos_asignados ? res.vehiculos_asignados.map((v: any) => v.id) : []
        }
        this.cdr.detectChanges()
      }
    })
  }

  toggleVehiculo(id: number): void {
    const idx = this.form.ids_vehiculos.indexOf(id)
    idx > -1 ? this.form.ids_vehiculos.splice(idx, 1) : this.form.ids_vehiculos.push(id)
  }

  estaSeleccionado(id: number): boolean { return this.form.ids_vehiculos.includes(id) }

  etiquetaVehiculo(tipo: string): string {
    const map: Record<string, string> = { porta_ataud: 'Porta ataúd', porta_flores: 'Porta flores', mixto: 'Mixto', auto: 'Auto', microbus: 'Microbús' }
    return map[tipo] ?? tipo
  }

  guardar(): void {
    if (!this.form.direccion_velacion || !this.form.fecha || !this.form.id_capilla) {
      this.mostrarMensaje('Completa los campos requeridos', 'error')
      return
    }

    this.guardando = true
    const payload = {
      ...this.form,
      id_capilla: Number(this.form.id_capilla),
      id_ataud: this.form.id_ataud ? Number(this.form.id_ataud) : null,
      costo: Number(this.form.costo)
    }

    const obs = (this.esEdicion && this.idEditar)
      ? this.servicioService.actualizar(this.idEditar, payload)
      : this.servicioService.crear(payload)

    obs.subscribe({
      next: () => this.router.navigate(['/servicios']),
      error: (err) => {
        this.guardando = false
        this.mostrarMensaje(err.error?.detail?.[0]?.msg || err.error?.detail || 'Error al guardar', 'error')
      }
    })
  }

  cancelar(): void { this.router.navigate(this.esEdicion ? ['/servicios', this.idEditar] : ['/servicios']) }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje = texto; this.tipoMensaje = tipo; this.cdr.detectChanges()
    setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges() }, 3500)
  }
}