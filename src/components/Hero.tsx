
import React from 'react';
import { Coins, PiggyBank, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculadora');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="pt-24 pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
          <div className="space-y-8 text-center max-w-4xl mx-auto">
            <div>
              <h1 className="font-proxima text-4xl md:text-4xl lg:text-5xl font-bold">
              Calcula tus precios con <br /> Nosotros
              </h1>
              <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto">
                Calcula tu ganancia y defini tus precios de venta de tus productos o servicios
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
  onClick={scrollToCalculator}
  className="text-white text-lg px-6 py-3 rounded-2xl bg-sky-400 hover:bg-sky-500 font-bold shadow-md transition-all"
>
  Calcular ahora
 
</Button>

</div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 shadow-md hover:transform hover:translate-y-[-5px] transition-transform">
                <TrendingUp className="h-8 w-8 text-primary" />
                <span className="text-foreground font-medium text-lg">Maximiza ganancias</span>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 shadow-md hover:transform hover:translate-y-[-5px] transition-transform">
                <Coins className="h-8 w-8 text-primary" />
                <span className="text-foreground font-medium text-lg">Incluye impuestos</span>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 shadow-md hover:transform hover:translate-y-[-5px] transition-transform">
                <PiggyBank className="h-8 w-8 text-primary" />
                <span className="text-foreground font-medium text-lg">Calcula descuentos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
