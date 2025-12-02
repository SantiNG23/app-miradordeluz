# Sistema de Gestión de Cabañas

Sistema web mobile-first para administrar un complejo de cabañas.

## 📁 Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── ui/                 # Componentes shadcn/ui
│   ├── layout/             # navbar.tsx, sidebar.tsx
│   └── common/             # daily-summary-modal.tsx, etc.
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
├── features/               # Lógica de negocio por dominio
│   ├── reservas/
│   ├── clientes/
│   ├── cabanas/
│   └── tarifas/
├── hooks/                  # Custom hooks
├── lib/                    # Utilidades y configuraciones
│   └── utils.ts
├── services/               # API calls
│   ├── api.ts
│   ├── reservas.service.ts
│   ├── clientes.service.ts
│   └── cabanas.service.ts
├── store/                  # Zustand stores
├── types/                  # TypeScript types
│   └── index.ts
├── layouts/                # Layout components
│   └── main-layout.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Convenciones de Nombres

- **Archivos**: kebab-case (minúsculas con guiones)
  - ✅ `dashboard-page.tsx`
  - ✅ `daily-summary-modal.tsx`
  - ✅ `main-layout.tsx`
- **Componentes**: PascalCase

  - ✅ `DashboardPage`
  - ✅ `DailySummaryModal`
  - ✅ `MainLayout`

- **Funciones/Variables**: camelCase

  - ✅ `useState`, `useEffect`
  - ✅ `fetchReservas`, `calculateTotal`

- **Tipos/Interfaces**: PascalCase
  - ✅ `Reserva`, `Cliente`, `Cabana`
  - ✅ `EstadoReserva`, `MetodoPago`

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui (Radix UI)
- **Estado Global**: Zustand
- **Formularios**: React Hook Form + Zod
- **Data Fetching**: TanStack Query (React Query)
- **Fechas**: date-fns
- **Iconos**: lucide-react
- **Build Tool**: Vite

## 📦 Instalación

```bash
npm install
```

## 🚀 Desarrollo

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🔗 Módulos del Sistema

### ✅ Gestión de Reservas

- Crear, editar y consultar reservas
- Estados: pendiente, confirmada, check-in, finalizada, cancelada
- Registro de seña (50%) y saldo (50%)
- Validación de solapamiento de fechas

### ✅ Gestión de Clientes

- Alta, edición y búsqueda de clientes
- Historial de reservas por DNI

### ✅ Gestión de Cabañas

- Administración de cabañas y capacidad
- Pool de características (pileta, cochera, etc.)

### ✅ Tarifas por Temporada

- Grupos de precios (Temporada Alta, Finde Largo, etc.)
- Rangos de fechas por grupo
- Cálculo automático según noches

### ✅ Calendario de Ocupación

- Vista tipo Gantt por cabaña
- Indicadores de estado por color
- Creación rápida desde calendario

### ✅ Resumen Diario

- Modal automático con eventos del día
- Check-ins, check-outs y reservas pendientes

### ✅ Reportes Operativos

- Reservas por rango de fechas
- Historial por DNI
- Ocupación por período

## 🎯 Próximos Pasos

1. ✅ Estructura base y configuración
2. ⏳ Implementar componentes UI de shadcn/ui
3. ⏳ Configurar servicios de API
4. ⏳ Desarrollar formularios con validación
5. ⏳ Implementar calendario interactivo
6. ⏳ Agregar lógica de negocio por módulo
7. ⏳ Testing e integración con backend
