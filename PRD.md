# PRD — Expediente al Toque

> **Documento de Requisitos de Producto (PRD)**
> Hackatón Transformagob 2026 · Reto: *"El Despacho Presidencial te responde a cualquier hora y donde estés"*
> Entidad proponente: Despacho Presidencial — Lab OGTIC DP
> Estado: Borrador v1 · Día 2 (13-jun-2026) · Entrega: 14-jun-2026 vía Facilita Perú
>
> **Equipo:** GEARJOEDEV · **Nombre del proyecto (confirmado):** Expediente al Toque.

---

## 1. Resumen ejecutivo

Asistente conversacional web, accesible y **proactivo**, que permite a cualquier ciudadano consultar el estado de su expediente ante el Despacho Presidencial, entender qué paso sigue y recibir un aviso cuando su trámite cambia de estado — desde cualquier lugar, a cualquier hora, sin instalar nada ni viajar a Lima.

**La apuesta diferencial:** pasar de un modelo **reactivo** (el ciudadano pregunta una y otra vez) a uno **proactivo** (el sistema le avisa cuando hay novedad). Esto ataca de frente el dato duro del reto: **30% de las consultas son repetitivas sobre el mismo expediente.**

---

## 2. Problema y contexto

| Dato | Valor (fuente: Ficha 11) |
|---|---|
| Consultas mensuales al Despacho | ~250 |
| Provienen de regiones fuera de Lima | 65% |
| Tiempo promedio de respuesta (canal presencial) | 15 días hábiles |
| Consultas repetitivas sobre el mismo expediente | 30% |
| Costo de una consulta presencial (ciudadano de Puno) | S/350–S/700 + 2 a 4 días |

**Cita del usuario (Ficha 11):** *"Trabajo todo el día y se me hace difícil acercarme a las oficinas para consultar mi expediente. Sería mucho más práctico poder revisar el estado de mi trámite desde mi celular, en cualquier momento."*

**Situación hoy:** dependencia de atención presencial y horarios de oficina; barreras geográficas y tecnológicas; acumulación de consultas en mesa de partes.

**Situación deseada:** que todo ciudadano conozca de forma clara y oportuna el estado de su trámite y sepa qué sigue, desde cualquier lugar y momento, sin depender de terceros.

---

## 3. Usuario objetivo

**Persona primaria — Ciudadano de provincia.** Vive fuera de Lima, tiene un trámite en curso, hoy debe llamar o viajar para saber su estado. Prioriza simplicidad y certeza por encima de funciones avanzadas.

**Consideraciones de accesibilidad (insights del Lab):**
- Adultos mayores y personas con baja alfabetización digital → UI de un vistazo, sin jerga.
- No instalar apps pesadas (restricción explícita del reto) → canal web sin fricción.
- Calidad del canal digital ≥ calidad del canal presencial (Insight 3): si la experiencia es inferior, el ciudadano vuelve a la ventanilla aunque eso implique viajar.

---

## 4. Objetivos y métricas de éxito

| Objetivo del producto | Indicador (para el pitch / roadmap) |
|---|---|
| Eliminar viajes y llamadas para consultar estado | Tiempo y dinero devuelto al ciudadano (S/350–700 y 2–4 días por consulta evitada) |
| Reducir consultas repetitivas | −30% de consultas repetidas vía notificación proactiva |
| Atención sin horario | Disponibilidad 24/7 sin ampliar planilla |
| Inclusión | Flujo legible para adultos mayores; roadmap de lenguas originarias y voz |

**Métrica de éxito de la hackatón (lo que realmente puntúa):** un demo que **funciona de verdad** (no mockup estático) + el salto a notificación proactiva + cumplimiento de apertura y ética.

---

## 5. Alcance

### 5.1 Dentro del MVP (lo que se construye)

1. **Consulta de estado de expediente** — el ciudadano ingresa `expediente + clave` y recibe el estado actual.
2. **Tracker visual de 3 pasos** — barra de progreso `Registrado → En proceso → Respuesta lista`, legible de un vistazo.
3. **Notificación proactiva (simulada)** — el sistema avisa cuando el expediente cambia de estado, con foco en el aviso de oro: *"✅ Ya se emitió respuesta a tu expediente"*.
4. **Repositorio público** — GitHub público, licencia MIT, README y Declaración de uso de IA generativa.
5. **Presentación (.pdf)** — PPT con demo grabado embebido.

### 5.2 Stretch — Dashboard administrativo (solo si el núcleo queda cerrado)

Panel de métricas para la **entidad** (no para el ciudadano). Se construye únicamente **después** de que el núcleo (RF-01 a RF-05) esté sólido. Si no hay tiempo, pasa a mockup estático en el PPT + slide de roadmap.

- Ruta `/admin` protegida por un único password en env var (sin sistema de usuarios/roles).
- Métricas con **datos sintéticos agregados** (no se capturan IPs ni datos personales reales):
  - Cantidad total de consultas y distribución por estado.
  - Horarios de mayor frecuencia de consultas.
  - Mapa de calor del Perú **por departamento** (cuenta la historia del 65% de provincias).
- Criterio de aceptación: el panel renderiza las 3 vistas con datos sintéticos; el acceso queda bloqueado sin el password.

**Restricción ética (obligatoria):** prohibido capturar/almacenar IPs reales o geolocalizar ciudadanos. Una IP es dato personal bajo la **Ley 29733**; con usuarios reales requeriría base legal y agregación/anonimización. En producción (roadmap), cualquier geolocalización sería agregada y anonimizada conforme a la Ley 29733.

### 5.3 Fuera de alcance (NO se construye en la hackatón)

- Canal WhatsApp.
- Notas de voz / entrada por voz.
- Lenguas originarias (Quechua / Aymara).
- RAG / orientación automática sobre el TUPA.
- Notificación proactiva real (push/email/SMS en producción).

### 5.4 Roadmap (va al slide de continuidad, no al código)

- **Fase 1 — Piloto** en el Despacho Presidencial con la consulta de estado real.
- **Fase 2 — Inclusión:** lenguas originarias + voz + canal WhatsApp como *adapter*.
- **Fase 3 — Escala:** orientación sobre requisitos (RAG/TUPA), notificación proactiva real, replicación en otras entidades vía Software Público Peruano (DL 1412 art. 29) e integración con PIDE.

---

## 6. Requisitos funcionales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RF-01 | Consultar estado por `expediente + clave` | Dado un expediente válido de prueba, el sistema devuelve uno de los 3 estados en < 2s |
| RF-02 | Manejo de error de credenciales | Clave incorrecta o expediente inexistente → mensaje claro y accionable, sin filtrar datos |
| RF-03 | Tracker visual de 3 pasos | El estado actual se refleja visualmente; comprensible sin leer texto largo |
| RF-04 | Notificación proactiva simulada | Acción "simular cambio de estado" dispara el aviso correspondiente a la transición |
| RF-05 | Estados soportados | `DOCUMENTO REGISTRADO` → `EN PROCESO` → `SE EMITIÓ RESPUESTA` |

**Datos de prueba (Ficha 11) — nombres enmascarados en repo y capturas:**

| Estado | Expediente | Clave |
|---|---|---|
| DOCUMENTO REGISTRADO | 2026-0003984 | 2851 |
| EN PROCESO | 2026-0010582 | 4176 |
| SE EMITIÓ RESPUESTA | 2026-0012476 | 9634 |

---

## 7. Requisitos no funcionales

| Categoría | Requisito |
|---|---|
| **Seguridad / PII** | La combinación `expediente + clave` se usa solo en tránsito para la consulta; nunca se almacena ni se envía a ningún LLM (cumple Bases §17). |
| **Privacidad** | Sin datos personales reales. Solo datos de prueba provistos por la entidad; nombres enmascarados en repo y PPT. |
| **No probing** | No se prueba/escanea el endpoint de producción sin autorización (Bases §19). El contrato real se obtiene del mentor de TI. |
| **Sin geolocalización por IP** | El dashboard (stretch) usa datos sintéticos agregados por departamento. Prohibido capturar/almacenar IPs reales (Ley 29733, Bases §16). |
| **Accesibilidad** | Alto contraste, fuentes grandes, lenguaje simple, tracker visual sin dependencia de lectura. |
| **Apertura** | Núcleo en licencia abierta (MIT), documentado, sin dependencia obligatoria de un proveedor específico (Bases §14). |
| **Portabilidad** | App Next.js estándar, desplegable en cualquier host Node — Vercel es solo el deploy del demo, no una dependencia. |
| **Rendimiento del demo** | Demo estable sin internet en vivo (data source mock); video de respaldo grabado. |

---

## 8. Arquitectura (resumen)

```
   Ciudadano
       │
       ▼
   Next.js (App Router) — deploy único en Vercel free
   ├── UI: chat web + tracker visual (accesible)
   └── Route Handlers (/app/api/...) = orquestador / proxy
            │
            ▼
   /lib/orchestrator  ← NÚCLEO REUTILIZABLE
   - getExpedienteStatus(expediente, clave)
   - normalización de los 3 estados
   - capa de seguridad / no-PII-al-LLM
            │
   ┌────────┴─────────┐
   ▼                  ▼
 DATA_SOURCE=mock   DATA_SOURCE=live
 (6 expedientes     (POST al endpoint real,
  de prueba)         solo con contrato confirmado por TI)
```

**Decisión clave — data source intercambiable.** Una sola función `getExpedienteStatus()` con dos implementaciones detrás de la env var `DATA_SOURCE`. `mock` para el demo (estable, cumple §19); `live` para la integración real cuando el mentor de TI confirme método, campos y formato de respuesta. Secrets server-side, nunca `NEXT_PUBLIC_`.

**Por qué todo en Next.js y no FastAPI separado:** a Día 2 desde cero, dos despliegues = cold starts (tier free), CORS y doble punto de falla. Un repo, un deploy, cero CORS, demo estable. El núcleo reutilizable se preserva aislando la lógica en `/lib/orchestrator`.

---

## 9. Alineación con la rúbrica (Anexo 3)

| Criterio | Peso | Cómo apuntamos al nivel 4 |
|---|---|---|
| Calidad frente al desafío | **35%** | Salto reactivo → proactivo (respuesta que el Lab "no había contemplado") + valor público claro |
| Prototipo funcional y viabilidad | **30%** | Demo que funciona de verdad (mock con datos reales de prueba) + ruta de continuidad |
| Apertura, reutilización y ética | **20%** | Repo MIT + núcleo aislado + PII fuera del LLM + DL 1412 art. 29 |
| Presentación y documentación | **15%** | PPT con demo integrado + README/doc técnica reutilizable |

---

## 10. Cumplimiento normativo y entregables

**Normativa:** Ley de Gobierno Digital · TUPA del Despacho Presidencial · **DL 1412 art. 29** (software público, licencias abiertas) · Bases §14, §16, §17, §19.

**Entregables (según Anexo 1 — formulario Facilita Perú):**

- [ ] Presentación en `.pdf`
- [ ] Demo / prototipo funcional (enlace público verificado)
- [ ] Repositorio de código / componentes reutilizables (público)
- [ ] Documentación técnica
- [ ] Declaración de uso de IA generativa
- [ ] Anexo 1 firmado y subido en Facilita dentro de plazo

---

## 11. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Demo se cae por internet/endpoint en vivo | Data source `mock` + video de respaldo grabado |
| Querer hacer de más (WhatsApp, voz, Quechua) | Congelados al roadmap; el núcleo ya puntúa |
| Probing del endpoint real = riesgo de descalificación (§19, §27) | Pedir el contrato a German Canaza (TI); no probar producción |
| PII a un LLM por error | Regla de equipo: `expediente + clave` jamás pasa por el modelo |
| Subir a último minuto en Facilita | Borrador subido la mañana del Día 3 y actualizado |

---

## 12. Cronograma restante

- **Día 2 (13-jun, tarde/noche):** scaffold del repo + RF-01 (consulta mock end-to-end) + RF-03 (tracker). Confirmar contrato real con German.
- **Día 3 (14-jun, mañana):** RF-04 (notificación proactiva simulada) + manejo de errores (RF-02) + README + Declaración IA. Congelar features.
- **Día 3 (14-jun, tarde):** grabar demo, armar PPT, subir Anexo 1 en Facilita con tiempo.
