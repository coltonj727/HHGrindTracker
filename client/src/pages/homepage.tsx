import { useState } from "react";
import { Plus, Target, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddGrindModal } from "@/components/add-grind-modal";
import { SettingsModal } from "@/components/settings-modal";
import { SpeciesStats } from "@/components/species-stats";
import { useGrinds, useDeleteGrind } from "@/hooks/use-grinds";
import { LocalGrind } from "@/lib/storage";
import { Link } from "wouter";
import headhunterLogo from "@assets/Photoleap_14_07_2023_20_34_21_IyH2d.jpg";

export default function Homepage() {
  const [showAddGrind, setShowAddGrind] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { data: grinds = [], isLoading } = useGrinds();
  const deleteGrind = useDeleteGrind();

  const totalKills = grinds.reduce((sum, grind) => sum + grind.kills, 0);
  const totalDiamonds = grinds.reduce((sum, grind) => sum + grind.diamonds, 0);
  const totalRares = grinds.reduce((sum, grind) => sum + grind.rares, 0);
  const greatOnesHarvested = grinds.filter(grind => grind.goHarvested).length;
  const activeGrinds = grinds.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading your hunting data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={headhunterLogo} 
                alt="HeadHunter Logo" 
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-green-400">HeadHunter</h1>
                <p className="text-slate-400 text-sm">COTW Grind Tracker</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="text-slate-400 hover:text-white p-2"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{activeGrinds}</div>
            <div className="text-xs text-slate-400">Active Grinds</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{totalKills}</div>
            <div className="text-xs text-slate-400">Total Kills</div>
          </div>
          <div className="bg-cyan-900/50 border border-cyan-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{totalDiamonds}</div>
            <div className="text-xs text-cyan-400">Diamonds</div>
          </div>
          <div className="bg-purple-900/50 border border-purple-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{totalRares}</div>
            <div className="text-xs text-purple-400">Rares</div>
          </div>
          <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{greatOnesHarvested}</div>
            <div className="text-xs text-yellow-400">Great Ones</div>
          </div>
        </div>

        {/* Main Content */}
        {grinds.length === 0 ? (
          <div className="text-center py-16">
            <Target className="w-24 h-24 text-slate-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to HeadHunter!</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Start tracking your Call of the Wild hunting progress across all 16 authentic reserves with detailed statistics and achievement tracking.
            </p>
            <Button
              onClick={() => setShowAddGrind(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start Your First Grind
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setShowAddGrind(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Grind
              </Button>
              <Link href="/grinds">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Target className="w-4 h-4 mr-2" />
                  Manage Grinds
                </Button>
              </Link>
              <Link href="/stats">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Statistics
                </Button>
              </Link>
            </div>

            {/* Species Statistics */}
            <SpeciesStats grinds={grinds} />
          </div>
        )}
      </div>

      {/* Modals */}
      <AddGrindModal
        open={showAddGrind}
        onOpenChange={setShowAddGrind}
      />
      
      <SettingsModal
        open={showSettings}
        onOpenChange={setShowSettings}
      />
    </div>
  );
        }
