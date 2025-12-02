// ============================================
// ENTIDADES DEL DOMINIO
// ============================================

export type EstadoReserva =
  | "pendiente_confirmacion"
  | "confirmada"
  | "checkin_realizado"
  | "finalizada"
  | "cancelada";

export type MetodoPago = "efectivo" | "transferencia" | "tarjeta" | "otro";

export type TipoPago = "sena" | "saldo";

// ============================================
// CLIENTE
// ============================================
export interface Cliente {
  id: string;
  nombre: string;
  dni: string;
  edad: number;
  localidad: string;
  telefono: string;
  email?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClienteFormData {
  nombre: string;
  dni: string;
  edad: number;
  localidad: string;
  telefono: string;
  email?: string;
}

// ============================================
// CABAÑA
// ============================================
export interface Cabana {
  id: string;
  nombre: string;
  capacidad: number;
  activa: boolean;
  caracteristicas: Caracteristica[];
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CabanaFormData {
  nombre: string;
  capacidad: number;
  activa: boolean;
  caracteristicaIds: string[];
}

// ============================================
// CARACTERÍSTICA
// ============================================
export interface Caracteristica {
  id: string;
  nombre: string;
  descripcion?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaracteristicaFormData {
  nombre: string;
  descripcion?: string;
}

// ============================================
// GRUPO DE PRECIO (Temporada)
// ============================================
export interface GrupoPrecio {
  id: string;
  nombre: string;
  precioPorNoche: number;
  descripcion?: string;
  rangos: RangoPrecio[];
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GrupoPrecioFormData {
  nombre: string;
  precioPorNoche: number;
  descripcion?: string;
}

// ============================================
// RANGO DE PRECIO
// ============================================
export interface RangoPrecio {
  id: string;
  grupoPrecioId: string;
  fechaInicio: string; // ISO format
  fechaFin: string; // ISO format
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RangoPrecioFormData {
  grupoPrecioId: string;
  fechaInicio: Date;
  fechaFin: Date;
}

// ============================================
// RESERVA
// ============================================
export interface Reserva {
  id: string;
  clienteId: string;
  cliente?: Cliente;
  cabanaId: string;
  cabana?: Cabana;
  fechaCheckIn: string; // ISO format
  fechaCheckOut: string; // ISO format
  cantidadNoches: number;
  precioTotal: number;
  sena: number;
  saldo: number;
  estado: EstadoReserva;
  fechaVencimientoPendiente?: string; // ISO format
  notasInternas?: string;
  huespedes: ReservaHuesped[];
  pagos: PagoReserva[];
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservaFormData {
  clienteId: string;
  cabanaId: string;
  fechaCheckIn: Date;
  fechaCheckOut: Date;
  notasInternas?: string;
  huespedes: HuespedFormData[];
}

// ============================================
// HUÉSPED
// ============================================
export interface ReservaHuesped {
  id: string;
  reservaId: string;
  nombre: string;
  dni: string;
  edad?: number;
  localidad?: string;
  telefono?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HuespedFormData {
  nombre: string;
  dni: string;
  edad?: number;
  localidad?: string;
  telefono?: string;
  email?: string;
}

// ============================================
// PAGO
// ============================================
export interface PagoReserva {
  id: string;
  reservaId: string;
  monto: number;
  metodoPago: MetodoPago;
  tipoPago: TipoPago;
  fechaPago: string; // ISO format
  observaciones?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PagoFormData {
  monto: number;
  metodoPago: MetodoPago;
  tipoPago: TipoPago;
  fechaPago: Date;
  observaciones?: string;
}

// ============================================
// CONFIGURACIÓN NOTIFICACIONES
// ============================================
export interface ConfiguracionNotificaciones {
  id: string;
  horarioResumen: string; // HH:mm format
  habilitado: boolean;
  tenantId: string;
  updatedAt: string;
}

// ============================================
// RESUMEN DIARIO
// ============================================
export interface ResumenDiario {
  fecha: string;
  checkIns: Reserva[];
  checkOuts: Reserva[];
  reservasPendientesVencen: Reserva[];
}

// ============================================
// CALENDARIO
// ============================================
export interface EventoCalendario {
  id: string;
  reservaId: string;
  cabanaId: string;
  cabanaNombre: string;
  clienteNombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoReserva;
}

// ============================================
// REPORTES
// ============================================
export interface ReporteOcupacion {
  cabanaId: string;
  cabanaNombre: string;
  totalNoches: number;
  nochesOcupadas: number;
  porcentajeOcupacion: number;
}

export interface ReporteReservas {
  total: number;
  confirmadas: number;
  pendientes: number;
  finalizadas: number;
  canceladas: number;
  ingresosTotales: number;
}

// ============================================
// API RESPONSES
// ============================================
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// FILTROS Y BÚSQUEDAS
// ============================================
export interface FiltroReservas {
  estado?: EstadoReserva[];
  fechaDesde?: string;
  fechaHasta?: string;
  cabanaId?: string;
  clienteDni?: string;
}

export interface FiltroReportes {
  fechaDesde: string;
  fechaHasta: string;
  cabanaIds?: string[];
}
