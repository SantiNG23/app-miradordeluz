import React, { useEffect, useRef } from 'react';
import type { FC } from 'react';

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const TermsModal: FC<TermsModalProps> = ({ open, onClose }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Enfocar el botón cerrar al abrir
    closeButtonRef.current?.focus();

    // Manejar escape para cerrar
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    // Prevenir scroll del body cuando esté abierto
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Términos y condiciones - Mirador de Luz"
      className="fixed inset-0 z-[90] flex items-center justify-center p-6"
    >
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 max-h-[90vh] w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 overflow-y-auto bg-white rounded-lg shadow-2xl p-8">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex-1 text-center">Términos y condiciones</h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Cerrar términos y condiciones"
            className="ml-4 text-gray-500 hover:text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Contenido - Secciones basadas en las imágenes proporcionadas */}
        <section className="space-y-6">
          <article>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Condiciones de la reserva</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <h4 className="font-semibold text-gray-800">Pago anticipado</h4>
                <p className="text-gray-600 mt-2">50% en concepto de seña. El saldo restante lo abonás en el ingreso.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <h4 className="font-semibold text-gray-800">Estadía mínima</h4>
                <p className="text-gray-600 mt-2">2 noches</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <h4 className="font-semibold text-gray-800">Antelación mínima para reservar</h4>
                <p className="text-gray-600 mt-2">1 día</p>
              </div>
            </div>
          </article>

          <hr className="my-6 border-gray-200" />

          <article>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Política de cancelación</h3>
            <h4 className="font-semibold text-gray-800 inline-flex items-center gap-2 justify-start">Cancelación estricta</h4>
            <p className="text-gray-600 mt-2">Seña no reembolsable. Ante la cancelación del huésped, el dueño del alojamiento NO reintegrará el pago de la seña (pago anticipado).</p>
          </article>

          <hr className="my-6 border-gray-200" />

          <article>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Normas del alojamiento</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Apto</h4>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>Bebés (0 a 2 años)</li>
                  <li>Niños (2 a 12 años)</li>
                  <li>Personas con movilidad reducida</li>
                </ul>
              </div>
              <div className="flex flex-col items-center text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Acepta</h4>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>Familias</li>
                  <li>Parejas</li>
                </ul>
              </div>
              <div className="flex flex-col items-center text-center">
                <h4 className="font-semibold text-gray-800 mb-2">No acepta</h4>
                <ul className="list-none space-y-2 text-gray-600">
                  <li>Grupos de jóvenes</li>
                  <li>Mascotas</li>
                  <li>Fumar en el interior</li>
                  <li>Hacer fiestas</li>
                  <li>Recibir visitas</li>
                  <li>Colocar música alta</li>
                </ul>
              </div>
            </div>
          </article>

          <hr className="my-6 border-gray-200" />

          <article>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Horarios de ingreso y egreso</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
              <div className="flex flex-col items-center text-center">
                <h4 className="font-medium">Check-in</h4>
                <p className="mt-2">15:00 hs</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <h4 className="font-medium">Check-out</h4>
                <p className="mt-2">10:00 hs</p>
              </div>
            </div>
          </article>

          <hr className="my-6 border-gray-200" />

          <article>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Política de garantía</h3>
            <div className="text-gray-700 space-y-2">
              <p>Se solicita garantía al ingreso.</p>
              <p>AR $60000 en efectivo (será reintegrado al huésped al retirarse).</p>
              <p>Enviar foto frente y dorso del DNI.</p>
              <p>Presentar DNI o Pasaporte.</p>
              <p>Firma contrato de locación temporal.</p>
            </div>
          </article>

          <hr className="my-6 border-gray-200" />

          <article>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Formas de pago</h3>
            <ul className="space-y-3 text-gray-700">
              <li>Transferencia bancaria (Reserva inmediata)</li>
              <li>Efectivo</li>
            </ul>
          </article>

        </section>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;


