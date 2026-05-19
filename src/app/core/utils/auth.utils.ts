export function esAdminActual(): boolean {
  try {
    const roles: string[] = JSON.parse(localStorage.getItem('roles') ?? '[]');
    return roles.some((r) => r.toLowerCase() === 'administrador');
  } catch {
    return false;
  }
}

export function tieneRol(nombreRol: string): boolean {
  try {
    const roles: string[] = JSON.parse(localStorage.getItem('roles') ?? '[]');
    return roles.some((r) => r.toLowerCase() === nombreRol.toLowerCase());
  } catch {
    return false;
  }
}
