export type EstadoPago = 'pendiente' | 'completado' | 'fallido' | 'cancelado'

export interface Pago {
  id: number
  id_servicio: number
  stripe_payment_intent_id: string
  client_secret?: string    
  monto: number
  moneda: string
  estado: EstadoPago
  fecha_creacion: string
  fecha_actualizacion?: string
}

export interface PagoRequest {
  id_servicio: number
  monto: number       // en centavos: costo * 100
  moneda: string
  descripcion?: string
}