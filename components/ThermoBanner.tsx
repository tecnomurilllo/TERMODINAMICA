import React, { useState } from 'react';
import { MachineType } from '../types';
import { EnergyDiagram } from './EnergyDiagram';
import { FormulaBlock } from './FormulaBlock';
import { Settings2 } from 'lucide-react';

export const ThermoBanner: React.FC = () => {
  // Global Simulation State
  const [tc, setTc] = useState(600); // Temp Caliente (K)
  const [tf, setTf] = useState(300); // Temp Fria (K)
  const inputVal = 1000; // Base energy unit for calculation reference

  // Calculate thermodynamic values based on Carnot (Ideal) Cycle
  const calculateMachine = (type: MachineType) => {
    let q1 = 0, q2 = 0, w = 0, eff = 0;

    if (type === MachineType.MOTOR) {
      // MOTOR: Input is Q1. Efficiency = 1 - (T2/T1)
      // We simulate an ideal Carnot engine for the visualization
      eff = 1 - (tf / tc); 
      q1 = inputVal;
      w = q1 * eff;
      q2 = q1 - w;
    } else if (type === MachineType.FRIDGE) {
      // FRIDGE: Input is Work (W). COP = T2 / (T1 - T2)
      // To make numbers comparable visually, let's fix W to a smaller amount
      w = 200; 
      eff = tf / (tc - tf); // COP
      q2 = w * eff;
      q1 = w + q2;
    } else {
      // PUMP: Input is Work (W). COP = T1 / (T1 - T2)
      w = 200;
      eff = tc / (tc - tf); // COP
      q1 = w * eff;
      q2 = q1 - w;
    }

    return { q1, q2, w, eff };
  };

  // Pre-calculate values to pass to components
  const motorVals = calculateMachine(MachineType.MOTOR);
  const fridgeVals = calculateMachine(MachineType.FRIDGE);
  const pumpVals = calculateMachine(MachineType.PUMP);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Termodinámica: Máquinas Térmicas</h1>
            <p className="text-slate-500 text-sm">Comparativa energética interactiva y Ciclo de Carnot</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 bg-slate-50 p-4 rounded-lg border border-slate-100 w-full md:w-auto">
             <div className="flex items-center gap-3">
               <Settings2 className="text-slate-400 w-5 h-5" />
               <div className="flex flex-col">
                 <label className="text-xs font-bold text-red-600 uppercase">Foco Caliente (T₁)</label>
                 <input 
                    type="range" min="400" max="800" step="10" 
                    value={tc} onChange={(e) => setTc(Number(e.target.value))}
                    className="w-32 h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                 />
                 <span className="text-xs text-red-800 font-mono mt-1">{tc} K</span>
               </div>
             </div>
             
             <div className="flex items-center gap-3">
               <div className="flex flex-col">
                 <label className="text-xs font-bold text-blue-600 uppercase">Foco Frío (T₂)</label>
                 <input 
                    type="range" min="200" max="350" step="10" 
                    value={tf} onChange={(e) => setTf(Number(e.target.value))}
                    className="w-32 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 />
                 <span className="text-xs text-blue-800 font-mono mt-1">{tf} K</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Grid Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MOTOR */}
        <MachineCard 
          title="Motor Térmico" 
          subtitle="Máquina Directa"
          description="Transforma calor en trabajo."
          color="border-red-200"
          bgHeader="bg-red-50"
        >
          <EnergyDiagram 
            type={MachineType.MOTOR} 
            q1={motorVals.q1} q2={motorVals.q2} w={motorVals.w}
          />
          <div className="mt-4">
            <FormulaBlock type={MachineType.MOTOR} efficiency={motorVals.eff} tc={tc} tf={tf} />
          </div>
        </MachineCard>

        {/* FRIDGE */}
        <MachineCard 
          title="Máquina Frigorífica" 
          subtitle="Máquina Inversa"
          description="Consume trabajo para enfriar un recinto."
          color="border-blue-200"
          bgHeader="bg-blue-50"
        >
          <EnergyDiagram 
            type={MachineType.FRIDGE} 
            q1={fridgeVals.q1} q2={fridgeVals.q2} w={fridgeVals.w}
          />
          <div className="mt-4">
            <FormulaBlock type={MachineType.FRIDGE} efficiency={fridgeVals.eff} tc={tc} tf={tf} />
          </div>
        </MachineCard>

        {/* PUMP */}
        <MachineCard 
          title="Bomba de Calor" 
          subtitle="Máquina Inversa"
          description="Consume trabajo para calentar un recinto."
          color="border-orange-200"
          bgHeader="bg-orange-50"
        >
          <EnergyDiagram 
            type={MachineType.PUMP} 
            q1={pumpVals.q1} q2={pumpVals.q2} w={pumpVals.w}
          />
          <div className="mt-4">
            <FormulaBlock type={MachineType.PUMP} efficiency={pumpVals.eff} tc={tc} tf={tf} />
          </div>
        </MachineCard>

      </div>
    </div>
  );
};

// Helper Component for the Card Layout
const MachineCard: React.FC<{
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bgHeader: string;
  children: React.ReactNode;
}> = ({ title, subtitle, description, color, bgHeader, children }) => (
  <div className={`bg-white rounded-xl shadow-md border-t-4 ${color} overflow-hidden flex flex-col`}>
    <div className={`${bgHeader} p-4 border-b border-slate-100`}>
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      <div className="flex justify-between items-start mt-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{subtitle}</span>
      </div>
      <p className="text-xs text-slate-600 mt-2 italic">"{description}"</p>
    </div>
    <div className="p-4 flex-1 flex flex-col">
      {children}
    </div>
  </div>
);