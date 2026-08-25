# BRAND CORE - Fuente Unica de Verdad de DreamboatSoft

Este documento centraliza toda la inteligencia de marca, diseno, paleta de colores, tipografia, reglas tecnicas y principios de neuromarketing para **DreamboatSoft**. Todos los modulos especializados (`design_and_marketing.md`, `social_media_content.md`, etc.) heredan de este nucleo.

---

## 1. Identidad de Marca y Nomenclatura

* **Nombre Oficial:** **DreamboatSoft**
  * Composicion tipografica: **Dreamboat** (`#fbfbfb` en dark mode / `#000000` en light mode) + **Soft** (`#cd326c`).
* **Propuesta de Valor:** *Startup Colombiana de Automatizacion - Duplica tus ventas y ahorra +40h al mes. Liberamos a las PYMEs de tareas manuales repetitivas.*
* **Firma / Origen:** *Medellin, Colombia* - Dominio: `dreamboatsoft.com`.
* **Logo Oficial:** [public/favicon.webp](file:///c:/Users/juan.munoz/dev/dreamboat-tech/dreamboatsoft/public/favicon.webp)
  * Implementacion en HTML: `<img class="logo" src="favicon.webp" alt="DreamboatSoft">` con filtro de resplandor `drop-shadow(0 0 16px rgba(205,50,108,0.6))`.

---

## 2. Paleta de Colores Oficial

| Token | Hex / Valor | Uso |
| :--- | :--- | :--- |
| **Accent Magenta / Pink** | `#cd326c` | Identidad de marca ("Soft"), glows radiales, bordes interactivos, badges, iconos destacados. |
| **Accent Red** | `#d01926` | Botones CTA primarios, degradados de urgencia, badges de alerta. |
| **Dark Background (Main)**| `#111010` | Fondo principal oscuro premium para todas las piezas. |
| **Dark Card / Container** | `#191818` | Tarjetas internas de contenido, modales, cajas de valor. |
| **Deep Charcoal** | `#1a1a1a` | Sombras, fondos alternos y bordes sutiles. |
| **Text Primary (High Contrast)** | `#fbfbfb` | Titulares, numeros clave, textos principales. |
| **Text Muted / Subtitles**| `#cbd5e1` / `#94a3b8` | Subtitulos, explicaciones secundarias. |
| **Text Subtle / Legal** | `rgba(251,251,251,0.4)` | Enlaces web, ubicacion, pie de pagina. |
| **Brand Gradients** | `linear-gradient(135deg, #111010 0%, #191818 50%, #1a1a1a 100%)`<br>`linear-gradient(90deg, #d01926 0%, #cd326c 100%)` | Fondos generales y botones de accion principal. |

---

## 3. Tipografia y Sistema de Iconos

* **Display / Titulares:** `'Dela Gothic One', sans-serif` (autoridad, impacto visual, pesadez premium).
* **Cuerpo y Subtitulos:** `'Plus Jakarta Sans', sans-serif` (legibilidad moderna, pesos 400, 600, 700, 800).
* **Regla Estricta de Cero Emojis:**
  * **PROHIBIDO EL USO DE EMOJIS** en disenos, piezas graficas y textos publicitarios.
  * Toda la iconografia debe ser vectorial **SVG en linea** limpia o cargada mediante CDN (**Lucide Icons** o **Google Material Symbols**).

---

## 4. Elementos Graficos de Marca (DNA Visual)

Toda pieza grafica creada en HTML debe incluir la atmosfera visual oficial:

1. **Cuadricula de Fondo (Grid Lines):**
   ```css
   .grid-lines {
     position: absolute; inset: 0;
     background-image:
       linear-gradient(rgba(205, 50, 108, 0.04) 1px, transparent 1px),
       linear-gradient(90deg, rgba(205, 50, 108, 0.04) 1px, transparent 1px);
     background-size: 60px 60px; z-index: 1; pointer-events: none;
   }
   ```
2. **Glows Radiales Difusos:**
   * Superior derecho: `radial-gradient(circle, rgba(205, 50, 108, 0.22) 0%, rgba(208, 25, 38, 0.1) 45%, transparent 70%)`.
   * Inferior izquierdo: `radial-gradient(circle, rgba(208, 25, 38, 0.16) 0%, rgba(205, 50, 108, 0.08) 50%, transparent 70%)`.
3. **Slashes Diagonales:**
   * Lineas a `-18deg` con degradado `linear-gradient(180deg, transparent 0%, #d01926 30%, #cd326c 70%, transparent 100%)` a baja opacidad (0.12 - 0.3).
4. **Esquinas de Acento (Corner Accents):**
   * Borde en esquina superior izquierda de 3-4px en `#cd326c`.
5. **Barra Inferior de Marca:**
   * Barra de 4px con degradado `linear-gradient(90deg, #d01926 0%, #cd326c 50%, #d01926 100%)`.

---

## 5. Estandar Tecnico de Exportacion 1:1 (HTML a PNG HD)

Cada archivo HTML generado en `/public/` para anuncios o publicaciones debe incorporar obligatoriamente el motor de descarga interactivo:

1. **Libreria:** `<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>`.
2. **Barra Flotante Sticky:** Con boton `[ Descargar como Imagen (PNG) ]`.
3. **Configuracion Sin Desfases (Centrado 1:1):**
   ```javascript
   async function downloadImage(targetId, filename) {
     const target = document.getElementById(targetId);
     if (document.fonts) await document.fonts.ready;
     const canvas = await html2canvas(target, {
       scale: 2, // Ultra HD
       useCORS: true,
       allowTaint: true,
       backgroundColor: '#111010',
       logging: false
     });
     const link = document.createElement('a');
     link.download = filename;
     link.href = canvas.toDataURL('image/png');
     link.click();
   }
   ```
4. **Compatibilidad:** Evitar `-webkit-background-clip: text` en titulares (usar `#cd326c` solido para evitar textos negros en el canvas).

---

## 6. Neuromarketing y Psicologia de Conversion para PYMEs

Los 5 pilares psicologicos aplicables a cualquier contenido:

1. **Dolor Operativo Real:** Tareas manuales repetitivas, retrasos en responder a clientes por WhatsApp, descuadres de caja, perdida de prospectos.
2. **Beneficio Cuantificable:** "+40 horas ahorradas al mes", "ventas en automatico 24/7", "cero errores contables".
3. **Reduccion de Riesgo / Confianza:** Soporte continuo, acompanamiento local en Medellin, cotizaciones transparentes sin costos ocultos.
4. **Contraste Visual:** Dark mode de lujo con llamados a la accion brillantes que dirigen la mirada al punto de conversion.
5. **CTA de Friccion Cero:** Acciones directas y concisas.
