import type { ExpedienteStatus } from "./expediente";

/**
 * Port: contrato de acceso a datos de expedientes.
 * El dominio depende de esta interfaz, no de una implementación concreta.
 * Los adapters (mock / live) la implementan.
 */
export interface ExpedienteRepository {
  getStatus(expediente: string, clave: string): Promise<ExpedienteStatus>;
}
