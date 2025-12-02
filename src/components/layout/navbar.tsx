import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <button className="md:hidden mr-4">
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">
            Sistema de Gestión de Cabañas
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Admin</span>
        </div>
      </div>
    </header>
  );
}
