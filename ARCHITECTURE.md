# Arquitectura — Expediente al Toque

> Documento de arquitectura técnica. Acompaña al [PRD](./PRD.md).
> Stack: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui · Deploy: Vercel (free)

---

## 1. Patrón: Hexagonal-lite (Ports & Adapters)

El requisito de alternar entre datos de prueba (`mock`) y la API real (`live`) **ya obliga** a una costura entre la lógica de negocio y el origen de datos. En vez de un `if` disperso, se formaliza como un **port** (interfaz) con dos **adapters** (implementaciones).

**Por qué, no solo qué:**
- **Núcleo reutilizable y agnóstico del framework** → puntúa el criterio de Apertura (20%): otra entidad con su propia API de trámites reusa el `core` y escribe su adapter.
- **Demo estable** → el adapter `mock` corre sin internet (cumple Bases §19, "ambientes simulados").
- **Integración real trivial** → cuando el mentor de TI confirme el contrato, solo se completa el adapter `live`. Cero cambios en el dominio ni en la UI.

Es hexagonal **lite**: las costuras justas para este alcance, no una implementación enterprise con capas de más.

---

## 2. Estructura de carpetas

```
/src
  /core                       ← DOMINIO (puro: sin Next, sin librerías de framework)
    expediente.ts             ← tipos: Expediente, Estado (los 3 estados)
    estado.ts                 ← normalización de estados + transiciones válidas
    ports.ts                  ← interface ExpedienteRepository (el "port")
  /adapters                   ← INFRAESTRUCTURA (implementan los ports)
    mock-expediente.repo.ts   ← 6 expedientes de prueba (nombres enmascarados)
    live-expediente.repo.ts   ← POST al endpoint real (pendiente de contrato)
    repository.factory.ts     ← devuelve mock|live según env DATA_SOURCE
  /application                ← ORQUESTADOR / casos de uso
    consultar-estado.ts       ← caso de uso: valida → port → normaliza
    seguridad.ts              ← no loguea la clave; ninguna PII va a un LLM
  /app                        ← NEXT.JS (presentación + entrypoints HTTP)
    /api/consulta/route.ts    ← Route Handler: fino, delega a /application
    /(citizen)/page.tsx       ← chat + tracker (ciudadano)
    /admin/page.tsx           ← dashboard de métricas (stretch), protegido por env password
    globals.css               ← tokens del design system
  /components                 ← UI (patrón container / presentational)
    /ui                       ← primitivos shadcn/ui
    /chat                     ← ChatWindow, MessageBubble, ConsultaForm
    /tracker                  ← StatusTracker (stepper de 3 pasos)
    /notifications            ← ProactiveBanner
    /dashboard                ← StatCard, PeakHoursChart, PeruHeatMap
```

### Regla de dependencia (innegociable)

```
app / components  →  application  →  core  ←  adapters
```

El `core` **no importa** Next, ni los adapters, ni nada de UI. Solo TypeScript puro. Esa es la pieza reutilizable.

---

## 3. Contrato del port

```ts
// core/ports.ts
export interface ExpedienteRepository {
  getStatus(expediente: string, clave: string): Promise<ExpedienteStatus>;
}

// core/expediente.ts
export type Estado =
  | "DOCUMENTO_REGISTRADO"
  | "EN_PROCESO"
  | "SE_EMITIO_RESPUESTA";

export type ExpedienteStatus =
  | { ok: true; estado: Estado }
  | { ok: false; motivo: "NO_ENCONTRADO" | "CLAVE_INVALIDA" };
```

El adapter `live` traduce la respuesta real de la API a este tipo. El adapter `mock` lee los 6 expedientes de prueba. La UI y el orquestador solo conocen `ExpedienteStatus`, nunca el formato crudo de la API.

---

## 4. Flujo de una consulta

1. `ConsultaForm` (UI) → `POST /api/consulta` con `{ expediente, clave }`.
2. Route Handler → `consultarEstado(expediente, clave)` en `/application`.
3. El caso de uso valida formato (`2026-XXXXXXX` + 4 dígitos) y llama al `port`.
4. `repository.factory` devuelve el adapter `mock` o `live` según `DATA_SOURCE`.
5. Se normaliza a uno de los 3 estados → respuesta a la UI.
6. **Seguridad:** la clave nunca se loguea ni persiste; ningún dato pasa por un LLM.

---

## 5. Sistema de diseño (WCAG AAA)

Fuente: skill `ui-ux-pro-max`, estilo *"Accessible & Ethical"*. Detalle completo en [`design-system/MASTER.md`](./design-system/MASTER.md).

| Elemento | Decisión |
|---|---|
| Estilo | Accessible & Ethical — alto contraste, texto grande (16px+), focus visible |
| Paleta | Primary `#0F172A` · CTA `#0369A1` · fondo `#F8FAFC` · foreground `#020617` · error `#DC2626` |
| Tipografía | **Lexend** (títulos) + **Source Sans 3** (cuerpo) |
| Layout | Una sola columna, mobile-first, CTA grande, mucho whitespace |
| Evitar | Ornamentación, bajo contraste, motion excesivo, gradientes AI purple/pink |

**Decisiones para el usuario objetivo (adulto mayor, baja alfabetización):**
- **Tracker** de 3 pasos con **texto + icono**, no solo color (regla `color-not-only`).
- **Banner proactivo** con `aria-live="polite"` — anuncia sin robar el foco.
- Touch targets ≥ 44×44px; `prefers-reduced-motion` respetado.

---

## 6. Visualización del dashboard (stretch)

Librería: **Recharts** (charts) + **react-simple-maps** (mapa). Datos **sintéticos**.

| Métrica | Chart | Accesibilidad |
|---|---|---|
| Total de consultas / por estado | KPI cards | Valor siempre visible (grado AAA) |
| Horarios de mayor frecuencia | Bar chart por hora | Ejes etiquetados, tooltip por tap |
| Distribución geográfica | Choropleth del Perú por departamento | Tabla ordenable como fallback (sin IPs) |

---

## 7. Mapa a la rúbrica

| Decisión arquitectónica | Criterio que refuerza |
|---|---|
| Núcleo agnóstico del framework + adapters | Apertura / reutilización (20%) |
| Adapter `mock` para demo offline | Prototipo funcional y viabilidad (30%) |
| Clave nunca persistida, PII fuera del LLM | Ética digital (20%) |
| Design system WCAG AAA | Calidad frente al desafío (35%) + Presentación (15%) |
