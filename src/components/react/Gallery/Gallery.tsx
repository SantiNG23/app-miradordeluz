import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { GalleryCategoryId, GalleryPayload } from '../../../pages/api/gallery.json';

type GalleryCategory = 'all' | GalleryCategoryId;

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: Exclude<GalleryCategory, 'all'>;
  type: 'image' | 'video';
  filename: string;
}

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const toCategoryFromCabanaQuery = (value: string | null): GalleryCategory | null => {
  if (!value) return null;
  const raw = value.trim().toLowerCase();

  // Soportar: ?cabana=1..4, ?cabana=cabana1..4, ?cabana=cabana-1..4
  if (raw === '1' || raw === 'cabana1' || raw === 'cabana-1') return 'cabana1';
  if (raw === '2' || raw === 'cabana2' || raw === 'cabana-2') return 'cabana2';
  if (raw === '3' || raw === 'cabana3' || raw === 'cabana-3') return 'cabana3';
  if (raw === '4' || raw === 'cabana4' || raw === 'cabana-4') return 'cabana4';

  return null;
};

const getCategoryLabel = (category: GalleryCategory, categories: Array<{ id: GalleryCategoryId; label: string }>) =>
  categories.find((c) => c.id === category)?.label ?? 'Todas';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [payload, setPayload] = useState<GalleryPayload | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/gallery.json', { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as GalleryPayload;
        if (cancelled) return;
        setPayload(json);
        setLoadError(null);
      } catch (e) {
        if (cancelled) return;
        setLoadError(e instanceof Error ? e.message : 'Error cargando la galería');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromCabana = toCategoryFromCabanaQuery(params.get('cabana'));
    if (fromCabana) setActiveCategory(fromCabana);
  }, []);

  const isAllView = activeCategory === 'all';

  const images = useMemo(() => {
    const all = (payload?.items ?? []) as GalleryImage[];
    if (activeCategory === 'all') return all;
    return all.filter((img) => img.category === activeCategory);
  }, [activeCategory, payload]);

  const categories = useMemo(() => {
    const fromApi = payload?.categories ?? [];
    return [{ id: 'all' as const, label: 'Todas' }, ...fromApi];
  }, [payload]);

  // Encontrar índice de imagen actual en la lista filtrada
  const currentImageIndex = selectedImage ? images.findIndex((img) => img.id === selectedImage.id) : -1;

  // Manejadores del modal
  const openModal = (img: GalleryImage) => {
    setSelectedImage(img);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  const showNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setSelectedImage(images[currentImageIndex + 1]);
    }
  };

  const showPreviousImage = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(images[currentImageIndex - 1]);
    }
  };

  // Navegación por teclado
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPreviousImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentImageIndex, images.length]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <a
            href="/"
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-gray-700',
              'hover:bg-gray-50 hover:text-gray-900',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
            )}
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Volver al inicio</span>
          </a>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <div className="mb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">
                GALERÍA
              </span>
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
              Nuestro Complejo
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              Descubrí la esencia de Mirador de Luz: interiores cálidos, naturaleza alrededor y espacios pensados
              para descansar. Filtrá por cabaña o explorá todo de un vistazo.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-all',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                )}
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Loading / error */}
        {!payload && !loadError && (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-600">Cargando imágenes…</p>
          </div>
        )}

        {loadError && (
          <div className="py-12 text-center">
            <p className="text-base font-semibold text-gray-800">No se pudo cargar la galería.</p>
            <p className="mt-2 text-sm text-gray-500">Detalle: {loadError}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={cn(
                'mt-6 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold',
                'bg-orange-500 text-white hover:bg-orange-600',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
              )}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Grid */}
        {!!payload && (
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={`Galería de imágenes - categoría: ${getCategoryLabel(activeCategory, payload.categories)}`}
        >
          {images.map((img) => (
            <article
              key={img.id}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm cursor-pointer',
                'focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2',
                'animate-fadeIn',
              )}
              onClick={() => openModal(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(img);
                }
              }}
              aria-label={`${img.title}. Click para ver en detalle.`}
            >
              <div className="relative aspect-[4/3] w-full">
                {img.type === 'video' ? (
                  <video
                    src={img.src}
                    className={cn(
                      'h-full w-full object-cover transition-transform duration-500 ease-out',
                      'group-hover:scale-[1.06]',
                    )}
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      'h-full w-full object-cover transition-transform duration-500 ease-out',
                      'group-hover:scale-[1.06]',
                    )}
                  />
                )}

                {/* Overlay */}
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0',
                    'bg-gradient-to-t from-black/65 via-black/25 to-black/0',
                    'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                  )}
                  aria-hidden="true"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div
                      className={cn(
                        'translate-y-2 opacity-0 transition-all duration-300',
                        'group-hover:translate-y-0 group-hover:opacity-100',
                      )}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
                        {getCategoryLabel(img.category, payload.categories)}
                      </p>
                      <h3 className="mt-1 font-serif text-xl font-bold text-white">{img.title}</h3>
                    </div>

                    <div
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur',
                        'translate-y-2 opacity-0 transition-all duration-300',
                        'group-hover:translate-y-0 group-hover:opacity-100',
                      )}
                      aria-hidden="true"
                    >
                      <Search className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}

        {/* Empty state */}
        {images.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-base font-semibold text-gray-700">No hay imágenes para esta categoría.</p>
            <p className="mt-2 text-sm text-gray-500">Probá con "Todas" para ver el conjunto completo.</p>
          </div>
        )}
      </div>

      {/* Modal Lightbox */}
      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={closeModal}
        >
          {/* Botón cerrar */}
          <button
            onClick={closeModal}
            className={cn(
              'absolute top-4 right-4 z-50',
              'p-2 rounded-full text-white hover:bg-white/10 transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
            )}
            aria-label="Cerrar galería (Esc)"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Contador de imágenes */}
          <div className="absolute top-4 left-4 text-sm text-white bg-black/50 px-4 py-2 rounded-full font-medium">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Contenedor de imagen principal */}
          <div
            className="relative flex flex-col items-center justify-center w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen principal */}
            {selectedImage.type === 'video' ? (
              <video
                key={selectedImage.id}
                src={selectedImage.src}
                id="modal-title"
                className="max-w-full max-h-[70vh] w-full object-contain rounded-lg shadow-2xl"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.alt}
                id="modal-title"
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            )}

            {/* Descripción */}
            <p className="mt-6 text-center text-white text-sm max-w-2xl px-4">
              <span className="block text-orange-400 font-semibold mb-1">{selectedImage.title}</span>
              {selectedImage.alt}
            </p>

            {/* Navegación - Botón Anterior */}
            {currentImageIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPreviousImage();
                }}
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16',
                  'p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all hover:scale-110',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                )}
                aria-label="Imagen anterior (← Flecha izquierda)"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Navegación - Botón Siguiente */}
            {currentImageIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
                className={cn(
                  'absolute right-0 top-1/2 -translate-y-1/2 translate-x-16',
                  'p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all hover:scale-110',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                )}
                aria-label="Imagen siguiente (→ Flecha derecha)"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Indicador de controles */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-gray-400 text-xs">
            <p>Usa ← → para navegar • Esc para cerrar</p>
          </div>
        </div>
      )}
    </section>
  );
}
