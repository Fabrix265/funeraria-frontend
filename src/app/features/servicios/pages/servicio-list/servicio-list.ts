import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterLink } from '@angular/router'

import { ServicioApi } from '../../services/servicio'
import { Servicio } from '../../../../core/models/servicio.model'

@Component({
  selector: 'app-servicio-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servicio-list.html',
  styleUrl: './servicio-list.css'
})
export class ServicioList implements OnInit {

  servicios: Servicio[] = []

  loading = true

  total = 0
  offset = 0
  limit = 10

  constructor(
    private servicioApi: ServicioApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarServicios()
  }

  cargarServicios() {

    this.loading = true

    this.servicioApi
      .getServicios(this.offset, this.limit)
      .subscribe({

        next: res => {

          this.servicios = res.data
          this.total = res.total

          this.loading = false

        },

        error: err => {

          console.error(err)
          this.loading = false

        }

      })

  }

  siguiente() {

    this.offset += this.limit

    this.cargarServicios()

  }

  anterior() {

    this.offset -= this.limit

    if (this.offset < 0) this.offset = 0

    this.cargarServicios()

  }

  verDetalle(id: number) {

    this.router.navigate(['/servicios', id])

  }

  editar(id: number) {

    this.router.navigate(['/servicios/editar', id])

  }

  eliminar(id: number) {

    const confirmar = confirm('¿Seguro que deseas eliminar el servicio?')

    if (!confirmar) return

    this.servicioApi
      .eliminarServicio(id)
      .subscribe({

        next: () => {

          alert('Servicio eliminado')

          this.cargarServicios()

        },

        error: err => console.error(err)

      })

  }

}