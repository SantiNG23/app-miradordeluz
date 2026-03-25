Contexto
- Este EP NO se consume directo desde el browser.
- Se consume desde el API route server-side de Astro.
- El frontend le pega a Astro; Astro le pega a Laravel.
Endpoint
- POST /api/v1/public/tenants/{tenant_slug}/quote
Headers requeridos
- Accept: application/json
- Content-Type: application/json
- X-Public-Quote-Token: <pqt_live_730d44d74982770e0ca8bfec05b758aace6e0a310c0854e87f6f31e52f0f7ee5>
Path params
- tenant_slug
  - string
  - obligatorio
  - debe pertenecer a un tenant activo
Body
{
  "cabin_id": 12,
  "check_in_date": "2026-04-10",
  "check_out_date": "2026-04-13",
  "num_guests": 2
}
Reglas
- cabin_id
  - integer
  - obligatorio
  - debe existir dentro del tenant indicado
- check_in_date
  - string
  - obligatorio
  - formato Y-m-d
  - hoy o posterior
- check_out_date
  - string
  - obligatorio
  - formato Y-m-d
  - mayor a check_in_date
- num_guests
  - integer
  - obligatorio
  - mínimo 2
  - máximo 255
  - además el backend valida capacidad real de la cabaña
- reservation_id
  - prohibido en este endpoint
200 OK
{
  "success": true,
  "message": "Operación exitosa",
  "data": {
    "cabin_id": 12,
    "check_in": "2026-04-10",
    "check_out": "2026-04-13",
    "total": 300,
    "deposit": 150,
    "balance": 150,
    "nights": 3,
    "breakdown": [
      {
        "date": "2026-04-10",
        "price": 100,
        "price_group": "Tarifa Base"
      },
      {
        "date": "2026-04-11",
        "price": 100,
        "price_group": "Tarifa Base"
      },
      {
        "date": "2026-04-12",
        "price": 100,
        "price_group": "Tarifa Base"
      }
    ]
  }
}
401 Unauthorized
- token inválido o ausente
{
  "success": false,
  "message": "No autenticado",
  "errors": {
    "code": ["invalid_public_quote_token"]
  }
}
404 Not Found
- tenant inexistente o inactivo
{
  "success": false,
  "message": "Recurso no encontrado",
  "errors": {
    "code": ["tenant_not_found"]
  }
}
422 Unprocessable Entity
- payload inválido
{
  "success": false,
  "message": "Los datos proporcionados no son válidos.",
  "errors": {
    "cabin_id": [
      "La cabaña no existe o no pertenece al tenant indicado"
    ]
  }
}
También puede devolver 422 si:
- la cabaña no soporta esa cantidad de huéspedes
- no hay tarifa configurada para esas fechas/huespedes
- fechas inválidas
429 Too Many Requests
{
  "success": false,
  "message": "Demasiadas solicitudes",
  "errors": {
    "code": ["rate_limited"]
  }
}
Headers relevantes:
- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset
Contrato recomendado para Astro
- Input del frontend hacia Astro:
type QuoteInput = {
  cabinId: number
  checkInDate: string
  checkOutDate: string
  numGuests: number
}
- Output de Astro hacia frontend:
type QuoteResponse = {
  cabin_id: number
  check_in: string
  check_out: string
  total: number
  deposit: number
  balance: number
  nights: number
  breakdown: Array<{
    date: string
    price: number
    price_group: string | null
  }>
}
Notas importantes
- NO devuelve is_available
- NO devuelve num_guests en data
- el frontend no debería asumir disponibilidad
- si querés mostrar solo “precio estimado”, este contrato ya está bien
Recomendación para frontend
- Mostrar:
  - noches
  - total
  - seña
  - saldo
- breakdown dejalo opcional en UI
- si te interesa una UX más limpia, Astro puede transformar esta respuesta y devolverle al frontend un DTO más lindo