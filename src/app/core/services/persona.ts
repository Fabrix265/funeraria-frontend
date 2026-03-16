import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Contratante } from '../models/contratante.model'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private fallecidosApi = 'http://localhost:8000/fallecidos'
  private contratantesApi = 'http://localhost:8000/contratantes'

  constructor(private http: HttpClient) {}

  listarFallecidos(){
    return this.http.get<any[]>(this.fallecidosApi)
  }

  obtenerFallecido(id:number){
    return this.http.get(`${this.fallecidosApi}/${id}`)
  }

  actualizarFallecido(id:number,data:any){
    return this.http.patch(`${this.fallecidosApi}/${id}`,data)
  }

  listarContratantes(){
    return this.http.get<Contratante[]>(this.contratantesApi);
  }

  obtenerContratante(id:number){
    return this.http.get<Contratante>(`${this.contratantesApi}/${id}`)
  }

  actualizarContratante(id:number,data:any){
    return this.http.patch<Contratante>(`${this.contratantesApi}/${id}`, data);
  }

}