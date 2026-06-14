import { BatteryFull, Landmark, Signal, Wifi } from "lucide-react";
import type { Estado } from "@/core/expediente";
import { ESTADO_LABEL } from "@/core/estado";

/**
 * Mockup del celular del ciudadano recibiendo el aviso proactivo.
 * Comunica el punto clave: el aviso llega al teléfono cuando la persona NO
 * está mirando la web — porque dejó su número al suscribirse.
 */
export function PhoneAlert({
  expediente,
  estado,
  canal,
}: {
  expediente: string;
  estado: Estado;
  canal?: string;
}) {
  const esFinal = estado === "SE_EMITIO_RESPUESTA";

  return (
    <div className="toast-in mx-auto w-full max-w-[300px]">
      <div className="rounded-[2rem] border-4 border-primary bg-primary p-2 shadow-xl">
        <div className="rounded-[1.6rem] bg-gradient-to-b from-primary-fixed to-surface px-3 pb-6 pt-2">
          {/* Barra de estado del teléfono (decorativa) */}
          <div className="flex items-center justify-between px-2 py-1 text-on-primary-fixed">
            <span className="text-xs font-semibold">14:32</span>
            <div className="flex items-center gap-1" aria-hidden>
              <Signal className="h-3.5 w-3.5" />
              <Wifi className="h-3.5 w-3.5" />
              <BatteryFull className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Notificación push */}
          <div
            role="status"
            aria-live="polite"
            className="mt-6 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/95 p-3 shadow-md"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
                <Landmark className="h-4 w-4" aria-hidden />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm font-semibold text-on-surface">
                  Despacho Presidencial
                </span>
                <span className="text-xs text-on-surface-variant">ahora</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-on-surface">
              Tu expediente {expediente} avanzó a:{" "}
              <span className="font-semibold">{ESTADO_LABEL[estado]}</span>.
              {esFinal
                ? " Ya podés ver el resultado, sin volver a consultar."
                : " Te avisaremos en cada avance."}
            </p>
          </div>

          {canal && (
            <p className="mt-3 text-center text-xs text-on-primary-fixed-variant">
              Recibido por {canal}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
