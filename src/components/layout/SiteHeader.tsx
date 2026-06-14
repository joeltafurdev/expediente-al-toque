import { Accessibility, ArrowLeft, CircleHelp, Landmark } from "lucide-react";

/** Barra superior institucional. Con onBack muestra flecha de volver. */
export function SiteHeader({ onBack }: { onBack?: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface shadow-sm">
      <div className="mx-auto flex h-16 max-w-[800px] items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Volver"
              className="-ml-2 flex items-center rounded-full p-2 text-primary transition-colors hover:bg-surface-container"
            >
              <ArrowLeft className="h-6 w-6" aria-hidden />
            </button>
          ) : (
            <Landmark className="h-7 w-7 text-primary" aria-hidden />
          )}
          <span className="text-xl font-bold text-primary">
            Expediente al Toque
          </span>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Ayuda"
            className="flex items-center rounded-full p-2 text-primary transition-colors hover:bg-surface-container"
          >
            <CircleHelp className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Opciones de accesibilidad"
            className="flex items-center rounded-full p-2 text-primary transition-colors hover:bg-surface-container"
          >
            <Accessibility className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
