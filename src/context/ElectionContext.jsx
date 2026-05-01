import { useState, createContext, useContext } from 'react';
import { regions } from '../data/mockData';

const ElectionContext = createContext();

export const useElectionData = () => useContext(ElectionContext);

export const ElectionProvider = ({ children }) => {
  const [simulationState, setSimulationState] = useState({
    nationalSwing: 0,
    turnoutChange: 0,
    regionSwings: regions.reduce((acc, region) => ({ ...acc, [region.id]: 0 }), {}),
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const updateSimulation = (key, value) => {
    setSimulationState(prev => ({ ...prev, [key]: value }));
  };

  const updateRegionSwing = (regionId, value) => {
    setSimulationState(prev => ({
      ...prev,
      regionSwings: { ...prev.regionSwings, [regionId]: value }
    }));
  };

  const calculateProjection = () => {
    let projectedBjp = 0;
    let projectedInc = 0;
    let projectedOthers = 0;

    regions.forEach(region => {
      const swingBjp = simulationState.nationalSwing + (simulationState.regionSwings[region.id] || 0);
      const seatShift = Math.round((swingBjp / 100) * region.seats * 2);
      
      let newBjp = region.currentSplit.bjp + seatShift;
      let newInc = region.currentSplit.inc - seatShift;
      
      if (newBjp < 0) { newInc += Math.abs(newBjp); newBjp = 0; }
      if (newInc < 0) { newBjp += Math.abs(newInc); newInc = 0; }
      
      const totalBjpInc = newBjp + newInc;
      const originalBjpInc = region.currentSplit.bjp + region.currentSplit.inc;
      
      if (totalBjpInc !== originalBjpInc && originalBjpInc > 0) {
        const ratio = originalBjpInc / (totalBjpInc || 1);
        newBjp = Math.round(newBjp * ratio);
        newInc = Math.round(newInc * ratio);
      }

      if (newBjp + newInc + region.currentSplit.others > region.seats) {
          const diff = (newBjp + newInc + region.currentSplit.others) - region.seats;
          if (newBjp > newInc) newBjp = Math.max(0, newBjp - diff);
          else newInc = Math.max(0, newInc - diff);
      }

      projectedBjp += newBjp;
      projectedInc += newInc;
      projectedOthers += region.currentSplit.others;
    });

    return { bjp: projectedBjp, inc: projectedInc, others: projectedOthers };
  };

  return (
    <ElectionContext.Provider value={{
      simulationState,
      updateSimulation,
      updateRegionSwing,
      projectedResults: calculateProjection(),
      activeTab,
      setActiveTab
    }}>
      {children}
    </ElectionContext.Provider>
  );
};
