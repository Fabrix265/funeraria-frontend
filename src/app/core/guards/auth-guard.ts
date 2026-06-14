import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = () => {

  const router = inject(Router)

  const token = localStorage.getItem('token')
  const loginTime = localStorage.getItem('loginTime')

  if(!token){
    router.navigate(['/login'])
    return false
  }

  if (loginTime) {
    const elapsed = Date.now() - Number(loginTime)
    const eightHours = 8 * 60 * 60 * 1000
    if (elapsed > eightHours) {
      localStorage.clear()
      router.navigate(['/login'])
      return false
    }
  }

  return true

}
