import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GrindCard } from "@/components/GrindCard";
import { AddGrindModal } from "@/components/AddGrindModal";
import { grindStorage, LocalGrind } from "@/lib/storage";

export default function Home() {
  const [grinds, setGrinds] = useState<LocalGrind[]>(grindStorage.getGrinds());
  const [showAddModal, setShowAddModal] = useState(false);

  const refreshGrinds = () => {
    setGrinds(grindStorage.getGrinds());
  };

  const handleAddKill = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { kills: grind.kills + 1 });
    refreshGrinds();
  };

  const handleRemoveKill = (grind: LocalGrind) => {
    if (grind.kills > 0) {
      grindStorage.updateGrind(grind.id, { kills: grind.kills - 1 });
      refreshGrinds();
    }
  };

  const handleAddDiamond = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { diamonds: grind.diamonds + 1 });
    refreshGrinds();
  };

  const handleRemoveDiamond = (grind: LocalGrind) => {
    if (grind.diamonds > 0) {
      grindStorage.updateGrind(grind.id, { diamonds: grind.diamonds - 1 });
      refreshGrinds();
    }
  };

  const handleAddRare = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { rares: grind.rares + 1 });
    refreshGrinds();
  };

  const handleRemoveRare = (grind: LocalGrind) => {
    if (grind.rares > 0) {
      grindStorage.updateGrind(grind.id, { rares: grind.rares - 1 });
      refreshGrinds();
    }
  };

  const handleAddTroll = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { trolls: grind.trolls + 1 });
    refreshGrinds();
  };

  const handleRemoveTroll = (grind: LocalGrind) => {
    if (grind.trolls > 0) {
      grindStorage.updateGrind(grind.id, { trolls: grind.trolls - 1 });
      refreshGrinds();
    }
  };

  const handleViewDetails = (grind: LocalGrind) => {
    console.log("View details for:", grind);
  };

  const handleMarkGO = (grind: LocalGrind) => {
    grindStorage.updateGrind(grind.id, { goHarvested: true });
    refreshGrinds();
  };

  const handleDeleteGrind = (grind: LocalGrind) => {
    if (confirm(`Are you sure you want to delete the ${grind.species} grind?`)) {
      grindStorage.deleteGrind(grind.id);
      refreshGrinds();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-green-400">Active Grinds</h1>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Grind
          </Button>
        </div>

        <div className="grid gap-4">
          {grinds.map((grind) => (
            <GrindCard
              key={grind.id}
              grind={grind}
              onAddKill={handleAddKill}
              onRemoveKill={handleRemoveKill}
              onAddDiamond={handleAddDiamond}
              onRemoveDiamond={handleRemoveDiamond}
              onAddRare={handleAddRare}
              onRemoveRare={handleRemoveRare}
              onAddTroll={handleAddTroll}
              onRemoveTroll={handleRemoveTroll}
              onViewDetails={handleViewDetails}
              onMarkGO={handleMarkGO}
              onDelete={handleDeleteGrind}
            />
          ))}
        </div>

        <AddGrindModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={(species: string, map: string) => {
            grindStorage.createGrind({
              species,
              map,
              kills: 0,
              diamonds: 0,
              rares: 0,
              trolls: 0,
              goHarvested: false
            });
            refreshGrinds();
            setShowAddModal(false);
          }}
        />
      </div>
    </div>
  );
}
