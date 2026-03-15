import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

import { ServicioPaginado, Servicio } from '../../../core/models/servicio.model'

@Injectable({
  providedIn: 'root'
})
export class ServicioApi {

  private api = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient) {}

  getServicios(offset = 0, limit = 10): Observable<ServicioPaginado> {

    const params = new HttpParams()
      .set('offset', offset)
      .set('limit', limit)

    return this.http.get<ServicioPaginado>(
      `${this.api}/servicios`,
      { params }
    )

  }

  getServicio(id: number): Observable<Servicio>{

    return this.http.get<Servicio>(
      `${this.api}/servicios/${id}`
    )

  }

  crearServicio(data: any) {

    return this.http.post(
      `${this.api}/servicios`,
      data
    )

  }

  eliminarServicio(id: number){

    return this.http.delete(
      `${this.api}/servicios/${id}`
    )

  }

  actualizarServicio(id: number, data: any) {

  return this.http.put(
    `${this.api}/servicios/${id}`,
    data
  )

  }

}