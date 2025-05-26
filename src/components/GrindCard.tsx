import { LocalGrind } from "@/lib/storage";
import { SoundButton } from "@/components/ui/sound-button";
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
  // Calculate rates
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
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Rest of your existing grind card content */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Kills */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Kills</span>
            <div className="flex items-center gap-2">
              <SoundButton
                onClick={() => onRemoveKill(grind)}
                disabled={grind.kills === 0}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white w-6 h-6 rounded"
              >
                <Minus className="w-3 h-3" />
              </SoundButton>
              <SoundButton
                onClick={() => onAddKill(grind)}
                className="bg-green-600 hover:bg-green-700 text-white w-6 h-6 rounded"
              >
                <Plus className="w-3 h-3" />
              </SoundButton>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{grind.kills}</div>
        </div>

        {/* Diamonds WITH RATE */}
        <div className="bg-cyan-900/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-cyan-300 text-sm">Diamonds</span>
              <div className="text-xs text-cyan-400">{diamondRate}% rate</div>
            </div>
            <div className="flex items-center gap-2">
              <SoundButton
                onClick={() => onRemoveDiamond(grind)}
                disabled={grind.diamonds === 0}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white w-6 h-6 rounded"
              >
                <Minus className="w-3 h-3" />
              </SoundButton>
              <SoundButton
                onClick={() => onAddDiamond(grind)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white w-6 h-6 rounded"
              >
                <Plus className="w-3 h-3" />
              </SoundButton>
            </div>
          </div>
          <div className="text-2xl font-bold text-cyan-400">{grind.diamonds}</div>
        </div>

        {/* Continue with your existing grind card content... */}
      </div>
    </div>
  );
}
