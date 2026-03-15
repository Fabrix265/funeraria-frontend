export type Cargo = 'administrador' | 'trabajador';

export interface User {
  id: number;
  username: string;
  cargo: Cargo;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}