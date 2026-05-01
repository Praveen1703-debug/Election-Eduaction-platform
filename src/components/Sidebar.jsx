import { Activity, BarChart3, Settings, TrendingUp, Search, BookOpen, HelpCircle, Bot } from 'lucide-react';
import { useElectionData } from '../context/ElectionContext';
import clsx from 'clsx';

export default function Sidebar() {
  const { activeTab, setActiveTab } = useElectionData();

  const navItems = [
    { id: 'dashboard', icon: Activity, label: 'Live Dashboard' },
    { id: 'simulator', icon: Settings, label: 'Simulation Engine' },
    { id: 'analyzer', icon: Search, label: 'Exit Poll Analyzer' },
    { id: 'historical', icon: BarChart3, label: 'Historical Trends' },
    { id: 'state-history', icon: BookOpen, label: 'State History (Edu)' },
    { id: 'assistant', icon: HelpCircle, label: 'Democracy Guide' },
    { id: 'ai-assistant', icon: Bot, label: 'AI Advisor' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-dark-surface border-r border-slate-200 dark:border-dark-border h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-200 dark:border-dark-border">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-heading font-bold text-xl">
          <TrendingUp className="w-6 h-6" />
          <span>CivicIntel</span>
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">Predictive Election Platform</p>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-surface-hover"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-primary-600 dark:text-primary-400" : "")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-bg/50">
        <div className="text-xs text-center text-slate-500">
          <p>Real-Time Intelligence System</p>
          <p className="mt-1 opacity-75">v1.0.0-beta</p>
        </div>
      </div>
    </aside>
  );
}
