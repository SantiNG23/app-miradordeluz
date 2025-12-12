import React, { useState } from 'react';
import type { FC } from 'react';

interface CabanaCarouselProps {
  images: string[];
  alt?: string;
}

const CabanaCarousel: FC<CabanaCarouselProps> = ({ images = [], alt = 'Imagen de la cabaña' }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[420px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        Sin imágenes
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative w-full">
      <div className="w-full h-[520px] md:h-[520px] lg:h-[520px] rounded-2xl overflow-hidden bg-gray-50">
        <img src={images[index]} alt={alt} className="w-full h-full object-cover" />
      </div>

      {/* Prev / Next */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent border border-black/10 text-black flex items-center justify-center hover:bg-black/5"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M15 6L9 12l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        aria-label="Siguiente"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent border border-black/10 text-black flex items-center justify-center hover:bg-black/5"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a la imagen ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CabanaCarousel;


