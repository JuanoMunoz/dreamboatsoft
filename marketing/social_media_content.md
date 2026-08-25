# Generador de Publicaciones para Redes Sociales - DreamboatSoft

Este modulo se especializa en la creacion de **contenido organico, posts educativos, carruseles, infografias y casos de exito** para las redes sociales de **DreamboatSoft** (Instagram, LinkedIn, X/Twitter, Facebook y WhatsApp Channel).

> **Herencia de Marca:** Este documento se rige al 100% por [BRAND_CORE.md](file:///c:/Users/juan.munoz/dev/dreamboat-tech/dreamboatsoft/marketing/BRAND_CORE.md) (Colores `#cd326c`, `#d01926`, `#111010`, tipografia `Dela Gothic One` / `Plus Jakarta Sans`, logotipo `favicon.webp`, cero emojis y descarga 1:1 en PNG Ultra HD).

---

## 1. Formatos de Publicacion Soportados

| Tipo de Contenido | Dimensiones | Canal Principal | Objetivo |
| :--- | :--- | :--- | :--- |
| **Post Cuadrado (Square)** | `1080 x 1080 px` | Instagram / Facebook / LinkedIn | Tips directos, datos clave, quotes y anuncios de producto. |
| **Post Vertical (Portrait)** | `1080 x 1350 px` | Instagram Feed (4:5) | Mayor retencion de pantalla en el feed de Instagram. |
| **Historia / Reel Cover** | `1080 x 1920 px` | Instagram Stories / Reels / TikTok | Formato vertical inmersivo, llamados a la accion rapidos. |
| **Carrusel Deslizable** | Multiples slides `1080 x 1080 px` o `1080 x 1350 px` | Instagram / LinkedIn (PDF o Slides) | Guias paso a paso, comparativas, desglose de problemas y soluciones. |
| **Banner / Noticia** | `1200 x 628 px` | LinkedIn / Twitter / Blog | Articulos tecnicos, anuncios de features y actualizaciones. |

---

## 2. Tipologias de Publicaciones (Pilares de Contenido)

Al solicitar una publicacion, puedes elegir entre estos 5 pilares:

### Pilar A: Educativo y Tips de Automatizacion
* **Enfoque:** Ensenar a los empresarios como la tecnologia resuelve problemas diarios.
* **Ejemplos:**
  * *"3 tareas manuales que tu empresa deberia automatizar hoy mismo."*
  * *"Como conectar WhatsApp con tu sistema de facturacion sin programar."*
  * *"La formula exacta para calcular cuantas horas pierde tu equipo en tareas repetitivas."*

### Pilar B: Comparativas (Antes vs Despues / Con vs Sin DreamboatSoft)
* **Enfoque:** Contraste visual y operativo inmediato.
* **Ejemplos:**
  * *"Gestion tradicional de pedidos vs Automatizacion con DreamboatSoft."*
  * *"Atencion por WhatsApp manual (espera de horas) vs Bot IA (respuesta en 3 segundos)."*

### Pilar C: Casos de Exito y Resultados Medibles
* **Enfoque:** Prueba social y numeros contundentes.
* **Ejemplos:**
  * *"Caso CheesePapas: Como un restaurante digitalizo sus pedidos y elimino filas en hora pico."*
  * *"Como una empresa ahorro 2 dias de trabajo administrativo al mes en el envio de nomina."*

### Pilar D: Infografias y Datos de Impacto
* **Enfoque:** Numeros grandes, graficos limpios e informacion de alto valor compartible.
* **Ejemplos:**
  * *"El costo oculto de responder tarde a un cliente en WhatsApp (Estadistica para PYMEs)."*
  * *"+40 horas al mes: El tiempo promedio que recupera una empresa automatizada."*

### Pilar E: Autoridad y Filosofia Tech
* **Enfoque:** Posicionar a DreamboatSoft y a su fundador como referentes de automatizacion en Colombia y Latinoamerica.
* **Ejemplos:**
  * *"Tu empresa deberia trabajar para ti, no tu para tu empresa."*
  * *"La automatizacion no reemplaza a tu equipo: multiplica su capacidad."*

---

## 3. Estructura Dual: Arte Visual (HTML) + Copy de Publicacion

Cada solicitud de publicacion genera **dos componentes sincronizados**:

### Componente 1: Archivo HTML en `/public/`
* Archivo standalone (ej. `public/post-[tema].html` o `public/carousel-[tema].html`).
* Renderiza el diseno visual con los patrones de [BRAND_CORE.md](file:///c:/Users/juan.munoz/dev/dreamboat-tech/dreamboatsoft/marketing/BRAND_CORE.md).
* Incluye la barra superior con el boton **`[ Descargar como Imagen (PNG) ]`** en Ultra HD 2x.

### Componente 2: Copywriting Profesional para el Post (Texto para Redes)
Junto con el archivo HTML, se entrega el texto listo para copiar y pegar en la red social, siguiendo esta formula:

1. **Gancho (Hook - Primeras 2 lineas):** Declaracion controversial, pregunta directa o dato revelador que detiene el scroll.
2. **Cuerpo de Valor (Story / Insight):** Explicacion clara, concisa, sin tecnicismos innecesarios y con vinetas limpias.
3. **Llamado a la Interaccion (CTA):** Pregunta para comentar, invitacion a enviar DM o enlace al perfil.
4. **Hashtags Estrategicos:** 3 a 5 hashtags relevantes (#Automatizacion #PYMEs #EmprendimientoColombia #InteligenciaArtificial #DreamboatSoft).

---

## 4. Flujo de Trabajo: Como Solicitar una Publicacion

Para crear una nueva publicacion para tus redes, solo necesitas indicar el tema o pilar deseado:

> *"Crea un post para Instagram sobre como automatizar la respuesta de WhatsApp en restaurantes."*
> *"Crea un post de LinkedIn con infografia sobre las 40 horas que pierde un equipo en tareas manuales al mes."*
> *"Crea un carrusel de 3 slides comparando metodos tradicionales vs DreamboatSoft."*

El sistema generara inmediatamente:
1. El archivo visual en `public/post-[nombre].html` con diseno premium, logo oficial y boton de descarga 1-clic.
2. El copy completo para acompanar la publicacion en la red social.
