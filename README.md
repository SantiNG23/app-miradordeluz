# 🏨 Sistema de Gestión Hotelera - App de Cabañas

## 📋 Descripción General

Sistema completo de gestión para complejos de cabañas que permite administrar **reservas**, **clientes**, **cabañas**, **tarifas**, visualizar un **calendario** interactivo y generar **reportes** de ocupación e ingresos.

### **Características Principales**

✅ **Gestión de Reservas**

- Crear, editar y cancelar reservas
- Cambio de estados (pendiente → confirmada → completada)
- Verificación de disponibilidad en tiempo real
- Cálculo automático de precios según tarifas configuradas
- Registro de pagos (seña y saldo)

✅ **Administración de Clientes**

- CRUD completo de clientes
- Búsqueda por DNI
- Historial de reservas por cliente
- Validación de datos con tipos

✅ **Gestión de Cabañas**

- Alta, baja y modificación de cabañas
- Asignación de características (piscina, parrilla, WiFi, etc.)
- Activación/desactivación de disponibilidad
- Capacidad y descripción detallada
- Galería de imágenes

✅ **Sistema de Tarifas Flexible**

- Grupos de precios (Temporada Alta, Baja, Fin de Semana)
- Rangos de fechas con precios específicos
- Cálculo automático basado en fechas de reserva
- Soporte para múltiples tarifas activas

✅ **Calendario Visual**

- Vista mensual/semanal de reservas
- Estados visuales por color
- Filtrado por cabaña
- Navegación rápida entre fechas

✅ **Dashboard y Reportes**

- Resumen diario (ocupación, ingresos, reservas)
- Reporte de ocupación por período
- Análisis de ingresos y estadísticas
- Exportación de datos

✅ **Multi-tenant Preparado**

- Sistema listo para SaaS multi-empresa
- Header `X-Tenant-ID` en cada request
- Aislamiento de datos por tenant

---

## 🛠️ Stack Tecnológico

### **Frontend**

- **React 18** con **TypeScript** - Framework principal
- **Vite** - Build tool rápido y moderno
- **React Router DOM** - Navegación cliente
- **TanStack React Query** - Estado del servidor y cache
- **Zustand** - Estado global de UI
- **React Hook Form + Zod** - Formularios y validación
- **Tailwind CSS** - Estilos utility-first
- **Radix UI** - Componentes accesibles headless
- **Lucide React** - Iconos modernos
- **date-fns** - Manipulación de fechas

### **Backend** (Pendiente de implementación)

- **Java** con **Spring Boot**
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación
- **REST API** - Comunicación

---

## 📂 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (Button, Dialog, Input)
│   ├── layout/         # Navbar, Sidebar
│   └── common/         # Componentes compartidos
│
├── pages/              # Páginas por módulo
│   ├── dashboard-page.tsx
│   ├── reservas/
│   ├── clientes/
│   ├── cabanas/
│   ├── tarifas/
│   ├── calendario/
│   └── reportes/
│
├── features/           # Lógica de negocio por dominio
│   ├── reservas/      # Componentes específicos de reservas
│   ├── clientes/
│   ├── cabanas/
│   └── tarifas/
│
├── hooks/              # Custom hooks con React Query
│   ├── use-clientes.ts
│   ├── use-reservas.ts
│   ├── use-cabanas.ts
│   └── use-dashboard.ts
│
├── services/           # Capa de API (Axios)
│   ├── api.ts
│   ├── clientes.service.ts
│   ├── reservas.service.ts
│   └── ...
│
├── store/              # Estado global (Zustand)
│   ├── auth.store.ts
│   ├── reservas.store.ts
│   ├── cabanas.store.ts
│   └── ui.store.ts
│
├── types/              # TypeScript types
├── lib/                # Utilidades
└── layouts/            # Layout components
```

📖 **[Ver documentación detallada de la estructura](./EXPLICACION-ESTRUCTURA-FRONTEND.md)**

📖 **[Ver arquitectura frontend](./FRONTEND-ARCHITECTURE.md)**

---

## 🚀 Instalación y Uso

### **Prerrequisitos**

- Node.js 18+ y npm/pnpm
- Backend corriendo en `http://localhost:8080/api` (o configurar URL)

### **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/agustin-diaz05/app-gestion-hotelera.git
cd app-gestion-hotelera

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores
```

### **Desarrollo**

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador: http://localhost:5173
```

### **Producción**

```bash
# Compilar para producción
npm run build

# Preview del build
npm run preview
```

---

## 🌐 Variables de Entorno

Crear archivo `.env` en la raíz:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Sistema de Gestión de Cabañas
VITE_TENANT_ID=1
```

---

## 📡 API Endpoints (Contrato Frontend-Backend)

### **Clientes**

- `GET /api/clientes` - Listar con paginación
- `GET /api/clientes/:id` - Obtener por ID
- `GET /api/clientes/buscar-dni?dni=` - Buscar por DNI
- `POST /api/clientes` - Crear
- `PUT /api/clientes/:id` - Actualizar
- `DELETE /api/clientes/:id` - Eliminar

### **Reservas**

- `GET /api/reservas` - Listar con filtros
- `POST /api/reservas` - Crear
- `PUT /api/reservas/:id` - Actualizar
- `PATCH /api/reservas/:id/estado` - Cambiar estado
- `DELETE /api/reservas/:id` - Cancelar
- `POST /api/reservas/disponibilidad` - Verificar disponibilidad
- `POST /api/reservas/calcular-precio` - Calcular precio

### **Cabañas**

- `GET /api/cabanas` - Listar todas
- `POST /api/cabanas` - Crear
- `PUT /api/cabanas/:id` - Actualizar
- `DELETE /api/cabanas/:id` - Eliminar
- `PATCH /api/cabanas/:id/toggle-estado` - Activar/desactivar

### **Tarifas**

- `GET /api/grupos-precios` - Listar grupos
- `POST /api/grupos-precios` - Crear grupo
- `GET /api/rangos-precios/activos?fecha=` - Rangos activos

### **Dashboard**

- `GET /api/calendario?fechaInicio=&fechaFin=` - Eventos
- `GET /api/dashboard/resumen-diario` - Resumen del día
- `GET /api/reportes/ocupacion` - Reporte de ocupación

📖 **[Ver lista completa de endpoints](./FRONTEND-ARCHITECTURE.md#-servicios-api---contrato-frontendbackend)**

---

## 🔐 Autenticación

Todas las peticiones incluyen:

```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {token}',
  'X-Tenant-ID': '{tenantId}'
}
```

El token JWT se obtiene en el login y se almacena en `localStorage` y en el store de Zustand.

---

## 🎯 Flujo de Trabajo

### **Ejemplo: Crear una Reserva**

1. Usuario accede a `/reservas`
2. Click en "Nueva Reserva"
3. Selecciona cabaña y fechas
4. Sistema verifica disponibilidad (`POST /api/reservas/disponibilidad`)
5. Calcula precio automático según tarifas (`POST /api/reservas/calcular-precio`)
6. Usuario completa formulario (cliente, observaciones)
7. Submit → Hook `useCreateReserva()` llama a `POST /api/reservas`
8. Backend crea reserva
9. React Query invalida cache y actualiza lista
10. Toast de confirmación y cierre de modal

---

## 🧪 Testing (Próximamente)

**Stack planeado**:

- Vitest - Test runner
- Testing Library - Tests de componentes
- MSW - Mock de API
- Playwright - Tests E2E

---

## 📦 Scripts Disponibles

```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Compilar para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

---

## 🗺️ Roadmap

### **Fase 1 - MVP** ✅

- [x] Estructura base del proyecto
- [x] Configuración de stack tecnológico
- [x] Definición de tipos TypeScript
- [x] Servicios API y hooks
- [x] Stores de Zustand

### **Fase 2 - Desarrollo** 🚧

- [ ] Implementar todos los componentes UI
- [ ] Formularios completos con validación
- [ ] Calendario interactivo
- [ ] Sistema de autenticación JWT
- [ ] Integración con backend real

### **Fase 3 - Features Avanzadas** 📅

- [ ] Dashboard con gráficos
- [ ] Exportación de reportes (PDF/Excel)
- [ ] Sistema de notificaciones
- [ ] Upload de imágenes de cabañas
- [ ] Búsqueda avanzada y filtros

### **Fase 4 - Optimización** 📅

- [ ] Testing unitario y E2E
- [ ] Optimización de performance
- [ ] SEO y accesibilidad
- [ ] Documentación de componentes
- [ ] CI/CD

---

## 👨‍💻 Autor

**Agustín Díaz**

- GitHub: [@agustin-diaz05](https://github.com/agustin-diaz05)

---

## 📄 Licencia

Este proyecto es privado y está bajo desarrollo.

---

## 📚 Documentación Adicional

- **[Explicación Detallada de la Estructura Frontend](./EXPLICACION-ESTRUCTURA-FRONTEND.md)** - Documentación completa del stack y arquitectura
- **[Arquitectura Frontend](./FRONTEND-ARCHITECTURE.md)** - Resumen técnico y endpoints
- **[Estructura Frontend](./FRONTEND-STRUCTURE.md)** - Organización de carpetas

---

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Si encuentras bugs o tienes sugerencias, por favor abre un issue.

---

## 📞 Soporte

Para consultas o soporte, contacta al equipo de desarrollo.
