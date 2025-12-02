import { api, ApiResponse, buildQueryParams } from "./api";
import type {
  EventoCalendario,
  ResumenDiario,
  ReporteOcupacion,
  ReporteReservas,
  FiltroReportes,
} from "@/types";

// ============================================
// ENDPOINTS
// ============================================
const ENDPOINTS = {
  CALENDARIO: "/calendario",
  RESUMEN_DIARIO: "/dashboard/resumen-diario",
  REPORTE_OCUPACION: "/reportes/ocupacion",
  REPORTE_RESERVAS: "/reportes/reservas",
  REPORTE_HISTORIAL_DNI: "/reportes/historial-dni",
};

// ============================================
// CALENDARIO SERVICE
// ============================================
export const calendarioService = {
  /**
   * GET /api/calendario?fechaInicio=2025-12-01&fechaFin=2025-12-31
   * Obtener eventos del calendario (reservas por cabaña)
   */
  async getEventos(
    fechaInicio: string,
    fechaFin: string
  ): Promise<ApiResponse<EventoCalendario[]>> {
    const queryString = buildQueryParams({ fechaInicio, fechaFin });
    const response = await api.get<ApiResponse<EventoCalendario[]>>(
      `${ENDPOINTS.CALENDARIO}?${queryString}`
    );
    return response.data;
  },
};

// ============================================
// DASHBOARD SERVICE
// ============================================
export const dashboardService = {
  /**
   * GET /api/dashboard/resumen-diario
   * Obtener resumen del día actual (check-ins, check-outs, pendientes)
   */
  async getResumenDiario(): Promise<ApiResponse<ResumenDiario>> {
    const response = await api.get<ApiResponse<ResumenDiario>>(
      ENDPOINTS.RESUMEN_DIARIO
    );
    return response.data;
  },
};

// ============================================
// REPORTES SERVICE
// ============================================
export const reportesService = {
  /**
   * GET /api/reportes/ocupacion
   * Reporte de ocupación por cabaña en rango de fechas
   */
  async getOcupacion(
    filtros: FiltroReportes
  ): Promise<ApiResponse<ReporteOcupacion[]>> {
    const queryString = buildQueryParams(filtros);
    const response = await api.get<ApiResponse<ReporteOcupacion[]>>(
      `${ENDPOINTS.REPORTE_OCUPACION}?${queryString}`
    );
    return response.data;
  },

  /**
   * GET /api/reportes/reservas
   * Reporte resumen de reservas por estado y totales
   */
  async getReservas(
    filtros: FiltroReportes
  ): Promise<ApiResponse<ReporteReservas>> {
    const queryString = buildQueryParams(filtros);
    const response = await api.get<ApiResponse<ReporteReservas>>(
      `${ENDPOINTS.REPORTE_RESERVAS}?${queryString}`
    );
    return response.data;
  },

  /**
   * GET /api/reportes/historial-dni?dni=12345678
   * Historial completo por DNI (cliente o huésped)
   */
  async getHistorialPorDni(dni: string): Promise<ApiResponse<any[]>> {
    const response = await api.get<ApiResponse<any[]>>(
      `${ENDPOINTS.REPORTE_HISTORIAL_DNI}?dni=${dni}`
    );
    return response.data;
  },
};
