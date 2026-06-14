export type FontScale = "normal" | "grande" | "mas-grande";

const SIZES: Record<FontScale, string> = {
  normal: "100%",
  grande: "112.5%",
  "mas-grande": "125%",
};

const KEY = "eat-font-scale";

/** Aplica el tamaño de texto a toda la página (escala las unidades rem). */
export function applyFontScale(scale: FontScale): void {
  document.documentElement.style.fontSize = SIZES[scale];
  try {
    localStorage.setItem(KEY, scale);
  } catch {
    // localStorage puede no estar disponible; no es crítico.
  }
}

/** Lee la preferencia guardada en el dispositivo. */
export function readFontScale(): FontScale {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "normal" || v === "grande" || v === "mas-grande") return v;
  } catch {
    // ignorar
  }
  return "normal";
}
