import type { ExpedienteStatus } from "@/core/expediente";

/** Llama al Route Handler. Reusa los tipos del dominio en el cliente. */
export async function consultarExpediente(
  expediente: string,
  clave: string,
): Promise<ExpedienteStatus> {
  const res = await fetch("/api/consulta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ expediente, clave }),
  });
  return (await res.json()) as ExpedienteStatus;
}
