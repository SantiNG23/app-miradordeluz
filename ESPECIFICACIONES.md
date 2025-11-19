# Especificaciones del Frontend - Astro + React

## Proyecto: Mirador de Luz - Sistema de Reservas de Cabañas

---

## 1. STACK TECNOLÓGICO

### Framework y Versiones
- **Framework Principal**: Astro 4.x
- **UI Interactiva**: React 18+
- **Estilos**: Tailwind CSS 3.x
- **TypeScript**: 5.x
- **Node.js**: 20+ LTS

### Dependencias Principales
```json
{
  "astro": "^4.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@astrojs/react": "^3.0.0",
  "@astrojs/tailwind": "^5.0.0",
  "tailwindcss": "^3.0.0"
}
```

---

## 2. ESTRUCTURA DE DIRECTORIOS

```
app-miradordeluz/
├── public/
│   ├── images/
│   │   ├── cabanas/
│   │   ├── icons/
│   │   └── logo/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── astro/                    # Componentes estáticos (0 JS)
│   │   │   ├── Hero.astro
│   │   │   ├── CabanaCard.astro
│   │   │   ├── Features.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Header.astro
│   │   │   └── Gallery.astro
│   │   └── react/                    # Componentes interactivos
│   │       ├── CalendarioDisponibilidad.tsx
│   │       ├── FormularioReserva.tsx
│   │       ├── BuscadorFechas.tsx
│   │       └── ModalReserva.tsx
│   ├── layouts/
│   │   └── Layout.astro              # Layout base HTML
│   ├── pages/
│   │   ├── index.astro               # Landing page
│   │   ├── cabanas/
│   │   │   └── [slug].astro          # Detalle de cabaña
│   │   ├── contacto.astro
│   │   └── reservas/
│   │       └── [codigo].astro        # Confirmación de reserva
│   ├── styles/
│   │   └── global.css                # Estilos globales
│   ├── utils/
│   │   ├── api.ts                    # Helper API calls
│   │   ├── formatters.ts             # Formateo de fechas/precios
│   │   └── types.ts                  # TypeScript types
│   ├── constants/
│   │   └── config.ts                 # Configuraciones
│   └── env.d.ts                      # Types de variables entorno
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 3. CONFIGURACIÓN ASTRO

### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  output: 'static',
  site: 'https://miradordeluz.com',
  build: {
    inlineStylesheets: 'auto'
  },
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: true
  }
});
```

---

## 4. PÁGINAS Y RENDERING

### Landing Page (/)
**Archivo**: `src/pages/index.astro`

**Tipo**: 100% Estático (SSG)

**Estructura:**
```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/astro/Hero.astro';
import CabanaCard from '../components/astro/CabanaCard.astro';
import Features from '../components/astro/Features.astro';

// Fetch en build time
const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/cabanas`);
const { data: cabanas } = await response.json();
---

<Layout title="Mirador de Luz - Cabañas en Carlos Paz">
  <Hero />
  
  <section class="container mx-auto py-16">
    <h2 class="text-3xl font-bold text-center mb-12">Nuestras Cabañas</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {cabanas.map(cabana => (
        <CabanaCard cabana={cabana} />
      ))}
    </div>
  </section>
  
  <Features />
</Layout>
```

**Características:**
- 0 JavaScript en el cliente
- Fetch de datos en tiempo de build
- HTML puro generado
- SEO perfecto
- Lighthouse 100

---

### Página de Detalle (/cabanas/[slug])
**Archivo**: `src/pages/cabanas/[slug].astro`

**Tipo**: SSG con islas React

**Estructura:**
```astro
---
import Layout from '../../layouts/Layout.astro';
import Gallery from '../../components/astro/Gallery.astro';
import CalendarioDisponibilidad from '../../components/react/CalendarioDisponibilidad';
import FormularioReserva from '../../components/react/FormularioReserva';

export async function getStaticPaths() {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/cabanas`);
  const { data: cabanas } = await response.json();
  
  return cabanas.map((cabana) => ({
    params: { slug: cabana.slug },
    props: { cabana }
  }));
}

const { cabana } = Astro.props;
---

<Layout title={`${cabana.nombre} - Mirador de Luz`}>
  <!-- Contenido estático -->
  <section class="container mx-auto">
    <h1>{cabana.nombre}</h1>
    <p>{cabana.descripcion}</p>
    
    <Gallery imagenes={cabana.imagenes} />
    
    <div class="amenities">
      {cabana.amenities.map(amenity => (
        <span>{amenity}</span>
      ))}
    </div>
  </section>
  
  <!-- Isla React interactiva -->
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto">
      <h2 class="text-2xl font-bold mb-6">Disponibilidad y Reserva</h2>
      <CalendarioDisponibilidad 
        cabanaId={cabana.id}
        precioBase={cabana.precio_base}
        client:load
      />
    </div>
  </section>
</Layout>
```

**Pre-generación:**
- 4 páginas HTML generadas en build
- Contenido estático cacheado
- Componentes React hidratados en el cliente
- Datos dinámicos (disponibilidad) fetched en runtime

---

## 5. COMPONENTES ASTRO (ESTÁTICOS)

### Hero.astro
```astro
---
// Sin props, contenido hardcoded
---

<section class="relative h-screen">
  <div class="absolute inset-0">
    <img 
      src="/images/hero-background.jpg" 
      alt="Vista panorámica del lago San Roque" 
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black/40"></div>
  </div>
  
  <div class="relative z-10 flex items-center justify-center h-full">
    <div class="text-center text-white">
      <h1 class="text-5xl md:text-7xl font-bold mb-4">
        Mirador de Luz
      </h1>
      <p class="text-xl md:text-2xl mb-8">
        Tu refugio en el corazón de Carlos Paz
      </p>
      <a 
        href="#cabanas" 
        class="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Explorar Cabañas
      </a>
    </div>
  </div>
</section>
```

### CabanaCard.astro
```astro
---
interface Props {
  cabana: {
    slug: string;
    nombre: string;
    descripcion: string;
    capacidad_personas: number;
    precio_base: number;
    imagenes: Array<{ url: string; alt: string; es_principal: boolean }>;
  };
}

const { cabana } = Astro.props;
const imagenPrincipal = cabana.imagenes.find(img => img.es_principal) || cabana.imagenes[0];
---

<article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
  <img 
    src={imagenPrincipal.url} 
    alt={imagenPrincipal.alt}
    class="w-full h-64 object-cover"
  />
  
  <div class="p-6">
    <h3 class="text-2xl font-bold mb-2">{cabana.nombre}</h3>
    <p class="text-gray-600 mb-4">{cabana.descripcion.substring(0, 100)}...</p>
    
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-500">
        Hasta {cabana.capacidad_personas} personas
      </span>
      <span class="text-xl font-bold text-blue-600">
        ${cabana.precio_base.toLocaleString()}
      </span>
    </div>
    
    <a 
      href={`/cabanas/${cabana.slug}`}
      class="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Ver Detalles
    </a>
  </div>
</article>
```

---

## 6. COMPONENTES REACT (INTERACTIVOS)

### CalendarioDisponibilidad.tsx
**Ubicación**: `src/components/react/CalendarioDisponibilidad.tsx`

**Propósito**: Mostrar disponibilidad en tiempo real y seleccionar fechas

```typescript
import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface Props {
  cabanaId: number;
  precioBase: number;
}

interface Disponibilidad {
  disponible: boolean;
  fechas_bloqueadas: string[];
  precio_por_noche: number;
}

const CalendarioDisponibilidad: FC<Props> = ({ cabanaId, precioBase }) => {
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [fechaFin, setFechaFin] = useState<string>('');
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      verificarDisponibilidad();
    }
  }, [fechaInicio, fechaFin]);

  const verificarDisponibilidad = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.PUBLIC_API_URL;
      const response = await fetch(
        `${apiUrl}/api/disponibilidad/${cabanaId}?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`
      );

      if (!response.ok) {
        throw new Error('Error al verificar disponibilidad');
      }

      const { data } = await response.json();
      setDisponibilidad(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Selecciona tus fechas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Fecha de entrada</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Fecha de salida</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            min={fechaInicio}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Verificando disponibilidad...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {disponibilidad && !loading && (
        <div className={`p-4 rounded-lg ${disponibilidad.disponible ? 'bg-green-50' : 'bg-red-50'}`}>
          {disponibilidad.disponible ? (
            <>
              <p className="text-green-700 font-semibold mb-2">✓ Disponible</p>
              <p className="text-gray-700">
                Precio por noche: <span className="font-bold">${disponibilidad.precio_por_noche.toLocaleString()}</span>
              </p>
              <button 
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={() => {/* Abrir formulario de reserva */}}
              >
                Reservar Ahora
              </button>
            </>
          ) : (
            <p className="text-red-700 font-semibold">✗ No disponible para estas fechas</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarioDisponibilidad;
```

### FormularioReserva.tsx
**Ubicación**: `src/components/react/FormularioReserva.tsx`

**Propósito**: Capturar datos del cliente y enviar reserva

```typescript
import { useState } from 'react';
import type { FC } from 'react';

interface Props {
  cabanaId: number;
  fechaInicio: string;
  fechaFin: string;
  precioTotal: number;
  onSuccess: (codigoReserva: string) => void;
}

interface FormData {
  nombre_cliente: string;
  email_cliente: string;
  telefono_cliente: string;
  cantidad_personas: number;
  comentarios: string;
}

const FormularioReserva: FC<Props> = ({ 
  cabanaId, 
  fechaInicio, 
  fechaFin, 
  precioTotal,
  onSuccess 
}) => {
  const [formData, setFormData] = useState<FormData>({
    nombre_cliente: '',
    email_cliente: '',
    telefono_cliente: '',
    cantidad_personas: 2,
    comentarios: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          cabana_id: cabanaId,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          ...formData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la reserva');
      }

      const { data } = await response.json();
      onSuccess(data.codigo_reserva);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Completa tu reserva</h3>
      
      {/* Resumen */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600">Fechas: {fechaInicio} - {fechaFin}</p>
        <p className="text-lg font-bold">Total: ${precioTotal.toLocaleString()}</p>
      </div>

      {/* Campos del formulario */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre completo *</label>
          <input
            type="text"
            required
            value={formData.nombre_cliente}
            onChange={(e) => setFormData({...formData, nombre_cliente: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email_cliente}
            onChange={(e) => setFormData({...formData, email_cliente: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Teléfono *</label>
          <input
            type="tel"
            required
            value={formData.telefono_cliente}
            onChange={(e) => setFormData({...formData, telefono_cliente: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cantidad de personas *</label>
          <input
            type="number"
            required
            min="1"
            value={formData.cantidad_personas}
            onChange={(e) => setFormData({...formData, cantidad_personas: parseInt(e.target.value)})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Comentarios</label>
          <textarea
            rows={3}
            value={formData.comentarios}
            onChange={(e) => setFormData({...formData, comentarios: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Procesando...' : 'Confirmar Reserva'}
      </button>
    </form>
  );
};

export default FormularioReserva;
```

---

## 7. UTILITIES

### api.ts
**Ubicación**: `src/utils/api.ts`

```typescript
const API_URL = import.meta.env.PUBLIC_API_URL;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers
    }
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || 'Error en la solicitud',
        response.status,
        data.errors
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Error de conexión con el servidor', 500);
  }
}
```

### types.ts
**Ubicación**: `src/utils/types.ts`

```typescript
export interface Cabana {
  id: number;
  slug: string;
  nombre: string;
  descripcion: string;
  capacidad_personas: number;
  habitaciones: number;
  banos: number;
  precio_base: number;
  metros_cuadrados: number;
  amenities: Amenity[];
  imagenes: Imagen[];
}

export interface Amenity {
  id: number;
  nombre: string;
  icono: string;
}

export interface Imagen {
  id: number;
  url: string;
  alt: string;
  orden: number;
  es_principal: boolean;
}

export interface Reserva {
  codigo_reserva: string;
  cabana_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  nombre_cliente: string;
  email_cliente: string;
  telefono_cliente: string;
  cantidad_personas: number;
  precio_total: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  comentarios?: string;
}

export interface Disponibilidad {
  disponible: boolean;
  fechas_bloqueadas: string[];
  precio_por_noche: number;
}
```

---

## 8. LAYOUT BASE

### Layout.astro
```astro
---
import Header from '../components/astro/Header.astro';
import Footer from '../components/astro/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { 
  title, 
  description = 'Cabañas en Villa Carlos Paz con vista al lago San Roque',
  image = '/images/og-image.jpg'
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  
  <!-- SEO -->
  <title>{title}</title>
  <link rel="canonical" href={canonicalURL} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(image, Astro.site)} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:type" content="website" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={new URL(image, Astro.site)} />
  
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body class="min-h-screen flex flex-col">
  <Header />
  
  <main class="flex-1">
    <slot />
  </main>
  
  <Footer />
</body>
</html>
```

---

## 9. CONFIGURACIÓN TAILWIND

### tailwind.config.mjs
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## 10. VARIABLES DE ENTORNO

### .env
```env
PUBLIC_API_URL=http://localhost:8000
```

### .env.production
```env
PUBLIC_API_URL=https://api.miradordeluz.com
```

---

## 11. PERFORMANCE Y OPTIMIZACIÓN

### Directivas de Cliente
- `client:load` - Hidrata inmediatamente
- `client:idle` - Hidrata cuando el navegador está idle
- `client:visible` - Hidrata cuando entra en viewport
- `client:media` - Hidrata según media query

**Uso recomendado:**
```astro
<!-- Crítico para UX -->
<FormularioReserva client:load />

<!-- Puede esperar -->
<CalendarioDisponibilidad client:visible />

<!-- Solo móvil -->
<MenuMobile client:media="(max-width: 768px)" />
```

### Optimización de Imágenes
```astro
---
import { Image } from 'astro:assets';
import hero from '../assets/hero.jpg';
---

<Image 
  src={hero} 
  alt="Vista del lago" 
  width={1920}
  height={1080}
  loading="eager"
  format="webp"
/>
```

---

## 12. DEPLOYMENT

### Build de Producción
```bash
npm run build
```

**Output**: Carpeta `dist/` con HTML estático

### Configuración Vercel
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "astro"
}
```

### Variables de Entorno en Vercel
- `PUBLIC_API_URL` → URL de la API Laravel en producción

---

## 13. COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview de build
npm run preview

# Linting
npm run lint

# Type checking
npm run typecheck
```

---

## CHECKLIST PRE-DEPLOYMENT

- [ ] Todas las imágenes optimizadas (WebP)
- [ ] Variables de entorno configuradas
- [ ] Meta tags SEO en todas las páginas
- [ ] Links de prefetch configurados
- [ ] Lighthouse score > 95
- [ ] Responsive en móviles
- [ ] Accesibilidad WCAG AA
- [ ] Error boundaries en componentes React
- [ ] Loading states implementados
- [ ] Favicon y manifest configurados

