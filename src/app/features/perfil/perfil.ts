import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LucideDynamicIcon } from '@lucide/angular'
import { Router } from '@angular/router'
import { UserService } from '../../core/services/user'
import { Drive } from '../../core/services/drive'
import { formatearFechaHora } from '../../core/utils/fecha.utils'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideDynamicIcon],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit, OnDestroy {

  cargoActual    = ''
  usernameActual = ''
  emailActual    = ''

  username  = ''
  password  = ''
  confirmar = ''
  mostrarPassword  = false
  mostrarConfirmar = false

  guardando = false
  mensaje   = ''
  tipoMensaje: 'exito' | 'error' = 'exito'

  modalEmailAbierto = false
  pasoEmail: 'nuevo' | 'codigo' = 'nuevo'
  emailNuevo     = ''
  passwordActual = ''
  mostrarPasswordActual = false
  codigo         = ''
  errorEmail     = ''
  enviandoCodigo = false
  confirmando    = false

  driveCargando     = false
  driveAutorizado: boolean | null = null
  driveExpiracion   = ''
  driveMotivo: string | null = null

  constructor(
    private userService: UserService,
    private drive: Drive,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    try {
      const roles: string[] = JSON.parse(localStorage.getItem('roles') ?? '[]')
      this.cargoActual = roles.length ? roles.join(', ') : '—'
    } catch {
      this.cargoActual = '—'
    }

    this.userService.obtenerPerfil().subscribe({
      next: (u) => {
        this.usernameActual = u.username
        this.emailActual = u.email
        if (u.roles && u.roles.length) {
          this.cargoActual = u.roles.map((r) => r.nombre).join(', ')
        }
        this.cdr.detectChanges()
      },
      error: () => {
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            this.usernameActual = payload.username || payload.sub || payload.name || '—'
          } catch {
            this.usernameActual = '—'
          }
        }
        this.cdr.detectChanges()
      }
    })

    this.cargarEstadoDrive()
    window.addEventListener('focus', this.revisarAlVolver)
  }

  ngOnDestroy(): void {
    window.removeEventListener('focus', this.revisarAlVolver)
  }

  private revisarAlVolver = (): void => this.cargarEstadoDrive()

  cargarEstadoDrive(): void {
    this.drive.estado().subscribe({
      next: (s) => {
        this.driveAutorizado = s.autorizado
        this.driveMotivo     = s.motivo
        this.driveExpiracion = s.expira_en ? formatearFechaHora(s.expira_en) : ''
        this.driveCargando   = false
        this.cdr.detectChanges()
      },
      error: () => {
        this.driveAutorizado = null
        this.driveMotivo     = null
        this.driveCargando   = false
        this.cdr.detectChanges()
      }
    })
  }

  conectarDrive(): void {
    this.drive.obtenerUrlAuth().subscribe({
      next: (r) => {
        window.open(r.url, '_blank', 'noopener')
      },
      error: () => this.mostrarMensaje('No se pudo iniciar la conexión con Google Drive', 'error')
    })
  }

  togglePassword(): void  { this.mostrarPassword  = !this.mostrarPassword }
  toggleConfirmar(): void { this.mostrarConfirmar = !this.mostrarConfirmar }

  guardar(): void {
    if (!this.username && !this.password) {
      this.mostrarMensaje('Completa al menos un campo para actualizar', 'error')
      return
    }
    if (this.password && this.password !== this.confirmar) {
      this.mostrarMensaje('Las contraseñas no coinciden', 'error')
      return
    }

    const cambioPassword = !!this.password
    this.guardando = true
    const payload: any = {}
    if (this.username) payload['username'] = this.username
    if (this.password) payload['password'] = this.password

    this.userService.actualizarPerfil(payload).subscribe({
      next: () => {
        if (this.username) {
          this.usernameActual = this.username
        }
        this.username  = ''
        this.password  = ''
        this.confirmar = ''
        this.guardando = false
        this.cdr.detectChanges()
        if (cambioPassword) {
          this.cerrarSesion('Tu contraseña cambió. Por seguridad, inicia sesión nuevamente.')
          return
        }
        this.mostrarMensaje('Perfil actualizado correctamente', 'exito')
      },
      error: (e) => {
        this.guardando = false
        this.mostrarMensaje(e.error?.detail || 'Error al actualizar el perfil', 'error')
      }
    })
  }

  abrirCambioEmail(): void {
    this.pasoEmail      = 'nuevo'
    this.emailNuevo     = ''
    this.passwordActual = ''
    this.codigo         = ''
    this.errorEmail     = ''
    this.modalEmailAbierto = true
    this.cdr.detectChanges()
  }

  cerrarCambioEmail(): void {
    if (this.enviandoCodigo || this.confirmando) return
    this.modalEmailAbierto = false
    this.cdr.detectChanges()
  }

  togglePasswordActual(): void { this.mostrarPasswordActual = !this.mostrarPasswordActual }

  solicitarCodigo(): void {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailNuevo.trim())) {
      this.errorEmail = 'Ingresa un correo válido'
      return
    }
    if (!this.passwordActual) {
      this.errorEmail = 'Ingresa tu contraseña actual para confirmar la identidad'
      return
    }
    if (this.emailNuevo.trim().toLowerCase() === this.emailActual.toLowerCase()) {
      this.errorEmail = 'El nuevo correo es igual al actual'
      return
    }

    this.errorEmail     = ''
    this.enviandoCodigo = true
    this.userService.solicitarCambioEmail({
      email_nuevo: this.emailNuevo.trim(),
      password_actual: this.passwordActual
    }).subscribe({
      next: () => {
        this.enviandoCodigo   = false
        this.pasoEmail        = 'codigo'
        this.codigo           = ''
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.enviandoCodigo = false
        this.errorEmail = e.error?.detail || 'No se pudo enviar el código'
        this.cdr.detectChanges()
      }
    })
  }

  confirmarCodigo(): void {
    if (!/^\d{6}$/.test(this.codigo.trim())) {
      this.errorEmail = 'Ingresa el código de 6 dígitos'
      return
    }

    this.errorEmail    = ''
    this.confirmando   = true
    this.userService.confirmarCambioEmail({
      email_nuevo: this.emailNuevo.trim(),
      codigo: this.codigo.trim()
    }).subscribe({
      next: (u) => {
        this.confirmando      = false
        this.emailActual      = u.email
        this.modalEmailAbierto = false
        this.cdr.detectChanges()
        this.cerrarSesion('Tu correo cambió a ' + u.email + '. Inicia sesión nuevamente.')
      },
      error: (e) => {
        this.confirmando = false
        this.errorEmail = e.error?.detail || 'No se pudo confirmar el código'
        this.cdr.detectChanges()
      }
    })
  }

  reenviarCodigo(): void {
    this.pasoEmail = 'nuevo'
    this.codigo    = ''
    this.errorEmail = ''
    this.cdr.detectChanges()
  }

  private cerrarSesion(aviso: string): void {
    localStorage.clear()
    this.router.navigate(['/login'], { state: { mensaje: aviso } })
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje     = texto
    this.tipoMensaje = tipo
    this.cdr.detectChanges()
    setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges() }, 3500)
  }

}