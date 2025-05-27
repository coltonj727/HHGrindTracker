import { grindStorage } from "@/lib/storage";

export default function Stats() {
  const grinds = grindStorage.getGrinds();
  
  const totalKills = grinds.reduce((sum, grind) => sum + grind.kills, 0);
  const totalDiamonds = grinds.reduce((sum, grind) => sum + grind.diamonds, 0);
  const totalRares = grinds.reduce((sum, grind) => sum + grind.rares, 0);
  const greatOnes = grinds.filter(g => g.goHarvested).length;

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">Statistics</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold text-white">{totalKills}</div>
            <div className="text-slate-400">Total Kills</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold text-cyan-400">{totalDiamonds}</div>
            <div className="text-cyan-400">Diamonds</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-400">{totalRares}</div>
            <div className="text-purple-400">Rares</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-400">{greatOnes}</div>
            <div className="text-yellow-400">Great Ones</div>
          </div>
        </div>
      </div>
    </div>
  );
}
