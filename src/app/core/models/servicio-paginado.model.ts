import { Servicio } from './servicio.model'

export interface ServicioPaginado {

  total: number
  offset: number
  limit: number
  data: Servicio[]

}