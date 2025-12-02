import { create } from "zustand";
import type { ResumenDiario } from "@/types";

// ============================================
// UI STATE
// ============================================
interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  // Resumen Diario Modal
  resumenDiarioVisible: boolean;
  resumenDiario: ResumenDiario | null;
  setResumenDiario: (resumen: ResumenDiario | null) => void;
  showResumenDiario: () => void;
  hideResumenDiario: () => void;

  // Loading global
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;

  // Toast notifications
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
}

export const useUIStore = create<UIState>((set) => ({
  // Sidebar
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),

  // Resumen Diario
  resumenDiarioVisible: false,
  resumenDiario: null,
  setResumenDiario: (resumen) => set({ resumenDiario: resumen }),
  showResumenDiario: () => set({ resumenDiarioVisible: true }),
  hideResumenDiario: () => set({ resumenDiarioVisible: false }),

  // Loading
  isGlobalLoading: false,
  setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),

  // Toasts
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
