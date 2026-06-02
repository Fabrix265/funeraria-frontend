import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Vehiculo } from '../models/vehiculo.model'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private api = `${environment.apiUrl}/vehicles`;

  constructor(private http: HttpClient) {}

  listar(tipo?: string, activo?: string) {
    let params = new HttpParams();

    if (tipo) {
      params = params.set('tipo', tipo);
    }
    if (activo !== undefined && activo !== null && activo !== '') {
      params = params.set('activo', activo);
    }

    return this.http.get<Vehiculo[]>(this.api, { params });
  }

  crear(data: any) {
    return this.http.post<Vehiculo>(this.api, data);
  }

  actualizar(id: number, data: any) {
    return this.http.put<Vehiculo>(`${this.api}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  cambiarEstado(id: number, activo: boolean) {
    return this.http.patch<Vehiculo>(`${this.api}/${id}/status`, { activo });
  }
}
