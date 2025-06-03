
import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PriceCalculator from "@/components/PriceCalculator";



const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      
   
      <Navbar />
      <main className="flex-grow z-10">
        <Hero />
        <PriceCalculator />
        <section id="calculacosto" className="py-20 px-4 max-w-3xl mx-auto text-center">
  
  <p className="text-lg text-foreground/80">
    
  </p>
</section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

<section id="calculacosto" className="py-20 px-4 max-w-3xl mx-auto text-center">
  <h2 className="text-3xl font-bold mb-6">Te ayudamos gratis a calcular el costo de tus productos</h2>
  <p className="text-lg text-foreground/80">
    El costo de tu producto estará compuesto por los materiales, horas de trabajo y gastos que puedas tener. 
    Nosotros te ayudamos a calcular el costo final teniendo en cuenta varios factores.
  </p>
</section>

export default Index;
