export function tieneRol(nombreRol: string): boolean {
  try {
    const roles: string[] = JSON.parse(localStorage.getItem('roles') ?? '[]');
    return roles.some((r) => r.toLowerCase() === nombreRol.toLowerCase());
  } catch {
    return false;
  }
}

export function tienePermiso(permiso: string): boolean {
  try {
    const permisos: string[] = JSON.parse(localStorage.getItem('permisos') ?? '[]');
    return permisos.includes(permiso);
  } catch {
    return false;
  }
}

export function esAdminActual(): boolean {
  return tieneRol('administrador');
}

export function puedeLeer(modulo: string): boolean {
  return tienePermiso(`${modulo}:leer`);
}

export function puedeCrear(modulo: string): boolean {
  return tienePermiso(`${modulo}:crear`);
}

export function puedeActualizar(modulo: string): boolean {
  return tienePermiso(`${modulo}:actualizar`);
}

export function puedeEliminar(modulo: string): boolean {
  return tienePermiso(`${modulo}:eliminar`);
}
