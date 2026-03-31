import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Contratante } from '../models/contratante.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private fallecidosApi = 'http://localhost:8000/fallecidos'
  private contratantesApi = 'http://localhost:8000/contratantes'

  constructor(private http: HttpClient) {}

  listarFallecidos(nombre?: string, dni?: string): Observable<any[]> {
    let params = new HttpParams();
    if (nombre) params = params.set('nombre', nombre);
    if (dni) params = params.set('dni', dni);

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


  listarContratantes(nombre?: string, dni?: string): Observable<Contratante[]> {
    let params = new HttpParams();
    if (nombre) params = params.set('nombre', nombre);
    if (dni) params = params.set('dni', dni);

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
}