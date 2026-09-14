import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BitacoraListResponse } from '../models/bitacora.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class BitacoraService {
  private api = `${environment.apiUrl}/bitacora`

  constructor(private http: HttpClient) {}

  listar(filtros: any, offset = 0, limit = 20) {
    let params = new HttpParams().set('offset', offset).set('limit', limit)

    Object.keys(filtros).forEach((key) => {
      if (filtros[key] !== undefined && filtros[key] !== null && filtros[key] !== '') {
        params = params.set(key, filtros[key])
      }
    })

    return this.http.get<BitacoraListResponse>(this.api, { params })
  }

  obtenerPorId(id: number) {
    return this.http.get(`${this.api}/${id}`)
  }
}
