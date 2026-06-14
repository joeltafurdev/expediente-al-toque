import { BellRing, Globe, PiggyBank, type LucideIcon } from "lucide-react";

const BENEFICIOS: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: PiggyBank,
    titulo: "Ahorra tiempo y dinero",
    texto: "No más viajes costosos a la capital (ahorro aprox. S/700).",
  },
  {
    icono: Globe,
    titulo: "Desde cualquier lugar",
    texto: "Accedé desde Puno, Cusco, Piura o cualquier región del país.",
  },
  {
    icono: BellRing,
    titulo: "Avisos automáticos",
    texto: "Te notificamos a tu celular con cada avance del trámite.",
  },
];

export function BenefitsGrid() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-center text-2xl font-semibold text-primary">
        ¿Por qué usar Expediente al Toque?
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {BENEFICIOS.map(({ icono: Icono, titulo, texto }) => (
          <div
            key={titulo}
            className="card-ambient-shadow flex flex-col items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-low p-5 text-center"
          >
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
              <Icono className="h-7 w-7" aria-hidden />
            </div>
            <h3 className="text-base font-semibold text-on-background">
              {titulo}
            </h3>
            <p className="text-base text-on-surface-variant">{texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
