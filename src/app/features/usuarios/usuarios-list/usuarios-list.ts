import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { UserService, UserLeer, RoleLeer } from '../../../core/services/user';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideDynamicIcon],
  templateUrl: './usuarios-list.html',
  styleUrls: ['./usuarios-list.css'],
})
export class UsuariosList implements OnInit {
  usuarios: UserLeer[] = [];
  rolesDisponibles: RoleLeer[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';
  currentUserId: number = 0;

  filtroActivo = '';

  modalAbierto = false;
  mostrarPassword = false;
  guardando = false;
  form = { username: '', email: '', password: '', role_id: 0 };

  modalEditarAbierto = false;
  usuarioEditandoId: number | null = null;
  editando = false;
  formEditar = { username: '', email: '', role_id: 0, password: '' };

  modalToggleAbierto = false;
  itemToggle: any = null;

  modalEliminarAbierto = false;
  usuarioEliminar: UserLeer | null = null;

  constructor(
    private userService: UserService,
    private auth: Auth,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.auth.getCurrentUserId();
    this.cargar();
    this.cargarRoles();
  }

  cargar(): void {
    this.cargando = true;
    this.userService.listarConFiltro(this.filtroActivo).subscribe({
      next: (res) => {
        this.usuarios = res;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cargarRoles(): void {
    this.userService.listarRoles().subscribe({
      next: (roles) => {
        this.rolesDisponibles = roles;
        this.cdr.detectChanges();
      },
      error: () => {
        this.rolesDisponibles = [];
      },
    });
  }

  abrirModalCrear(): void {
    this.form = { username: '', email: '', password: '', role_id: 0 };
    this.mostrarPassword = false;
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  guardar(): void {
    if (!this.form.username || !this.form.email || !this.form.password || !this.form.role_id) {
      this.mostrarMensaje('Todos los campos son requeridos', 'error');
      return;
    }
    if (!this.validarEmail(this.form.email)) {
      this.mostrarMensaje('Ingresa un correo electrónico válido', 'error');
      return;
    }
    this.guardando = true;
    this.userService
      .crear({
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        role_id: Number(this.form.role_id),
      })
      .subscribe({
        next: () => {
          this.mostrarMensaje('Usuario creado', 'exito');
          this.cerrarModal();
          this.cargar();
          this.guardando = false;
        },
        error: (err) => {
          this.mostrarMensaje(this.mensajeError(err), 'error');
          this.guardando = false;
        },
      });
  }

  abrirModalEditar(u: UserLeer): void {
    this.usuarioEditandoId = u.id;
    this.formEditar = {
      username: u.username,
      email: u.email,
      role_id: u.roles.length > 0 ? u.roles[0].id : 0,
      password: '', // opcional — solo se envía si el admin escribe algo
    };
    this.modalEditarAbierto = true;
  }

  cerrarModalEditar(): void {
    this.modalEditarAbierto = false;
    this.usuarioEditandoId = null;
  }

  actualizar(): void {
    if (!this.formEditar.role_id) {
      this.mostrarMensaje('Debes seleccionar un rol', 'error');
      return;
    }
    if (!this.validarEmail(this.formEditar.email)) {
      this.mostrarMensaje('Ingresa un correo electrónico válido', 'error');
      return;
    }
    this.editando = true;

    const payload: any = {
      username: this.formEditar.username,
      email: this.formEditar.email,
      role_id: Number(this.formEditar.role_id),
    };
    if (this.formEditar.password) {
      payload.password = this.formEditar.password;
    }

    this.userService.actualizarUsuario(this.usuarioEditandoId!, payload).subscribe({
      next: () => {
        this.mostrarMensaje('Usuario actualizado', 'exito');
        this.cerrarModalEditar();
        setTimeout(() => this.cargar(), 300);
        this.editando = false;
      },
      error: (err) => {
        this.mostrarMensaje(this.mensajeError(err), 'error');
        this.editando = false;
      },
    });
  }

  abrirModalEliminar(u: UserLeer): void {
    this.usuarioEliminar = u;
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false;
    this.usuarioEliminar = null;
  }

  confirmarEliminar(): void {
    if (!this.usuarioEliminar) return;
    this.userService.eliminar(this.usuarioEliminar.id).subscribe({
      next: () => {
        this.mostrarMensaje('Usuario eliminado', 'exito');
        this.cerrarModalEliminar();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(this.mensajeError(e), 'error'),
    });
  }

  validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  mensajeError(err: any): string {
    const detalle = err?.error?.detail;
    if (!detalle) return 'Error del servidor';
    if (typeof detalle === 'string') return detalle;
    if (Array.isArray(detalle)) {
      return detalle.map((d: any) => d.msg || String(d)).join(' • ');
    }
    return String(detalle);
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.mensaje = '';
      this.cdr.detectChanges();
    }, 3500);
  }

  toggleActivo(u: UserLeer): void {
    if (u.id === this.currentUserId) return;
    const nuevoEstado = !u.activo;
    this.itemToggle = { ...u, nuevoEstado, nombre: u.username };
    this.modalToggleAbierto = true;
  }

  cerrarModalToggle(): void {
    this.modalToggleAbierto = false;
    this.itemToggle = null;
  }

  confirmarToggle(): void {
    if (!this.itemToggle) return;
    const { id, nuevoEstado } = this.itemToggle;
    const accion = nuevoEstado ? 'activar' : 'desactivar';
    this.userService.cambiarEstado(id, nuevoEstado).subscribe({
      next: () => {
        this.mostrarMensaje(`${accion === 'activar' ? 'Activado' : 'Desactivado'} correctamente`, 'exito');
        this.cerrarModalToggle();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(this.mensajeError(e), 'error'),
    });
  }

  limpiarFiltros(): void {
    this.filtroActivo = '';
    this.cargar();
  }
}
