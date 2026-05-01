import { useElectionData } from '../context/ElectionContext';
import { regions } from '../data/mockData';
import { Sliders, RefreshCw } from 'lucide-react';

export default function Simulator() {
  const { simulationState, updateSimulation, updateRegionSwing, projectedResults } = useElectionData();

  const handleReset = () => {
    updateSimulation('nationalSwing', 0);
    regions.forEach(r => updateRegionSwing(r.id, 0));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Sliders className="w-8 h-8 text-primary-500" /> 
          Predictive Simulation Engine
        </h1>
        <p className="text-slate-500 mt-2">Adjust parameters to simulate "What-If" scenarios in real-time.</p>
      </header>

      <div className="glass-panel p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Macro Parameters</h2>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Reset All
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-slate-700 dark:text-slate-300">National Vote Swing (BJP vs INC)</label>
              <span className="font-mono bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                {simulationState.nationalSwing > 0 ? '+' : ''}{simulationState.nationalSwing}%
              </span>
            </div>
            <input 
              type="range" 
              min="-15" 
              max="15" 
              step="0.5"
              value={simulationState.nationalSwing}
              onChange={(e) => updateSimulation('nationalSwing', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>Favors INC (-15%)</span>
              <span>Neutral (0%)</span>
              <span>Favors BJP (+15%)</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">State Micro-Swings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-96 overflow-y-auto pr-2 pb-4">
        {regions.map(region => (
          <div key={region.id} className="glass-panel p-4">
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="font-medium text-sm truncate max-w-[120px]" title={region.name}>{region.name}</h3>
                <p className="text-[10px] text-slate-500">{region.seats} Seats</p>
              </div>
              <span className="font-mono bg-slate-100 dark:bg-dark-bg px-2 py-0.5 rounded text-xs h-fit">
                {simulationState.regionSwings[region.id] > 0 ? '+' : ''}{simulationState.regionSwings[region.id] || 0}%
              </span>
            </div>
            <input 
              type="range" 
              min="-15" 
              max="15" 
              step="1"
              value={simulationState.regionSwings[region.id] || 0}
              onChange={(e) => updateRegionSwing(region.id, parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600 dark:accent-slate-400"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-br from-primary-900 to-indigo-900 rounded-xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <h3 className="text-lg font-semibold mb-2 relative z-10">Scenario Output</h3>
        <p className="text-primary-200 text-sm mb-6 relative z-10">Based on your parameters, the projected outcome shifts to:</p>
        
        <div className="flex gap-8 relative z-10">
          <div>
            <div className="text-xs text-primary-300 uppercase tracking-wider mb-1">BJP (NDA)</div>
            <div className="text-3xl font-bold font-heading">{projectedResults.bjp} <span className="text-lg font-normal opacity-70">seats</span></div>
          </div>
          <div>
            <div className="text-xs text-primary-300 uppercase tracking-wider mb-1">INC (I.N.D.I.A)</div>
            <div className="text-3xl font-bold font-heading">{projectedResults.inc} <span className="text-lg font-normal opacity-70">seats</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
