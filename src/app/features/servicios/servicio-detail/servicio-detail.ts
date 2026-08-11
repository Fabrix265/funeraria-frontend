import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicio } from '../../../core/services/servicio';
import { ToastService } from '../../../core/services/toast';
import { puedeActualizar, puedeEliminar as puedeEliminarFn } from '../../../core/utils/auth.utils';

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

  servicio: any = null;
  cargando = true;
  modalEliminarAbierto = false;

  constructor(
    private route: ActivatedRoute,
    private servicioService: Servicio,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.servicioService.obtener(Number(idParam)).subscribe({
        next: (res) => {
          this.servicio = res;
          this.cargando = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.cargando = false;
          this.cdr.detectChanges();
        },
      });
    }
  }

  abrirModalEliminar(): void { this.modalEliminarAbierto = true; }
  cerrarModalEliminar(): void { this.modalEliminarAbierto = false; }

  confirmarEliminar(): void {
    if (!this.servicio) return;
    this.servicioService.eliminar(this.servicio.id).subscribe({
      next: () => {
        this.toast.mostrar('Servicio eliminado', 'exito');
        setTimeout(() => this.router.navigate(['/servicios']), 1200);
      },
      error: (e) => {
        this.toast.mostrar(e.error?.detail || 'Error al eliminar servicio', 'error');
        this.cerrarModalEliminar();
      },
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
