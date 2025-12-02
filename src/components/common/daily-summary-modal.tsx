import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ResumenDiario } from "@/types";

export function ResumenDiarioModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [resumen, setResumen] = useState<ResumenDiario | null>(null);

  useEffect(() => {
    // TODO: Fetch resumen diario from API
    // Si hay eventos, setIsOpen(true) y setResumen(data)
    const mockResumen: ResumenDiario = {
      fecha: new Date().toISOString(),
      checkIns: [],
      checkOuts: [],
      reservasPendientesVencen: [],
    };

    // Solo mostrar si hay eventos
    const hayEventos =
      mockResumen.checkIns.length > 0 ||
      mockResumen.checkOuts.length > 0 ||
      mockResumen.reservasPendientesVencen.length > 0;

    if (hayEventos) {
      setResumen(mockResumen);
      setIsOpen(true);
    }
  }, []);

  if (!isOpen || !resumen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Resumen del Día</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {resumen.checkIns.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Check-ins de Hoy</h3>
              <p className="text-muted-foreground">
                {resumen.checkIns.length} reservas
              </p>
            </div>
          )}

          {resumen.checkOuts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Check-outs de Hoy</h3>
              <p className="text-muted-foreground">
                {resumen.checkOuts.length} reservas
              </p>
            </div>
          )}

          {resumen.reservasPendientesVencen.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Reservas Pendientes que Vencen
              </h3>
              <p className="text-muted-foreground">
                {resumen.reservasPendientesVencen.length} reservas
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
