import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Contratante } from '../../../core/models/contratante.model'
import { Fallecido } from '../../../core/models/fallecido.model'
import { Capilla } from '../../../core/models/capilla.model'
import { Ataud } from '../../../core/models/ataud.model'
import { Vehiculo } from '../../../core/models/vehiculo.model'

@Injectable({
  providedIn: 'root'
})
export class CatalogoApi {

  private api = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient) {}

  getContratantes(): Observable<Contratante[]> {

    return this.http.get<Contratante[]>(`${this.api}/contratantes`)

  }

  getFallecidos(): Observable<Fallecido[]> {

    return this.http.get<Fallecido[]>(`${this.api}/fallecidos`)

  }

  getCapillas(): Observable<Capilla[]> {

    return this.http.get<Capilla[]>(`${this.api}/capillas`)

  }

  getAtaudes(): Observable<Ataud[]> {

    return this.http.get<Ataud[]>(`${this.api}/ataudes`)

  }

  getVehiculos(): Observable<Vehiculo[]> {

    return this.http.get<Vehiculo[]>(`${this.api}/vehiculos`)

  }

}