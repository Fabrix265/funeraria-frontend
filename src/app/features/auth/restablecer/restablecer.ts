import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Auth } from '../../../core/services/auth'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { LucideDynamicIcon } from '@lucide/angular'

@Component({
  selector: 'app-restablecer',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LucideDynamicIcon],
  templateUrl: './restablecer.html',
  styleUrls: ['../login/login.css', './restablecer.css'],
})
export class Restablecer implements OnInit {

  token = ''
  password = ''
  confirmar = ''
  mostrarPassword = false
  mostrarConfirmar = false
  error = ''
  exito = false
  cargando = false

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || ''
    if (!this.token) {
      this.error = 'El enlace es inválido o está incompleto'
    }
  }

  guardar(): void {
    if (!this.token) return
    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener mínimo 6 caracteres'
      return
    }
    if (this.password !== this.confirmar) {
      this.error = 'Las contraseñas no coinciden'
      return
    }
    this.error = ''
    this.cargando = true
    this.auth.restablecer(this.token, this.password).subscribe({
      next: () => {
        this.cargando = false
        this.exito = true
      },
      error: (err) => {
        this.cargando = false
        this.error = err.error?.detail || 'El enlace no es válido o ha expirado'
      }
    })
  }

  togglePassword(): void { this.mostrarPassword = !this.mostrarPassword }
  toggleConfirmar(): void { this.mostrarConfirmar = !this.mostrarConfirmar }

}