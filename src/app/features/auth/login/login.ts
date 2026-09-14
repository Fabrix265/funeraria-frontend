import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Auth } from '../../../core/services/auth'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { LucideDynamicIcon } from '@lucide/angular'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideDynamicIcon],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username  = ''
  password  = ''
  error     = ''
  cargando  = false
  mostrarPassword = false

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login(): void {
    this.error    = ''
    this.cargando = true

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        if (err.status === 403) {
          this.error = 'La cuenta está desactivada. Contacte al administrador.'
        } else {
          this.error = err.error?.detail || 'Usuario o contraseña incorrectos'
        }
        this.cargando = false
      }
    })
  }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword
  }

}