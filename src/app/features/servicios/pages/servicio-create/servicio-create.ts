import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ServicioApi } from '../../services/servicio'
import { CatalogoApi } from '../../../catalogos/services/catalogo'

import { Contratante } from '../../../../core/models/contratante.model'
import { Fallecido } from '../../../../core/models/fallecido.model'
import { Capilla } from '../../../../core/models/capilla.model'
import { Ataud } from '../../../../core/models/ataud.model'
import { Vehiculo } from '../../../../core/models/vehiculo.model'

@Component({
  selector: 'app-servicio-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio-create.html',
  styleUrl: './servicio-create.css'
})
export class ServicioCreate implements OnInit {

  form: any = {

    direccion_velacion: '',
    tipo_pago: 'directo',
    costo: 0,
    fecha: '',
    arreglo_flora: false,
    director_sepelio: false,
    cantidad_cargadores: 0,

    id_contratante: null,
    id_fallecido: null,
    id_capilla: null,
    id_ataud: null,

    vehiculos: []

  }

  contratantes: Contratante[] = []
  fallecidos: Fallecido[] = []
  capillas: Capilla[] = []
  ataudes: Ataud[] = []
  vehiculos: Vehiculo[] = []

  constructor(
    private servicioApi: ServicioApi,
    private catalogoApi: CatalogoApi
  ) {}

  ngOnInit(): void {

    this.cargarCatalogos()

  }

  cargarCatalogos() {

    this.catalogoApi.getContratantes()
      .subscribe({
        next: res => this.contratantes = res,
        error: err => console.error(err)
      })

    this.catalogoApi.getFallecidos()
      .subscribe({
        next: res => this.fallecidos = res,
        error: err => console.error(err)
      })

    this.catalogoApi.getCapillas()
      .subscribe({
        next: res => this.capillas = res,
        error: err => console.error(err)
      })

    this.catalogoApi.getAtaudes()
      .subscribe({
        next: res => this.ataudes = res,
        error: err => console.error(err)
      })

    this.catalogoApi.getVehiculos()
      .subscribe({
        next: res => this.vehiculos = res,
        error: err => console.error(err)
      })

  }

  toggleVehiculo(id: number) {

    const index = this.form.vehiculos.indexOf(id)

    if (index === -1) {

      this.form.vehiculos.push(id)

    } else {

      this.form.vehiculos.splice(index, 1)

    }

  }

  guardar() {

    this.servicioApi
      .crearServicio(this.form)
      .subscribe({

        next: () => {

          alert('Servicio creado')

          this.resetForm()

        },

        error: err => {

          console.error(err)

        }

      })

  }

  resetForm() {

    this.form = {

      direccion_velacion: '',
      tipo_pago: 'directo',
      costo: 0,
      fecha: '',
      arreglo_flora: false,
      director_sepelio: false,
      cantidad_cargadores: 0,

      id_contratante: null,
      id_fallecido: null,
      id_capilla: null,
      id_ataud: null,

      vehiculos: []

    }

  }

}