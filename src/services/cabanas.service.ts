import { api, ApiResponse } from "./api";
import type {
  Cabana,
  CabanaFormData,
  Caracteristica,
  CaracteristicaFormData,
} from "@/types";
import { MOCK_CONFIG, mockDelay } from "@/mocks/config";
import {
  MOCK_CABANAS,
  MOCK_CARACTERISTICAS,
  generateId,
  generateISODate,
} from "@/mocks";

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

// Mock storage
let mockCabanas = [...MOCK_CABANAS];
let mockCaracteristicas = [...MOCK_CARACTERISTICAS];

export const cabanasService = {
  /**
   * GET /api/cabanas
   * Listar todas las cabañas (incluye características)
   */
  async getAll(): Promise<ApiResponse<Cabana[]>> {
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      return {
        data: mockCabanas,
        success: true,
        message: "Cabañas obtenidas exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      const cabana = mockCabanas.find((c) => c.id === id);
      if (!cabana) {
        throw new Error("Cabaña no encontrada");
      }
      return {
        data: cabana,
        success: true,
        message: "Cabaña obtenida exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      const caracteristicas = mockCaracteristicas.filter((c) =>
        data.caracteristicaIds.includes(c.id)
      );
      const newCabana: Cabana = {
        id: `cab_${generateId()}`,
        nombre: data.nombre,
        capacidad: data.capacidad,
        activa: data.activa,
        caracteristicas,
        tenantId: "1",
        createdAt: generateISODate(0),
        updatedAt: generateISODate(0),
      };
      mockCabanas.push(newCabana);
      return {
        data: newCabana,
        success: true,
        message: "Cabaña creada exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      const index = mockCabanas.findIndex((c) => c.id === id);
      if (index === -1) {
        throw new Error("Cabaña no encontrada");
      }
      const caracteristicas = data.caracteristicaIds
        ? mockCaracteristicas.filter((c) =>
            data.caracteristicaIds!.includes(c.id)
          )
        : mockCabanas[index].caracteristicas;

      mockCabanas[index] = {
        ...mockCabanas[index],
        nombre: data.nombre ?? mockCabanas[index].nombre,
        capacidad: data.capacidad ?? mockCabanas[index].capacidad,
        activa: data.activa ?? mockCabanas[index].activa,
        caracteristicas,
        updatedAt: generateISODate(0),
      };
      return {
        data: mockCabanas[index],
        success: true,
        message: "Cabaña actualizada exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      mockCabanas = mockCabanas.filter((c) => c.id !== id);
      return {
        data: undefined as any,
        success: true,
        message: "Cabaña eliminada exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      const index = mockCabanas.findIndex((c) => c.id === id);
      if (index === -1) {
        throw new Error("Cabaña no encontrada");
      }
      mockCabanas[index] = {
        ...mockCabanas[index],
        activa: !mockCabanas[index].activa,
        updatedAt: generateISODate(0),
      };
      return {
        data: mockCabanas[index],
        success: true,
        message: "Estado actualizado exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      return {
        data: mockCaracteristicas,
        success: true,
        message: "Características obtenidas exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      const caracteristica = mockCaracteristicas.find((c) => c.id === id);
      if (!caracteristica) {
        throw new Error("Característica no encontrada");
      }
      return {
        data: caracteristica,
        success: true,
        message: "Característica obtenida exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      const newCaracteristica: Caracteristica = {
        id: `car_${generateId()}`,
        nombre: data.nombre,
        descripcion: data.descripcion,
        tenantId: "1",
        createdAt: generateISODate(0),
        updatedAt: generateISODate(0),
      };
      mockCaracteristicas.push(newCaracteristica);
      return {
        data: newCaracteristica,
        success: true,
        message: "Característica creada exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      const index = mockCaracteristicas.findIndex((c) => c.id === id);
      if (index === -1) {
        throw new Error("Característica no encontrada");
      }
      mockCaracteristicas[index] = {
        ...mockCaracteristicas[index],
        nombre: data.nombre ?? mockCaracteristicas[index].nombre,
        descripcion: data.descripcion ?? mockCaracteristicas[index].descripcion,
        updatedAt: generateISODate(0),
      };
      return {
        data: mockCaracteristicas[index],
        success: true,
        message: "Característica actualizada exitosamente",
      };
    }

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
    if (MOCK_CONFIG.enabled && MOCK_CONFIG.modules.cabanas) {
      await mockDelay();
      mockCaracteristicas = mockCaracteristicas.filter((c) => c.id !== id);
      return {
        data: undefined as any,
        success: true,
        message: "Característica eliminada exitosamente",
      };
    }

    const response = await api.delete<ApiResponse<void>>(
      CARACTERISTICAS_ENDPOINTS.DELETE(id)
    );
    return response.data;
  },
};
