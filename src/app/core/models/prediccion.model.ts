export type ModeloTipo = 'sarima' | 'prophet' | 'xgboost' | 'lgbm' | 'lstm' | 'ets'
export type TargetTipo = 'servicios_totales' | 'monto_total'

export interface PrediccionRequest {
  modelo: ModeloTipo
  target: TargetTipo
  pasos: number
}

export interface PrediccionItem {
  mes: string
  valor: number
}

export interface PrediccionResponse {
  modelo: string
  target: string
  pasos: number
  periodo_inicio: string
  predicciones: PrediccionItem[]
}

export interface ModeloInfoResponse {
  targets: string[]
  modelos: string[]
  train_periodo: string
  test_periodo: string
  train_months: number
  test_months: number
}

export interface MetricaModelo {
  modelo: string
  mae: number
  rmse: number
  r2: number
  mape: number
}

export interface ComparativaResponse {
  train_periodo: string
  test_periodo: string
  metricas: MetricaModelo[]
}

export interface HistorialItem {
  mes: string
  valor: number
}

export interface HistoryResponse {
  target: string
  datos: HistorialItem[]
}

export interface DistribucionItem {
  nombre: string
  proporcion: number
  proporcion_estacional?: Record<string, number>
  cantidad_estimada?: number
}

export interface DistribucionResponse {
  total_servicios: number
  distribucion: DistribucionItem[]
}

export interface DistribucionRequest {
  modelo: ModeloTipo
  target: TargetTipo
  mes_inicio: string
  mes_fin: string
}

export interface DistribucionCompletaResponse {
  modelo: string
  target: string
  pasos: number
  periodo_inicio: string
  predicciones: PrediccionItem[]
}
