import { create } from "zustand";
import type { Reserva, FiltroReservas } from "@/types";

// ============================================
// RESERVAS STATE
// ============================================
interface ReservasState {
  reservas: Reserva[];
  reservaActual: Reserva | null;
  filtros: FiltroReservas;
  isLoading: boolean;
  error: string | null;

  // Actions
  setReservas: (reservas: Reserva[]) => void;
  setReservaActual: (reserva: Reserva | null) => void;
  addReserva: (reserva: Reserva) => void;
  updateReserva: (id: string, reserva: Partial<Reserva>) => void;
  removeReserva: (id: string) => void;
  setFiltros: (filtros: Partial<FiltroReservas>) => void;
  resetFiltros: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const filtrosIniciales: FiltroReservas = {
  estado: undefined,
  fechaDesde: undefined,
  fechaHasta: undefined,
  cabanaId: undefined,
  clienteDni: undefined,
};

export const useReservasStore = create<ReservasState>((set) => ({
  reservas: [],
  reservaActual: null,
  filtros: filtrosIniciales,
  isLoading: false,
  error: null,

  setReservas: (reservas) => set({ reservas }),

  setReservaActual: (reserva) => set({ reservaActual: reserva }),

  addReserva: (reserva) =>
    set((state) => ({ reservas: [...state.reservas, reserva] })),

  updateReserva: (id, reservaData) =>
    set((state) => ({
      reservas: state.reservas.map((r) =>
        r.id === id ? { ...r, ...reservaData } : r
      ),
    })),

  removeReserva: (id) =>
    set((state) => ({
      reservas: state.reservas.filter((r) => r.id !== id),
    })),

  setFiltros: (nuevosFiltros) =>
    set((state) => ({
      filtros: { ...state.filtros, ...nuevosFiltros },
    })),

  resetFiltros: () => set({ filtros: filtrosIniciales }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),
}));
