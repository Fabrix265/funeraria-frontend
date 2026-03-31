import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:8000/users'

  constructor(private http: HttpClient) {}

  listar(){
    return this.http.get<any[]>(this.api)
  }

  crear(data:any){
    return this.http.post(this.api,data)
  }

  eliminar(id:number){
    return this.http.delete(`${this.api}/${id}`)
  }

  actualizarPerfil(data:any){
    return this.http.put(`${this.api}/me`,data)
  }

}