import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Auth } from '../../../core/services/auth'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { LucideDynamicIcon } from '@lucide/angular'

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LucideDynamicIcon],
  templateUrl: './recuperar.html',
  styleUrls: ['../login/login.css', './recuperar.css'],
})
export class Recuperar {

  email = ''
  mensaje = ''
  error = ''
  cargando = false
  enviado = false

  constructor(private auth: Auth) {}

  enviar(): void {
    if (!this.email) return
    this.error = ''
    this.cargando = true
    this.auth.recuperar(this.email).subscribe({
      next: () => {
        this.cargando = false
        this.enviado = true
        this.mensaje = 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.'
      },
      error: (err) => {
        this.cargando = false
        this.error = err.error?.detail || 'Ocurrió un error al procesar la solicitud'
      }
    })
  }

}