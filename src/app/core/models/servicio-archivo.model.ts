export type TipoArchivo = 'certificado' | 'acta' | 'dni_contratante' | 'dni_fallecido'

export interface ServicioArchivo {
  id: number
  id_servicio: number
  tipo: TipoArchivo
  nombre_original: string
  drive_file_id: string
  drive_file_url: string
  mime_type: string
  subido_por: number | null
  usuario_nombre: string | null
  created_at: string
  updated_at: string
}

export interface ServicioArchivosResponse {
  archivos: ServicioArchivo[]
}
