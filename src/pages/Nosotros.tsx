import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Nosotros = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-20 px-4 max-w-3xl mx-auto text-center space-y-8">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-16 mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold">¿Quiénes somos?</h1>
        <p className="text-lg text-foreground/80">
          "Que precio le pongo" es una herramienta gratuita diseñada para ayudar a cualquier persona que quiera vender productos a calcular de forma clara y sencilla su precio ideal. 
          Nuestro objetivo es brindar una plataforma accesible, visual y útil, que simplifique lo que muchas veces resulta complicado: entender cuánto cuesta realmente un producto y cuánto se debería cobrar por él.
        </p>

        <h2 className="text-2xl font-semibold mt-10">¿Cómo funcionan nuestras calculadoras?</h2>
        <p className="text-base text-foreground/80">
          Contamos con dos herramientas principales:
        </p>

        <ul className="text-left list-disc list-inside text-foreground/80 space-y-2">
          <li><strong>Calculadora de Precios:</strong> Ingresás el costo de tu producto, elegís cuánto querés ganar y agregás los impuestos o descuentos aplicables. El sistema te devuelve el precio final sugerido.</li>
          <li><strong>Calculadora de Costos:</strong> Te permite sumar materiales, horas de trabajo, gastos generales y estimar cuántos productos vas a producir, para obtener un costo unitario preciso.</li>
        </ul>

        <p className="text-base text-foreground/80">
          Todo fue pensado para que cualquier persona pueda usarlo, sin necesidad de conocimientos técnicos. Desde emprendedores y artesanos, hasta negocios familiares o vendedores independientes.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Nosotros;
