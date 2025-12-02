import type {
  ResumenDiario,
  EventoCalendario,
  ReporteOcupacion,
  ReporteReservas,
} from "@/types";
import { MOCK_RESERVAS } from "./reservas";
import { MOCK_CABANAS } from "./cabanas";

/**
 * Genera el resumen diario basado en las reservas actuales
 */
export const getResumenDiario = (): ResumenDiario => {
  const hoy = new Date().toISOString().split("T")[0];

  return {
    fecha: hoy,
    checkIns: MOCK_RESERVAS.filter((r) => {
      const checkInDate = new Date(r.fechaCheckIn).toISOString().split("T")[0];
      return checkInDate === hoy && r.estado === "confirmada";
    }),
    checkOuts: MOCK_RESERVAS.filter((r) => {
      const checkOutDate = new Date(r.fechaCheckOut)
        .toISOString()
        .split("T")[0];
      return checkOutDate === hoy && r.estado === "checkin_realizado";
    }),
    reservasPendientesVencen: MOCK_RESERVAS.filter((r) => {
      if (
        r.estado !== "pendiente_confirmacion" ||
        !r.fechaVencimientoPendiente
      ) {
        return false;
      }
      const vencimiento = new Date(r.fechaVencimientoPendiente)
        .toISOString()
        .split("T")[0];
      return vencimiento <= hoy;
    }),
  };
};

/**
 * Genera eventos del calendario para un rango de fechas
 */
export const getEventosCalendario = (
  fechaInicio: string,
  fechaFin: string
): EventoCalendario[] => {
  return MOCK_RESERVAS.filter((reserva) => {
    // Filtrar solo reservas que caen en el rango solicitado
    return (
      reserva.fechaCheckIn <= fechaFin &&
      reserva.fechaCheckOut >= fechaInicio &&
      !["cancelada"].includes(reserva.estado)
    );
  }).map((reserva) => ({
    id: reserva.id,
    reservaId: reserva.id,
    cabanaId: reserva.cabanaId,
    cabanaNombre: reserva.cabana?.nombre || "Cabaña sin nombre",
    clienteNombre: reserva.cliente?.nombre || "Cliente sin nombre",
    fechaInicio: reserva.fechaCheckIn,
    fechaFin: reserva.fechaCheckOut,
    estado: reserva.estado,
  }));
};

/**
 * Genera reporte de ocupación para un período
 */
export const getReporteOcupacion = (
  fechaInicio: string,
  fechaFin: string
): ReporteOcupacion[] => {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const diasTotales = Math.ceil(
    (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)
  );

  return MOCK_CABANAS.filter((c) => c.activa).map((cabana) => {
    // Calcular noches ocupadas
    const reservasCabana = MOCK_RESERVAS.filter(
      (r) => r.cabanaId === cabana.id && r.estado !== "cancelada"
    );

    let nochesOcupadas = 0;
    reservasCabana.forEach((reserva) => {
      const checkIn = new Date(reserva.fechaCheckIn);
      const checkOut = new Date(reserva.fechaCheckOut);

      // Calcular intersección con el rango solicitado
      const inicioReserva = checkIn < inicio ? inicio : checkIn;
      const finReserva = checkOut > fin ? fin : checkOut;

      if (inicioReserva < finReserva) {
        const noches = Math.ceil(
          (finReserva.getTime() - inicioReserva.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        nochesOcupadas += noches;
      }
    });

    return {
      cabanaId: cabana.id,
      cabanaNombre: cabana.nombre,
      totalNoches: diasTotales,
      nochesOcupadas,
      porcentajeOcupacion: (nochesOcupadas / diasTotales) * 100,
    };
  });
};

/**
 * Genera reporte de reservas para un período
 */
export const getReporteReservas = (
  fechaInicio: string,
  fechaFin: string
): ReporteReservas => {
  const reservasEnPeriodo = MOCK_RESERVAS.filter((reserva) => {
    return (
      reserva.fechaCheckIn <= fechaFin && reserva.fechaCheckOut >= fechaInicio
    );
  });

  const confirmadas = reservasEnPeriodo.filter(
    (r) => r.estado === "confirmada"
  ).length;
  const pendientes = reservasEnPeriodo.filter(
    (r) => r.estado === "pendiente_confirmacion"
  ).length;
  const finalizadas = reservasEnPeriodo.filter(
    (r) => r.estado === "finalizada"
  ).length;
  const canceladas = reservasEnPeriodo.filter(
    (r) => r.estado === "cancelada"
  ).length;

  const ingresosTotales = reservasEnPeriodo
    .filter((r) =>
      ["confirmada", "checkin_realizado", "finalizada"].includes(r.estado)
    )
    .reduce((sum, r) => sum + (r.precioTotal - r.saldo), 0);

  return {
    total: reservasEnPeriodo.length,
    confirmadas,
    pendientes,
    finalizadas,
    canceladas,
    ingresosTotales,
  };
};

/**
 * Estadísticas generales del dashboard
 */
export const getDashboardStats = () => {
  const hoy = new Date();
  const inicioMes = new Date(
    hoy.getFullYear(),
    hoy.getMonth(),
    1
  ).toISOString();
  const finMes = new Date(
    hoy.getFullYear(),
    hoy.getMonth() + 1,
    0
  ).toISOString();

  const reservasMes = MOCK_RESERVAS.filter(
    (r) => r.fechaCheckIn >= inicioMes && r.fechaCheckIn <= finMes
  );

  const ocupacionMes = getReporteOcupacion(inicioMes, finMes);
  const promedioOcupacion =
    ocupacionMes.reduce((sum, c) => sum + c.porcentajeOcupacion, 0) /
    ocupacionMes.length;

  return {
    reservasActivas: MOCK_RESERVAS.filter((r) =>
      ["confirmada", "checkin_realizado"].includes(r.estado)
    ).length,
    reservasMes: reservasMes.length,
    ocupacionPromedio: Math.round(promedioOcupacion),
    ingresosMes: reservasMes
      .filter((r) => r.estado !== "cancelada")
      .reduce((sum, r) => sum + (r.precioTotal - r.saldo), 0),
  };
};
