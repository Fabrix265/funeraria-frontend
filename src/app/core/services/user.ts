import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RoleLeer {
  id: number;
  nombre: string;
}

export interface UserLeer {
  id: number;
  username: string;
  roles: RoleLeer[];
}

export interface UserCrear {
  username: string;
  password: string;
  role_id: number;
}

export interface UserActualizarAdmin {
  username: string;
  role_id: number;
  password?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:8000/users';

  constructor(private http: HttpClient) {}

  listarRoles(): Observable<RoleLeer[]> {
    return this.http.get<RoleLeer[]>(`${this.api}/roles`);
  }

  listar(): Observable<UserLeer[]> {
    return this.http.get<UserLeer[]>(this.api);
  }

  crear(data: UserCrear): Observable<UserLeer> {
    return this.http.post<UserLeer>(this.api, data);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  actualizarPerfil(data: { username: string; password: string }): Observable<UserLeer> {
    return this.http.put<UserLeer>(`${this.api}/me`, data);
  }

  actualizarUsuario(id: number, data: UserActualizarAdmin): Observable<UserLeer> {
    return this.http.put<UserLeer>(`${this.api}/${id}`, data);
  }
}
