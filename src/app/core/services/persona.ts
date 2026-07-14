import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Contratante } from '../models/contratante.model'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private fallecidosApi = `${environment.apiUrl}/deceased`;
  private contratantesApi = `${environment.apiUrl}/contractors`;

  constructor(private http: HttpClient) {}

  listarFallecidos(nombre?: string, dni?: string, activo?: string): Observable<any[]> {
    let params = new HttpParams();
    if (nombre) params = params.set('nombre', nombre);
    if (dni) params = params.set('dni_fallecido', dni);
    if (activo !== undefined && activo !== null && activo !== '') params = params.set('activo', activo);

    return this.http.get<any[]>(this.fallecidosApi, { params });
  }

  obtenerFallecido(id: number): Observable<any> {
    return this.http.get<any>(`${this.fallecidosApi}/${id}`);
  }

  actualizarFallecido(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.fallecidosApi}/${id}`, data);
  }

  eliminarFallecido(id: number): Observable<any> {
    return this.http.delete(`${this.fallecidosApi}/${id}`);
  }

  cambiarEstadoFallecido(id: number, activo: boolean): Observable<any> {
    return this.http.patch(`${this.fallecidosApi}/${id}/status`, { activo });
  }

  listarContratantes(nombre?: string, dni?: string, activo?: string): Observable<Contratante[]> {
    let params = new HttpParams();
    if (nombre) params = params.set('nombre', nombre);
    if (dni) params = params.set('dni', dni);
    if (activo !== undefined && activo !== null && activo !== '') params = params.set('activo', activo);

    return this.http.get<Contratante[]>(this.contratantesApi, { params });
  }

  obtenerContratante(id: number): Observable<Contratante> {
    return this.http.get<Contratante>(`${this.contratantesApi}/${id}`);
  }

  actualizarContratante(id: number, data: any): Observable<Contratante> {
    return this.http.patch<Contratante>(`${this.contratantesApi}/${id}`, data);
  }

  eliminarContratante(id: number): Observable<any> {
    return this.http.delete(`${this.contratantesApi}/${id}`);
  }

  cambiarEstadoContratante(id: number, activo: boolean): Observable<any> {
    return this.http.patch(`${this.contratantesApi}/${id}/status`, { activo });
  }
}
