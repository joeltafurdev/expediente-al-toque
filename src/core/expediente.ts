// Dominio puro: no importa Next ni ningún framework.
// Estos tipos son el contrato que conoce toda la app; el formato crudo de la
// API real nunca sale de la capa de adapters.

/** Los tres estados secuenciales de un expediente del Despacho Presidencial. */
export type Estado =
  | "DOCUMENTO_REGISTRADO"
  | "EN_PROCESO"
  | "SE_EMITIO_RESPUESTA";

/** Motivos por los que una consulta no devuelve estado. */
export type ConsultaError =
  | "FORMATO_INVALIDO" // expediente o clave con formato incorrecto (validación previa)
  | "CLAVE_INVALIDA" // la clave no corresponde al expediente
  | "NO_ENCONTRADO"; // el expediente no existe

/** Resultado de una consulta de estado. */
export type ExpedienteStatus =
  | { ok: true; estado: Estado }
  | { ok: false; motivo: ConsultaError };
