import { type FC, type ReactNode } from 'react';

// Iconos de react-icons (puedes instalar con: npm install react-icons)
// Por ahora usaré SVGs inline simples

const WifiIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);

const CoffeeIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h16a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm16 0v10m-8-5h.01M7 10h.01" />
  </svg>
);

const CarIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1-1V4a1 1 0 011-1h2a1 1 0 011 1v3m0 0h4l2 5m-6-5v9a1 1 0 001 1h2a1 1 0 001-1v-9" />
  </svg>
);

const CleanIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const FireIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  </svg>
);

const ClockIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Tipos
export interface Servicio {
  id: string;
  icon?: ReactNode;
  titulo: string;
  descripcion: string;
  colorAccent?: 'green' | 'amber' | 'orange';
}

export interface Instalacion {
  id: string;
  titulo: string;
  descripcion?: string;
  icon?: ReactNode;
}

interface SectionServiciosInstalacionesMiradorDeLuzProps {
  servicios?: Servicio[];
  instalaciones?: Instalacion[];
  imagenesInstalaciones?: string[];
  mostrarCTA?: boolean;
  textoCTA?: string;
  onClickCTA?: () => void;
}

const SectionServiciosInstalacionesMiradorDeLuz: FC<SectionServiciosInstalacionesMiradorDeLuzProps> = ({
  servicios = [
    {
      id: '1',
      icon: <CoffeeIcon />,
      titulo: 'Desayuno casero incluido',
      descripcion: 'Comenzá el día con productos regionales y caseros',
      colorAccent: 'amber',
    },
    {
      id: '2',
      icon: <WifiIcon />,
      titulo: 'WiFi de alta velocidad',
      descripcion: 'Conexión gratuita en todas las cabañas y espacios comunes',
      colorAccent: 'green',
    },
    {
      id: '3',
      icon: <CarIcon />,
      titulo: 'Estacionamiento privado',
      descripcion: 'Espacio seguro dentro del predio para tu vehículo',
      colorAccent: 'green',
    },
    {
      id: '4',
      icon: <CleanIcon />,
      titulo: 'Ropa blanca y limpieza',
      descripcion: 'Toallas, sábanas y servicio de limpieza incluidos',
      colorAccent: 'amber',
    },
    {
      id: '5',
      icon: <FireIcon />,
      titulo: 'Calefacción y A/C',
      descripcion: 'Climatización completa para tu confort todo el año',
      colorAccent: 'orange',
    },
    {
      id: '6',
      icon: <ClockIcon />,
      titulo: 'Check-in flexible',
      descripcion: 'Horarios adaptados según disponibilidad',
      colorAccent: 'green',
    },
  ],
  instalaciones = [
    {
      id: '1',
      titulo: 'Pileta con solarium',
      descripcion: 'Disfruta del agua y el sol en nuestro espacio renovado',
    },
    {
      id: '2',
      titulo: 'Espacios verdes y miradores',
      descripcion: 'Amplios jardines con vistas panorámicas a las sierras',
    },
    {
      id: '3',
      titulo: 'Quincho y zona de fogón',
      descripcion: 'Perfectos para asados y reuniones al aire libre',
    },
    {
      id: '4',
      titulo: 'Decks y livings exteriores',
      descripcion: 'Espacios de descanso integrados con la naturaleza',
    },
    {
      id: '5',
      titulo: 'Vistas panorámicas',
      descripcion: 'Miradores estratégicos con vista a las montañas',
    },
  ],
  imagenesInstalaciones = [
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
  ],
  mostrarCTA = true,
  textoCTA = 'Ver más detalles',
  onClickCTA,
}) => {
  // Función para obtener color de acento
  const getAccentColor = (color?: 'green' | 'amber' | 'orange') => {
    const colors = {
      green: 'bg-green-50 text-green-600',
      amber: 'bg-amber-50 text-amber-600',
      orange: 'bg-orange-50 text-orange-600',
    };
    return colors[color || 'green'];
  };

  const handleClickCTA = () => {
    if (onClickCTA) {
      onClickCTA();
    } else {
      console.log('Ver más detalles');
    }
  };

  return (
    <section className="bg-stone-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Encabezado de la sección */}
        <div className="text-center mb-12 md:mb-16">
          {/* Etiqueta pequeña */}
          <div className="mb-4">
            <span className="font-montserrat text-[14px] font-semibold text-[#A8936D] tracking-[0.2em] uppercase">
              SERVICIOS & INSTALACIONES
            </span>
          </div>

          {/* Título principal */}
          <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-4">
            Todo lo que necesitás para desconectar
          </h2>

          {/* Subtítulo */}
          <p className="font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed max-w-3xl mx-auto">
            Disfrutá del confort de nuestras cabañas totalmente equipadas y de los espacios
            comunes pensados para que tu estadía sea perfecta. Naturaleza, comodidad y atención
            personalizada en cada detalle.
          </p>
        </div>

        {/* Bloque de Servicios */}
        <div className="mb-16 md:mb-20">
          {/* Título del bloque */}
          <div className="mb-6">
            <h3 className="font-montserrat text-[28px] md:text-[36px] font-bold text-[#1E1E1E] mb-2">
              Servicios
            </h3>
            <p className="font-montserrat text-[16px] font-medium text-[#4A4A4A]">
              Todo incluido para que solo te preocupes por disfrutar
            </p>
          </div>

          {/* Grid de servicios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((servicio) => (
              <div
                key={servicio.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex gap-4 items-start"
              >
                {/* Ícono */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getAccentColor(
                    servicio.colorAccent
                  )}`}
                >
                  {servicio.icon || <CleanIcon />}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-montserrat font-semibold text-[#1E1E1E] text-base mb-1">
                    {servicio.titulo}
                  </h4>
                  <p className="font-montserrat text-sm font-medium text-[#4A4A4A] leading-relaxed">
                    {servicio.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bloque de Instalaciones Externas */}
        <div>
          {/* Título del bloque */}
          <div className="mb-8">
            <h3 className="font-montserrat text-[28px] md:text-[36px] font-bold text-[#1E1E1E] mb-2">
              Instalaciones Externas
            </h3>
            <p className="font-montserrat text-[16px] font-medium text-[#4A4A4A]">
              Disfrutá del entorno natural y los espacios pensados para compartir
            </p>
          </div>

          {/* Layout: Texto + Imágenes */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-start">
            {/* Columna izquierda: Lista de instalaciones */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <ul className="space-y-4">
                {instalaciones.map((instalacion) => (
                  <li key={instalacion.id} className="flex items-start gap-3">
                    {/* Bullet decorativo */}
                    <span className="mt-2 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />

                    {/* Contenido */}
                    <div className="flex-1">
                      <h4 className="font-montserrat font-semibold text-[#1E1E1E] text-base mb-1">
                        {instalacion.titulo}
                      </h4>
                      {instalacion.descripcion && (
                        <p className="font-montserrat text-sm font-medium text-[#4A4A4A]">
                          {instalacion.descripcion}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna derecha: Collage de imágenes */}
            <div className="grid grid-cols-2 gap-4">
              {/* Imagen grande (ocupa 2 columnas) */}
              {imagenesInstalaciones[0] && (
                <div className="col-span-2 h-56 md:h-64 rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src={imagenesInstalaciones[0]}
                    alt="Instalaciones Mirador de Luz"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Imagen pequeña 1 */}
              {imagenesInstalaciones[1] && (
                <div className="h-40 md:h-48 rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src={imagenesInstalaciones[1]}
                    alt="Espacios verdes"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Imagen pequeña 2 */}
              {imagenesInstalaciones[2] && (
                <div className="h-40 md:h-48 rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src={imagenesInstalaciones[2]}
                    alt="Quincho y fogón"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call To Action */}
        {mostrarCTA && (
          <div className="text-center mt-12 md:mt-16">
            <p className="font-montserrat text-[16px] font-medium text-[#4A4A4A] mb-4">
              ¿Querés saber más sobre nuestras cabañas y servicios?
            </p>
            <button
              onClick={handleClickCTA}
              className="font-montserrat inline-flex items-center px-8 py-3 rounded-full border-2 border-gray-800 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {textoCTA}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionServiciosInstalacionesMiradorDeLuz;

