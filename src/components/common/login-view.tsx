"use client";

import { useState } from "react";
import { LogIn, Lock, User } from "lucide-react";

interface LoginViewProps {
  onLogin: () => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación real
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#E0E5EC] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="neu-icon-wrap w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-[#181F54]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#2D3748] mb-2">Orvalis</h1>
          <p className="text-[#718096] font-medium">
            Sistema de Gestión Hotelera
          </p>
        </div>

        {/* Login Form */}
        <div className="neu-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#2D3748] mb-6 text-center">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#2D3748] block">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingrese su usuario..."
                  className="w-full neu-input rounded-xl pl-12 pr-4 py-3.5 text-[#2D3748] placeholder:text-[#718096]/60 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#2D3748] block">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña..."
                  className="w-full neu-input rounded-xl pl-12 pr-4 py-3.5 text-[#2D3748] placeholder:text-[#718096]/60 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full neu-button-primary px-6 py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 mt-8"
            >
              <LogIn className="w-5 h-5" />
              Ingresar
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm text-[#181F54] font-medium hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#718096]">Versión 1.0 • © 2025 Orvalis</p>
        </div>
      </div>
    </div>
  );
}
