import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PermissionLeer {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface RoleDetalle {
  id: number;
  nombre: string;
  permisos: PermissionLeer[];
}

export interface RoleCrear {
  nombre: string;
  permisos_ids: number[];
}

@Injectable({ providedIn: 'root' })
export class Role {
  private api = 'http://localhost:8000/roles';

  constructor(private http: HttpClient) {}

  listarPermisos(): Observable<PermissionLeer[]> {
    return this.http.get<PermissionLeer[]>(`${this.api}/permisos`);
  }

  crear(data: RoleCrear): Observable<RoleDetalle> {
    return this.http.post<RoleDetalle>(`${this.api}/`, data);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  listar(): Observable<RoleDetalle[]> {
    return this.http.get<RoleDetalle[]>(`${this.api}/`);
  }
}
