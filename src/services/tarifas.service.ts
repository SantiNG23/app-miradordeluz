import { api, ApiResponse } from "./api";
import type {
  GrupoPrecio,
  GrupoPrecioFormData,
  RangoPrecio,
  RangoPrecioFormData,
} from "@/types";

// ============================================
// ENDPOINTS - GRUPOS DE PRECIO
// ============================================
const GRUPOS_ENDPOINTS = {
  LIST: "/grupos-precios",
  CREATE: "/grupos-precios",
  GET_BY_ID: (id: string) => `/grupos-precios/${id}`,
  UPDATE: (id: string) => `/grupos-precios/${id}`,
  DELETE: (id: string) => `/grupos-precios/${id}`,
};

// ============================================
// ENDPOINTS - RANGOS DE PRECIO
// ============================================
const RANGOS_ENDPOINTS = {
  LIST_BY_GRUPO: (grupoId: string) => `/grupos-precios/${grupoId}/rangos`,
  CREATE: "/rangos-precios",
  GET_BY_ID: (id: string) => `/rangos-precios/${id}`,
  UPDATE: (id: string) => `/rangos-precios/${id}`,
  DELETE: (id: string) => `/rangos-precios/${id}`,
  GET_ACTIVOS: "/rangos-precios/activos", // Rangos vigentes por fecha
};

// ============================================
// GRUPOS DE PRECIO SERVICE
// ============================================
export const gruposPreciosService = {
  /**
   * GET /api/grupos-precios
   * Listar todos los grupos de precios con sus rangos
   */
  async getAll(): Promise<ApiResponse<GrupoPrecio[]>> {
    const response = await api.get<ApiResponse<GrupoPrecio[]>>(
      GRUPOS_ENDPOINTS.LIST
    );
    return response.data;
  },

  /**
   * GET /api/grupos-precios/:id
   * Obtener un grupo de precio por ID
   */
  async getById(id: string): Promise<ApiResponse<GrupoPrecio>> {
    const response = await api.get<ApiResponse<GrupoPrecio>>(
      GRUPOS_ENDPOINTS.GET_BY_ID(id)
    );
    return response.data;
  },

  /**
   * POST /api/grupos-precios
   * Crear nuevo grupo de precio
   */
  async create(data: GrupoPrecioFormData): Promise<ApiResponse<GrupoPrecio>> {
    const response = await api.post<ApiResponse<GrupoPrecio>>(
      GRUPOS_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * PUT /api/grupos-precios/:id
   * Actualizar grupo de precio
   */
  async update(
    id: string,
    data: Partial<GrupoPrecioFormData>
  ): Promise<ApiResponse<GrupoPrecio>> {
    const response = await api.put<ApiResponse<GrupoPrecio>>(
      GRUPOS_ENDPOINTS.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * DELETE /api/grupos-precios/:id
   * Eliminar grupo de precio
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(
      GRUPOS_ENDPOINTS.DELETE(id)
    );
    return response.data;
  },
};

// ============================================
// RANGOS DE PRECIO SERVICE
// ============================================
export const rangosPreciosService = {
  /**
   * GET /api/grupos-precios/:grupoId/rangos
   * Listar rangos de un grupo específico
   */
  async getByGrupo(grupoId: string): Promise<ApiResponse<RangoPrecio[]>> {
    const response = await api.get<ApiResponse<RangoPrecio[]>>(
      RANGOS_ENDPOINTS.LIST_BY_GRUPO(grupoId)
    );
    return response.data;
  },

  /**
   * GET /api/rangos-precios/activos?fecha=2025-12-25
   * Obtener rangos activos para una fecha específica
   */
  async getActivos(fecha?: string): Promise<ApiResponse<RangoPrecio[]>> {
    const url = fecha
      ? `${RANGOS_ENDPOINTS.GET_ACTIVOS}?fecha=${fecha}`
      : RANGOS_ENDPOINTS.GET_ACTIVOS;
    const response = await api.get<ApiResponse<RangoPrecio[]>>(url);
    return response.data;
  },

  /**
   * POST /api/rangos-precios
   * Crear nuevo rango de precio
   */
  async create(data: RangoPrecioFormData): Promise<ApiResponse<RangoPrecio>> {
    const response = await api.post<ApiResponse<RangoPrecio>>(
      RANGOS_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * PUT /api/rangos-precios/:id
   * Actualizar rango de precio
   */
  async update(
    id: string,
    data: Partial<RangoPrecioFormData>
  ): Promise<ApiResponse<RangoPrecio>> {
    const response = await api.put<ApiResponse<RangoPrecio>>(
      RANGOS_ENDPOINTS.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * DELETE /api/rangos-precios/:id
   * Eliminar rango de precio
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(
      RANGOS_ENDPOINTS.DELETE(id)
    );
    return response.data;
  },
};
