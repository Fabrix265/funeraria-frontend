import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { UserService } from '../../core/services/user'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {

  cargoActual    = ''
  usernameActual = ''

  username  = ''
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

  const token = localStorage.getItem('token')
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      this.usernameActual = payload.username || payload.sub || payload.name || '—'
    } catch {
      this.usernameActual = '—'
    }
  }
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