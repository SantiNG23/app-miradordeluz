# HeroMiradorDeLuzLayout

Componente React que combina **Navbar fijo + Hero con video + Layout completo** en un solo componente.

## 🎯 Características

✅ **Navbar fijo** en la parte superior (72-80px de altura)  
✅ **Hero con video de fondo** (80-85vh de altura)  
✅ **Vista previa automática** de la siguiente sección sin hacer scroll  
✅ **Responsive** con menú móvil hamburguesa  
✅ **Tipografía Montserrat** para mantener consistencia  
✅ **Props configurables** para personalizar contenido  

---

## 📦 Estructura del Layout

```tsx
<HeroMiradorDeLuzLayout>
  ├── <header>           // Navbar fijo (72-80px)
  │   ├── Logo
  │   ├── Selector de idioma (ESP / ENG)
  │   ├── Botón "Reservas"
  │   ├── Iconos (Ubicación, Instagram, WhatsApp)
  │   └── Hamburguesa (móvil)
  │
  └── <main>             // Contenido principal
      └── <section>      // Hero con video (80-85vh)
          ├── Video de fondo
          ├── Overlay oscuro
          └── Contenido centrado
              ├── Subtítulo
              └── Título en 1-2 líneas
```

---

## 🚀 Uso Básico

### En una página Astro

```astro
---
import HeroMiradorDeLuzLayout from "../components/react/HeroMiradorDeLuzLayout";
import SectionUbicacionMiradorDeLuz from "../components/react/SectionUbicacionMiradorDeLuz";
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mirador de Luz</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- Layout con Navbar + Hero -->
    <HeroMiradorDeLuzLayout
      client:load
      videoUrl="/videos/VideoCarlosPaz.mp4"
      subtitle="CERCA DE TODO"
      titleLine1="Urbano & Confortable."
      titleLine2="En el Corazón de la Ciudad."
    />

    <!-- Secciones siguientes (se ve un preview automáticamente) -->
    <SectionUbicacionMiradorDeLuz client:visible />
    
    <!-- Más secciones... -->
  </body>
</html>
```

---

## 🎨 Props

```typescript
type HeroProps = {
  videoUrl: string;       // REQUERIDO - URL del video de fondo
  subtitle?: string;      // Opcional - Texto superior pequeño
  titleLine1: string;     // REQUERIDO - Primera línea del título
  titleLine2?: string;    // Opcional - Segunda línea del título
};
```

### Ejemplo con todas las props:

```tsx
<HeroMiradorDeLuzLayout
  client:load
  videoUrl="/videos/VideoCarlosPaz.mp4"
  subtitle="CERCA DE TODO"
  titleLine1="Urbano & Confortable."
  titleLine2="En el Corazón de la Ciudad."
/>
```

### Ejemplo mínimo (solo requeridas):

```tsx
<HeroMiradorDeLuzLayout
  client:load
  videoUrl="/videos/VideoCarlosPaz.mp4"
  titleLine1="Mirador de Luz"
/>
```

---

## 📐 Dimensiones y Layout

### Navbar
- **Altura desktop:** `80px`  
- **Altura mobile:** `72px`  
- **Posición:** `fixed` (siempre visible)  
- **Fondo:** `#f7f3ec` (beige claro)  
- **z-index:** `50`

### Hero
- **Altura desktop:** `82vh`  
- **Altura mobile:** `80vh`  
- **Margen superior:** `72-80px` (altura del navbar)  
- **Video:** `object-cover` (cubre todo el área)  
- **Overlay:** `bg-black/40` (40% de opacidad)

### ¿Por qué 80-82vh y no 100vh?

Porque queremos que **sin hacer scroll** el usuario vea:
1. ✅ Navbar arriba (siempre accesible)
2. ✅ Hero con video (contenido principal)
3. ✅ Un preview de la siguiente sección abajo (incentiva el scroll)

Esto crea una **mejor UX** porque el usuario sabe inmediatamente que hay más contenido debajo.

---

## 🎭 Variantes de Estilo

### Cambiar el color del subtítulo

Editá la clase en `HeroMiradorDeLuzLayout.tsx`:

```tsx
// Actual: dorado
className="... text-[#d1b78a] ..."

// Alternativas:
className="... text-amber-300 ..."     // Ámbar
className="... text-emerald-300 ..."   // Verde esmeralda
className="... text-blue-300 ..."      // Azul
```

### Cambiar la opacidad del overlay

```tsx
// Actual: 40%
<div className="absolute inset-0 bg-black/40" />

// Alternativas:
<div className="absolute inset-0 bg-black/30" />  // Más claro (30%)
<div className="absolute inset-0 bg-black/50" />  // Más oscuro (50%)
<div className="absolute inset-0 bg-black/60" />  // Muy oscuro (60%)
```

---

## 📱 Responsive

### Desktop (lg+)
- Menú completo visible
- Iconos sociales visibles
- Selector de idioma visible
- Texto del hero más grande (`text-6xl`)

### Mobile (< lg)
- Menú hamburguesa
- Iconos en menú desplegable
- Texto del hero más pequeño (`text-3xl`)
- Navbar más compacta (72px)

---

## 🔧 Personalización Avanzada

### Cambiar los links del navbar

Editá directamente en `HeroMiradorDeLuzLayout.tsx`:

```tsx
// Instagram
<a href="https://instagram.com/TU_USUARIO" ...>

// WhatsApp (formato internacional sin +)
<a href="https://wa.me/5493512345678" ...>

// Ubicación
<a href="#ubicacion" ...>
```

### Cambiar el logo

Reemplazá la imagen o editá el fallback de texto:

```tsx
<img
  src="/images/logo/TU_LOGO.svg"
  alt="Tu Marca"
  className="h-10 md:h-12 w-auto"
/>
```

---

## ✨ Ejemplos de Uso Real

### 1. Hero con video de montaña

```tsx
<HeroMiradorDeLuzLayout
  client:load
  videoUrl="/videos/LagoSanRoque.mp4"
  subtitle="MIRADOR DE LUZ"
  titleLine1="Experiencia única."
  titleLine2="Entre las montañas."
/>
```

### 2. Hero urbano

```tsx
<HeroMiradorDeLuzLayout
  client:load
  videoUrl="/videos/VideoCarlosPaz.mp4"
  subtitle="CERCA DE TODO"
  titleLine1="Urbano & Confortable."
  titleLine2="En el Corazón de la Ciudad."
/>
```

### 3. Hero simple (una línea)

```tsx
<HeroMiradorDeLuzLayout
  client:load
  videoUrl="/videos/Hero.mp4"
  titleLine1="Bienvenidos a Mirador de Luz"
/>
```

---

## 📄 Página de Ejemplo

Mirá el ejemplo completo funcionando en:

```
/ejemplo-hero-intermedio-v2
```

Esta página demuestra:
- ✅ Layout completo con navbar + hero
- ✅ Vista previa de la siguiente sección
- ✅ Múltiples secciones debajo
- ✅ Footer al final
- ✅ Comportamiento responsive

---

## 🎯 Best Practices

### ✅ DO (Hacer)
- Usá videos optimizados (< 5MB si es posible)
- Dejá que el componente controle el navbar (no agregues uno extra)
- Usá títulos cortos y concisos (máx 2 líneas)
- Agregá las secciones siguientes directamente después del componente

### ❌ DON'T (No hacer)
- No uses `min-h-screen` en las secciones siguientes inmediatas
- No agregues otro navbar fijo (ya hay uno incluido)
- No uses videos muy pesados (impacta performance)
- No cambies `client:load` a `client:visible` (el navbar debe estar disponible de inmediato)

---

## 🐛 Troubleshooting

### El video no se reproduce
- Verificá que la ruta sea correcta (`/videos/...`)
- Asegurate que el video tenga formato web (MP4, WebM)
- El navegador puede bloquear autoplay sin `muted`

### El navbar no se ve
- El navbar es parte del componente, no lo incluyas por separado
- Verificá que no haya otros elementos con `z-index` muy alto

### No se ve la siguiente sección
- El hero ocupa 80-85vh, dejando 15-20vh para el preview
- Si usás `min-h-screen` en la siguiente sección, puede verse cortada

### El menú móvil no funciona
- Asegurate de usar `client:load` (no `client:idle` o `client:visible`)
- El estado del menú se maneja con React state

---

## 🔄 Comparación con componentes anteriores

| Feature | `SectionHeroIntermedioMiradorDeLuzV2` | `HeroMiradorDeLuzLayout` |
|---------|---------------------------------------|--------------------------|
| Navbar incluido | ❌ No | ✅ Sí |
| Layout completo | ❌ No | ✅ Sí |
| Animación de expansión | ✅ Sí | ❌ No (altura fija) |
| Ocultamiento del navbar | ✅ Sí | ❌ No (siempre visible) |
| Props de configuración | ✅ Muchas | ✅ Esenciales |
| Uso recomendado | Secciones intermedias | Hero principal de página |

---

## 📚 Archivos Relacionados

- **Componente:** `src/components/react/HeroMiradorDeLuzLayout.tsx`  
- **Ejemplo:** `src/pages/ejemplo-hero-intermedio-v2.astro`  
- **Documentación:** `HERO_LAYOUT_README.md` (este archivo)

---

## 🎨 Paleta de Colores Usada

```css
/* Navbar */
bg-[#f7f3ec]      /* Fondo beige claro */
text-[#8b7355]    /* Texto marrón */
bg-[#b89968]      /* Botón dorado */

/* Hero */
text-[#d1b78a]    /* Subtítulo dorado */
text-white        /* Título blanco */
bg-black/40       /* Overlay oscuro */
```

---

## 📞 Soporte

Si tenés dudas o problemas:
1. Revisá los ejemplos en `/ejemplo-hero-intermedio-v2`
2. Verificá que estés usando las props correctas
3. Comprobá la consola del navegador para errores

---

**¡Listo!** Ahora tenés un layout completo y profesional para tu hero con navbar integrado. 🎉


