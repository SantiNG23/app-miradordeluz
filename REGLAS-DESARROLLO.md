# 📋 Explicación de Reglas de Desarrollo Frontend

Este documento explica el **por qué** detrás de cada regla establecida en `.cursorrules` para el proyecto de gestión hotelera.

---

## 📂 Organización de Archivos

### Por qué kebab-case para archivos

**Razón**: Compatibilidad multiplataforma y estándar web.

- Los sistemas de archivos case-insensitive (Windows, macOS) pueden causar problemas con PascalCase
- URLs amigables y consistentes
- Estándar en proyectos modernos de React (Next.js, Remix, etc.)
- Evita conflictos en git con archivos que solo difieren en capitalización

### Por qué separar por dominio (pages, features, hooks)

**Razón**: Escalabilidad y mantenibilidad del código.

- **Cohesión**: Código relacionado está junto
- **Acoplamiento bajo**: Cambios en un módulo no afectan otros
- **Fácil localización**: Saber dónde está cada cosa sin buscar
- **Trabajo en equipo**: Múltiples devs pueden trabajar en paralelo sin conflictos
- **Eliminación segura**: Borrar una feature completa sin dejar código huérfano

---

## 🧩 Componentes React

### Por qué componentes funcionales con arrow functions

**Razón**: Estándar moderno y beneficios técnicos.

```typescript
// ✅ Preferido
export const Component: React.FC<Props> = ({ prop }) => {
  return <div>{prop}</div>;
};

// ❌ Evitar
function Component({ prop }: Props) {
  return <div>{prop}</div>;
}
```

**Beneficios**:

- Consistencia con hooks (arrow functions)
- Hoisting controlado (no puede usarse antes de definirse → menos bugs)
- Menos verboso
- Mejor integración con TypeScript

### Por qué limitar componentes a 300 líneas

**Razón**: Principio de Responsabilidad Única (SOLID).

- Componentes grandes = difícil testear, entender y mantener
- Señal de que hace demasiadas cosas
- Facilita code review
- Mejor reutilización al dividir

**Solución**: Extraer a sub-componentes o custom hooks

### Por qué evitar prop drilling > 2 niveles

**Razón**: Acoplamiento y fragilidad.

```typescript
// ❌ Prop drilling profundo
<Parent user={user}>
  <Child user={user}>
    <GrandChild user={user}>
      <GreatGrandChild user={user} /> {/* 4 niveles */}
    </GrandChild>
  </Child>
</Parent>;

// ✅ Con Context o Zustand
const user = useAuthStore((s) => s.user);
```

**Problemas del prop drilling**:

- Componentes intermedios dependen de props que no usan
- Dificulta refactoring
- Propagación de cambios compleja

---

## 🎨 Estilos con Tailwind CSS

### Por qué usar `cn()` para clases dinámicas

**Razón**: Evitar conflictos de clases CSS.

```typescript
// ❌ Sin cn() - puede causar conflictos
<div className={`bg-red-500 ${active && 'bg-blue-500'}`}>
  // Ambas clases bg- están presentes, orden impredecible
</div>

// ✅ Con cn() - tailwind-merge resuelve conflictos
<div className={cn('bg-red-500', active && 'bg-blue-500')}>
  // Solo bg-blue-500 si active es true
</div>
```

### Por qué mobile-first

**Razón**: Mejor performance y UX en dispositivos móviles.

- La mayoría del tráfico web es móvil
- Progressive enhancement > graceful degradation
- CSS más simple (menos overrides)
- Detectar limitaciones desde el inicio del diseño

### Por qué ordenar clases Tailwind

**Razón**: Legibilidad y mantenibilidad.

```typescript
// ✅ Ordenado: fácil de escanear visualmente
<div className="flex flex-col gap-4 p-6 w-full bg-card text-sm rounded-lg shadow-md md:flex-row">

// ❌ Desordenado: difícil de modificar
<div className="shadow-md w-full flex rounded-lg text-sm bg-card p-6 flex-col gap-4 md:flex-row">
```

**Orden sugerido**:

1. Layout (flex, grid)
2. Spacing (p-, m-, gap-)
3. Sizing (w-, h-, max-w-)
4. Colors (bg-, text-, border-)
5. Typography (text-, font-)
6. Effects (rounded-, shadow-)
7. Responsive (md:, lg:)

---

## 📡 Gestión de Estado

### Por qué Zustand para UI y React Query para datos

**Razón**: Separación de responsabilidades.

**Zustand** → Estado local/UI:

- Sidebar abierto/cerrado
- Modal activo
- Tema oscuro/claro
- Preferencias del usuario

**React Query** → Estado del servidor:

- Listas de clientes, reservas
- Datos en tiempo real
- Cache automática
- Sincronización con backend

**Problemas de mezclar**:

- Duplicación de estado
- Cache invalidation manual
- Sincronización compleja
- Re-renders innecesarios

### Por qué usar selectores en Zustand

**Razón**: Optimización de renders.

```typescript
// ❌ Re-render cuando CUALQUIER parte del store cambia
const store = useUIStore();
console.log(store.isSidebarOpen);

// ✅ Re-render SOLO cuando isSidebarOpen cambia
const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
```

### Por qué invalidar queries después de mutaciones

**Razón**: Mantener datos sincronizados con el servidor.

```typescript
export const useCreateCliente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientesService.create,
    onSuccess: () => {
      // Sin esto, la lista de clientes no se actualizaría
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
};
```

---

## 📝 Formularios

### Por qué React Hook Form + Zod

**Razón**: Mejor DX y performance.

**React Hook Form**:

- Re-renders mínimos (uncontrolled components)
- API simple con `register`
- Integración con validación externa

**Zod**:

- Type-safe (infiere TypeScript)
- Mensajes de error personalizables
- Schemas reutilizables
- Validación asíncrona (DNI único, email disponible)

**Alternativas descartadas**:

- Formik → más pesado, más re-renders
- Yup → no infiere tipos TypeScript automáticamente

### Por qué deshabilitar submit durante isSubmitting

**Razón**: Evitar doble submit.

```typescript
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Guardando..." : "Guardar"}
</Button>
```

**Sin esto**:

- Usuario hace clic múltiple
- Múltiples requests al servidor
- Datos duplicados en BD
- Mala UX (confusión)

---

## 🔗 Servicios API

### Por qué NO manejar errores en services

**Razón**: Separación de responsabilidades.

```typescript
// ✅ Service lanza el error
export const clientesService = {
  create: async (cliente: CreateClienteDTO) => {
    const { data } = await apiClient.post("/clientes", cliente);
    return data; // Axios lanza error automáticamente si falla
  },
};

// ✅ React Query maneja el error
export const useCreateCliente = () => {
  return useMutation({
    mutationFn: clientesService.create,
    onError: (error) => {
      toast.error(error.message); // UX decidida aquí
    },
  });
};
```

**Beneficios**:

- Services son funciones puras, fácil de testear
- Lógica de UI (toasts) separada de lógica de red
- Reutilización: mismo service, diferentes handlers de error

### Por qué tipar requests y responses

**Razón**: Type safety end-to-end.

```typescript
// ✅ Tipado completo
const { data } = await apiClient.get<Cliente[]>("/clientes");
// data es Cliente[], TypeScript detecta errores

// ❌ Sin tipar
const { data } = await apiClient.get("/clientes");
// data es any, sin autocompletado ni validación
```

---

## 🛡️ TypeScript

### Por qué NO usar `any`

**Razón**: `any` desactiva TypeScript completamente.

```typescript
// ❌ any = sin validación
const data: any = fetchData();
data.nombre.toUpperCase(); // Compila pero puede romper en runtime

// ✅ unknown + type guard
const data: unknown = fetchData();
if (typeof data === "object" && data !== null && "nombre" in data) {
  const nombre = (data as { nombre: string }).nombre;
  nombre.toUpperCase(); // Seguro
}

// ✅✅ Mejor: tipar el retorno
const data: Cliente = fetchData();
data.nombre.toUpperCase(); // Type-safe
```

### Por qué type vs interface

**Razón**: Semántica y capacidades.

```typescript
// ✅ type para unions y mapped types
type Status = "pending" | "confirmed" | "cancelled";
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// ✅ interface para objetos extendibles
interface Cliente {
  id: string;
  nombre: string;
}

interface ClienteVIP extends Cliente {
  nivel: "gold" | "platinum";
}
```

**Diferencias**:

- `interface` puede extenderse (OOP)
- `type` puede hacer unions, mapped types
- `interface` tiene mejor performance en errores (TS docs)

---

## 🚨 Manejo de Errores

### Por qué toasts para errores críticos

**Razón**: Feedback inmediato sin bloquear la UI.

```typescript
// ✅ Toast no intrusivo
toast.error("Error al guardar cliente");
// Usuario puede seguir trabajando

// ❌ Alert bloquea todo
alert("Error al guardar cliente");
// Usuario debe cerrar el modal para continuar
```

### Por qué inline errors en formularios

**Razón**: Context inmediato del error.

```typescript
<Input {...register("email")} />;
{
  errors.email && (
    <p className="text-sm text-destructive">{errors.email.message}</p>
  );
}
```

**Beneficios**:

- Usuario sabe QUÉ campo está mal
- No necesita recordar el error
- Puede corregir sin perder contexto

### Por qué Error Boundaries

**Razón**: Evitar que la app completa colapse.

```typescript
// Sin Error Boundary: error en un componente → pantalla blanca

// Con Error Boundary: error en un componente → UI de fallback
<ErrorBoundary fallback={<ErrorView />}>
  <ComponenteThatMightFail />
</ErrorBoundary>
```

---

## ⚡ Performance

### Por qué React.memo()

**Razón**: Evitar re-renders costosos.

```typescript
// Sin memo: re-render cada vez que Parent cambia
const ExpensiveList = ({ items }) => {
  return items.map((item) => <HeavyComponent key={item.id} data={item} />);
};

// Con memo: re-render SOLO si items cambia
export const ExpensiveList = React.memo(({ items }) => {
  return items.map((item) => <HeavyComponent key={item.id} data={item} />);
});
```

**Cuándo usar**:

- Componentes que renderizan listas largas
- Componentes con cálculos pesados
- Componentes que reciben props que cambian raramente

**Cuándo NO usar**:

- Componentes simples (overhead > beneficio)
- Props que siempre cambian

### Por qué debounce en búsquedas

**Razón**: Reducir requests innecesarias.

```typescript
// Sin debounce: 10 caracteres = 10 requests
onChange={(e) => setSearch(e.target.value)}

// Con debounce: 10 caracteres = 1 request (después de 300ms)
onChange={(e) => debouncedSearch(e.target.value)}
```

**Beneficios**:

- Menos carga al servidor
- Mejor UX (menos flashing de resultados)
- Menos consumo de API quota

### Por qué lazy loading de rutas

**Razón**: Initial bundle más pequeño.

```typescript
// ❌ Todo el código en el bundle inicial
import ReservationsPage from "./pages/reservations-page";

// ✅ Solo se carga cuando se visita la ruta
const ReservationsPage = React.lazy(() => import("./pages/reservations-page"));

<Suspense fallback={<Loading />}>
  <ReservationsPage />
</Suspense>;
```

**Impacto**:

- Bundle inicial: 500kb → 200kb
- Time to interactive más rápido
- Mejor Core Web Vitals (SEO)

---

## ♿ Accesibilidad

### Por qué Radix UI

**Razón**: Accesibilidad out-of-the-box.

**Incluye**:

- ARIA roles correctos
- Focus management (Tab, Shift+Tab)
- Keyboard shortcuts (Esc para cerrar modales)
- Screen reader support
- Compliance WCAG 2.1 AA

**Sin Radix**: Implementar todo esto manualmente (error-prone)

### Por qué asociar Label con Input

**Razón**: Usabilidad y accesibilidad.

```typescript
// ✅ Correcto
<Label htmlFor="email">Email</Label>
<Input id="email" />
// Clic en label = focus en input (área clickeable más grande)

// ❌ Incorrecto
<span>Email</span>
<Input />
// Screen readers no saben qué es el input
```

---

## 📦 Imports y Exports

### Por qué alias `@/`

**Razón**: Refactoring y legibilidad.

```typescript
// ❌ Imports relativos frágiles
import { Button } from "../../../components/ui/button";
// Si mueves el archivo, se rompen todos los imports

// ✅ Alias absoluto
import { Button } from "@/components/ui/button";
// Funciona desde cualquier ubicación
```

### Por qué agrupar imports

**Razón**: Legibilidad y estándar de la comunidad.

```typescript
// ✅ Agrupados
import { useState } from "react"; // React
import { useQuery } from "@tanstack/..."; // Librerías
import { Button } from "@/components/..."; // Componentes
import { useClientes } from "@/hooks/..."; // Hooks
import type { Cliente } from "@/types"; // Tipos

// ❌ Mezclados (difícil de escanear)
import type { Cliente } from "@/types";
import { useState } from "react";
import { Button } from "@/components/...";
import { useQuery } from "@tanstack/...";
```

### Por qué barrel exports

**Razón**: Imports más limpios.

```typescript
// Sin barrel: múltiples imports
import { ClientForm } from "@/features/clientes/client-form";
import { ClientList } from "@/features/clientes/client-list";
import { ClientCard } from "@/features/clientes/client-card";

// Con barrel (features/clientes/index.ts):
export * from "./client-form";
export * from "./client-list";
export * from "./client-card";

// Resultado: un solo import
import { ClientForm, ClientList, ClientCard } from "@/features/clientes";
```

---

## 🔐 Seguridad

### Por qué NO localStorage para tokens

**Razón**: Vulnerable a XSS.

```typescript
// ❌ Vulnerable
localStorage.setItem("token", token);
// Cualquier script puede leer: console.log(localStorage.getItem('token'))

// ✅ Seguro
// Backend envía httpOnly cookie
// Frontend nunca accede al token directamente
// XSS no puede robar la cookie
```

### Por qué validar en frontend Y backend

**Razón**: Defensa en profundidad.

**Frontend**: Validación de UX (feedback rápido)  
**Backend**: Validación de seguridad (no se puede saltear)

```typescript
// Frontend: Zod schema
const clienteSchema = z.object({
  dni: z.string().regex(/^\d{7,8}$/),
});

// Backend también valida DNI
// ¿Por qué? Usuario puede manipular la request con DevTools
```

---

## 📱 Responsive Design

### Por qué mobile-first (repaso)

**Razón**: Estadísticas de uso.

- 60%+ del tráfico es móvil
- Conexiones más lentas (3G/4G vs WiFi)
- Pantallas más pequeñas = priorizar contenido

**Estrategia**:

1. Diseñar para mobile
2. Agregar features para desktop (más espacio, mouse)
3. No al revés (esconder features en mobile es mala UX)

### Por qué sidebar colapsable

**Razón**: Aprovechar espacio limitado.

- Mobile: pantalla completa para contenido
- Desktop: sidebar visible permanentemente

```typescript
// Zustand store
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// Mobile: overlay temporal
// Desktop: permanente a la izquierda
```

---

## 📖 Comentarios y Documentación

### Por qué evitar comentarios obvios

**Razón**: Ruido innecesario.

```typescript
// ❌ Comentario obvio
// Incrementa el contador
setCount(count + 1);

// ❌ Redundante
// Cliente interface
interface Cliente { ... }

// ✅ Útil
// Usamos setTimeout porque el evento onBlur puede cancelarse
// si el usuario hace clic fuera rápidamente
setTimeout(() => validateField(), 0);
```

### Por qué JSDoc para funciones públicas

**Razón**: IntelliSense y documentación inline.

```typescript
/**
 * Calcula el precio total de una reserva
 * @param fechaInicio - Fecha de check-in
 * @param fechaFin - Fecha de check-out
 * @returns Precio total en ARS
 * @throws {Error} Si las fechas son inválidas
 */
export const calculatePrice = (fechaInicio: Date, fechaFin: Date): number => {
  // Al hacer hover en VSCode, aparece esta documentación
};
```

---

## 🚀 Build y Deploy

### Por qué lint antes de commit

**Razón**: Detectar errores temprano.

```bash
npm run lint
# Detecta:
# - Variables no usadas
# - Imports faltantes
# - Reglas ESLint violadas
# - Tipos incorrectos
```

**Mejor**: Git hooks con Husky (lint automático pre-commit)

### Por qué NO commitear console.logs

**Razón**: Profesionalismo y limpieza.

```typescript
// ❌ En producción
console.log("Usuario:", user); // Expone datos en DevTools

// ✅ Solo en desarrollo
if (import.meta.env.DEV) {
  console.log("Usuario:", user);
}

// ✅✅ Mejor: usar logger con niveles
logger.debug("Usuario:", user); // Solo en dev
logger.error("Error crítico:", error); // Siempre
```

---

## 🎯 Prioridades de Desarrollo

### Por qué este orden

1. **Funcionalidad** → Sin esto, no hay producto
2. **Tipos** → Detecta bugs en compilación, no en runtime
3. **UX** → Usuario debe saber qué pasa (loading, errors)
4. **Performance** → Solo optimizar si hay problema real (medir primero)
5. **Refactoring** → Código limpio vs feature nueva (balance)

**Evitar**:

- Optimización prematura (performance sin medir)
- Refactoring sin valor (cambiar por cambiar)
- Over-engineering (YAGNI - You Ain't Gonna Need It)

---

## 🔄 Multi-Tenant

### Por qué preparar multi-tenant desde el inicio

**Razón**: Escalabilidad futura y buena arquitectura.

**MVP**: Single tenant (tenantId: 1)  
**Futuro**: Multi-tenant SaaS (múltiples hoteles)

**Beneficios ahora**:

- Código más organizado (interceptor centralizado)
- Fácil testear con diferentes tenants
- Migración a multi-tenant sin reescribir

```typescript
// Interceptor en api.ts
apiClient.interceptors.request.use((config) => {
  config.headers["X-Tenant-ID"] = authStore.getState().user?.tenantId || "1";
  return config;
});

// Cuando escalemos: solo cambiar la lógica de obtener tenantId
// No tocar servicios, hooks, componentes
```

---

## 📊 Resumen de Beneficios

| Regla                      | Beneficio Principal               |
| -------------------------- | --------------------------------- |
| TypeScript estricto        | Detectar bugs en compilación      |
| React Query                | Cache automática y sincronización |
| Zod + RHF                  | Validación type-safe              |
| Tailwind ordenado          | Legibilidad y mantenibilidad      |
| Componentes < 300 líneas   | Responsabilidad única             |
| Lazy loading               | Performance inicial               |
| Radix UI                   | Accesibilidad out-of-the-box      |
| Barrel exports             | Imports limpios                   |
| Mobile-first               | UX en dispositivos mayoritarios   |
| Separación UI/Server state | Sincronización automática         |

---

## 🔗 Referencias y Recursos

- [React Docs (Beta)](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

**Última actualización**: Diciembre 2025  
**Versión del stack**: React 18.3.1, TypeScript 5.3.3, Vite 5.1.0
