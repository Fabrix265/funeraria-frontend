import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { UserService } from '../../../core/services/user'
import { User, Cargo } from '../../../core/models/user.model'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuarios-list.html',
  styleUrls: ['./usuarios-list.css']
})
export class UsuariosList implements OnInit {

  usuarios: User[] = []
  cargando = false
  mensaje  = ''
  tipoMensaje: 'exito' | 'error' = 'exito'

  readonly cargos: Cargo[] = ['administrador', 'trabajador']

  modalAbierto = false
  form = { username: '', password: '', cargo: '' as Cargo | '' }
  mostrarPassword = false
  guardando = false

  modalEliminarAbierto = false
  usuarioEliminar: User | null = null

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  cargar(): void {
    this.cargando = true
    this.userService.listar().subscribe({
      next: (res) => {
        this.usuarios = res
        this.cargando = false
        this.cdr.detectChanges()
      },
      error: () => {
        this.cargando = false
        this.cdr.detectChanges()
      }
    })
  }

  abrirModalCrear(): void {
    this.form = { username: '', password: '', cargo: '' }
    this.mostrarPassword = false
    this.modalAbierto = true
  }

  cerrarModal(): void { this.modalAbierto = false }

  guardar(): void {
    if (!this.form.username || !this.form.password || !this.form.cargo) {
      this.mostrarMensaje('Todos los campos son requeridos', 'error')
      return
    }
    this.guardando = true
    this.userService.crear(this.form).subscribe({
      next: () => {
        this.mostrarMensaje('Usuario creado correctamente', 'exito')
        this.cerrarModal()
        this.cargar()
        this.guardando = false
      },
      error: () => {
        this.mostrarMensaje('Error al crear el usuario', 'error')
        this.guardando = false
      }
    })
  }

  abrirModalEliminar(u: User): void {
    this.usuarioEliminar     = u
    this.modalEliminarAbierto = true
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false
    this.usuarioEliminar      = null
  }

  confirmarEliminar(): void {
    if (!this.usuarioEliminar) return
    this.userService.eliminar(this.usuarioEliminar.id).subscribe({
      next: () => {
        this.mostrarMensaje('Usuario eliminado', 'exito')
        this.cerrarModalEliminar()
        this.cargar()
      },
      error: () => this.mostrarMensaje('Error al eliminar', 'error')
    })
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje     = texto
    this.tipoMensaje = tipo
    setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges() }, 3500)
  }

}