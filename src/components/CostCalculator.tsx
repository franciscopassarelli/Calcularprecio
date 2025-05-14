import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';

const CostCalculator = () => {
  const [materials, setMaterials] = useState([{ name: '', quantity: 1, price: 0 }]);
  const [hours, setHours] = useState(0);
  const [rate, setRate] = useState(0);
  const [expenses, setExpenses] = useState([{ description: '', amount: 0 }]);
  const [productCount, setProductCount] = useState(1);

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = field === 'name' ? value : parseFloat(value);
    setMaterials(updated);
  };

  const handleExpenseChange = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = field === 'description' ? value : parseFloat(value);
    setExpenses(updated);
  };

  const addMaterial = () => setMaterials([...materials, { name: '', quantity: 1, price: 0 }]);
  const addExpense = () => setExpenses([...expenses, { description: '', amount: 0 }]);

  const totalMaterials = materials.reduce((sum, m) => sum + m.quantity * m.price, 0);
  const totalHours = hours * rate;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalCost = totalMaterials + totalHours + totalExpenses;
  const unitCost = productCount > 0 ? totalCost / productCount : 0;

  const exportToExcel = () => {
    const wsData = [
      ['Materiales'],
      ['Nombre', 'Cantidad', 'Precio Unitario', 'Subtotal'],
      ...materials.map(m => [m.name, m.quantity, m.price, m.quantity * m.price]),
      [],
      ['Horas de Trabajo'],
      ['Cantidad de Horas', 'Valor por Hora', 'Subtotal'],
      [hours, rate, totalHours],
      [],
      ['Gastos Generales'],
      ['Descripción', 'Monto'],
      ...expenses.map(e => [e.description, e.amount]),
      [],
      ['Cantidad de Productos', productCount],
      ['Costo Unitario Promedio', unitCost],
      [],
      ['Costo Total', totalCost]
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Costo');
    XLSX.writeFile(wb, 'CostoCalculado.xlsx');
  };

  return (
    <div className="bg-[#faf8f5]/80 border border-gray-100 rounded-2xl shadow-lg shadow-black/5 p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center">Calculadora de Costos</h2>

      {/* Materiales */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Materiales</h3>
        {materials.map((m, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
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
              value={m.quantity}
              onChange={e => handleMaterialChange(i, 'quantity', e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Precio Unitario"
              value={m.price}
              onChange={e => handleMaterialChange(i, 'price', e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        ))}
        <Button onClick={addMaterial} variant="outline">+ Agregar Material</Button>
      </div>

      {/* Horas de trabajo */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Horas de trabajo</h3>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Cantidad de horas"
            value={hours}
            onChange={e => setHours(parseFloat(e.target.value))}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="number"
            placeholder="Valor por hora"
            value={rate}
            onChange={e => setRate(parseFloat(e.target.value))}
            className="border p-2 rounded w-1/2"
          />
        </div>
      </div>

      {/* Gastos generales */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Gastos generales</h3>
        {expenses.map((e, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 mb-2">
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
              value={e.amount}
              onChange={ev => handleExpenseChange(i, 'amount', ev.target.value)}
              className="border p-2 rounded"
            />
          </div>
        ))}
        <Button onClick={addExpense} variant="outline">+ Agregar gasto</Button>
      </div>

      {/* Cantidad de productos */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Cantidad de productos promedio</h3>
        <input
          type="number"
          value={productCount}
          onChange={(e) => setProductCount(parseFloat(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Cantidad de productos promedio"
        />
      </div>

      {/* Total y exportar */}
      <div className="text-center mt-8">
        <p className="text-lg font-medium">Costo total estimado: <span className="font-bold">${totalCost.toFixed(2)}</span></p>
        <p className="text-lg font-medium mt-2">Costo unitario promedio: <span className="font-bold">${unitCost.toFixed(2)}</span></p>
        <Button onClick={exportToExcel} className="mt-4">Exportar a Excel</Button>
      </div>
    </div>
  );
};

export default CostCalculator;
