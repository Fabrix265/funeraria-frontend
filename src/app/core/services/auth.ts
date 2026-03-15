import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse, User } from '../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {

    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      body.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    ).pipe(
      tap(res => {
        localStorage.setItem('token', res.access_token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

}