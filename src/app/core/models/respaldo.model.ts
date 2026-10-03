export type EstadoRespaldo = 'en_proceso' | 'completado' | 'fallido'
export type TipoRespaldo = 'manual' | 'seguridad'
export type VigenciaRespaldo = 'nunca' | 'al_dia' | 'proximo' | 'vencido'
export type EstadoPaso = 'pendiente' | 'en_proceso' | 'completado' | 'fallido'
export type EstadoJob = 'en_proceso' | 'completado' | 'fallido'

export interface Respaldo {
  id: number
  etiqueta: string
  fecha: string
  nombre_archivo: string
  drive_file_url: string | null
  tamano_bytes: number
  cantidad_archivos: number
  sha256: string | null
  estado: EstadoRespaldo
  mensaje_error: string | null
  tipo: TipoRespaldo
  observacion: string | null
  usuario_nombre: string | null
}

export interface RespaldoListaResponse {
  items: Respaldo[]
  total: number
}

export interface RespaldoConfig {
  frecuencia_dias: number
  dias_advertencia: number
  maximo_respaldos: number
}

export interface PasoJob {
  nombre: string
  estado: EstadoPaso
  mensaje: string | null
}

export interface RespaldoJob {
  job_id: string
  tipo: string
  estado: EstadoJob
  paso_actual: string
  pasos: PasoJob[]
  mensaje: string | null
  respaldo_id: number | null
  resultado: Record<string, unknown> | null
  inicio: string
  fin: string | null
}

export interface RespaldoEstado {
  pg_dump_disponible: boolean
  psql_disponible: boolean
  pg_dump_ruta: string | null
  psql_ruta: string | null
  drive_conectado: boolean
  drive_motivo: string | null
  total_respaldos: number
  ultimo_respaldo: Respaldo | null
  dias_desde_ultimo: number | null
  vigencia: VigenciaRespaldo
  fecha_siguiente_recomendada: string | null
  config: RespaldoConfig
  carpeta_servicios_id: string | null
  carpeta_base_datos_id: string | null
  carpeta_archivos_id: string | null
  carpeta_raiz_id: string | null
  job_en_ejecucion: RespaldoJob | null
  maximo_alcanzado: boolean
}

export interface TokenRestauracion {
  token: string
  expira_en: string
}

export interface RespaldoResincronizacion {
  creados: number
  actualizados: number
  eliminados: number
  manifiestos_ilegibles: number
  total: number
}
