import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

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

    return this.http.post<any>(
      `${this.api}/login`,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

  }

  guardarToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
  }

}