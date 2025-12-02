"use client";

import { useState } from "react";
import {
  Percent,
  LogIn,
  LogOut,
  CreditCard,
  X,
  CalendarCheck,
  User,
  Clock,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor: string;
}

function StatCard({ title, value, icon, iconColor }: StatCardProps) {
  return (
    <div className="neu-card rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#718096] text-sm font-semibold uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl md:text-4xl font-bold text-[#2D3748] mt-3">
            {value}
          </p>
        </div>
        <div className="neu-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center">
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  guest: string;
  cabin: string;
  status: "Pendiente" | "Confirmada" | "Check-in" | "Check-out";
  time: string;
}

function ActivityItem({ guest, cabin, status, time }: ActivityItemProps) {
  const statusColors = {
    Pendiente: "bg-[#DD6B20]/15 text-[#DD6B20]",
    Confirmada: "bg-[#38A169]/15 text-[#38A169]",
    "Check-in": "bg-[#3182CE]/15 text-[#3182CE]",
    "Check-out": "bg-[#8b5cf6]/15 text-[#8b5cf6]",
  };

  return (
    <div className="neu-card-subtle rounded-xl p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="neu-pressed w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-[#3182CE]" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[#2D3748] truncate">{guest}</p>
          <p className="text-sm text-[#718096] truncate font-medium">{cabin}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[status]}`}
        >
          {status}
        </span>
        <span className="text-xs text-[#718096] flex items-center gap-1 font-medium">
          <Clock className="w-3 h-3" />
          {time}
        </span>
      </div>
    </div>
  );
}

export default function DashboardContent() {
  const [showAlert, setShowAlert] = useState(true);

  const stats = [
    {
      title: "Ocupación Hoy",
      value: "80%",
      icon: <Percent className="w-6 h-6" />,
      iconColor: "text-[#3182CE]",
    },
    {
      title: "Check-ins Pendientes",
      value: 3,
      icon: <LogIn className="w-6 h-6" />,
      iconColor: "text-[#38A169]",
    },
    {
      title: "Check-outs Pendientes",
      value: 2,
      icon: <LogOut className="w-6 h-6" />,
      iconColor: "text-[#8b5cf6]",
    },
    {
      title: "Cobros por Saldo",
      value: "$1,250",
      icon: <CreditCard className="w-6 h-6" />,
      iconColor: "text-[#DD6B20]",
    },
  ];

  const recentActivity: ActivityItemProps[] = [
    {
      guest: "María García",
      cabin: "Cabaña Luna",
      status: "Check-in",
      time: "10:30 AM",
    },
    {
      guest: "Carlos López",
      cabin: "Cabaña Sol",
      status: "Confirmada",
      time: "11:00 AM",
    },
    {
      guest: "Ana Martínez",
      cabin: "Cabaña Estrella",
      status: "Pendiente",
      time: "02:00 PM",
    },
    {
      guest: "Pedro Sánchez",
      cabin: "Cabaña Bosque",
      status: "Check-out",
      time: "12:00 PM",
    },
    {
      guest: "Laura Fernández",
      cabin: "Cabaña Río",
      status: "Confirmada",
      time: "03:30 PM",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title (Desktop) */}
      <div className="hidden lg:block">
        <h1 className="text-2xl font-bold text-[#2D3748]">Dashboard</h1>
        <p className="text-[#718096] font-medium mt-1">
          Bienvenido al sistema de gestión hotelera
        </p>
      </div>

      {showAlert && (
        <div className="neu-modal rounded-2xl p-6 border-l-4 border-[#3182CE]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="neu-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <CalendarCheck className="w-6 h-6 text-[#3182CE]" />
              </div>
              <div>
                <h3 className="font-bold text-[#2D3748] text-lg">
                  Eventos de Hoy
                </h3>
                <p className="text-sm text-[#718096] font-medium mt-1">
                  <span className="text-[#3182CE] font-semibold">
                    2 Check-ins
                  </span>
                  {" • "}
                  <span className="text-[#8b5cf6] font-semibold">
                    1 Check-out
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="neu-button w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              aria-label="Cerrar alerta"
            >
              <X className="w-4 h-4 text-[#718096]" />
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="neu-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-6">
          Actividad Reciente
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
