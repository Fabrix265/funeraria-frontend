import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, RouterLink, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Servicio } from '../../../core/services/servicio'

@Component({
  selector: 'app-servicio-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servicio-detail.html',
  styleUrls: ['./servicio-detail.css']
})
export class ServicioDetail implements OnInit {

  esAdmin = localStorage.getItem('cargo') === 'administrador'

  servicio: any = null
  cargando = true
  modalEliminarAbierto = false

  constructor(
    private route: ActivatedRoute,
    private servicioService: Servicio,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id')
    if (idParam) {
      this.servicioService.obtener(Number(idParam)).subscribe({
        next: (res) => {
          this.servicio = res
          this.cargando = false
          this.cdr.detectChanges()
        },
        error: () => { this.cargando = false; this.cdr.detectChanges() }
      })
    }
  }

  abrirModalEliminar(): void { this.modalEliminarAbierto = true }
  cerrarModalEliminar(): void { this.modalEliminarAbierto = false }

  confirmarEliminar(): void {
    if (!this.servicio) return
    this.servicioService.eliminar(this.servicio.id).subscribe({
      next: () => this.router.navigate(['/servicios']),
      error: () => this.cerrarModalEliminar()
    })
  }

  etiquetaVehiculo(tipo: string): string {
    const map: Record<string, string> = {
      porta_ataud: 'Porta ataúd', porta_flores: 'Porta flores',
      mixto: 'Mixto', auto: 'Auto', microbus: 'Microbús'
    }
    return map[tipo] ?? tipo
  }
}