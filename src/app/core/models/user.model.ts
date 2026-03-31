export type Cargo = 'administrador' | 'trabajador'

export interface User {

  id: number
  username: string
  cargo: Cargo

}