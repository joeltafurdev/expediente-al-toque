"use client";

import {
  BellRing,
  CircleHelp,
  FileText,
  KeyRound,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

function Item({
  icono: Icono,
  titulo,
  texto,
}: {
  icono: LucideIcon;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
        <Icono className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <p className="font-semibold text-on-surface">{titulo}</p>
        <p className="text-sm text-on-surface-variant">{texto}</p>
      </div>
    </div>
  );
}

export function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal
      title="¿Cómo usar la plataforma?"
      titleIcon={<CircleHelp className="h-6 w-6" aria-hidden />}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        <Item
          icono={FileText}
          titulo="Tu número de expediente"
          texto="Figura en tu constancia de trámite, con el formato 2026-0000000."
        />
        <Item
          icono={KeyRound}
          titulo="Tu clave de acceso"
          texto="Son los 4 dígitos que te entregaron al registrar tu trámite."
        />
        <Item
          icono={ListChecks}
          titulo="Los estados de tu trámite"
          texto="Recibido → En evaluación → Respuesta final. El tracker te muestra en cuál estás."
        />
        <Item
          icono={BellRing}
          titulo="Avisos a tu celular"
          texto="Dejá tu número y te avisamos cuando tu trámite avance, sin volver a entrar."
        />
      </div>
    </Modal>
  );
}
