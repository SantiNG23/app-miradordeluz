import type { GrupoPrecio, RangoPrecio } from "@/types";
import { generateISODate } from "../utils";

/**
 * Grupos de precios (temporadas)
 */
export const MOCK_GRUPOS_PRECIOS: GrupoPrecio[] = [
  {
    id: "gp_001",
    nombre: "Temporada Baja",
    precioPorNoche: 15000,
    descripcion: "Temporada regular con menor demanda",
    rangos: [], // Se llenan abajo
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "gp_002",
    nombre: "Temporada Alta",
    precioPorNoche: 25000,
    descripcion: "Temporada de verano y feriados largos",
    rangos: [],
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "gp_003",
    nombre: "Fin de Semana",
    precioPorNoche: 18000,
    descripcion: "Precio especial para fines de semana",
    rangos: [],
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "gp_004",
    nombre: "Año Nuevo",
    precioPorNoche: 35000,
    descripcion: "Precio especial para fiestas de fin de año",
    rangos: [],
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
];

/**
 * Rangos de fechas para cada grupo de precio
 */
export const MOCK_RANGOS_PRECIOS: RangoPrecio[] = [
  // Temporada Baja - varios períodos del año
  {
    id: "rp_001",
    grupoPrecioId: "gp_001",
    fechaInicio: "2025-03-01T00:00:00.000Z",
    fechaFin: "2025-06-30T23:59:59.999Z",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "rp_002",
    grupoPrecioId: "gp_001",
    fechaInicio: "2025-08-01T00:00:00.000Z",
    fechaFin: "2025-11-30T23:59:59.999Z",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  // Temporada Alta - verano
  {
    id: "rp_003",
    grupoPrecioId: "gp_002",
    fechaInicio: "2025-12-15T00:00:00.000Z",
    fechaFin: "2026-02-28T23:59:59.999Z",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "rp_004",
    grupoPrecioId: "gp_002",
    fechaInicio: "2025-07-01T00:00:00.000Z",
    fechaFin: "2025-07-31T23:59:59.999Z",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  // Año Nuevo
  {
    id: "rp_005",
    grupoPrecioId: "gp_004",
    fechaInicio: "2025-12-27T00:00:00.000Z",
    fechaFin: "2026-01-05T23:59:59.999Z",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
];

// Asignar rangos a los grupos
MOCK_GRUPOS_PRECIOS[0].rangos = MOCK_RANGOS_PRECIOS.filter(
  (r) => r.grupoPrecioId === "gp_001"
);
MOCK_GRUPOS_PRECIOS[1].rangos = MOCK_RANGOS_PRECIOS.filter(
  (r) => r.grupoPrecioId === "gp_002"
);
MOCK_GRUPOS_PRECIOS[2].rangos = MOCK_RANGOS_PRECIOS.filter(
  (r) => r.grupoPrecioId === "gp_003"
);
MOCK_GRUPOS_PRECIOS[3].rangos = MOCK_RANGOS_PRECIOS.filter(
  (r) => r.grupoPrecioId === "gp_004"
);

/**
 * Helper para obtener el precio vigente para una fecha
 */
export const getPrecioParaFecha = (fecha: Date): number => {
  const fechaISO = fecha.toISOString();

  // Buscar si hay un rango activo para esta fecha
  const rangoActivo = MOCK_RANGOS_PRECIOS.find((rango) => {
    return fechaISO >= rango.fechaInicio && fechaISO <= rango.fechaFin;
  });

  if (rangoActivo) {
    const grupo = MOCK_GRUPOS_PRECIOS.find(
      (g) => g.id === rangoActivo.grupoPrecioId
    );
    return grupo?.precioPorNoche || 15000;
  }

  // Precio por defecto (temporada baja)
  return 15000;
};

/**
 * Helper para calcular precio total de una estadía
 */
export const calcularPrecioTotal = (
  fechaInicio: Date,
  fechaFin: Date
): number => {
  let total = 0;
  const currentDate = new Date(fechaInicio);

  while (currentDate < fechaFin) {
    total += getPrecioParaFecha(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return total;
};
