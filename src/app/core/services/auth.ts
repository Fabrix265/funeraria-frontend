import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private api = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post<any>(`${this.api}/login`, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        tap((res) => {
          if (res.access_token) {
            localStorage.setItem('token', res.access_token);
          }
          // ✅ El backend devuelve res.user.roles = ["Administrador"]
          if (res.user?.roles) {
            localStorage.setItem('roles', JSON.stringify(res.user.roles));
          }
        }),
      );
  }

  esAdmin(): boolean {
    try {
      const roles: string[] = JSON.parse(localStorage.getItem('roles') ?? '[]');
      return roles.some((r) => r.toLowerCase() === 'administrador');
    } catch {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }
}
