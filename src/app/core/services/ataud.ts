import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Ataud } from '../models/ataud.model'

@Injectable({
  providedIn: 'root'
})
export class AtaudService {

  private api = 'http://localhost:8000/ataudes'

  constructor(private http: HttpClient) {}

  listar(filtros:any){

    let params = new HttpParams()

    Object.keys(filtros).forEach(key=>{
      if(filtros[key]){
        params = params.set(key,filtros[key])
      }
    })

    return this.http.get<Ataud[]>(this.api,{params})

  }

  crear(data:any){
    return this.http.post<Ataud>(this.api,data)
  }

  actualizar(id:number,data:any){
    return this.http.patch<Ataud>(`${this.api}/${id}`,data)
  }

  eliminar(id:number){
    return this.http.delete(`${this.api}/${id}`)
  }

  actualizarStock(id:number,cantidad:number){

    return this.http.patch<Ataud>(
      `${this.api}/${id}/stock`,
      {cantidad}
    )

  }

}