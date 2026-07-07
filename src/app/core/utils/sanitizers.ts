export function sanitizarEntrada(valor: string): string {
  if (!valor) return '';
  return valor
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function sanitizarNumerico(valor: string): string {
  if (!valor) return '';
  return valor
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s/g, '');
}
