export interface DemandaRequest {
  stock_actual?: Record<string, number>
  meses?: number
}

export interface DemandaCategoria {
  categoria: string
  cantidad_predicha: number
  precio_promedio: number
  monto_esperado: number
}

export interface DesgloseModelo {
  modelo: string
  cantidad: number
}

export interface AlertaReorden {
  categoria: string
  stock_actual: number
  demanda_predicha: number
  unidades_a_comprar: number
}

export interface DemandaResponse {
  periodo_inicio: string
  meses: number
  demanda_por_categoria: DemandaCategoria[]
  desglose_por_modelo: Record<string, DesgloseModelo[]>
  monto_esperado_total: number
  alertas_reorden: AlertaReorden[]
}
