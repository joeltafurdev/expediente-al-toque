"use client";

import { BellRing, Send, Smartphone } from "lucide-react";
import { useState, type FormEvent } from "react";

/**
 * Suscripción a avisos proactivos (el diferenciador).
 * DEMO: el número se enmascara y NO se envía a ningún servicio ni se almacena.
 * En producción requeriría consentimiento y cumplir la Ley 29733.
 */
function enmascarar(tel: string): string {
  const d = tel.replace(/\D/g, "");
  if (d.length < 6) return "+51 ··· ··· ···";
  return `+51 ${d.slice(0, 3)} ··· ${d.slice(-3)}`;
}

export function AlertSubscription({
  onActivate,
}: {
  onActivate: (telMasked: string) => void;
}) {
  const [tel, setTel] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onActivate(enmascarar(tel));
  }

  return (
    <section className="flex flex-col items-center gap-6 rounded-xl border border-primary-fixed-dim/30 bg-primary-fixed p-6 md:flex-row">
      <div className="flex flex-1 flex-col gap-2 text-center md:text-left">
        <h3 className="flex items-center justify-center gap-2 text-xl font-semibold text-on-primary-fixed md:justify-start">
          <BellRing className="h-6 w-6 text-secondary" aria-hidden />
          ¡Te avisamos!
        </h3>
        <p className="text-on-primary-fixed-variant">
          Ingresá tu número para recibir una alerta por SMS o WhatsApp cuando
          haya un avance.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full min-w-0 flex-col gap-3 md:w-auto md:min-w-[280px]"
      >
        <label htmlFor="tel" className="sr-only">
          Número de celular
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-outline">
            <Smartphone className="h-5 w-5" aria-hidden />
          </span>
          <input
            id="tel"
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="off"
            required
            placeholder="Ej: 999 888 777"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            className="w-full rounded-lg border-2 border-outline-variant bg-surface-container-lowest py-3 pl-10 pr-4 text-lg text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-on-secondary shadow-sm transition-colors hover:bg-on-secondary-fixed-variant focus:outline-none focus:ring-4 focus:ring-secondary/30"
        >
          Activar Alertas
          <Send className="h-5 w-5" aria-hidden />
        </button>
      </form>
    </section>
  );
}
