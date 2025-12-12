import React, { useEffect, useMemo, useState } from "react";

interface PriceRange {
  fecha_inicio: string;
  fecha_fin: string;
  precio_por_noche: number;
}

interface Cabana {
  id: string | number;
  nombre: string;
  capacidad: number;
  precio_base?: number;
  caracteristicas?: string[];
}

interface Props {
  cabana: Cabana | null;
  priceRanges: PriceRange[];
}

function parseDateOnly(dateStr: string) {
  return new Date(dateStr + "T00:00:00");
}

function eachNight(start: Date, end: Date) {
  const dates: Date[] = [];
  const cur = new Date(start);
  while (cur < end) {
    dates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

export default function ReservaSummary({ cabana, priceRanges }: Props) {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [huespedes, setHuespedes] = useState<number>(2);

  const capacidad = cabana?.capacidad ?? 1;
  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  const nights = useMemo(() => {
    if (!fechaInicio || !fechaFin) return 0;
    const s = parseDateOnly(fechaInicio);
    const f = parseDateOnly(fechaFin);
    const diff = Math.max(0, Math.floor((f.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
    return diff;
  }, [fechaInicio, fechaFin]);

  const pricePerNightList = useMemo(() => {
    if (!fechaInicio || !fechaFin) return [];
    const start = parseDateOnly(fechaInicio);
    const end = parseDateOnly(fechaFin);
    const nightsDates = eachNight(start, end);
    return nightsDates.map((nightDate) => {
      const matching = priceRanges.find((r) => {
        const rs = parseDateOnly(r.fecha_inicio);
        const rf = parseDateOnly(r.fecha_fin);
        return nightDate >= rs && nightDate <= rf;
      });
      return matching ? matching.precio_por_noche : cabana?.precio_base ?? 0;
    });
  }, [fechaInicio, fechaFin, priceRanges, cabana]);

  const montoTotal = pricePerNightList.reduce((s, p) => s + p, 0);
  const montoSenia = Math.round(montoTotal * 0.5);
  const montoSaldo = montoTotal - montoSenia;

  const excedeCapacidad = huespedes > capacidad;

  return (
    <div>
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full">
        <div className="text-3xl font-extrabold text-[#1E1E1E] mb-1">
          {cabana?.precio_base ? cabana.precio_base.toLocaleString("es-AR") : "—"}
          <span className="text-sm font-normal text-gray-500">/noche</span>
        </div>
        <p className="text-sm text-emerald-600 mb-4">Beneficios exclusivos por reserva anticipada</p>

        <form className="space-y-4" action="/api/reservas" method="post">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[#1E1E1E]">Check-in</label>
              <input
                type="date"
                name="fecha_inicio"
                value={fechaInicio}
                min={todayStr}
                onChange={(e) => {
                  setFechaInicio(e.target.value);
                  // if checkout is before new checkin, reset checkout
                  if (fechaFin && e.target.value && parseDateOnly(fechaFin) <= parseDateOnly(e.target.value)) {
                    setFechaFin("");
                  }
                }}
                className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#1E1E1E]">Check-out</label>
              <input
                type="date"
                name="fecha_fin"
                value={fechaFin}
                min={fechaInicio ? (() => {
                  const d = parseDateOnly(fechaInicio);
                  d.setDate(d.getDate() + 1);
                  return d.toISOString().split("T")[0];
                })() : todayStr}
                onChange={(e) => setFechaFin(e.target.value)}
                className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Huéspedes</label>
            <select
              name="huespedes"
              value={huespedes}
              onChange={(e) => setHuespedes(Number(e.target.value))}
              className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              {Array.from({ length: Math.max(4, capacidad) }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? "Adulto" : "Adultos"}
                </option>
              ))}
            </select>
          </div>

          <input type="hidden" name="cabana_id" value={String(cabana?.id ?? "")} />
          <input type="hidden" name="monto_total" value={String(montoTotal)} />
          <input type="hidden" name="monto_senia" value={String(montoSenia)} />

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span>{nights > 0 ? `${nights} noches` : "Seleccioná fechas"}</span>
              <span className="font-semibold">{montoTotal ? `$${montoTotal.toLocaleString("es-AR")}` : "—"}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span>Seña (50%)</span>
              <span>{montoSenia ? `$${montoSenia.toLocaleString("es-AR")}` : "—"}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900">
              <span>Saldo</span>
              <span>{montoSaldo ? `$${montoSaldo.toLocaleString("es-AR")}` : "—"}</span>
            </div>
          </div>

          {excedeCapacidad && (
            <p className="text-sm text-red-600">La cantidad de huéspedes excede la capacidad de la cabaña ({capacidad}).</p>
          )}

          <button
            type="submit"
            disabled={!fechaInicio || !fechaFin || nights === 0 || excedeCapacidad}
            className="w-full bg-amber-600 text-white font-semibold py-3 rounded-lg mt-4 disabled:opacity-50"
          >
            Verificar disponibilidad
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">Aún no se realizará ningún cargo</p>
        </form>
      </div>
    </div>
  );
}


