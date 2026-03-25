# Instrucciones de Desarrollo: Componente de Cotización y Reserva vía WhatsApp

## 1. Contexto del Proyecto
- **Proyecto:** Landing Page e integración de sistema de reservas para el complejo de cabañas "Mirador de Luz".
- **Stack Tecnológico:** Frontend en React con TypeScript (integrado dentro de la arquitectura general del proyecto).
- **Objetivo Principal:** Desarrollar el componente de interfaz que muestra la cotización final y permite al usuario confirmar la reserva enviando un mensaje pre-armado por WhatsApp.

## 2. Directrices de UI/UX (Requisito Crítico)
- **Consistencia Visual:** Es imperativo que el diseño de este nuevo componente siga estrictamente la experiencia visual y la línea gráfica de la landing page actual de "Mirador de Luz".
- **Estilos:** Se deben reutilizar las paletas de colores, tipografías, sombreados, radios de borde y transiciones (hovers/focus) que ya están definidos en el sistema de diseño del proyecto.
- **Experiencia de Usuario:** El componente no debe sentirse como un "parche", sino como la culminación natural del flujo de selección de fechas y cabaña.

## 3. Lógica del Componente y Flujo de Datos (Próxima Fase)
Una vez definida la estructura visual, avanzaremos con la siguiente lógica:
- **Recepción de Datos:** El componente trabajará con la respuesta de la API de cotización del backend.
- **Datos Clave a Extraer:**
  - Fechas de estadía (Check-in y Check-out).
  - Precio total de la estadía.
  - Monto exacto de la seña requerida para bloquear las fechas.
- **Generación del Enlace de WhatsApp:**
  - Con los datos de la API, se debe construir dinámicamente la URL de WhatsApp (`https://wa.me/NUMERO_DESTINO?text=MENSAJE_CODIFICADO`).
  - El mensaje debe ser profesional, claro y contener la información exacta de la cotización para que el dueño reciba la solicitud lista para procesar.
- **Tracking:** Mantener o implementar el evento de analítica (`whatsapp_click` para GA4) al interactuar con el botón final.