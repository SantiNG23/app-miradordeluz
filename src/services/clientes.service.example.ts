/**
 * Ejemplo de implementación de servicio con soporte de datos mock
 *
 * Este archivo muestra cómo integrar mocks en servicios existentes.
 * Copiar este patrón a otros servicios durante desarrollo.
 */

import { apiClient } from "./api";
import {
  MOCK_CLIENTES,
  isMockEnabled,
  mockDelay,
  createMockStorage,
  filterBySearch,
  paginate,
  getClienteByDni,
  createMockCliente,
} from "@/mocks";
import type { Cliente, ClienteFormData } from "@/types";

// Storage en memoria para persistir cambios durante la sesión
const clientesStorage = createMockStorage(MOCK_CLIENTES);

export const clientesService = {
  /**
   * Obtener todos los clientes con filtros opcionales
   */
  getAll: async (filters?: {
    search?: string;
    page?: number;
    pageSize?: number;
  }) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();

      let clientes = clientesStorage.getAll();

      // Aplicar búsqueda si existe
      if (filters?.search) {
        clientes = filterBySearch(clientes, filters.search, [
          "nombre",
          "dni",
          "email",
          "telefono",
        ]);
      }

      // Aplicar paginación si existe
      if (filters?.page && filters?.pageSize) {
        return paginate(clientes, filters.page, filters.pageSize);
      }

      return clientes;
    }

    // API real
    const { data } = await apiClient.get<Cliente[]>("/clientes", {
      params: filters,
    });
    return data;
  },

  /**
   * Obtener un cliente por ID
   */
  getById: async (id: string) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();

      const cliente = clientesStorage.getById(id);
      if (!cliente) {
        throw new Error("Cliente no encontrado");
      }
      return cliente;
    }

    const { data } = await apiClient.get<Cliente>(`/clientes/${id}`);
    return data;
  },

  /**
   * Buscar cliente por DNI
   */
  getByDni: async (dni: string) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();

      const cliente = getClienteByDni(dni);
      if (!cliente) {
        throw new Error("Cliente no encontrado");
      }
      return cliente;
    }

    const { data } = await apiClient.get<Cliente>(
      `/clientes/buscar-dni?dni=${dni}`
    );
    return data;
  },

  /**
   * Crear un nuevo cliente
   */
  create: async (clienteData: ClienteFormData) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();

      // Validar DNI único
      const existente = getClienteByDni(clienteData.dni);
      if (existente) {
        throw new Error("Ya existe un cliente con ese DNI");
      }

      const nuevoCliente = createMockCliente(clienteData);
      clientesStorage.create(nuevoCliente);
      return nuevoCliente;
    }

    const { data } = await apiClient.post<Cliente>("/clientes", clienteData);
    return data;
  },

  /**
   * Actualizar un cliente existente
   */
  update: async (id: string, clienteData: Partial<ClienteFormData>) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();

      const cliente = clientesStorage.getById(id);
      if (!cliente) {
        throw new Error("Cliente no encontrado");
      }

      // Validar DNI único si se está cambiando
      if (clienteData.dni && clienteData.dni !== cliente.dni) {
        const existente = getClienteByDni(clienteData.dni);
        if (existente && existente.id !== id) {
          throw new Error("Ya existe un cliente con ese DNI");
        }
      }

      const clienteActualizado = clientesStorage.update(id, {
        ...clienteData,
        updatedAt: new Date().toISOString(),
      });

      if (!clienteActualizado) {
        throw new Error("Error al actualizar cliente");
      }

      return clienteActualizado;
    }

    const { data } = await apiClient.put<Cliente>(
      `/clientes/${id}`,
      clienteData
    );
    return data;
  },

  /**
   * Eliminar un cliente
   */
  delete: async (id: string) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();

      const eliminado = clientesStorage.delete(id);
      if (!eliminado) {
        throw new Error("Cliente no encontrado");
      }
      return;
    }

    await apiClient.delete(`/clientes/${id}`);
  },

  /**
   * Obtener historial de reservas de un cliente
   */
  getHistorial: async (id: string) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();

      // Importación dinámica para evitar dependencias circulares
      const { getReservasByCliente } = await import("@/mocks");
      return getReservasByCliente(id);
    }

    const { data } = await apiClient.get(`/clientes/${id}/historial`);
    return data;
  },
};
