import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Ataud } from '../models/ataud.model'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AtaudService {
  private api = `${environment.apiUrl}/coffins`;

  constructor(private http: HttpClient) {}

  listar(filtros: any) {
    let params = new HttpParams();

    Object.keys(filtros).forEach((key) => {
      if (filtros[key] !== undefined && filtros[key] !== null && filtros[key] !== '') {
        params = params.set(key, filtros[key]);
      }
    });

    return this.http.get<Ataud[]>(this.api, { params });
  }

  crear(data: any) {
    return this.http.post<Ataud>(this.api, data);
  }

  actualizar(id: number, data: any) {
    return this.http.patch<Ataud>(`${this.api}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  actualizarStock(id: number, cantidad: number) {
    return this.http.patch<Ataud>(`${this.api}/${id}/stock`, { cantidad });
  }

  cambiarEstado(id: number, activo: boolean) {
    return this.http.patch<Ataud>(`${this.api}/${id}/status`, { activo });
  }
}
