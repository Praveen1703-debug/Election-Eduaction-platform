import React, { createContext, useContext, useState, useMemo } from 'react';
import { regions as initialRegions } from '../data/mockData';

const ElectionContext = createContext();

export const useElectionData = () => useContext(ElectionContext);

export const ElectionProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [regions] = useState(initialRegions);
  const [simulationState, setSimulationState] = useState({
    nationalSwing: 0,
    turnoutChange: 0,
    regionSwings: regions.reduce((acc, region) => ({ ...acc, [region.id]: 0 }), {}),
  });

  const projectedResults = useMemo(() => {
    let bjp = 0;
    let inc = 0;
    let others = 0;

    regions.forEach(region => {
      const swingBjp = simulationState.nationalSwing + (simulationState.regionSwings[region.id] || 0);
      const seatShift = Math.round((swingBjp / 100) * region.seats * 2);
      
      let newBjp = Math.max(0, region.currentSplit.bjp + seatShift);
      let newInc = Math.max(0, region.currentSplit.inc - seatShift);
      
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

      bjp += newBjp;
      inc += newInc;
      others += region.currentSplit.others;
    });

    return { bjp, inc, others };
  }, [simulationState, regions]);

  const updateSimulation = (key, value) => {
    setSimulationState(prev => ({ ...prev, [key]: value }));
  };

  const updateRegionSwing = (regionId, swing) => {
    setSimulationState(prev => ({
      ...prev,
      regionSwings: { ...prev.regionSwings, [regionId]: swing }
    }));
  };

  const resetSimulation = () => {
    setSimulationState({
      nationalSwing: 0,
      turnoutChange: 0,
      regionSwings: regions.reduce((acc, region) => ({ ...acc, [region.id]: 0 }), {}),
    });
  };

  return (
    <ElectionContext.Provider value={{
      activeTab,
      setActiveTab,
      regions,
      simulationState,
      projectedResults,
      updateSimulation,
      updateRegionSwing,
      resetSimulation
    }}>
      {children}
    </ElectionContext.Provider>
  );
};
