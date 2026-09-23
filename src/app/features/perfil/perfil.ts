import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LucideDynamicIcon } from '@lucide/angular'
import { UserService } from '../../core/services/user'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideDynamicIcon],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {

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

  constructor(
    private userService: UserService,
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
      },
      error: (e) => {
        this.guardando = false
        this.mostrarMensaje(e.error?.detail || 'Error al actualizar el perfil', 'error')
      }
    })
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje     = texto
    this.tipoMensaje = tipo
    setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges() }, 3500)
  }

}