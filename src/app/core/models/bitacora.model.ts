export interface BitacoraEntry {
  id: number;
  usuario_id: number | null;
  usuario_nombre: string;
  accion: string;
  modulo: string;
  detalle: string | null;
  ip_address: string | null;
  created_at: string;
}

export interface BitacoraListResponse {
  items: BitacoraEntry[];
  total: number;
  pagina: number;
  total_paginas: number;
}
