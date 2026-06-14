"use client";

import { Clock, Headset, Mail, MessageSquare, Phone, X } from "lucide-react";
import { useEffect, useRef } from "react";

// Canales de contacto de ejemplo para el prototipo.
const WHATSAPP_NUM = "51999888777";
const TELEFONO = "+5116305600";
const EMAIL = "atencion@despacho.gob.pe";

export function AsesorModal({
  expediente,
  onClose,
}: {
  expediente: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const mensajeWa = encodeURIComponent(
    `Hola, necesito ayuda con mi expediente ${expediente}.`,
  );

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="asesor-title"
        onClick={(e) => e.stopPropagation()}
        className="toast-in w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
              <Headset className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <h2 id="asesor-title" className="text-xl font-bold text-primary">
                Hablar con un asesor
              </h2>
              <p className="text-sm text-on-surface-variant">
                Sobre tu expediente {expediente}
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <p className="mt-4 text-on-surface">
          Un asesor del Despacho Presidencial puede ayudarte. Elegí el canal que
          prefieras:
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUM}?text=${mensajeWa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[56px] items-center gap-3 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-semibold text-on-surface transition-colors hover:bg-surface-container"
          >
            <MessageSquare className="h-5 w-5 text-secondary" aria-hidden />
            Escribir por WhatsApp
          </a>
          <a
            href={`tel:${TELEFONO}`}
            className="flex min-h-[56px] items-center gap-3 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-semibold text-on-surface transition-colors hover:bg-surface-container"
          >
            <Phone className="h-5 w-5 text-secondary" aria-hidden />
            Llamar a mesa de partes
          </a>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Consulta expediente ${expediente}`)}`}
            className="flex min-h-[56px] items-center gap-3 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-semibold text-on-surface transition-colors hover:bg-surface-container"
          >
            <Mail className="h-5 w-5 text-secondary" aria-hidden />
            Enviar un correo
          </a>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-on-surface-variant">
          <Clock className="h-4 w-4 shrink-0" aria-hidden />
          Atención de lunes a viernes, 8:30 a 16:30.
        </div>

        <p className="mt-3 text-xs text-on-surface-variant">
          Canales de contacto de ejemplo para el prototipo.
        </p>
      </div>
    </div>
  );
}
