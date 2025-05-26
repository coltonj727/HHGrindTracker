import { MapPin, Plus, Minus, Crown } from 'lucide-react';
import { Grind } from '../types';
import { GREAT_ONE_SPECIES } from '../data/species';

interface GrindCardProps {
  grind: Grind;
  onAddKill: () => void;
  onRemoveKill: () => void;
  onAddDiamond: () => void;
  onRemoveDiamond: () => void;
  onAddRare: () => void;
  onRemoveRare: () => void;
  onMarkGO: () => void;
}

export function GrindCard({
  grind,
  onAddKill,
  onRemoveKill,
  onAddDiamond,
  onRemoveDiamond,
  onAddRare,
  onRemoveRare,
  onMarkGO
}: GrindCardProps) {
  // Calculate the percentage rates you want!
  const diamondRate = grind.kills > 0 ? ((grind.diamonds / grind.kills) * 100).toFixed(1) : "0.0";
  const rareRate = grind.kills > 0 ? ((grind.rares / grind.kills) * 100).toFixed(1) : "0.0";
  
  const hasGreatOne = GREAT_ONE_SPECIES.includes(grind.species);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-4 hover:border-green-500 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{grind.species}</h3>
          <p className="text-slate-400 flex items-center text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            {grind.map}
          </p>
        </div>
        {grind.goHarvested && (
          <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Great One ✓
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Regular Kills */}
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Kills</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onRemoveKill}
                disabled={grind.kills === 0}
                className="bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:opacity-50 text-white w-6 h-6 rounded flex items-center justify-center"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={onAddKill}
                className="bg-green-600 hover:bg-green-700 text-white w-6 h-6 rounded flex items-center justify-center"
              >
                <Plus className="w-3 h-3" />
              </button>
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
              <button
                onClick={onRemoveDiamond}
                disabled={grind.diamonds === 0}
                className="bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:opacity-50 text-white w-6 h-6 rounded flex items-center justify-center"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={onAddDiamond}
                className="bg-cyan-600 hover:bg-cyan-700 text-white w-6 h-6 rounded flex items-center justify-center"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="text-2xl font-bold text-cyan-400">{grind.diamonds}</div>
        </div>

        {/* Rares WITH RATE */}
        <div className="bg-purple-900/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-purple-300 text-sm">Rares</span>
              <div className="text-xs text-purple-400">{rareRate}% rate</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onRemoveRare}
                disabled={grind.rares === 0}
                className="bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:opacity-50 text-white w-6 h-6 rounded flex items-center justify-center"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={onAddRare}
                className="bg-purple-600 hover:bg-purple-700 text-white w-6 h-6 rounded flex items-center justify-center"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-400">{grind.rares}</div>
        </div>

        {/* Great One Button */}
        <div className="flex items-center justify-center">
          {!grind.goHarvested && hasGreatOne && (
            <button
              onClick={onMarkGO}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-center"
            >
              <Crown className="w-4 h-4" />
              Mark GO
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
