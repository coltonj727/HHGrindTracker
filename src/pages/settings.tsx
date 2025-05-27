import { useState } from "react";
import { ArrowLeft, User, Trash2, Download } from "lucide-react";
import { grindStorage } from "@/lib/storage";
import { Link } from "wouter";

export default function Settings() {
  const grinds = grindStorage.getGrinds();

  const handleExportData = () => {
    const data = {
      grinds: grindStorage.getGrinds(),
      kills: grindStorage.getKills(),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `headhunter-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to delete ALL hunting data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const totalDiamonds = grinds.reduce((sum, grind) => sum + grind.diamonds, 0);
  const greatOnesHarvested = grinds.filter(grind => grind.goHarvested).length;

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <button className="text-slate-400 hover:text-white px-3 py-1 rounded">
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                Back
              </button>
            </Link>
            <h1 className="text-xl font-bold text-white">Settings & Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Stats */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hunter Profile</h2>
              <p className="text-slate-400">Your COTW hunting statistics</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{grinds.length}</div>
              <div className="text-xs text-slate-400">Active Grinds</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{totalDiamonds}</div>
              <div className="text-xs text-cyan-400">Diamonds</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{greatOnesHarvested}</div>
              <div className="text-xs text-yellow-400">Great Ones</div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Data Management</h3>
          
          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="w-full border border-slate-600 text-slate-300 hover:bg-slate-700 px-4 py-3 rounded-lg flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Hunting Data
            </button>
            
            <button
              onClick={handleClearAllData}
              className="w-full border border-red-600 text-red-400 hover:bg-red-600/10 px-4 py-3 rounded-lg flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">About HeadHunter</h3>
          <div className="space-y-2 text-sm text-slate-400">
            <p>Version 1.0.0</p>
            <p>Professional COTW hunting progress tracker</p>
            <p>Featuring all 16 authentic game reserves</p>
            <p>Built for serious hunters who track their diamond rates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
