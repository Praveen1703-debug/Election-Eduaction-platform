import { useElectionData } from './context/ElectionContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Simulator from './components/Simulator';
import Analyzer from './components/Analyzer';
import Historical from './components/Historical';
import StateHistory from './components/StateHistory';
import CivicAssistant from './components/CivicAssistant';
import AIAssistant from './components/AIAssistant';

function MainContent() {
  const { activeTab } = useElectionData();

  return (
    <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen bg-slate-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'simulator' && <Simulator />}
        {activeTab === 'analyzer' && <Analyzer />}
        {activeTab === 'historical' && <Historical />}
        {activeTab === 'state-history' && <StateHistory />}
        {activeTab === 'assistant' && <CivicAssistant />}
        {activeTab === 'ai-assistant' && <AIAssistant />}
      </div>
    </main>
  );
}

function App() {
  return (
    <div className="flex w-full h-screen font-sans text-slate-900 dark:text-slate-100 selection:bg-primary-500 selection:text-white">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
