import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Minus, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const provinces: { [key: string]: number } = {
  "CABA": 2.0,
  "Buenos Aires": 2.0,
  "Catamarca": 0,
  "Chaco": 5.5,
  "Chubut": 0,
  "Corrientes": 0,
  "Córdoba": 3,
  "Entre Ríos": 0,
  "Formosa": 0,
  "Jujuy": 0,
  "La Pampa": 1,
  "La Rioja": 0,
  "Mendoza": 0,
  "Misiones": 2.5,
  "Neuquén": 4.0,
  "Río Negro": 5.0,
  "San Juan": 0,
  "San Luis": 0,
  "Salta": 3.6,
  "Santa Cruz": 0,
  "Santa Fe": 4.5,
  "Santiago del Estero": 0,
  "Tierra del Fuego": 3.0,
  "Tucumán": 0
};

interface TaxOrDiscount {
  id: string;
  type: string;
  value: number;
  amount: number;
  enabled: boolean;
}

const PriceCalculator = () => {
  const [province, setProvince] = useState<string>("CABA");
  const [product, setProduct] = useState('');
  const [cost, setCost] = useState('');
  const [margin, setMargin] = useState<number>(30);
  const [taxesAndDiscounts, setTaxesAndDiscounts] = useState<TaxOrDiscount[]>([
    { id: '1', type: 'IVA (21%)', value: 21, amount: 0, enabled: true }
  ]);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [basePrice, setBasePrice] = useState<number | null>(null);

  const taxOptions = [
    'IVA (21%)', 
    'IVA (10%)', 
    'IRPF (15%)', 
    'Descuento',
    'Comisión',
    'Impuesto local',
    'Gastos de envío'
  ];

  useEffect(() => {
    calculateAmounts();
  }, [cost, margin, taxesAndDiscounts]);

  const calculateAmounts = () => {
    if (!cost) {
      setTaxesAndDiscounts(prevState => 
        prevState.map(item => ({ ...item, amount: 0 }))
      );
      return;
    }

    const costValue = parseFloat(cost);
    
    if (isNaN(costValue)) return;
    
    // Calcular precio base con margen
    const priceWithMargin = costValue * (1 + margin / 100);
    setBasePrice(priceWithMargin);
    
    // Actualizar los montos de impuestos/descuentos
    const updatedItems = taxesAndDiscounts.map(item => {
      const amount = item.enabled ? priceWithMargin * (item.value / 100) : 0;
      return { ...item, amount };
    });

    setTaxesAndDiscounts(updatedItems);

// Calcular el total con impuestos
const totalWithTaxes = updatedItems.reduce((acc, item) => acc + item.amount, priceWithMargin);

// Calcular impuesto provincial
const provinceTax = provinces[province] || 0;
const finalWithProvince = totalWithTaxes * (1 + provinceTax / 100);

setFinalPrice(finalWithProvince);
    
    setTaxesAndDiscounts(updatedItems);
  };

  const addTaxOrDiscount = () => {
    if (taxesAndDiscounts.length >= 5) {
      toast({
        title: "Límite alcanzado",
        description: "No se pueden agregar más de 5 impuestos o descuentos",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (taxesAndDiscounts.length + 1).toString();
    setTaxesAndDiscounts([
      ...taxesAndDiscounts,
      { id: newId, type: 'IVA (21%)', value: 21, amount: 0, enabled: true }
    ]);
  };

  const removeTaxOrDiscount = (id: string) => {
    if (taxesAndDiscounts.length <= 1) {
      toast({
        title: "No se puede eliminar",
        description: "Debe haber al menos un impuesto o descuento",
        variant: "destructive"
      });
      return;
    }
    
    setTaxesAndDiscounts(taxesAndDiscounts.filter(item => item.id !== id));
  };

  const updateTaxOrDiscount = (id: string, field: 'type' | 'value', newValue: string | number) => {
    setTaxesAndDiscounts(
      taxesAndDiscounts.map(item => {
        if (item.id === id) {
          if (field === 'type') {
            // Ensure we're working with string type for the 'type' field
            const typeValue = String(newValue);
            // Extraer el valor numérico del tipo seleccionado
            let updatedValue = item.value;
            const match = typeValue.match(/\((\d+)%\)/);
            if (match && match[1]) {
              updatedValue = parseInt(match[1], 10);
            } else if (typeValue === 'Descuento' || typeValue === 'Comisión' || typeValue === 'Gastos de envío' || typeValue === 'Impuesto local') {
              updatedValue = 0; // Default value for custom types
            }
            return { ...item, type: typeValue, value: updatedValue };
          }
          // For the 'value' field, ensure it's a number
          if (field === 'value') {
            const numValue = typeof newValue === 'string' ? parseFloat(newValue) : newValue;
            return { ...item, [field]: isNaN(numValue) ? 0 : numValue };
          }
          return { ...item, [field]: newValue };
        }
        return item;
      })
    );
  };

  const calculateFinalPrice = () => {
    if (!cost) {
      toast({
        title: "Datos incompletos",
        description: "Por favor, ingresa el costo del producto",
        variant: "destructive"
      });
      return;
    }

    const costValue = parseFloat(cost);
    
    if (isNaN(costValue)) {
      toast({
        title: "Valores inválidos",
        description: "El costo debe ser un número válido",
        variant: "destructive"
      });
      return;
    }

    // Calcular precio base con margen
    const priceWithMargin = costValue * (1 + margin / 100);
    
    // Calcular totales de impuestos/descuentos
    let totalTaxes = 0;
    
    taxesAndDiscounts.forEach(item => {
      if (!item.enabled) return;
      const factor = item.type.includes('Descuento') ? -1 : 1;
      totalTaxes += (priceWithMargin * (item.value / 100)) * factor;
    });
    
    // Calcular precio final
    const provinceTax = provinces[province] || 0;
const finalPriceValue = (priceWithMargin + totalTaxes) * (1 + provinceTax / 100);
    setFinalPrice(finalPriceValue);
    
    toast({
      title: "Cálculo completado",
      description: `El precio de venta recomendado es: $${finalPriceValue.toFixed(2)}`,
    });
  };

  const handleSliderChange = (value: number[]) => {
    setMargin(value[0]);
  };

  return (
    <section id="calculadora" className="py-32 bg-gradient-to-b from-background to-card/50 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
  <img 
    src="/logophoto.png" 
    alt="Logo" 
    className="h-16 w-16 object-contain mx-auto" // Añadir mx-auto para centrarlo
  />
 
  <h2 className="font-proxima p-3 text-3xl font-bold">Que precio le pongo</h2>

</div>

        
        
        <div className="card-glass rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-foreground mb-1">
                ¿Qué producto estás vendiendo?
              </label>
              <Input
                id="product"
                placeholder="Ej: Velas aromáticas, Joyería, Ropa..."
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="bg-white/70 border-white/20 text-foreground"
              />
            </div>
            
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-foreground mb-1">
                ¿Cuánto te costó este producto?
              </label>
              <Input
                id="cost"
                type="number"
                placeholder="Ingresa el precio en $"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="bg-white/70 border-white/20 text-foreground"
              />
            </div>
            
<div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                        Provincia desde donde vendés
                   </label>
                    <Select onValueChange={(value) => setProvince(value)} defaultValue="CABA">
    <SelectTrigger className="w-full bg-white/70 border-white/20 text-foreground">
      <SelectValue placeholder="Seleccioná una provincia" />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(provinces).map(([name, percent]) => (
        <SelectItem key={name} value={name}>
          {name} ({percent}%)
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
<div>
              <div className="flex justify-between text-sm font-medium text-foreground mb-2">
                <label htmlFor="margin">¿Qué porcentaje deseas ganar?</label>
                <span className="font-bold text-primary">{margin}%</span>
              </div>




              
              <div className="py-4">
                <Slider
                  id="margin"
                  defaultValue={[30]}
                  max={500}
                  step={1}
                  value={[margin]}
                  onValueChange={handleSliderChange}
                  className="w-full"
                />
              </div>
            </div>
            
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-foreground">Impuestos y descuentos adicionales</h3>
                {basePrice && <span className="text-xs text-foreground/70">Precio base: ${basePrice.toFixed(2)}</span>}
              </div>
              
                <div className="space-y-3">
                  {taxesAndDiscounts.map((item) => (
                    <div key={item.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-2">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={() => {
                          const updated = taxesAndDiscounts.map(t =>
                            t.id === item.id ? { ...t, enabled: !t.enabled } : t
                          );
                          setTaxesAndDiscounts(updated);
                        }}
                        className="accent-primary mx-2"
                        title="Incluir en el cálculo"
                      />
                      <Select 
                        value={item.type} 
                        onValueChange={(value) => updateTaxOrDiscount(item.id, 'type', value)}
                      >
                        <SelectTrigger className="bg-white/70 border-white/20 text-foreground">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {taxOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        value={item.value === 0 ? '' : item.value}
                        onChange={(e) => updateTaxOrDiscount(item.id, 'value', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="bg-white/70 border-white/20 text-foreground text-xs w-16"
                      />
                      <Input
                        readOnly
                        value={item.amount ? `$${item.amount.toFixed(2)}` : '$0.00'}
                        className="bg-white/70 border-white/20 text-foreground text-xs w-20"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeTaxOrDiscount(item.id)}
                        className="flex-shrink-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              <Button 
                variant="outline" 
                onClick={addTaxOrDiscount} 
                className="w-full mt-3 border-dashed border-primary/30 text-foreground hover:text-primary hover:bg-primary/10"
              >
                <Plus className="mr-2 h-4 w-4" /> Agregar impuesto o descuento
              </Button>
            </div>
            
            {/* RESULTADOS */}
            <div className="bg-[#faf8f5] border border-gray-200 rounded-xl p-6 mt-6 shadow-md">
  <h3 className="text-center text-sm text-gray-500 font-semibold uppercase mb-4">
    Resultados de la calculadora
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
    <div>
      <p className="text-sm text-gray-500">Tu precio de venta</p>
      <p className="text-2xl font-bold text-green-600">
        {finalPrice !== null ? `$${finalPrice.toFixed(2)}` : '—'}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-500">Tu ganancia neta</p>
      <p className="text-2xl font-bold text-blue-600">
  {basePrice !== null ? `$${(basePrice - parseFloat(cost || '0')).toFixed(2)}` : '—'}
</p>
    </div>
    <div>
      <p className="text-sm text-gray-500">Margen bruto</p>
      <p className="text-2xl font-bold text-orange-600">
        {finalPrice && finalPrice > 0
          ? `${(((finalPrice - parseFloat(cost || '0')) / finalPrice) * 100).toFixed(2)}%`
          : '0.00%'}
      </p>
    </div>
  </div>
</div>
{/* PREGUNTAS FRECUENTES */}
<div className="mt-10">
  <h2 className="text-center text-xl font-semibold mb-6 text-foreground">Preguntas frecuentes</h2>

  <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-2">
    <AccordionItem value="q1">
      <AccordionTrigger>¿Qué es el precio de venta?</AccordionTrigger>
      <AccordionContent>
        Es el precio al que vas a vender tu producto. Podes sumar o restar impuestos y descuentos para obtener el precio final.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="q2">
      <AccordionTrigger>¿Como es tu ganancia neta?</AccordionTrigger>
      <AccordionContent>
        Es la ganancia que obtenes despues de restar el costo del producto y los impuestos.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="q3">
      <AccordionTrigger>¿Que es el margen bruto?</AccordionTrigger>
      <AccordionContent>
        Es el porcentaje que representa la ganancia obtenida sobre el precio final de venta. Cuanto mayor el margen, más rentable es el producto.
      </AccordionContent>
    </AccordionItem>

    
  </Accordion>
</div>


</div>
</div>
</div>
</section>
);
};
export default PriceCalculator;

