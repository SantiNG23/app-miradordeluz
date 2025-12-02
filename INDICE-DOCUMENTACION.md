# 📚 Índice de Documentación del Proyecto

## 🎯 Documentos Principales

### 📖 Arquitectura y Estructura

| Documento                                                                      | Descripción                                  | Para quién      |
| ------------------------------------------------------------------------------ | -------------------------------------------- | --------------- |
| **[FRONTEND-STRUCTURE.md](./FRONTEND-STRUCTURE.md)**                           | Vista general y convenciones básicas         | Todos           |
| **[FRONTEND-ARCHITECTURE.md](./FRONTEND-ARCHITECTURE.md)**                     | Arquitectura completa y endpoints API        | Desarrolladores |
| **[EXPLICACION-ESTRUCTURA-FRONTEND.md](./EXPLICACION-ESTRUCTURA-FRONTEND.md)** | Stack tecnológico y explicación detallada    | Desarrolladores |
| **[ESTRUCTURA-PROYECTO-MOCKS.md](./ESTRUCTURA-PROYECTO-MOCKS.md)**             | Estructura del proyecto con mocks integrados | Desarrolladores |

### 🔧 Reglas y Convenciones

| Documento                                          | Descripción                                       | Para quién      |
| -------------------------------------------------- | ------------------------------------------------- | --------------- |
| **[.cursorrules](./.cursorrules)**                 | Reglas concretas para Copilot                     | Copilot AI      |
| **[REGLAS-DESARROLLO.md](./REGLAS-DESARROLLO.md)** | Explicación detallada del "por qué" de cada regla | Desarrolladores |

### 🧪 Datos Mock (Desarrollo Frontend)

| Documento                                                | Descripción                             | Para quién           |
| -------------------------------------------------------- | --------------------------------------- | -------------------- |
| **[MOCKS-GUIA-RAPIDA.md](./MOCKS-GUIA-RAPIDA.md)**       | ⚡ Quick start con mocks                | Comenzar aquí        |
| **[MOCKS-ESTRUCTURA.md](./MOCKS-ESTRUCTURA.md)**         | 📖 Documentación completa de mocks      | Referencia completa  |
| **[MOCKS-EJEMPLO-VISUAL.md](./MOCKS-EJEMPLO-VISUAL.md)** | 🎨 Ejemplos visuales y flujos completos | Aprendizaje práctico |

---

## 🚀 Guía de Lectura por Rol

### 👨‍💻 Nuevo en el Proyecto

**Orden recomendado**:

1. `FRONTEND-STRUCTURE.md` → Entender la base
2. `MOCKS-GUIA-RAPIDA.md` → Configurar datos de prueba
3. `ESTRUCTURA-PROYECTO-MOCKS.md` → Ver el panorama completo
4. `REGLAS-DESARROLLO.md` → Aprender las convenciones

### 🔨 Desarrollando un Módulo Nuevo

**Orden recomendado**:

1. `MOCKS-GUIA-RAPIDA.md` → Crear datos mock
2. `FRONTEND-ARCHITECTURE.md` → Ver endpoints disponibles
3. `MOCKS-EJEMPLO-VISUAL.md` → Ver ejemplos completos
4. `.cursorrules` → Seguir las reglas

### 🐛 Debugging o Resolviendo Dudas

**Consultar**:

1. `REGLAS-DESARROLLO.md` → Por qué se hace así
2. `MOCKS-ESTRUCTURA.md` → Helpers y utilidades disponibles
3. `EXPLICACION-ESTRUCTURA-FRONTEND.md` → Stack y arquitectura profunda

### 🔗 Integrando con Backend

**Orden recomendado**:

1. `FRONTEND-ARCHITECTURE.md` → Verificar contrato API
2. `MOCKS-ESTRUCTURA.md` → Sección "Migración a API Real"
3. `MOCKS-GUIA-RAPIDA.md` → Sección "Cambiar a API Real"

---

## 📂 Estructura de la Documentación

```
docs/
├── 📖 Arquitectura
│   ├── FRONTEND-STRUCTURE.md              # Básico
│   ├── FRONTEND-ARCHITECTURE.md           # Intermedio
│   ├── EXPLICACION-ESTRUCTURA-FRONTEND.md # Avanzado
│   └── ESTRUCTURA-PROYECTO-MOCKS.md       # Integración
│
├── 🔧 Reglas y Convenciones
│   ├── .cursorrules                       # Reglas para AI
│   └── REGLAS-DESARROLLO.md               # Explicaciones
│
└── 🧪 Datos Mock
    ├── MOCKS-GUIA-RAPIDA.md              # ⚡ Start here
    ├── MOCKS-ESTRUCTURA.md                # 📖 Referencia
    └── MOCKS-EJEMPLO-VISUAL.md            # 🎨 Ejemplos
```

---

## 🔍 Búsqueda Rápida por Tema

### Stack Tecnológico

- **React + TypeScript**: `EXPLICACION-ESTRUCTURA-FRONTEND.md` → Stack Tecnológico
- **Zustand**: `REGLAS-DESARROLLO.md` → Gestión de Estado
- **React Query**: `REGLAS-DESARROLLO.md` → Gestión de Estado
- **Tailwind CSS**: `REGLAS-DESARROLLO.md` → Estilos con Tailwind CSS
- **React Hook Form + Zod**: `REGLAS-DESARROLLO.md` → Formularios

### Organización de Código

- **Estructura de carpetas**: `FRONTEND-STRUCTURE.md` → Estructura del Proyecto
- **Convenciones de nombres**: `REGLAS-DESARROLLO.md` → Organización de Archivos
- **Componentes**: `REGLAS-DESARROLLO.md` → Componentes
- **Services**: `REGLAS-DESARROLLO.md` → Servicios API
- **Hooks**: `FRONTEND-ARCHITECTURE.md` → Custom Hooks Disponibles

### Datos Mock

- **Quick start**: `MOCKS-GUIA-RAPIDA.md`
- **Configuración**: `MOCKS-ESTRUCTURA.md` → Configuración
- **Datos disponibles**: `MOCKS-GUIA-RAPIDA.md` → Datos Disponibles
- **Helpers**: `MOCKS-ESTRUCTURA.md` → Utilidades Disponibles
- **Ejemplos CRUD**: `MOCKS-EJEMPLO-VISUAL.md` → Ejemplo: CRUD Completo
- **Integración API**: `MOCKS-ESTRUCTURA.md` → Migración a API Real

### Buenas Prácticas

- **TypeScript**: `REGLAS-DESARROLLO.md` → TypeScript
- **Performance**: `REGLAS-DESARROLLO.md` → Performance
- **Accesibilidad**: `REGLAS-DESARROLLO.md` → Accesibilidad
- **Seguridad**: `REGLAS-DESARROLLO.md` → Seguridad
- **Testing**: `REGLAS-DESARROLLO.md` → Testing
- **Responsive**: `REGLAS-DESARROLLO.md` → Responsive Design

### API y Backend

- **Endpoints**: `FRONTEND-ARCHITECTURE.md` → Endpoints Implementados
- **Headers**: `FRONTEND-ARCHITECTURE.md` → Headers de las Peticiones
- **Contrato**: `FRONTEND-ARCHITECTURE.md` → Servicios API
- **Multi-tenant**: `FRONTEND-ARCHITECTURE.md` → Configuración Multi-tenant

---

## 💡 Casos de Uso Comunes

### "Quiero empezar a desarrollar"

→ `MOCKS-GUIA-RAPIDA.md`

### "¿Cómo creo un componente?"

→ `REGLAS-DESARROLLO.md` → Componentes

### "¿Cómo funciona el estado?"

→ `REGLAS-DESARROLLO.md` → Gestión de Estado

### "¿Cómo creo un formulario?"

→ `REGLAS-DESARROLLO.md` → Formularios

### "¿Cómo llamo a la API?"

→ `FRONTEND-ARCHITECTURE.md` + `REGLAS-DESARROLLO.md` → Servicios API

### "¿Cómo creo datos de prueba?"

→ `MOCKS-GUIA-RAPIDA.md` + `MOCKS-EJEMPLO-VISUAL.md`

### "¿Por qué se hace de esta manera?"

→ `REGLAS-DESARROLLO.md` (tiene el "por qué" de todo)

### "¿Cómo integro con el backend?"

→ `MOCKS-ESTRUCTURA.md` → Migración a API Real

---

## 📝 Archivos de Configuración

```
Proyecto/
├── .env.example              # Variables de entorno (incluye VITE_USE_MOCKS)
├── tsconfig.json             # TypeScript config (alias @/*)
├── vite.config.ts            # Vite config
├── tailwind.config.js        # Tailwind CSS config
├── package.json              # Dependencias
└── .cursorrules              # Reglas para Copilot
```

---

## 🎯 Atajos Rápidos

| Necesito...            | Ver...                         |
| ---------------------- | ------------------------------ |
| Empezar rápido         | `MOCKS-GUIA-RAPIDA.md`         |
| Ver ejemplos           | `MOCKS-EJEMPLO-VISUAL.md`      |
| Entender el "por qué"  | `REGLAS-DESARROLLO.md`         |
| Endpoints API          | `FRONTEND-ARCHITECTURE.md`     |
| Estructura completa    | `ESTRUCTURA-PROYECTO-MOCKS.md` |
| Configurar mocks       | `MOCKS-ESTRUCTURA.md`          |
| Convenciones de código | `.cursorrules`                 |

---

## 🔄 Actualizaciones

Este índice se actualiza cada vez que se agrega nueva documentación.

**Última actualización**: Diciembre 2025  
**Versión**: 1.0.0

---

## 📞 ¿Tienes dudas?

1. Busca en este índice por tema
2. Lee el documento recomendado
3. Si no está claro, revisa `REGLAS-DESARROLLO.md` (explica el "por qué")
4. Si aún tienes dudas, consulta con el equipo

---

**Tip**: Usa Ctrl+F (Cmd+F en Mac) para buscar palabras clave en este índice.
