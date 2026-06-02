import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicio } from '../../../core/services/servicio';
import { PasajeroService } from '../../../core/services/pasajero';
import { puedeActualizar, puedeEliminar as puedeEliminarFn, puedeCrear } from '../../../core/utils/auth.utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './servicio-detail.html',
  styleUrls: ['./servicio-detail.css'],
})
export class ServicioDetail implements OnInit {
  puedeEditar = puedeActualizar('servicios');
  puedeEliminar = puedeEliminarFn('servicios');
  puedeCrearPasajeros = puedeCrear('pasajeros');
  puedeActualizarPasajeros = puedeActualizar('pasajeros');
  puedeEliminarPasajeros = puedeEliminarFn('pasajeros');

  servicio: any = null;
  cargando = true;
  modalEliminarAbierto = false;

  pasajeros: any[] = [];
  cargandoPasajeros = false;

  modalPasajeroAbierto = false;
  modoEdicionPasajero = false;
  pasajeroSeleccionado: any = null;
  formPasajero = { nombre: '', dni_pasajero: '' };

  constructor(
    private route: ActivatedRoute,
    private servicioService: Servicio,
    private pasajeroService: PasajeroService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.servicioService.obtener(Number(idParam)).subscribe({
        next: (res) => {
          this.servicio = res;
          this.cargando = false;
          this.cargarPasajeros();
          this.cdr.detectChanges();
        },
        error: () => {
          this.cargando = false;
          this.cdr.detectChanges();
        },
      });
    }
  }

  cargarPasajeros(): void {
    if (!this.servicio) return;
    this.cargandoPasajeros = true;
    this.pasajeroService.listar(this.servicio.id).subscribe({
      next: (data) => {
        this.pasajeros = data;
        this.cargandoPasajeros = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.pasajeros = [];
        this.cargandoPasajeros = false;
        this.cdr.detectChanges();
      },
    });
  }

  abrirModalCrearPasajero(): void {
    this.modoEdicionPasajero = false;
    this.pasajeroSeleccionado = null;
    this.formPasajero = { nombre: '', dni_pasajero: '' };
    this.modalPasajeroAbierto = true;
  }

  abrirModalEditarPasajero(p: any): void {
    this.modoEdicionPasajero = true;
    this.pasajeroSeleccionado = p;
    this.formPasajero = { nombre: p.nombre, dni_pasajero: p.dni_pasajero };
    this.modalPasajeroAbierto = true;
  }

  cerrarModalPasajero(): void {
    this.modalPasajeroAbierto = false;
  }

  guardarPasajero(): void {
    if (!this.formPasajero.nombre || !this.formPasajero.dni_pasajero) {
      return;
    }

    if (this.modoEdicionPasajero && this.pasajeroSeleccionado) {
      this.pasajeroService.actualizar(this.pasajeroSeleccionado.id, this.formPasajero).subscribe({
        next: () => {
          this.cargarPasajeros();
          this.cerrarModalPasajero();
        },
        error: () => {},
      });
    } else {
      this.pasajeroService.crear(this.servicio.id, this.formPasajero).subscribe({
        next: () => {
          this.cargarPasajeros();
          this.cerrarModalPasajero();
        },
        error: () => {},
      });
    }
  }

  eliminarPasajero(p: any): void {
    Swal.fire({
      title: '¿Eliminar pasajero?',
      text: `¿Deseas eliminar a "${p.nombre}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pasajeroService.eliminar(p.id).subscribe({
          next: () => this.cargarPasajeros(),
          error: () => {},
        });
      }
    });
  }

  abrirModalEliminar(): void {
    this.modalEliminarAbierto = true;
  }
  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false;
  }

  confirmarEliminar(): void {
    if (!this.servicio) return;
    this.servicioService.eliminar(this.servicio.id).subscribe({
      next: () => this.router.navigate(['/servicios']),
      error: () => this.cerrarModalEliminar(),
    });
  }

  etiquetaVehiculo(tipo: string): string {
    const map: Record<string, string> = {
      porta_ataud: 'Porta ataúd',
      porta_flores: 'Porta flores',
      mixto: 'Mixto',
      auto: 'Auto',
      microbus: 'Microbús',
    };
    return map[tipo] ?? tipo;
  }
}
