import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tienePermiso } from '../utils/auth.utils';

export const permisoGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const permiso: string = route.data?.['permiso'] ?? '';

  if (!permiso || tienePermiso(permiso)) return true;

  router.navigate(['/dashboard']);
  return false;
};
