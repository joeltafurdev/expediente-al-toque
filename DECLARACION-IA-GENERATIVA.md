# Declaración de Uso de Inteligencia Artificial Generativa

> **Proyecto:** Expediente al Toque
> **Hackatón Transformagob 2026** · Reto del Despacho Presidencial: *"El Despacho Presidencial te responde a cualquier hora y donde estés"*
> Declaración presentada conforme al **artículo 17 de las Bases** de la Hackatón.

El equipo solucionador declara que utilizó herramientas de inteligencia artificial generativa como **apoyo** durante el desarrollo de la solución, conforme a lo permitido por las Bases (§17: *"fines de apoyo al desarrollo, documentación, diseño, análisis, ideación o mejora del prototipo"*).

---

## 1. Herramientas utilizadas

| Herramienta | Proveedor | Uso en el proyecto |
|---|---|---|
| **Claude Code (Claude Opus)** | Anthropic | Apoyo en arquitectura, generación y revisión de código, documentación técnica (PRD, arquitectura, README) y análisis. |
| **Google Stitch** | Google | Generación de prototipos de interfaz (pantallas y base del sistema de diseño). |
| **UI/UX Pro Max** (skill) | Tercero (open) | Recomendaciones de sistema de diseño: paleta, tipografía y pautas de accesibilidad (WCAG). |

Todos los componentes y librerías de terceros están declarados en `package.json` y respetan sus licencias.

## 2. Para qué se usó

- **Desarrollo:** andamiaje del proyecto, generación y refactor de código, resolución de errores.
- **Diseño:** ideación y prototipado de la interfaz; definición del sistema de diseño accesible.
- **Documentación:** redacción de PRD, documento de arquitectura, README y esta declaración.
- **Análisis:** lectura de las bases y la ficha del reto, y planificación del alcance.

## 3. Qué NO se ingresó a las herramientas de IA

En cumplimiento del artículo 17 de las Bases, **no** se ingresó a ninguna herramienta de IA generativa:

- Datos personales reales de ciudadanos.
- Información confidencial, sensible, reservada o secreta.
- Credenciales, claves, tokens o mecanismos de acceso.
- Información institucional no pública o documentación interna protegida.
- Código, configuraciones o arquitectura de sistemas productivos no autorizados.

**Decisión de diseño que lo refuerza:** en la propia solución, la consulta de expediente (`expediente + clave`) **nunca** pasa por un modelo de lenguaje; va directo a la capa de datos. La IA generativa se usó solo en la construcción del prototipo, no para procesar datos de los usuarios.

## 4. Datos de prueba

Los expedientes y claves utilizados son **datos de prueba provistos por la entidad** para los fines de la Hackatón. No se emplearon datos reales de ciudadanos. En el repositorio y las capturas, los nombres asociados se omiten o enmascaran.

## 5. Responsabilidad del equipo

El equipo solucionador **revisó, validó y asume la responsabilidad** por los contenidos, resultados y componentes incorporados a la solución, conforme al artículo 17 de las Bases. El uso de IA fue de asistencia; las decisiones de arquitectura, alcance y diseño fueron tomadas y validadas por el equipo humano.

---

**Equipo:** GEARJOEDEV  ·  **Fecha:** 14 de junio de 2026
