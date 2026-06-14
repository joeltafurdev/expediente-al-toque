import type { ExpedienteRepository } from "@/core/ports";
import type { Estado, ExpedienteStatus } from "@/core/expediente";

// Datos de prueba provistos por la entidad (Ficha 11).
// No se almacenan nombres: la consulta de estado no los necesita (minimización
// de datos / privacy by design).
const EXPEDIENTES: Record<string, { clave: string; estado: Estado }> = {
  "2026-0010582": { clave: "4176", estado: "EN_PROCESO" },
  "2026-0003984": { clave: "2851", estado: "DOCUMENTO_REGISTRADO" },
  "2026-0012476": { clave: "9634", estado: "SE_EMITIO_RESPUESTA" },
  "2026-0004721": { clave: "1548", estado: "EN_PROCESO" },
  "2026-0008163": { clave: "7025", estado: "DOCUMENTO_REGISTRADO" },
  "2026-0011395": { clave: "3467", estado: "SE_EMITIO_RESPUESTA" },
};

/** Adapter de demo: corre sin internet (Bases §19, ambientes simulados). */
export class MockExpedienteRepository implements ExpedienteRepository {
  async getStatus(
    expediente: string,
    clave: string,
  ): Promise<ExpedienteStatus> {
    const registro = EXPEDIENTES[expediente];
    if (!registro) return { ok: false, motivo: "NO_ENCONTRADO" };
    if (registro.clave !== clave) return { ok: false, motivo: "CLAVE_INVALIDA" };
    return { ok: true, estado: registro.estado };
  }
}
