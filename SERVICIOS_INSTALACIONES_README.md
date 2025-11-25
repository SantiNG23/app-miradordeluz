# SectionServiciosInstalacionesMiradorDeLuz - Servicios & Instalaciones

## 📋 Descripción

Componente React profesional para mostrar los servicios internos y las instalaciones externas de un complejo de cabañas. Diseño elegante con cards para servicios, lista descriptiva para instalaciones y collage de imágenes con hover effects.

## ✨ Características Principales

### 🎨 Diseño Profesional

- **Fondo claro**: Color stone-50 (beige suave)
- **Cards con sombra**: Efecto hover suave
- **Paleta de colores**: Verde, amarillo/amber, naranja (personalizable)
- **Tipografía**: Jerarquía clara con fuentes bold para títulos

### 📦 Estructura de la Sección

1. **Encabezado**:
   - Etiqueta superior en mayúsculas con tracking amplio
   - Título principal grande y bold
   - Subtítulo descriptivo con información del complejo

2. **Bloque de Servicios**:
   - Grid responsive (1/2/3 columnas según pantalla)
   - Cards con ícono circular + texto
   - Hover effects elegantes

3. **Bloque de Instalaciones Externas**:
   - Layout de 2 columnas (texto + imágenes)
   - Lista con bullets decorativos
   - Collage de imágenes con efectos hover

4. **CTA Final** (opcional):
   - Botón con borde
   - Hover con cambio de fondo
   - Configurable o desactivable

## 🚀 Uso

### Importación

```tsx
import SectionServiciosInstalacionesMiradorDeLuz from './SectionServiciosInstalacionesMiradorDeLuz';
```

### Uso Básico

```astro
<SectionServiciosInstalacionesMiradorDeLuz client:visible />
```

### Uso Completo con Props

```astro
---
const servicios = [
  {
    id: '1',
    titulo: 'Desayuno casero incluido',
    descripcion: 'Comenzá el día con productos regionales',
    colorAccent: 'amber',
  },
  {
    id: '2',
    titulo: 'WiFi de alta velocidad',
    descripcion: 'Conexión gratuita en todas las áreas',
    colorAccent: 'green',
  },
  // ... más servicios
];

const instalaciones = [
  {
    id: '1',
    titulo: 'Pileta con solarium',
    descripcion: 'Disfruta del agua y el sol',
  },
  {
    id: '2',
    titulo: 'Espacios verdes y miradores',
    descripcion: 'Amplios jardines con vistas',
  },
  // ... más instalaciones
];

const imagenes = [
  '/images/pileta.jpg',
  '/images/jardin.jpg',
  '/images/quincho.jpg',
];
---

<SectionServiciosInstalacionesMiradorDeLuz
  client:visible
  servicios={servicios}
  instalaciones={instalaciones}
  imagenesInstalaciones={imagenes}
  mostrarCTA={true}
  textoCTA="Ver cabañas disponibles"
  onClickCTA={() => {
    window.location.href = '/cabanas';
  }}
/>
```

## 🎛️ Props

### Componente Principal

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `servicios` | `Servicio[]` | 6 ejemplos | Array de servicios a mostrar |
| `instalaciones` | `Instalacion[]` | 5 ejemplos | Array de instalaciones externas |
| `imagenesInstalaciones` | `string[]` | 3 URLs | Array de URLs de imágenes para el collage |
| `mostrarCTA` | `boolean` | `true` | Mostrar/ocultar botón CTA final |
| `textoCTA` | `string` | `'Ver más detalles'` | Texto del botón CTA |
| `onClickCTA` | `() => void` | `undefined` | Callback al hacer click en CTA |

### Tipo Servicio

```typescript
interface Servicio {
  id: string;                          // ID único
  icon?: ReactNode;                    // Ícono personalizado (opcional)
  titulo: string;                      // Nombre del servicio
  descripcion: string;                 // Descripción corta
  colorAccent?: 'green' | 'amber' | 'orange'; // Color del círculo del ícono
}
```

### Tipo Instalacion

```typescript
interface Instalacion {
  id: string;           // ID único
  titulo: string;       // Nombre de la instalación
  descripcion?: string; // Descripción opcional
  icon?: ReactNode;     // Ícono personalizado (opcional, no se usa en el diseño actual)
}
```

## 🎨 Colores de Acento

Cada servicio puede tener un color de acento diferente:

```typescript
colorAccent: 'green'  → bg-green-50 text-green-600
colorAccent: 'amber'  → bg-amber-50 text-amber-600
colorAccent: 'orange' → bg-orange-50 text-orange-600
```

## 🧩 Estructura del Layout

### Desktop (> 1024px)

```
┌─────────────────────────────────────────┐
│         Encabezado (centrado)           │
├─────────────────────────────────────────┤
│                                         │
│  Servicios (Grid 3 columnas)           │
│  ┌─────┐  ┌─────┐  ┌─────┐            │
│  │ 🔵  │  │ 🟡  │  │ 🟢  │            │
│  └─────┘  └─────┘  └─────┘            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Instalaciones                          │
│  ┌──────────┐  ┌──────────────┐       │
│  │  Lista   │  │   Collage    │       │
│  │  • Item  │  │  ┌────────┐  │       │
│  │  • Item  │  │  │ Img 1  │  │       │
│  │  • Item  │  │  ├───┬────┤  │       │
│  │          │  │  │ 2 │ 3  │  │       │
│  └──────────┘  └──┴───┴────┘  │       │
│                                         │
├─────────────────────────────────────────┤
│            CTA (centrado)               │
└─────────────────────────────────────────┘
```

### Mobile (< 768px)

- Servicios: 1 columna
- Instalaciones: Lista arriba, imágenes abajo (apiladas)

## 🖼️ Collage de Imágenes

El collage se estructura así:

```html
<div className="grid grid-cols-2 gap-4">
  <!-- Imagen grande (2 columnas) -->
  <div className="col-span-2 h-56 md:h-64">
    <img src={imagenesInstalaciones[0]} />
  </div>
  
  <!-- Imagen pequeña 1 -->
  <div className="h-40 md:h-48">
    <img src={imagenesInstalaciones[1]} />
  </div>
  
  <!-- Imagen pequeña 2 -->
  <div className="h-40 md:h-48">
    <img src={imagenesInstalaciones[2]} />
  </div>
</div>
```

**Características**:
- Bordes redondeados: `rounded-3xl`
- Efecto hover: `scale-105` (zoom suave)
- Sombras: `shadow-lg`
- Transición: 500ms

## 📱 Responsive

### Mobile (< 640px)
- Grid de servicios: 1 columna
- Instalaciones: layout vertical (lista + imágenes apiladas)

### Tablet (640px - 1024px)
- Grid de servicios: 2 columnas
- Instalaciones: layout vertical

### Desktop (> 1024px)
- Grid de servicios: 3 columnas
- Instalaciones: 2 columnas (40% lista / 60% imágenes)

## 🎯 Ejemplos de Servicios

```typescript
const ejemplosServicios = [
  {
    id: '1',
    titulo: 'Desayuno casero incluido',
    descripcion: 'Productos regionales y caseros',
    colorAccent: 'amber',
  },
  {
    id: '2',
    titulo: 'WiFi de alta velocidad',
    descripcion: 'Conexión gratuita en todas las áreas',
    colorAccent: 'green',
  },
  {
    id: '3',
    titulo: 'Estacionamiento privado',
    descripcion: 'Espacio seguro dentro del predio',
    colorAccent: 'green',
  },
  {
    id: '4',
    titulo: 'Ropa blanca y limpieza',
    descripcion: 'Toallas, sábanas y servicio incluidos',
    colorAccent: 'amber',
  },
  {
    id: '5',
    titulo: 'Calefacción y A/C',
    descripcion: 'Climatización completa todo el año',
    colorAccent: 'orange',
  },
  {
    id: '6',
    titulo: 'Check-in flexible',
    descripcion: 'Horarios adaptados a tus necesidades',
    colorAccent: 'green',
  },
];
```

## 🌿 Ejemplos de Instalaciones

```typescript
const ejemplosInstalaciones = [
  {
    id: '1',
    titulo: 'Pileta con solarium',
    descripcion: 'Área de pileta con zona de descanso',
  },
  {
    id: '2',
    titulo: 'Espacios verdes y miradores',
    descripcion: 'Amplios jardines con vistas panorámicas',
  },
  {
    id: '3',
    titulo: 'Quincho y zona de fogón',
    descripcion: 'Perfectos para asados al aire libre',
  },
  {
    id: '4',
    titulo: 'Decks y livings exteriores',
    descripcion: 'Espacios integrados con la naturaleza',
  },
  {
    id: '5',
    titulo: 'Vistas panorámicas',
    descripcion: 'Miradores con vista a las montañas',
  },
];
```

## 🎨 Personalización de Íconos

Por defecto, el componente incluye íconos SVG inline. Podés personalizarlos:

### Opción 1: Usar react-icons

```bash
npm install react-icons
```

```tsx
import { FaWifi, FaCoffee, FaParking } from 'react-icons/fa';

const servicios = [
  {
    id: '1',
    icon: <FaCoffee />,
    titulo: 'Desayuno',
    descripcion: '...',
  },
  {
    id: '2',
    icon: <FaWifi />,
    titulo: 'WiFi',
    descripcion: '...',
  },
];
```

### Opción 2: Usar SVGs personalizados

```tsx
const MiIcono = () => (
  <svg><!-- tu SVG --></svg>
);

const servicios = [
  {
    id: '1',
    icon: <MiIcono />,
    titulo: 'Servicio',
    descripcion: '...',
  },
];
```

## ♿ Accesibilidad

- ✅ Estructura semántica (`<section>`, `<h2>`, `<h3>`, `<ul>`, `<li>`)
- ✅ Alt text en imágenes (agregalo en tus props)
- ✅ Contraste de colores WCAG AA compliant
- ✅ Tamaños de fuente legibles
- ✅ Hover states claros para interactividad

## 🔧 Integración con CMS

Si usás un CMS, podés mapear los datos así:

```typescript
// Datos desde CMS
const serviciosCMS = await fetch('/api/servicios');
const instalacionesCMS = await fetch('/api/instalaciones');

// Mapear al formato esperado
const servicios = serviciosCMS.map(s => ({
  id: s.id,
  titulo: s.title,
  descripcion: s.description,
  colorAccent: s.color,
}));

const instalaciones = instalacionesCMS.map(i => ({
  id: i.id,
  titulo: i.title,
  descripcion: i.description,
}));
```

## 🐛 Troubleshooting

### Las imágenes no se muestran

Verificá que las URLs sean accesibles:

```tsx
// ✅ Correcto
imagenesInstalaciones={[
  '/images/pileta.jpg',
  'https://example.com/jardin.jpg'
]}

// ❌ Error
imagenesInstalaciones={[
  'images/pileta.jpg'  // Falta la barra inicial
]}
```

### Los colores de acento no funcionan

Asegurate de usar los valores correctos:

```tsx
// ✅ Correcto
colorAccent: 'green'

// ❌ Error
colorAccent: 'verde'
```

### El CTA no hace nada

Verificá que estés pasando el callback:

```tsx
<SectionServiciosInstalacionesMiradorDeLuz
  onClickCTA={() => {
    console.log('Clicked!');
    // Tu lógica aquí
  }}
/>
```

## 📂 Archivos

- **Componente**: `src/components/react/SectionServiciosInstalacionesMiradorDeLuz.tsx`
- **Ejemplo**: `src/pages/ejemplo-servicios-instalaciones.astro`

## 🎬 Para Ver el Efecto

1. Ejecutá: `npm run dev`
2. Visitá: `http://localhost:4321/ejemplo-servicios-instalaciones`
3. Scrolleá para ver la sección completa

## 💡 Tips de Diseño

- **Servicios**: Limitá a 6-9 items para mejor legibilidad
- **Instalaciones**: 5-7 items ideales para no saturar
- **Imágenes**: Usá fotos de alta calidad (min 800px de ancho)
- **Textos**: Mantené las descripciones cortas (1-2 líneas)
- **Colores**: Distribuí los colores de acento de forma equilibrada

## 🔮 Mejoras Futuras

Posibles extensiones:

- [ ] Modo oscuro (dark mode)
- [ ] Animaciones de scroll (fade-in, slide-up)
- [ ] Lightbox para las imágenes
- [ ] Iconos animados en hover
- [ ] Filtros por categoría de servicio
- [ ] Integración con sistema de reservas
- [ ] Versión con video de fondo
- [ ] Badges "Nuevo" o "Destacado" en servicios

---

**Creado para Mirador de Luz** ✨


