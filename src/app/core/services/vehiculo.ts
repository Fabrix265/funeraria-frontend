import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Vehiculo } from '../models/vehiculo.model'

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private api = 'http://localhost:8000/vehiculos'

  constructor(private http: HttpClient) {}

  listar(tipo?:string){

    let params = new HttpParams()

    if(tipo){
      params = params.set('tipo',tipo)
    }

    return this.http.get<Vehiculo[]>(this.api,{params})

  }

  crear(data:any){
    return this.http.post<Vehiculo>(this.api,data)
  }

  actualizar(id:number,data:any){
    return this.http.put<Vehiculo>(`${this.api}/${id}`,data)
  }

  eliminar(id:number){
    return this.http.delete(`${this.api}/${id}`)
  }

}