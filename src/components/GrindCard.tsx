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
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {/* Regular Kills */}
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
          <div className="text-slate-300 font-medium">Kills</div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onRemoveKill(grind)}
              className="h-8 w-8 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded flex items-center justify-center disabled:opacity-50"
              disabled={grind.kills === 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
              {grind.kills}
            </span>
            <button
              onClick={() => onAddKill(grind)}
              className="h-8 w-8 bg-green-600/20 border border-green-600 text-green-400 hover:bg-green-600/30 rounded flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Diamonds WITH RATE */}
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
          <div className="flex flex-col">
            <div className="text-cyan-400 font-medium">Diamonds</div>
            <div className="text-sm text-cyan-300 opacity-90">{diamondRate}% rate</div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onRemoveDiamond(grind)}
              className="h-8 w-8 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded flex items-center justify-center disabled:opacity-50"
              disabled={grind.diamonds === 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-bold text-cyan-400 min-w-[3rem] text-center">
              {grind.diamonds}
            </span>
            <button
              onClick={() => onAddDiamond(grind)}
              className="h-8 w-8 bg-cyan-600/20 border border-cyan-600 text-cyan-400 hover:bg-cyan-600/30 rounded flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rares WITH RATE */}
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
          <div className="flex flex-col">
            <div className="text-purple-400 font-medium">Rares</div>
            <div className="text-sm text-purple-300 opacity-90">{rareRate}% rate</div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onRemoveRare(grind)}
              className="h-8 w-8 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded flex items-center justify-center disabled:opacity-50"
              disabled={grind.rares === 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-bold text-purple-400 min-w-[3rem] text-center">
              {grind.rares}
            </span>
            <button
              onClick={() => onAddRare(grind)}
              className="h-8 w-8 bg-purple-600/20 border border-purple-600 text-purple-400 hover:bg-purple-600/30 rounded flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Trolls */}
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
          <div className="text-orange-400 font-medium">Trolls</div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onRemoveTroll(grind)}
              className="h-8 w-8 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded flex items-center justify-center disabled:opacity-50"
              disabled={grind.trolls === 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-bold text-orange-400 min-w-[3rem] text-center">
              {grind.trolls}
            </span>
            <button
              onClick={() => onAddTroll(grind)}
              className="h-8 w-8 bg-orange-600/20 border border-orange-600 text-orange-400 hover:bg-orange-600/30 rounded flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Great One Button */}
        {hasGreatOne(grind.species) && !grind.goHarvested && onMarkGO && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => onMarkGO(grind)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <Crown className="w-4 h-4" />
              Mark Great One
            </button>
          </div>
        )}

        {/* View Details Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => onViewDetails(grind)}
            className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
