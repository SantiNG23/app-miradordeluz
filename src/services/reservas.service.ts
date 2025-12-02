import { api, ApiResponse, PaginatedResponse, buildQueryParams } from "./api";
import type { Reserva, ReservaFormData, FiltroReservas } from "@/types";

// ============================================
// ENDPOINTS
// ============================================
const ENDPOINTS = {
  LIST: "/reservas",
  CREATE: "/reservas",
  GET_BY_ID: (id: string) => `/reservas/${id}`,
  UPDATE: (id: string) => `/reservas/${id}`,
  DELETE: (id: string) => `/reservas/${id}`,
  UPDATE_ESTADO: (id: string) => `/reservas/${id}/estado`,
  CHECK_DISPONIBILIDAD: "/reservas/disponibilidad",
  CALCULAR_PRECIO: "/reservas/calcular-precio",
  REGISTRAR_PAGO: (id: string) => `/reservas/${id}/pagos`,
  HISTORIAL_DNI: "/reservas/historial-dni",
};

// ============================================
// REQUEST/RESPONSE TYPES
// ============================================
export interface DisponibilidadRequest {
  cabanaId: string;
  fechaCheckIn: string; // ISO format
  fechaCheckOut: string; // ISO format
  reservaIdExcluir?: string; // Para ediciones
}

export interface DisponibilidadResponse {
  disponible: boolean;
  mensaje?: string;
}

export interface CalcularPrecioRequest {
  cabanaId: string;
  fechaCheckIn: string;
  fechaCheckOut: string;
}

export interface CalcularPrecioResponse {
  precioTotal: number;
  cantidadNoches: number;
  desglose: {
    fecha: string;
    grupoPrecio: string;
    precioNoche: number;
  }[];
}

export interface RegistrarPagoRequest {
  monto: number;
  metodoPago: string;
  tipoPago: "sena" | "saldo";
  fechaPago: string;
  observaciones?: string;
}

// ============================================
// SERVICE
// ============================================
export const reservasService = {
  /**
   * GET /api/reservas
   * Listar reservas con filtros y paginación
   */
  async getAll(
    filters?: FiltroReservas & { page?: number; pageSize?: number }
  ): Promise<PaginatedResponse<Reserva>> {
    const queryString = filters ? buildQueryParams(filters) : "";
    const url = queryString
      ? `${ENDPOINTS.LIST}?${queryString}`
      : ENDPOINTS.LIST;

    const response = await api.get<PaginatedResponse<Reserva>>(url);
    return response.data;
  },

  /**
   * GET /api/reservas/:id
   * Obtener una reserva por ID con relaciones
   */
  async getById(id: string): Promise<ApiResponse<Reserva>> {
    const response = await api.get<ApiResponse<Reserva>>(
      ENDPOINTS.GET_BY_ID(id)
    );
    return response.data;
  },

  /**
   * POST /api/reservas
   * Crear nueva reserva
   */
  async create(data: ReservaFormData): Promise<ApiResponse<Reserva>> {
    const response = await api.post<ApiResponse<Reserva>>(
      ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * PUT /api/reservas/:id
   * Actualizar reserva existente
   */
  async update(
    id: string,
    data: Partial<ReservaFormData>
  ): Promise<ApiResponse<Reserva>> {
    const response = await api.put<ApiResponse<Reserva>>(
      ENDPOINTS.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * DELETE /api/reservas/:id
   * Cancelar reserva (cambiar estado a cancelada)
   */
  async cancel(id: string): Promise<ApiResponse<Reserva>> {
    const response = await api.delete<ApiResponse<Reserva>>(
      ENDPOINTS.DELETE(id)
    );
    return response.data;
  },

  /**
   * PATCH /api/reservas/:id/estado
   * Cambiar estado de la reserva
   */
  async updateEstado(
    id: string,
    nuevoEstado: Reserva["estado"]
  ): Promise<ApiResponse<Reserva>> {
    const response = await api.patch<ApiResponse<Reserva>>(
      ENDPOINTS.UPDATE_ESTADO(id),
      { estado: nuevoEstado }
    );
    return response.data;
  },

  /**
   * POST /api/reservas/disponibilidad
   * Verificar disponibilidad de cabaña en fechas
   */
  async checkDisponibilidad(
    data: DisponibilidadRequest
  ): Promise<ApiResponse<DisponibilidadResponse>> {
    const response = await api.post<ApiResponse<DisponibilidadResponse>>(
      ENDPOINTS.CHECK_DISPONIBILIDAD,
      data
    );
    return response.data;
  },

  /**
   * POST /api/reservas/calcular-precio
   * Calcular precio según fechas y grupos de precios
   */
  async calcularPrecio(
    data: CalcularPrecioRequest
  ): Promise<ApiResponse<CalcularPrecioResponse>> {
    const response = await api.post<ApiResponse<CalcularPrecioResponse>>(
      ENDPOINTS.CALCULAR_PRECIO,
      data
    );
    return response.data;
  },

  /**
   * POST /api/reservas/:id/pagos
   * Registrar pago (seña o saldo)
   */
  async registrarPago(
    reservaId: string,
    data: RegistrarPagoRequest
  ): Promise<ApiResponse<any>> {
    const response = await api.post<ApiResponse<any>>(
      ENDPOINTS.REGISTRAR_PAGO(reservaId),
      data
    );
    return response.data;
  },

  /**
   * GET /api/reservas/historial-dni?dni=12345678
   * Obtener historial de reservas por DNI (cliente o huésped)
   */
  async getHistorialByDni(dni: string): Promise<ApiResponse<Reserva[]>> {
    const response = await api.get<ApiResponse<Reserva[]>>(
      `${ENDPOINTS.HISTORIAL_DNI}?dni=${dni}`
    );
    return response.data;
  },
};
