import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cabanasService,
  caracteristicasService,
} from "@/services/cabanas.service";
import type { CabanaFormData, CaracteristicaFormData } from "@/types";

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
// HOOK PRINCIPAL - GESTIÓN COMPLETA DE CABAÑAS
// ============================================

/**
 * Hook completo para gestión de cabañas y características
 * Incluye queries y mutations necesarias para el módulo completo
 */
export function useCabanas() {
  const queryClient = useQueryClient();

  // Queries
  const cabanasQuery = useQuery({
    queryKey: cabanasKeys.lists(),
    queryFn: () => cabanasService.getAll(),
  });

  const caracteristicasQuery = useQuery({
    queryKey: caracteristicasKeys.lists(),
    queryFn: () => caracteristicasService.getAll(),
  });

  // Mutations - Cabañas
  const createCabanaMutation = useMutation({
    mutationFn: (data: CabanaFormData) => cabanasService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
    },
  });

  const updateCabanaMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CabanaFormData> }) =>
      cabanasService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
    },
  });

  const deleteCabanaMutation = useMutation({
    mutationFn: (id: string) => cabanasService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
    },
  });

  // Mutations - Características
  const createCaracteristicaMutation = useMutation({
    mutationFn: (data: CaracteristicaFormData) =>
      caracteristicasService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caracteristicasKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
    },
  });

  const updateCaracteristicaMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CaracteristicaFormData>;
    }) => caracteristicasService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caracteristicasKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
    },
  });

  const deleteCaracteristicaMutation = useMutation({
    mutationFn: (id: string) => caracteristicasService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caracteristicasKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cabanasKeys.lists() });
    },
  });

  return {
    // Data
    cabanas: cabanasQuery.data?.data || [],
    caracteristicas: caracteristicasQuery.data?.data || [],

    // Loading states
    isLoading: cabanasQuery.isLoading || caracteristicasQuery.isLoading,
    isCabanasLoading: cabanasQuery.isLoading,
    isCaracteristicasLoading: caracteristicasQuery.isLoading,

    // Errors
    cabanasError: cabanasQuery.error,
    caracteristicasError: caracteristicasQuery.error,

    // Cabañas actions
    createCabana: createCabanaMutation.mutate,
    updateCabana: (id: string, data: Partial<CabanaFormData>) =>
      updateCabanaMutation.mutate({ id, data }),
    deleteCabana: deleteCabanaMutation.mutate,

    // Características actions
    createCaracteristica: createCaracteristicaMutation.mutate,
    updateCaracteristica: (id: string, data: Partial<CaracteristicaFormData>) =>
      updateCaracteristicaMutation.mutate({ id, data }),
    deleteCaracteristica: deleteCaracteristicaMutation.mutate,

    // Mutation states
    isCreatingCabana: createCabanaMutation.isPending,
    isUpdatingCabana: updateCabanaMutation.isPending,
    isDeletingCabana: deleteCabanaMutation.isPending,
    isCreatingCaracteristica: createCaracteristicaMutation.isPending,
    isUpdatingCaracteristica: updateCaracteristicaMutation.isPending,
    isDeletingCaracteristica: deleteCaracteristicaMutation.isPending,
  };
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
