import React from 'react';
import { ThermoBanner } from './components/ThermoBanner';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 flex flex-col items-center">
      <header className="mb-8 text-center max-w-2xl">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Recursos Docentes: Tecnología Industrial</h1>
        <p className="text-slate-600">Herramienta interactiva para la comprensión de los ciclos termodinámicos básicos, rendimiento y eficiencia energética.</p>
      </header>

      <div className="w-full">
        <ThermoBanner />
      </div>

      <footer className="mt-12 text-center text-slate-400 text-sm">
        <p>© 2024 Departamento de Tecnología. Basado en apuntes de Juan Antonio Pérez Rodríguez.</p>
      </footer>
    </div>
  );
}

export default App;