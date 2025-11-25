import { useEffect, type FC } from 'react';

/**
 * Componente que controla la visibilidad del navbar basado en la sección visible
 * Oculta el navbar cuando el usuario sale del Hero Principal
 */
const NavbarVisibilityController: FC = () => {
  useEffect(() => {
    // Obtener el Hero Principal
    const heroSection = document.getElementById('hero-section');
    
    if (!heroSection) return;

    // Crear Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // El hero está visible → mostrar navbar
            document.body.classList.remove('hide-navbar-global');
          } else {
            // El hero NO está visible → ocultar navbar
            document.body.classList.add('hide-navbar-global');
          }
        });
      },
      {
        threshold: 0.1, // Se activa cuando el 10% del hero es visible
        rootMargin: '0px 0px 0px 0px',
      }
    );

    // Observar el hero
    observer.observe(heroSection);

    // Cleanup
    return () => {
      observer.disconnect();
      document.body.classList.remove('hide-navbar-global');
    };
  }, []);

  return null; // Este componente no renderiza nada
};

export default NavbarVisibilityController;


