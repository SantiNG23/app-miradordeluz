import type {
  Reserva,
  ReservaHuesped,
  PagoReserva,
  EstadoReserva,
} from "@/types";
import { generateISODate } from "../utils";
import { MOCK_CLIENTES } from "./clientes";
import { MOCK_CABANAS } from "./cabanas";

/**
 * Huéspedes mock para las reservas
 */
const MOCK_HUESPEDES: ReservaHuesped[] = [
  {
    id: "hue_001",
    reservaId: "res_001",
    nombre: "María Pérez",
    dni: "40123456",
    edad: 32,
    localidad: "Buenos Aires",
    telefono: "11-4567-8901",
    email: "maria.perez@email.com",
    createdAt: generateISODate(-15),
    updatedAt: generateISODate(-15),
  },
  {
    id: "hue_002",
    reservaId: "res_001",
    nombre: "Lucas Pérez",
    dni: "48765432",
    edad: 8,
    createdAt: generateISODate(-15),
    updatedAt: generateISODate(-15),
  },
];

/**
 * Pagos mock para las reservas
 */
const MOCK_PAGOS: PagoReserva[] = [
  {
    id: "pag_001",
    reservaId: "res_001",
    monto: 50000,
    metodoPago: "transferencia",
    tipoPago: "sena",
    fechaPago: generateISODate(-15),
    observaciones: "Seña del 50%",
    tenantId: "1",
    createdAt: generateISODate(-15),
    updatedAt: generateISODate(-15),
  },
  {
    id: "pag_002",
    reservaId: "res_002",
    monto: 60000,
    metodoPago: "efectivo",
    tipoPago: "sena",
    fechaPago: generateISODate(-10),
    observaciones: "Seña en efectivo",
    tenantId: "1",
    createdAt: generateISODate(-10),
    updatedAt: generateISODate(-10),
  },
  {
    id: "pag_003",
    reservaId: "res_003",
    monto: 45000,
    metodoPago: "transferencia",
    tipoPago: "sena",
    fechaPago: generateISODate(-5),
    tenantId: "1",
    createdAt: generateISODate(-5),
    updatedAt: generateISODate(-5),
  },
  {
    id: "pag_004",
    reservaId: "res_003",
    monto: 45000,
    metodoPago: "efectivo",
    tipoPago: "saldo",
    fechaPago: generateISODate(-1),
    observaciones: "Saldo al check-in",
    tenantId: "1",
    createdAt: generateISODate(-1),
    updatedAt: generateISODate(-1),
  },
];

/**
 * Datos mock de reservas
 */
export const MOCK_RESERVAS: Reserva[] = [
  // Reserva confirmada - próxima
  {
    id: "res_001",
    clienteId: MOCK_CLIENTES[0].id,
    cliente: MOCK_CLIENTES[0],
    cabanaId: MOCK_CABANAS[0].id,
    cabana: MOCK_CABANAS[0],
    fechaCheckIn: generateISODate(3),
    fechaCheckOut: generateISODate(8),
    cantidadNoches: 5,
    precioTotal: 100000,
    sena: 50000,
    saldo: 50000,
    estado: "confirmada" as EstadoReserva,
    notasInternas: "Cliente frecuente, prefiere cabaña con piscina",
    huespedes: [MOCK_HUESPEDES[0], MOCK_HUESPEDES[1]],
    pagos: [MOCK_PAGOS[0]],
    tenantId: "1",
    createdAt: generateISODate(-15),
    updatedAt: generateISODate(-15),
  },
  // Reserva con check-in hoy
  {
    id: "res_002",
    clienteId: MOCK_CLIENTES[1].id,
    cliente: MOCK_CLIENTES[1],
    cabanaId: MOCK_CABANAS[1].id,
    cabana: MOCK_CABANAS[1],
    fechaCheckIn: generateISODate(0),
    fechaCheckOut: generateISODate(4),
    cantidadNoches: 4,
    precioTotal: 120000,
    sena: 60000,
    saldo: 60000,
    estado: "confirmada" as EstadoReserva,
    huespedes: [],
    pagos: [MOCK_PAGOS[1]],
    tenantId: "1",
    createdAt: generateISODate(-10),
    updatedAt: generateISODate(-10),
  },
  // Reserva con check-in realizado
  {
    id: "res_003",
    clienteId: MOCK_CLIENTES[2].id,
    cliente: MOCK_CLIENTES[2],
    cabanaId: MOCK_CABANAS[2].id,
    cabana: MOCK_CABANAS[2],
    fechaCheckIn: generateISODate(-2),
    fechaCheckOut: generateISODate(1),
    cantidadNoches: 3,
    precioTotal: 90000,
    sena: 45000,
    saldo: 0,
    estado: "checkin_realizado" as EstadoReserva,
    notasInternas: "Saldo pagado al check-in",
    huespedes: [],
    pagos: [MOCK_PAGOS[2], MOCK_PAGOS[3]],
    tenantId: "1",
    createdAt: generateISODate(-5),
    updatedAt: generateISODate(-1),
  },
  // Reserva finalizada
  {
    id: "res_004",
    clienteId: MOCK_CLIENTES[3].id,
    cliente: MOCK_CLIENTES[3],
    cabanaId: MOCK_CABANAS[0].id,
    cabana: MOCK_CABANAS[0],
    fechaCheckIn: generateISODate(-10),
    fechaCheckOut: generateISODate(-5),
    cantidadNoches: 5,
    precioTotal: 125000,
    sena: 62500,
    saldo: 0,
    estado: "finalizada" as EstadoReserva,
    huespedes: [],
    pagos: [],
    tenantId: "1",
    createdAt: generateISODate(-20),
    updatedAt: generateISODate(-5),
  },
  // Reserva pendiente de confirmación (vence pronto)
  {
    id: "res_005",
    clienteId: MOCK_CLIENTES[4].id,
    cliente: MOCK_CLIENTES[4],
    cabanaId: MOCK_CABANAS[3].id,
    cabana: MOCK_CABANAS[3],
    fechaCheckIn: generateISODate(7),
    fechaCheckOut: generateISODate(11),
    cantidadNoches: 4,
    precioTotal: 80000,
    sena: 0,
    saldo: 80000,
    estado: "pendiente_confirmacion" as EstadoReserva,
    fechaVencimientoPendiente: generateISODate(1),
    notasInternas: "Esperando confirmación de pago de seña",
    huespedes: [],
    pagos: [],
    tenantId: "1",
    createdAt: generateISODate(-3),
    updatedAt: generateISODate(-3),
  },
  // Reserva cancelada
  {
    id: "res_006",
    clienteId: MOCK_CLIENTES[5].id,
    cliente: MOCK_CLIENTES[5],
    cabanaId: MOCK_CABANAS[1].id,
    cabana: MOCK_CABANAS[1],
    fechaCheckIn: generateISODate(15),
    fechaCheckOut: generateISODate(18),
    cantidadNoches: 3,
    precioTotal: 75000,
    sena: 0,
    saldo: 75000,
    estado: "cancelada" as EstadoReserva,
    notasInternas: "Cliente canceló por problemas personales",
    huespedes: [],
    pagos: [],
    tenantId: "1",
    createdAt: generateISODate(-8),
    updatedAt: generateISODate(-2),
  },
  // Reserva futura confirmada
  {
    id: "res_007",
    clienteId: MOCK_CLIENTES[6].id,
    cliente: MOCK_CLIENTES[6],
    cabanaId: MOCK_CABANAS[0].id,
    cabana: MOCK_CABANAS[0],
    fechaCheckIn: generateISODate(20),
    fechaCheckOut: generateISODate(27),
    cantidadNoches: 7,
    precioTotal: 175000,
    sena: 87500,
    saldo: 87500,
    estado: "confirmada" as EstadoReserva,
    huespedes: [],
    pagos: [],
    tenantId: "1",
    createdAt: generateISODate(-4),
    updatedAt: generateISODate(-4),
  },
];

/**
 * Helper para obtener reservas por estado
 */
export const getReservasByEstado = (estado: EstadoReserva): Reserva[] => {
  return MOCK_RESERVAS.filter((reserva) => reserva.estado === estado);
};

/**
 * Helper para obtener reservas de una cabaña
 */
export const getReservasByCabana = (cabanaId: string): Reserva[] => {
  return MOCK_RESERVAS.filter((reserva) => reserva.cabanaId === cabanaId);
};

/**
 * Helper para obtener reservas de un cliente
 */
export const getReservasByCliente = (clienteId: string): Reserva[] => {
  return MOCK_RESERVAS.filter((reserva) => reserva.clienteId === clienteId);
};

/**
 * Helper para verificar disponibilidad de una cabaña
 */
export const checkDisponibilidad = (
  cabanaId: string,
  fechaInicio: string,
  fechaFin: string,
  excludeReservaId?: string
): boolean => {
  const reservasActivas = MOCK_RESERVAS.filter(
    (r) =>
      r.cabanaId === cabanaId &&
      r.id !== excludeReservaId &&
      !["cancelada", "finalizada"].includes(r.estado)
  );

  return !reservasActivas.some((reserva) => {
    // Verificar solapamiento de fechas
    return (
      (fechaInicio >= reserva.fechaCheckIn &&
        fechaInicio < reserva.fechaCheckOut) ||
      (fechaFin > reserva.fechaCheckIn && fechaFin <= reserva.fechaCheckOut) ||
      (fechaInicio <= reserva.fechaCheckIn && fechaFin >= reserva.fechaCheckOut)
    );
  });
};
