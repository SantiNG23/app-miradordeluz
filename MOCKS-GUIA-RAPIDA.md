# 🚀 Guía Rápida: Datos Mock

## ✅ Pasos para Usar Mocks en un Módulo

### 1. Verificar Configuración

```bash
# .env o .env.local
VITE_USE_MOCKS=true
```

### 2. Importar en el Servicio

```typescript
// src/services/clientes.service.ts
import { MOCK_CLIENTES, isMockEnabled, mockDelay } from "@/mocks";

export const clientesService = {
  getAll: async () => {
    // Verificar si mocks están habilitados
    if (isMockEnabled("clientes")) {
      await mockDelay(); // Simula latencia
      return MOCK_CLIENTES;
    }

    // API real (cuando esté lista)
    const { data } = await apiClient.get("/clientes");
    return data;
  },
};
```

### 3. Usar en Componentes (sin cambios)

```typescript
// src/pages/clientes/clients-page.tsx
const { data: clientes, isLoading } = useClientes();

// Funciona igual con mocks o API real
// No necesita saber de dónde vienen los datos
```

## 📊 Datos Mock Disponibles

| Módulo          | Variable               | Registros | IDs                   |
| --------------- | ---------------------- | --------- | --------------------- |
| Clientes        | `MOCK_CLIENTES`        | 10        | `cli_001` - `cli_010` |
| Cabañas         | `MOCK_CABANAS`         | 5         | `cab_001` - `cab_005` |
| Características | `MOCK_CARACTERISTICAS` | 8         | `car_001` - `car_008` |
| Grupos Precio   | `MOCK_GRUPOS_PRECIOS`  | 4         | `gp_001` - `gp_004`   |
| Reservas        | `MOCK_RESERVAS`        | 7         | `res_001` - `res_007` |

## 🛠️ Helpers Útiles

```typescript
import {
  generateId, // Genera ID único
  generateISODate, // Fecha relativa (días offset)
  filterBySearch, // Filtra arrays
  paginate, // Pagina arrays
  createMockStorage, // Storage en memoria con CRUD
} from "@/mocks";

// Ejemplos
const id = generateId(); // "mock_1701504723456_abc123"
const hoy = generateISODate(0);
const pasado = generateISODate(-7); // Hace 7 días
const futuro = generateISODate(15); // En 15 días

// Storage persistente en sesión
const storage = createMockStorage(MOCK_CLIENTES);
storage.create(nuevoCliente);
storage.getById("cli_001");
storage.update("cli_001", { nombre: "Nuevo" });
storage.delete("cli_001");
```

## 🎯 Casos de Uso Comunes

### Simular Loading

```typescript
// mockDelay() ya simula 200-800ms
await mockDelay();
```

### Simular Error

```typescript
import { MockApiError } from "@/mocks";

if (!found) {
  throw new MockApiError("No encontrado", 404);
}
```

### Filtrar Datos

```typescript
const resultados = filterBySearch(MOCK_CLIENTES, "juan", [
  "nombre",
  "dni",
  "email",
]);
```

### Paginar Datos

```typescript
const page = paginate(MOCK_CLIENTES, 1, 10);
// { data: [...], total: 10, page: 1, pageSize: 10, totalPages: 1 }
```

## 🔄 Cambiar a API Real

1. **Opción A**: Desactivar todos los mocks

```bash
# .env
VITE_USE_MOCKS=false
```

2. **Opción B**: Desactivar módulo específico

```typescript
// src/mocks/config.ts
export const MOCK_CONFIG = {
  modules: {
    clientes: false, // Usar API real
    reservas: true, // Seguir usando mocks
  },
};
```

## 📚 Documentación Completa

Ver `MOCKS-ESTRUCTURA.md` para:

- Estructura detallada de carpetas
- Convenciones de nombres
- Helpers avanzados
- Ejemplos completos
- Best practices

## 💡 Tips

✅ **Hacer**:

- Usar `generateISODate()` para fechas (dinámicas)
- Simular latencia con `mockDelay()`
- Mantener relaciones coherentes entre entidades
- Testear casos edge (vacío, error, etc.)

❌ **NO Hacer**:

- Hardcodear fechas (`'2025-12-02'` ❌)
- Olvidar llamar `mockDelay()` (loading instantáneo = UX irreal)
- Mezclar lógica de negocio en datos mock
- Dejar mocks habilitados en producción

---

**¿Dudas?** Ver `MOCKS-ESTRUCTURA.md` o `REGLAS-DESARROLLO.md`
