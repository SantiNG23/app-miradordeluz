import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cabanasService,
  caracteristicasService,
} from "@/services/cabanas.service";
import type {
  Cabana,
  CabanaFormData,
  Caracteristica,
  CaracteristicaFormData,
} from "@/types";
import { useUIStore } from "@/store/ui.store";

// ============================================
// QUERY KEYS
// ============================================
export const cabanasKeys = {
  all: ["cabanas"] as const,
  lists: () => [...cabanasKeys.all, "list"] as const,
  details: () => [...cabanasKeys.all, "detail"] as const,
  detail: (id: string) => [...cabanasKeys.details(), id] as const,
};

export const caracteristicasKeys = {
  all: ["caracteristicas"] as const,
  lists: () => [...caracteristicasKeys.all, "list"] as const,
};

// ============================================
// HOOKS - CABAÑAS
// ============================================

/**
 * Hook para listar todas las cabañas
 */
export function useCabanas() {
  return useQuery({
    queryKey: cabanasKeys.lists(),
    queryFn: () => cabanasService.getAll(),
  });
}

/**
 * Hook para obtener una cabaña por ID
 */
export function useCabana(id: string) {
  return useQuery({
    queryKey: cabanasKeys.detail(id),
    queryFn: () => cabanasService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para crear cabaña
 */
export function useCreateCabana() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (data: CabanaFormData) => cabanasService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
      addToast({
        type: "success",
        title: "Cabaña creada",
        description: "La cabaña se ha registrado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al crear cabaña",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para actualizar cabaña
 */
export function useUpdateCabana() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CabanaFormData> }) =>
      cabanasService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: cabanasKeys.detail(variables.id),
      });
      addToast({
        type: "success",
        title: "Cabaña actualizada",
        description: "Los datos de la cabaña se han actualizado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al actualizar cabaña",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para eliminar cabaña
 */
export function useDeleteCabana() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (id: string) => cabanasService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
      addToast({
        type: "success",
        title: "Cabaña eliminada",
        description: "La cabaña se ha eliminado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al eliminar cabaña",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para activar/desactivar cabaña
 */
export function useToggleEstadoCabana() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (id: string) => cabanasService.toggleEstado(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
      addToast({
        type: "success",
        title: "Estado actualizado",
        description: "El estado de la cabaña se ha actualizado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al actualizar estado",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

// ============================================
// HOOKS - CARACTERÍSTICAS
// ============================================

/**
 * Hook para listar características
 */
export function useCaracteristicas() {
  return useQuery({
    queryKey: caracteristicasKeys.lists(),
    queryFn: () => caracteristicasService.getAll(),
  });
}

/**
 * Hook para crear característica
 */
export function useCreateCaracteristica() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (data: CaracteristicaFormData) =>
      caracteristicasService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caracteristicasKeys.lists() });
      addToast({
        type: "success",
        title: "Característica creada",
        description: "La característica se ha registrado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al crear característica",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para actualizar característica
 */
export function useUpdateCaracteristica() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CaracteristicaFormData>;
    }) => caracteristicasService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caracteristicasKeys.lists() });
      addToast({
        type: "success",
        title: "Característica actualizada",
        description: "La característica se ha actualizado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al actualizar característica",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para eliminar característica
 */
export function useDeleteCaracteristica() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (id: string) => caracteristicasService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caracteristicasKeys.lists() });
      addToast({
        type: "success",
        title: "Característica eliminada",
        description: "La característica se ha eliminado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al eliminar característica",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}
