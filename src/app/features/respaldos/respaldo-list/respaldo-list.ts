import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { LucideDynamicIcon } from '@lucide/angular'
import { RespaldoService } from '../../../core/services/respaldo'
import { ToastService } from '../../../core/services/toast'
import { tienePermiso } from '../../../core/utils/auth.utils'
import { formatearFechaHora, formatearHora } from '../../../core/utils/fecha.utils'
import {
  Respaldo,
  RespaldoConfig,
  RespaldoEstado,
  RespaldoJob,
} from '../../../core/models/respaldo.model'

@Component({
  selector: 'app-respaldo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideDynamicIcon],
  templateUrl: './respaldo-list.html',
  styleUrls: ['./respaldo-list.css'],
})
export class RespaldoList implements OnInit, OnDestroy {
  respaldos: Respaldo[] = []
  estado: RespaldoEstado | null = null
  cargando = false

  puedeCrear = tienePermiso('respaldos:crear')
  puedeRestaurar = tienePermiso('respaldos:restaurar')
  puedeEliminar = tienePermiso('respaldos:eliminar')

  modalCrearAbierto = false
  observacion = ''
  creando = false

  sincronizando = false

  modalConfigAbierto = false
  configForm: RespaldoConfig = { frecuencia_dias: 15, dias_advertencia: 3, maximo_respaldos: 15 }
  guardandoConfig = false

  modalRestaurarAbierto = false
  pasoRestaurar: 'confirmacion' | 'codigo' = 'confirmacion'
  restaurarObjetivo: Respaldo | null = null
  confirmacionTexto = ''
  restaurarArchivos = true
  entendido = false
  tokenRestauracion = ''
  codigoIngresado = ''
  expiraEn: string = ''
  errorRestaurar = ''
  preparandoCodigo = false
  lanzando = false

  modalEliminarAbierto = false
  eliminarObjetivo: Respaldo | null = null
  eliminando = false

  modalJobAbierto = false
  job: RespaldoJob | null = null
  tituloJob = ''

  private intervalo: any = null
  private consultando = false

  constructor(
    private respaldoService: RespaldoService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar()
    this.cargarEstado()
  }

  ngOnDestroy(): void {
    this.detenerSeguimiento()
  }

  // ---------------------------------------------------------------- carga

  cargar(): void {
    this.cargando = true
    this.respaldoService.listar().subscribe({
      next: (res) => {
        this.respaldos = res.items
        this.cargando = false
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.cargando = false
        this.toast.mostrar(e.error?.detail || 'No se pudieron cargar los respaldos', 'error')
        this.cdr.detectChanges()
      },
    })
  }

  cargarEstado(): void {
    this.respaldoService.estado().subscribe({
      next: (res) => {
        this.estado = res
        if (res.config) this.configForm = { ...res.config }
        if (res.job_en_ejecucion && !this.intervalo) {
          this.tituloJob = res.job_en_ejecucion.tipo === 'restauracion' ? 'Restauración' : 'Respaldo'
          this.job = res.job_en_ejecucion
          this.modalJobAbierto = true
          this.seguirJob(res.job_en_ejecucion.job_id, this.tituloJob)
        }
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.toast.mostrar(e.error?.detail || 'No se pudo leer el estado de los respaldos', 'error')
        this.cdr.detectChanges()
      },
    })
  }

  resincronizar(): void {
    if (this.sincronizando) return
    this.sincronizando = true
    this.cdr.detectChanges()

    this.respaldoService.resincronizar().subscribe({
      next: (res) => {
        this.sincronizando = false
        this.toast.mostrar(
          `Sincronizados con Drive: ${res.creados} nuevo(s), ${res.actualizados} actualizado(s), ${res.eliminados} retirado(s)`,
          'exito'
        )
        if (res.manifiestos_ilegibles > 0) {
          setTimeout(
            () =>
              this.toast.mostrar(
                `${res.manifiestos_ilegibles} manifiesto(s) de Drive no se pudieron leer`,
                'error'
              ),
            3600
          )
        }
        this.cargar()
        this.cargarEstado()
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.sincronizando = false
        this.toast.mostrar(e.error?.detail || 'No se pudo sincronizar con Drive', 'error')
        this.cdr.detectChanges()
      },
    })
  }

  // --------------------------------------------------------------- crear

  abrirCrear(): void {
    if (this.estado?.job_en_ejecucion) {
      this.toast.mostrar('Ya hay un respaldo o una restauración en curso', 'error')
      return
    }
    // El máximo no bloquea: al crear, el backend retira solo el más antiguo
    // (_podar_por_maximo), así que el límite se respeta sin trabar el sistema.
    this.observacion = ''
    this.modalCrearAbierto = true
    this.cdr.detectChanges()
  }

  cerrarCrear(): void {
    if (this.creando) return
    this.modalCrearAbierto = false
    this.cdr.detectChanges()
  }

  generar(): void {
    this.creando = true
    this.respaldoService.crear(this.observacion.trim() || null).subscribe({
      next: (job) => {
        this.creando = false
        this.modalCrearAbierto = false
        this.seguirJob(job.job_id, 'Generando respaldo')
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.creando = false
        this.toast.mostrar(e.error?.detail || 'No se pudo iniciar el respaldo', 'error')
        this.cdr.detectChanges()
      },
    })
  }

  // ------------------------------------------------------------- trabajo

  seguirJob(jobId: string, titulo: string): void {
    this.tituloJob = titulo
    this.modalJobAbierto = true
    if (this.intervalo) return

    this.intervalo = setInterval(() => {
      if (this.consultando) return
      this.consultando = true
      this.respaldoService.obtenerJob(jobId).subscribe({
        next: (job) => {
          this.consultando = false
          this.job = job
          if (job.estado !== 'en_proceso') {
            this.detenerSeguimiento()
            this.cargar()
            this.cargarEstado()
            if (job.estado === 'completado') {
              this.toast.mostrar(this.mensajeExito(job), 'exito')
            } else {
              this.toast.mostrar(job.mensaje || `La ${titulo.toLowerCase()} falló`, 'error')
            }
          }
          this.cdr.detectChanges()
        },
        error: (e) => {
          this.consultando = false
          this.detenerSeguimiento()
          this.toast.mostrar(e.error?.detail || 'Se perdió el seguimiento del trabajo', 'error')
          this.cdr.detectChanges()
        },
      })
    }, 1200)
  }

  private mensajeExito(job: RespaldoJob): string {
    if (job.tipo === 'restauracion') return 'Base de datos restaurada correctamente'
    if (job.tipo === 'recuperacion') return 'Documentos recuperados correctamente'
    return 'Respaldo generado correctamente'
  }

  private detenerSeguimiento(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo)
      this.intervalo = null
    }
    this.consultando = false
  }

  get jobEnCurso(): boolean {
    return this.job?.estado === 'en_proceso'
  }

  get progresoPaso(): number {
    if (!this.job || this.job.pasos.length === 0) return 0
    const hechos = this.job.pasos.filter(
      (p) => p.estado === 'completado' || p.estado === 'fallido'
    ).length
    return Math.round((hechos / this.job.pasos.length) * 100)
  }

  cerrarJob(): void {
    if (this.jobEnCurso) return
    this.modalJobAbierto = false
    this.job = null
    this.cdr.detectChanges()
  }

  // ------------------------------------------------------- configuracion

  abrirConfig(): void {
    if (this.estado?.config) this.configForm = { ...this.estado.config }
    this.modalConfigAbierto = true
    this.cdr.detectChanges()
  }

  cerrarConfig(): void {
    if (this.guardandoConfig) return
    this.modalConfigAbierto = false
    this.cdr.detectChanges()
  }

  guardarConfig(): void {
    this.guardandoConfig = true
    this.respaldoService.actualizarConfig(this.configForm).subscribe({
      next: (config) => {
        this.guardandoConfig = false
        this.modalConfigAbierto = false
        if (this.estado) this.estado.config = config
        this.toast.mostrar('Política de respaldos actualizada', 'exito')
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.guardandoConfig = false
        this.toast.mostrar(e.error?.detail || 'No se pudo guardar la configuración', 'error')
        this.cdr.detectChanges()
      },
    })
  }

  // ---------------------------------------------------------- restaurar

  abrirRestaurar(respaldo: Respaldo): void {
    this.restaurarObjetivo = respaldo
    this.pasoRestaurar = 'confirmacion'
    this.confirmacionTexto = ''
    this.restaurarArchivos = true
    this.entendido = false
    this.tokenRestauracion = ''
    this.codigoIngresado = ''
    this.expiraEn = ''
    this.errorRestaurar = ''
    this.modalRestaurarAbierto = true
    this.cdr.detectChanges()
  }

  cerrarRestaurar(): void {
    if (this.preparandoCodigo || this.lanzando) return
    this.modalRestaurarAbierto = false
    this.restaurarObjetivo = null
    this.tokenRestauracion = ''
    this.codigoIngresado = ''
    this.cdr.detectChanges()
  }

  get confirmacionCorrecta(): boolean {
    return !!this.restaurarObjetivo && this.confirmacionTexto.trim() === String(this.restaurarObjetivo.id)
  }

  solicitarCodigo(): void {
    const objetivo = this.restaurarObjetivo
    if (!objetivo) return

    if (!this.confirmacionTexto.trim()) {
      this.errorRestaurar = `Escribe el número ${objetivo.id} para confirmar.`
      this.cdr.detectChanges()
      return
    }
    if (!this.confirmacionCorrecta) {
      this.errorRestaurar = `La confirmación no coincide: debe ser ${objetivo.id}.`
      this.cdr.detectChanges()
      return
    }
    if (!this.entendido) {
      this.errorRestaurar =
        'Debes marcar la casilla "Entiendo que los cambios hechos despues de esa fecha se perderan".'
      this.cdr.detectChanges()
      return
    }

    this.preparandoCodigo = true
    this.errorRestaurar = ''
    this.respaldoService.solicitarCodigo(objetivo.id).subscribe({
      next: (res) => {
        this.preparandoCodigo = false
        this.tokenRestauracion = res.token
        this.expiraEn = res.expira_en
        this.codigoIngresado = ''
        this.pasoRestaurar = 'codigo'
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.preparandoCodigo = false
        this.errorRestaurar =
          e.error?.detail || 'No se pudo generar el código. Intenta de nuevo en unos minutos.'
        this.cdr.detectChanges()
      },
    })
  }

  volverAPasoUno(): void {
    if (this.preparandoCodigo || this.lanzando) return
    this.pasoRestaurar = 'confirmacion'
    this.tokenRestauracion = ''
    this.codigoIngresado = ''
    this.errorRestaurar = ''
    this.cdr.detectChanges()
  }

  get codigoListo(): boolean {
    return this.codigoIngresado.trim().length >= 10
  }

  copiarCodigo(): void {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(this.tokenRestauracion).then(
      () => this.toast.mostrar('Código copiado al portapapeles', 'exito'),
      () => this.toast.mostrar('No se pudo copiar el código', 'error')
    )
  }

  confirmarRestauracion(): void {
    const objetivo = this.restaurarObjetivo
    if (!objetivo) return

    const codigo = this.codigoIngresado.trim()
    if (!codigo) {
      this.errorRestaurar = 'Pega o escribe el codigo de confirmacion para continuar.'
      this.cdr.detectChanges()
      return
    }
    if (codigo.length < 10) {
      this.errorRestaurar = 'El codigo no es valido: debe tener al menos 10 caracteres.'
      this.cdr.detectChanges()
      return
    }

    this.lanzando = true
    this.errorRestaurar = ''
    this.respaldoService
      .restaurar(objetivo.id, {
        confirmacion: this.confirmacionTexto.trim(),
        token: codigo,
        restaurar_archivos: this.restaurarArchivos,
      })
      .subscribe({
        next: (job) => {
          this.lanzando = false
          this.modalRestaurarAbierto = false
          this.restaurarObjetivo = null
          this.tokenRestauracion = ''
          this.seguirJob(job.job_id, 'Restauración')
          this.cdr.detectChanges()
        },
        error: (e) => {
          this.lanzando = false
          this.errorRestaurar = e.error?.detail || 'No se pudo iniciar la restauración'
          this.cdr.detectChanges()
        },
      })
  }

  // ------------------------------------------------------- recuperacion

  recuperarArchivos(respaldo: Respaldo): void {
    this.respaldoService.recuperarArchivos(respaldo.id).subscribe({
      next: (job) => {
        this.seguirJob(job.job_id, 'Recuperación de documentos')
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.toast.mostrar(e.error?.detail || 'No se pudo iniciar la recuperación', 'error')
        this.cdr.detectChanges()
      },
    })
  }

  // ----------------------------------------------------------- eliminar

  abrirEliminar(respaldo: Respaldo): void {
    this.eliminarObjetivo = respaldo
    this.modalEliminarAbierto = true
    this.cdr.detectChanges()
  }

  cerrarEliminar(): void {
    if (this.eliminando) return
    this.modalEliminarAbierto = false
    this.eliminarObjetivo = null
    this.cdr.detectChanges()
  }

  eliminar(): void {
    if (!this.eliminarObjetivo) return
    this.eliminando = true
    const id = this.eliminarObjetivo.id
    this.respaldoService.eliminar(id).subscribe({
      next: () => {
        this.eliminando = false
        this.modalEliminarAbierto = false
        this.eliminarObjetivo = null
        this.toast.mostrar(`Respaldo #${id} eliminado`, 'exito')
        this.cargar()
        this.cargarEstado()
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.eliminando = false
        this.toast.mostrar(e.error?.detail || 'No se pudo eliminar el respaldo', 'error')
        this.cdr.detectChanges()
      },
    })
  }

  // ---------------------------------------------------------- descarga

  descargar(respaldo: Respaldo): void {
    this.respaldoService.descargar(respaldo.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = respaldo.nombre_archivo
        a.click()
        window.URL.revokeObjectURL(url)
        this.toast.mostrar(`Descargando ${respaldo.nombre_archivo}`, 'exito')
      },
      error: (e) => {
        this.toast.mostrar(e.error?.detail || 'No se pudo descargar el respaldo', 'error')
        this.cdr.detectChanges()
      },
    })
  }

  // ------------------------------------------------------------- varios

  get respaldosCompletados(): Respaldo[] {
    return this.respaldos
      .filter((r) => r.estado === 'completado')
      .sort((a, b) => a.fecha.localeCompare(b.fecha))
  }

  esBorrable(respaldo: Respaldo): boolean {
    const completados = this.respaldosCompletados
    return completados.length > 2 && completados[0].id === respaldo.id
  }

  formatearTamano(bytes: number): string {
    if (!bytes) return '0 B'
    const unidades = ['B', 'KB', 'MB', 'GB']
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), unidades.length - 1)
    const valor = bytes / Math.pow(1024, i)
    return `${valor.toFixed(valor >= 100 || i === 0 ? 0 : 1)} ${unidades[i]}`
  }

  formatDate(dateStr: string | null | undefined): string {
    return formatearFechaHora(dateStr)
  }

  formatHora(dateStr: string | null | undefined): string {
    return formatearHora(dateStr)
  }

  get vigenciaLabel(): string {
    const labels: Record<string, string> = {
      nunca: 'Sin respaldos',
      al_dia: 'Al día',
      proximo: 'Próximo a vencer',
      vencido: 'Vencido',
    }
    return labels[this.estado?.vigencia || 'nunca'] || 'Sin datos'
  }

  get vigenciaClase(): string {
    const clases: Record<string, string> = {
      nunca: 'vigencia--nunca',
      al_dia: 'vigencia--ok',
      proximo: 'vigencia--warn',
      vencido: 'vigencia--danger',
    }
    return clases[this.estado?.vigencia || 'nunca'] || 'vigencia--nunca'
  }

  get diasDesdeUltimo(): string {
    const dias = this.estado?.dias_desde_ultimo
    if (dias === null || dias === undefined) return 'Aún no hay respaldos'
    if (dias === 0) return 'Hoy'
    if (dias === 1) return 'Hace 1 día'
    return `Hace ${dias} días`
  }

  estadoLabel(r: Respaldo): string {
    const labels: Record<string, string> = {
      completado: 'Completado',
      en_proceso: 'En proceso',
      fallido: 'Fallido',
    }
    return labels[r.estado] || r.estado
  }

  estadoClase(r: Respaldo): string {
    const clases: Record<string, string> = {
      completado: 'estado--ok',
      en_proceso: 'estado--run',
      fallido: 'estado--fail',
    }
    return clases[r.estado] || ''
  }
}
