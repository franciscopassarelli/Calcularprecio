import React, { useState } from "react";

const CalculadorSueldo = () => {
  const [gastosFijos, setGastosFijos] = useState(0);
  const [ahorro, setAhorro] = useState(0);
  const [horasMensuales, setHorasMensuales] = useState(160); // valor por defecto

  const sueldoMensual = gastosFijos + ahorro;
  const valorHora = horasMensuales > 0 ? sueldoMensual / horasMensuales : 0;

  return (
    <div className="bg-[#faf8f5] rounded-2xl shadow-md p-6 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">¿Cuánto deberías pagarte?</h2>
      <p className="text-center text-sm text-muted mb-6">
        Ingresá tus gastos personales y metas para saber cuánto debería ser tu ingreso mínimo mensual.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Gastos mensuales personales</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="$"
            value={gastosFijos}
            onChange={(e) => setGastosFijos(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ahorro mensual deseado</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="$"
            value={ahorro}
            onChange={(e) => setAhorro(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Horas trabajadas por mes</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="160"
            value={horasMensuales}
            onChange={(e) => setHorasMensuales(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-xl shadow-inner text-center">
        <p className="text-lg font-medium">Sueldo mensual deseado: <span className="font-bold text-blue-600">${sueldoMensual.toFixed(2)}</span></p>
        <p className="text-lg font-medium">Valor por hora: <span className="font-bold text-blue-600">${valorHora.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default CalculadorSueldo;
