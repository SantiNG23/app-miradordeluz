# 📁 Estructura del Proyecto con Datos Mock

```
src/
├── components/              # Componentes reutilizables
│   ├── ui/                 # shadcn/ui (Button, Dialog, Input, etc.)
│   ├── layout/             # Navbar, Sidebar
│   └── common/             # Componentes compartidos con lógica
│
├── pages/                  # Páginas por módulo
│   ├── dashboard-page.tsx
│   ├── reservas/
│   ├── clientes/
│   ├── cabanas/
│   ├── tarifas/
│   ├── calendario/
│   └── reportes/
│
├── features/               # Lógica de negocio por dominio
│   ├── reservas/
│   ├── clientes/
│   ├── cabanas/
│   └── tarifas/
│
├── hooks/                  # Custom hooks (React Query)
│   ├── use-clientes.ts
│   ├── use-reservas.ts
│   ├── use-cabanas.ts
│   └── use-dashboard.ts
│
├── services/               # API calls
│   ├── api.ts             # Configuración Axios base
│   ├── clientes.service.ts
│   ├── reservas.service.ts
│   ├── cabanas.service.ts
│   ├── tarifas.service.ts
│   └── dashboard.service.ts
│   └── *.service.example.ts  # Ejemplos de implementación
│
├── store/                  # Zustand stores (UI state)
│   ├── auth.store.ts
│   ├── reservas.store.ts
│   ├── cabanas.store.ts
│   └── ui.store.ts
│
├── types/                  # TypeScript types
│   └── index.ts           # Todas las interfaces del dominio
│
├── mocks/                  # 🧪 DATOS MOCK PARA DESARROLLO
│   ├── config.ts          # Configuración (habilitar/deshabilitar)
│   ├── utils.ts           # Helpers (generateId, mockDelay, etc.)
│   ├── index.ts           # Barrel export
│   └── data/              # Datos organizados por módulo
│       ├── clientes.ts    # 10 clientes de prueba
│       ├── cabanas.ts     # 5 cabañas + 8 características
│       ├── tarifas.ts     # 4 grupos de precios + rangos
│       ├── reservas.ts    # 7 reservas con relaciones
│       └── dashboard.ts   # Reportes y calendario
│
├── lib/                    # Utilidades y configuraciones
│   ├── utils.ts           # Funciones de utilidad (cn, etc.)
│   └── providers.tsx      # React Query Provider
│
├── layouts/                # Layout components
│   └── main-layout.tsx
│
├── App.tsx                # Rutas principales
├── main.tsx               # Entry point
└── index.css              # Estilos globales
```

## 📊 Flujo de Datos con Mocks

```
┌─────────────────────────────────────────────────────────┐
│                      COMPONENTE                          │
│  const { data, isLoading } = useClientes();             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                   CUSTOM HOOK                            │
│  useQuery(['clientes'], clientesService.getAll)         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                     SERVICE                              │
│  clientesService.getAll()                               │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐  ┌──────────────────┐
│ MOCKS ENABLED│  │ MOCKS DISABLED   │
│              │  │                  │
│ mockDelay()  │  │ apiClient.get()  │
│ return       │  │ return API data  │
│ MOCK_CLIENTES│  │                  │
└──────────────┘  └──────────────────┘
```

## 🎯 Módulos y Datos Mock

| Módulo              | Service                | Mock Data                  | Hook               |
| ------------------- | ---------------------- | -------------------------- | ------------------ |
| **Clientes**        | `clientes.service.ts`  | `MOCK_CLIENTES` (10)       | `use-clientes.ts`  |
| **Cabañas**         | `cabanas.service.ts`   | `MOCK_CABANAS` (5)         | `use-cabanas.ts`   |
| **Características** | `cabanas.service.ts`   | `MOCK_CARACTERISTICAS` (8) | `use-cabanas.ts`   |
| **Tarifas**         | `tarifas.service.ts`   | `MOCK_GRUPOS_PRECIOS` (4)  | `use-tarifas.ts`   |
| **Reservas**        | `reservas.service.ts`  | `MOCK_RESERVAS` (7)        | `use-reservas.ts`  |
| **Dashboard**       | `dashboard.service.ts` | Calculado dinámicamente    | `use-dashboard.ts` |
| **Calendario**      | `dashboard.service.ts` | Basado en reservas         | `use-dashboard.ts` |
| **Reportes**        | `dashboard.service.ts` | Calculado dinámicamente    | `use-dashboard.ts` |

## 🔄 Estados de Reservas (Mock)

```
MOCK_RESERVAS incluye todos los estados:

res_001 → confirmada (futura)           ✅
res_002 → confirmada (check-in HOY)     📅
res_003 → checkin_realizado (en curso)  🏠
res_004 → finalizada (pasada)           ✔️
res_005 → pendiente_confirmacion        ⏳
res_006 → cancelada                     ❌
res_007 → confirmada (futura lejana)    ✅
```

## 📝 Archivos de Documentación

```
📄 Raíz del proyecto:
├── EXPLICACION-ESTRUCTURA-FRONTEND.md   # Stack y arquitectura detallada
├── FRONTEND-ARCHITECTURE.md             # Endpoints API y contrato
├── FRONTEND-STRUCTURE.md                # Convenciones básicas
├── REGLAS-DESARROLLO.md                 # Explicación de reglas
├── MOCKS-ESTRUCTURA.md                  # 🧪 Documentación completa de mocks
├── MOCKS-GUIA-RAPIDA.md                 # 🧪 Quick start con mocks
└── .cursorrules                         # Reglas para Copilot
```

## 🚀 Workflow de Desarrollo

### 1. Crear Módulo Nuevo

```bash
# 1. Definir tipos
src/types/index.ts

# 2. Crear datos mock
src/mocks/data/nuevo-modulo.ts

# 3. Exportar mocks
src/mocks/index.ts

# 4. Crear service con mock support
src/services/nuevo-modulo.service.ts

# 5. Crear custom hook
src/hooks/use-nuevo-modulo.ts

# 6. Crear componentes
src/pages/nuevo-modulo/
src/features/nuevo-modulo/

# 7. Testear con mocks habilitados
```

### 2. Integrar con Backend

```bash
# 1. Backend listo → probar endpoints con Postman

# 2. Verificar contratos (request/response)

# 3. Desactivar mocks del módulo
src/mocks/config.ts → modules.nuevo = false

# 4. Testear integración

# 5. Mantener mocks para tests
```

## 💡 Tips

- **Durante desarrollo**: Mocks habilitados → desarrollo rápido sin backend
- **Testing**: Mocks siempre disponibles para tests automatizados
- **Producción**: Mocks automáticamente deshabilitados
- **Demos**: Mocks con datos realistas para presentaciones

---

**Ver también**:

- `MOCKS-GUIA-RAPIDA.md` para ejemplos de uso
- `MOCKS-ESTRUCTURA.md` para documentación completa
- `.cursorrules` para reglas de implementación
