import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { PersonaService } from '../../../core/services/persona'
import { Contratante } from '../../../core/models/contratante.model'
import { RouterLink } from '@angular/router';
import { puedeActualizar as checkActualizar, puedeEliminar as checkEliminar } from '../../../core/utils/auth.utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contratantes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contratantes.html',
  styleUrls: ['./contratantes.css'],
})
export class Contratantes implements OnInit {
  puedeEditar = checkActualizar('contratantes');
  puedeEliminar = checkEliminar('contratantes');

  contratantes: Contratante[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  nombreQuery = '';
  dniQuery = '';
  nombresUnicos: string[] = [];
  nombresFiltrados: string[] = [];
  mostrarDropNombre = false;

  filtroActivo = 'true';

  modalAbierto = false;
  contratanteSeleccionado: Contratante | null = null;
  form = { nombre: '', dni: '', telefono: '' };

  modalEliminarAbierto = false;
  contratanteEliminar: Contratante | null = null;

  constructor(
    private personaService: PersonaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.personaService
      .listarContratantes(this.nombreQuery || undefined, this.dniQuery || undefined, this.filtroActivo)
      .subscribe({
        next: (data) => {
          this.contratantes = data;
          this.nombresUnicos = [...new Set(data.map((c) => c.nombre))].sort();
          this.cargando = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.cargando = false;
          this.cdr.detectChanges();
        },
      });
  }

  onNombreInput(): void {
    this.nombresFiltrados = this.nombresUnicos.filter((n) =>
      n.toLowerCase().includes(this.nombreQuery.toLowerCase()),
    );
    this.mostrarDropNombre = true;
  }

  abrirDropNombre(): void {
    this.nombresFiltrados = [...this.nombresUnicos];
    this.mostrarDropNombre = true;
  }

  seleccionarNombre(n: string): void {
    this.nombreQuery = n;
    this.mostrarDropNombre = false;
  }

  cerrarDropNombre(): void {
    setTimeout(() => {
      this.mostrarDropNombre = false;
    }, 150);
  }

  aplicarFiltros(): void {
    this.cargar();
  }

  limpiarFiltros(): void {
    this.nombreQuery = '';
    this.dniQuery = '';
    this.filtroActivo = 'true';
    this.cargar();
  }

  abrirModalEditar(c: Contratante): void {
    this.contratanteSeleccionado = c;
    this.form = { nombre: c.nombre, dni: c.dni, telefono: c.telefono };
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  guardar(): void {
    if (!this.contratanteSeleccionado) return;
    if (!this.form.nombre || !this.form.dni) {
      this.mostrarMensaje('Nombre y DNI son requeridos', 'error');
      return;
    }
    this.personaService
      .actualizarContratante(this.contratanteSeleccionado.id, this.form)
      .subscribe({
        next: () => {
          this.mostrarMensaje('Contratante actualizado', 'exito');
          this.cerrarModal();
          this.cargar();
        },
        error: () => this.mostrarMensaje('Error al actualizar', 'error'),
      });
  }

  toggleActivo(c: Contratante): void {
    const nuevoEstado = !c.activo;
    const accion = nuevoEstado ? 'activar' : 'desactivar';

    Swal.fire({
      title: `¿${accion.charAt(0).toUpperCase() + accion.slice(1)} registro?`,
      text: `¿Deseas ${accion} a "${c.nombre}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.cambiarEstadoContratante(c.id, nuevoEstado).subscribe({
          next: () => {
            this.mostrarMensaje(`Contratante ${accion}do`, 'exito');
            this.cargar();
          },
          error: () => this.mostrarMensaje(`Error al ${accion}`, 'error'),
        });
      }
    });
  }

  abrirModalEliminar(c: Contratante): void {
    this.contratanteEliminar = c;
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false;
    this.contratanteEliminar = null;
  }

  confirmarEliminar(): void {
    if (!this.contratanteEliminar) return;
    this.personaService.eliminarContratante(this.contratanteEliminar.id).subscribe({
      next: () => {
        this.mostrarMensaje('Contratante eliminado', 'exito');
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
}
