import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const token = localStorage.getItem('token')

  if(token){
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    })
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Solo avisa si realmente había una sesión: un login fallido también
        // responde 401 y no debe mostrarse como "sesión expirada".
        const habiaSesion = !!localStorage.getItem('token')
        localStorage.clear()
        router.navigate(['/login'], {
          state: {
            mensaje: habiaSesion
              ? 'Tu sesión expiró o fue cerrada. Inicia sesión nuevamente.'
              : '',
            tipo: 'alerta',
          },
        })
      }
      return throwError(() => error)
    })
  )
}
