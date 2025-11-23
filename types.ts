export enum MachineType {
  MOTOR = 'MOTOR',
  FRIDGE = 'FRIDGE',
  PUMP = 'PUMP'
}

export interface SimulationState {
  tc: number; // Temp Caliente (K)
  tf: number; // Temp Fria (K)
  energyInput: number; // Input Energy (Q1 for Motor, W for Inverse)
}

export interface CalculationResult {
  q1: number; // Heat Hot
  q2: number; // Heat Cold
  w: number;  // Work
  efficiency: number; // n or epsilon
  maxEfficiency: number; // Carnot
}