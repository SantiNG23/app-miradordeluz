import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
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
    m2: number;
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
  const [m2, setM2] = useState(cabana?.m2.toString() || "");
  const [activa, setActiva] = useState(cabana?.activa ?? true);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState<
    string[]
  >(cabana?.caracteristicas.map((c) => c.id) || []);
  const [hasChanges, setHasChanges] = useState(false);
  const [capacidadError, setCapacidadError] = useState("");
  const [m2Error, setM2Error] = useState("");

  // Validar capacidad
  const handleCapacidadChange = (value: string) => {
    // Permitir solo números
    if (value === "" || /^\d+$/.test(value)) {
      setCapacidad(value);
      setCapacidadError("");

      // Validar rango
      if (value && parseInt(value) > 20) {
        setCapacidadError("La capacidad máxima es 20 personas");
      } else if (value && parseInt(value) < 1) {
        setCapacidadError("La capacidad mínima es 1 persona");
      }
    } else {
      setCapacidadError("Solo se permiten números");
    }
  };

  // Validar m2
  const handleM2Change = (value: string) => {
    // Permitir solo números
    if (value === "" || /^\d+$/.test(value)) {
      setM2(value);
      setM2Error("");

      // Validar rango
      if (value && parseInt(value) > 1000) {
        setM2Error("La cabaña no puede tener más de 1000 m²");
      } else if (value && parseInt(value) < 1) {
        setM2Error("La cabaña debe tener al menos 1 m²");
      }
    } else {
      setM2Error("Solo se permiten números");
    }
  };

  // Detectar cambios cuando el modal se abre
  useEffect(() => {
    if (open && !cabana) {
      // Nueva cabaña - no hay cambios iniciales
      setHasChanges(false);
    }
  }, [open, cabana]);

  // Monitorear cambios
  useEffect(() => {
    if (!cabana) {
      // Para nuevas cabañas, hay cambios si hay algo escrito
      setHasChanges(nombre.trim() !== "" || capacidad !== "" || m2 !== "");
    } else {
      // Para edición, hay cambios si los datos actuales difieren de los originales
      const originalCaracteristicasIds = cabana.caracteristicas.map(
        (c) => c.id
      );
      const caracteristicasChanged =
        selectedCaracteristicas.length !== originalCaracteristicasIds.length ||
        !selectedCaracteristicas.every((id) =>
          originalCaracteristicasIds.includes(id)
        );

      setHasChanges(
        nombre !== cabana.nombre ||
          capacidad !== cabana.capacidad.toString() ||
          m2 !== cabana.m2.toString() ||
          activa !== cabana.activa ||
          caracteristicasChanged
      );
    }
  }, [nombre, capacidad, m2, activa, selectedCaracteristicas, cabana]);

  const isFormValid =
    nombre.trim() &&
    capacidad &&
    m2 &&
    !capacidadError &&
    !m2Error &&
    parseInt(capacidad) >= 1 &&
    parseInt(capacidad) <= 20 &&
    parseInt(m2) >= 1 &&
    parseInt(m2) <= 1000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    onSubmit({
      nombre: nombre.trim(),
      capacidad: parseInt(capacidad),
      m2: parseInt(m2),
      activa,
      caracteristicaIds: selectedCaracteristicas,
    });

    // Reset form
    setNombre("");
    setCapacidad("");
    setM2("");
    setActiva(true);
    setSelectedCaracteristicas([]);
    setCapacidadError("");
    setM2Error("");
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
              placeholder="ej: 4"
              value={capacidad}
              onChange={(e) => handleCapacidadChange(e.target.value)}
              required
              className={capacidadError ? "border-red-500" : ""}
            />
            {capacidadError && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {capacidadError}
              </div>
            )}
          </div>

          {/* Metros Cuadrados */}
          <div>
            <Label htmlFor="m2">Metros cuadrados (m²)</Label>
            <Input
              id="m2"
              placeholder="ej: 65"
              value={m2}
              onChange={(e) => handleM2Change(e.target.value)}
              required
              className={m2Error ? "border-red-500" : ""}
            />
            {m2Error && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {m2Error}
              </div>
            )}
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
              disabled={!isFormValid || (cabana ? !hasChanges : false)}
            >
              {cabana ? "Guardar cambios" : "Crear cabaña"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
