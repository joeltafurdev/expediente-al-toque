# Expediente al Toque

> Asistente conversacional, accesible y **proactivo** para que cualquier ciudadano consulte el estado de su expediente ante el Despacho Presidencial — desde donde esté, a cualquier hora, sin instalar nada ni viajar a Lima.

Prototipo desarrollado para la **Hackatón Transformagob 2026** · Reto del Despacho Presidencial: *"El Despacho Presidencial te responde a cualquier hora y donde estés"*.

---

## El problema

El Despacho Presidencial atiende ~250 consultas/mes; el **65%** proviene de regiones fuera de Lima y el **30%** son consultas repetitivas sobre el mismo expediente. Un ciudadano de provincia gasta entre **S/350 y S/700** y 2–4 días para una consulta presencial.

## La solución

- **Consulta de estado en tiempo real** con expediente + clave.
- **Tracker visual de 3 pasos** (Recibido → En evaluación → Respuesta final), legible de un vistazo.
- **Notificación proactiva**: el ciudadano se suscribe y el sistema le avisa cuando su trámite avanza — ataca de frente el 30% de consultas repetitivas.
- **Comprobante descargable** (constancia de suscripción con QR de verificación).
- **Accesibilidad primero**: alto contraste (WCAG AAA), texto grande, lenguaje claro, pensado para adultos mayores y baja alfabetización digital.

---

## Arquitectura

Patrón **Hexagonal-lite (Ports & Adapters)**: el núcleo de dominio es agnóstico del framework y reutilizable. El detalle completo está en [`ARCHITECTURE.md`](./ARCHITECTURE.md).

```
src/
  core/         Dominio puro (tipos, estados, port). Sin dependencias de framework.
  adapters/     Implementaciones del port: mock (datos de prueba) y live (API real).
  application/  Casos de uso y validación (la clave nunca se persiste ni va a un LLM).
  app/          Next.js: UI (App Router) + Route Handler POST /api/consulta.
  components/   UI por dominio (chat, tracker, notifications, layout, home).
  lib/          Cliente HTTP.
```

**Regla de dependencia:** `app/components → application → core ← adapters`. El `core` no importa Next ni adapters: eso es lo que otra entidad reutiliza.

---

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + design system "Accessible & Ethical" (WCAG AAA, fuente Public Sans)
- **lucide-react** (íconos SVG) · **qrcode.react** (QR del comprobante)
- Despliegue: **Vercel** (app Next.js estándar, no atada a Vercel — corre en cualquier host Node)

## Cómo correrlo

Requisitos: Node ≥ 20 y [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Otros comandos: `pnpm build` (producción) · `pnpm start` (servir build) · `pnpm lint`.

### Variables de entorno

Creá un archivo `.env.local` (opcional; por defecto usa datos de prueba):

```bash
# "mock" (default): datos de prueba, demo estable sin internet
# "live": consume la API real del Despacho (requiere confirmar el contrato)
DATA_SOURCE=mock

# Solo con DATA_SOURCE=live:
# EXPEDIENTE_API_URL=https://www.presidencia.gob.pe/api/consulta-expedientes/index.php
```

### Conectar la API real (mock → live)

Toda la integración está aislada en un único adapter. Para pasar a la API real:

1. Confirmá el contrato exacto (método, campos, formato de respuesta y errores) con el área de TI de la entidad.
2. Ajustá `src/adapters/live-expediente.repo.ts` a ese contrato.
3. Cambiá `DATA_SOURCE=live`.

No se modifica nada del dominio ni de la UI.

### Datos de prueba

Provistos por la entidad. Los nombres reales se omiten (minimización de datos).

| Estado | Expediente | Clave |
|---|---|---|
| Documento registrado | 2026-0003984 | 2851 |
| En proceso | 2026-0010582 | 4176 |
| Se emitió respuesta | 2026-0012476 | 9634 |

---

## Ética y manejo de datos

- **PII fuera de la IA generativa.** La consulta (expediente + clave) va directo al adapter de datos; nunca a un LLM.
- **La clave no se almacena ni se loguea**: se usa solo en tránsito para la consulta.
- **Sin datos personales reales.** Solo datos de prueba provistos por la entidad.
- **Notificaciones simuladas.** El número de celular se enmascara y **no se envía a ningún servicio ni se almacena** (solo vive en el navegador). En producción requeriría consentimiento y cumplir la **Ley N° 29733** (Protección de Datos Personales).
- **Sin geolocalización por IP.** Cualquier métrica futura usaría datos agregados y anonimizados.
- **Uso de IA generativa declarado.** Ver [`DECLARACION-IA-GENERATIVA.md`](./DECLARACION-IA-GENERATIVA.md) (conforme a las Bases §17).

## Reutilización (Software Público)

Núcleo abierto y documentado, sin dependencia obligatoria de un proveedor específico. Alineado con el **artículo 29 del DL 1412** (Ley de Gobierno Digital): el mismo asistente sirve a cualquier entidad con una API de seguimiento de trámites — solo se escribe un nuevo adapter.

## Licencia

[MIT](./LICENSE) — uso, modificación y redistribución libres, en beneficio del Estado peruano y la ciudadanía.

---

> **Aviso.** Prototipo de carácter demostrativo desarrollado durante la Hackatón Transformagob 2026. Usa datos de prueba; el código de verificación del comprobante y las notificaciones son simulados a fines de la demo.
