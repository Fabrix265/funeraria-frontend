import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { ServicioApi } from '../../services/servicio'

@Component({
  selector: 'app-servicio-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio-edit.html',
  styleUrl: './servicio-edit.css'
})
export class ServicioEdit implements OnInit {

  id!: number

  form: any = {
    direccion_velacion: '',
    tipo_pago: 'directo',
    costo: 0,
    fecha: '',
    arreglo_flora: false,
    director_sepelio: false,
    cantidad_cargadores: 0
  }

  loading = true

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioApi: ServicioApi
  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'))

    this.servicioApi
      .getServicio(this.id)
      .subscribe({

        next: (res: any) => {

          this.form = {

            direccion_velacion: res.direccion_velacion,
            tipo_pago: res.tipo_pago,
            costo: res.costo,
            fecha: res.fecha,
            arreglo_flora: res.arreglo_flora,
            director_sepelio: res.director_sepelio,
            cantidad_cargadores: res.cantidad_cargadores

          }

          this.loading = false

        },

        error: err => {

          console.error(err)
          this.loading = false

        }

      })

  }

  actualizar() {

    this.servicioApi
      .actualizarServicio(this.id, this.form)
      .subscribe({

        next: () => {

          alert('Servicio actualizado')

          this.router.navigate(['/servicios'])

        },

        error: err => console.error(err)

      })

  }

}