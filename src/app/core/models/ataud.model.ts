export type TipoAtaud = 'economico' | 'vip'

export interface Ataud {

  id: number
  modelo: string
  color: string
  tipo: TipoAtaud
  stock: number

}