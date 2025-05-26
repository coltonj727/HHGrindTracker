import { useState } from 'react';
import { X } from 'lucide-react';
import { RESERVE_ANIMALS } from '../data/species';

interface AddGrindModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (species: string, map: string) => void;
}

export function AddGrindModal({ isOpen, onClose, onAdd }: AddGrindModalProps) {
  const [selectedMap, setSelectedMap] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSpecies && selectedMap) {
      onAdd(selectedSpecies, selectedMap);
      setSelectedMap('');
      setSelectedSpecies('');
      onClose();
    }
  };

  const availableSpecies = selectedMap ? RESERVE_ANIMALS[selectedMap] || [] : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-slate-800 w-full max-w-md rounded-t-xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Add New Grind</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Map
            </label>
            <select
              value={selectedMap}
              onChange={(e) => {
                setSelectedMap(e.target.value);
                setSelectedSpecies('');
              }}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white"
              required
            >
              <option value="">Select a map</option>
              {Object.keys(RESERVE_ANIMALS).map(map => (
                <option key={map} value={map}>{map}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Species
            </label>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white"
              disabled={!selectedMap}
              required
            >
              <option value="">Select a species</option>
              {availableSpecies.map(species => (
                <option key={species} value={species}>{species}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Add Grind
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
