import { LocalGrind } from "@/lib/storage";
import { MapPin, Plus, Minus, BarChart3, Crown, Diamond, Trash2, MoreVertical } from "lucide-react";
import { hasGreatOne } from "@/lib/species-data";
import { useState } from "react";

interface GrindCardProps {
  grind: LocalGrind;
  onAddKill: (grind: LocalGrind) => void;
  onRemoveKill: (grind: LocalGrind) => void;
  onAddDiamond: (grind: LocalGrind) => void;
  onRemoveDiamond: (grind: LocalGrind) => void;
  onAddRare: (grind: LocalGrind) => void;
  onRemoveRare: (grind: LocalGrind) => void;
  onAddTroll: (grind: LocalGrind) => void;
  onRemoveTroll: (grind: LocalGrind) => void;
  onViewDetails: (grind: LocalGrind) => void;
  onMarkGO?: (grind: LocalGrind) => void;
  onDelete: (grind: LocalGrind) => void;
}

export function GrindCard({ grind, onAddKill, onRemoveKill, onAddDiamond, onRemoveDiamond, onAddRare, onRemoveRare, onAddTroll, onRemoveTroll, onViewDetails, onMarkGO, onDelete }: GrindCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const diamondRate = grind.kills > 0 ? ((grind.diamonds / grind.kills) * 100).toFixed(1) : "0.0";
  const rareRate = grind.kills > 0 ? ((grind.rares / grind.kills) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-4 hover:border-green-500 transition-colors">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{grind.species}</h3>
          <p className="text-sm text-gray-400 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{grind.map}</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {grind.diamonds > 0 && (
            <span className="bg-gold/20 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              {grind.diamonds} 💎
            </span>
          )}
          {grind.goHarvested && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              GO ✓
            </span>
          )}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-white p-1"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2 z-10">
                <button
                  onClick={() => {
                    onDelete(grind);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 text-red-400 hover:text-red-300 px-3 py-1 rounded text-sm w-full"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
