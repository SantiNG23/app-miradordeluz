import type { FC, ReactNode } from 'react';

interface SectionUbicacionMiradorDeLuzProps {
  etiqueta?: string;
  titulo?: string;
  parrafos?: {
    texto: string;
    destacados?: string[];
  }[];
  fraseDestacada?: string;
  imagenPrincipal?: string;
  imagenSecundaria?: string;
  fondoColor?: string;
  /* Clases Tailwind para controlar tamaños/estilos desde quien use el componente */
  tituloClass?: string;
  parrafoClass?: string;
  fraseClass?: string;
  etiquetaClass?: string;
}

const SectionUbicacionMiradorDeLuz: FC<SectionUbicacionMiradorDeLuzProps> = ({
  etiqueta = 'MIRADOR DE LUZ – VILLA SANTA CRUZ DEL LAGO, CORDOBA',
  titulo = 'Ubicado entre montañas y naturaleza, cerca de todo.',
  parrafos = [
    {
      texto: 'Un complejo de cabañas elegante y moderno con una ubicación privilegiada dentro del valle de Tafí. Estamos a pasos de todo; senderos de montaña, lagos cristalinos, el pueblo histórico y los miradores más impresionantes de la región.',
      destacados: ['ubicación privilegiada']
    },
    {
      texto: 'Contamos con todas las comodidades tanto si vienes por turismo o descanso: cabañas totalmente equipadas, desayuno artesanal, piscina climatizada, fogón, sala de estar, y espacios para reuniones y eventos familiares.',
      destacados: ['todas las comodidades', 'cabañas totalmente equipadas']
    },
  ],
  fraseDestacada = '¡Te esperamos para que vivas la experiencia Mirador de Luz!',
  imagenPrincipal = 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
  imagenSecundaria = 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600',
  fondoColor = 'bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-stone-50',
  tituloClass = 'font-montserrat text-[36px] md:text-[25px] lg:text-[36px] font-extrabold text-[#1E1E1E] leading-tight',
  parrafoClass = 'font-montserrat text-[12px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed',
  fraseClass = 'font-montserrat text-[18px] md:text-[20px] font-bold text-[#1E1E1E]',
  etiquetaClass = 'font-montserrat text-[8px] md:text-[14px] font-semibold text-[#A8936D] tracking-[0.2em] uppercase',
}) => {
  // Función para resaltar palabras específicas en el texto
  const highlightText = (texto: string, destacados: string[] = []) => {
    if (!destacados || destacados.length === 0) {
      return <span>{texto}</span>;
    }

    let partes: Array<string | ReactNode> = [texto];

    destacados.forEach(destacado => {
      const nuevasPartes: Array<string | ReactNode> = [];
      partes.forEach(parte => {
        if (typeof parte === 'string') {
          const regex = new RegExp(`(${destacado})`, 'gi');
          const fragmentos = parte.split(regex);
          fragmentos.forEach((fragmento, idx) => {
            if (fragmento.toLowerCase() === destacado.toLowerCase()) {
              nuevasPartes.push(
                <span key={`${fragmento}-${idx}`} className="font-semibold text-[#A8936D]">
                  {fragmento}
                </span>
              );
            } else if (fragmento) {
              nuevasPartes.push(fragmento);
            }
          });
        } else {
          nuevasPartes.push(parte);
        }
      });
      partes = nuevasPartes;
    });

    return <>{partes}</>;
  };

  return (
    <section id="ubicacion-section" className={`w-full ${fondoColor} relative overflow-hidden my-8`}>
      {/* Textura sutil de fondo (opcional) */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="w-full px-2 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Columna izquierda - Texto */}
          <div className="space-y-6 lg:pr-12 lg:w-7/12">
            {/* Etiqueta superior */}
            <div className="inline-block">
              <span className={etiquetaClass}>
                {etiqueta}
              </span>
            </div>

            {/* Título principal */}
            <h2
              className={tituloClass}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {titulo}
            </h2>

            {/* Párrafos descriptivos */}
            <div className="space-y-5">
              {parrafos.map((parrafo, index) => (
                <p key={index} className={parrafoClass}>
                  {highlightText(parrafo.texto, parrafo.destacados)}
                </p>
              ))}
            </div>

            {/* Frase final destacada */}
            {fraseDestacada && (
              <div className="pt-4">
                <p className={fraseClass}>
                  {fraseDestacada}
                </p>
              </div>
            )}
          </div>

          {/* Columna derecha - Imágenes superpuestas */}
          <div className="relative w-full lg:w-5/12 lg:pl-8 h-[500px] md:h-[600px] lg:h-[650px]">
            {/* Imagen principal (fondo) */}
            <div className="absolute top-0 right-0 w-[90%] h-[86%] lg:w-[92%] lg:h-[88%]">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={imagenPrincipal}
                  alt="Vista del complejo Mirador de Luz"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Imagen secundaria (superpuesta) */}
            <div className="absolute bottom-0 left-[-6%] w-[78%] h-[60%] lg:left-[-8%] lg:w-[70%] lg:h-[60%] z-20">
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl transform -rotate-1 hover:scale-105 hover:rotate-0 transition-transform duration-300">
                <img
                  src={imagenSecundaria}
                  alt="Cabaña Mirador de Luz"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Decoración adicional (opcional) */}
            <div className="absolute top-[40%] right-[10%] w-32 h-32 bg-amber-400/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-[20%] left-[5%] w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionUbicacionMiradorDeLuz;

