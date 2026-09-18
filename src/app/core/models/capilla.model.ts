export interface CapillaImagen {
  id: number;
  url: string;
}

export interface Capilla {
  id: number
  modelo: string
  stock: number
  activo: boolean
  imagenes: CapillaImagen[]
}