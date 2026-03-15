import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { decodeToken } from '../../shared/utils/jwt.utils';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const payload = decodeToken(token);

  if (payload?.cargo !== 'administrador') {
    router.navigate(['/servicios']);
    return false;
  }

  return true;
};