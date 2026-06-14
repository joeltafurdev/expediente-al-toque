// Validación de formato de entrada. La clave se usa solo en tránsito:
// nunca se loguea ni se persiste, y jamás pasa por un LLM (Bases §17).

const EXPEDIENTE_RE = /^\d{4}-\d{7}$/; // ej: 2026-0010582
const CLAVE_RE = /^\d{4}$/; // 4 dígitos

export function expedienteValido(valor: string): boolean {
  return EXPEDIENTE_RE.test(valor.trim());
}

export function claveValida(valor: string): boolean {
  return CLAVE_RE.test(valor.trim());
}
