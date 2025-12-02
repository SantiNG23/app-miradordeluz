import { create } from "zustand";
import type { Cabana, Caracteristica } from "@/types";

// ============================================
// CABAÑAS STATE
// ============================================
interface CabanasState {
  cabanas: Cabana[];
  caracteristicas: Caracteristica[];
  cabanaActual: Cabana | null;
  isLoading: boolean;
  error: string | null;

  // Actions - Cabañas
  setCabanas: (cabanas: Cabana[]) => void;
  setCabanaActual: (cabana: Cabana | null) => void;
  addCabana: (cabana: Cabana) => void;
  updateCabana: (id: string, cabana: Partial<Cabana>) => void;
  removeCabana: (id: string) => void;

  // Actions - Características
  setCaracteristicas: (caracteristicas: Caracteristica[]) => void;
  addCaracteristica: (caracteristica: Caracteristica) => void;
  updateCaracteristica: (
    id: string,
    caracteristica: Partial<Caracteristica>
  ) => void;
  removeCaracteristica: (id: string) => void;

  // Utils
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useCabanasStore = create<CabanasState>((set) => ({
  cabanas: [],
  caracteristicas: [],
  cabanaActual: null,
  isLoading: false,
  error: null,

  // Cabañas
  setCabanas: (cabanas) => set({ cabanas }),

  setCabanaActual: (cabana) => set({ cabanaActual: cabana }),

  addCabana: (cabana) =>
    set((state) => ({ cabanas: [...state.cabanas, cabana] })),

  updateCabana: (id, cabanaData) =>
    set((state) => ({
      cabanas: state.cabanas.map((c) =>
        c.id === id ? { ...c, ...cabanaData } : c
      ),
    })),

  removeCabana: (id) =>
    set((state) => ({
      cabanas: state.cabanas.filter((c) => c.id !== id),
    })),

  // Características
  setCaracteristicas: (caracteristicas) => set({ caracteristicas }),

  addCaracteristica: (caracteristica) =>
    set((state) => ({
      caracteristicas: [...state.caracteristicas, caracteristica],
    })),

  updateCaracteristica: (id, caracteristicaData) =>
    set((state) => ({
      caracteristicas: state.caracteristicas.map((c) =>
        c.id === id ? { ...c, ...caracteristicaData } : c
      ),
    })),

  removeCaracteristica: (id) =>
    set((state) => ({
      caracteristicas: state.caracteristicas.filter((c) => c.id !== id),
    })),

  // Utils
  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),
}));
