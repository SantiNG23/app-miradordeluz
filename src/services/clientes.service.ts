import { api, ApiResponse, PaginatedResponse, buildQueryParams } from "./api";
import type { Cliente, ClienteFormData } from "@/types";

// ============================================
// ENDPOINTS
// ============================================
const ENDPOINTS = {
  LIST: "/clientes",
  CREATE: "/clientes",
  GET_BY_ID: (id: string) => `/clientes/${id}`,
  UPDATE: (id: string) => `/clientes/${id}`,
  DELETE: (id: string) => `/clientes/${id}`,
  SEARCH_BY_DNI: "/clientes/buscar-dni",
  HISTORY: (id: string) => `/clientes/${id}/historial`,
};

// ============================================
// FILTROS
// ============================================
export interface ClientesFilters {
  search?: string;
  dni?: string;
  localidad?: string;
  page?: number;
  pageSize?: number;
}

// ============================================
// SERVICE
// ============================================
export const clientesService = {
  /**
   * GET /api/clientes
   * Listar clientes con paginación y filtros
   */
  async getAll(filters?: ClientesFilters): Promise<PaginatedResponse<Cliente>> {
    const queryString = filters ? buildQueryParams(filters) : "";
    const url = queryString
      ? `${ENDPOINTS.LIST}?${queryString}`
      : ENDPOINTS.LIST;

    const response = await api.get<PaginatedResponse<Cliente>>(url);
    return response.data;
  },

  /**
   * GET /api/clientes/:id
   * Obtener un cliente por ID
   */
  async getById(id: string): Promise<ApiResponse<Cliente>> {
    const response = await api.get<ApiResponse<Cliente>>(
      ENDPOINTS.GET_BY_ID(id)
    );
    return response.data;
  },

  /**
   * GET /api/clientes/buscar-dni?dni=12345678
   * Buscar cliente por DNI
   */
  async getByDni(dni: string): Promise<ApiResponse<Cliente>> {
    const response = await api.get<ApiResponse<Cliente>>(
      `${ENDPOINTS.SEARCH_BY_DNI}?dni=${dni}`
    );
    return response.data;
  },

  /**
   * POST /api/clientes
   * Crear un nuevo cliente
   */
  async create(data: ClienteFormData): Promise<ApiResponse<Cliente>> {
    const response = await api.post<ApiResponse<Cliente>>(
      ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * PUT /api/clientes/:id
   * Actualizar un cliente existente
   */
  async update(
    id: string,
    data: Partial<ClienteFormData>
  ): Promise<ApiResponse<Cliente>> {
    const response = await api.put<ApiResponse<Cliente>>(
      ENDPOINTS.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * DELETE /api/clientes/:id
   * Eliminar un cliente (soft delete recomendado en backend)
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(ENDPOINTS.DELETE(id));
    return response.data;
  },

  /**
   * GET /api/clientes/:id/historial
   * Obtener historial de reservas del cliente
   */
  async getHistory(id: string): Promise<ApiResponse<any[]>> {
    const response = await api.get<ApiResponse<any[]>>(ENDPOINTS.HISTORY(id));
    return response.data;
  },
};
