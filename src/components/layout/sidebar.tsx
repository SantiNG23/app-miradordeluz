"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  CreditCard,
  BarChart3,
  ChevronDown,
  X,
  CalendarDays,
  List,
  UserCircle,
  History,
  Home,
  DollarSign,
  Clock,
  Scale,
  PieChart,
  FileText,
  Palette,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: "/",
  },
  {
    id: "design-system",
    label: "Design System & UI Kit",
    icon: <Palette className="w-5 h-5" />,
    path: "/design-system",
  },
  {
    id: "reservations",
    label: "Reservaciones",
    icon: <Calendar className="w-5 h-5" />,
    subItems: [
      {
        id: "calendar-view",
        label: "Vista Calendario",
        icon: <CalendarDays className="w-4 h-4" />,
        path: "/calendario",
      },
      {
        id: "list-view",
        label: "Vista Lista",
        icon: <List className="w-4 h-4" />,
        path: "/reservas",
      },
    ],
  },
  {
    id: "guests",
    label: "Huéspedes y Clientes",
    icon: <Users className="w-5 h-5" />,
    subItems: [
      {
        id: "client-database",
        label: "Base de Clientes",
        icon: <UserCircle className="w-4 h-4" />,
        path: "/clientes",
      },
      {
        id: "guest-history",
        label: "Historial de Huéspedes",
        icon: <History className="w-4 h-4" />,
        path: "/clientes/historial",
      },
    ],
  },
  {
    id: "management",
    label: "Gestión",
    icon: <Building2 className="w-5 h-5" />,
    subItems: [
      {
        id: "cabins",
        label: "Cabañas y Características",
        icon: <Home className="w-4 h-4" />,
        path: "/cabanas",
      },
      {
        id: "pricing",
        label: "Precios y Temporadas",
        icon: <DollarSign className="w-4 h-4" />,
        path: "/tarifas",
      },
    ],
  },
  {
    id: "finance",
    label: "Finanzas",
    icon: <CreditCard className="w-5 h-5" />,
    subItems: [
      {
        id: "pending-payments",
        label: "Pagos Pendientes",
        icon: <Clock className="w-4 h-4" />,
        path: "/finanzas/pagos",
      },
      {
        id: "daily-balance",
        label: "Balance Diario",
        icon: <Scale className="w-4 h-4" />,
        path: "/finanzas/balance",
      },
    ],
  },
  {
    id: "reports",
    label: "Reportes",
    icon: <BarChart3 className="w-5 h-5" />,
    subItems: [
      {
        id: "occupancy",
        label: "Ocupación",
        icon: <PieChart className="w-4 h-4" />,
        path: "/reportes",
      },
      {
        id: "history",
        label: "Historial",
        icon: <FileText className="w-4 h-4" />,
        path: "/reportes/historial",
      },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isPathActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`
        fixed lg:fixed top-0 lg:top-auto left-0 h-full lg:h-[calc(100vh-73px)] w-72 
        neu-sidebar bg-[#E0E5EC] z-50 lg:z-30
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
    >
      <div className="flex flex-col h-full">
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#c8d0dc]/50">
          <div className="flex items-center gap-2.5">
            <div className="neu-icon-wrap w-9 h-9 rounded-xl flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#3182CE]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-[#2D3748] text-sm">Orvalis</h2>
              <p className="text-[10px] text-[#718096] font-medium">
                Gestión Hotelera
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="neu-button w-9 h-9 rounded-xl flex items-center justify-center"
          >
            <X className="w-4 h-4 text-[#718096]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-5 space-y-2">
          {menuItems.map((item) => {
            const isExpanded = expandedItems.includes(item.id);
            const isActive = item.path ? isPathActive(item.path) : false;

            return (
              <div key={item.id}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "neu-accordion-active text-[#3182CE]"
                        : "neu-button text-[#2D3748] hover:text-[#3182CE]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-semibold text-sm">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      if (item.subItems) {
                        toggleExpand(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                      isExpanded
                        ? "neu-accordion-active text-[#3182CE]"
                        : "neu-button text-[#2D3748] hover:text-[#3182CE]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-semibold text-sm">
                        {item.label}
                      </span>
                    </div>
                    {item.subItems && (
                      <ChevronDown
                        className={`w-4 h-4 text-[#718096] transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                )}

                <div
                  className={`accordion-content ${
                    item.subItems && isExpanded
                      ? "max-h-60 opacity-100 pt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.subItems && (
                    <div className="ml-4 space-y-1 pb-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          onClick={onClose}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
                            isPathActive(subItem.path)
                              ? "bg-[#3182CE]/10 text-[#3182CE] font-semibold"
                              : "text-[#718096] hover:text-[#3182CE] hover:bg-[#3182CE]/5 font-medium"
                          }`}
                        >
                          {subItem.icon}
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="p-5 border-t border-[#c8d0dc]/50">
          <div className="neu-card-level-1 rounded-2xl px-4 py-3.5 flex items-center gap-3">
            <div className="neu-icon-wrap w-10 h-10 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#3182CE]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#2D3748] text-sm">Orvalis</p>
              <p className="text-xs text-[#718096] font-medium">
                Gestión Hotelera v1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
