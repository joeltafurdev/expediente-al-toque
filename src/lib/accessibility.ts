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

export type Theme = "claro" | "oscuro" | "daltonico";

const THEME_KEY = "eat-theme";

/** Aplica el tema (override de variables CSS vía data-theme en <html>). */
export function applyTheme(theme: Theme): void {
  if (theme === "claro") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignorar
  }
}

/** Lee el tema guardado en el dispositivo. */
export function readTheme(): Theme {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === "claro" || v === "oscuro" || v === "daltonico") return v;
  } catch {
    // ignorar
  }
  return "claro";
}
