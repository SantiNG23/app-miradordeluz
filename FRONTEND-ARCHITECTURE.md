# Sistema de Gestión de Cabañas - Frontend

## 📦 Estructura Completa del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── ui/                 # Componentes shadcn/ui (Button, Dialog, etc.)
│   ├── layout/             # navbar.tsx, sidebar.tsx
│   └── common/             # daily-summary-modal.tsx, loading.tsx
│
├── pages/                  # Páginas por módulo
│   ├── dashboard-page.tsx
│   ├── reservas/
│   │   └── reservations-page.tsx
│   ├── clientes/
│   │   └── clients-page.tsx
│   ├── cabanas/
│   │   └── cabins-page.tsx
│   ├── tarifas/
│   │   └── rates-page.tsx
│   ├── calendario/
│   │   └── calendar-page.tsx
│   └── reportes/
│       └── reports-page.tsx
│
├── features/               # Lógica de negocio por dominio
│   ├── reservas/          # Componentes específicos de reservas
│   ├── clientes/          # Componentes específicos de clientes
│   ├── cabanas/           # Componentes específicos de cabañas
│   └── tarifas/           # Componentes específicos de tarifas
│
├── hooks/                  # Custom hooks
│   ├── use-clientes.ts    # Queries y mutations de clientes
│   ├── use-reservas.ts    # Queries y mutations de reservas
│   ├── use-cabanas.ts     # Queries y mutations de cabañas
│   └── use-dashboard.ts   # Dashboard, calendario y reportes
│
├── services/               # API calls (contrato front-back)
│   ├── api.ts             # Configuración base de Axios
│   ├── clientes.service.ts
│   ├── reservas.service.ts
│   ├── cabanas.service.ts
│   ├── tarifas.service.ts
│   └── dashboard.service.ts
│
├── store/                  # Zustand stores
│   ├── auth.store.ts      # Autenticación y usuario
│   ├── reservas.store.ts  # Estado de reservas
│   ├── cabanas.store.ts   # Estado de cabañas
│   └── ui.store.ts        # UI global (sidebar, modals, toasts)
│
├── types/                  # TypeScript types
│   └── index.ts           # Todas las entidades y tipos
│
├── lib/                    # Utilidades y configuraciones
│   ├── utils.ts           # Funciones de utilidad
│   └── providers.tsx      # React Query Provider
│
├── layouts/                # Layout components
│   └── main-layout.tsx
│
├── App.tsx                # Rutas principales
├── main.tsx               # Entry point
├── index.css              # Estilos globales
└── vite-env.d.ts          # Variables de entorno tipadas
```

---

## 🔗 Servicios API - Contrato Frontend/Backend

### **Endpoints Implementados**

#### **Clientes**

- `GET /api/clientes` - Listar con paginación
- `GET /api/clientes/:id` - Obtener por ID
- `GET /api/clientes/buscar-dni?dni=` - Buscar por DNI
- `POST /api/clientes` - Crear
- `PUT /api/clientes/:id` - Actualizar
- `DELETE /api/clientes/:id` - Eliminar
- `GET /api/clientes/:id/historial` - Historial de reservas

#### **Reservas**

- `GET /api/reservas` - Listar con filtros
- `GET /api/reservas/:id` - Obtener por ID
- `POST /api/reservas` - Crear
- `PUT /api/reservas/:id` - Actualizar
- `DELETE /api/reservas/:id` - Cancelar
- `PATCH /api/reservas/:id/estado` - Cambiar estado
- `POST /api/reservas/disponibilidad` - Verificar disponibilidad
- `POST /api/reservas/calcular-precio` - Calcular precio total
- `POST /api/reservas/:id/pagos` - Registrar pago (seña/saldo)
- `GET /api/reservas/historial-dni?dni=` - Historial por DNI

#### **Cabañas**

- `GET /api/cabanas` - Listar todas
- `GET /api/cabanas/:id` - Obtener por ID
- `POST /api/cabanas` - Crear
- `PUT /api/cabanas/:id` - Actualizar
- `DELETE /api/cabanas/:id` - Eliminar
- `PATCH /api/cabanas/:id/toggle-estado` - Activar/desactivar

#### **Características**

- `GET /api/caracteristicas` - Listar pool
- `POST /api/caracteristicas` - Crear
- `PUT /api/caracteristicas/:id` - Actualizar
- `DELETE /api/caracteristicas/:id` - Eliminar

#### **Tarifas**

- `GET /api/grupos-precios` - Listar grupos
- `POST /api/grupos-precios` - Crear grupo
- `PUT /api/grupos-precios/:id` - Actualizar
- `DELETE /api/grupos-precios/:id` - Eliminar
- `GET /api/grupos-precios/:id/rangos` - Rangos de un grupo
- `POST /api/rangos-precios` - Crear rango
- `PUT /api/rangos-precios/:id` - Actualizar rango
- `DELETE /api/rangos-precios/:id` - Eliminar rango
- `GET /api/rangos-precios/activos?fecha=` - Rangos activos

#### **Dashboard y Reportes**

- `GET /api/calendario?fechaInicio=&fechaFin=` - Eventos del calendario
- `GET /api/dashboard/resumen-diario` - Resumen del día
- `GET /api/reportes/ocupacion` - Reporte de ocupación
- `GET /api/reportes/reservas` - Resumen de reservas
- `GET /api/reportes/historial-dni?dni=` - Historial completo por DNI

---

## 🎯 Headers de las Peticiones

Todas las peticiones al backend incluyen:

```typescript
{
  'Content-Type': 'application/json',
  'X-Tenant-ID': '1',  // Por ahora fijo para MVP
  'Authorization': 'Bearer {token}'  // Si está autenticado
}
```

---

## 🛠️ Custom Hooks Disponibles

### **Clientes**

- `useClientes(filters?)` - Lista con filtros
- `useCliente(id)` - Por ID
- `useClienteByDni(dni)` - Por DNI
- `useClienteHistory(id)` - Historial
- `useCreateCliente()` - Crear
- `useUpdateCliente()` - Actualizar
- `useDeleteCliente()` - Eliminar

### **Reservas**

- `useReservas(filters?)` - Lista con filtros
- `useReserva(id)` - Por ID
- `useCheckDisponibilidad()` - Verificar disponibilidad
- `useCalcularPrecio()` - Calcular precio
- `useCreateReserva()` - Crear
- `useUpdateReserva()` - Actualizar
- `useUpdateEstadoReserva()` - Cambiar estado
- `useCancelReserva()` - Cancelar
- `useRegistrarPago()` - Registrar pago

### **Cabañas**

- `useCabanas()` - Listar todas
- `useCabana(id)` - Por ID
- `useCaracteristicas()` - Pool de características
- `useCreateCabana()` - Crear
- `useUpdateCabana()` - Actualizar
- `useDeleteCabana()` - Eliminar
- `useToggleEstadoCabana()` - Activar/desactivar

### **Dashboard**

- `useCalendarioEventos(inicio, fin)` - Eventos
- `useResumenDiario()` - Resumen del día
- `useReporteOcupacion(filtros)` - Ocupación
- `useReporteReservas(filtros)` - Reservas
- `useHistorialPorDni(dni)` - Historial

---

## 🔐 Configuración Multi-tenant

El sistema está preparado para escalar a SaaS:

1. **Tenant ID**: Se envía en cada request via header `X-Tenant-ID`
2. **Store**: El tenant se guarda en `authStore.user.tenantId`
3. **Interceptor**: Axios añade automáticamente el header en todas las peticiones

---

## 📋 Próximos Pasos

1. ✅ Estructura base completa
2. ✅ Servicios API configurados
3. ✅ Stores de Zustand
4. ✅ Custom hooks con React Query
5. ✅ Variables de entorno
6. ⏳ Implementar componentes UI de shadcn/ui
7. ⏳ Desarrollar formularios con validación
8. ⏳ Implementar calendario interactivo
9. ⏳ Conectar con backend real
10. ⏳ Testing e2e

---

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

---

## 📝 Variables de Entorno

Crear archivo `.env` basado en `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Sistema de Gestión de Cabañas
VITE_TENANT_ID=1
```
