"use client";

import { Headset, Info, Search } from "lucide-react";
import { useState } from "react";
import { consultarExpediente } from "@/lib/client";
import type { ConsultaError, ExpedienteStatus } from "@/core/expediente";
import { ESTADO_LABEL } from "@/core/estado";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BenefitsGrid } from "@/components/home/BenefitsGrid";
import { StatusTracker } from "@/components/tracker/StatusTracker";
import { InfoBanner } from "@/components/notifications/InfoBanner";
import { AlertSubscription } from "@/components/notifications/AlertSubscription";
import { AvisoConfirmado } from "@/components/notifications/AvisoConfirmado";
import { Comprobante } from "@/components/notifications/Comprobante";
import { ConsultaForm } from "./ConsultaForm";

type Vista = "inicio" | "estado" | "aviso" | "comprobante";

/** Genera un código de verificación de demo (no validado contra backend). */
function generarCodigo(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (n: number) =>
    Array.from(
      { length: n },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  return `DP-${pick(3)}-${pick(4)}`;
}

const MENSAJE_ERROR: Record<ConsultaError, string> = {
  FORMATO_INVALIDO:
    "Revisá los datos: el expediente tiene el formato 2026-0000000 y la clave son 4 dígitos.",
  CLAVE_INVALIDA:
    "La clave no coincide con ese expediente. Verificá los 4 dígitos e intentá de nuevo.",
  NO_ENCONTRADO:
    "No encontramos ese expediente. Verificá el número e intentá de nuevo.",
};

const MAIN_CLASS =
  "mx-auto flex w-full max-w-[800px] flex-1 flex-col px-4 md:px-6";

export function ChatExperience() {
  const [vista, setVista] = useState<Vista>("inicio");
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState<ExpedienteStatus | null>(null);
  const [errorTexto, setErrorTexto] = useState<string | null>(null);
  const [expediente, setExpediente] = useState("");
  const [telMasked, setTelMasked] = useState("");
  const [datosAlerta, setDatosAlerta] = useState<{
    fecha: string;
    hora: string;
    codigo: string;
  } | null>(null);

  async function consultar(exp: string, clave: string) {
    setCargando(true);
    setErrorTexto(null);
    try {
      const r = await consultarExpediente(exp, clave);
      if (r.ok) {
        setResultado(r);
        setExpediente(exp.trim());
        setVista("estado");
      } else {
        setErrorTexto(MENSAJE_ERROR[r.motivo]);
      }
    } catch {
      setErrorTexto(
        "No pudimos conectar. Revisá tu conexión e intentá de nuevo.",
      );
    } finally {
      setCargando(false);
    }
  }

  function activarAlertas(tel: string) {
    const ahora = new Date();
    setTelMasked(tel);
    setDatosAlerta({
      fecha: new Intl.DateTimeFormat("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(ahora),
      hora: new Intl.DateTimeFormat("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(ahora),
      codigo: generarCodigo(),
    });
    setVista("aviso");
  }

  // Vista: comprobante descargable (constancia de suscripción)
  if (vista === "comprobante" && resultado?.ok && datosAlerta) {
    return (
      <main className={`${MAIN_CLASS} py-8`}>
        <Comprobante
          datos={{
            expediente,
            telMasked,
            canal: "SMS / WhatsApp",
            fecha: datosAlerta.fecha,
            hora: datosAlerta.hora,
            codigo: datosAlerta.codigo,
          }}
          onVolver={() => setVista("aviso")}
        />
      </main>
    );
  }

  // Vista: confirmación de suscripción a avisos
  if (vista === "aviso" && resultado?.ok) {
    return (
      <>
        <SiteHeader onBack={() => setVista("estado")} />
        <main className={`${MAIN_CLASS} py-8`}>
          <AvisoConfirmado
            expediente={expediente}
            telMasked={telMasked}
            onDescargar={() => setVista("comprobante")}
            onVolver={() => setVista("inicio")}
          />
        </main>
      </>
    );
  }

  // Vista: estado del expediente
  if (vista === "estado" && resultado?.ok) {
    const estado = resultado.estado;
    return (
      <>
        <SiteHeader onBack={() => setVista("inicio")} />
        <main className={`${MAIN_CLASS} gap-8 py-8`}>
          <section className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-primary">
              Estado de tu Expediente
            </h1>
            <p className="text-on-surface-variant">
              Revisá el progreso actual y los próximos pasos de tu trámite.
            </p>
          </section>

          <section className="card-ambient-shadow rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Expediente N°
                </span>
                <span className="text-2xl font-bold text-primary">
                  {expediente}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary-container px-4 py-2 font-semibold text-on-primary-container">
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 rounded-full bg-secondary-fixed ${estado === "EN_PROCESO" ? "timeline-pulse" : ""}`}
                />
                {ESTADO_LABEL[estado]}
              </div>
            </div>
            <div className="my-6 h-px w-full bg-outline-variant/50" />
            <StatusTracker estado={estado} />
          </section>

          <InfoBanner estado={estado} />

          {estado !== "SE_EMITIO_RESPUESTA" && (
            <AlertSubscription onActivate={activarAlertas} />
          )}

          <section className="mt-2 flex flex-col items-center gap-4 border-t border-outline-variant/50 py-6">
            <p className="text-on-surface-variant">
              ¿Tenés dudas sobre tu expediente?
            </p>
            <button
              type="button"
              className="flex min-h-[56px] items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-high px-6 py-3 font-semibold text-on-surface transition-colors hover:bg-surface-variant"
            >
              <Headset className="h-5 w-5" aria-hidden />
              Hablar con un asesor
            </button>
          </section>
        </main>
      </>
    );
  }

  // Vista: inicio
  return (
    <>
      <SiteHeader />
      <main className={`${MAIN_CLASS} gap-12 py-12`}>
        <section className="card-ambient-shadow assistant-border flex flex-col items-start gap-6 rounded-xl bg-surface-container-lowest p-6 md:flex-row">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary-fixed-dim bg-primary-fixed text-primary">
            <Headset className="h-9 w-9" aria-hidden />
          </div>
          <div>
            <h1 className="mb-3 text-2xl font-bold text-primary md:text-3xl">
              Hola, soy tu asistente del Despacho Presidencial.
            </h1>
            <p className="text-on-surface-variant">
              Te ayudaré a consultar tu trámite de forma rápida, segura y
              oficial, sin que tengas que viajar a Lima. Ingresá tus datos a
              continuación.
            </p>
          </div>
        </section>

        <section className="card-ambient-shadow rounded-xl bg-surface-container-lowest p-6">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-on-background">
            <Search className="h-6 w-6 text-secondary" aria-hidden />
            Buscar expediente
          </h2>
          <ConsultaForm onSubmit={consultar} loading={cargando} />
          {errorTexto && (
            <div
              role="alert"
              className="mt-5 flex items-start gap-2 rounded-lg border-l-4 border-error bg-error-container/40 p-4 text-on-error-container"
            >
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <p>{errorTexto}</p>
            </div>
          )}
        </section>

        <BenefitsGrid />
      </main>
    </>
  );
}
