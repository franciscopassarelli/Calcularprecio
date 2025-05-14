import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CostCalculator from "@/components/CostCalculator";

const Costo = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-20 px-4">
        <section className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-6">
            Te ayudamos gratis a calcular el costo de tus productos
          </h2>
          <p className="text-lg text-foreground/80">
            El costo de tu producto estará compuesto por los materiales, horas de trabajo y gastos que puedas tener.
            Nosotros te ayudamos a calcular el costo final teniendo en cuenta varios factores.
          </p>
        </section>

        <CostCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Costo;

