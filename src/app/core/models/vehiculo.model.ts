export type TipoVehiculo =
  | 'porta_ataud'
  | 'porta_flores'
  | 'mixto'
  | 'auto'
  | 'microbus';

export interface Vehiculo {
  id: number;
  tipo: TipoVehiculo;
}