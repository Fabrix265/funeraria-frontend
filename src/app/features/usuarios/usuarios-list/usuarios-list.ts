import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService, UserLeer, RoleLeer } from '../../../core/services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuarios-list.html',
  styleUrls: ['./usuarios-list.css'],
})
export class UsuariosList implements OnInit {
  usuarios: UserLeer[] = [];
  rolesDisponibles: RoleLeer[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  filtroActivo = 'true';

  modalAbierto = false;
  mostrarPassword = false;
  guardando = false;
  form = { username: '', password: '', role_id: 0 };

  modalEditarAbierto = false;
  usuarioEditandoId: number | null = null;
  editando = false;
  formEditar = { username: '', role_id: 0, password: '' };

  modalEliminarAbierto = false;
  usuarioEliminar: UserLeer | null = null;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
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
    this.form = { username: '', password: '', role_id: 0 };
    this.mostrarPassword = false;
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  guardar(): void {
    if (!this.form.username || !this.form.password || !this.form.role_id) {
      this.mostrarMensaje('Todos los campos son requeridos', 'error');
      return;
    }
    this.guardando = true;
    this.userService
      .crear({
        username: this.form.username,
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
          this.mostrarMensaje(err.error?.detail || 'Error al crear', 'error');
          this.guardando = false;
        },
      });
  }

  abrirModalEditar(u: UserLeer): void {
    this.usuarioEditandoId = u.id;
    this.formEditar = {
      username: u.username,
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
    this.editando = true;

    const payload: any = {
      username: this.formEditar.username,
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
        this.mostrarMensaje(err.error?.detail || 'Error al actualizar', 'error');
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
      error: () => this.mostrarMensaje('Error al eliminar', 'error'),
    });
  }

  mostrarMensaje(texto: string, tipo: 'exito' | 'error'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.cdr.detectChanges();
    }, 3500);
  }

  toggleActivo(u: UserLeer): void {
    const nuevoEstado = !u.activo;
    const accion = nuevoEstado ? 'activar' : 'desactivar';

    Swal.fire({
      title: `¿${accion.charAt(0).toUpperCase() + accion.slice(1)} usuario?`,
      text: `¿Deseas ${accion} al usuario "${u.username}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.cambiarEstado(u.id, nuevoEstado).subscribe({
          next: () => {
            this.mostrarMensaje(`Usuario ${accion}do`, 'exito');
            this.cargar();
          },
          error: () => this.mostrarMensaje(`Error al ${accion}`, 'error'),
        });
      }
    });
  }

  limpiarFiltros(): void {
    this.filtroActivo = 'true';
    this.cargar();
  }
}
