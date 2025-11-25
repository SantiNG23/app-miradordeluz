# SectionTestimoniosMiradorDeLuzV2 - Versión con Animaciones de Expansión

## 📋 Descripción

Componente React avanzado para mostrar testimonios de huéspedes con efectos de animación espectaculares. La sección comienza en un estado compacto y se expande dramáticamente al hacer scroll, ocupando el 100% de la pantalla disponible.

## ✨ Características Principales

### 🎬 Animación de Expansión
- **Estado Inicial**: La sección empieza con un tamaño reducido (95% de escala, 70% de opacidad)
- **Estado Expandido**: Al detectar scroll, se expande suavemente al 100% de la pantalla
- **Efectos Visuales**: 
  - Fade-in suave
  - Escala progresiva
  - Blur que desaparece
  - Animación staggered en las cards (aparecen una tras otra)

### 🔍 Detección Inteligente de Scroll
- Usa **Intersection Observer API** para detectar cuando la sección entra en viewport
- Threshold del 20% para activación temprana
- Offset negativo de 100px para mejor timing

### 🎨 Efectos Visuales Aplicados

1. **Contenedor Principal**:
   - Transición de padding vertical (py-12 → py-20)
   - Fondo con gradiente sutil
   - Min-height dinámico en desktop

2. **Contenido Interior**:
   - Transición de max-width (max-w-5xl → max-w-7xl)
   - Escala de 95% a 100%
   - Opacidad de 70% a 100%
   - Duración: 1000ms con easing suave

3. **Título y Subtítulo**:
   - Aparecen desde abajo (translate-y)
   - Delay de 200ms
   - Fade-in progresivo

4. **Cards de Testimonios**:
   - Aparición escalonada (stagger effect)
   - Cada card tiene delay incremental (100ms entre cada una)
   - Translate-y inicial de 12px
   - Blur inicial que desaparece
   - Hover effects mejorados:
     - Elevación con shadow
     - Scale de 105%
     - Translate-y negativo

5. **Botón de Acción**:
   - Aparece último con delay de 700ms
   - Escala de 90% a 100%
   - Hover con scale 105% y shadow xl

### 📱 Responsive

- **Desktop (lg+)**: Carrusel con 4 cards visibles, navegación con flechas
- **Tablet (md)**: Grid de 2 columnas
- **Mobile**: Scroll horizontal con cards individuales

### 🎯 Auto-play Inteligente

- Se activa solo **después** de la animación de expansión
- Pausa automática al hacer hover
- Intervalo configurable (default: 4000ms)
- Loop infinito con reset suave

## 🚀 Uso

### Uso Básico

```astro
---
import SectionTestimoniosMiradorDeLuzV2 from "../components/react/SectionTestimoniosMiradorDeLuzV2";
---

<SectionTestimoniosMiradorDeLuzV2 client:visible />
```

### Uso Avanzado

```astro
---
import SectionTestimoniosMiradorDeLuzV2 from "../components/react/SectionTestimoniosMiradorDeLuzV2";

const misTestimonios = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    fecha: '20/11/2025',
    comentario: 'Excelente experiencia...',
    rating: 5,
    avatarUrl: 'https://ejemplo.com/avatar.jpg', // Opcional
  },
  // ... más testimonios
];
---

<SectionTestimoniosMiradorDeLuzV2 
  client:visible
  testimonios={misTestimonios}
  textoBoton="Dejá tu opinión"
  autoPlayInterval={5000}
  pauseOnHover={true}
  onClickBoton={() => {
    // Lógica personalizada
    console.log('Botón clickeado');
  }}
/>
```

## 🎛️ Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `testimonios` | `Testimonio[]` | 6 ejemplos | Array de testimonios a mostrar |
| `mostrarBoton` | `boolean` | `true` | Mostrar/ocultar botón de acción |
| `textoBoton` | `string` | `'Dejanos tu Opinión'` | Texto del botón |
| `onClickBoton` | `() => void` | `undefined` | Callback al hacer click en el botón |
| `autoPlayInterval` | `number` | `4000` | Intervalo en ms para auto-play |
| `pauseOnHover` | `boolean` | `true` | Pausar auto-play al hacer hover |

## 📦 Tipo Testimonio

```typescript
interface Testimonio {
  id: string;           // ID único del testimonio
  nombre: string;       // Nombre del huésped
  fecha: string;        // Fecha del testimonio
  comentario: string;   // Texto del testimonio
  rating: number;       // Calificación 1-5
  avatarUrl?: string;   // URL del avatar (opcional)
}
```

## 🎨 Personalización de Colores

Los avatars sin imagen usan colores generados automáticamente basados en el nombre:
- Azul, Verde, Púrpura, Rosa, Índigo, Rojo, Amarillo, Teal

## 🔧 Detalles Técnicos

### Timings de Animación

```
Estado inicial → Espera por scroll
↓
Intersection Observer detecta sección (20% visible)
↓
Delay de 100ms
↓
Expansión del contenedor (1000ms)
├── +200ms → Título aparece
├── +400ms → Carrusel empieza fade-in
├── +600ms → Primera card aparece
├── +700ms → Segunda card aparece
├── +800ms → Tercera card aparece
└── +1300ms → Botón aparece
```

### Configuración del Observer

```typescript
{
  threshold: 0.2,           // 20% de visibilidad
  rootMargin: '0px 0px -100px 0px'  // Activar 100px antes
}
```

## 🎯 Casos de Uso Ideales

1. **Landing Pages**: Impacto visual inmediato
2. **Páginas de Producto**: Testimonios dramáticos
3. **Páginas de Venta**: Aumentar confianza con efectos premium
4. **Portfolios**: Mostrar feedback de clientes

## 🌐 Compatibilidad

- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+

*Usa Intersection Observer API nativa*

## 📝 Notas

- El componente usa `client:visible` para mejor performance
- Las animaciones son CSS puras (no JavaScript animations)
- Optimizado para 60 FPS
- Accesible con navegación por teclado
- Respeta `prefers-reduced-motion` (considera agregarlo si necesitas WCAG AAA)

## 🔄 Diferencias con V1

| Característica | V1 | V2 |
|----------------|----|----|
| Animación de entrada | ❌ | ✅ Expansión dramática |
| Efecto blur | ❌ | ✅ |
| Stagger en cards | ❌ | ✅ |
| Detección de scroll | ❌ | ✅ Intersection Observer |
| Títulos animados | ❌ | ✅ |
| Min-height dinámico | ❌ | ✅ |
| Gradiente de fondo | ❌ | ✅ |

## 📂 Archivos

- **Componente**: `src/components/react/SectionTestimoniosMiradorDeLuzV2.tsx`
- **Ejemplo 1**: `src/pages/ejemplo-testimonios.astro`
- **Ejemplo 2**: `src/pages/ejemplo-testimonios-v2.astro`

## 🎬 Para Ver el Efecto

1. Ejecutá el servidor de desarrollo: `npm run dev`
2. Visitá: `http://localhost:4321/ejemplo-testimonios-v2`
3. Hacé scroll hacia abajo para ver la animación de expansión
4. Observá cómo cada card aparece escalonadamente

## 💡 Tips de Diseño

- Agregá contenido antes de la sección para forzar scroll
- Usá fondos contrastantes para mejor impacto visual
- Considerá agregar un indicador visual de scroll (flecha animada)
- Probá diferentes valores de threshold según tu diseño

---

**Creado para Mirador de Luz** ✨


