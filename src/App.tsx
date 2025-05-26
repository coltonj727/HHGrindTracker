import { useState } from 'react';
import { Plus, Target, BarChart3 } from 'lucide-react';
import { GrindCard } from './components/GrindCard';
import { AddGrindModal } from './components/AddGrindModal';
import { useGrinds } from './hooks/useGrinds';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { grinds, addGrind, updateGrind, deleteGrind } = useGrinds();

  const totalKills = grinds.reduce((sum, grind) => sum + grind.kills, 0);
  const totalDiamonds = grinds.reduce((sum, grind) => sum + grind.diamonds, 0);
  const totalRares = grinds.reduce((sum, grind) => sum + grind.rares, 0);
  const greatOnesHarvested = grinds.filter(grind => grind.goHarvested).length;

  return (
    <div className="min-h-screen bg-slate-900 font-tactical">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-400">HeadHunter</h1>
            <p className="text-slate-400 text-sm">COTW Grind Tracker</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            <div className="bg-slate-700 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-white">{totalKills}</div>
              <div className="text-xs text-slate-400">Kills</div>
            </div>
            <div className="bg-cyan-900/50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-cyan-400">{totalDiamonds}</div>
              <div className="text-xs text-cyan-400">Diamonds</div>
            </div>
            <div className="bg-purple-900/50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-400">{totalRares}</div>
              <div className="text-xs text-purple-400">Rares</div>
            </div>
            <div className="bg-yellow-900/50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-yellow-400">{greatOnesHarvested}</div>
              <div className="text-xs text-yellow-400">Great Ones</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {grinds.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No Grinds Yet</h3>
            <p className="text-slate-500 mb-6">Start tracking your hunting progress</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add First Grind
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {grinds.map(grind => (
              <GrindCard
                key={grind.id}
                grind={grind}
                onAddKill={() => updateGrind(grind.id, { kills: grind.kills + 1 })}
                onRemoveKill={() => updateGrind(grind.id, { kills: Math.max(0, grind.kills - 1) })}
                onAddDiamond={() => updateGrind(grind.id, { diamonds: grind.diamonds + 1 })}
                onRemoveDiamond={() => updateGrind(grind.id, { diamonds: Math.max(0, grind.diamonds - 1) })}
                onAddRare={() => updateGrind(grind.id, { rares: grind.rares + 1 })}
                onRemoveRare={() => updateGrind(grind.id, { rares: Math.max(0, grind.rares - 1) })}
                onMarkGO={() => updateGrind(grind.id, { goHarvested: true })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Button */}
      {grinds.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Modal */}
      <AddGrindModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addGrind}
      />
    </div>
  );
}

export default App;
