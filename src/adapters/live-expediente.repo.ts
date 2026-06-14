import type { ExpedienteRepository } from "@/core/ports";
import type { ExpedienteStatus } from "@/core/expediente";
import { normalizarEstado } from "@/core/estado";

const ENDPOINT =
  process.env.EXPEDIENTE_API_URL ??
  "https://www.presidencia.gob.pe/api/consulta-expedientes/index.php";

/**
 * Adapter de la API real del Despacho Presidencial.
 *
 * PENDIENTE: confirmar con el mentor de TI (German Canaza) el contrato exacto:
 *   - formato del POST (campos, content-type: form-urlencoded vs JSON)
 *   - estructura de la respuesta (texto plano vs JSON)
 *   - códigos/mensajes de error (clave inválida, expediente inexistente)
 *
 * Hasta confirmarlo, la app corre con el adapter mock (DATA_SOURCE=mock).
 * Esta implementación es una hipótesis razonable, no probada contra producción.
 */
export class LiveExpedienteRepository implements ExpedienteRepository {
  async getStatus(
    expediente: string,
    clave: string,
  ): Promise<ExpedienteStatus> {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ expediente, clave }),
      cache: "no-store",
    });

    if (res.status === 404) return { ok: false, motivo: "NO_ENCONTRADO" };
    if (!res.ok) throw new Error(`API de expedientes respondió ${res.status}`);

    // TODO: ajustar al formato real de respuesta una vez confirmado el contrato.
    const texto = (await res.text()).trim();
    const estado = normalizarEstado(texto);
    if (!estado) return { ok: false, motivo: "NO_ENCONTRADO" };
    return { ok: true, estado };
  }
}
