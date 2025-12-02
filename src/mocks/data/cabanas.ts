import type { Cabana, Caracteristica } from "@/types";
import { generateId, generateISODate } from "../utils";

/**
 * Pool de características disponibles
 */
export const MOCK_CARACTERISTICAS: Caracteristica[] = [
  {
    id: "car_001",
    nombre: "Piscina",
    descripcion: "Piscina climatizada para uso exclusivo",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "car_002",
    nombre: "WiFi",
    descripcion: "Conexión WiFi de alta velocidad",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "car_003",
    nombre: "Parrilla",
    descripcion: "Parrilla con zona de quincho",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "car_004",
    nombre: "Cochera",
    descripcion: "Cochera cubierta para 2 vehículos",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "car_005",
    nombre: "Aire Acondicionado",
    descripcion: "Aire acondicionado frío/calor en todas las habitaciones",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "car_006",
    nombre: "TV Cable",
    descripcion: "TV por cable con canales HD",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "car_007",
    nombre: "Jacuzzi",
    descripcion: "Jacuzzi privado para 4 personas",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
  {
    id: "car_008",
    nombre: "Balcón con Vista",
    descripcion: "Balcón amplio con vista panorámica",
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-90),
  },
];

/**
 * Datos mock de cabañas
 */
export const MOCK_CABANAS: Cabana[] = [
  {
    id: "cab_001",
    nombre: "Cabaña Los Pinos",
    capacidad: 4,
    activa: true,
    caracteristicas: [
      MOCK_CARACTERISTICAS[0], // Piscina
      MOCK_CARACTERISTICAS[1], // WiFi
      MOCK_CARACTERISTICAS[2], // Parrilla
      MOCK_CARACTERISTICAS[4], // Aire Acondicionado
    ],
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-30),
  },
  {
    id: "cab_002",
    nombre: "Cabaña El Roble",
    capacidad: 6,
    activa: true,
    caracteristicas: [
      MOCK_CARACTERISTICAS[0], // Piscina
      MOCK_CARACTERISTICAS[1], // WiFi
      MOCK_CARACTERISTICAS[2], // Parrilla
      MOCK_CARACTERISTICAS[3], // Cochera
      MOCK_CARACTERISTICAS[4], // Aire Acondicionado
      MOCK_CARACTERISTICAS[6], // Jacuzzi
    ],
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-20),
  },
  {
    id: "cab_003",
    nombre: "Cabaña La Cascada",
    capacidad: 2,
    activa: true,
    caracteristicas: [
      MOCK_CARACTERISTICAS[1], // WiFi
      MOCK_CARACTERISTICAS[4], // Aire Acondicionado
      MOCK_CARACTERISTICAS[7], // Balcón con Vista
    ],
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-15),
  },
  {
    id: "cab_004",
    nombre: "Cabaña Vista al Lago",
    capacidad: 5,
    activa: true,
    caracteristicas: [
      MOCK_CARACTERISTICAS[1], // WiFi
      MOCK_CARACTERISTICAS[2], // Parrilla
      MOCK_CARACTERISTICAS[3], // Cochera
      MOCK_CARACTERISTICAS[4], // Aire Acondicionado
      MOCK_CARACTERISTICAS[5], // TV Cable
      MOCK_CARACTERISTICAS[7], // Balcón con Vista
    ],
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-10),
  },
  {
    id: "cab_005",
    nombre: "Cabaña El Refugio",
    capacidad: 3,
    activa: false,
    caracteristicas: [
      MOCK_CARACTERISTICAS[1], // WiFi
      MOCK_CARACTERISTICAS[2], // Parrilla
      MOCK_CARACTERISTICAS[4], // Aire Acondicionado
    ],
    tenantId: "1",
    createdAt: generateISODate(-90),
    updatedAt: generateISODate(-5),
  },
];

/**
 * Helper para obtener una cabaña por ID
 */
export const getCabanaById = (id: string): Cabana | undefined => {
  return MOCK_CABANAS.find((cabana) => cabana.id === id);
};

/**
 * Helper para obtener cabañas activas
 */
export const getCabanasActivas = (): Cabana[] => {
  return MOCK_CABANAS.filter((cabana) => cabana.activa);
};

/**
 * Helper para crear una nueva cabaña mock
 */
export const createMockCabana = (
  data: Omit<Cabana, "id" | "tenantId" | "createdAt" | "updatedAt">
): Cabana => {
  return {
    ...data,
    id: generateId(),
    tenantId: "1",
    createdAt: generateISODate(),
    updatedAt: generateISODate(),
  };
};
