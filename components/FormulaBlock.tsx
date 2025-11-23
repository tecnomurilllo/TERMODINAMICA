import React from 'react';
import { MachineType } from '../types';

interface FormulaBlockProps {
  type: MachineType;
  efficiency?: number;
  tc?: number;
  tf?: number;
}

export const FormulaBlock: React.FC<FormulaBlockProps> = ({ type, efficiency = 0, tc = 0, tf = 0 }) => {
  
  const formatEff = (val: number, isPerc: boolean) => 
    isPerc ? `${(val * 100).toFixed(1)}%` : val.toFixed(2);

  return (
    <div className="flex flex-col gap-3">
      
      {/* Primer Principio - Common */}
      <div className="bg-slate-50 rounded border border-slate-200 p-2 text-center">
        <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Balance Energético</span>
        <span className="font-serif text-slate-700">Q₁ = W + Q₂</span>
      </div>

      {type === MachineType.MOTOR && (
        <div className="space-y-3">
          <FormulaBox 
            label="Rendimiento (η)" 
            formula={<>η = <Fraction num="W" den="Q₁" /> = <Fraction num="Q₁ - Q₂" den="Q₁" /></>}
            description="Eficiencia real"
          />
          <FormulaBox 
            label="Ciclo de Carnot (Ideal)" 
            formula={<>η = 1 - <Fraction num="T₂" den="T₁" /></>}
            description="Máximo teórico"
            isIdeal
            resultValue={formatEff(efficiency, true)}
          />
        </div>
      )}

      {type === MachineType.FRIDGE && (
        <div className="space-y-3">
          <FormulaBox 
            label="Eficiencia Frigorífica (COP)" 
            formula={<>ε = <Fraction num="Q₂" den="W" /> = <Fraction num="Q₂" den="Q₁ - Q₂" /></>}
            description="Lo que sacas (frío) / Lo que cuesta"
          />
          <FormulaBox 
            label="Ciclo de Carnot (Ideal)" 
            formula={<>ε = <Fraction num="T₂" den="T₁ - T₂" /></>}
            description="Máximo teórico"
            isIdeal
            resultValue={formatEff(efficiency, false)}
          />
        </div>
      )}

      {type === MachineType.PUMP && (
        <div className="space-y-3">
          <FormulaBox 
            label="Eficiencia Calorífica (COP)" 
            formula={<>ε = <Fraction num="Q₁" den="W" /> = <Fraction num="Q₁" den="Q₁ - Q₂" /></>}
            description="Lo que aportas (calor) / Lo que cuesta"
          />
           <FormulaBox 
            label="Ciclo de Carnot (Ideal)" 
            formula={<>ε = <Fraction num="T₁" den="T₁ - T₂" /></>}
            description="Máximo teórico"
            isIdeal
            resultValue={formatEff(efficiency, false)}
          />
        </div>
      )}
    </div>
  );
};

// Helper for fraction styling
const FormulaBox: React.FC<{
  label: string, 
  formula: React.ReactNode, 
  description: string, 
  isIdeal?: boolean,
  resultValue?: string
}> = ({label, formula, description, isIdeal, resultValue}) => (
  <div className={`relative rounded-lg border p-3 ${isIdeal ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}`}>
    <div className="flex justify-between items-start mb-2">
      <div className={`text-[10px] font-bold uppercase ${isIdeal ? 'text-yellow-700' : 'text-blue-700'}`}>{label}</div>
      {resultValue && (
        <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${isIdeal ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
          {resultValue}
        </span>
      )}
    </div>
    <div className="text-center text-lg font-serif text-slate-800 mb-1">
      {formula}
    </div>
    <div className="text-[10px] text-center text-slate-500 italic border-t border-slate-200/50 pt-1 mt-2">
      {description}
    </div>
  </div>
);

// Component for fraction layout
const Fraction = ({num, den}: {num: React.ReactNode, den: React.ReactNode}) => (
  <div className="inline-flex flex-col items-center align-middle mx-1">
    <span className="border-b border-slate-800 px-1">{num}</span>
    <span>{den}</span>
  </div>
);