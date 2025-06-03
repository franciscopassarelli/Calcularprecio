import React from "react";
import Navbar from "@/components/Navbar";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Contacto = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-20 px-4 max-w-xl mx-auto text-center space-y-10">
        <h1 className="text-4xl font-bold">Contacto</h1>

        <p className="text-lg text-foreground/80">
          Si tenés dudas, sugerencias o querés comunicarte con nosotros, podés escribirnos a nuestro correo o seguirnos en redes sociales:
        </p>

        <div className="space-y-4">
          <p className="text-lg">
            📧 <strong>Email:</strong> <a href="mailto:info@quepreciolepongo.com" className="text-blue-600 hover:underline">info@quepreciolepongo.com</a>
          </p>

          <div className="flex justify-center space-x-6 text-2xl">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-white rounded-xl shadow-md p-6 text-left">
          <h2 className="text-2xl font-semibold mb-4 text-center">Dejanos tu consulta</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input type="text" className="w-full border border-gray-300 rounded p-2" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded p-2" placeholder="tucorreo@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Consulta</label>
              <textarea rows="4" className="w-full border border-gray-300 rounded p-2" placeholder="Contanos en qué podemos ayudarte"></textarea>
            </div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 w-full">
              Enviar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contacto;
