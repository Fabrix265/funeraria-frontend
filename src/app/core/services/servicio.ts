import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { ServicioPaginado } from '../models/servicio-paginado.model'

@Injectable({
  providedIn: 'root'
})
export class Servicio {

  private api = 'http://localhost:8000/servicios'

  constructor(private http: HttpClient) {}

  listar(filtros:any, offset=0, limit=20){

    let params = new HttpParams()
      .set('offset', offset)
      .set('limit', limit)

    Object.keys(filtros).forEach(key => {

      if(filtros[key]){
        params = params.set(key, filtros[key])
      }

    })

    return this.http.get<ServicioPaginado>(this.api,{params})

  }

  obtener(id:number){
    return this.http.get(`${this.api}/${id}`)
  }

  crear(data:any){
    return this.http.post(this.api,data)
  }

  eliminar(id:number){
    return this.http.delete(`${this.api}/${id}`)
  }

}