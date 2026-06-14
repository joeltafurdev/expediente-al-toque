"use client";

import { Accessibility } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { applyFontScale, readFontScale, type FontScale } from "@/lib/accessibility";

const OPCIONES: { id: FontScale; label: string; sample: string }[] = [
  { id: "normal", label: "Normal", sample: "text-base" },
  { id: "grande", label: "Grande", sample: "text-lg" },
  { id: "mas-grande", label: "Más grande", sample: "text-2xl" },
];

export function AccessibilityPanel({ onClose }: { onClose: () => void }) {
  const [scale, setScale] = useState<FontScale>(() => readFontScale());

  function elegir(s: FontScale) {
    setScale(s);
    applyFontScale(s);
  }

  return (
    <Modal
      title="Accesibilidad"
      titleIcon={<Accessibility className="h-6 w-6" aria-hidden />}
      onClose={onClose}
    >
      <p className="text-on-surface">
        Ajustá el tamaño del texto de toda la página.
      </p>
      <div
        role="group"
        aria-label="Tamaño del texto"
        className="mt-4 grid grid-cols-3 gap-3"
      >
        {OPCIONES.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => elegir(o.id)}
            aria-pressed={scale === o.id}
            className={`flex min-h-[80px] flex-col items-center justify-center gap-1 rounded-lg border-2 transition-colors ${
              scale === o.id
                ? "border-secondary bg-secondary/10"
                : "border-outline-variant bg-surface-container-low hover:bg-surface-container"
            }`}
          >
            <span className={`font-bold text-primary ${o.sample}`}>A</span>
            <span className="text-sm text-on-surface-variant">{o.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-on-surface-variant">
        Tu preferencia se guarda en este dispositivo.
      </p>
    </Modal>
  );
}
