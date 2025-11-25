# Sistema de Visibilidad del Navbar

## 📋 Descripción

Sistema inteligente que controla la visibilidad del navbar en la landing page. El navbar solo se muestra cuando el usuario está en el **Hero Principal**, y se oculta automáticamente en todas las demás secciones.

## ✨ Funcionamiento

### Estado del Navbar por Sección

```
┌─────────────────────────────────┐
│  Hero Principal                 │  ✅ Navbar VISIBLE
├─────────────────────────────────┤
│  Ubicación                      │  ❌ Navbar OCULTO
├─────────────────────────────────┤
│  Hero Intermedio (Video)        │  ❌ Navbar OCULTO
├─────────────────────────────────┤
│  Cabañas                        │  ❌ Navbar OCULTO
├─────────────────────────────────┤
│  Servicios & Instalaciones      │  ❌ Navbar OCULTO
├─────────────────────────────────┤
│  Testimonios                    │  ❌ Navbar OCULTO
├─────────────────────────────────┤
│  Footer                         │  ❌ Navbar OCULTO
└─────────────────────────────────┘
```

## 🔧 Componentes

### NavbarVisibilityController

Componente React que usa **Intersection Observer** para detectar cuando el Hero Principal está visible.

**Ubicación**: `src/components/react/NavbarVisibilityController.tsx`

```tsx
import NavbarVisibilityController from "../components/react/NavbarVisibilityController";

<NavbarVisibilityController client:load />
```

### Cómo Funciona

1. **Hero Visible** (scroll en el top):
   ```typescript
   document.body.classList.remove('hide-navbar-global')
   // Resultado: Navbar visible
   ```

2. **Hero NO Visible** (scroll hacia abajo):
   ```typescript
   document.body.classList.add('hide-navbar-global')
   // Resultado: Navbar oculto
   ```

3. **Threshold**: Se activa cuando el 10% del hero es visible
   ```typescript
   threshold: 0.1
   ```

## 🎨 Estilos CSS

En `src/styles/global.css`:

```css
/* Navbar oculto cuando estás fuera del Hero Principal */
body.hide-navbar-global nav,
body.hide-navbar-global header {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-100%);
  transition: all 0.5s ease-out;
}

/* Navbar visible cuando estás en el Hero Principal */
body:not(.hide-navbar-global) nav,
body:not(.hide-navbar-global) header {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
  transition: all 0.5s ease-out;
}
```

### Efectos de Transición

- **Duración**: 500ms
- **Easing**: ease-out
- **Propiedades animadas**:
  - `opacity`: 0 ↔ 1
  - `transform`: translateY(-100%) ↔ translateY(0)
  - `pointer-events`: none ↔ auto

## 🚀 Implementación en index.astro

```astro
---
import NavbarMiradorDeLuz from "../components/react/NavbarMiradorDeLuz";
import NavbarVisibilityController from "../components/react/NavbarVisibilityController";
---

<Layout>
  <!-- Navbar -->
  <NavbarMiradorDeLuz client:load transparente={true} />
  
  <!-- Controlador de visibilidad -->
  <NavbarVisibilityController client:load />
  
  <main>
    <!-- 1. Hero Principal -->
    <div id="hero-section">
      <HeroMiradorDeLuz client:load />
    </div>
    
    <!-- Resto de secciones... -->
  </main>
</Layout>
```

## ⚠️ Requisitos Importantes

### 1. ID del Hero Principal

El Hero Principal **DEBE** tener el ID `hero-section`:

```html
<div id="hero-section">
  <HeroMiradorDeLuz client:load />
</div>
```

### 2. Hydration Strategy

El controlador debe usar `client:load`:

```astro
<NavbarVisibilityController client:load />
```

### 3. Orden de los Componentes

```astro
1. NavbarMiradorDeLuz
2. NavbarVisibilityController  ← Debe ir después del navbar
3. Resto de componentes
```

## 🔄 Compatibilidad con Hero Intermedio

El sistema es compatible con el `hideNavbar` del Hero Intermedio:

```astro
<!-- Puedes dejar hideNavbar en false -->
<SectionHeroIntermedioMiradorDeLuzV2
  hideNavbar={false}  ← No afecta el sistema global
/>
```

El sistema global (`hide-navbar-global`) tiene prioridad sobre el individual (`hide-navbar`).

## 📱 Responsive

El sistema funciona en todos los tamaños de pantalla:

- ✅ Mobile (< 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (> 1024px)

## 🐛 Troubleshooting

### El navbar no se oculta

Verificá que:

1. El Hero Principal tiene el ID correcto:
   ```html
   <div id="hero-section">  ← Debe ser exactamente "hero-section"
   ```

2. El controlador está montado:
   ```astro
   <NavbarVisibilityController client:load />
   ```

3. Los estilos CSS están en `global.css`

### El navbar parpadea

Si el navbar parpadea al cargar la página, agregá CSS inicial:

```css
/* Navbar visible por defecto al cargar */
nav, header {
  opacity: 1;
  transform: translateY(0);
}
```

### El navbar no vuelve a aparecer

Verificá la consola del navegador. El Intersection Observer se limpia automáticamente al desmontar el componente.

## 💡 Tips de Uso

### Ajustar el Threshold

Si querés que el navbar desaparezca antes/después:

```tsx
// En NavbarVisibilityController.tsx
{
  threshold: 0.1,  // 0.1 = 10% visible
                   // 0.5 = 50% visible
                   // 0.9 = 90% visible
}
```

### Cambiar la Velocidad de Transición

En `global.css`:

```css
body.hide-navbar-global nav {
  transition: all 0.5s ease-out;  ← Cambiar 0.5s a tu gusto
}
```

### Agregar Delay

```css
body.hide-navbar-global nav {
  transition: all 0.5s ease-out 0.2s;  ← 0.2s de delay
}
```

## 🎯 Ventajas del Sistema

✅ **Experiencia inmersiva**: Más espacio para el contenido
✅ **Transiciones suaves**: Animaciones profesionales
✅ **Performance**: Usa Intersection Observer (nativo del browser)
✅ **Flexible**: Fácil de personalizar
✅ **Limpio**: No contamina el DOM con listeners de scroll

## 🔮 Mejoras Futuras

Posibles extensiones:

- [ ] Navbar sticky que aparece al hacer scroll up
- [ ] Animación de fade lateral en lugar de vertical
- [ ] Configuración de threshold por prop
- [ ] Modo "peek" (navbar parcialmente visible)
- [ ] Integración con gestos táctiles
- [ ] Persistencia de estado en sessionStorage

## 📂 Archivos Involucrados

- **Controlador**: `src/components/react/NavbarVisibilityController.tsx`
- **Estilos**: `src/styles/global.css`
- **Implementación**: `src/pages/index.astro`

---

**Sistema creado para Mirador de Luz** ✨


