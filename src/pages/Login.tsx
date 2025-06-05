import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/costo");
    } catch (err) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/costo");
    } catch (err) {
      setError("No se pudo iniciar sesión con Google.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-20 px-4 max-w-xl mx-auto text-center space-y-10">
        <h1 className="text-4xl font-bold">Iniciar sesión</h1>

        <p className="text-lg text-foreground/80">
          Accedé a tu cuenta para usar la calculadora de costos.
        </p>

        <div className="bg-white rounded-xl shadow-md p-6 text-left">
          <h2 className="text-2xl font-semibold mb-4 text-center">Ingresá tus datos</h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="tucorreo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 w-full"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              Iniciar sesión con Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
