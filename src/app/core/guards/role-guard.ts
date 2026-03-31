import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { Router } from '@angular/router'

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router)

  const role = localStorage.getItem('cargo')

  const allowedRoles = route.data?.['roles']

  if(!allowedRoles || allowedRoles.includes(role)){
    return true
  }

  router.navigate(['/dashboard'])
  return false

}