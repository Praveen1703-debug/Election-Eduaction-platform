import { exitPollData, actualResults2024, calculateAccuracy } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ErrorBar } from 'recharts';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Analyzer() {
  const chartData = exitPollData.map(poll => ({
    name: poll.agency,
    bjp: (poll.bjp[0] + poll.bjp[1]) / 2,
    inc: (poll.inc[0] + poll.inc[1]) / 2,
    errorBjp: [(poll.bjp[1] - poll.bjp[0]) / 2, (poll.bjp[1] - poll.bjp[0]) / 2],
    errorInc: [(poll.inc[1] - poll.inc[0]) / 2, (poll.inc[1] - poll.inc[0]) / 2],
    accuracy: calculateAccuracy(poll, actualResults2024)
  }));

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Exit Poll Analyzer</h1>
        <p className="text-slate-500 mt-2">Evaluate prediction accuracy against actual outcomes to identify systemic biases.</p>
      </header>

      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-8">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400">Ethical Data Disclaimer</h4>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Exit polls are probabilistic models, not final results. The 'Accuracy Score' is a retrospective metric based on 2024 data and does not guarantee future reliability. Always verify with official Election Commission data.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6">Predictions vs Actual (2024)</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="bjp" name="BJP/NDA Predicted" fill="#f97316" radius={[4, 4, 0, 0]}>
                </Bar>
                <Bar dataKey="inc" name="INC/INDIA Predicted" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface-hover/50">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Agency Trust Scores
            </h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-dark-border flex-1 overflow-auto">
            {chartData.sort((a, b) => b.accuracy - a.accuracy).map((agency, index) => (
              <div key={agency.name} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-dark-surface-hover transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-sm">{agency.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-lg font-bold font-mono ${agency.accuracy > 90 ? 'text-green-500' : agency.accuracy > 80 ? 'text-amber-500' : 'text-red-500'}`}>
                    {agency.accuracy}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
