const LINKS = [
  "Privacidad",
  "Términos y Condiciones",
  "Contacto",
  "Portal de Transparencia",
];

export function SiteFooter() {
  return (
    <footer className="mt-auto w-full border-t border-outline-variant bg-surface-container-low print:hidden">
      <div className="mx-auto flex max-w-[800px] flex-col items-center gap-3 px-4 py-10 text-center md:px-6">
        <span className="font-bold text-primary">
          © 2026 Despacho Presidencial · Gobierno del Perú
        </span>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-base text-on-surface-variant transition-colors hover:text-secondary"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
