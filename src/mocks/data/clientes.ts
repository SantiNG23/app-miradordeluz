import type { Cliente } from "@/types";
import { generateId, generateISODate } from "../utils";

/**
 * Datos mock de clientes para desarrollo
 */
export const MOCK_CLIENTES: Cliente[] = [
  {
    id: "cli_001",
    nombre: "Juan Pérez",
    dni: "38456789",
    edad: 35,
    localidad: "Buenos Aires",
    telefono: "11-4567-8901",
    email: "juan.perez@email.com",
    tenantId: "1",
    createdAt: generateISODate(-60),
    updatedAt: generateISODate(-60),
  },
  {
    id: "cli_002",
    nombre: "María González",
    dni: "40123456",
    edad: 28,
    localidad: "Córdoba",
    telefono: "351-567-8902",
    email: "maria.gonzalez@email.com",
    tenantId: "1",
    createdAt: generateISODate(-45),
    updatedAt: generateISODate(-45),
  },
  {
    id: "cli_003",
    nombre: "Carlos Rodríguez",
    dni: "35987654",
    edad: 42,
    localidad: "Rosario",
    telefono: "341-678-9012",
    email: "carlos.rodriguez@email.com",
    tenantId: "1",
    createdAt: generateISODate(-30),
    updatedAt: generateISODate(-30),
  },
  {
    id: "cli_004",
    nombre: "Laura Martínez",
    dni: "42345678",
    edad: 31,
    localidad: "Mendoza",
    telefono: "261-789-0123",
    tenantId: "1",
    createdAt: generateISODate(-20),
    updatedAt: generateISODate(-20),
  },
  {
    id: "cli_005",
    nombre: "Roberto Fernández",
    dni: "37654321",
    edad: 38,
    localidad: "Mar del Plata",
    telefono: "223-890-1234",
    email: "roberto.fernandez@email.com",
    tenantId: "1",
    createdAt: generateISODate(-15),
    updatedAt: generateISODate(-15),
  },
  {
    id: "cli_006",
    nombre: "Ana López",
    dni: "41234567",
    edad: 29,
    localidad: "San Miguel de Tucumán",
    telefono: "381-901-2345",
    email: "ana.lopez@email.com",
    tenantId: "1",
    createdAt: generateISODate(-10),
    updatedAt: generateISODate(-10),
  },
  {
    id: "cli_007",
    nombre: "Diego Sánchez",
    dni: "39876543",
    edad: 33,
    localidad: "Salta",
    telefono: "387-012-3456",
    tenantId: "1",
    createdAt: generateISODate(-7),
    updatedAt: generateISODate(-7),
  },
  {
    id: "cli_008",
    nombre: "Lucía Ramírez",
    dni: "43456789",
    edad: 26,
    localidad: "Neuquén",
    telefono: "299-123-4567",
    email: "lucia.ramirez@email.com",
    tenantId: "1",
    createdAt: generateISODate(-5),
    updatedAt: generateISODate(-5),
  },
  {
    id: "cli_009",
    nombre: "Martín Torres",
    dni: "36543210",
    edad: 45,
    localidad: "Posadas",
    telefono: "376-234-5678",
    email: "martin.torres@email.com",
    tenantId: "1",
    createdAt: generateISODate(-3),
    updatedAt: generateISODate(-3),
  },
  {
    id: "cli_010",
    nombre: "Sofía Benítez",
    dni: "44567890",
    edad: 24,
    localidad: "Santa Fe",
    telefono: "342-345-6789",
    tenantId: "1",
    createdAt: generateISODate(-1),
    updatedAt: generateISODate(-1),
  },
];

/**
 * Helper para obtener un cliente por DNI
 */
export const getClienteByDni = (dni: string): Cliente | undefined => {
  return MOCK_CLIENTES.find((cliente) => cliente.dni === dni);
};

/**
 * Helper para crear un nuevo cliente mock
 */
export const createMockCliente = (
  data: Omit<Cliente, "id" | "tenantId" | "createdAt" | "updatedAt">
): Cliente => {
  return {
    ...data,
    id: generateId(),
    tenantId: "1",
    createdAt: generateISODate(),
    updatedAt: generateISODate(),
  };
};
