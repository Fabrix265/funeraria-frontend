import { Ataud } from './ataud.model';
import { Capilla } from './capilla.model';
import { Vehiculo } from './vehiculo.model';
import { Contratante } from './contratante.model';
import { Fallecido } from './fallecido.model';

export type TipoPago = 'directo' | 'seguro' | 'mixto';

export interface Servicio {
  id: number;
  id_usuario: number;

  direccion_velacion: string;
  tipo_pago: TipoPago;
  costo: number;

  arreglo_flora: boolean;
  fecha: string;

  cantidad_cargadores?: number;
  director_sepelio: boolean;

  fallecido: Fallecido;
  contratante: Contratante;

  ataud?: Ataud;
  capilla: Capilla;

  vehiculos_asignados: Vehiculo[];
}

export interface ServicioPaginado {
  total: number;
  offset: number;
  limit: number;
  data: Servicio[];
}