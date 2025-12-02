import { useState } from "react";
import { Plus, Settings, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CabanaCard,
  CabanaFormModal,
  CaracteristicasModal,
} from "@/features/cabanas";
import { useCabanas } from "@/hooks/use-cabanas";
import type { Cabana } from "@/types";

export function CabanasPage() {
  const {
    cabanas,
    caracteristicas,
    isLoading,
    createCabana,
    updateCabana,
    deleteCabana,
    createCaracteristica,
    updateCaracteristica,
    deleteCaracteristica,
  } = useCabanas();

  const [showCabanaModal, setShowCabanaModal] = useState(false);
  const [showCaracteristicasModal, setShowCaracteristicasModal] =
    useState(false);
  const [editingCabana, setEditingCabana] = useState<Cabana | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  // Filtros
  const filteredCabanas = cabanas.filter((cabana) => {
    const matchesSearch = cabana.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && cabana.activa) ||
      (filterStatus === "inactive" && !cabana.activa);
    return matchesSearch && matchesStatus;
  });

  const handleCreateCabana = (data: any) => {
    createCabana(data);
    setShowCabanaModal(false);
  };

  const handleUpdateCabana = (data: any) => {
    if (editingCabana) {
      updateCabana(editingCabana.id, data);
      setEditingCabana(undefined);
      setShowCabanaModal(false);
    }
  };

  const handleEdit = (cabana: Cabana) => {
    setEditingCabana(cabana);
    setShowCabanaModal(true);
  };

  const handleCloseModal = () => {
    setShowCabanaModal(false);
    setEditingCabana(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#3182CE] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[#718096] font-medium">Cargando cabañas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D3748]">
            Gestión de Cabañas
          </h1>
          <p className="text-[#718096] mt-1">
            Administra las cabañas y sus características
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowCaracteristicasModal(true)}
            className="flex-1 sm:flex-none"
          >
            <Settings className="w-4 h-4 mr-2" />
            Características
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowCabanaModal(true)}
            className="flex-1 sm:flex-none"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Cabaña
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="neu-card-subtle rounded-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
            <Input
              type="text"
              placeholder="Buscar cabaña por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#718096] shrink-0" />
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterStatus === "all" ? "confirm" : "secondary"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                Todas
              </Button>
              <Button
                variant={filterStatus === "active" ? "confirm" : "secondary"}
                size="sm"
                onClick={() => setFilterStatus("active")}
              >
                Activas
              </Button>
              <Button
                variant={filterStatus === "inactive" ? "confirm" : "secondary"}
                size="sm"
                onClick={() => setFilterStatus("inactive")}
              >
                Inactivas
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="neu-card-subtle rounded-2xl p-4">
          <p className="text-xs font-semibold text-[#718096] uppercase tracking-wide mb-1">
            Total
          </p>
          <p className="text-2xl font-bold text-[#2D3748]">{cabanas.length}</p>
        </div>
        <div className="neu-card-subtle rounded-2xl p-4">
          <p className="text-xs font-semibold text-[#718096] uppercase tracking-wide mb-1">
            Activas
          </p>
          <p className="text-2xl font-bold text-[#38A169]">
            {cabanas.filter((c) => c.activa).length}
          </p>
        </div>
        <div className="neu-card-subtle rounded-2xl p-4">
          <p className="text-xs font-semibold text-[#718096] uppercase tracking-wide mb-1">
            Inactivas
          </p>
          <p className="text-2xl font-bold text-[#E53E3E]">
            {cabanas.filter((c) => !c.activa).length}
          </p>
        </div>
        <div className="neu-card-subtle rounded-2xl p-4">
          <p className="text-xs font-semibold text-[#718096] uppercase tracking-wide mb-1">
            Características
          </p>
          <p className="text-2xl font-bold text-[#3182CE]">
            {caracteristicas.length}
          </p>
        </div>
      </div>

      {/* Cabañas Grid */}
      {filteredCabanas.length === 0 ? (
        <div className="neu-card rounded-2xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="neu-card-subtle rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-10 h-10 text-[#718096]" />
            </div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-2">
              {searchTerm || filterStatus !== "all"
                ? "No se encontraron cabañas"
                : "No hay cabañas registradas"}
            </h3>
            <p className="text-[#718096] mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Comienza agregando tu primera cabaña al sistema"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Button
                variant="primary"
                onClick={() => setShowCabanaModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear primera cabaña
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCabanas.map((cabana) => (
            <CabanaCard
              key={cabana.id}
              cabana={cabana}
              onEdit={handleEdit}
              onDelete={deleteCabana}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <CabanaFormModal
        open={showCabanaModal}
        onOpenChange={handleCloseModal}
        cabana={editingCabana}
        caracteristicas={caracteristicas}
        onSubmit={editingCabana ? handleUpdateCabana : handleCreateCabana}
      />

      <CaracteristicasModal
        open={showCaracteristicasModal}
        onOpenChange={setShowCaracteristicasModal}
        caracteristicas={caracteristicas}
        onAdd={createCaracteristica}
        onEdit={updateCaracteristica}
        onDelete={deleteCaracteristica}
      />
    </div>
  );
}
