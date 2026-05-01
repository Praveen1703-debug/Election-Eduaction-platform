import { useElectionData } from '../context/ElectionContext';
import { actualResults2024, educationalInfo } from '../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { AlertCircle, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const { projectedResults } = useElectionData();
  const [selectedPartyInfo, setSelectedPartyInfo] = useState(null);

  const data = [
    { id: 'BJP', name: 'Bharatiya Janata Party (NDA)', value: projectedResults.bjp, color: '#f97316' },
    { id: 'INC', name: 'Indian National Congress (I.N.D.I.A)', value: projectedResults.inc, color: '#3b82f6' },
    { id: 'OTH', name: 'Others / Regional Parties', value: projectedResults.others, color: '#22c55e' },
  ];

  const totalSeats = 543;
  const majorityMark = 272;
  const leadingParty = [...data].sort((a, b) => b.value - a.value)[0];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Live Intelligence Dashboard</h1>
        <p className="text-slate-500 mt-2">Real-time projection based on current simulation parameters for the 543 Lok Sabha seats.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
        {data.map((party) => (
          <div 
            key={party.id} 
            className="glass-panel p-6 relative overflow-hidden group cursor-pointer"
            onClick={() => setSelectedPartyInfo(educationalInfo[party.id])}
            role="listitem"
            aria-label={`Seat projection for ${party.name}`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-transform group-hover:scale-110`} style={{ backgroundColor: party.color }}></div>
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 max-w-[80%]">{party.name}</h3>
              {educationalInfo[party.id] && <BookOpen className="w-4 h-4 text-slate-400 hover:text-primary-500" title="Click for party info" />}
            </div>
            
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold font-heading" style={{ color: party.color }}>{party.value}</span>
              <span className="text-sm text-slate-400 mb-1">Seats</span>
            </div>
            <div className="mt-4 text-xs font-medium flex items-center gap-1">
              {party.id === 'BJP' && (
                <span className={party.value >= actualResults2024.bjp ? 'text-green-500' : 'text-red-500'}>
                  {party.value >= actualResults2024.bjp ? '▲' : '▼'} {Math.abs(party.value - actualResults2024.bjp)} from 2024
                </span>
              )}
              {party.id === 'INC' && (
                <span className={party.value >= actualResults2024.inc ? 'text-green-500' : 'text-red-500'}>
                  {party.value >= actualResults2024.inc ? '▲' : '▼'} {Math.abs(party.value - actualResults2024.inc)} from 2024
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedPartyInfo && (
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 p-4 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
          <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-primary-900 dark:text-primary-100">{selectedPartyInfo.fullName}</h3>
              <button onClick={() => setSelectedPartyInfo(null)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1"><span className="font-semibold">Ideology:</span> {selectedPartyInfo.ideology}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Founded:</span> {selectedPartyInfo.founded}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6 flex items-center justify-between">
            <span>Seat Distribution Projection</span>
            <span className="text-xs bg-slate-100 dark:bg-dark-bg px-2 py-1 rounded text-slate-500 font-mono">Total: {totalSeats}</span>
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center flex-wrap gap-x-6 gap-y-2">
            {data.map(item => (
              <div key={item.id} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span>{item.id}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Strategic Insights</h2>
          <div className="space-y-4 flex-1">
            <div className="p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50">
              <h4 className="text-sm font-semibold text-primary-800 dark:text-primary-300 mb-1 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Power Status
              </h4>
              <p className="text-sm text-primary-700 dark:text-primary-400">
                {leadingParty.value >= majorityMark 
                  ? `${leadingParty.name} crosses the majority mark (${majorityMark}) with ${leadingParty.value} seats to form the government.` 
                  : `Hung parliament. ${leadingParty.name} is the single largest party but needs ${majorityMark - leadingParty.value} more seats for majority.`}
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border">
              <h4 className="text-sm font-semibold mb-1">Key Battleground Shift</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Current simulation shows high volatility in Uttar Pradesh and Maharashtra. Adjust regional swings in the Simulator to test scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
