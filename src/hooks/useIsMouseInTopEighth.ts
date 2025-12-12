import { useState, useEffect } from 'react';

/**
 * Custom hook para detectar si el mouse está en el primer octavo superior de la pantalla.
 * @param enabled - Si false, el hook no se activa y siempre retorna false
 * @returns {boolean} True si el mouse está en la zona, False en caso contrario.
 */
const useIsMouseInTopEighth = (enabled: boolean = true) => {
  const [isInTopEighth, setIsInTopEighth] = useState(false);

  useEffect(() => {
    // Si el hook está deshabilitado, no hacer nada
    if (!enabled) {
      console.log('[useIsMouseInTopEighth] Hook deshabilitado');
      setIsInTopEighth(false);
      return;
    }

    console.log('[useIsMouseInTopEighth] Hook activado - registrando listener');

    // Función para manejar el movimiento del mouse
    const handleMouseMove = (event: MouseEvent) => {
      // 1. Obtener la altura total de la ventana (viewport height)
      const windowHeight = window.innerHeight;

      // 2. Calcular el umbral del primer octavo superior (1/8 de la altura)
      const topEighthThreshold = windowHeight / 8;

      // 3. Obtener la posición vertical (Y) actual del mouse
      const mouseY = event.clientY;

      // 4. Determinar si la posición del mouse está dentro de la zona
      const isCurrentlyInZone = mouseY < topEighthThreshold;

      // 5. Actualizar el estado solo si el valor ha cambiado
      if (isCurrentlyInZone !== isInTopEighth) {
        console.log(`[useIsMouseInTopEighth] Mouse ${isCurrentlyInZone ? 'ENTRÓ' : 'SALIÓ'} de zona top (Y: ${mouseY.toFixed(0)}px, umbral: ${topEighthThreshold.toFixed(0)}px)`);
        setIsInTopEighth(isCurrentlyInZone);
      }
    };

    // Agregar el event listener al documento cuando el componente se monta
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Limpiar el event listener cuando el componente se desmonta o el efecto se re-ejecuta
    return () => {
      console.log('[useIsMouseInTopEighth] Limpiando listener');
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInTopEighth, enabled]); // Dependencia para evitar recalcular el estado innecesariamente

  return enabled ? isInTopEighth : false;
};

export default useIsMouseInTopEighth;

