import { useState } from 'react';
import { statePoliticalHistory } from '../data/stateHistoryData';
import { BookOpen, MapPin, Landmark, Users } from 'lucide-react';
import { educationalInfo } from '../data/mockData';

export default function StateHistory() {
  const [selectedState, setSelectedState] = useState('up');
  const stateData = statePoliticalHistory[selectedState];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary-500" />
          State Political History
        </h1>
        <p className="text-slate-500 mt-2">
          Educational module detailing the political landscape, Assembly (CM) vs Lok Sabha (MP) dynamics, and key regional parties across Indian states.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          <h3 className="font-semibold text-sm text-slate-400 uppercase tracking-wider mb-4">Select Region</h3>
          {Object.entries(statePoliticalHistory).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelectedState(key)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedState === key
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-dark-surface text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-surface-hover border border-slate-200 dark:border-dark-border'
              }`}
            >
              {data.name}
            </button>
          ))}
        </div>

        <div className="md:col-span-3">
          {stateData && (
            <div className="glass-panel p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200 dark:border-dark-border">
                <MapPin className="w-8 h-8 text-primary-500" />
                <div>
                  <h2 className="text-2xl font-bold font-heading">{stateData.name}</h2>
                  <div className="flex gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Landmark className="w-4 h-4" /> {stateData.mpSeats} MP Seats (Lok Sabha)</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {stateData.mlaSeats} MLA Seats (Assembly)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-300 mb-2">Historical Context</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                    {stateData.description}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-dark-bg p-5 rounded-xl border border-slate-200 dark:border-dark-border">
                  <h3 className="text-md font-semibold mb-3">Assembly (CM) Elections Landscape</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stateData.cmElections}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Political Parties in {stateData.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stateData.keyParties.map(partyName => {
                      const partyKey = Object.keys(educationalInfo).find(k => partyName.includes(k)) || partyName;
                      const info = educationalInfo[partyKey];
                      
                      return (
                        <div key={partyName} className="p-4 border border-slate-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface/50">
                          <h4 className="font-bold text-primary-700 dark:text-primary-400">{partyName}</h4>
                          {info ? (
                            <div className="mt-2 text-xs text-slate-500 space-y-1">
                              <p><span className="font-medium text-slate-700 dark:text-slate-300">Full Name:</span> {info.fullName}</p>
                              <p><span className="font-medium text-slate-700 dark:text-slate-300">Ideology:</span> {info.ideology}</p>
                              <p><span className="font-medium text-slate-700 dark:text-slate-300">Founded:</span> {info.founded}</p>
                            </div>
                          ) : (
                            <p className="mt-2 text-xs text-slate-500 italic">Regional stronghold party. Key player in state assembly formation.</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
