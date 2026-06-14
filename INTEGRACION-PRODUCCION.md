# Guía de Integración en Producción

> Dirigida al equipo de TI del Despacho Presidencial (OGTIC DP).
> Explica cómo llevar este prototipo a producción y **qué debe proveer la API institucional** para soportar toda la funcionalidad.

---

## Resumen: qué está listo y qué falta conectar

| Componente | Estado en el prototipo | Para producción |
|---|---|---|
| UI ciudadano (chat, tracker, accesibilidad, comprobante) | ✅ Funcional | Se reutiliza tal cual |
| Núcleo / orquestador (validación, normalización, seguridad) | ✅ Funcional | Se reutiliza tal cual |
| Consulta de estado | ⚙️ Datos de prueba (mock) | Conectar el adapter `live` a la API real |
| Notificación proactiva | ⚙️ Simulada (modo demo) | Requiere persistencia + detección de cambios + envío SMS/WhatsApp |

La arquitectura **hexagonal (ports & adapters)** aísla toda la integración en la capa de *adapters*: **el núcleo y la UI no se modifican**. Conectar la API real es completar un único archivo y setear variables de entorno.

---

## Parte 1 — Conectar la consulta de estado (núcleo)

### Paso 1 · Confirmar el contrato real del API
El área de TI debe confirmar método, campos, formato de respuesta y errores. El detalle exacto está en **[Parte 3 — Requerimientos funcionales del API](#parte-3--requerimientos-funcionales-del-api-institucional)**.

### Paso 2 · Completar el adapter `live`
Archivo único: **`src/adapters/live-expediente.repo.ts`**. Ya está preparado y soporta sin tocar código:
- URL del endpoint configurable (`EXPEDIENTE_API_URL`).
- Formato del request configurable (`EXPEDIENTE_API_FORMAT=form|json`).
- Respuesta en **JSON** (campos `estado` / `situacion` / `mensaje` / `descripcion`) **o texto plano**.

Solo hay que ajustar si el contrato real difiere:
- Nombre del campo del estado → función `extraerEstadoCrudo()` en ese archivo.
- Cadenas de los estados → función `normalizarEstado()` en `src/core/estado.ts`.

### Paso 3 · Variables de entorno (server-side, nunca `NEXT_PUBLIC_`)
```bash
DATA_SOURCE=live
EXPEDIENTE_API_URL=https://<host-institucional>/consulta-expedientes
EXPEDIENTE_API_FORMAT=form   # o "json"
```

### Paso 4 · Desplegar
App Next.js estándar — **no atada a Vercel**. Corre en cualquier host Node o contenedor:
```bash
pnpm install && pnpm build && pnpm start
```

### Paso 5 · Verificar (checklist)
- [ ] Los 3 estados se mapean correctamente desde la respuesta real.
- [ ] Clave inválida y expediente inexistente devuelven el mensaje correcto.
- [ ] La clave nunca se loguea ni se persiste.
- [ ] Latencia de consulta < 2 s.

---

## Parte 2 — Notificación proactiva en producción

Hoy la notificación está **simulada** (modo demostración). Para que sea real se necesitan tres piezas nuevas, conectadas al mismo núcleo:

1. **Persistencia de suscripciones** — almacenar `(expediente, canal, contacto, consentimiento)` en una base de datos. Debe cumplir la **Ley N° 29733**: base legal, minimización de datos y derecho de baja.
2. **Detección de cambios de estado** — dos caminos:
   - **Webhook (preferido):** la entidad notifica al sistema cuando un expediente cambia de estado. Menos carga, casi en tiempo real.
   - **Polling (alternativa):** un worker consulta periódicamente la API y compara contra el último estado conocido.
3. **Envío de notificaciones** — integrar un proveedor de SMS/WhatsApp. El núcleo dispara el aviso al detectar la transición relevante (típicamente a `SE EMITIÓ RESPUESTA`).

Además: **trazabilidad** de los envíos para rendición de cuentas.

---

## Parte 3 — Requerimientos funcionales del API institucional

Para cumplir **toda** la funcionalidad, la API del Despacho debería exponer lo siguiente.

### RF-API-01 — Consulta de estado *(obligatorio)*
- **Método / endpoint:** `POST` a una URL HTTPS de consulta.
- **Entrada:** `expediente` (formato `AAAA-NNNNNNN`) + `clave` (4 dígitos). Declarar si el cuerpo es `x-www-form-urlencoded` o JSON.
- **Salida (éxito):** el estado del expediente. Preferentemente JSON: `{ "estado": "EN PROCESO" }`. Si es texto plano, una cadena con el estado.
- **Latencia objetivo:** < 2 s (p95).

### RF-API-02 — Estados normalizados *(obligatorio)*
Devolver exactamente **uno de tres valores estables**:
`DOCUMENTO REGISTRADO` · `EN PROCESO` · `SE EMITIÓ RESPUESTA`.
Si en el futuro se agregan estados, **versionar** el contrato y documentarlos.

### RF-API-03 — Manejo de errores diferenciado *(obligatorio)*
Respuestas distinguibles por máquina (código HTTP + cuerpo):
- **Clave incorrecta** → `401`/`403` (o cuerpo `{ "error": "CLAVE_INVALIDA" }`).
- **Expediente inexistente** → `404` (o `{ "error": "NO_ENCONTRADO" }`).
- **No exponer** datos personales del administrado más allá de lo estrictamente necesario para mostrar el estado.

### RF-API-04 — Seguridad *(obligatorio)*
- **HTTPS** obligatorio; sin credenciales en la URL.
- **Rate limiting** anti-abuso.
- La clave se valida en el servidor; el frontend la usa solo en tránsito.
- **CORS controlado**: idealmente el frontend consume la API a través de su propio backend/proxy (como hace este prototipo con su Route Handler), evitando exponer el endpoint al navegador.

### RF-API-05 — Notificación de cambios de estado *(para la proactividad)*
Para habilitar avisos eficientes, lo ideal:
- **Webhook:** la entidad hace `POST` a una URL del sistema al cambiar el estado, con un payload tipo `{ "expediente": "...", "estadoAnterior": "...", "estadoNuevo": "...", "timestamp": "..." }`.
- **Alternativa:** un endpoint de consulta idempotente y de bajo costo apto para *polling*.

### RF-API-06 — Orientación sobre requisitos *(opcional / roadmap)*
Para el asistente de requisitos (TUPA): un endpoint que devuelva los requisitos por tipo de trámite. Habilita la fase de orientación automática (RAG).

### Requerimientos no funcionales
- **Disponibilidad 24/7** (la propuesta es atención sin horario).
- **Trazabilidad / auditoría** de consultas y envíos.
- **Documentación del contrato** en formato OpenAPI/Swagger (recomendado).

---

## Cumplimiento normativo

- **Ley N° 29733 (Protección de Datos Personales):** consentimiento para notificaciones, minimización, derecho de baja; las IPs y números de contacto son datos personales.
- **DL 1412 (Ley de Gobierno Digital), art. 29:** publicación y reutilización como Software Público Peruano.
- **Bases de la Hackatón §16/§17/§19:** sin datos personales reales en pruebas, sin PII a IA generativa, ambientes controlados.

---

## Checklist de go-live

- [ ] Contrato del API confirmado y documentado (OpenAPI).
- [ ] Adapter `live` ajustado y probado contra un entorno de *staging*.
- [ ] `DATA_SOURCE=live` y variables de entorno seteadas.
- [ ] Pruebas de los 3 estados + casos de error en *staging*.
- [ ] (Proactivo) Persistencia + canal de envío + consentimiento implementados.
- [ ] Revisión de seguridad y de protección de datos personales.
- [ ] Despliegue en la infraestructura de la entidad; evaluar integración con la **PIDE**.
