import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import CalculadorSueldo from "@/components/CalculadorSueldo";

const CostCalculator = () => {
  // Estados consolidados y corregidos
  const [fixedCosts, setFixedCosts] = useState([{ description: "", amount: 0 }]);
  const [variableCosts, setVariableCosts] = useState([{ description: "", amount: 0 }]);
  const [materials, setMaterials] = useState([{ name: "", quantity: 0, price: 0 }]);
  const [hours, setHours] = useState(0);
  const [rate, setRate] = useState(0);
  const [expenses, setExpenses] = useState([{ description: "", amount: 0 }]);
  const [productCount, setProductCount] = useState(1);

  // Handlers para gastos fijos
  const handleFixedCostChange = (index: number, field: 'description' | 'amount', value: string) => {
    const updated = [...fixedCosts];
    updated[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
    setFixedCosts(updated);
  };

  const addFixedCost = () => {
    setFixedCosts([...fixedCosts, { description: "", amount: 0 }]);
  };

  // Handlers para gastos variables
  const handleVariableCostChange = (index: number, field: 'description' | 'amount', value: string) => {
    const updated = [...variableCosts];
    updated[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
    setVariableCosts(updated);
  };

  const addVariableCost = () => {
    setVariableCosts([...variableCosts, { description: "", amount: 0 }]);
  };

  // Handlers para materiales
  const handleMaterialChange = (index: number, field: 'name' | 'quantity' | 'price', value: string) => {
    const updated = [...materials];
    if (field === 'name') {
      updated[index][field] = value;
    } else {
      updated[index][field] = parseFloat(value) || 0;
    }
    setMaterials(updated);
  };

  const addMaterial = () => {
    setMaterials([...materials, { name: '', quantity: 0, price: 0 }]);
  };

  // Handlers para gastos generales
  const handleExpenseChange = (index: number, field: 'description' | 'amount', value: string) => {
    const updated = [...expenses];
    updated[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
    setExpenses(updated);
  };

  const addExpense = () => {
    setExpenses([...expenses, { description: '', amount: 0 }]);
  };

  // Cálculos
  const totalFixedCosts = fixedCosts.reduce((sum, item) => sum + item.amount, 0);
  const totalVariableCosts = variableCosts.reduce((sum, item) => sum + item.amount, 0);
  const totalMaterials = materials.reduce((sum, m) => sum + (m.quantity * m.price), 0);
  const totalHours = hours * rate;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalCost = totalFixedCosts + totalVariableCosts + totalMaterials + totalHours + totalExpenses;
  const unitCost = productCount > 0 ? totalCost / productCount : 0;

  // Exportar a Excel
  const exportToExcel = () => {
    const wsData = [
      ['CALCULADORA DE COSTOS'],
      [],
      ['Gastos Fijos'],
      ['Descripción', 'Monto'],
      ...fixedCosts.map(item => [item.description, item.amount]),
      ['TOTAL GASTOS FIJOS', totalFixedCosts],
      [],
      ['Gastos Variables'],
      ['Descripción', 'Monto'],
      ...variableCosts.map(item => [item.description, item.amount]),
      ['TOTAL GASTOS VARIABLES', totalVariableCosts],
      [],
      ['Materiales'],
      ['Nombre', 'Cantidad', 'Precio Unitario', 'Subtotal'],
      ...materials.map(m => [m.name, m.quantity, m.price, m.quantity * m.price]),
      ['TOTAL MATERIALES', '', '', totalMaterials],
      [],
      ['Horas de Trabajo'],
      ['Cantidad de Horas', 'Valor por Hora', 'Subtotal'],
      [hours, rate, totalHours],
      [],
      ['Gastos Generales'],
      ['Descripción', 'Monto'],
      ...expenses.map(e => [e.description, e.amount]),
      ['TOTAL GASTOS GENERALES', totalExpenses],
      [],
      ['RESUMEN'],
      ['Cantidad de Productos', productCount],
      ['Costo Total', totalCost],
      ['Costo Unitario Promedio', unitCost]
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Costo');
    XLSX.writeFile(wb, 'CostoCalculado.xlsx');
  };

  const [operationalCosts, setOperationalCosts] = useState([{ descripcion: '', monto: 0 }]);

  const handleAddOperationalCost = () => {
    setOperationalCosts([...operationalCosts, { descripcion: '', monto: 0 }]);
  };
  
  const handleOperationalCostChange = (index: number, field: 'descripcion' | 'monto', value: string | number) => {
    const newCosts = [...operationalCosts];
    newCosts[index][field] = value;
    setOperationalCosts(newCosts);
  };
  
  const totalOperationalCosts = operationalCosts.reduce((acc, item) => acc + (parseFloat(item.monto) || 0), 0);


  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Calculadora de Costos</h2>

      {/* Gastos Fijos */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Gastos Fijos</h3>
        {fixedCosts.map((cost, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Descripción"
              value={cost.description}
              onChange={(e) => handleFixedCostChange(index, "description", e.target.value)}
              className="flex-1 border rounded p-2"
            />
            <div className="flex items-center border rounded px-2">
              <span className="mr-1 text-gray-500">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={cost.amount || ''}
                onChange={(e) => handleFixedCostChange(index, "amount", e.target.value)}
                className="w-24 p-2 focus:outline-none"
              />
            </div>
          </div>
        ))}
        <div className="text-center">
          <Button
            type="button"
            onClick={addFixedCost}
            className="bg-orange-400 hover:bg-orange-500"
          >
            + Agregar gasto fijo
          </Button>
        </div>
        <p className="text-right text-sm text-gray-600">
          Gastos fijos: <span className="font-bold">${totalFixedCosts.toFixed(2)}</span>
        </p>
      </div>

      {/* Gastos Variables */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Gastos Variables</h3>
        {variableCosts.map((cost, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Descripción"
              className="flex-1 p-2 border rounded"
              value={cost.description}
              onChange={(e) => handleVariableCostChange(index, "description", e.target.value)}
            />
            <div className="flex items-center border rounded px-2">
              <span className="mr-1 text-gray-500">$</span>
              <input
                type="number"
                className="w-24 p-2 focus:outline-none"
                value={cost.amount || ''}
                onChange={(e) => handleVariableCostChange(index, "amount", e.target.value)}
              />
            </div>
          </div>
        ))}
        <div className="text-center">
          <Button
            type="button"
            onClick={addVariableCost}
            className="bg-orange-500 hover:bg-orange-600"
          >
            + Agregar gasto variable
          </Button>
        </div>
        <div className="text-right text-sm text-gray-600">
          <span>
            Gastos variables: <strong>${totalVariableCosts.toFixed(2)}</strong>
          </span>
        </div>
      </div>


      {/* Gastos Operacionales */}
      <div className="mb-8">
  <h2 className="text-xl font-semibold mb-4">Gastos operativos</h2>
  {operationalCosts.map((item, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        type="text"
        placeholder="Ej: Canva"
        value={item.descripcion}
        onChange={(e) => handleOperationalCostChange(index, 'descripcion', e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <div className="flex items-center border rounded px-2">
        <span className="mr-1 text-gray-500">$</span>
        <input
          type="number"
          value={item.monto}
          onChange={(e) => handleOperationalCostChange(index, 'monto', parseFloat(e.target.value) || 0)}
          className="w-24 p-2 outline-none"
        />
      </div>
    </div>
  ))}

  <div className="flex flex-col items-center">
    <button
      type="button"
      onClick={handleAddOperationalCost}
      className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded mt-2"
    >
      + Agregar gasto operativo
    </button>

    <p className="mt-3 text-right w-full pr-4 text-sm text-gray-700">
      Gastos operativos: <span className="font-bold">${totalOperationalCosts.toFixed(2)}</span>
    </p>
  </div>
</div>

<h2 className="text-2xl font-bold text-center mb-4 mt-8">Costos para lo que vendés</h2>


      {/* Materiales */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Materiales</h3>
        {materials.map((m, i) => (
          <div key={i} className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Nombre"
              value={m.name}
              onChange={e => handleMaterialChange(i, 'name', e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={m.quantity || ''}
              onChange={e => handleMaterialChange(i, 'quantity', e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Precio Unitario"
              value={m.price || ''}
              onChange={e => handleMaterialChange(i, 'price', e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        ))}
        <div className="text-center">
          <Button onClick={addMaterial} variant="outline">+ Agregar Material</Button>
        </div>
        <p className="text-right text-sm text-gray-600">
          Total materiales: <span className="font-bold">${totalMaterials.toFixed(2)}</span>
        </p>
      </div>

      {/* Horas de trabajo */}
     {/* <div className="space-y-4">
        <h3 className="text-xl font-semibold">Horas de trabajo</h3>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Cantidad de horas"
            value={hours || ''}
            onChange={e => setHours(parseFloat(e.target.value) || 0)}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="number"
            placeholder="Valor por hora"
            value={rate || ''}
            onChange={e => setRate(parseFloat(e.target.value) || 0)}
            className="border p-2 rounded w-1/2"
          />
        </div>
        <p className="text-right text-sm text-gray-600">
          Total horas: <span className="font-bold">${totalHours.toFixed(2)}</span>
        </p>
      </div> */}

      {/* Gastos generales */}
     {/*  <div className="space-y-4">
        <h3 className="text-xl font-semibold">Gastos generales</h3>
        {expenses.map((e, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Descripción"
              value={e.description}
              onChange={ev => handleExpenseChange(i, 'description', ev.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Monto"
              value={e.amount || ''}
              onChange={ev => handleExpenseChange(i, 'amount', ev.target.value)}
              className="border p-2 rounded"
            />
          </div>
        ))}
        <div className="text-center">
          <Button onClick={addExpense} variant="outline">+ Agregar gasto</Button>
        </div>
        <p className="text-right text-sm text-gray-600">
          Total gastos generales: <span className="font-bold">${totalExpenses.toFixed(2)}</span>
        </p>
      </div> */}

      {/* Cantidad de productos */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Cantidad de productos promedio</h3>
        <input
          type="number"
          value={productCount || ''}
          onChange={(e) => setProductCount(parseFloat(e.target.value) || 1)}
          className="border p-2 rounded w-full"
          placeholder="Cantidad de productos promedio"
          min="1"
        />
      </div>

      {/* Total y exportar */}
      <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
        <div className="space-y-2 mb-4">
          <p className="text-lg font-medium">
            Costo total estimado: <span className="font-bold text-2xl text-green-600">${totalCost.toFixed(2)}</span>
          </p>
          <p className="text-lg font-medium">
            Costo unitario promedio: <span className="font-bold text-xl text-blue-600">${unitCost.toFixed(2)}</span>
          </p>
        </div>
        <Button onClick={exportToExcel} className="mt-4 bg-green-600 hover:bg-green-700">
          Exportar a Excel
        </Button>
      </div>

      {/* Sueldo sugerido */}
      <div className="mt-10">
        <CalculadorSueldo />
      </div>
    </div>
  );
};

export default CostCalculator;