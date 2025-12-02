import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  reservasService,
  type DisponibilidadRequest,
  type CalcularPrecioRequest,
  type RegistrarPagoRequest,
} from "@/services/reservas.service";
import type { Reserva, ReservaFormData, FiltroReservas } from "@/types";
import { useUIStore } from "@/store/ui.store";
import { useReservasStore } from "@/store/reservas.store";

// ============================================
// QUERY KEYS
// ============================================
export const reservasKeys = {
  all: ["reservas"] as const,
  lists: () => [...reservasKeys.all, "list"] as const,
  list: (filters: FiltroReservas) =>
    [...reservasKeys.lists(), filters] as const,
  details: () => [...reservasKeys.all, "detail"] as const,
  detail: (id: string) => [...reservasKeys.details(), id] as const,
};

// ============================================
// HOOKS
// ============================================

/**
 * Hook para listar reservas con filtros
 */
export function useReservas(filters?: FiltroReservas) {
  const filtrosStore = useReservasStore((state) => state.filtros);
  const finalFilters = filters || filtrosStore;

  return useQuery({
    queryKey: reservasKeys.list(finalFilters),
    queryFn: () => reservasService.getAll(finalFilters),
  });
}

/**
 * Hook para obtener una reserva por ID
 */
export function useReserva(id: string) {
  return useQuery({
    queryKey: reservasKeys.detail(id),
    queryFn: () => reservasService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para verificar disponibilidad
 */
export function useCheckDisponibilidad() {
  return useMutation({
    mutationFn: (data: DisponibilidadRequest) =>
      reservasService.checkDisponibilidad(data),
  });
}

/**
 * Hook para calcular precio de reserva
 */
export function useCalcularPrecio() {
  return useMutation({
    mutationFn: (data: CalcularPrecioRequest) =>
      reservasService.calcularPrecio(data),
  });
}

/**
 * Hook para crear reserva
 */
export function useCreateReserva() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (data: ReservaFormData) => reservasService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservasKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["calendario"] });
      addToast({
        type: "success",
        title: "Reserva creada",
        description: "La reserva se ha registrado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al crear reserva",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para actualizar reserva
 */
export function useUpdateReserva() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ReservaFormData>;
    }) => reservasService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reservasKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: reservasKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: ["calendario"] });
      addToast({
        type: "success",
        title: "Reserva actualizada",
        description: "Los datos de la reserva se han actualizado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al actualizar reserva",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para cambiar estado de reserva
 */
export function useUpdateEstadoReserva() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: ({ id, estado }: { id: string; estado: Reserva["estado"] }) =>
      reservasService.updateEstado(id, estado),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reservasKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: reservasKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: ["calendario"] });
      addToast({
        type: "success",
        title: "Estado actualizado",
        description: "El estado de la reserva se ha actualizado correctamente",
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

/**
 * Hook para cancelar reserva
 */
export function useCancelReserva() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (id: string) => reservasService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservasKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["calendario"] });
      addToast({
        type: "success",
        title: "Reserva cancelada",
        description: "La reserva se ha cancelado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al cancelar reserva",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}

/**
 * Hook para registrar pago
 */
export function useRegistrarPago() {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: ({
      reservaId,
      data,
    }: {
      reservaId: string;
      data: RegistrarPagoRequest;
    }) => reservasService.registrarPago(reservaId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reservasKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: reservasKeys.detail(variables.reservaId),
      });
      addToast({
        type: "success",
        title: "Pago registrado",
        description: "El pago se ha registrado correctamente",
      });
    },
    onError: (error: any) => {
      addToast({
        type: "error",
        title: "Error al registrar pago",
        description:
          error.response?.data?.message || "Ocurrió un error inesperado",
      });
    },
  });
}
