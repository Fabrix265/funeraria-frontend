import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private api = 'http://localhost:8000/auth'

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = new URLSearchParams()
    body.set('username', username)
    body.set('password', password)

    return this.http.post<any>(`${this.api}/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap(res => {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token)
        }
        if (res.user && res.user.cargo) {
          localStorage.setItem('cargo', res.user.cargo)
        }
      })
    )
  }

  esAdmin(): boolean {
    return localStorage.getItem('cargo') === 'administrador'
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.clear()
  }
}