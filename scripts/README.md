# Scripts de Conversión de Imágenes

Este directorio contiene scripts para convertir imágenes a WebP (formato moderno y optimizado).

## ✅ Estado Actual

Se han convertido exitosamente **158 imágenes** a formato WebP:

- 📁 **cabana-1**: 26 WebP
- 📁 **cabana-2**: 46 WebP  
- 📁 **cabana-3**: 30 WebP
- 📁 **cabana-4**: 11 WebP
- 📁 **exterior**: 45 WebP

**Total:** 158 archivos convertidos de HEIC → WebP ✨

---

## 🛠️ Script Principal

### `convertToWebpFinal.js`

El script principal y recomendado para convertir imágenes a WebP.

```bash
npm run convert:webp
```

**Características:**
- ✅ Usa ImageMagick (herramienta robusta del sistema)
- ✅ Soporte completo para HEIC
- ✅ Verifica archivos antes de sobrescribir
- ✅ Genera reportes detallados
- ✅ Maneja errores gracefully
- ✅ Optimización automática de calidad (80%)

**Requisitos:**
- ImageMagick: `brew install imagemagick`

---

## 📋 Otros Scripts

### `convertToWebp.js` (Sharp)
Versión anterior usando la librería Node.js Sharp. Menos recomendada para HEIC.

### `convertToWebpAdvanced.js` (ImageMagick/FFmpeg)
Versión intermedia que detecta herramientas disponibles.

---

## 📂 Directorios Procesados

```
public/images/
├── cabana-1/      (26 WebP)
├── cabana-2/      (46 WebP)
├── cabana-3/      (30 WebP)
├── cabana-4/      (11 WebP)
├── exterior/      (45 WebP)
└── pileta/        (videos - no procesado)
```

---

## 🚀 Cómo Usar

### Convertir nuevas imágenes

```bash
npm run convert:webp
```

El script:
1. Escanea los directorios configurados
2. Busca imágenes sin versión WebP
3. Convierte HEIC → WebP @ 80% calidad
4. Salta archivos ya convertidos
5. Genera reporte de resultados

### Formatos soportados

- ✅ HEIC (fotos iPhone)
- ✅ JPG/JPEG
- ✅ PNG
- ✅ GIF

---

## ⚙️ Notas Técnicas

- **Librería:** ImageMagick 7.1.2+
- **Calidad:** 80% (balance óptimo tamaño/calidad)
- **Compresión:** Automática
- **Metadatos:** Removidos (`-strip`) para reducir tamaño
- **Timeout:** 30 segundos por imagen

---

## 🔧 Resolución de Problemas

### "ImageMagick no está instalado"

```bash
brew install imagemagick
```

### Las imágenes no se convierten

1. Verifica que el archivo sea válido
2. Prueba manualmente: `convert entrada.heic salida.webp`
3. Revisa los logs del script

### Archivo corrupto

El script puede fallar con archivos HEIC dañados. Solución:
- Elimina el archivo original
- Re-descarga desde iCloud/respaldo
- Intenta nuevamente

---

## 📊 Ahorro de Espacio

Comparativa HEIC vs WebP (calidad 80):

| Formato | Tamaño promedio | Beneficio |
|---------|-----------------|-----------|
| HEIC    | ~1.2 MB         | Original  |
| WebP    | ~0.8 MB         | 33% menos |

**Espacio ahorrado:** ~80 MB en 158 imágenes

