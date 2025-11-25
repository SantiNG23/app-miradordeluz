import type { FC, ReactNode } from 'react';

// Iconos SVG para amenities
const BedIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const FireIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  </svg>
);

const MountainIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21L12 3l9 18H3z" />
  </svg>
);

const TvIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const KitchenIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const ArrowRightIcon: FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Tipo de datos para amenities
type Amenity = {
  icon: ReactNode;
  label: string;
};

// Tipo de datos para cabañas
type Cabana = {
  id: string;
  nombre: string;
  etiqueta: string;
  descripcion: string;
  amenities: Amenity[];
  imagenUrl: string;
};

// Props del componente
interface SectionCabanasMiradorDeLuzV3Props {
  cabanas?: Cabana[];
  onReservar?: (cabanaId: string) => void;
  onVerDetalles?: (cabanaId: string) => void;
}

// Datos por defecto de las 4 cabañas
const cabanasDefault: Cabana[] = [
  {
    id: '1',
    nombre: 'Cabaña Mirador',
    etiqueta: 'HASTA 4 PERSONAS',
    descripcion: 'La cabaña más amplia del complejo. Cuenta con vista panorámica a las montañas, dos dormitorios y todas las comodidades para una experiencia distinta en plena naturaleza.',
    amenities: [
      { icon: <BedIcon />, label: 'Cama King Size' },
      { icon: <TvIcon />, label: '2 Smart TV 43"' },
      { icon: <MountainIcon />, label: 'Vista a montañas' },
      { icon: <FireIcon />, label: 'Hogar a leña' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200',
  },
  {
    id: '2',
    nombre: 'Cabaña Bosque',
    etiqueta: 'TAMAÑO 70M²',
    descripcion: 'Una de las cabañas más confortables del complejo. Cuenta con dos livings amplios para disfrutar de la estadía rodeado de naturaleza y tranquilidad absoluta.',
    amenities: [
      { icon: <BedIcon />, label: 'Cama Queen Size' },
      { icon: <TvIcon />, label: 'Smart TV 43"' },
      { icon: <FireIcon />, label: 'Hogar a leña' },
      { icon: <KitchenIcon />, label: 'Cocina equipada' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
  },
  {
    id: '3',
    nombre: 'Cabaña Premium',
    etiqueta: 'VISTA PANORÁMICA',
    descripcion: 'Perfecta para familias que buscan comodidad. Tres dormitorios amplios, cocina completa y deck privado con parrilla para disfrutar al aire libre.',
    amenities: [
      { icon: <BedIcon />, label: '3 Dormitorios' },
      { icon: <TvIcon />, label: 'Smart TV 50"' },
      { icon: <MountainIcon />, label: 'Deck privado' },
      { icon: <KitchenIcon />, label: 'Cocina completa' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200',
  },
  {
    id: '4',
    nombre: 'Cabaña Familiar',
    etiqueta: 'HASTA 6 PERSONAS',
    descripcion: 'Ideal para escapadas en familia. Dos dormitorios amplios, living comedor espacioso y fogón exterior para disfrutar de las noches estrelladas.',
    amenities: [
      { icon: <BedIcon />, label: '2 Dormitorios' },
      { icon: <FireIcon />, label: 'Fogón exterior' },
      { icon: <MountainIcon />, label: 'Vista panorámica' },
      { icon: <KitchenIcon />, label: 'Cocina equipada' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200',
  },
];

const SectionCabanasMiradorDeLuzV3: FC<SectionCabanasMiradorDeLuzV3Props> = ({
  cabanas = cabanasDefault,
  onReservar,
  onVerDetalles,
}) => {
  const handleReservar = (cabanaId: string) => {
    if (onReservar) {
      onReservar(cabanaId);
    } else {
      window.location.href = `/reservas?cabana=${cabanaId}`;
    }
  };

  const handleVerDetalles = (cabanaId: string) => {
    if (onVerDetalles) {
      onVerDetalles(cabanaId);
    } else {
      window.location.href = `/cabanas/${cabanaId}`;
    }
  };

  return (
    <section className="w-full bg-stone-50 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header con título y descripción */}
        <div className="text-center mb-16 md:mb-20">
          {/* Etiqueta superior */}
          <div className="mb-4">
            <span className="font-montserrat text-[14px] font-semibold text-[#A8936D] tracking-[0.2em] uppercase">
              Mirador de Luz
            </span>
          </div>

          {/* Título principal */}
          <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-4 md:mb-6">
            Nuestras Cabañas
          </h2>

          {/* Descripción */}
          <p className="font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
            Descubre el lugar perfecto para tu escapada. Todas nuestras cabañas cuentan con las comodidades necesarias para una estadía inolvidable.
          </p>
        </div>

        {/* Los 4 bloques de cabañas */}
        <div className="space-y-24">
          {cabanas.map((cabana, index) => {
            // Determinar si es par o impar para alternar la dirección
            const esPar = index % 2 === 0;

            return (
              <div key={cabana.id} className="relative">
                {/* Usar flex con dirección alternada */}
                <div className={`flex flex-col ${esPar ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 relative items-center`}>
                  {/* Imagen de la cabaña */}
                  <div className="relative w-full lg:w-[60%] h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden rounded-3xl">
                    <img
                      src={cabana.imagenUrl}
                      alt={cabana.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card blanca superpuesta */}
                  <div className={`relative w-full lg:w-[45%] z-10 -mt-16 lg:mt-0 mx-4 lg:mx-0 ${esPar ? 'lg:-ml-20' : 'lg:-mr-20'}`}>
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                      {/* Etiqueta superior */}
                      <div className="mb-3">
                        <span className="font-montserrat text-[14px] font-semibold text-[#A8936D] tracking-[0.2em] uppercase">
                          {cabana.etiqueta}
                        </span>
                      </div>

                      {/* Nombre de la cabaña */}
                      <h3 className="font-montserrat text-[28px] md:text-[32px] font-bold text-[#1E1E1E] mb-4">
                        {cabana.nombre}
                      </h3>

                      {/* Descripción */}
                      <p className="font-montserrat text-[14px] md:text-[16px] font-medium text-[#4A4A4A] leading-relaxed mb-5">
                        {cabana.descripcion}
                      </p>

                      {/* Amenities en grid 2x2 */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
                        {cabana.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-amber-600">{amenity.icon}</span>
                            <span className="font-montserrat font-medium">{amenity.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Línea divisoria */}
                      <div className="border-t border-gray-200 my-5" />

                      {/* Botones */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Botón Reservar */}
                        <button
                          onClick={() => handleReservar(cabana.id)}
                          className="font-montserrat flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full font-semibold text-sm hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                        >
                          <span>Reservar</span>
                          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <ArrowRightIcon />
                          </span>
                        </button>

                        {/* Botón Ver más detalles */}
                        <button
                          onClick={() => handleVerDetalles(cabana.id)}
                          className="font-montserrat flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-600 text-gray-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all"
                        >
                          <span>Ver más detalles</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionCabanasMiradorDeLuzV3;

