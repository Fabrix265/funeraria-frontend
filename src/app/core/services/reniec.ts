import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ReniecResponse {
  dni: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_completo: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReniecService {
  private api = `${environment.apiUrl}/reniec`;

  constructor(private http: HttpClient) {}

  consultar(dni: string) {
    return this.http.get<ReniecResponse>(`${this.api}/${dni}`);
  }
}
