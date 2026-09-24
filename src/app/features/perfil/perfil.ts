import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LucideDynamicIcon } from '@lucide/angular'
import { UserService } from '../../core/services/user'
import { Drive } from '../../core/services/drive'
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
  email     = ''
  password  = ''
  confirmar = ''
  mostrarPassword  = false
  mostrarConfirmar = false

  guardando = false
  mensaje   = ''
  tipoMensaje: 'exito' | 'error' = 'exito'

  driveCargando     = false
  driveAutorizado: boolean | null = null
  driveExpiracion   = ''
  driveMotivo: string | null = null

  constructor(
    private userService: UserService,
    private drive: Drive,
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
        this.driveExpiracion = s.expira_en ? new Date(s.expira_en).toLocaleString() : ''
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
    if (!this.username && !this.email && !this.password) {
      this.mostrarMensaje('Completa al menos un campo para actualizar', 'error')
      return
    }
    if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.mostrarMensaje('Ingresa un correo válido', 'error')
      return
    }
    if (this.password && this.password !== this.confirmar) {
      this.mostrarMensaje('Las contraseñas no coinciden', 'error')
      return
    }

    this.guardando = true
    const payload: any = {}
    if (this.username) payload['username'] = this.username
    if (this.email)    payload['email']    = this.email
    if (this.password) payload['password'] = this.password

    this.userService.actualizarPerfil(payload).subscribe({
      next: () => {
        if (this.username) {
          this.usernameActual = this.username
        }
        if (this.email) {
          this.emailActual = this.email
        }
        this.username  = ''
        this.email     = ''
        this.password  = ''
        this.confirmar = ''
        this.guardando = false
        this.mostrarMensaje('Perfil actualizado correctamente', 'exito')
        this.cdr.detectChanges()
      },
      error: (e) => {
        this.guardando = false
        this.mostrarMensaje(e.error?.detail || 'Error al actualizar el perfil', 'error')
        this.cdr.detectChanges()
      }
    })
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje     = texto
    this.tipoMensaje = tipo
    this.cdr.detectChanges()
    setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges() }, 3500)
  }

}