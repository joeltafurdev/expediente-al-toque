"use client";

import { Accessibility, Eye, Moon, Sun, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import {
  applyFontScale,
  applyTheme,
  readFontScale,
  readTheme,
  type FontScale,
  type Theme,
} from "@/lib/accessibility";

const TAMANOS: { id: FontScale; label: string; sample: string }[] = [
  { id: "normal", label: "Normal", sample: "text-base" },
  { id: "grande", label: "Grande", sample: "text-lg" },
  { id: "mas-grande", label: "Más grande", sample: "text-2xl" },
];

const TEMAS: { id: Theme; label: string; icono: LucideIcon }[] = [
  { id: "claro", label: "Claro", icono: Sun },
  { id: "oscuro", label: "Oscuro", icono: Moon },
  { id: "daltonico", label: "Daltónico", icono: Eye },
];

export function AccessibilityPanel({ onClose }: { onClose: () => void }) {
  const [scale, setScale] = useState<FontScale>(() => readFontScale());
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  function elegirTamano(s: FontScale) {
    setScale(s);
    applyFontScale(s);
  }

  function elegirTema(t: Theme) {
    setTheme(t);
    applyTheme(t);
  }

  return (
    <Modal
      title="Accesibilidad"
      titleIcon={<Accessibility className="h-6 w-6" aria-hidden />}
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="font-semibold text-on-surface">Tamaño del texto</p>
          <div
            role="group"
            aria-label="Tamaño del texto"
            className="mt-3 grid grid-cols-3 gap-3"
          >
            {TAMANOS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => elegirTamano(o.id)}
                aria-pressed={scale === o.id}
                className={`flex min-h-[80px] flex-col items-center justify-center gap-1 rounded-lg border-2 transition-colors ${
                  scale === o.id
                    ? "border-secondary bg-secondary/10"
                    : "border-outline-variant bg-surface-container-low hover:bg-surface-container"
                }`}
              >
                <span className={`font-bold text-primary ${o.sample}`}>A</span>
                <span className="text-sm text-on-surface-variant">
                  {o.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-on-surface">Tema de color</p>
          <div
            role="group"
            aria-label="Tema de color"
            className="mt-3 grid grid-cols-3 gap-3"
          >
            {TEMAS.map(({ id, label, icono: Icono }) => (
              <button
                key={id}
                type="button"
                onClick={() => elegirTema(id)}
                aria-pressed={theme === id}
                className={`flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-lg border-2 transition-colors ${
                  theme === id
                    ? "border-secondary bg-secondary/10"
                    : "border-outline-variant bg-surface-container-low hover:bg-surface-container"
                }`}
              >
                <Icono className="h-6 w-6 text-primary" aria-hidden />
                <span className="text-sm text-on-surface-variant">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-on-surface-variant">
          Tus preferencias se guardan en este dispositivo.
        </p>
      </div>
    </Modal>
  );
}
