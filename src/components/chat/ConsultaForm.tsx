"use client";

import { ArrowRight, Info, Loader2, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";

/** Formulario accesible: labels visibles, ayuda con ejemplos, target ≥56px. */
export function ConsultaForm({
  onSubmit,
  loading,
}: {
  onSubmit: (expediente: string, clave: string) => void;
  loading: boolean;
}) {
  const [expediente, setExpediente] = useState("");
  const [clave, setClave] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(expediente, clave);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="expediente"
          className="text-base font-semibold text-on-surface"
        >
          Número de expediente
        </label>
        <input
          id="expediente"
          name="expediente"
          type="text"
          inputMode="text"
          autoComplete="off"
          required
          placeholder="Ej: 2026-0010582"
          value={expediente}
          onChange={(e) => setExpediente(e.target.value)}
          className="w-full rounded-lg border-2 border-outline-variant bg-surface px-4 py-3 text-lg text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
        />
        <span className="flex items-center gap-1 text-sm text-on-surface-variant">
          <Info className="h-4 w-4" aria-hidden />
          Ejemplo: 2026-0010582 (12 caracteres)
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="clave"
          className="text-base font-semibold text-on-surface"
        >
          Clave de acceso
        </label>
        <input
          id="clave"
          name="clave"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          maxLength={4}
          required
          placeholder="••••"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="w-full max-w-[200px] rounded-lg border-2 border-outline-variant bg-surface px-4 py-3 text-lg tracking-widest text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
        />
        <span className="flex items-center gap-1 text-sm text-on-surface-variant">
          <Lock className="h-4 w-4" aria-hidden />
          Ingresá los 4 dígitos
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-base font-semibold text-on-secondary shadow-sm transition-colors hover:bg-on-secondary-container focus:outline-none focus:ring-4 focus:ring-secondary/30 disabled:opacity-50 md:w-auto md:self-end"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Consultando…
          </>
        ) : (
          <>
            Consultar Estado
            <ArrowRight className="h-5 w-5" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
