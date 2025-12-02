# 📚 Explicación Detallada de la Estructura Frontend

## Stack Tecnológico

### **Core Framework**

- **React 18.3.1** - Biblioteca principal para construir la interfaz de usuario
- **TypeScript 5.3.3** - Superset de JavaScript con tipado estático
- **Vite 5.1.0** - Build tool moderno y rápido para desarrollo

### **Routing y Navegación**

- **React Router DOM 6.22.0** - Manejo de rutas en el lado del cliente

### **State Management**

- **Zustand 4.5.0** - Estado global ligero y reactivo
- **TanStack React Query 5.20.0** - Manejo de estado del servidor (cache, sincronización)

### **Formularios y Validación**

- **React Hook Form 7.50.0** - Gestión eficiente de formularios
- **Zod 3.22.4** - Schema validation con TypeScript
- **@hookform/resolvers 3.3.4** - Integración entre React Hook Form y Zod

### **Componentes UI**

- **Radix UI** - Componentes accesibles headless (Dialog, Dropdown, Select, Toast, etc.)
- **Lucide React 0.323.0** - Biblioteca de iconos moderna
- **React Day Picker 8.10.0** - Selector de fechas

### **Estilos**

- **Tailwind CSS 3.4.1** - Framework CSS utility-first
- **PostCSS 8.4.35** - Procesador CSS
- **Autoprefixer 10.4.17** - Añade vendor prefixes automáticamente
- **tailwindcss-animate 1.0.7** - Animaciones predefinidas
- **class-variance-authority 0.7.0** - Gestión de variantes de componentes
- **clsx 2.1.0** + **tailwind-merge 2.2.0** - Utilidades para combinar clases CSS

### **Utilidades**

- **date-fns 3.3.0** - Manipulación y formateo de fechas

---

## 📂 Estructura de Carpetas Explicada

### **`src/components/`** - Componentes Reutilizables

#### **`components/ui/`**

Componentes de interfaz de usuario base construidos con **Radix UI** y estilizados con **Tailwind CSS**. Estos siguen el patrón de **shadcn/ui**, siendo componentes accesibles, personalizables y que viven en tu código (no en node_modules).

**Ejemplos**: Button, Dialog, Input, Select, Toast, Tabs, Popover, etc.

**Características**:

- Totalmente accesibles (ARIA)
- Personalizables con Tailwind
- Tipado con TypeScript
- No tienen lógica de negocio

#### **`components/layout/`**

Componentes estructurales que definen el layout general de la aplicación.

**Archivos**:

- **`navbar.tsx`** - Barra de navegación superior con usuario, notificaciones
- **`sidebar.tsx`** - Menú lateral con navegación entre módulos

**Stack usado**:

- Radix UI para dropdowns y menús
- Lucide React para iconos
- Zustand para estado del sidebar (colapsado/expandido)

#### **`components/common/`**

Componentes compartidos que tienen lógica específica pero se usan en múltiples lugares.

**Archivos**:

- **`daily-summary-modal.tsx`** - Modal que muestra el resumen del día
- **`loading.tsx`** - Componente de carga global

**Stack usado**:

- Radix UI Dialog para modales
- React Query para fetching de datos
- date-fns para formateo de fechas

---

### **`src/pages/`** - Páginas del Sistema

Cada página representa una vista completa de la aplicación. Organizadas por módulo.

#### **`dashboard-page.tsx`**

Página principal con métricas del negocio.

**Funcionalidad**:

- Resumen diario (ocupación, ingresos, reservas)
- Gráficos de ocupación
- Accesos rápidos

**Stack**:

- React Query (`useDashboard`) para datos
- Componentes de gráficos (Chart.js o Recharts)
- Componentes UI para cards y métricas

#### **`reservas/reservations-page.tsx`**

Gestión completa de reservas.

**Funcionalidad**:

- Tabla de reservas con filtros
- Crear/editar/cancelar reservas
- Cambio de estados (pendiente → confirmada → completada)
- Registro de pagos (seña/saldo)

**Stack**:

- React Query hooks (`useReservas`, `useCreateReserva`)
- React Hook Form + Zod para formularios
- React Day Picker para fechas
- Radix UI Dialog para modales

#### **`clientes/clients-page.tsx`**

Administración de clientes.

**Funcionalidad**:

- CRUD completo de clientes
- Búsqueda por DNI
- Historial de reservas por cliente

**Stack**:

- Custom hooks (`useClientes`, `useClienteByDni`)
- Formularios con validación Zod
- Tabla con paginación

#### **`cabanas/cabins-page.tsx`**

Gestión de cabañas y características.

**Funcionalidad**:

- CRUD de cabañas
- Asignación de características (piscina, parrilla, WiFi)
- Activar/desactivar disponibilidad
- Vista de grid con imágenes

**Stack**:

- Zustand store (`cabanasStore`)
- React Query mutations
- Upload de imágenes

#### **`tarifas/rates-page.tsx`**

Configuración de precios.

**Funcionalidad**:

- Grupos de precios (Temporada Alta, Baja, Fin de Semana)
- Rangos de fechas con precios específicos
- Cálculo automático de precios en reservas

**Stack**:

- React Query para gestión de grupos y rangos
- date-fns para validación de fechas
- Radix UI Tabs para organizar UI

#### **`calendario/calendar-page.tsx`**

Vista de calendario con reservas.

**Funcionalidad**:

- Visualización mensual/semanal
- Drag and drop de reservas
- Filtrado por cabaña
- Estados visuales (confirmada, pendiente, completada)

**Stack**:

- React Big Calendar o FullCalendar
- React Query (`useCalendarioEventos`)
- date-fns para manipulación

#### **`reportes/reports-page.tsx`**

Reportes y estadísticas.

**Funcionalidad**:

- Reporte de ocupación por período
- Análisis de ingresos
- Exportación a PDF/Excel
- Gráficos comparativos

**Stack**:

- React Query para datos
- Chart.js o Recharts para gráficos
- jsPDF o Excel.js para exportación

---

### **`src/features/`** - Lógica de Negocio por Dominio

Componentes específicos de cada módulo que no son genéricos. Siguen el patrón **Feature-Sliced Design**.

#### **`features/reservas/`**

**Componentes**:

- `reservation-form.tsx` - Formulario completo de reserva
- `reservation-status-badge.tsx` - Badge de estado
- `payment-form.tsx` - Formulario de pagos
- `availability-checker.tsx` - Verificador de disponibilidad

**Stack**:

- React Hook Form con validación Zod
- Custom hooks (`useCreateReserva`, `useCheckDisponibilidad`)
- Integración con stores de Zustand

#### **`features/clientes/`**

**Componentes**:

- `client-form.tsx` - Formulario de cliente
- `client-history-table.tsx` - Tabla de historial
- `dni-search.tsx` - Buscador por DNI

#### **`features/cabanas/`**

**Componentes**:

- `cabin-form.tsx` - Formulario de cabaña
- `cabin-card.tsx` - Card con info de cabaña
- `characteristic-selector.tsx` - Selector de características
- `image-uploader.tsx` - Subida de imágenes

#### **`features/tarifas/`**

**Componentes**:

- `price-group-form.tsx` - Formulario de grupo
- `price-range-form.tsx` - Formulario de rango
- `price-calculator.tsx` - Calculadora de precios

**Índice de Exportación**:
Cada módulo tiene un `index.ts` que exporta todos sus componentes para importaciones limpias:

```typescript
export * from "./reservation-form";
export * from "./payment-form";
```

---

### **`src/hooks/`** - Custom Hooks

Hooks personalizados que encapsulan lógica de **React Query** y **Zustand**.

#### **`use-clientes.ts`**

```typescript
// Queries
useClientes(filters); // GET lista con filtros
useCliente(id); // GET por ID
useClienteByDni(dni); // GET por DNI
useClienteHistory(id); // GET historial

// Mutations
useCreateCliente(); // POST crear
useUpdateCliente(); // PUT actualizar
useDeleteCliente(); // DELETE eliminar
```

**Stack**:

- TanStack React Query (`useQuery`, `useMutation`)
- Invalidación automática de cache
- Optimistic updates

#### **`use-reservas.ts`**

```typescript
useReservas(filters);
useReserva(id);
useCheckDisponibilidad();
useCalcularPrecio();
useCreateReserva();
useUpdateReserva();
useUpdateEstadoReserva();
useCancelReserva();
useRegistrarPago();
```

**Características**:

- Gestión de estados de carga/error
- Refetch automático
- Integración con Zustand store

#### **`use-cabanas.ts`**

```typescript
useCabanas();
useCabana(id);
useCaracteristicas();
useCreateCabana();
useUpdateCabana();
useDeleteCabana();
useToggleEstadoCabana();
```

#### **`use-dashboard.ts`**

```typescript
useCalendarioEventos(inicio, fin);
useResumenDiario();
useReporteOcupacion(filtros);
useReporteReservas(filtros);
useHistorialPorDni(dni);
```

**Patrón común**:

```typescript
export const useClientes = (filters?: ClienteFilters) => {
  return useQuery({
    queryKey: ["clientes", filters],
    queryFn: () => clientesService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
```

---

### **`src/services/`** - Capa de API

Servicios que se comunican con el backend. Definen el **contrato Frontend-Backend**.

#### **`api.ts`**

Configuración base de Axios con interceptores.

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token y tenant-id
api.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  const tenantId = authStore.getState().user?.tenantId || "1";

  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["X-Tenant-ID"] = tenantId;

  return config;
});
```

#### **`clientes.service.ts`**

```typescript
export const clientesService = {
  getAll: (filters?: ClienteFilters) =>
    api.get("/clientes", { params: filters }),

  getById: (id: number) => api.get(`/clientes/${id}`),

  getByDni: (dni: string) => api.get(`/clientes/buscar-dni?dni=${dni}`),

  create: (data: CreateClienteDto) => api.post("/clientes", data),

  update: (id: number, data: UpdateClienteDto) =>
    api.put(`/clientes/${id}`, data),

  delete: (id: number) => api.delete(`/clientes/${id}`),
};
```

#### **`reservas.service.ts`**

Similar a clientes pero con endpoints adicionales:

- Verificar disponibilidad
- Calcular precio
- Registrar pagos
- Cambiar estados

#### **Otros servicios**:

- `cabanas.service.ts`
- `tarifas.service.ts`
- `dashboard.service.ts`

**Stack**:

- Axios para HTTP requests
- TypeScript para tipado fuerte
- Variables de entorno para URLs

---

### **`src/store/`** - Estado Global con Zustand

Stores para estado global que no está relacionado con datos del servidor.

#### **`auth.store.ts`**

```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  login: async (credentials) => {
    /* ... */
  },
  logout: () => {
    /* ... */
  },
}));
```

#### **`reservas.store.ts`**

Estado temporal para flujo de creación de reserva:

```typescript
interface ReservasStore {
  tempReserva: Partial<Reserva>;
  setTempReserva: (data) => void;
  clearTempReserva: () => void;
}
```

#### **`cabanas.store.ts`**

Filtros y selección de cabañas:

```typescript
interface CabanasStore {
  selectedCabana: Cabana | null;
  filters: CabanaFilters;
  setSelectedCabana: (cabana) => void;
  updateFilters: (filters) => void;
}
```

#### **`ui.store.ts`**

Estado de la interfaz:

```typescript
interface UIStore {
  sidebarOpen: boolean;
  currentModal: string | null;
  toggleSidebar: () => void;
  openModal: (name) => void;
  closeModal: () => void;
}
```

**¿Por qué Zustand y no solo React Query?**

- **React Query**: Datos del servidor (cache, sincronización)
- **Zustand**: Estado local de UI, formularios temporales, preferencias

---

### **`src/types/`** - Tipos TypeScript

Definiciones de tipos compartidas en toda la aplicación.

#### **`index.ts`**

```typescript
// Entidades principales
export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  direccion?: string;
  createdAt: string;
}

export interface Reserva {
  id: number;
  clienteId: number;
  cabanaId: number;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoReserva;
  precioTotal: number;
  montoSena: number;
  montoSaldo: number;
  observaciones?: string;
}

export type EstadoReserva =
  | "pendiente"
  | "confirmada"
  | "completada"
  | "cancelada";

export interface Cabana {
  id: number;
  nombre: string;
  descripcion: string;
  capacidad: number;
  activa: boolean;
  caracteristicas: Caracteristica[];
  imagenes: string[];
}

// DTOs para crear/actualizar
export type CreateClienteDto = Omit<Cliente, "id" | "createdAt">;
export type UpdateClienteDto = Partial<CreateClienteDto>;

// Tipos de filtros
export interface ClienteFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ReservaFilters {
  estado?: EstadoReserva;
  cabanaId?: number;
  fechaInicio?: string;
  fechaFin?: string;
}
```

**Beneficios**:

- Autocomplete en todo el código
- Detección temprana de errores
- Refactorización segura
- Contrato claro con el backend

---

### **`src/lib/`** - Utilidades y Configuraciones

#### **`utils.ts`**

Funciones helper reutilizables:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combinar clases de Tailwind sin conflictos
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatear moneda
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount);
}

// Formatear fecha
export function formatDate(date: string | Date) {
  return format(new Date(date), "dd/MM/yyyy", { locale: es });
}
```

#### **`providers.tsx`**

Configuración de providers globales:

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

### **`src/layouts/`** - Layouts de Página

#### **`main-layout.tsx`**

Layout principal que envuelve todas las páginas:

```typescript
export function MainLayout() {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className={cn(
          "flex-1 flex flex-col transition-all",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet /> {/* React Router outlet */}
        </main>
      </div>
    </div>
  );
}
```

**Características**:

- Sidebar colapsable
- Navbar fijo
- Área de contenido scrolleable
- Integración con React Router

---

### **`src/App.tsx`** - Configuración de Rutas

```typescript
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reservas" element={<ReservationsPage />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/cabanas" element={<CabinsPage />} />
          <Route path="/tarifas" element={<RatesPage />} />
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/reportes" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

### **`src/main.tsx`** - Entry Point

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Providers } from "./lib/providers";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
```

---

## 🔄 Flujo de Datos Completo

### **Ejemplo: Crear una Reserva**

1. **Usuario** llena el formulario en `ReservationForm` (features/reservas)
2. **React Hook Form** valida con schema **Zod**
3. Al submit, se llama a `useCreateReserva()` hook
4. Hook ejecuta mutation de **React Query**
5. Mutation llama a `reservasService.create()` (services)
6. Service hace POST con **Axios** al backend
7. Interceptor de Axios agrega token y tenant-id
8. Backend responde con la reserva creada
9. React Query invalida cache de `['reservas']`
10. Componentes que usan `useReservas()` se actualizan automáticamente
11. Se muestra **Toast** de éxito (Radix UI Toast)
12. Se cierra el **Dialog** (Radix UI Dialog)

---

## 🎨 Sistema de Diseño

### **Paleta de Colores (Tailwind)**

```javascript
// tailwind.config.js
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    900: '#0c4a6e',
  },
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
}
```

### **Componentes Base**

Todos los componentes UI usan **Radix UI** como primitiva y **Tailwind** para estilos:

```typescript
// components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600",
        outline: "border border-gray-300 hover:bg-gray-50",
        ghost: "hover:bg-gray-100",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-11 px-8",
      },
    },
  }
);
```

---

## 🔐 Autenticación y Seguridad

### **Flow de Autenticación**

1. Login en `/login` → Backend retorna JWT
2. Token se guarda en `authStore` y `localStorage`
3. Interceptor de Axios agrega token en todas las requests
4. Rutas protegidas verifican `isAuthenticated`

### **Multi-tenant**

- Cada request incluye header `X-Tenant-ID`
- Backend filtra datos por tenant automáticamente
- Preparado para SaaS multi-empresa

---

## 🚀 Mejores Prácticas Implementadas

1. **Separación de Responsabilidades**

   - Pages: UI y composición
   - Features: Lógica de negocio
   - Hooks: Data fetching
   - Services: API calls
   - Stores: Estado global

2. **TypeScript en Todo**

   - Tipos fuertes en toda la app
   - DTOs para comunicación con backend
   - Props tipadas en componentes

3. **Performance**

   - React Query cache
   - Lazy loading de rutas
   - Memoización con `useMemo`/`useCallback`

4. **Accesibilidad**

   - Radix UI (ARIA compliant)
   - Navegación por teclado
   - Screen reader friendly

5. **DX (Developer Experience)**
   - Hot reload con Vite
   - ESLint configurado
   - React Query DevTools
   - Imports limpios con barrel exports

---

## 📦 Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🌐 Variables de Entorno

```env
# .env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Sistema de Gestión de Cabañas
VITE_TENANT_ID=1
```

**Acceso en código**:

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## 🧪 Testing (Pendiente)

**Stack recomendado**:

- **Vitest** - Test runner
- **Testing Library** - Testing de componentes
- **MSW** - Mock Service Worker para API
- **Playwright** - Tests E2E

---

## 📈 Próximos Pasos

1. ✅ Estructura base completa
2. ✅ Stack tecnológico configurado
3. ⏳ Implementar todos los componentes UI
4. ⏳ Desarrollar formularios completos
5. ⏳ Integrar calendario interactivo
6. ⏳ Conectar con backend real
7. ⏳ Implementar autenticación JWT
8. ⏳ Testing unitario y E2E
9. ⏳ Optimización de performance
10. ⏳ Documentación de componentes

---

Esta estructura está diseñada para **escalar**, ser **mantenible** y seguir las mejores prácticas de la industria. El stack elegido es moderno, tiene gran soporte de la comunidad y permite un desarrollo rápido sin sacrificar calidad.
