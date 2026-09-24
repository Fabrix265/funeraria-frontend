export type Cargo = 'administrador' | 'trabajador'

export interface Role {
  id: number;
  nombre: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  cargo?: Cargo;
  roles: Role[];
  activo: boolean;
}
