import type { ExpedienteStatus } from "@/core/expediente";
import { getExpedienteRepository } from "@/adapters/repository.factory";
import { claveValida, expedienteValido } from "./seguridad";

/**
 * Caso de uso: consultar el estado de un expediente.
 * Valida el formato, delega en el repositorio (mock o live) y devuelve el
 * resultado normalizado. La clave se usa solo en tránsito.
 */
export async function consultarEstado(
  expedienteRaw: string,
  claveRaw: string,
): Promise<ExpedienteStatus> {
  const expediente = expedienteRaw.trim();
  const clave = claveRaw.trim();

  if (!expedienteValido(expediente) || !claveValida(clave)) {
    return { ok: false, motivo: "FORMATO_INVALIDO" };
  }

  const repo = getExpedienteRepository();
  return repo.getStatus(expediente, clave);
}
