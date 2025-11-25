# SectionHeroIntermedioMiradorDeLuzV2 - Hero con Animación de Expansión

## 📋 Descripción

Componente React avanzado para heros intermedios con animación de expansión espectacular. La sección comienza ocupando el 60% de la pantalla y se expande automáticamente al 100% cuando el usuario hace scroll hasta ella, con la capacidad de ocultar el navbar para una experiencia inmersiva.

## ✨ Características Principales

### 🎬 Animación de Expansión
- **Estado Inicial**: La sección ocupa el 60% del viewport de altura (`60vh`) y 60% de ancho (responsive)
- **Estado Expandido**: Se expande al 100% del viewport (`100vh` x `100vw`) cuando está visible
- **Transición Suave**: Animación de 1000ms con easing suave
- **Efectos Visuales**:
  - Expansión de ancho y alto simultánea
  - Fade-in del contenido
  - Escala del background (zoom-out effect)
  - Bordes redondeados que desaparecen al expandir
  - Sombra que se desvanece
  - Aparición staggered de elementos (subheading → título)

### 👁️ Detección Inteligente de Scroll
- Usa **Intersection Observer API** para detectar visibilidad
- Threshold del 30% para activación óptima
- Se activa/desactiva al entrar/salir del viewport

### 📹 Control Automático de Video
- Video se reproduce automáticamente cuando la sección es visible
- Se pausa cuando la sección sale del viewport
- Optimiza recursos y experiencia del usuario

### 🚫 Ocultamiento del Navbar
- Oculta el navbar automáticamente cuando estás en el hero
- Vuelve a aparecer al salir de la sección
- Transición suave de 500ms
- Configurable mediante prop `hideNavbar`

### 🎨 Flexibilidad Visual
- Soporte para **imagen** o **video** de fondo
- 4 niveles de overlay oscuro configurables
- Color de acento personalizable
- Texto con soporte para múltiples líneas

## 🚀 Uso

### Importación

```tsx
import SectionHeroIntermedioMiradorDeLuzV2 from './SectionHeroIntermedioMiradorDeLuzV2';
```

### Uso Básico con Video

```astro
<SectionHeroIntermedioMiradorDeLuzV2
  client:visible
  backgroundVideo="/videos/hero.mp4"
  subheading="MIRADOR DE LUZ"
  title="Experiencia única.\nEntre las montañas."
  overlayOpacity="dark"
  hideNavbar={true}
/>
```

### Uso con Imagen

```astro
<SectionHeroIntermedioMiradorDeLuzV2
  client:visible
  backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
  subheading="DESCONECTÁ"
  title="Tu refugio natural."
  overlayOpacity="medium"
  accentColor="text-emerald-300"
  hideNavbar={false}
/>
```

### En Página Completa

```astro
---
import Layout from "../layouts/Layout.astro";
import NavbarMiradorDeLuz from "../components/react/NavbarMiradorDeLuz";
import SectionHeroIntermedioMiradorDeLuzV2 from "../components/react/SectionHeroIntermedioMiradorDeLuzV2";
---

<Layout title="Mi Página">
  <!-- Navbar -->
  <NavbarMiradorDeLuz client:load transparente={true} />

  <!-- Contenido previo para scroll -->
  <div class="min-h-screen">
    <!-- Tu contenido -->
  </div>

  <!-- Hero con expansión -->
  <SectionHeroIntermedioMiradorDeLuzV2
    client:visible
    backgroundVideo="/videos/hero.mp4"
    subheading="MIRADOR DE LUZ"
    title="Experiencia única.\nEntre las montañas."
    overlayOpacity="dark"
    hideNavbar={true}
  />

  <!-- Contenido posterior -->
  <div class="min-h-screen">
    <!-- Más contenido -->
  </div>
</Layout>

<style is:global>
  /* Estilos para ocultar navbar (ya están en global.css) */
  body.hide-navbar nav,
  body.hide-navbar header {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-100%);
    transition: all 0.5s ease-out;
  }

  body:not(.hide-navbar) nav,
  body:not(.hide-navbar) header {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    transition: all 0.5s ease-out;
  }
</style>
```

## 🎛️ Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `backgroundImage` | `string` | Unsplash image | URL de la imagen de fondo |
| `backgroundVideo` | `string` | `undefined` | URL del video de fondo (prioridad sobre imagen) |
| `subheading` | `string` | `'CERCA DE TODO'` | Texto superior en mayúsculas |
| `title` | `string` | `'Naturaleza & Confort...'` | Título principal (soporta `\n` para saltos de línea) |
| `overlayOpacity` | `'light' \| 'medium' \| 'dark' \| 'darker'` | `'medium'` | Nivel de oscuridad del overlay |
| `accentColor` | `string` | `'text-amber-300'` | Clase Tailwind para el color del subheading |
| `hideNavbar` | `boolean` | `true` | Si debe ocultar el navbar cuando está visible |

## 🎨 Detalles de Diseño

### Dimensiones

```typescript
// Estado inicial (compacto)
Altura: h-[60vh]                          // 60% del viewport height
Ancho:  w-[95%] md:w-[85%] lg:w-[60%]   // Responsive width
Bordes: rounded-2xl                       // Bordes redondeados
Sombra: shadow-2xl                        // Sombra pronunciada

// Estado expandido (pantalla completa)
Altura: h-screen                          // 100% del viewport height
Ancho:  w-full                            // 100% del viewport width
Bordes: rounded-none                      // Sin bordes redondeados
Sombra: shadow-none                       // Sin sombra
```

### Responsive Width

```typescript
Mobile (< 768px):   95% de ancho
Tablet (768-1024px): 85% de ancho
Desktop (> 1024px):  60% de ancho
Expandido:          100% de ancho (todas las pantallas)
```

### Overlay Opacity

```typescript
'light':  bg-black/30  // 30% de opacidad
'medium': bg-black/50  // 50% de opacidad
'dark':   bg-black/60  // 60% de opacidad
'darker': bg-black/70  // 70% de opacidad
```

### Colores de Acento Sugeridos

```typescript
'text-amber-300'   // Amarillo cálido (default)
'text-emerald-300' // Verde esmeralda
'text-blue-300'    // Azul cielo
'text-pink-300'    // Rosa suave
'text-purple-300'  // Púrpura
```

### Timings de Animación

```
Entrada al viewport
↓
Delay de 100ms
↓
Expansión del contenedor (1000ms)
├── Altura: 60vh → 100vh
├── Ancho: 60% → 100%
├── Bordes: rounded-2xl → rounded-none
├── Sombra: shadow-2xl → shadow-none
├── +200ms → Fade-in del contenedor de texto
├── +300ms → Aparición del subheading
└── +400ms → Aparición del título

Salida del viewport
↓
Contracción (1000ms)
├── Altura: 100vh → 60vh
├── Ancho: 100% → 60%
├── Bordes: rounded-none → rounded-2xl
├── Sombra: shadow-none → shadow-2xl
└── Fade-out del contenido
```

## 🔧 Funcionalidades Técnicas

### Intersection Observer

```typescript
{
  threshold: 0.3,      // Se activa con 30% de visibilidad
  rootMargin: '0px'    // Sin offset
}
```

### Control de Video

```typescript
// Al entrar en viewport
videoRef.current.play()

// Al salir del viewport
videoRef.current.pause()
```

### Control del Navbar

```typescript
// Al entrar en viewport (si hideNavbar=true)
document.body.classList.add('hide-navbar')

// Al salir del viewport
document.body.classList.remove('hide-navbar')
```

## 📱 Responsive

El componente se adapta automáticamente:

**Mobile** (< 768px):
- Texto del subheading: `text-xs`
- Título: `text-3xl`
- Padding: `px-4`

**Tablet** (768px - 1024px):
- Texto del subheading: `text-sm`
- Título: `text-5xl`

**Desktop** (> 1024px):
- Texto del subheading: `text-sm`
- Título: `text-6xl`

## 🎯 Casos de Uso

1. **Landing Pages**: Hero principal con impacto visual máximo
2. **Separadores de Sección**: Dividir contenido manteniendo interés
3. **Presentación de Productos**: Destacar features específicos
4. **Storytelling**: Narrativa visual inmersiva
5. **Páginas de Destino**: Experiencia de pantalla completa

## ⚠️ Consideraciones

### Performance

- El video debe estar optimizado (codec H.264, tamaño < 5MB recomendado)
- Usar `preload="metadata"` para carga eficiente
- El componente pausa el video cuando no está visible

### Accesibilidad

- Asegurate de que el texto tenga suficiente contraste con el fondo
- El overlay ayuda a mantener legibilidad
- Los videos son mudos por defecto (mejor experiencia UX)

### SEO

- Usar `client:visible` en lugar de `client:load` para lazy loading
- El texto del título es indexable por buscadores
- Las imágenes de fondo deben tener buen alt text en el contexto de la página

## 🐛 Troubleshooting

### El video no se reproduce

Verificá que:
- La URL del video sea accesible
- El formato sea compatible (MP4, WebM)
- El video tenga el atributo `muted` (requerido para autoplay)

```tsx
// ✅ Correcto
backgroundVideo="/videos/hero.mp4"

// ❌ Formato no soportado
backgroundVideo="/videos/hero.avi"
```

### El navbar no se oculta

Asegurate de:
- Tener los estilos globales en `global.css`
- El prop `hideNavbar` está en `true`
- El navbar tiene las etiquetas `<nav>` o `<header>`

```css
/* Debe estar en global.css */
body.hide-navbar nav,
body.hide-navbar header {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-100%);
}
```

### La animación no se ve suave

Verificá:
- El componente usa `client:visible` (no `client:load`)
- No hay conflictos con otros scripts de scroll
- El browser soporta Intersection Observer (todos los modernos lo hacen)

## 🔄 Diferencias con V1

| Característica | V1 | V2 |
|----------------|----|----|
| Altura dinámica | ❌ Fija | ✅ 60vh → 100vh |
| Ancho dinámico | ❌ 100% fijo | ✅ 60% → 100% |
| Bordes redondeados | ❌ | ✅ Con animación |
| Sombra dinámica | ❌ | ✅ Aparece/desaparece |
| Animación de expansión | ❌ | ✅ |
| Ocultar navbar | ❌ | ✅ |
| Control de video inteligente | ❌ | ✅ Pause/play automático |
| Intersection Observer | ❌ | ✅ |
| Animaciones staggered | ❌ | ✅ |
| Zoom-out del background | ❌ | ✅ |

## 📂 Archivos

- **Componente**: `src/components/react/SectionHeroIntermedioMiradorDeLuzV2.tsx`
- **Estilos**: `src/styles/global.css` (navbar hide styles)
- **Ejemplo 1**: `src/pages/ejemplo-hero-intermedio.astro`
- **Ejemplo 2**: `src/pages/ejemplo-hero-intermedio-v2.astro`

## 🎬 Para Ver el Efecto

1. Ejecutá el servidor: `npm run dev`
2. Visitá: `http://localhost:4321/ejemplo-hero-intermedio`
3. Hacé scroll hacia abajo
4. Observá cómo:
   - El hero se expande de 60% de altura a 100%
   - El hero se expande de 60% de ancho a 100%
   - Los bordes redondeados desaparecen suavemente
   - La sombra se desvanece
   - El navbar desaparece hacia arriba
   - El video comienza a reproducirse
   - El contenido hace fade-in escalonado

## 💡 Tips de Uso

- **Contraste**: Usá overlay más oscuro (`dark` o `darker`) para texto claro
- **Timing**: El threshold de 0.3 funciona bien, pero podés ajustarlo según necesidad
- **Videos**: Mantené los videos cortos (15-30 segundos en loop)
- **Navegación**: Considerá agregar un botón de "scroll down" en el contenido previo
- **Mobile**: Probá siempre en mobile - los videos pueden ser pesados

## 🔮 Mejoras Futuras

Posibles extensiones:

- [ ] Parallax effect en el background
- [ ] Múltiples overlays de color
- [ ] Botones CTA integrados
- [ ] Contador o estadísticas animadas
- [ ] Scroll indicator animado
- [ ] Música de fondo opcional
- [ ] Efectos de partículas
- [ ] Modo día/noche automático

---

**Creado para Mirador de Luz** ✨

