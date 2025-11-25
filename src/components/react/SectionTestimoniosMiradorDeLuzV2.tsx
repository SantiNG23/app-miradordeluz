import { useState, useRef, useEffect, type FC } from 'react';
import TestimonialCard, { type Testimonial } from './TestimonialCard';

// Iconos de flechas para navegación del carrusel
const ChevronLeftIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Tipo de testimonio extendido con ID
export interface TestimonioExtendido extends Testimonial {
  id: string;
}

interface SectionTestimoniosMiradorDeLuzV2Props {
  testimonios?: TestimonioExtendido[];
  mostrarBoton?: boolean;
  textoBoton?: string;
  onClickBoton?: () => void;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
}

const SectionTestimoniosMiradorDeLuzV2: FC<SectionTestimoniosMiradorDeLuzV2Props> = ({
  testimonios = [
    {
      id: '1',
      name: 'Horacio Di Paolo',
      subtitle: 'Villa Carlos Paz, Córdoba',
      text: 'Excelente lugar para descansar. Las cabañas son muy cómodas y la atención es increíble.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      highlighted: ['increíble'],
    },
    {
      id: '2',
      name: 'Fabri & Yuli',
      subtitle: 'Buenos Aires, Argentina',
      text: 'Reservamos una cabaña para nuestra escapada de fin de semana. Paisaje increíble y atención excelente. Volveremos pronto!',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=25',
      highlighted: ['increíble', 'excelente'],
    },
    {
      id: '3',
      name: 'Alejandro Pazos',
      subtitle: 'Rosario, Santa Fe',
      text: 'Hemos venido con un grupo de 30 amigos. Excelente todo. Muy recomendable para grupos grandes.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=33',
      highlighted: ['Excelente', 'recomendable'],
    },
    {
      id: '4',
      name: 'Alejandro Lezcano',
      subtitle: 'Tafí del Valle, Tucumán',
      text: 'Ya tengo mi lugar para quedarme cuando visite Tafí. Hotel increíble... Excelente Atención, Servicio y Habitaciones Confortables.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=68',
      highlighted: ['increíble', 'Excelente', 'Confortables'],
    },
    {
      id: '5',
      name: 'Patricia González',
      subtitle: 'Córdoba Capital',
      text: 'Fuimos en familia y las cabañas son súper cómodas. Ideal para desconectar. La vista es hermosa!',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=45',
      highlighted: ['súper cómodas', 'hermosa'],
    },
    {
      id: '6',
      name: 'Martín Silva',
      subtitle: 'Mendoza, Argentina',
      text: 'Excelente experiencia. Todo muy limpio y ordenado. El personal muy atento. Definitivamente volveremos.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=51',
      highlighted: ['Excelente', 'Definitivamente'],
    },
    {
      id: '7',
      name: 'Sofía Ramírez',
      subtitle: 'San Luis, Argentina',
      text: 'Un lugar mágico en medio de la naturaleza. Las cabañas tienen todo lo necesario. Perfectas para una escapada romántica.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=47',
      highlighted: ['mágico', 'Perfectas'],
    },
    {
      id: '8',
      name: 'Roberto Fernández',
      subtitle: 'La Rioja, Argentina',
      text: 'Instalaciones impecables y el entorno natural es espectacular. Ideal para quienes buscan tranquilidad y confort.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=58',
      highlighted: ['impecables', 'espectacular'],
    },
    {
      id: '9',
      name: 'Carolina & Diego',
      subtitle: 'Salta, Argentina',
      text: 'Celebramos nuestro aniversario aquí y fue memorable. Atención personalizada y detalles que hacen la diferencia.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=36',
      highlighted: ['memorable', 'personalizada'],
    },
    {
      id: '10',
      name: 'Lucas Morales',
      subtitle: 'Catamarca, Argentina',
      text: 'La mejor decisión para nuestras vacaciones. Precio justo, excelente ubicación y paisajes inolvidables.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=62',
      highlighted: ['mejor decisión', 'inolvidables'],
    },
  ],
  mostrarBoton = true,
  textoBoton = 'Dejanos tu Opinión',
  onClickBoton,
  autoPlayInterval = 2500,
  pauseOnHover = true,
}) => {
  // Estados
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para detectar cuando la sección entra en viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsExpanded(true);
            }, 100);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleClickBoton = () => {
    if (onClickBoton) {
      onClickBoton();
    } else {
      console.log('Abrir formulario de opinión');
    }
  };

  // Navegación del carrusel
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const maxIndex = testimonios.length - 3;
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= testimonios.length - 3;

  // Auto-play del carrusel
  useEffect(() => {
    if (pauseOnHover && isHovered) return;
    if (testimonios.length <= 3) return;
    if (!isExpanded) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= testimonios.length - 3) {
          return 0;
        }
        return prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [testimonios.length, autoPlayInterval, isHovered, pauseOnHover, isExpanded]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsHovered(false);
  };

  return (
    <section
      ref={sectionRef}
      className={`
        w-full bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50
        transition-all duration-1000 ease-out
        ${isExpanded 
          ? 'py-20 md:py-24 min-h-screen' 
          : 'py-12 md:py-16'
        }
      `}
    >
      <div
        className={`
          mx-auto transition-all duration-1000 ease-out
          ${isExpanded 
            ? 'max-w-7xl px-4 md:px-8 opacity-100 scale-100' 
            : 'max-w-5xl px-8 md:px-16 opacity-70 scale-95'
          }
        `}
      >
        {/* Título y subtítulo con animación */}
        <div className={`
          text-center mb-12 md:mb-16
          transition-all duration-1000 delay-200 ease-out
          ${isExpanded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
          }
        `}>
          <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-4">
            Experiencias de Nuestros Huéspedes
          </h2>
          <p className="font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
            Descubrí lo que dicen quienes ya vivieron la experiencia en nuestras cabañas
          </p>
        </div>

        {/* Carrusel de testimonios */}
        <div
          className={`
            relative mb-10
            transition-all duration-1000 delay-400 ease-out
            ${isExpanded 
              ? 'opacity-100 translate-y-0 blur-0' 
              : 'opacity-0 translate-y-12 blur-sm'
            }
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Botones de navegación - Desktop */}
          <div className="hidden lg:block">
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10
                        w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center
                        transition-all duration-300
                        ${
                          isPrevDisabled
                            ? 'opacity-30 cursor-not-allowed'
                            : 'hover:bg-gray-50 hover:shadow-xl hover:scale-110'
                        }`}
              aria-label="Anterior"
            >
              <ChevronLeftIcon />
            </button>

            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10
                        w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center
                        transition-all duration-300
                        ${
                          isNextDisabled
                            ? 'opacity-30 cursor-not-allowed'
                            : 'hover:bg-gray-50 hover:shadow-xl hover:scale-110'
                        }`}
              aria-label="Siguiente"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Contenedor del carrusel - Desktop */}
          <div className="hidden lg:block overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-6 transition-transform duration-500 ease-in-out justify-center"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3 + 2)}%)`,
              }}
            >
              {testimonios.map((testimonio, index) => (
                <div
                  key={testimonio.id}
                  className={`
                    flex-shrink-0
                    transition-all duration-500 ease-out
                    ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ 
                    width: 'calc(33.333% - 16px)',
                    transitionDelay: isExpanded ? `${600 + index * 100}ms` : '0ms'
                  }}
                >
                  <TestimonialCard
                    text={testimonio.text}
                    highlighted={testimonio.highlighted}
                    name={testimonio.name}
                    subtitle={testimonio.subtitle}
                    avatarUrl={testimonio.avatarUrl}
                    rating={testimonio.rating}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Grid responsive para Tablet */}
          <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6 mb-10">
            {testimonios.map((testimonio, index) => (
              <div
                key={testimonio.id}
                className={`
                  flex justify-center
                  transition-all duration-500 ease-out
                  ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{
                  transitionDelay: isExpanded ? `${600 + index * 150}ms` : '0ms'
                }}
              >
                <TestimonialCard
                  text={testimonio.text}
                  highlighted={testimonio.highlighted}
                  name={testimonio.name}
                  subtitle={testimonio.subtitle}
                  avatarUrl={testimonio.avatarUrl}
                  rating={testimonio.rating}
                />
              </div>
            ))}
          </div>

          {/* Mobile: Scroll horizontal */}
          <div className="md:hidden overflow-x-auto pb-4 mb-10 scrollbar-hide">
            <div className="flex gap-4 px-4" style={{ minWidth: 'min-content' }}>
              {testimonios.map((testimonio, index) => (
                <div
                  key={testimonio.id}
                  className={`
                    flex-shrink-0
                    transition-all duration-500 ease-out
                    ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
                  `}
                  style={{
                    transitionDelay: isExpanded ? `${600 + index * 150}ms` : '0ms'
                  }}
                >
                  <TestimonialCard
                    text={testimonio.text}
                    highlighted={testimonio.highlighted}
                    name={testimonio.name}
                    subtitle={testimonio.subtitle}
                    avatarUrl={testimonio.avatarUrl}
                    rating={testimonio.rating}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botón "Dejanos tu Opinión" con animación */}
        {mostrarBoton && (
          <div 
            className={`
              flex justify-center mt-10
              transition-all duration-1000 delay-700 ease-out
              ${isExpanded 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-90'
              }
            `}
          >
            <button
              onClick={handleClickBoton}
              className="font-montserrat inline-flex items-center justify-center px-8 py-4 
                       border-2 border-gray-900 rounded-lg text-base font-semibold 
                       text-gray-900 bg-transparent hover:bg-gray-900 hover:text-white
                       transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {textoBoton}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionTestimoniosMiradorDeLuzV2;
