export interface AtaudImagen {
  id: number;
  url: string;
}

export interface Ataud {
  id: number;
  modelo: string;
  color: string;
  stock: number;
  activo: boolean;
  imagenes: AtaudImagen[];
}