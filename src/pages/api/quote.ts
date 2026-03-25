import type { APIRoute } from "astro";
import { getReservaCabanaConfig } from "@constants/reservasConfig";

export const prerender = false;

type QuoteInput = {
  cabinId: string | number;
  checkInDate: string;
  checkOutDate: string;
  numGuests: number;
};

type QuoteResponse = {
  success: true;
  message: string;
  data: {
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
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function isValidIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function parseDateOnly(value: string) {
  return new Date(`${value}T00:00:00`);
}

function eachNight(start: string, end: string) {
  const dates: string[] = [];
  const currentDate = parseDateOnly(start);
  const endDate = parseDateOnly(end);

  while (currentDate < endDate) {
    dates.push(currentDate.toISOString().split("T")[0] ?? "");
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function buildMockQuote(
  cabanaConfig: ReturnType<typeof getReservaCabanaConfig>,
  payload: QuoteInput,
): QuoteResponse {
  const nights = eachNight(payload.checkInDate, payload.checkOutDate);
  const total = nights.length * (cabanaConfig?.precio_base ?? 0);
  const deposit = Math.round(total * 0.5);

  return {
    success: true,
    message: "Operación exitosa",
    data: {
      cabin_id: cabanaConfig?.backendCabinId ?? 0,
      check_in: payload.checkInDate,
      check_out: payload.checkOutDate,
      total,
      deposit,
      balance: total - deposit,
      nights: nights.length,
      breakdown: nights.map((date) => ({
        date,
        price: cabanaConfig?.precio_base ?? 0,
        price_group: "Modo prueba local",
      })),
    },
  };
}

export const POST: APIRoute = async ({ request }) => {
  const apiBaseUrl = (
    process.env.PUBLIC_API_URL ?? import.meta.env.PUBLIC_API_URL
  )?.replace(/\/$/, "");
  const tenantSlug =
    process.env.PRIVATE_QUOTE_TENANT_SLUG ??
    import.meta.env.PRIVATE_QUOTE_TENANT_SLUG;
  const quoteToken =
    process.env.PRIVATE_QUOTE_TOKEN ?? import.meta.env.PRIVATE_QUOTE_TOKEN;
  const useMock =
    (process.env.PRIVATE_QUOTE_USE_MOCK ??
      import.meta.env.PRIVATE_QUOTE_USE_MOCK) === "true";

  if (!apiBaseUrl || !tenantSlug || !quoteToken) {
    return json(
      {
        success: false,
        message: "Falta configuración del servicio de cotización.",
      },
      500,
    );
  }

  let payload: QuoteInput;

  try {
    const rawBody = await request.text();
    payload = JSON.parse(rawBody) as QuoteInput;
  } catch {
    return json(
      {
        success: false,
        message: "No pudimos interpretar la solicitud.",
      },
      400,
    );
  }

  const cabinId = String(payload.cabinId ?? "");
  const cabanaConfig = getReservaCabanaConfig(cabinId);

  if (!cabanaConfig) {
    return json(
      {
        success: false,
        message: "La cabaña seleccionada no existe.",
      },
      422,
    );
  }

  if (
    !isValidIsoDate(payload.checkInDate) ||
    !isValidIsoDate(payload.checkOutDate)
  ) {
    return json(
      {
        success: false,
        message: "Las fechas no tienen un formato válido.",
      },
      422,
    );
  }

  if (
    !Number.isInteger(payload.numGuests) ||
    payload.numGuests < 2 ||
    payload.numGuests > cabanaConfig.capacidad
  ) {
    return json(
      {
        success: false,
        message: `La cantidad de huéspedes debe estar entre 2 y ${cabanaConfig.capacidad}.`,
      },
      422,
    );
  }

  if (useMock) {
    return json(buildMockQuote(cabanaConfig, payload));
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/api/v1/public/tenants/${tenantSlug}/quote`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Public-Quote-Token": quoteToken,
        },
        body: JSON.stringify({
          cabin_id: cabanaConfig.backendCabinId,
          check_in_date: payload.checkInDate,
          check_out_date: payload.checkOutDate,
          num_guests: payload.numGuests,
        }),
      },
    );

    const data = await response.json();

    return json(data, response.status);
  } catch {
    return json(
      {
        success: false,
        message: "No pudimos conectar con el servicio de cotización.",
      },
      502,
    );
  }
};

export const GET: APIRoute = async () => {
  return json(
    {
      success: false,
      message: "Usá POST para cotizar una reserva.",
    },
    405,
  );
};
