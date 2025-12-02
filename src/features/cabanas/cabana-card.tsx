import { useState } from "react";
import { Edit, Trash2, Users, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmDialog } from "@/components/common/delete-confirm-dialog";
import type { Cabana } from "@/types";

interface CabanaCardProps {
  cabana: Cabana;
  onEdit: (cabana: Cabana) => void;
  onDelete: (id: string) => void;
}

export const CabanaCard: React.FC<CabanaCardProps> = ({
  cabana,
  onEdit,
  onDelete,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(cabana.id);
  };
  return (
    <>
      <Card variant="subtle" className="hover:shadow-lg transition-all">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Home className="w-5 h-5 text-[#181F54] shrink-0" />
                <h3 className="font-bold text-[#2D3748] text-lg truncate">
                  {cabana.nombre}
                </h3>
              </div>
              <Badge variant={cabana.activa ? "success" : "error"}>
                {cabana.activa ? "Activa" : "Inactiva"}
              </Badge>
            </div>

            <div className="flex gap-2 shrink-0 ml-2">
              <Button
                variant="icon"
                size="icon"
                onClick={() => onEdit(cabana)}
                className="w-10 h-10"
              >
                <Edit className="w-4 h-4 text-[#181F54]" />
              </Button>
              <Button
                variant="icon"
                size="icon"
                onClick={() => setDeleteDialogOpen(true)}
                className="w-10 h-10"
              >
                <Trash2 className="w-4 h-4 text-[#E53E3E]" />
              </Button>
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-center gap-2 mb-4 text-[#718096]">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">
              Capacidad: {cabana.capacidad} personas
            </span>
          </div>

          {/* Características */}
          {cabana.caracteristicas.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#718096] uppercase tracking-wide mb-2">
                Características
              </p>
              <div className="flex flex-wrap gap-2">
                {cabana.caracteristicas.map((caracteristica) => (
                  <span
                    key={caracteristica.id}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[#181F54]/10 text-[#181F54]"
                  >
                    {caracteristica.nombre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {cabana.caracteristicas.length === 0 && (
            <p className="text-sm text-[#718096] italic">
              Sin características asignadas
            </p>
          )}
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="¿Estás seguro que deseas eliminar esta cabaña?"
        description={`Se eliminará la cabaña "${cabana.nombre}" permanentemente.`}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
