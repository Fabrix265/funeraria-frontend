import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Pasajero } from '../models/pasajero.model'
import { environment } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class PasajeroService {
  private api = `${environment.apiUrl}/passengers`

  constructor(private http: HttpClient) {}

  listar(servicioId: number): Observable<Pasajero[]> {
    return this.http.get<Pasajero[]>(`${this.api}/services/${servicioId}`)
  }

  crear(servicioId: number, data: { nombre: string; dni_pasajero: string }): Observable<Pasajero> {
    return this.http.post<Pasajero>(`${this.api}/services/${servicioId}`, data)
  }

  actualizar(id: number, data: { nombre: string; dni_pasajero: string }): Observable<Pasajero> {
    return this.http.patch<Pasajero>(`${this.api}/${id}`, data)
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`)
  }
}
