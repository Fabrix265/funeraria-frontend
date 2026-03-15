import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLogged()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};