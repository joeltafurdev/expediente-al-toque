import type { Estado } from "./expediente";

/** Orden secuencial del flujo. Lo usa el tracker visual de 3 pasos. */
export const ESTADOS_ORDENADOS: readonly Estado[] = [
  "DOCUMENTO_REGISTRADO",
  "EN_PROCESO",
  "SE_EMITIO_RESPUESTA",
] as const;

/** Etiquetas legibles para el ciudadano. */
export const ESTADO_LABEL: Record<Estado, string> = {
  DOCUMENTO_REGISTRADO: "Documento registrado",
  EN_PROCESO: "En proceso",
  SE_EMITIO_RESPUESTA: "Se emitió respuesta",
};

/**
 * Normaliza el texto crudo que devuelve la API real al enum interno.
 * Tolerante a mayúsculas/minúsculas, espacios y tildes.
 */
export function normalizarEstado(raw: string): Estado | null {
  const v = raw
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, ""); // quita tildes

  switch (v) {
    case "DOCUMENTO REGISTRADO":
      return "DOCUMENTO_REGISTRADO";
    case "EN PROCESO":
      return "EN_PROCESO";
    case "SE EMITIO RESPUESTA":
      return "SE_EMITIO_RESPUESTA";
    default:
      return null;
  }
}

/** Posición del estado en el flujo (0, 1, 2). */
export function indiceEstado(estado: Estado): number {
  return ESTADOS_ORDENADOS.indexOf(estado);
}
