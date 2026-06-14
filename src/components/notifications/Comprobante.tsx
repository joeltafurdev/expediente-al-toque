"use client";

import { ArrowLeft, Download, Info, Landmark, MessageSquare } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export type DatosComprobante = {
  expediente: string;
  telMasked: string;
  canal: string;
  fecha: string;
  hora: string;
  codigo: string;
};

/**
 * Constancia de Suscripción de Alertas Digitales (comprobante descargable).
 * "Descargar PDF" usa window.print() → el navegador guarda como PDF.
 * El QR se genera en el cliente (sin pedidos externos, funciona offline).
 */
export function Comprobante({
  datos,
  onVolver,
}: {
  datos: DatosComprobante;
  onVolver: () => void;
}) {
  const { expediente, telMasked, canal, fecha, hora, codigo } = datos;

  return (
    <div className="mx-auto w-full max-w-[800px]">
      <article className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_10px_40px_-10px_rgba(0,30,64,0.12)] print:shadow-none">
        <div aria-hidden className="absolute left-0 top-0 h-2 w-full bg-primary" />
        <div className="mt-2 flex flex-col gap-6 p-6 md:p-12">
          <header className="flex flex-col items-center gap-3 border-b border-surface-variant pb-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-primary">
              <Landmark className="h-8 w-8" aria-hidden />
            </div>
            <h1 className="text-2xl font-bold text-primary md:text-3xl">
              Constancia de Suscripción de Alertas Digitales
            </h1>
            <p className="text-on-surface-variant">
              Despacho Presidencial · Plataforma Digital
            </p>
          </header>

          <div className="flex items-start gap-3 rounded-r-lg border-l-4 border-secondary bg-surface-container-low p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
            <p className="text-on-surface">
              Este documento confirma que recibirás notificaciones automáticas
              ante cualquier cambio en el estado de tu expediente.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 py-2 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Datos del trámite
              </h2>
              <div className="rounded-lg border border-outline-variant p-4">
                <span className="mb-1 block text-sm text-on-surface-variant">
                  Número de expediente
                </span>
                <span className="text-2xl font-semibold text-on-surface">
                  {expediente}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Datos de la alerta
              </h2>
              <div className="flex flex-col gap-2 rounded-lg border border-outline-variant p-4">
                <div className="flex items-center justify-between border-b border-surface-variant pb-2">
                  <span className="text-sm text-on-surface-variant">Canal</span>
                  <span className="flex items-center gap-1 font-semibold text-on-surface">
                    <MessageSquare
                      className="h-4 w-4 text-secondary"
                      aria-hidden
                    />
                    {canal}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-surface-variant pb-2">
                  <span className="text-sm text-on-surface-variant">
                    Número registrado
                  </span>
                  <span className="text-on-surface">{telMasked}</span>
                </div>
                <div className="flex items-start justify-between pt-1">
                  <span className="text-sm text-on-surface-variant">
                    Activación
                  </span>
                  <span className="text-right text-on-surface">
                    {fecha}
                    <br />
                    {hora} hrs
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 border-t border-surface-variant pt-6 text-center">
            <div
              role="img"
              aria-label="Código QR de verificación del comprobante"
              className="rounded-md border border-outline-variant bg-white p-2"
            >
              <QRCodeSVG
                value={`DP|${codigo}|${expediente}`}
                size={120}
                level="M"
                fgColor="#001e40"
                bgColor="#ffffff"
              />
            </div>
            <div>
              <span className="block text-sm text-on-surface-variant">
                Código de verificación único
              </span>
              <span className="mt-1 inline-block rounded-md bg-surface-container px-3 py-1 font-semibold tracking-widest text-on-surface">
                {codigo}
              </span>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-on-secondary shadow-sm transition-colors hover:bg-on-secondary-container"
        >
          <Download className="h-5 w-5" aria-hidden />
          Descargar PDF
        </button>
        <button
          type="button"
          onClick={onVolver}
          className="flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-outline-variant bg-surface-container-high px-6 py-3 font-semibold text-on-surface transition-colors hover:bg-surface-variant"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
          Volver
        </button>
      </div>
    </div>
  );
}
