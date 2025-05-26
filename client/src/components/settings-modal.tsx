import { X, Volume2, VolumeX, Vibrate, Moon, Sun } from 'lucide-react';
import { useTheme } from "@/lib/theme";
import { audioManager } from "@/lib/audio";
import { useState, useEffect } from "react";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [vibrateEnabled, setVibrateEnabled] = useState(true);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-slate-300" /> : <Sun className="w-5 h-5 text-slate-300" />}
              <span className="text-slate-300">Dark Mode</span>
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
              <span className="text-slate-300">Sound Effects</span>
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
              <span className="text-slate-300">Haptic Feedback</span>
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

        <div className="mt-8 pt-6 border-t border-slate-700">
          <p className="text-xs text-slate-500 text-center">
            HeadHunter COTW Tracker v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
