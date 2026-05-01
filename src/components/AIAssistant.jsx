import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, HelpCircle, Info, Database } from 'lucide-react';
import { useElectionData } from '../context/ElectionContext';
import { educationalInfo, actualResults2024 } from '../data/mockData';
import { statePoliticalHistory } from '../data/stateHistoryData';

export default function AIAssistant() {
  const { projectedResults, regions } = useElectionData();
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      content: "Hello! I am your CivicIntel Advisor. Ask me anything about Indian political parties, state histories, election processes, or current seat projections." 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI "Thinking"
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Projections / Data Queries
    if (q.includes('seats') || q.includes('who is winning') || q.includes('projection') || q.includes('majority')) {
      const majority = 272;
      const leading = projectedResults.bjp > projectedResults.inc ? 'BJP (NDA)' : 'INC (I.N.D.I.A)';
      const leadingSeats = Math.max(projectedResults.bjp, projectedResults.inc);
      
      return `Based on the current simulation:
      - BJP (NDA): ${projectedResults.bjp} seats
      - INC (I.N.D.I.A): ${projectedResults.inc} seats
      - Others: ${projectedResults.others} seats
      
      The majority mark is ${majority}. Currently, ${leading} is leading with ${leadingSeats} projected seats.`;
    }

    // 2. Party Specific Queries
    for (const [key, info] of Object.entries(educationalInfo)) {
      if (q.includes(key.toLowerCase()) || q.includes(info.fullName.toLowerCase())) {
        return `The ${info.fullName} (${key}) was founded in ${info.founded}. Its core ideology is ${info.ideology}. In the 2024 actual results, they secured ${actualResults2024[key.toLowerCase()] || 'a significant number of'} seats.`;
      }
    }

    // 3. State History Queries
    for (const [key, state] of Object.entries(statePoliticalHistory)) {
      if (q.includes(state.name.toLowerCase()) || (key.length > 1 && q.includes(key))) {
        return `Politics in ${state.name}: ${state.description.substring(0, 200)}... It has ${state.mpSeats} Lok Sabha seats and ${state.mlaSeats} Assembly seats. Key parties include: ${state.keyParties.join(', ')}.`;
      }
    }

    // 4. Process Queries
    if (q.includes('vote') || q.includes('register') || q.includes('how to') || q.includes('step')) {
      return "To vote in India, you must be 18+ and have your name in the electoral roll. The process involves: 1. Registration (Form 6), 2. Checking the Roll, 3. Going to the polling booth with a valid ID, and 4. Casting your vote on the EVM.";
    }

    // 5. Default
    return "I'm not quite sure I have specific data on that. You can ask me about seat counts, party ideologies, state political histories (like UP or Bihar), or the voting process!";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Bot className="w-8 h-8 text-primary-500" />
          CivicIntel AI Advisor
        </h1>
        <p className="text-slate-500 mt-2">
          Ask questions based on the platform's dataset and educational modules.
        </p>
      </header>

      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        {/* Chat window */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 dark:bg-dark-bg/20"
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-200'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-tl-none'
              }`}>
                {msg.content.split('\n').map((line, j) => (
                  <p key={j} className={j > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-200">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border p-4 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        <div className="p-4 bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border overflow-x-auto flex gap-2 whitespace-nowrap scrollbar-hide">
          <button 
            onClick={() => setInput("Who is leading in the current simulation?")}
            className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-primary-900/30 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-dark-border transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-primary-500" /> Current Leader?
          </button>
          <button 
            onClick={() => setInput("What is the ideology of BJP?")}
            className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-primary-900/30 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-dark-border transition-colors flex items-center gap-1.5"
          >
            <Info className="w-3 h-3 text-primary-500" /> BJP Ideology
          </button>
          <button 
            onClick={() => setInput("Tell me about politics in Uttar Pradesh")}
            className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-primary-900/30 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-dark-border transition-colors flex items-center gap-1.5"
          >
            <Database className="w-3 h-3 text-primary-500" /> UP Politics
          </button>
          <button 
            onClick={() => setInput("How to register as a voter?")}
            className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-primary-900/30 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-dark-border transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-3 h-3 text-primary-500" /> How to Vote?
          </button>
        </div>

        {/* Input area */}
        <form 
          onSubmit={handleSend}
          className="p-4 bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border"
        >
          <div className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projections, states, or party info..."
              className="flex-1 bg-slate-100 dark:bg-dark-bg border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-lg shadow-primary-500/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
