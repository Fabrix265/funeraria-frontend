import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  try {
    const rolesRaw = localStorage.getItem('roles');
    const roles: string[] = rolesRaw ? JSON.parse(rolesRaw) : [];

    const allowedRoles: string[] = route.data?.['roles'] ?? [];

    if (allowedRoles.length === 0) return true;

    const tieneAcceso = roles.some((r) =>
      allowedRoles.some((allowed) => allowed.toLowerCase() === r.toLowerCase()),
    );

    if (tieneAcceso) return true;
  } catch {
  }

  router.navigate(['/dashboard']);
  return false;
};
