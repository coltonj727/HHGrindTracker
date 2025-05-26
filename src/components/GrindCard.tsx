import { LocalGrind } from "@/lib/storage";
import { MapPin, Plus, Minus, BarChart3, Crown, Diamond, Trash2, MoreVertical } from "lucide-react";
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
  
  // Calculate rates
  const diamondRate = grind.kills > 0 ? ((grind.diamonds / grind.kills) * 100).toFixed(1) : "0.0";
  const rareRate = grind.kills > 0 ? ((grind.rares / grind.kills) * 100).toFixed(1) : "0.0";
  
  // Great One species list
  const GREAT_ONE_SPECIES = [
    "Whitetail Deer", "Red Deer", "Black Bear", "Moose",
    "Fallow Deer", "Red Fox", "Ring-Necked Pheasant", "Himalayan Tahr"
  ];
  
  const hasGreatOne = GREAT_ONE_SPECIES.includes(grind.species);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 mb-4 touch-action-manipulation">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">{grind.species}</h3>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-400 hover:text-white p-1"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      onViewDetails(grind);
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-left text-white hover:bg-gray-600"
                  >
                    <BarChart3 className="w-4 h-4 mr-3" />
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      onDelete(grind);
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-left text-red-400 hover:bg-gray-600"
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    Delete Grind
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-gray-400 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{grind.map}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{grind.kills}</div>
              <div className="text-xs text-gray-400">Kills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{grind.diamonds}</div>
              <div className="text-xs text-cyan-400">Diamonds ({diamondRate}%)</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">{grind.rares}</div>
              <div className="text-xs text-purple-400">Rares ({rareRate}%)</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-400">{grind.trolls}</div>
              <div className="text-xs text-orange-400">Trolls</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Kill Tracking */}
        <div className="flex items-center justify-between bg-gray-700 rounded-lg p-2">
          <button
            onClick={() => onRemoveKill(grind)}
            className="text-red-400 hover:text-red-300 p-1"
            disabled={grind.kills <= 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-white font-medium">Kills</span>
          <button
            onClick={() => onAddKill(grind)}
            className="text-green-400 hover:text-green-300 p-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Diamond Tracking */}
        <div className="flex items-center justify-between bg-gray-700 rounded-lg p-2">
          <button
            onClick={() => onRemoveDiamond(grind)}
            className="text-red-400 hover:text-red-300 p-1"
            disabled={grind.diamonds <= 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-cyan-400 font-medium">
            <Diamond className="w-4 h-4" />
          </span>
          <button
            onClick={() => onAddDiamond(grind)}
            className="text-green-400 hover:text-green-300 p-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Rare Tracking */}
        <div className="flex items-center justify-between bg-gray-700 rounded-lg p-2">
          <button
            onClick={() => onRemoveRare(grind)}
            className="text-red-400 hover:text-red-300 p-1"
            disabled={grind.rares <= 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-purple-400 font-medium text-sm">Rare</span>
          <button
            onClick={() => onAddRare(grind)}
            className="text-green-400 hover:text-green-300 p-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Troll and GO Row */}
      <div className="grid grid-cols-2 gap-2">
        {/* Troll Tracking */}
        <div className="flex items-center justify-between bg-gray-700 rounded-lg p-2">
          <button
            onClick={() => onRem
