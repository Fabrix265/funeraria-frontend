import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'

import { ServicioApi } from '../../services/servicio'
import { Servicio } from '../../../../core/models/servicio.model'

@Component({
  selector: 'app-servicio-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicio-detalle.html',
  styleUrl: './servicio-detalle.css'
})
export class ServicioDetalle implements OnInit {

  servicio?: Servicio

  loading = true

  constructor(
    private route: ActivatedRoute,
    private servicioApi: ServicioApi
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.servicioApi
      .getServicio(id)
      .subscribe({

        next: res => {

          this.servicio = res
          this.loading = false

        },

        error: err => {

          console.error(err)
          this.loading = false

        }

      })

  }

}