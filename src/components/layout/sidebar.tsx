import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Home,
  Users,
  DollarSign,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Calendar, label: "Calendario", path: "/calendario" },
  { icon: FileText, label: "Reservas", path: "/reservas" },
  { icon: Users, label: "Clientes", path: "/clientes" },
  { icon: Home, label: "Cabañas", path: "/cabanas" },
  { icon: DollarSign, label: "Tarifas", path: "/tarifas" },
  { icon: FileText, label: "Reportes", path: "/reportes" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r bg-card pt-16">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
