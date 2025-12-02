import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  clientesService,
  type ClientesFilters,
} from "@/services/clientes.service";
import type { Cliente, ClienteFormData } from "@/types";
import { useUIStore } from "@/store/ui.store";

// ============================================
// QUERY KEYS
// ============================================
export const clientesKeys = {
  all: ["clientes"] as const,
  lists: () => [...clientesKeys.all, "list"] as const,
  list: (filters: ClientesFilters) =>
    [...clientesKeys.lists(), filters] as const,
  details: () => [...clientesKeys.all, "detail"] as const,
  detail: (id: string) => [...clientesKeys.details(), id] as const,
  history: (id: string) => [...clientesKeys.all, "history", id] as const,
};

// ============================================
// HOOKS
// ============================================

/**
 * Hook para listar clientes con filtros
 */
export function useClientes(filters?: ClientesFilters) {
  return useQuery({
    queryKey: clientesKeys.list(filters || {}),
    queryFn: () => clientesService.getAll(filters),
  });
}

/**
 * Hook para obtener un cliente por ID
 */
export function useCliente(id: string) {
  return useQuery({
    queryKey: clientesKeys.detail(id),
    queryFn: () => clientesService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para buscar cliente por DNI
 */
export function useClienteByDni(dni: string) {
  return useQuery({
    queryKey: [...clientesKeys.all, "dni", dni],
    queryFn: () => clientesService.getByDni(dni),
    enabled: !!dni && dni.length >= 7,
  });
}

/**
 * Hook para obtener historial de reservas del cliente
 */
export function useClienteHistory(id: string) {
  return useQuery({
    queryKey: clientesKeys.history(id),
    queryFn: () => clientesService.getHistory(id),
    enabled: !!id,
  });
}

/**
 * Hook para crear cliente
 */
export function useCreateCliente() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (data: ClienteFormData) => clientesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientesKeys.lists() });
      addToast({
        type: "success",
        title: "Cliente creado",
        description: "El cliente se ha registrado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al crear cliente",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para actualizar cliente
 */
export function useUpdateCliente() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ClienteFormData>;
    }) => clientesService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: clientesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: clientesKeys.detail(variables.id),
      });
      addToast({
        type: "success",
        title: "Cliente actualizado",
        description: "Los datos del cliente se han actualizado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al actualizar cliente",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para eliminar cliente
 */
export function useDeleteCliente() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (id: string) => clientesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientesKeys.lists() });
      addToast({
        type: "success",
        title: "Cliente eliminado",
        description: "El cliente se ha eliminado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al eliminar cliente",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}
