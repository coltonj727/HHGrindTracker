import { LocalGrind } from "@/lib/storage";

interface SpeciesStatsProps {
  grinds: LocalGrind[];
}

export function SpeciesStats({ grinds }: SpeciesStatsProps) {
  // Group grinds by species and calculate totals
  const speciesData = grinds.reduce((acc, grind) => {
    if (!acc[grind.species]) {
      acc[grind.species] = {
        kills: 0,
        diamonds: 0,
        rares: 0,
        trolls: 0,
        greatOnes: 0,
        grinds: 0
      };
    }
    
    acc[grind.species].kills += grind.kills;
    acc[grind.species].diamonds += grind.diamonds;
    acc[grind.species].rares += grind.rares;
    acc[grind.species].trolls += grind.trolls;
    acc[grind.species].greatOnes += grind.goHarvested ? 1 : 0;
    acc[grind.species].grinds += 1;
    
    return acc;
  }, {} as Record<string, {
    kills: number;
    diamonds: number;
    rares: number;
    trolls: number;
    greatOnes: number;
    grinds: number;
  }>);

  const sortedSpecies = Object.entries(speciesData)
    .sort(([,a], [,b]) => b.kills - a.kills);

  if (sortedSpecies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">No hunting data yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Species Statistics</h3>
      
      {sortedSpecies.map(([species, stats]) => {
        const diamondRate = stats.kills > 0 ? ((stats.diamonds / stats.kills) * 100).toFixed(1) : "0.0";
        const rareRate = stats.kills > 0 ? ((stats.rares / stats.kills) * 100).toFixed(1) : "0.0";
        
        return (
          <div key={species} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-white">{species}</h4>
              <span className="text-xs text-slate-400">{stats.grinds} grind{stats.grinds !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{stats.kills}</div>
                <div className="text-xs text-slate-400">Kills</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-cyan-400">{stats.diamonds}</div>
                <div className="text-xs text-cyan-400">{diamondRate}%</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{stats.rares}</div>
                <div className="text-xs text-purple-400">{rareRate}%</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">{stats.trolls}</div>
                <div className="text-xs text-orange-400">Trolls</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400">{stats.greatOnes}</div>
                <div className="text-xs text-yellow-400">Great Ones</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
