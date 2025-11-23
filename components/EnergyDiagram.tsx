import React from 'react';
import { MachineType } from '../types';

interface EnergyDiagramProps {
  type: MachineType;
  q1: number;
  q2: number;
  w: number;
}

export const EnergyDiagram: React.FC<EnergyDiagramProps> = ({ type, q1, q2, w }) => {
  const isMotor = type === MachineType.MOTOR;
  
  // Visual Configuration
  const redColor = "#ef4444"; // Hot
  const blueColor = "#3b82f6"; // Cold
  const workColor = "#eab308"; // Work
  const machineColor = "#374151";

  // Formatter for energy values (integer)
  const fmt = (val: number) => `${Math.round(val)}`;

  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded flex flex-col items-center justify-between select-none">
      
      {/* FOCO CALIENTE Label */}
      <div className="w-full text-center py-1">
        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
          FOCO CALIENTE (T₁)
        </span>
      </div>

      <div className="relative w-full flex-1 flex items-center justify-center">
        <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id={`arrow-red-${type}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 L0,0" fill={redColor} />
            </marker>
            <marker id={`arrow-blue-${type}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 L0,0" fill={blueColor} />
            </marker>
            <marker id={`arrow-work-${type}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 L0,0" fill={workColor} />
            </marker>
          </defs>

          {/* Machine Circle */}
          <circle cx="100" cy="80" r="25" fill="white" stroke={machineColor} strokeWidth="2" />
          <text x="100" y="83" textAnchor="middle" className="text-[10px] font-bold fill-gray-600 font-sans">
            {isMotor ? 'MTD' : 'MTI'}
          </text>

          {isMotor ? (
            <>
              {/* Q1: Hot -> Machine */}
              <path d="M 100 10 L 100 50" stroke={redColor} strokeWidth="3" markerEnd={`url(#arrow-red-${type})`} />
              <text x="105" y="30" fill={redColor} className="text-[9px] font-bold">Q₁: {fmt(q1)} J</text>

              {/* Q2: Machine -> Cold */}
              <path d="M 100 110 L 100 150" stroke={blueColor} strokeWidth="3" markerEnd={`url(#arrow-blue-${type})`} />
              <text x="105" y="140" fill={blueColor} className="text-[9px] font-bold">Q₂: {fmt(q2)} J</text>

              {/* Work: Machine -> Out */}
              <path d="M 125 80 L 170 80" stroke={workColor} strokeWidth="3" markerEnd={`url(#arrow-work-${type})`} />
              <text x="145" y="70" fill={workColor} textAnchor="middle" className="text-[9px] font-bold">W: {fmt(w)} J</text>
            </>
          ) : (
            <>
              {/* Q1: Machine -> Hot */}
              <path d="M 100 50 L 100 10" stroke={redColor} strokeWidth="3" markerEnd={`url(#arrow-red-${type})`} />
              <text x="105" y="30" fill={redColor} className="text-[9px] font-bold">Q₁: {fmt(q1)} J</text>

              {/* Q2: Cold -> Machine */}
              <path d="M 100 150 L 100 110" stroke={blueColor} strokeWidth="3" markerEnd={`url(#arrow-blue-${type})`} />
              <text x="105" y="140" fill={blueColor} className="text-[9px] font-bold">Q₂: {fmt(q2)} J</text>

              {/* Work: In -> Machine */}
              <path d="M 30 80 L 70 80" stroke={workColor} strokeWidth="3" markerEnd={`url(#arrow-work-${type})`} />
              <text x="50" y="70" fill={workColor} textAnchor="middle" className="text-[9px] font-bold">W: {fmt(w)} J</text>
            </>
          )}

        </svg>
      </div>

      {/* FOCO FRIO Label */}
      <div className="w-full text-center py-1">
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
          FOCO FRÍO (T₂)
        </span>
      </div>

    </div>
  );
};