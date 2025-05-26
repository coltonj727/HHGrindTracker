import { useState, useEffect } from "react";
import { ArrowLeft, Volume2, VolumeX, Vibrate, Moon, Sun, User, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { audioManager } from "@/lib/audio";
import { grindStorage } from "@/lib/storage";
import { useGrinds } from "@/hooks/use-grinds";
import { Link } from "wouter";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [vibrateEnabled, setVibrateEnabled] = useState(true);
  const { data: grinds = [] } = useGrinds();

  useEffect(() => {
    setAudioEnabled(audioManager.isEnabled());
    setVibrateEnabled(audioManager.isVibrateEnabled());
  }, []);

  const handleAudioToggle = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    audioManager.setEnabled(newState);
  };

  const handleVibrateToggle = () => {
    const newState = !vibrateEnabled;
    setVibrateEnabled(newState);
    audioManager.setVibrateEnabled(newState);
  };

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

  const totalKills = grinds.reduce((sum, grind) => sum + grind.kills, 0);
  const totalDiamonds = grinds.reduce((sum, grind) => sum + grind.diamonds, 0);
  const totalRares = grinds.reduce((sum, grind) => sum + grind.rares, 0);
  const greatOnesHarvested = grinds.filter(grind => grind.goHarvested).length;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{grinds.length}</div>
              <div className="text-xs text-slate-400">Active Grinds</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalKills}</div>
              <div className="text-xs text-slate-400">Total Kills</div>
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

        {/* App Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">App Settings</h3>
          
          <div className="space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? <Moon className="w-5 h-5 text-slate-300" /> : <Sun className="w-5 h-5 text-slate-300" />}
                <div>
                  <span className="text-slate-300 font-medium">Dark Mode</span>
                  <p className="text-xs text-slate-500">Toggle between light and dark themes</p>
                </div>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-green-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Audio Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {audioEnabled ? <Volume2 className="w-5 h-5 text-slate-300" /> : <VolumeX className="w-5 h-5 text-slate-300" />}
                <div>
                  <span className="text-slate-300 font-medium">Sound Effects</span>
                  <p className="text-xs text-slate-500">Audio feedback for actions</p>
                </div>
              </div>
              <button
                onClick={handleAudioToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  audioEnabled ? 'bg-green-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    audioEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Haptic Feedback Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Vibrate className="w-5 h-5 text-slate-300" />
                <div>
                  <span className="text-slate-300 font-medium">Haptic Feedback</span>
                  <p className="text-xs text-slate-500">Vibration feedback on mobile</p>
                </div>
              </div>
              <button
                onClick={handleVibrateToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  vibrateEnabled ? 'bg-green-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    vibrateEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Data Management</h3>
          
          <div className="space-y-4">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Hunting Data
            </Button>
            
            <Button
              onClick={handleClearAllData}
              variant="outline"
              className="w-full border-red-600 text-red-400 hover:bg-red-600/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
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
