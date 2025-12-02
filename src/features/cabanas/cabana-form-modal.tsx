import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Cabana, Caracteristica } from "@/types";

interface CabanaFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cabana?: Cabana;
  caracteristicas: Caracteristica[];
  onSubmit: (data: {
    nombre: string;
    capacidad: number;
    activa: boolean;
    caracteristicaIds: string[];
  }) => void;
}

export const CabanaFormModal: React.FC<CabanaFormModalProps> = ({
  open,
  onOpenChange,
  cabana,
  caracteristicas,
  onSubmit,
}) => {
  const [nombre, setNombre] = useState(cabana?.nombre || "");
  const [capacidad, setCapacidad] = useState(
    cabana?.capacidad.toString() || ""
  );
  const [activa, setActiva] = useState(cabana?.activa ?? true);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState<
    string[]
  >(cabana?.caracteristicas.map((c) => c.id) || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !capacidad) {
      return;
    }

    onSubmit({
      nombre: nombre.trim(),
      capacidad: parseInt(capacidad),
      activa,
      caracteristicaIds: selectedCaracteristicas,
    });

    // Reset form
    setNombre("");
    setCapacidad("");
    setActiva(true);
    setSelectedCaracteristicas([]);
  };

  const toggleCaracteristica = (id: string) => {
    setSelectedCaracteristicas((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{cabana ? "Editar Cabaña" : "Nueva Cabaña"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <Label htmlFor="nombre">Nombre de la cabaña</Label>
            <Input
              id="nombre"
              placeholder="ej: Cabaña Los Pinos"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/* Capacidad */}
          <div>
            <Label htmlFor="capacidad">Capacidad (personas)</Label>
            <Input
              id="capacidad"
              type="number"
              min="1"
              max="20"
              placeholder="ej: 4"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
              required
            />
          </div>

          {/* Estado Activa/Inactiva */}
          <div className="flex items-center justify-between neu-card-subtle rounded-xl p-4">
            <div>
              <Label htmlFor="activa" className="mb-0">
                Estado de la cabaña
              </Label>
              <p className="text-xs text-[#718096] mt-1">
                {activa ? "Disponible para reservas" : "Fuera de servicio"}
              </p>
            </div>
            <Switch checked={activa} onCheckedChange={setActiva} />
          </div>

          {/* Características */}
          <div>
            <Label>Características</Label>
            <div className="neu-card-subtle rounded-xl p-4 max-h-[200px] overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {caracteristicas.length === 0 ? (
                  <p className="text-sm text-[#718096] text-center w-full py-4">
                    No hay características disponibles
                  </p>
                ) : (
                  caracteristicas.map((caracteristica) => {
                    const isSelected = selectedCaracteristicas.includes(
                      caracteristica.id
                    );
                    return (
                      <button
                        key={caracteristica.id}
                        type="button"
                        onClick={() => toggleCaracteristica(caracteristica.id)}
                        className={`relative px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                          isSelected
                            ? "bg-[#181F54] text-white shadow-md"
                            : "neu-button-secondary text-[#2D3748]"
                        }`}
                      >
                        {caracteristica.nombre}
                        {isSelected && (
                          <X className="inline-block ml-1 w-3 h-3" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
            <p className="text-xs text-[#718096] mt-2">
              Selecciona las características que tiene esta cabaña
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="cancel"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="confirm"
              disabled={!nombre.trim() || !capacidad}
            >
              {cabana ? "Guardar cambios" : "Crear cabaña"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
