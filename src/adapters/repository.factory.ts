import type { ExpedienteRepository } from "@/core/ports";
import { MockExpedienteRepository } from "./mock-expediente.repo";
import { LiveExpedienteRepository } from "./live-expediente.repo";

/**
 * Devuelve el adapter según la env var DATA_SOURCE.
 *   DATA_SOURCE=mock (default) → datos de prueba, demo estable sin internet
 *   DATA_SOURCE=live           → API real (cuando el contrato esté confirmado)
 */
export function getExpedienteRepository(): ExpedienteRepository {
  const source = process.env.DATA_SOURCE ?? "mock";
  return source === "live"
    ? new LiveExpedienteRepository()
    : new MockExpedienteRepository();
}
