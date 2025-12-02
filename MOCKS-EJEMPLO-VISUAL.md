# 🎨 Ejemplo Visual: Sistema Completo con Mocks

## 📊 Vista General de la Integración

### 1️⃣ Configuración Inicial

```env
# .env
VITE_USE_MOCKS=true  # 🟢 Mocks habilitados
```

### 2️⃣ Service Layer (con Mock Support)

```typescript
// src/services/clientes.service.ts
import { apiClient } from "./api";
import { MOCK_CLIENTES, isMockEnabled, mockDelay } from "@/mocks";
import type { Cliente } from "@/types";

export const clientesService = {
  getAll: async () => {
    // ✅ Durante desarrollo → Retorna datos mock
    if (isMockEnabled("clientes")) {
      await mockDelay(); // Simula 200-800ms
      return MOCK_CLIENTES;
    }

    // 🔄 Cuando backend esté listo → Retorna datos reales
    const { data } = await apiClient.get<Cliente[]>("/clientes");
    return data;
  },
};
```

### 3️⃣ Custom Hook (React Query)

```typescript
// src/hooks/use-clientes.ts
import { useQuery } from "@tanstack/react-query";
import { clientesService } from "@/services/clientes.service";

export const useClientes = () => {
  return useQuery({
    queryKey: ["clientes", "list"],
    queryFn: clientesService.getAll,
    staleTime: 5 * 60 * 1000,
  });
};
```

### 4️⃣ Componente (No sabe de mocks)

```typescript
// src/pages/clientes/clients-page.tsx
import { useClientes } from "@/hooks/use-clientes";

export const ClientsPage = () => {
  const { data: clientes, isLoading, error } = useClientes();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>Clientes</h1>
      {clientes.map((cliente) => (
        <ClientCard key={cliente.id} cliente={cliente} />
      ))}
    </div>
  );
};
```

---

## 🔄 Flujo Completo de una Request

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Usuario abre página de clientes                           │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. Componente: useClientes()                                 │
│    Estado: isLoading = true                                  │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. Hook: useQuery(['clientes'], clientesService.getAll)      │
│    React Query verifica cache                                │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. Service: clientesService.getAll()                         │
│    Verifica: isMockEnabled('clientes') → true               │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. Mock: await mockDelay()                                   │
│    Simula latencia: 500ms                                    │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ 6. Mock: return MOCK_CLIENTES                                │
│    10 clientes de prueba                                     │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ 7. React Query: Actualiza cache                              │
│    data = MOCK_CLIENTES, isLoading = false                   │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ 8. Componente: Re-render con datos                           │
│    Muestra lista de 10 clientes                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Escenarios de Uso

### ✅ Escenario 1: Desarrollo Frontend (Backend NO listo)

```typescript
// .env
VITE_USE_MOCKS=true

// src/mocks/config.ts
modules: {
  clientes: true,    // ✅ Usar mocks
  reservas: true,    // ✅ Usar mocks
  cabanas: true,     // ✅ Usar mocks
}

// Resultado:
// ✅ Frontend puede desarrollarse completamente
// ✅ Datos realistas y coherentes
// ✅ Sin esperar al backend
```

### 🔄 Escenario 2: Backend Parcialmente Listo

```typescript
// .env
VITE_USE_MOCKS=true

// src/mocks/config.ts
modules: {
  clientes: false,   // ✅ Backend listo → API real
  reservas: true,    // ⏳ Backend no listo → Mocks
  cabanas: true,     // ⏳ Backend no listo → Mocks
}

// Resultado:
// ✅ Clientes usa API real
// ✅ Reservas y Cabañas usan mocks
// ✅ Desarrollo continúa sin bloqueos
```

### 🚀 Escenario 3: Producción (Todo listo)

```typescript
// .env.production
VITE_USE_MOCKS = false;

// Resultado:
// ✅ Todo usa API real
// ✅ Mocks deshabilitados globalmente
// ✅ Sin cambios en el código
```

---

## 📝 Ejemplo: CRUD Completo con Mocks

### Datos Mock Iniciales

```typescript
// src/mocks/data/clientes.ts
export const MOCK_CLIENTES: Cliente[] = [
  {
    id: "cli_001",
    nombre: "Juan Pérez",
    dni: "38456789",
    edad: 35,
    localidad: "Buenos Aires",
    telefono: "11-4567-8901",
    email: "juan.perez@email.com",
    tenantId: "1",
    createdAt: "2024-10-03T10:00:00.000Z",
    updatedAt: "2024-10-03T10:00:00.000Z",
  },
  // ... 9 clientes más
];
```

### Service con CRUD Mock

```typescript
// src/services/clientes.service.ts
import { createMockStorage } from "@/mocks";

const storage = createMockStorage(MOCK_CLIENTES);

export const clientesService = {
  // CREATE
  create: async (data: ClienteFormData) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();
      const nuevo = createMockCliente(data);
      storage.create(nuevo);
      return nuevo;
    }
    // API real...
  },

  // READ
  getAll: async () => {
    if (isMockEnabled("clientes")) {
      await mockDelay();
      return storage.getAll();
    }
    // API real...
  },

  // UPDATE
  update: async (id: string, data: Partial<ClienteFormData>) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();
      const updated = storage.update(id, data);
      if (!updated) throw new Error("Cliente no encontrado");
      return updated;
    }
    // API real...
  },

  // DELETE
  delete: async (id: string) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();
      storage.delete(id);
      return;
    }
    // API real...
  },
};
```

### Componente que usa el CRUD

```typescript
// src/components/client-form.tsx
export const ClientForm = ({ clienteId }: { clienteId?: string }) => {
  const createMutation = useCreateCliente();
  const updateMutation = useUpdateCliente();

  const onSubmit = async (data: ClienteFormData) => {
    if (clienteId) {
      await updateMutation.mutateAsync({ id: clienteId, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
};
```

---

## 🔍 Debugging con Mocks

### React Query DevTools muestra:

```
Queries:
  ['clientes', 'list']
    status: success
    data: [10 clientes mock]
    fetchStatus: idle

Mutations:
  ['clientes', 'create']
    status: success
    data: { id: 'mock_...', nombre: 'Nuevo' }
```

### Console muestra:

```javascript
// Con mockDelay()
[Mock] clientes.getAll() → delay 500ms → 10 items

// Sin mockDelay() (instantáneo, irreal)
[Mock] clientes.getAll() → 10 items
```

---

## 🎨 UI con Loading States (Gracias a mockDelay)

```typescript
// Sin mockDelay → loading instantáneo (0ms)
// Usuario no ve spinner, parece bug

// Con mockDelay → loading realista (200-800ms)
// Usuario ve feedback visual apropiado

const { data, isLoading } = useClientes();

// isLoading: true → 500ms → false
// ✅ Usuario ve <LoadingSpinner />
// ✅ Transición suave a contenido
// ✅ UX realista
```

---

## 📊 Datos Mock Relacionados

### Reserva con Relaciones

```typescript
// src/mocks/data/reservas.ts
{
  id: 'res_001',
  clienteId: 'cli_001',
  cliente: MOCK_CLIENTES[0],      // 👈 Relación
  cabanaId: 'cab_001',
  cabana: MOCK_CABANAS[0],        // 👈 Relación
  fechaCheckIn: generateISODate(3),
  fechaCheckOut: generateISODate(8),
  huespedes: [                    // 👈 Relación 1:N
    { id: 'hue_001', nombre: '...', ... },
    { id: 'hue_002', nombre: '...', ... },
  ],
  pagos: [                        // 👈 Relación 1:N
    { id: 'pag_001', monto: 50000, ... },
  ],
}
```

### Componente que muestra todo

```typescript
const { data: reserva } = useReserva("res_001");

// reserva.cliente.nombre → "Juan Pérez"
// reserva.cabana.nombre → "Cabaña Los Pinos"
// reserva.huespedes.length → 2
// reserva.pagos[0].monto → 50000
```

---

## 💡 Tips para Desarrollo Eficiente

### ✅ Hacer

```typescript
// ✅ Fechas relativas (dinámicas)
fechaCheckIn: generateISODate(3), // En 3 días
  // ✅ Simular latencia
  await mockDelay();

// ✅ Usar storage para persistir cambios
const storage = createMockStorage(MOCK_CLIENTES);
```

### ❌ NO Hacer

```typescript
// ❌ Fechas hardcoded (quedan viejas)
fechaCheckIn: '2025-12-05T00:00:00.000Z',

// ❌ Sin latencia (loading instantáneo = bug aparente)
return MOCK_CLIENTES;

// ❌ Modificar array directamente (mutación)
MOCK_CLIENTES.push(nuevo);
```

---

## 🚦 Checklist: Implementar Mocks en un Módulo

- [ ] Crear datos mock en `src/mocks/data/[modulo].ts`
- [ ] Exportar desde `src/mocks/index.ts`
- [ ] Importar en service: `import { ... } from '@/mocks'`
- [ ] Agregar `if (isMockEnabled('[modulo]')) { ... }`
- [ ] Usar `await mockDelay()` en cada operación mock
- [ ] Usar `generateISODate()` para fechas
- [ ] Testear loading states (gracias a mockDelay)
- [ ] Testear CRUD completo
- [ ] Documentar casos edge cubiertos

---

**Ver también**:

- `MOCKS-GUIA-RAPIDA.md` - Quick start
- `MOCKS-ESTRUCTURA.md` - Documentación completa
- `ESTRUCTURA-PROYECTO-MOCKS.md` - Visión general
