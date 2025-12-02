# 🧪 Estructura de Datos Mock para Desarrollo

Este documento explica la organización y uso de los datos mock (de prueba) para el desarrollo del frontend.

---

## 📂 Estructura de Carpetas

```
src/mocks/
├── config.ts              # Configuración global de mocks
├── utils.ts               # Utilidades para trabajar con mocks
├── index.ts               # Barrel export (importar todo desde aquí)
└── data/
    ├── clientes.ts        # Datos mock de clientes
    ├── cabanas.ts         # Datos mock de cabañas y características
    ├── tarifas.ts         # Datos mock de grupos de precios y rangos
    ├── reservas.ts        # Datos mock de reservas, huéspedes y pagos
    └── dashboard.ts       # Datos mock de reportes y calendario
```

---

## 🎯 Objetivo

**Permitir desarrollo del frontend sin depender del backend**, con datos realistas y coherentes que simulen el comportamiento de la API real.

### Beneficios

✅ **Independencia**: Frontend puede avanzar sin esperar al backend  
✅ **Datos controlados**: Escenarios específicos para testear edge cases  
✅ **Desarrollo rápido**: Sin latencia de red, sin autenticación  
✅ **Testing**: Datos predecibles para tests automatizados  
✅ **Demos**: Presentar funcionalidades con datos realistas

---

## 🚀 Uso Básico

### 1. Habilitar/Deshabilitar Mocks

```typescript
// src/mocks/config.ts
export const MOCK_CONFIG = {
  enabled: true, // false para usar API real

  // Habilitar solo módulos específicos
  modules: {
    clientes: true,
    reservas: true,
    cabanas: false, // Este usará API real
  },
};
```

### 2. Importar Datos Mock

```typescript
// En un componente o service
import { MOCK_CLIENTES, MOCK_RESERVAS, isMockEnabled } from "@/mocks";

// Verificar si los mocks están habilitados
if (isMockEnabled("clientes")) {
  return MOCK_CLIENTES;
}
```

### 3. Usar en Servicios

```typescript
// src/services/clientes.service.ts
import { apiClient } from "./api";
import { MOCK_CLIENTES, isMockEnabled, mockDelay } from "@/mocks";

export const clientesService = {
  getAll: async () => {
    // Si mocks están habilitados, retornar datos mock
    if (isMockEnabled("clientes")) {
      await mockDelay(); // Simula latencia de red
      return MOCK_CLIENTES;
    }

    // Si no, usar API real
    const { data } = await apiClient.get("/clientes");
    return data;
  },
};
```

---

## 📊 Datos Disponibles

### Clientes (10 registros)

- DNI únicos reales
- Datos de contacto variados
- Diferentes localidades de Argentina
- Algunos con email, otros sin

**IDs**: `cli_001` hasta `cli_010`

### Cabañas (5 registros)

- 4 activas, 1 inactiva
- Capacidades: 2 a 6 personas
- Características variadas (piscina, WiFi, parrilla, etc.)

**IDs**: `cab_001` hasta `cab_005`

### Características (8 registros)

- Pool compartido de características asignables
- WiFi, Piscina, Parrilla, Cochera, etc.

**IDs**: `car_001` hasta `car_008`

### Grupos de Precios (4 registros)

- Temporada Baja: $15,000/noche
- Temporada Alta: $25,000/noche
- Fin de Semana: $18,000/noche
- Año Nuevo: $35,000/noche

**IDs**: `gp_001` hasta `gp_004`

### Rangos de Precios

- Asignados a grupos de precios
- Cubren todo el año 2025-2026

### Reservas (7 registros)

- **Estados variados**: confirmada, pendiente, check-in realizado, finalizada, cancelada
- **Fechas relativas**: Pasado, presente y futuro (dinámicas según fecha actual)
- **Con relaciones**: Cliente, cabaña, huéspedes, pagos incluidos

**IDs**: `res_001` hasta `res_007`

**Casos de uso cubiertos**:

- Reserva futura confirmada con seña pagada
- Reserva con check-in HOY
- Reserva en curso (check-in realizado)
- Reserva finalizada (checkout en el pasado)
- Reserva pendiente que vence pronto
- Reserva cancelada

---

## 🛠️ Utilidades Disponibles

### `generateId()`

Genera IDs únicos para nuevas entidades mock.

```typescript
const nuevoCliente = {
  id: generateId(), // "mock_1701504723456_abc123"
  nombre: "Pedro López",
  // ...
};
```

### `generateISODate(daysOffset)`

Genera fechas relativas al día actual.

```typescript
generateISODate(0); // Hoy
generateISODate(-7); // Hace 7 días
generateISODate(15); // En 15 días
```

### `mockDelay()`

Simula latencia de red (200-800ms).

```typescript
await mockDelay();
// Usuario ve loading spinner, experiencia realista
```

### `filterBySearch(items, search, fields)`

Filtra arrays simulando búsquedas del backend.

```typescript
const clientes = filterBySearch(MOCK_CLIENTES, "juan", [
  "nombre",
  "dni",
  "email",
]);
// Retorna clientes que coinciden con "juan"
```

### `paginate(items, page, pageSize)`

Pagina arrays simulando paginación del backend.

```typescript
const resultado = paginate(MOCK_CLIENTES, 2, 5);
// { data: [...], total: 10, page: 2, pageSize: 5, totalPages: 2 }
```

### `createMockStorage(initialData)`

Crea un storage en memoria con CRUD completo.

```typescript
const storage = createMockStorage(MOCK_CLIENTES);

storage.getAll();
storage.getById("cli_001");
storage.create(nuevoCliente);
storage.update("cli_001", { nombre: "Nuevo Nombre" });
storage.delete("cli_001");
```

---

## 📝 Convenciones de Nombres

### IDs de Entidades

- **Clientes**: `cli_XXX`
- **Cabañas**: `cab_XXX`
- **Características**: `car_XXX`
- **Grupos de Precio**: `gp_XXX`
- **Rangos de Precio**: `rp_XXX`
- **Reservas**: `res_XXX`
- **Huéspedes**: `hue_XXX`
- **Pagos**: `pag_XXX`

### Archivos

- Un archivo por módulo en `src/mocks/data/`
- Nombre en singular si es la entidad principal (`clientes.ts`, `reservas.ts`)
- Incluir entidades relacionadas en el mismo archivo (ej: huéspedes en `reservas.ts`)

---

## 🔄 Flujo de Trabajo

### Durante Desarrollo de un Módulo

1. **Crear datos mock** en `src/mocks/data/[modulo].ts`
2. **Exportar desde** `src/mocks/index.ts`
3. **Modificar service** para usar mocks si están habilitados
4. **Desarrollar componente** con datos mock
5. **Testear todos los casos** (success, error, loading, empty)
6. **Deshabilitar mocks** cuando backend esté listo
7. **Integrar con API real**

### Ejemplo Completo

```typescript
// 1. Crear datos mock (src/mocks/data/clientes.ts)
export const MOCK_CLIENTES: Cliente[] = [
  { id: 'cli_001', nombre: 'Juan', ... },
];

// 2. Exportar (src/mocks/index.ts)
export * from './data/clientes';

// 3. Modificar service (src/services/clientes.service.ts)
export const clientesService = {
  getAll: async () => {
    if (isMockEnabled('clientes')) {
      await mockDelay();
      return MOCK_CLIENTES;
    }
    const { data } = await apiClient.get('/clientes');
    return data;
  },
};

// 4. Usar en componente (src/pages/clientes/clients-page.tsx)
const { data: clientes, isLoading } = useClientes();
// Funciona con mocks o con API real sin cambios
```

---

## 🎭 Casos de Uso Especiales

### Simular Errores

```typescript
import { MockApiError } from "@/mocks";

export const clientesService = {
  getById: async (id: string) => {
    if (isMockEnabled("clientes")) {
      await mockDelay();

      const cliente = MOCK_CLIENTES.find((c) => c.id === id);
      if (!cliente) {
        throw new MockApiError("Cliente no encontrado", 404);
      }
      return cliente;
    }
    // API real...
  },
};
```

### Simular Estados de Loading

```typescript
// mockDelay() ya simula loading automáticamente
// Ajustar delay en config.ts si es muy rápido/lento
```

### Persistencia Durante la Sesión

```typescript
// Storage persiste durante la sesión del navegador
const storage = createMockStorage(MOCK_CLIENTES);

// Crear un cliente
const nuevo = storage.create({
  id: generateId(),
  nombre: "Nuevo Cliente",
  // ...
});

// Permanece hasta refrescar la página
console.log(storage.getAll()); // Incluye el nuevo cliente
```

---

## 🔐 Variable de Entorno

Controlar mocks desde `.env`:

```bash
# .env.development
VITE_USE_MOCKS=true

# .env.production
VITE_USE_MOCKS=false
```

---

## ⚠️ Consideraciones Importantes

### ✅ Hacer

- Mantener datos mock realistas y variados
- Actualizar mocks cuando cambien los tipos en `src/types/`
- Simular latencia con `mockDelay()`
- Cubrir casos edge (listas vacías, errores, etc.)
- Usar fechas relativas con `generateISODate()`

### ❌ NO Hacer

- Hardcodear fechas absolutas (usar offsets relativos)
- Crear dependencias entre componentes y mocks (usar siempre a través de services)
- Dejar mocks habilitados en producción
- Olvidar actualizar mocks al cambiar la API
- Mezclar lógica de negocio con datos mock

---

## 🧪 Testing con Mocks

```typescript
// tests/components/client-form.test.tsx
import { MOCK_CLIENTES } from "@/mocks";

describe("ClientForm", () => {
  it("should display client data", () => {
    const cliente = MOCK_CLIENTES[0];
    render(<ClientForm cliente={cliente} />);

    expect(screen.getByDisplayValue(cliente.nombre)).toBeInTheDocument();
  });
});
```

---

## 🚦 Migración a API Real

Cuando el backend esté listo:

1. **Cambiar config**: `MOCK_CONFIG.enabled = false` o `MOCK_CONFIG.modules.clientes = false`
2. **Verificar contratos**: Asegurar que API real retorna lo mismo que mocks
3. **Testear integración**: Probar todos los flujos con API real
4. **Mantener mocks**: No eliminar, útiles para tests y desarrollo futuro

---

## 📚 Referencias

- **Tipos**: Ver `src/types/index.ts` para todas las interfaces
- **Servicios**: Ver `src/services/` para integración con mocks
- **Hooks**: Ver `src/hooks/` para uso con React Query

---

**Última actualización**: Diciembre 2025
