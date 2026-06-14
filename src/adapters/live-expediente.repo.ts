import type { ExpedienteRepository } from "@/core/ports";
import type { ExpedienteStatus } from "@/core/expediente";
import { normalizarEstado } from "@/core/estado";

/**
 * Adapter de la API real del Despacho Presidencial.
 *
 * Es el ÚNICO punto a tocar para conectar la API institucional. Ver la guía
 * completa y el contrato esperado en INTEGRACION-PRODUCCION.md.
 *
 * Configurable por entorno (sin tocar código):
 *   EXPEDIENTE_API_URL     URL del endpoint de consulta
 *   EXPEDIENTE_API_FORMAT  "form" (x-www-form-urlencoded, default) | "json"
 *
 * Soporta respuesta en JSON ({ estado | situacion | mensaje | descripcion })
 * o en texto plano. La normalización de las cadenas vive en core/estado.ts.
 */
const ENDPOINT =
  process.env.EXPEDIENTE_API_URL ??
  "https://www.presidencia.gob.pe/api/consulta-expedientes/index.php";

const FORMAT = process.env.EXPEDIENTE_API_FORMAT ?? "form";

function buildRequest(expediente: string, clave: string): RequestInit {
  if (FORMAT === "json") {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expediente, clave }),
      cache: "no-store",
    };
  }
  return {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ expediente, clave }),
    cache: "no-store",
  };
}

/** Extrae el texto del estado, venga en JSON o en texto plano. */
function extraerEstadoCrudo(raw: string): string {
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const campo =
      data.estado ?? data.situacion ?? data.mensaje ?? data.descripcion;
    return String(campo ?? raw);
  } catch {
    return raw;
  }
}

export class LiveExpedienteRepository implements ExpedienteRepository {
  async getStatus(
    expediente: string,
    clave: string,
  ): Promise<ExpedienteStatus> {
    const res = await fetch(ENDPOINT, buildRequest(expediente, clave));

    if (res.status === 404) return { ok: false, motivo: "NO_ENCONTRADO" };
    if (res.status === 401 || res.status === 403) {
      return { ok: false, motivo: "CLAVE_INVALIDA" };
    }
    if (!res.ok) {
      throw new Error(`API de expedientes respondió ${res.status}`);
    }

    const raw = (await res.text()).trim();
    const estado = normalizarEstado(extraerEstadoCrudo(raw));
    if (!estado) return { ok: false, motivo: "NO_ENCONTRADO" };
    return { ok: true, estado };
  }
}
