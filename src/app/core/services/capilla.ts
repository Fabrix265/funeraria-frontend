import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Capilla } from '../models/capilla.model'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CapillaService {
  private api = `${environment.apiUrl}/chapels`;

  constructor(private http: HttpClient) {}

  listar(modelo?: string, activo?: string) {
    let params = new HttpParams();

    if (modelo) {
      params = params.set('modelo', modelo);
    }
    if (activo !== undefined && activo !== null && activo !== '') {
      params = params.set('activo', activo);
    }

    return this.http.get<Capilla[]>(this.api, { params });
  }

  crear(data: any) {
    return this.http.post<Capilla>(this.api, data);
  }

  actualizar(id: number, data: any) {
    return this.http.put<Capilla>(`${this.api}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  actualizarStock(id: number, cantidad: number) {
    return this.http.patch<Capilla>(`${this.api}/${id}/stock`, { cantidad });
  }

  cambiarEstado(id: number, activo: boolean) {
    return this.http.patch<Capilla>(`${this.api}/${id}/status`, { activo });
  }
}
