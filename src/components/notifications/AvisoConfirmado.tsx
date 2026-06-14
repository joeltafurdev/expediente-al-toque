import { CircleCheckBig, Download, FileText, House } from "lucide-react";

/** Pantalla de confirmación de suscripción a avisos. */
export function AvisoConfirmado({
  expediente,
  telMasked,
  onDescargar,
  onVolver,
}: {
  expediente: string;
  telMasked: string;
  onDescargar: () => void;
  onVolver: () => void;
}) {
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
          tu trámite cambie.
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

      <section className="w-full rounded-xl border-l-4 border-primary bg-primary-fixed p-5 text-left">
        <h3 className="mb-1 font-semibold text-on-primary-fixed">
          ¿Qué sigue ahora?
        </h3>
        <p className="text-on-primary-fixed-variant">
          Mantené tu teléfono activo. Cuando se emita la respuesta de tu
          trámite, te enviaremos el aviso para que no tengas que volver a
          consultar. ¡Gracias por usar nuestros servicios digitales!
        </p>
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
