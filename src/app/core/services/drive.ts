import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface DriveEstado {
  autorizado: boolean;
  expira_en: string | null;
  motivo: 'no_autorizado' | 'refresh_invalido' | null;
}

@Injectable({ providedIn: 'root' })
export class Drive {
  private api = `${environment.apiUrl}/drive`;

  constructor(private http: HttpClient) {}

  estado() {
    return this.http.get<DriveEstado>(`${this.api}/status`);
  }

  obtenerUrlAuth() {
    return this.http.get<{ url: string }>(`${this.api}/auth-url`);
  }
}