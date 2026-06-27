import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { PersonaService } from '../../../core/services/persona'
import { RouterLink } from '@angular/router';
import { puedeActualizar as Update, puedeEliminar as Delete } from '../../../core/utils/auth.utils';

@Component({
  selector: 'app-fallecidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './fallecidos.html',
  styleUrls: ['./fallecidos.css'],
})
export class Fallecidos implements OnInit {
  puedeEditar = Update('fallecidos')
  puedeEliminar = Delete('fallecidos')

  fallecidos: any[] = [];
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
  fallecidoSeleccionado: any = null;
  form = { nombre: '', dni_fallecido: '' };

  modalToggleAbierto = false;
  itemToggle: any = null;

  modalEliminarAbierto = false;
  fallecidoEliminar: any = null;

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
      .listarFallecidos(this.nombreQuery || undefined, this.dniQuery || undefined, this.filtroActivo)
      .subscribe({
        next: (data) => {
          this.fallecidos = data;
          this.nombresUnicos = [...new Set(data.map((f: any) => f.nombre))].sort();
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

  abrirModalEditar(f: any): void {
    this.fallecidoSeleccionado = f;
    this.form = { nombre: f.nombre, dni_fallecido: f.dni_fallecido };
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  guardar(): void {
    if (!this.fallecidoSeleccionado) return;
    if (!this.form.nombre || !this.form.dni_fallecido) {
      this.mostrarMensaje('Nombre y DNI son requeridos', 'error');
      return;
    }
    this.personaService.actualizarFallecido(this.fallecidoSeleccionado.id, this.form).subscribe({
      next: () => {
        this.mostrarMensaje('Fallecido actualizado', 'exito');
        this.cerrarModal();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al actualizar', 'error'),
    });
  }

  toggleActivo(f: any): void {
    const nuevoEstado = !f.activo;
    this.itemToggle = { ...f, nuevoEstado, nombre: f.nombre };
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
    this.personaService.cambiarEstadoFallecido(id, nuevoEstado).subscribe({
      next: () => {
        this.mostrarMensaje(`${accion === 'activar' ? 'Activado' : 'Desactivado'} correctamente`, 'exito');
        this.cerrarModalToggle();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || `Error al ${accion}`, 'error'),
    });
  }

  abrirModalEliminar(f: any): void {
    this.fallecidoEliminar = f;
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false;
    this.fallecidoEliminar = null;
  }

  confirmarEliminar(): void {
    if (!this.fallecidoEliminar) return;
    this.personaService.eliminarFallecido(this.fallecidoEliminar.id).subscribe({
      next: () => {
        this.mostrarMensaje('Fallecido eliminado', 'exito');
        this.cerrarModalEliminar();
        this.cargar();
      },
      error: (e) => this.mostrarMensaje(e.error?.detail || 'Error al eliminar', 'error'),
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
