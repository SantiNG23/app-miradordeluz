"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, Bell, LogOut, User } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

export function Navbar({ onMenuClick, onLogout }: NavbarProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Nueva reservación",
      message: "María García - Cabaña Luna",
      time: "Hace 5 min",
      unread: true,
    },
    {
      id: 2,
      title: "Check-out pendiente",
      message: "Pedro Sánchez - Cabaña Bosque",
      time: "Hace 30 min",
      unread: true,
    },
    {
      id: 3,
      title: "Pago recibido",
      message: "$350.00 - Reservación #1024",
      time: "Hace 1 hora",
      unread: false,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[73px] neu-navbar bg-[#E0E5EC]">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        {/* Left: Mobile Menu + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden neu-button w-11 h-11 rounded-xl flex items-center justify-center"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5 text-[#181F54]" />
          </button>

          {/* Desktop Logo & Title */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="neu-icon-wrap w-11 h-11 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#181F54]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-[#2D3748]">Orvalis</h1>
              <p className="text-[10px] text-[#718096] font-medium">
                Gestión Hotelera
              </p>
            </div>
          </div>

          {/* Mobile Title */}
          <h1 className="lg:hidden text-lg font-bold text-[#2D3748]">
            Orvalis
          </h1>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setProfileOpen(false);
              }}
              className="neu-button w-11 h-11 rounded-xl flex items-center justify-center relative"
              aria-label="Notificaciones"
            >
              <Bell className="w-5 h-5 text-[#181F54]" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#E53E3E] rounded-full" />
              )}
            </button>

            {notificationOpen && (
              <div
                className={`
                  absolute top-full mt-3 right-0
                  w-80 max-w-[calc(100vw-2rem)] neu-dropdown rounded-2xl p-4
                  animate-dropdown-in z-50
                `}
              >
                <h3 className="text-sm font-bold text-[#2D3748] mb-3">
                  Notificaciones
                </h3>
                <div className="space-y-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`neu-notification-item rounded-xl p-3 cursor-pointer ${
                        notif.unread ? "neu-notification-unread" : ""
                      }`}
                    >
                      <p className="text-sm font-semibold text-[#2D3748] mb-1">
                        {notif.title}
                      </p>
                      <p className="text-xs text-[#718096] mb-2">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-[#718096] font-medium">
                        {notif.time}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 text-sm text-[#181F54] font-semibold hover:underline">
                  Ver todas
                </button>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              className="neu-button px-3 md:px-4 h-11 rounded-xl flex items-center gap-2"
              aria-label="Perfil"
            >
              <div className="neu-pressed w-7 h-7 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-[#181F54]" />
              </div>
              <span className="hidden md:block text-sm font-semibold text-[#2D3748]">
                Admin
              </span>
            </button>

            {profileOpen && (
              <div
                className={`
                  absolute top-full mt-3 right-0
                  w-56 neu-dropdown rounded-2xl p-3
                  animate-dropdown-in z-50
                `}
              >
                <div className="px-3 py-3 border-b border-[#c8d0dc]/40">
                  <p className="font-bold text-[#2D3748] text-sm">
                    Administrador
                  </p>
                  <p className="text-xs text-[#718096] font-medium">
                    admin@orvalis.com
                  </p>
                </div>
                <div className="py-2">
                  <button className="w-full px-3 py-2.5 rounded-lg hover:bg-[#181F54]/10 text-[#2D3748] text-sm font-medium text-left transition-colors">
                    Mi Perfil
                  </button>
                  <button className="w-full px-3 py-2.5 rounded-lg hover:bg-[#181F54]/10 text-[#2D3748] text-sm font-medium text-left transition-colors">
                    Configuración
                  </button>
                </div>
                <div className="pt-2 border-t border-[#c8d0dc]/40">
                  <button
                    onClick={onLogout}
                    className="w-full px-3 py-2.5 rounded-lg hover:bg-[#E53E3E]/10 text-[#E53E3E] text-sm font-semibold text-left transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
