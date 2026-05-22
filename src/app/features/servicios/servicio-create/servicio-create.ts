import { Component, OnInit, NgZone } from '@angular/core'
import { RouterLink, Router, ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Servicio } from '../../../core/services/servicio'
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-servicio-create',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './servicio-create.html',
  styleUrls: ['./servicio-create.css']
})
export class ServicioCreate implements OnInit {

  private mainApi = environment.apiUrl;

  ataudes:   any[] = []
  capillas:  any[] = []
  vehiculos: any[] = []

  esEdicion   = false
  idEditar: number | null = null
  guardando   = false
  mensaje     = ''
  tipoMensaje: 'exito' | 'error' = 'exito'

  // Sugerencias informativas de la IA
  iaMeta: any = null

  form: any = {
    direccion_velacion:  '',
    tipo_pago:           'directo',
    costo:               0,
    fecha:               '',
    id_capilla:          null,
    id_ataud:            null,
    cantidad_cargadores: null,
    fallecido:           { nombre: '' },
    contratante:         { nombre: '', dni: '', telefono: '' },
    ids_vehiculos:       []
  }

  readonly tiposPago = ['directo', 'seguro', 'mixto']

  constructor(
    private servicioService: Servicio,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos()

    // Leer datos pre-llenados desde IA
    const state = history.state
    if (state?.ia) {
      this.aplicarDatosIA(state.ia)
    }

    const idParam = this.route.snapshot.paramMap.get('id')
    if (idParam) {
      this.esEdicion = true
      this.idEditar  = Number(idParam)
      this.cargarDatos(this.idEditar)
    }
  }

  aplicarDatosIA(ia: any): void {
    this.iaMeta = ia
    this.form.direccion_velacion      = ia.direccion_velacion   || ''
    this.form.tipo_pago               = ia.tipo_pago            || 'directo'
    this.form.costo                   = ia.costo                || 0
    this.form.fecha                   = ia.fecha                || ''
    this.form.cantidad_cargadores     = ia.cantidad_cargadores  || null
    this.form.fallecido.nombre        = ia.fallecido_nombre     || ''
    this.form.contratante.nombre      = ia.contratante_nombre   || ''
    this.form.contratante.dni         = ia.contratante_dni      || ''
    this.form.contratante.telefono    = ia.contratante_telefono || ''
  }

  cargarCatalogos(): void {
    this.http.get<any[]>(`${this.mainApi}/ataudes`).subscribe({
      next: (res) => this.zone.run(() => this.ataudes = res)
    })
    this.http.get<any[]>(`${this.mainApi}/capillas`).subscribe({
      next: (res) => this.zone.run(() => this.capillas = res)
    })
    this.http.get<any[]>(`${this.mainApi}/vehiculos`).subscribe({
      next: (res) => this.zone.run(() => this.vehiculos = res)
    })
  }

  cargarDatos(id: number): void {
    this.servicioService.obtener(id).subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.form = {
            direccion_velacion:  res.direccion_velacion,
            tipo_pago:           res.tipo_pago,
            costo:               res.costo,
            fecha:               res.fecha,
            id_capilla:          res.capilla?.id          ?? null,
            id_ataud:            res.ataud?.id            ?? null,
            cantidad_cargadores: res.cantidad_cargadores  ?? null,
            fallecido:           { nombre: res.fallecido?.nombre ?? '' },
            contratante:         {
              nombre:   res.contratante?.nombre   ?? '',
              dni:      res.contratante?.dni       ?? '',
              telefono: res.contratante?.telefono  ?? ''
            },
            ids_vehiculos: res.vehiculos_asignados
              ? res.vehiculos_asignados.map((v: any) => v.id)
              : []
          }
        })
      }
    })
  }

  toggleVehiculo(id: number): void {
    if (this.form.ids_vehiculos.includes(id)) {
      this.form.ids_vehiculos = this.form.ids_vehiculos.filter((v: number) => v !== id)
    } else {
      this.form.ids_vehiculos.push(id)
    }
  }

  estaSeleccionado(id: number): boolean {
    return this.form.ids_vehiculos.includes(id)
  }

  etiquetaVehiculo(tipo: string): string {
    const map: Record<string, string> = {
      porta_ataud:  'Porta ataúd',
      porta_flores: 'Porta flores',
      mixto:        'Mixto',
      auto:         'Auto',
      microbus:     'Microbús'
    }
    return map[tipo] ?? tipo
  }

  cancelar(): void {
    if (this.esEdicion && this.idEditar) {
      this.router.navigate(['/servicios', this.idEditar])
    } else {
      this.router.navigate(['/servicios'])
    }
  }

  guardar(): void {
    if (!this.form.direccion_velacion || !this.form.fecha || !this.form.id_capilla) {
      this.mostrarMensaje('Completa los campos requeridos: dirección, fecha y capilla', 'error')
      return
    }

    const payload: any = {
      direccion_velacion:  this.form.direccion_velacion,
      tipo_pago:           this.form.tipo_pago,
      costo:               Number(this.form.costo),
      fecha:               this.form.fecha,
      id_capilla:          Number(this.form.id_capilla),
      id_ataud:            this.form.id_ataud ? Number(this.form.id_ataud) : null,
      cantidad_cargadores: this.form.cantidad_cargadores ? Number(this.form.cantidad_cargadores) : null,
      fallecido:           { nombre: this.form.fallecido.nombre },
      contratante:         {
        nombre:   this.form.contratante.nombre,
        dni:      this.form.contratante.dni,
        telefono: this.form.contratante.telefono
      },
      ids_vehiculos: this.form.ids_vehiculos.map((v: any) => Number(v))
    }

    this.guardando = true

    if (this.esEdicion && this.idEditar) {
      this.servicioService.actualizar(this.idEditar, payload).subscribe({
        next: () => this.zone.run(() => this.router.navigate(['/servicios', this.idEditar])),
        error: (err) => this.zone.run(() => {
          this.guardando = false
          this.mostrarMensaje(err.error?.detail || 'Error al actualizar el servicio', 'error')
        })
      })
    } else {
      this.servicioService.crear(payload).subscribe({
        next: () => this.zone.run(() => this.router.navigate(['/servicios'])),
        error: (err) => this.zone.run(() => {
          this.guardando = false
          this.mostrarMensaje(err.error?.detail || 'Error al crear el servicio', 'error')
        })
      })
    }
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje = texto
    this.tipoMensaje = tipo
    setTimeout(() => { this.mensaje = '' }, 3500)
  }

}
