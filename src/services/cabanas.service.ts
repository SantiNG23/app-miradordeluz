import { api, ApiResponse, PaginatedResponse } from "./api";
import type {
  Cabana,
  CabanaFormData,
  Caracteristica,
  CaracteristicaFormData,
} from "@/types";

// ============================================
// ENDPOINTS - CABAÑAS
// ============================================
const CABANAS_ENDPOINTS = {
  LIST: "/cabanas",
  CREATE: "/cabanas",
  GET_BY_ID: (id: string) => `/cabanas/${id}`,
  UPDATE: (id: string) => `/cabanas/${id}`,
  DELETE: (id: string) => `/cabanas/${id}`,
  TOGGLE_ESTADO: (id: string) => `/cabanas/${id}/toggle-estado`,
};

// ============================================
// ENDPOINTS - CARACTERÍSTICAS
// ============================================
const CARACTERISTICAS_ENDPOINTS = {
  LIST: "/caracteristicas",
  CREATE: "/caracteristicas",
  GET_BY_ID: (id: string) => `/caracteristicas/${id}`,
  UPDATE: (id: string) => `/caracteristicas/${id}`,
  DELETE: (id: string) => `/caracteristicas/${id}`,
};

// ============================================
// CABAÑAS SERVICE
// ============================================
export const cabanasService = {
  /**
   * GET /api/cabanas
   * Listar todas las cabañas (incluye características)
   */
  async getAll(): Promise<ApiResponse<Cabana[]>> {
    const response = await api.get<ApiResponse<Cabana[]>>(
      CABANAS_ENDPOINTS.LIST
    );
    return response.data;
  },

  /**
   * GET /api/cabanas/:id
   * Obtener una cabaña por ID con características
   */
  async getById(id: string): Promise<ApiResponse<Cabana>> {
    const response = await api.get<ApiResponse<Cabana>>(
      CABANAS_ENDPOINTS.GET_BY_ID(id)
    );
    return response.data;
  },

  /**
   * POST /api/cabanas
   * Crear nueva cabaña
   */
  async create(data: CabanaFormData): Promise<ApiResponse<Cabana>> {
    const response = await api.post<ApiResponse<Cabana>>(
      CABANAS_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * PUT /api/cabanas/:id
   * Actualizar cabaña existente
   */
  async update(
    id: string,
    data: Partial<CabanaFormData>
  ): Promise<ApiResponse<Cabana>> {
    const response = await api.put<ApiResponse<Cabana>>(
      CABANAS_ENDPOINTS.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * DELETE /api/cabanas/:id
   * Eliminar cabaña
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(
      CABANAS_ENDPOINTS.DELETE(id)
    );
    return response.data;
  },

  /**
   * PATCH /api/cabanas/:id/toggle-estado
   * Activar/desactivar cabaña
   */
  async toggleEstado(id: string): Promise<ApiResponse<Cabana>> {
    const response = await api.patch<ApiResponse<Cabana>>(
      CABANAS_ENDPOINTS.TOGGLE_ESTADO(id)
    );
    return response.data;
  },
};

// ============================================
// CARACTERÍSTICAS SERVICE
// ============================================
export const caracteristicasService = {
  /**
   * GET /api/caracteristicas
   * Listar todas las características del pool
   */
  async getAll(): Promise<ApiResponse<Caracteristica[]>> {
    const response = await api.get<ApiResponse<Caracteristica[]>>(
      CARACTERISTICAS_ENDPOINTS.LIST
    );
    return response.data;
  },

  /**
   * GET /api/caracteristicas/:id
   * Obtener una característica por ID
   */
  async getById(id: string): Promise<ApiResponse<Caracteristica>> {
    const response = await api.get<ApiResponse<Caracteristica>>(
      CARACTERISTICAS_ENDPOINTS.GET_BY_ID(id)
    );
    return response.data;
  },

  /**
   * POST /api/caracteristicas
   * Crear nueva característica
   */
  async create(
    data: CaracteristicaFormData
  ): Promise<ApiResponse<Caracteristica>> {
    const response = await api.post<ApiResponse<Caracteristica>>(
      CARACTERISTICAS_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * PUT /api/caracteristicas/:id
   * Actualizar característica
   */
  async update(
    id: string,
    data: Partial<CaracteristicaFormData>
  ): Promise<ApiResponse<Caracteristica>> {
    const response = await api.put<ApiResponse<Caracteristica>>(
      CARACTERISTICAS_ENDPOINTS.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * DELETE /api/caracteristicas/:id
   * Eliminar característica del pool
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(
      CARACTERISTICAS_ENDPOINTS.DELETE(id)
    );
    return response.data;
  },
};
