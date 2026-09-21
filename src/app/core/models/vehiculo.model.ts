export type TipoVehiculo =
  | 'porta_ataud'
  | 'porta_flores'
  | 'mixto'
  | 'auto'
  | 'microbus'

export interface VehiculoImagen {
  id: number;
  url: string;
}

export interface Vehiculo {
  id: number
  tipo: TipoVehiculo
  activo: boolean
  imagenes: VehiculoImagen[]
}