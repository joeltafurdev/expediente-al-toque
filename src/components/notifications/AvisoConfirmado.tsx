"use client";

import {
  CircleCheckBig,
  Download,
  FileText,
  FlaskConical,
  House,
  Play,
} from "lucide-react";
import { useState } from "react";
import type { Estado } from "@/core/expediente";
import { ESTADOS_ORDENADOS, indiceEstado } from "@/core/estado";
import { PhoneAlert } from "./PhoneAlert";

/** Pantalla de confirmación de suscripción a avisos. */
export function AvisoConfirmado({
  expediente,
  telMasked,
  estado,
  onDescargar,
  onVolver,
}: {
  expediente: string;
  telMasked: string;
  estado: Estado;
  onDescargar: () => void;
  onVolver: () => void;
}) {
  // Simulación: el trámite avanza con el ciudadano fuera de la web,
  // y el aviso le llega al celular.
  const [estadoSim, setEstadoSim] = useState<Estado>(estado);
  const [alerta, setAlerta] = useState<Estado | null>(null);
  const esFinal = estadoSim === "SE_EMITIO_RESPUESTA";

  function avanzar() {
    const i = indiceEstado(estadoSim);
    if (i >= ESTADOS_ORDENADOS.length - 1) return;
    const siguiente = ESTADOS_ORDENADOS[i + 1];
    setEstadoSim(siguiente);
    setAlerta(siguiente);
  }

  return (
    <div className="flex flex-col items-center gap-8 py-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-fixed text-primary">
        <CircleCheckBig className="h-10 w-10" aria-hidden />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-primary">
          ¡Listo! Te avisaremos
        </h1>
        <p className="text-on-surface-variant">
          Te enviaremos una notificación por SMS o WhatsApp cuando el estado de
          tu trámite cambie. Ya podés cerrar esta página.
        </p>
      </div>

      <section className="card-ambient-shadow w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-6 text-left">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-on-background">
          <FileText className="h-5 w-5 text-secondary" aria-hidden />
          Resumen de suscripción
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-on-surface-variant">Expediente</p>
            <p className="text-lg font-semibold text-on-surface">
              {expediente}
            </p>
          </div>
          <div>
            <p className="text-sm text-on-surface-variant">Número registrado</p>
            <p className="text-lg font-semibold text-on-surface">{telMasked}</p>
          </div>
        </div>
      </section>

      {/* Modo demostración: el aviso llega al celular cuando el trámite avanza */}
      <section className="w-full rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low p-5 text-left">
        <div className="flex items-start gap-2">
          <FlaskConical
            className="mt-0.5 h-5 w-5 shrink-0 text-tertiary"
            aria-hidden
          />
          <div className="flex-1">
            <p className="font-semibold text-on-surface">Modo demostración</p>
            <p className="text-sm text-on-surface-variant">
              Mirá cómo te llega el aviso al celular cuando tu trámite avanza —
              sin que tengas que volver a entrar.
            </p>
          </div>
        </div>

        {alerta && (
          <div className="mt-5">
            <PhoneAlert
              key={alerta}
              expediente={expediente}
              estado={alerta}
              canal={`SMS / WhatsApp · ${telMasked}`}
            />
          </div>
        )}

        <button
          type="button"
          onClick={avanzar}
          disabled={esFinal}
          className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-on-primary transition-colors hover:bg-primary-container focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50"
        >
          <Play className="h-5 w-5" aria-hidden />
          {esFinal
            ? "El trámite llegó a su respuesta final"
            : "Simular avance del trámite"}
        </button>
      </section>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onDescargar}
          className="flex min-h-[56px] items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-high px-6 py-3 font-semibold text-on-surface transition-colors hover:bg-surface-variant"
        >
          <Download className="h-5 w-5" aria-hidden />
          Descargar comprobante
        </button>
        <button
          type="button"
          onClick={onVolver}
          className="flex min-h-[56px] items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-on-secondary transition-colors hover:bg-on-secondary-container"
        >
          <House className="h-5 w-5" aria-hidden />
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
