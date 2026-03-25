import React, { useEffect, useId, useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

const CALENDAR_EXIT_DURATION_MS = 180;

type QuoteData = {
  cabin_id: number;
  check_in: string;
  check_out: string;
  total: number;
  deposit: number;
  balance: number;
  nights: number;
  breakdown: Array<{
    date: string;
    price: number;
    price_group: string | null;
  }>;
};

type QuoteApiSuccess = {
  success: true;
  data: QuoteData;
};

type QuoteApiError = {
  success: false;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

type ReservaQuoteWidgetProps = {
  cabanaId: string;
  cabanaNombre: string;
  capacidad: number;
  variant: "mobile" | "desktop";
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateForMessage(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function parseDateValue(value: string) {
  if (!value) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day);
}

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDateForDisplay(value: string) {
  const date = parseDateValue(value);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

function formatBreakdownDate(value: string) {
  const date = parseDateValue(value);

  if (!date) {
    return value;
  }

  return new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(date);
}

function getTomorrow(value: string) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0] ?? "";
}

function extractErrorMessage(payload: QuoteApiError | null) {
  if (!payload) {
    return "No pudimos calcular la cotización en este momento.";
  }

  const firstError = Object.values(payload.errors ?? {}).find(
    (messages) => Array.isArray(messages) && messages.length > 0,
  );

  if (firstError && firstError[0]) {
    return firstError[0];
  }

  return (
    payload.message || "No pudimos calcular la cotización en este momento."
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQueryList.matches);
    };

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

export default function ReservaQuoteWidget({
  cabanaId,
  cabanaNombre,
  capacidad,
  variant,
}: ReservaQuoteWidgetProps) {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const today = formatDateValue(todayDate);
  const inputPrefix = useId();
  const isDesktop = variant === "desktop";
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const isMobileViewport = useMediaQuery("(max-width: 767px)");

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [numGuestsInput, setNumGuestsInput] = useState("2");
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(true);
  const calendarMonths = isMobileViewport ? 1 : 2;

  const selectedCheckIn = dateRange?.from;
  const selectedCheckOut = dateRange?.to;
  const checkInDate = selectedCheckIn ? formatDateValue(selectedCheckIn) : "";
  const checkOutDate = selectedCheckOut
    ? formatDateValue(selectedCheckOut)
    : "";
  const numGuests = Number.parseInt(numGuestsInput, 10);
  const hasGuestCount = Number.isInteger(numGuests);
  const guestCountIsValid =
    hasGuestCount && numGuests >= 2 && numGuests <= capacidad;
  const dateRangeIsValid = Boolean(
    checkInDate &&
    checkOutDate &&
    new Date(`${checkOutDate}T00:00:00`) > new Date(`${checkInDate}T00:00:00`),
  );
  const canRequestQuote = dateRangeIsValid && guestCountIsValid;
  const selectedNights =
    selectedCheckIn && selectedCheckOut
      ? Math.round(
          (selectedCheckOut.getTime() - selectedCheckIn.getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;
  const checkInLabel = checkInDate
    ? formatDateForDisplay(checkInDate)
    : "Seleccionar";
  const checkOutLabel = checkOutDate
    ? formatDateForDisplay(checkOutDate)
    : "Seleccionar";

  useEffect(() => {
    if (isCalendarOpen) {
      setIsCalendarVisible(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsCalendarVisible(false);
    }, CALENDAR_EXIT_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCalendarOpen]);

  useEffect(() => {
    if (!isCalendarOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isCalendarOpen]);

  useEffect(() => {
    if (!canRequestQuote) {
      setQuote(null);
      if (numGuestsInput && !guestCountIsValid) {
        if (numGuests < 2) {
          setQuoteError("La reserva online requiere al menos 2 huéspedes.");
        } else if (numGuests > capacidad) {
          setQuoteError(`Esta cabaña admite hasta ${capacidad} huéspedes.`);
        }
      } else {
        setQuoteError(null);
      }
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      setQuoteError(null);

      try {
        const response = await fetch("/api/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            cabinId: cabanaId,
            checkInDate,
            checkOutDate,
            numGuests,
          }),
          signal: controller.signal,
        });

        const payload = (await response.json()) as
          | QuoteApiSuccess
          | QuoteApiError;

        if (!response.ok || !payload.success) {
          setQuote(null);
          setQuoteError(extractErrorMessage(payload.success ? null : payload));
          return;
        }

        setQuote(payload.data);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setQuote(null);
        setQuoteError("No pudimos calcular la cotización en este momento.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [
    cabanaId,
    capacidad,
    canRequestQuote,
    checkInDate,
    checkOutDate,
    guestCountIsValid,
    numGuests,
    numGuestsInput,
  ]);

  useEffect(() => {
    setIsBreakdownOpen(Boolean(quote?.breakdown.length));
  }, [quote]);

  const handleGuestsChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 3);
    setNumGuestsInput(digitsOnly);
  };

  const handleGuestsBlur = () => {
    if (!numGuestsInput) {
      setNumGuestsInput("2");
      return;
    }

    const normalized = Math.min(
      Math.max(Number.parseInt(numGuestsInput, 10), 2),
      capacidad,
    );
    setNumGuestsInput(String(normalized));
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      setDateRange(undefined);
      return;
    }

    const normalizedRange: DateRange = {
      from: normalizeDate(range.from),
      to: range.to ? normalizeDate(range.to) : undefined,
    };

    setDateRange(normalizedRange);

    if (normalizedRange.from && normalizedRange.to) {
      setIsCalendarOpen(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (!quote) {
      return;
    }

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "conversion",
      });
    }

    const message = [
      "Hola, quiero solicitar una reserva en Mirador de Luz.",
      "",
      `Cabaña: ${cabanaNombre}`,
      `Check-in: ${formatDateForMessage(quote.check_in)}`,
      `Check-out: ${formatDateForMessage(quote.check_out)}`,
      `Huéspedes: ${numGuests}`,
      `Noches: ${quote.nights}`,
      `Total: ${formatCurrency(quote.total)}`,
      `Seña: ${formatCurrency(quote.deposit)}`,
      `Saldo: ${formatCurrency(quote.balance)}`,
      "",
      "¿Me confirman disponibilidad para avanzar?",
    ].join("\n");

    window.open(
      `https://wa.me/5493813513513?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      className={[
        "overflow-visible border border-slate-200 bg-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.45)]",
        isDesktop ? "rounded-4xl" : "rounded-[28px]",
      ].join(" ")}
    >
      <div
        className={[
          "border-b border-slate-100 bg-linear-to-r from-white via-orange-50 to-amber-50",
          isDesktop ? "px-6 py-5" : "px-4 py-4",
        ].join(" ")}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-700">
          Reservar
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 font-montserrat">
          {isDesktop ? "Tu próxima estadía empieza acá" : "Organizá tu estadía"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Seleccioná tus fechas para ver el precio exacto y disponibilidad al
          instante.
        </p>
      </div>

      <div
        className={["space-y-6", isDesktop ? "px-6 py-6" : "px-4 py-4"].join(
          " ",
        )}
      >
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-900 font-montserrat">
              Seleccioná tus fechas
            </h3>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCalendarOpen(true)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition-colors hover:bg-slate-50 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 focus:outline-none"
                aria-haspopup="dialog"
                aria-expanded={isCalendarOpen}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Fechas de estadía
                    </span>
                    <p className="mt-1 text-sm text-slate-500">
                      Tocá para elegir check-in y check-out.
                    </p>
                  </div>
                  <svg
                    className="h-4 w-4 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2Z"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-2 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="px-3 py-3">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Check-in
                    </span>
                    <span
                      className={[
                        "mt-1 block text-sm font-medium",
                        checkInDate ? "text-slate-900" : "text-slate-400",
                      ].join(" ")}
                    >
                      {checkInLabel}
                    </span>
                  </div>
                  <div className="px-3 py-3">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Check-out
                    </span>
                    <span
                      className={[
                        "mt-1 block text-sm font-medium",
                        checkOutDate ? "text-slate-900" : "text-slate-400",
                      ].join(" ")}
                    >
                      {checkOutLabel}
                    </span>
                  </div>
                </div>
              </button>

              {isCalendarVisible ? (
                <div
                  ref={calendarRef}
                  aria-hidden={!isCalendarOpen}
                  className={[
                    "mirador-date-picker absolute left-0 right-0 top-[calc(100%-1px)] z-50 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl transition-all duration-180 ease-out md:left-auto md:right-0 md:w-max md:min-w-max",
                    isCalendarOpen
                      ? "translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0",
                  ].join(" ")}
                >
                  <div className="mb-3 flex items-center justify-between gap-3 px-1">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Elegí tu rango de estadía
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Mostramos el calendario adaptado a tu pantalla.
                      </p>
                    </div>
                    {(checkInDate || checkOutDate) && (
                      <button
                        type="button"
                        onClick={() => {
                          setDateRange(undefined);
                        }}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 transition hover:border-orange-200 hover:text-orange-700"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  <div className="text-slate-900 [&_.rdp]:text-slate-900 [&_.rdp-button]:text-slate-900 [&_.rdp-caption_label]:text-slate-900">
                    <DayPicker
                      mode="range"
                      min={1}
                      navLayout="around"
                      numberOfMonths={calendarMonths}
                      pagedNavigation
                      showOutsideDays
                      selected={dateRange}
                      onSelect={handleRangeSelect}
                      disabled={{ before: todayDate }}
                      classNames={{
                        root: "w-full",
                        months:
                          "flex flex-col sm:flex-row space-y-4 sm:space-x-6 sm:space-y-0",
                        month_caption:
                          "flex h-10 items-center justify-center px-10 mb-4",
                        caption_label:
                          "text-sm font-bold text-slate-900 font-montserrat text-center",
                        nav: "pointer-events-none",
                        button_previous:
                          "pointer-events-auto absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-900",
                        button_next:
                          "pointer-events-auto absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-900",
                        month_grid: "w-full border-collapse",
                        weekday:
                          "text-slate-500 rounded-md w-10 font-medium text-[0.75rem] uppercase text-center",
                        day: "text-center text-sm p-0 font-normal align-middle",
                        day_button:
                          "flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200",
                        selected:
                          "bg-[#EA580C] text-white hover:bg-[#C2410C] hover:text-white focus:bg-[#EA580C] focus:text-white rounded-md font-bold",
                        today: "text-[#EA580C] font-bold",
                        outside: "text-slate-300 opacity-50",
                        disabled: "text-slate-300 opacity-50 line-through",
                        range_start:
                          "bg-linear-to-r from-[#EA580C] from-50% to-orange-100 to-50% text-white",
                        range_middle:
                          "bg-orange-100 text-orange-900 rounded-none",
                        range_end:
                          "bg-linear-to-l from-[#EA580C] from-50% to-orange-100 to-50% text-white",
                        hidden: "invisible",
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-slate-500">
                Elegí llegada y salida en un solo calendario.
              </p>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700 ring-1 ring-orange-100">
                {selectedNights > 0
                  ? `${selectedNights} noches`
                  : "Rango flexible"}
              </span>
            </div>

            <label
              className="col-span-2 block"
              htmlFor={`${inputPrefix}-guests`}
            >
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Huéspedes
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Máx. {capacidad}
                </span>
              </div>
              <input
                id={`${inputPrefix}-guests`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={numGuestsInput}
                onChange={(event) => handleGuestsChange(event.target.value)}
                onBlur={handleGuestsBlur}
                aria-invalid={numGuestsInput ? !guestCountIsValid : false}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition-colors hover:bg-slate-100 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-linear-to-br from-white via-orange-50 to-amber-50 p-4 shadow-[0_18px_45px_-35px_rgba(194,65,12,0.65)]">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">
                Tu cotización
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900 font-montserrat">
                {quote
                  ? "Resumen estimado de tu estadía"
                  : "Resumen de cotización"}
              </h3>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3 rounded-2xl border border-white/90 bg-white/90 p-3 shadow-sm">
              <div className="h-4 w-32 animate-pulse rounded-full bg-orange-100" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
                <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
                <div className="col-span-2 h-16 animate-pulse rounded-2xl bg-slate-100" />
              </div>
            </div>
          ) : quote ? (
            <div className="space-y-4 rounded-2xl border border-white/90 bg-white/95 p-4 shadow-sm">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Total estimado
              </span>
              <strong className="mt-2 block text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {formatCurrency(quote.total)}
              </strong>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Noches: {quote.nights}
              </p>

              <div className="my-3 border-t border-slate-200" />

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-500">
                    Seña para reservar
                  </span>
                  <span className="text-base font-semibold text-slate-900">
                    {formatCurrency(quote.deposit)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-500">
                    Saldo al ingresar
                  </span>
                  <span className="text-base font-semibold text-slate-900">
                    {formatCurrency(quote.balance)}
                  </span>
                </div>
              </div>

              {quote.breakdown.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80">
                  <button
                    type="button"
                    onClick={() => setIsBreakdownOpen((value) => !value)}
                    aria-expanded={isBreakdownOpen}
                    className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition hover:bg-white/70"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Detalle por noche
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Valor calculado para cada fecha de tu estadía.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 ring-1 ring-slate-200">
                        {quote.breakdown.length} noches
                      </span>
                      <svg
                        className={[
                          "h-4 w-4 text-slate-500 transition-transform duration-300",
                          isBreakdownOpen ? "rotate-180" : "rotate-0",
                        ].join(" ")}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m6 9 6 6 6-6"
                        />
                      </svg>
                    </div>
                  </button>

                  <div
                    className={[
                      "grid overflow-hidden transition-all duration-300 ease-out",
                      isBreakdownOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="min-h-0 overflow-hidden px-3 pb-3">
                      <div className="space-y-2">
                        {quote.breakdown.map((item) => (
                          <div
                            key={`${item.date}-${item.price}`}
                            className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-3 ring-1 ring-slate-100"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900">
                                {formatBreakdownDate(item.date)}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {item.price_group || "Tarifa aplicada"}
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-slate-900">
                              {formatCurrency(item.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/90 bg-white/90 p-3 shadow-sm">
              <div className="rounded-[20px] border border-dashed border-orange-200 bg-linear-to-br from-white to-orange-50 px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2Z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      Tu precio aparece apenas completes los datos
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Completá fechas y huéspedes para ver el total, la seña y
                      el saldo en un solo bloque, listo para reservar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[11px] font-bold text-orange-700">
                ✓
              </span>
              <span>Confirmación personalizada por WhatsApp</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[11px] font-bold text-orange-700">
                ✓
              </span>
              <span>Respuesta directa del complejo</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[11px] font-bold text-orange-700">
                ✓
              </span>
              <span>Precio estimado calculado con tus fechas reales</span>
            </li>
          </ul>

          {quoteError ? (
            <p className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {quoteError}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handleWhatsAppClick}
            disabled={!quote || isLoading}
            className="mt-4 w-full rounded-2xl bg-orange-700 px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-800 hover:shadow-xl hover:shadow-orange-300/50 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            Reservar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
