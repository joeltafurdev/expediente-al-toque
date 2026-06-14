import {
  Check,
  FileSearch,
  FileText,
  MailCheck,
  type LucideIcon,
} from "lucide-react";
import type { Estado } from "@/core/expediente";
import { ESTADOS_ORDENADOS, indiceEstado } from "@/core/estado";

type Paso = { titulo: string; icono: LucideIcon; activa: string; pendiente: string };

const PASOS: Record<Estado, Paso> = {
  DOCUMENTO_REGISTRADO: {
    titulo: "Recibido",
    icono: FileText,
    activa: "Tu documento fue registrado correctamente.",
    pendiente: "Aún no registrado.",
  },
  EN_PROCESO: {
    titulo: "En evaluación",
    icono: FileSearch,
    activa: "En revisión por el área correspondiente.",
    pendiente: "Pendiente de evaluación.",
  },
  SE_EMITIO_RESPUESTA: {
    titulo: "Respuesta final",
    icono: MailCheck,
    activa: "La respuesta a tu trámite ya está disponible.",
    pendiente: "Pendiente.",
  },
};

/**
 * Timeline vertical de 3 pasos. Estado por icono + texto + color
 * (regla color-not-only). El paso actual se resalta en navy con anillo.
 */
export function StatusTracker({ estado }: { estado: Estado }) {
  const actual = indiceEstado(estado);
  const ultimo = ESTADOS_ORDENADOS.length - 1;

  return (
    <ol className="flex flex-col" aria-label="Progreso de tu expediente">
      {ESTADOS_ORDENADOS.map((e, i) => {
        const completado = i < actual;
        const esActual = i === actual;
        const paso = PASOS[e];
        const Icono = completado ? Check : paso.icono;

        return (
          <li
            key={e}
            className={`flex items-start gap-4 ${i > actual ? "opacity-60" : ""}`}
            aria-current={esActual ? "step" : undefined}
          >
            <div className="flex flex-col items-center">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm ${
                  completado
                    ? "bg-secondary text-on-secondary"
                    : esActual
                      ? "bg-primary text-on-primary ring-4 ring-primary-fixed/50 timeline-pulse"
                      : "border border-outline-variant bg-surface-variant text-on-surface-variant"
                }`}
              >
                <Icono className="h-5 w-5" aria-hidden />
              </span>
              {i !== ultimo && (
                <span
                  aria-hidden
                  className={`mt-2 h-12 w-0.5 ${completado ? "bg-secondary" : "bg-outline-variant"}`}
                />
              )}
            </div>
            <div className="flex flex-col pb-6">
              <span
                className={`text-base font-semibold ${esActual ? "text-primary" : "text-on-surface"}`}
              >
                {paso.titulo}
              </span>
              <span className="text-sm text-on-surface-variant">
                {i <= actual ? paso.activa : paso.pendiente}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
