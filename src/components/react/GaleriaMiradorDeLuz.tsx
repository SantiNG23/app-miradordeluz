import { useState, type FC } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';

// Tipos
export interface ImagenGaleria {
  id: string;
  url: string;
  alt: string;
  categoria: 'cabana1' | 'cabana2' | 'cabana3' | 'cabana4' | 'pileta' | 'exterior';
}

export interface CategoriaFiltro {
  id: string;
  nombre: string;
  valor: 'todas' | 'cabana1' | 'cabana2' | 'cabana3' | 'cabana4' | 'pileta' | 'exterior';
}

interface GaleriaMiradorDeLuzProps {
  imagenes?: ImagenGaleria[];
}

// Datos de ejemplo (mock data)
const imagenesDefault: ImagenGaleria[] = [
  // Cabaña 1
  {
    id: 'c1-1',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    alt: 'Interior Cabaña 1 - Living',
    categoria: 'cabana1',
  },
  {
    id: 'c1-2',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    alt: 'Interior Cabaña 1 - Dormitorio',
    categoria: 'cabana1',
  },
  {
    id: 'c1-3',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    alt: 'Interior Cabaña 1 - Cocina',
    categoria: 'cabana1',
  },
  // Cabaña 2
  {
    id: 'c2-1',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    alt: 'Interior Cabaña 2 - Living',
    categoria: 'cabana2',
  },
  {
    id: 'c2-2',
    url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    alt: 'Interior Cabaña 2 - Dormitorio',
    categoria: 'cabana2',
  },
  {
    id: 'c2-3',
    url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
    alt: 'Interior Cabaña 2 - Baño',
    categoria: 'cabana2',
  },
  // Cabaña 3
  {
    id: 'c3-1',
    url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    alt: 'Interior Cabaña 3 - Living',
    categoria: 'cabana3',
  },
  {
    id: 'c3-2',
    url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
    alt: 'Interior Cabaña 3 - Dormitorio',
    categoria: 'cabana3',
  },
  {
    id: 'c3-3',
    url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800',
    alt: 'Interior Cabaña 3 - Cocina',
    categoria: 'cabana3',
  },
  // Cabaña 4
  {
    id: 'c4-1',
    url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
    alt: 'Interior Cabaña 4 - Living',
    categoria: 'cabana4',
  },
  {
    id: 'c4-2',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    alt: 'Interior Cabaña 4 - Dormitorio',
    categoria: 'cabana4',
  },
  // Pileta
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800',
    alt: 'Pileta con vista a las sierras',
    categoria: 'pileta',
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    alt: 'Área de pileta y solarium',
    categoria: 'pileta',
  },
  {
    id: 'p3',
    url: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800',
    alt: 'Atardecer en la pileta',
    categoria: 'pileta',
  },
  // Exterior
  {
    id: 'e1',
    url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
    alt: 'Vista panorámica del complejo',
    categoria: 'exterior',
  },
  {
    id: 'e2',
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    alt: 'Jardines del complejo',
    categoria: 'exterior',
  },
  {
    id: 'e3',
    url: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800',
    alt: 'Quincho y área de parrilla',
    categoria: 'exterior',
  },
  {
    id: 'e4',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    alt: 'Vista nocturna del complejo',
    categoria: 'exterior',
  },
];

const categorias: CategoriaFiltro[] = [
  { id: 'todas', nombre: 'Todas', valor: 'todas' },
  { id: 'cabana1', nombre: 'Cabaña 1', valor: 'cabana1' },
  { id: 'cabana2', nombre: 'Cabaña 2', valor: 'cabana2' },
  { id: 'cabana3', nombre: 'Cabaña 3', valor: 'cabana3' },
  { id: 'cabana4', nombre: 'Cabaña 4', valor: 'cabana4' },
  { id: 'pileta', nombre: 'Pileta', valor: 'pileta' },
  { id: 'exterior', nombre: 'Exterior', valor: 'exterior' },
];

const GaleriaMiradorDeLuz: FC<GaleriaMiradorDeLuzProps> = ({ imagenes = imagenesDefault }) => {
  const [categoriaActual, setCategoriaActual] = useState<'todas' | 'cabana1' | 'cabana2' | 'cabana3' | 'cabana4' | 'pileta' | 'exterior'>('todas');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<ImagenGaleria | null>(null);

  // Filtrar imágenes por categoría
  const imagenesFiltradas = categoriaActual === 'todas'
    ? imagenes
    : imagenes.filter(img => img.categoria === categoriaActual);

  // Obtener índice de imagen actual para el carrusel
  const indiceActual = imagenSeleccionada
    ? imagenesFiltradas.findIndex(img => img.id === imagenSeleccionada.id)
    : -1;

  const abrirModal = (imagen: ImagenGaleria) => {
    setImagenSeleccionada(imagen);
    setModalAbierto(true);
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setImagenSeleccionada(null);
    // Restaurar scroll del body
    document.body.style.overflow = '';
  };

  const siguienteImagen = () => {
    if (indiceActual < imagenesFiltradas.length - 1) {
      setImagenSeleccionada(imagenesFiltradas[indiceActual + 1]);
    }
  };

  const anteriorImagen = () => {
    if (indiceActual > 0) {
      setImagenSeleccionada(imagenesFiltradas[indiceActual - 1]);
    }
  };

  const seleccionarImagenCarrusel = (imagen: ImagenGaleria) => {
    setImagenSeleccionada(imagen);
  };

  // Manejar navegación con teclado
  const manejarTecla = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      cerrarModal();
    } else if (e.key === 'ArrowRight') {
      siguienteImagen();
    } else if (e.key === 'ArrowLeft') {
      anteriorImagen();
    }
  };

  return (
    <section className="bg-white py-16 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Botón Volver */}
        <div className="mb-8">
          <a
            href="/"
            className="font-montserrat inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
          >
            <FiArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Volver al inicio</span>
          </a>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="font-montserrat text-[14px] font-semibold text-[#A8936D] tracking-[0.2em] uppercase">
              GALERÍA
            </span>
          </div>
          <h1 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-4">
            Nuestro Complejo
          </h1>
          <p className="font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed max-w-3xl mx-auto">
            Explorá cada rincón de Mirador de Luz. Descubrí nuestras cabañas, instalaciones y espacios diseñados para tu confort y descanso.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaActual(categoria.valor)}
              className={`font-montserrat px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${categoriaActual === categoria.valor
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
                }`}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagenesFiltradas.map((imagen) => (
            <button
              key={imagen.id}
              onClick={() => abrirModal(imagen)}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A8936D] focus:ring-offset-2"
            >
              <img
                src={imagen.url}
                alt={imagen.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Mensaje si no hay imágenes */}
        {imagenesFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="font-montserrat text-lg text-gray-500">
              No hay imágenes disponibles para esta categoría.
            </p>
          </div>
        )}
      </div>

      {/* Modal de imagen ampliada */}
      {modalAbierto && imagenSeleccionada && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-95 p-4"
          onClick={cerrarModal}
          onKeyDown={manejarTecla}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-imagen-titulo"
          tabIndex={-1}
        >
          {/* Botón cerrar */}
          <button
            onClick={cerrarModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Cerrar galería"
          >
            <FiX className="w-8 h-8" />
          </button>

          {/* Contador */}
          <div className="absolute top-4 left-4 text-white text-sm font-montserrat z-10">
            {indiceActual + 1} / {imagenesFiltradas.length}
          </div>

          {/* Imagen principal */}
          <div
            className="relative max-w-5xl max-h-[60vh] mb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imagenSeleccionada.url}
              alt={imagenSeleccionada.alt}
              id="modal-imagen-titulo"
              className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Flechas de navegación */}
            {indiceActual > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  anteriorImagen();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
                aria-label="Imagen anterior"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
            )}

            {indiceActual < imagenesFiltradas.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  siguienteImagen();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
                aria-label="Imagen siguiente"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Carrusel de miniaturas */}
          <div
            className="w-full max-w-5xl overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 pb-4 px-4">
              {imagenesFiltradas.map((imagen, index) => (
                <button
                  key={imagen.id}
                  onClick={() => seleccionarImagenCarrusel(imagen)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all ${imagen.id === imagenSeleccionada.id
                    ? 'ring-4 ring-[#A8936D] scale-110'
                    : 'opacity-60 hover:opacity-100'
                    }`}
                >
                  <img
                    src={imagen.url}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Descripción de la imagen */}
          <p className="text-white text-center font-montserrat text-sm mt-4 max-w-2xl">
            {imagenSeleccionada.alt}
          </p>
        </div>
      )}
    </section>
  );
};

export default GaleriaMiradorDeLuz;

