import { useQuery } from "@tanstack/react-query";
import {
  calendarioService,
  dashboardService,
  reportesService,
} from "@/services/dashboard.service";
import type { FiltroReportes } from "@/types";

// ============================================
// QUERY KEYS
// ============================================
export const calendarioKeys = {
  all: ["calendario"] as const,
  eventos: (fechaInicio: string, fechaFin: string) =>
    [...calendarioKeys.all, fechaInicio, fechaFin] as const,
};

export const dashboardKeys = {
  all: ["dashboard"] as const,
  resumenDiario: () => [...dashboardKeys.all, "resumen-diario"] as const,
};

export const reportesKeys = {
  all: ["reportes"] as const,
  ocupacion: (filtros: FiltroReportes) =>
    [...reportesKeys.all, "ocupacion", filtros] as const,
  reservas: (filtros: FiltroReportes) =>
    [...reportesKeys.all, "reservas", filtros] as const,
  historialDni: (dni: string) =>
    [...reportesKeys.all, "historial-dni", dni] as const,
};

// ============================================
// HOOKS - CALENDARIO
// ============================================

/**
 * Hook para obtener eventos del calendario
 */
export function useCalendarioEventos(fechaInicio: string, fechaFin: string) {
  return useQuery({
    queryKey: calendarioKeys.eventos(fechaInicio, fechaFin),
    queryFn: () => calendarioService.getEventos(fechaInicio, fechaFin),
    enabled: !!fechaInicio && !!fechaFin,
  });
}

// ============================================
// HOOKS - DASHBOARD
// ============================================

/**
 * Hook para obtener resumen diario
 */
export function useResumenDiario() {
  return useQuery({
    queryKey: dashboardKeys.resumenDiario(),
    queryFn: () => dashboardService.getResumenDiario(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

// ============================================
// HOOKS - REPORTES
// ============================================

/**
 * Hook para reporte de ocupación
 */
export function useReporteOcupacion(filtros: FiltroReportes) {
  return useQuery({
    queryKey: reportesKeys.ocupacion(filtros),
    queryFn: () => reportesService.getOcupacion(filtros),
    enabled: !!filtros.fechaDesde && !!filtros.fechaHasta,
  });
}

/**
 * Hook para reporte de reservas
 */
export function useReporteReservas(filtros: FiltroReportes) {
  return useQuery({
    queryKey: reportesKeys.reservas(filtros),
    queryFn: () => reportesService.getReservas(filtros),
    enabled: !!filtros.fechaDesde && !!filtros.fechaHasta,
  });
}

/**
 * Hook para historial por DNI
 */
export function useHistorialPorDni(dni: string) {
  return useQuery({
    queryKey: reportesKeys.historialDni(dni),
    queryFn: () => reportesService.getHistorialPorDni(dni),
    enabled: !!dni && dni.length >= 7,
  });
}
