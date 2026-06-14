import { consultarEstado } from "@/application/consultar-estado";

/**
 * POST /api/consulta
 * Body JSON: { expediente: string, clave: string }
 * Entrypoint HTTP fino: parsea, delega en el caso de uso y mapea a códigos HTTP.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, motivo: "FORMATO_INVALIDO" },
      { status: 400 },
    );
  }

  const { expediente, clave } = (body ?? {}) as {
    expediente?: unknown;
    clave?: unknown;
  };

  if (typeof expediente !== "string" || typeof clave !== "string") {
    return Response.json(
      { ok: false, motivo: "FORMATO_INVALIDO" },
      { status: 400 },
    );
  }

  const resultado = await consultarEstado(expediente, clave);
  const status = resultado.ok
    ? 200
    : resultado.motivo === "FORMATO_INVALIDO"
      ? 400
      : 404;

  return Response.json(resultado, { status });
}
