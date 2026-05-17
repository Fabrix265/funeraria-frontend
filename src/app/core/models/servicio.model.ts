import { Ataud } from './ataud.model'
import { Capilla } from './capilla.model'
import { Vehiculo } from './vehiculo.model'
import { Fallecido } from './fallecido.model'
import { Contratante } from './contratante.model'

export type TipoPago = 'directo' | 'seguro' | 'mixto'

export interface Servicio {

  id: number
  id_usuario: number

  direccion_velacion: string
  tipo_pago: TipoPago
  costo: number

  fecha: string

  cantidad_cargadores?: number

  fallecido: Fallecido
  contratante: Contratante

  ataud?: Ataud
  capilla: Capilla

  vehiculos_asignados: Vehiculo[]

}