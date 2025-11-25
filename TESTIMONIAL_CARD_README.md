# TestimonialCard - Componente de Card de Testimonio

## 📋 Descripción

Componente React reutilizable para mostrar testimonios de usuarios con un diseño premium. Incluye comillas decorativas, estrellas de rating, texto con palabras resaltadas, y datos del usuario con avatar.

## ✨ Características

### 🎨 Diseño

- **Card Premium**: Fondo blanco, bordes redondeados (rounded-3xl), sombra suave
- **Layout Vertical**: Estructura en columna con separación clara de contenido
- **Responsive**: Adapta tamaño de texto e íconos según viewport
- **Hover Effect**: Sombra más intensa al pasar el mouse

### 🌟 Elementos Visuales

1. **Header Superior**:
   - Ícono de comillas (izquierda) - Color gris claro decorativo
   - Estrellas de rating (derecha) - Amarillas/grises según puntuación

2. **Texto del Testimonio**:
   - Tipografía limpia y legible
   - Palabras resaltables en **naranja + negrita**
   - Altura de línea optimizada para lectura

3. **Footer con Usuario**:
   - Separador sutil (línea gris clara)
   - Avatar circular (imagen o inicial)
   - Nombre en negrita
   - Subtítulo opcional (ubicación/rol)

## 🚀 Uso

### Importación

```tsx
import TestimonialCard, { type Testimonial } from './TestimonialCard';
```

### Uso Básico

```tsx
<TestimonialCard
  text="Las cabañas son hermosas y muy cómodas. La vista es espectacular!"
  name="María González"
  rating={5}
/>
```

### Uso Completo

```tsx
<TestimonialCard
  text="Excelente lugar para desconectar. Todo muy limpio y el personal súper atento. Altamente recomendable."
  highlighted={['Excelente', 'recomendable']}
  name="Carlos Rodríguez"
  subtitle="Córdoba, Argentina"
  avatarUrl="https://ejemplo.com/avatar.jpg"
  rating={5}
/>
```

### En un Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {testimonios.map((testimonio) => (
    <TestimonialCard
      key={testimonio.id}
      text={testimonio.text}
      highlighted={testimonio.highlighted}
      name={testimonio.name}
      subtitle={testimonio.subtitle}
      avatarUrl={testimonio.avatarUrl}
      rating={testimonio.rating}
    />
  ))}
</div>
```

## 🎛️ Props

### Tipo Testimonial

```typescript
type Testimonial = {
  text: string;            // Texto del testimonio (requerido)
  highlighted?: string[];  // Palabras/frases a resaltar (opcional)
  name: string;            // Nombre de la persona (requerido)
  subtitle?: string;       // Ubicación/rol/fecha (opcional)
  avatarUrl?: string;      // URL del avatar (opcional)
  rating: number;          // Puntuación 1-5 estrellas (requerido)
};
```

### Props del Componente

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `text` | `string` | ✅ | - | Texto completo del testimonio |
| `highlighted` | `string[]` | ❌ | `[]` | Array de palabras/frases a resaltar en naranja |
| `name` | `string` | ✅ | - | Nombre de la persona que da el testimonio |
| `subtitle` | `string` | ❌ | `undefined` | Información adicional (ubicación, fecha, rol) |
| `avatarUrl` | `string` | ❌ | `undefined` | URL de la imagen del avatar |
| `rating` | `number` | ✅ | - | Puntuación de 1 a 5 estrellas |
| `className` | `string` | ❌ | `''` | Clases CSS adicionales para el contenedor |

## 🎨 Detalles de Diseño

### Colores

- **Fondo**: `bg-white`
- **Texto principal**: `text-gray-700`
- **Nombre**: `text-gray-900` (más oscuro)
- **Subtítulo**: `text-gray-500`
- **Palabras destacadas**: `text-orange-500` + `font-semibold`
- **Estrellas llenas**: `text-yellow-400`
- **Estrellas vacías**: `text-gray-200`
- **Comillas decorativas**: `text-gray-200`

### Espaciado

- **Padding interno**: `p-5 md:p-6`
- **Border radius**: `rounded-3xl`
- **Gap entre elementos**: `gap-3`
- **Separador superior**: `mt-4 pt-4`

### Tamaños

- **Ancho máximo**: `max-w-sm` (384px)
- **Avatar**: `w-10 h-10` (40px)
- **Comillas**: `w-8 h-8` (32px)
- **Estrellas**: `w-4 h-4 md:w-5 md:h-5` (16-20px)

### Tipografía

- **Texto testimonio**: `text-sm md:text-base`
- **Nombre**: `text-sm font-semibold`
- **Subtítulo**: `text-xs`
- **Line height**: `leading-relaxed`

## 🔧 Funcionalidades

### Resaltado de Palabras

El prop `highlighted` permite resaltar palabras específicas del testimonio:

```tsx
<TestimonialCard
  text="Un lugar mágico con vista espectacular y servicio excelente."
  highlighted={['mágico', 'espectacular', 'excelente']}
  // Las palabras "mágico", "espectacular" y "excelente" 
  // se mostrarán en naranja y negrita
  ...
/>
```

**Características del resaltado**:
- Case-insensitive (no distingue mayúsculas/minúsculas)
- Búsqueda global (resalta todas las apariciones)
- Preserva el formato original del texto

### Avatar Automático

Si no se proporciona `avatarUrl`, se genera un avatar con la inicial del nombre:

```tsx
// Con imagen
<TestimonialCard
  avatarUrl="https://ejemplo.com/maria.jpg"
  name="María González"
  ...
/>

// Sin imagen (muestra "M" en un círculo gris)
<TestimonialCard
  name="María González"
  ...
/>
```

### Sistema de Rating

Las estrellas se renderizan automáticamente según el valor de `rating`:

- `rating: 5` → ★★★★★ (5 estrellas amarillas)
- `rating: 4` → ★★★★☆ (4 amarillas, 1 gris)
- `rating: 3` → ★★★☆☆ (3 amarillas, 2 grises)
- etc.

## 📱 Responsive

El componente se adapta automáticamente a diferentes tamaños de pantalla:

**Mobile** (< 768px):
- Padding: `p-5`
- Texto: `text-sm`
- Estrellas: `w-4 h-4`

**Desktop** (≥ 768px):
- Padding: `p-6`
- Texto: `text-base`
- Estrellas: `w-5 h-5`

## 🎯 Ejemplos de Uso

### Ejemplo 1: Sin Avatar, con Resaltado

```tsx
<TestimonialCard
  text="La experiencia fue absolutamente increíble. Las instalaciones son de primera calidad."
  highlighted={['absolutamente increíble', 'primera calidad']}
  name="Juan Pérez"
  subtitle="Buenos Aires, Argentina"
  rating={5}
/>
```

### Ejemplo 2: Con Avatar, sin Resaltado

```tsx
<TestimonialCard
  text="Hermoso lugar para relajarse y disfrutar en familia."
  name="Ana López"
  subtitle="Cliente desde 2023"
  avatarUrl="https://i.pravatar.cc/150?img=25"
  rating={5}
/>
```

### Ejemplo 3: Mínimo (solo requeridos)

```tsx
<TestimonialCard
  text="Muy recomendable!"
  name="Pedro García"
  rating={4}
/>
```

## 🔄 Integración con SectionTestimoniosMiradorDeLuzV2

El componente `TestimonialCard` está diseñado para integrarse perfectamente con `SectionTestimoniosMiradorDeLuzV2`:

```tsx
// En SectionTestimoniosMiradorDeLuzV2.tsx
import TestimonialCard from './TestimonialCard';

// Datos
const testimonios = [
  {
    id: '1',
    name: 'María González',
    text: '...',
    rating: 5,
    // ... más props
  },
];

// Renderizado
{testimonios.map((t) => (
  <TestimonialCard
    key={t.id}
    text={t.text}
    highlighted={t.highlighted}
    name={t.name}
    subtitle={t.subtitle}
    avatarUrl={t.avatarUrl}
    rating={t.rating}
  />
))}
```

## ♿ Accesibilidad

- ✅ Estructura semántica clara
- ✅ Textos truncados con `truncate` cuando es necesario
- ✅ Alt text en imágenes de avatar
- ✅ Contraste de colores WCAG AA compliant
- ✅ Tamaños de fuente legibles

## 🎨 Personalización

### Agregar Clases Personalizadas

```tsx
<TestimonialCard
  className="custom-shadow hover:scale-105 transition-transform"
  text="..."
  name="..."
  rating={5}
/>
```

### Modificar Estilos Globales

Podés extender los estilos en tu archivo Tailwind CSS:

```css
/* global.css */
.testimonial-card-custom {
  @apply bg-gradient-to-br from-white to-gray-50;
}
```

## 🐛 Troubleshooting

### Las palabras resaltadas no funcionan

Asegurate de que las palabras en `highlighted` coincidan exactamente (o parcialmente) con el texto:

```tsx
// ✅ Correcto
text="Un lugar increíble"
highlighted={['increíble']}

// ❌ No funcionará (diferente ortografía)
text="Un lugar increíble"
highlighted={['increible']}  // sin tilde
```

### El avatar no se muestra

Verificá que la URL sea válida y accesible:

```tsx
// ✅ URL válida
avatarUrl="https://i.pravatar.cc/150?img=12"

// ❌ URL inválida o inaccesible
avatarUrl="/no-existe.jpg"
```

## 📂 Archivos Relacionados

- **Componente**: `src/components/react/TestimonialCard.tsx`
- **Sección**: `src/components/react/SectionTestimoniosMiradorDeLuzV2.tsx`
- **Ejemplo**: `src/pages/ejemplo-testimonios-v2.astro`

## 🔮 Mejoras Futuras

Posibles extensiones del componente:

- [ ] Soporte para más de 5 estrellas
- [ ] Animación de entrada configurable
- [ ] Modo oscuro (dark mode)
- [ ] Verificación de testimonio (badge "Verificado")
- [ ] Fecha del testimonio formateada
- [ ] Links a redes sociales del usuario
- [ ] Galería de fotos en el testimonio

---

**Creado para Mirador de Luz** ✨


