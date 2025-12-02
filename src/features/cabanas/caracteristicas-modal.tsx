import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
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
import type { Caracteristica } from "@/types";

interface CaracteristicasModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caracteristicas: Caracteristica[];
  onAdd: (data: { nombre: string; descripcion?: string }) => void;
  onEdit: (id: string, data: { nombre: string; descripcion?: string }) => void;
  onDelete: (id: string) => void;
}

export const CaracteristicasModal: React.FC<CaracteristicasModalProps> = ({
  open,
  onOpenChange,
  caracteristicas,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) return;

    if (editingId) {
      onEdit(editingId, {
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || undefined,
      });
      setEditingId(null);
    } else {
      onAdd({
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || undefined,
      });
    }

    setNombre("");
    setDescripcion("");
  };

  const startEdit = (caracteristica: Caracteristica) => {
    setEditingId(caracteristica.id);
    setNombre(caracteristica.nombre);
    setDescripcion(caracteristica.descripcion || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNombre("");
    setDescripcion("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gestionar Características</DialogTitle>
          <p className="text-sm text-[#718096] mt-1">
            Administra el pool de características disponibles para las cabañas
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Form to add/edit */}
          <form
            onSubmit={handleSubmit}
            className="neu-card-subtle rounded-2xl p-4 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  placeholder="ej: Piscina"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="descripcion">Descripción (opcional)</Label>
                <Input
                  id="descripcion"
                  placeholder="ej: Piscina climatizada"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                variant="confirm"
                size="sm"
                className="flex-1"
              >
                {editingId ? (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Actualizar
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </>
                )}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="cancel"
                  size="sm"
                  onClick={cancelEdit}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>

          {/* List of characteristics */}
          <div>
            <h4 className="text-sm font-semibold text-[#2D3748] mb-3">
              Características existentes ({caracteristicas.length})
            </h4>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {caracteristicas.length === 0 ? (
                <div className="neu-card-subtle rounded-xl p-8 text-center">
                  <p className="text-[#718096]">
                    No hay características creadas aún
                  </p>
                </div>
              ) : (
                caracteristicas.map((caracteristica) => (
                  <div
                    key={caracteristica.id}
                    className={`neu-card-subtle rounded-xl p-4 flex items-start justify-between gap-4 transition-all ${
                      editingId === caracteristica.id
                        ? "ring-2 ring-[#3182CE]"
                        : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-[#2D3748] truncate">
                        {caracteristica.nombre}
                      </h5>
                      {caracteristica.descripcion && (
                        <p className="text-sm text-[#718096] mt-1">
                          {caracteristica.descripcion}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        type="button"
                        variant="icon"
                        size="icon"
                        onClick={() => startEdit(caracteristica)}
                        className="w-10 h-10"
                      >
                        <Edit className="w-4 h-4 text-[#3182CE]" />
                      </Button>
                      <Button
                        type="button"
                        variant="icon"
                        size="icon"
                        onClick={() => {
                          if (
                            confirm(`¿Eliminar "${caracteristica.nombre}"?`)
                          ) {
                            onDelete(caracteristica.id);
                          }
                        }}
                        className="w-10 h-10"
                      >
                        <Trash2 className="w-4 h-4 text-[#E53E3E]" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
