// El backend guarda fechas como datetime.utcnow() en columnas DateTime
// "naive" (sin zona horaria), por lo que llegan sin sufijo Z:
//   "2026-10-03T19:01:00"
// JavaScript interpreta esa cadena como hora LOCAL, así que en Perú
// (UTC-5) se mostraba +5 h de más: 06:54 p. m. en vez de 01:54 p. m.
// Estas funciones añaden la Z cuando falta, para que se lea como UTC real.

export const ZONA_LOCALE = 'es-PE'

export function aUtc(valor: string | Date | null | undefined): Date | null {
  if (valor === null || valor === undefined || valor === '') return null

  if (valor instanceof Date) {
    return Number.isNaN(valor.getTime()) ? null : valor
  }

  let texto = String(valor).trim()
  if (!texto) return null

  // Solo le falta la zona: "2026-10-03T19:01:00" -> "...Z"
  if (!/(Z|[+-]\d{2}:?\d{2})$/.test(texto)) texto += 'Z'

  // Python puede incluir microsegundos; JS solo acepta milisegundos.
  texto = texto.replace(/(\.\d{3})\d+/, '$1')

  const fecha = new Date(texto)
  return Number.isNaN(fecha.getTime()) ? null : fecha
}

export function formatearFechaHora(
  valor: string | Date | null | undefined,
  opciones: Intl.DateTimeFormatOptions = {}
): string {
  const fecha = aUtc(valor)
  if (!fecha) return '—'
  return fecha.toLocaleString(ZONA_LOCALE, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...opciones,
  })
}

export function formatearHora(valor: string | Date | null | undefined): string {
  const fecha = aUtc(valor)
  if (!fecha) return '—'
  return fecha.toLocaleTimeString(ZONA_LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
  })
}
