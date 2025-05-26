import { useState } from 'react';
import { Home, Target, BarChart3, User, Plus } from 'lucide-react';
import { GrindCard } from './components/GrindCard';
import { AddGrindModal } from './components/AddGrindModal';
import { useGrinds } from './hooks/useGrinds';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const { grinds, addGrind, updateGrind } = useGrinds();

  const handleAddKill = (grindId: number) => {
    const grind = grinds.find(g => g.id === grindId);
    if (grind) {
      updateGrind(grindId, { kills: grind.kills + 1 });
    }
  };

  const handleRemoveKill = (grindId: number) => {
    const grind = grinds.find(g => g.id === grindId);
    if (grind && grind.kills > 0) {
      updateGrind(grindId, { kills: grind.kills - 1 });
    }
  };

  const handleAddDiamond = (grindId: number) => {
    const grind = grinds.find(g => g.id === grindId);
    if (grind) {
      updateGrind(grindId, { diamonds: grind.diamonds + 1 });
    }
  };

  const handleRemoveDiamond = (grindId: number) => {
    const grind = grinds.find(g => g.id === grindId);
    if (grind && grind.diamonds > 0) {
      updateGrind(grindId, { diamonds: grind.diamonds - 1 });
    }
  };

  const handleAddRare = (grindId: number) => {
    const grind = grinds.find(g => g.id === grindId);
    if (grind) {
      updateGrind(grindId, { rares: grind.rares + 1 });
    }
  };

  const handleRemoveRare = (grindId: number) => {
    const grind = grinds.find(g => g.id === grindId);
    if (grind && grind.rares > 0) {
      updateGrind(grindId, { rares: grind.rares - 1 });
    }
  };

  const handleMarkGO = (grindId: number) => {
    updateGrind(grindId, { goHarvested: true });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-400">HeadHunter Tracker</h1>
            <p className="text-slate-400 text-sm">Call of the Wild</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Active Grinds</h2>
            {grinds.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">No grinds yet. Add your first grind!</p>
              </div>
            ) : (
              grinds.map(grind => (
                <GrindCard
                  key={grind.id}
                  grind={grind}
                  onAddKill={() => handleAddKill(grind.id)}
                  onRemoveKill={() => handleRemoveKill(grind.id)}
                  onAddDiamond={() => handleAddDiamond(grind.id)}
                  onRemoveDiamond={() => handleRemoveDiamond(grind.id)}
                  onAddRare={() => handleAddRare(grind.id)}
                  onRemoveRare={() => handleRemoveRare(grind.id)}
                  onMarkGO={() => handleMarkGO(grind.id)}
                />
              ))
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700">
        <div className="flex justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center p-2 rounded ${
              activeTab === 'home' ? 'text-green-400' : 'text-slate-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('grinds')}
            className={`flex flex-col items-center p-2 rounded ${
              activeTab === 'grinds' ? 'text-green-400' : 'text-slate-400'
            }`}
          >
            <Target className="w-6 h-6" />
            <span className="text-xs mt-1">Grinds</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex flex-col items-center p-2 rounded ${
              activeTab === 'stats' ? 'text-green-400' : 'text-slate-400'
            }`}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs mt-1">Stats</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center p-2 rounded ${
              activeTab === 'profile' ? 'text-green-400' : 'text-slate-400'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>

      <AddGrindModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addGrind}
      />
    </div>
  );
}

export default App;
