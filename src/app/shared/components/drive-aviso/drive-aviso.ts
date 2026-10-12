import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LucideDynamicIcon } from '@lucide/angular'
import { Drive } from '../../../core/services/drive'
import { tienePermiso } from '../../../core/utils/auth.utils'

@Component({
  selector: 'app-drive-aviso',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './drive-aviso.html',
  styleUrls: ['./drive-aviso.css'],
})
export class DriveAviso implements OnInit, OnDestroy {

  puedeSubir = tienePermiso('archivos:subir')
  autorizado: boolean | null = null
  motivo: string | null = null
  toast = ''
  toastTipo: 'exito' | 'error' = 'exito'

  constructor(
    private drive: Drive,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search)
    const estadoDrive = params.get('drive')
    if (estadoDrive === 'ok') {
      this.toast = 'Google Drive conectado correctamente'
    } else if (estadoDrive === 'error') {
      this.toast = 'No se pudo conectar Google Drive. Intenta nuevamente.'
      this.toastTipo = 'error'
    }
    if (this.toast) {
      setTimeout(() => { this.toast = ''; this.cdr.detectChanges() }, 4000)
    }

    this.cargarEstado()
    window.addEventListener('focus', this.revisarAlVolver)
  }

  ngOnDestroy(): void {
    window.removeEventListener('focus', this.revisarAlVolver)
  }

  private revisarAlVolver = (): void => this.cargarEstado()

  cargarEstado(): void {
    if (!this.puedeSubir) return
    this.drive.estado().subscribe({
      next: (s) => {
        this.autorizado = s.autorizado
        this.motivo = s.motivo
        this.cdr.detectChanges()
      },
      error: () => {
        this.autorizado = null
        this.cdr.detectChanges()
      }
    })
  }

  conectar(): void {
    this.drive.obtenerUrlAuth().subscribe({
      next: (r) => {
        window.open(r.url, '_blank', 'noopener')
      },
      error: () => {
        this.toast = 'No se pudo iniciar la conexión con Google Drive'
        this.toastTipo = 'error'
        this.cdr.detectChanges()
      }
    })
  }

}