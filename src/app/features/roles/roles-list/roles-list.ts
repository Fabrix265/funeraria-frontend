import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Role, RoleDetalle, PermissionLeer } from '../../../core/services/role';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './roles-list.html',
  styleUrls: ['./roles-list.css'],
})
export class RolesList implements OnInit {
  roles: RoleDetalle[] = [];
  permisosDisponibles: PermissionLeer[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  modalAbierto = false;
  guardando = false;
  form = { nombre: '', permisos_ids: [] as number[] };

  modalEliminarAbierto = false;
  rolEliminar: RoleDetalle | null = null;

  constructor(
    private roleService: Role,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.cargarPermisos();
  }

  cargar(): void {
    this.cargando = true;
    this.roleService.listar().subscribe({
      next: (res) => {
        this.roles = res;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cargarPermisos(): void {
    this.roleService.listarPermisos().subscribe({
      next: (p) => {
        this.permisosDisponibles = p;
        this.cdr.detectChanges();
      },
      error: () => {},
    });
  }

  get permisosAgrupados(): { modulo: string; permisos: PermissionLeer[] }[] {
    const grupos: { [key: string]: PermissionLeer[] } = {};
    for (const p of this.permisosDisponibles) {
      const modulo = p.nombre.split(':')[0];
      if (!grupos[modulo]) grupos[modulo] = [];
      grupos[modulo].push(p);
    }
    return Object.entries(grupos).map(([modulo, permisos]) => ({ modulo, permisos }));
  }

  togglePermiso(id: number): void {
    const idx = this.form.permisos_ids.indexOf(id);
    if (idx === -1) this.form.permisos_ids.push(id);
    else this.form.permisos_ids.splice(idx, 1);
  }

  tienePermiso(id: number): boolean {
    return this.form.permisos_ids.includes(id);
  }

  abrirModalCrear(): void {
    this.form = { nombre: '', permisos_ids: [] };
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  guardar(): void {
    if (!this.form.nombre.trim()) {
      this.mostrarMensaje('El nombre del rol es requerido', 'error');
      return;
    }
    this.guardando = true;
    this.roleService
      .crear({ nombre: this.form.nombre, permisos_ids: this.form.permisos_ids })
      .subscribe({
        next: () => {
          this.mostrarMensaje('Rol creado correctamente', 'exito');
          this.cerrarModal();
          this.cargar();
          this.guardando = false;
        },
        error: (err) => {
          this.mostrarMensaje(err.error?.detail || 'Error al crear el rol', 'error');
          this.guardando = false;
        },
      });
  }

  abrirModalEliminar(r: RoleDetalle): void {
    this.rolEliminar = r;
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false;
    this.rolEliminar = null;
  }

  confirmarEliminar(): void {
    if (!this.rolEliminar) return;
    this.roleService.eliminar(this.rolEliminar.id).subscribe({
      next: () => {
        this.mostrarMensaje('Rol eliminado', 'exito');
        this.cerrarModalEliminar();
        this.cargar();
      },
      error: (err) => this.mostrarMensaje(err.error?.detail || 'Error al eliminar', 'error'),
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
}
