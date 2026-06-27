import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Pago, PagoRequest } from '../models/pago.model'

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private api = `${environment.apiUrl}/pagos`

  constructor(private http: HttpClient) {}

  crearIntent(data: PagoRequest) {
    return this.http.post<Pago>(`${this.api}/crear-intent`, data)
  }

  obtenerPorServicio(idServicio: number) {
    return this.http.get<Pago[]>(`${this.api}/servicio/${idServicio}`)
  }
}