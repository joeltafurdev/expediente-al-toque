import { CircleCheckBig, Info, ShieldCheck } from "lucide-react";
import type { Estado } from "@/core/expediente";

/** Banner del asistente con guía contextual según el estado del trámite. */
export function InfoBanner({ estado }: { estado: Estado }) {
  const respuestaLista = estado === "SE_EMITIO_RESPUESTA";
  const Icono = respuestaLista ? CircleCheckBig : Info;

  return (
    <section className="flex items-start gap-4 rounded-r-lg border-l-4 border-secondary bg-surface-container-low p-5">
      <div className="shrink-0 rounded-full bg-secondary-fixed/30 p-2 text-secondary">
        <Icono className="h-6 w-6" aria-hidden />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-on-surface">
          {respuestaLista ? (
            <>
              Tu trámite ya tiene <strong>respuesta emitida</strong>. Podés
              conocer el resultado sin moverte de donde estás.
            </>
          ) : (
            <>
              Tu documento está siendo gestionado por el área correspondiente.
              Te mantendremos al tanto de cada avance.
            </>
          )}
        </p>
        <span className="inline-flex items-center gap-1 font-semibold text-secondary">
          <ShieldCheck className="h-5 w-5" aria-hidden />
          No necesitás venir a Lima.
        </span>
      </div>
    </section>
  );
}
