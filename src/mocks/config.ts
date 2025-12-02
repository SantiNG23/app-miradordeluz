/**
 * Configuración para el modo de desarrollo con datos mock
 *
 * IMPORTANTE:
 * - En desarrollo: usar mocks para no depender del backend
 * - En producción: siempre usar API real
 */

export const MOCK_CONFIG = {
  /**
   * Habilitar/deshabilitar datos mock globalmente
   * Cambiar a false para usar API real
   */
  enabled: import.meta.env.VITE_USE_MOCKS === "true" || import.meta.env.DEV,

  /**
   * Delay simulado para requests (ms)
   * Simula latencia de red realista
   */
  delay: {
    min: 200,
    max: 800,
  },

  /**
   * Configuración por módulo
   * Permite habilitar/deshabilitar mocks selectivamente
   */
  modules: {
    clientes: true,
    reservas: true,
    cabanas: true,
    tarifas: true,
    dashboard: true,
    calendario: true,
    reportes: true,
  },
} as const;

/**
 * Helper para simular delay de red
 */
export const mockDelay = (): Promise<void> => {
  if (!MOCK_CONFIG.enabled) return Promise.resolve();

  const delay =
    Math.random() * (MOCK_CONFIG.delay.max - MOCK_CONFIG.delay.min) +
    MOCK_CONFIG.delay.min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Helper para verificar si los mocks están habilitados para un módulo
 */
export const isMockEnabled = (
  module: keyof typeof MOCK_CONFIG.modules
): boolean => {
  return MOCK_CONFIG.enabled && MOCK_CONFIG.modules[module];
};
