"use client";

import { useState } from "react";
import {
  Edit,
  Trash2,
  Calendar,
  ChevronDown,
  Check,
  Search,
  Plus,
  X,
  LogOut,
} from "lucide-react";

export default function DesignSystemContent() {
  const [toggleActive, setToggleActive] = useState(true);
  const [selectOpen, setSelectOpen] = useState(false);
  const [datePickerFocused, setDatePickerFocused] = useState(false);

  return (
    <div className="space-y-10">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D3748] mb-2">
          Design System & UI Kit
        </h1>
        <p className="text-[#718096] font-medium">
          Fuente única de verdad para todos los elementos visuales de
          Gestión-hotelera-orvalis-v1
        </p>
      </div>

      {/* Color Palette Section */}
      <section className="neu-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-6">
          1. Paleta de Colores Definida
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Base Surface */}
          <div className="space-y-2">
            <div className="w-full h-20 rounded-xl bg-[#E0E5EC] neu-card-subtle flex items-center justify-center">
              <span className="text-xs font-mono text-[#718096]">#E0E5EC</span>
            </div>
            <p className="text-sm font-semibold text-[#2D3748]">Base Surface</p>
            <p className="text-xs text-[#718096]">Fondo neumórfico</p>
          </div>

          {/* Text Primary */}
          <div className="space-y-2">
            <div className="w-full h-20 rounded-xl bg-[#2D3748] flex items-center justify-center">
              <span className="text-xs font-mono text-white">#2D3748</span>
            </div>
            <p className="text-sm font-semibold text-[#2D3748]">Text Primary</p>
            <p className="text-xs text-[#718096]">Encabezados</p>
          </div>

          {/* Text Secondary */}
          <div className="space-y-2">
            <div className="w-full h-20 rounded-xl bg-[#718096] flex items-center justify-center">
              <span className="text-xs font-mono text-white">#718096</span>
            </div>
            <p className="text-sm font-semibold text-[#2D3748]">
              Text Secondary
            </p>
            <p className="text-xs text-[#718096]">Etiquetas/Meta</p>
          </div>

          {/* Brand/Primary */}
          <div className="space-y-2">
            <div className="w-full h-20 rounded-xl bg-[#3182CE] flex items-center justify-center">
              <span className="text-xs font-mono text-white">#3182CE</span>
            </div>
            <p className="text-sm font-semibold text-[#2D3748]">
              Brand/Primary
            </p>
            <p className="text-xs text-[#718096]">Ocean Blue</p>
          </div>

          {/* Confirmed */}
          <div className="space-y-2">
            <div className="w-full h-20 rounded-xl bg-[#38A169] flex items-center justify-center">
              <span className="text-xs font-mono text-white">#38A169</span>
            </div>
            <p className="text-sm font-semibold text-[#2D3748]">Confirmed</p>
            <p className="text-xs text-[#718096]">Soft Emerald</p>
          </div>

          {/* Pending */}
          <div className="space-y-2">
            <div className="w-full h-20 rounded-xl bg-[#DD6B20] flex items-center justify-center">
              <span className="text-xs font-mono text-white">#DD6B20</span>
            </div>
            <p className="text-sm font-semibold text-[#2D3748]">Pending</p>
            <p className="text-xs text-[#718096]">Burnt Orange</p>
          </div>

          {/* Cancelled/Error */}
          <div className="space-y-2">
            <div className="w-full h-20 rounded-xl bg-[#E53E3E] flex items-center justify-center">
              <span className="text-xs font-mono text-white">#E53E3E</span>
            </div>
            <p className="text-sm font-semibold text-[#2D3748]">
              Cancelled/Error
            </p>
            <p className="text-xs text-[#718096]">Soft Red</p>
          </div>

          {/* Danger Button */}
          <div className="space-y-2">
            <div className="w-full h-20 rounded-xl bg-[#C53030] flex items-center justify-center">
              <span className="text-xs font-mono text-white">#C53030</span>
            </div>
            <p className="text-sm font-semibold text-[#2D3748]">
              Danger Button
            </p>
            <p className="text-xs text-[#718096]">Deep Red</p>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="neu-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-6">2. Tipografía</h2>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-[#c8d0dc]/40">
            <span className="text-sm font-mono text-[#718096] w-20 shrink-0">
              H1
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D3748]">
              Heading Level 1
            </h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-[#c8d0dc]/40">
            <span className="text-sm font-mono text-[#718096] w-20 shrink-0">
              H2
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3748]">
              Heading Level 2
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-[#c8d0dc]/40">
            <span className="text-sm font-mono text-[#718096] w-20 shrink-0">
              H3
            </span>
            <h3 className="text-xl md:text-2xl font-semibold text-[#2D3748]">
              Heading Level 3
            </h3>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <span className="text-sm font-mono text-[#718096] w-20 shrink-0">
              Body
            </span>
            <p className="text-base text-[#2D3748] leading-relaxed max-w-xl">
              Este es un ejemplo de texto de cuerpo. Utiliza el color{" "}
              <code className="text-[#3182CE] font-mono text-sm">#2D3748</code>{" "}
              para legibilidad óptima. La tipografía Inter proporciona una
              excelente legibilidad en interfaces de usuario.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <span className="text-sm font-mono text-[#718096] w-20 shrink-0">
              Meta
            </span>
            <p className="text-sm text-[#718096]">
              Texto secundario para etiquetas, timestamps y metadatos. Color:{" "}
              <code className="font-mono">#718096</code>
            </p>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="neu-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-6">3. Botones</h2>

        {/* Primary Action Buttons */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-[#718096] uppercase tracking-wide mb-4">
            Botones de Acción Principal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Confirm Button - Blue */}
            <div className="space-y-3">
              <button className="w-full neu-button-confirm px-6 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Confirmar / Aceptar
              </button>
              <p className="text-xs text-[#718096] text-center">
                Acción principal azul (#3182CE)
              </p>
            </div>

            {/* Cancel Button - Neutral */}
            <div className="space-y-3">
              <button className="w-full neu-button-cancel px-6 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2">
                <X className="w-5 h-5" />
                Cancelar
              </button>
              <p className="text-xs text-[#718096] text-center">
                Acción neutral gris
              </p>
            </div>

            {/* Danger Button - Red */}
            <div className="space-y-3">
              <button className="w-full neu-button-danger px-6 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2">
                <Trash2 className="w-5 h-5" />
                Eliminar / Abortar
              </button>
              <p className="text-xs text-[#718096] text-center">
                Acción peligrosa rojo (#C53030)
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Danger Buttons */}
        <div className="mb-8 pt-6 border-t border-[#c8d0dc]/40">
          <h3 className="text-sm font-semibold text-[#718096] uppercase tracking-wide mb-4">
            Botones de Peligro Sutiles
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="neu-button-danger-subtle px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
            <button className="neu-button-danger-subtle px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2">
              <X className="w-5 h-5" />
              Descartar Cambios
            </button>
          </div>
          <p className="text-xs text-[#718096] mt-3">
            Variante sutil para acciones menos destructivas
          </p>
        </div>

        {/* Original Primary/Secondary Buttons */}
        <div className="pt-6 border-t border-[#c8d0dc]/40">
          <h3 className="text-sm font-semibold text-[#718096] uppercase tracking-wide mb-4">
            Botones Primario y Secundario
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Button */}
            <div className="space-y-4">
              <button className="neu-button-primary px-6 py-3.5 rounded-2xl font-semibold text-white flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Nueva Reservación
              </button>
              <p className="text-xs text-[#718096]">
                Usa el color Brand (#3182CE) con efecto elevado
              </p>
            </div>

            {/* Secondary Button */}
            <div className="space-y-4">
              <button className="neu-button-secondary px-6 py-3.5 rounded-2xl font-semibold text-[#2D3748] flex items-center gap-2">
                <Search className="w-5 h-5" />
                Buscar Cliente
              </button>
              <p className="text-xs text-[#718096]">
                Neutro gris con extrusión suave
              </p>
            </div>

            {/* Icon Buttons */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <button className="neu-button-icon w-12 h-12 rounded-full flex items-center justify-center text-[#3182CE]">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="neu-button-icon w-12 h-12 rounded-full flex items-center justify-center text-[#E53E3E]">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button className="neu-button-icon w-12 h-12 rounded-full flex items-center justify-center text-[#38A169]">
                  <Check className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#718096]">
                Botones circulares para acciones contextuales
              </p>
            </div>
          </div>
        </div>

        {/* Button States */}
        <div className="mt-8 pt-6 border-t border-[#c8d0dc]/40">
          <h3 className="text-sm font-semibold text-[#718096] uppercase tracking-wide mb-4">
            Estados de Botón
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="neu-button px-6 py-3 rounded-2xl font-semibold text-[#2D3748]">
              Normal
            </button>
            <button className="neu-button px-6 py-3 rounded-2xl font-semibold text-[#3182CE]">
              Hover (simulated)
            </button>
            <button className="neu-pressed px-6 py-3 rounded-2xl font-semibold text-[#3182CE]">
              Pressed/Active
            </button>
          </div>
        </div>
      </section>

      {/* Form Elements Section */}
      <section className="neu-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-6">
          4. Elementos de Formulario
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Field */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#2D3748]">
              Input Field
            </label>
            <input
              type="text"
              placeholder="Nombre del huésped..."
              className="w-full neu-input rounded-xl px-4 py-3.5 text-[#2D3748] placeholder:text-[#718096]/60 focus:outline-none"
            />
            <p className="text-xs text-[#718096]">
              Efecto recessed con sombra interior
            </p>
          </div>

          {/* Date Picker */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#2D3748]">
              Date Picker Input
            </label>
            <div
              className={`w-full neu-datepicker rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-pointer ${
                datePickerFocused ? "ring-[3px] ring-[#3182CE]/20" : ""
              }`}
              onClick={() => setDatePickerFocused(!datePickerFocused)}
            >
              <Calendar className="w-5 h-5 text-[#3182CE]" />
              <span
                className={
                  datePickerFocused ? "text-[#2D3748]" : "text-[#718096]/60"
                }
              >
                {datePickerFocused ? "15/01/2025" : "Seleccionar fecha..."}
              </span>
            </div>
            <p className="text-xs text-[#718096]">
              Click para simular estado activo con ring de focus
            </p>
          </div>

          {/* Select/Dropdown */}
          <div className="space-y-3 relative">
            <label className="text-sm font-semibold text-[#2D3748]">
              Select/Dropdown
            </label>
            <div
              className="w-full neu-select rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer"
              onClick={() => setSelectOpen(!selectOpen)}
            >
              <span className="text-[#2D3748]">Cabaña Premium</span>
              <ChevronDown
                className={`w-5 h-5 text-[#718096] transition-transform ${
                  selectOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {selectOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 neu-select-dropdown rounded-xl p-2 z-10">
                <div className="px-3 py-2.5 rounded-lg hover:bg-[#3182CE]/10 text-[#2D3748] cursor-pointer transition-colors">
                  Cabaña Básica
                </div>
                <div className="px-3 py-2.5 rounded-lg bg-[#3182CE]/10 text-[#3182CE] font-medium cursor-pointer">
                  Cabaña Premium
                </div>
                <div className="px-3 py-2.5 rounded-lg hover:bg-[#3182CE]/10 text-[#2D3748] cursor-pointer transition-colors">
                  Cabaña Deluxe
                </div>
              </div>
            )}
            <p className="text-xs text-[#718096]">
              Click para ver dropdown flotante (Level 3 shadow)
            </p>
          </div>

          {/* Search Input */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#2D3748]">
              Search Input
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
              <input
                type="text"
                placeholder="Buscar reservación..."
                className="w-full neu-input rounded-xl pl-12 pr-4 py-3.5 text-[#2D3748] placeholder:text-[#718096]/60 focus:outline-none"
              />
            </div>
            <p className="text-xs text-[#718096]">Input con icono integrado</p>
          </div>
        </div>
      </section>

      {/* Cards & Containers Section */}
      <section className="neu-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-6">
          5. Cards & Containers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Simple Card (Level 2) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#718096] uppercase tracking-wide">
              Simple Card (Level 2)
            </h3>
            <div className="neu-card-subtle rounded-2xl p-6">
              <h4 className="font-bold text-[#2D3748] mb-2">Ocupación Hoy</h4>
              <p className="text-3xl font-bold text-[#3182CE]">85%</p>
              <p className="text-sm text-[#718096] mt-1">
                17 de 20 cabañas ocupadas
              </p>
            </div>
          </div>

          {/* Floating Modal (Level 3) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#718096] uppercase tracking-wide">
              Floating Modal (Level 3)
            </h3>
            <div className="neu-modal rounded-2xl p-6">
              <h4 className="font-bold text-[#2D3748] mb-2">
                Alerta Importante
              </h4>
              <p className="text-sm text-[#718096]">
                Este modal usa la sombra Level 3 para crear un efecto de
                elevación más pronunciado.
              </p>
              <button className="mt-4 neu-button-primary px-4 py-2 rounded-xl text-sm font-semibold text-white">
                Entendido
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Status Badges Section */}
      <section className="neu-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-6">
          6. Status Badges (Pills)
        </h2>

        <div className="flex flex-wrap gap-4">
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-[#38A169]/15 text-[#38A169]">
            Confirmada
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-[#DD6B20]/15 text-[#DD6B20]">
            Pendiente
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-[#E53E3E]/15 text-[#E53E3E]">
            Cancelada
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-[#3182CE]/15 text-[#3182CE]">
            Check-in
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-[#8b5cf6]/15 text-[#8b5cf6]">
            Check-out
          </span>
        </div>

        <p className="mt-4 text-sm text-[#718096]">
          Cápsulas redondeadas con fondo translúcido basado en el color de
          estado correspondiente.
        </p>
      </section>

      {/* Toggle Switch Section */}
      <section className="neu-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-6">
          7. Toggle Switch
        </h2>

        <div className="flex items-center gap-8">
          {/* Toggle Off */}
          <div className="space-y-3 text-center">
            <div
              className="neu-toggle-track w-16 h-8 rounded-full p-1 cursor-pointer"
              onClick={() => setToggleActive(false)}
            >
              <div className="neu-toggle-thumb w-6 h-6 rounded-full" />
            </div>
            <p className="text-sm text-[#718096]">Inactivo</p>
          </div>

          {/* Toggle On */}
          <div className="space-y-3 text-center">
            <div
              className={`w-16 h-8 rounded-full p-1 cursor-pointer transition-all ${
                toggleActive ? "neu-toggle-track-active" : "neu-toggle-track"
              }`}
              onClick={() => setToggleActive(!toggleActive)}
            >
              <div
                className={`neu-toggle-thumb w-6 h-6 rounded-full transition-transform ${
                  toggleActive ? "translate-x-8" : ""
                }`}
              />
            </div>
            <p className="text-sm text-[#718096]">
              {toggleActive ? "Activo" : "Inactivo"}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#c8d0dc]/40">
          <div className="flex items-center justify-between max-w-sm">
            <span className="text-[#2D3748] font-medium">Cabaña Activa</span>
            <div
              className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-all ${
                toggleActive ? "neu-toggle-track-active" : "neu-toggle-track"
              }`}
              onClick={() => setToggleActive(!toggleActive)}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  toggleActive
                    ? "translate-x-7 bg-white shadow-md"
                    : "neu-toggle-thumb"
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section className="neu-elevated rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-4">
          Ejemplo de Uso: Modal de Confirmación
        </h2>
        <p className="text-[#718096] mb-6">
          Ejemplo de diálogo con los tres tipos de botones:
        </p>

        <div className="neu-modal rounded-2xl p-6 max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E53E3E]/15 flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-[#E53E3E]" />
            </div>
            <h3 className="text-lg font-bold text-[#2D3748] mb-2">
              ¿Eliminar Reservación?
            </h3>
            <p className="text-sm text-[#718096]">
              Esta acción no se puede deshacer. Se eliminará permanentemente la
              reservación #1024.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 neu-button-cancel px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <X className="w-4 h-4" />
              Cancelar
            </button>
            <button className="flex-1 neu-button-danger px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>

        {/* Another example with confirm */}
        <div className="neu-modal rounded-2xl p-6 max-w-md mx-auto mt-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#3182CE]/15 flex items-center justify-center">
              <Check className="w-8 h-8 text-[#3182CE]" />
            </div>
            <h3 className="text-lg font-bold text-[#2D3748] mb-2">
              ¿Confirmar Check-in?
            </h3>
            <p className="text-sm text-[#718096]">
              Juan Pérez - Cabaña Premium. 3 noches (15 al 18 Ene, 2025)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 neu-button-cancel px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              Cancelar
            </button>
            <button className="flex-1 neu-button-confirm px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Confirmar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
