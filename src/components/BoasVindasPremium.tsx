"use client";
import React, { useEffect, useState } from "react";

export default function BoasVindasPremium({
  aoContinuar,
}: {
  aoContinuar: () => void;
}) {
  const [portalAberto, setPortalAberto] = useState(false);

  useEffect(() => {
    // Dispara animação de abertura após o carregamento
    const timer = setTimeout(() => {
      setPortalAberto(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center p-6 overflow-hidden relative">
      {/* Anel de Glow / Portal */}
      <div
        className={`absolute inset-0 rounded-full border-4 border-green-400 opacity-30 blur-xl animate-pulse ${
          portalAberto
            ? "scale-150 opacity-50 transition-all duration-1000"
            : "scale-0 opacity-0"
        }`}
      ></div>

      {/* Camada central brilhante */}
      <div
        className={`absolute inset-0 rounded-full bg-green-500 opacity-10 blur-2xl transition-all duration-1000 ${
          portalAberto ? "scale-150 opacity-20" : "scale-0 opacity-0"
        }`}
      ></div>

      {/* Conteúdo principal com Fade + Scale */}
      <div
        className={`relative z-10 transition-all duration-1000 ${
          portalAberto ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 drop-shadow-2xl mb-4 animate-pulse">
          ✨ Bem-vindo(a) ao Portal Premium Mindyz
        </h1>

        <p className="text-lg md:text-xl max-w-2xl text-zinc-300 mb-4">
          Você acaba de desbloquear um espaço exclusivo para o seu
          autoconhecimento profundo.
        </p>

        <p className="text-base md:text-lg max-w-xl text-zinc-500 italic">
          Prepare-se para experiências raras, conteúdos secretos e ferramentas
          só para iniciados.
        </p>

        <button
          onClick={aoContinuar}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 text-black font-bold rounded-full shadow-xl hover:from-green-500 hover:to-green-700 transition duration-300"
        >
          🌟 Entrar no Portal
        </button>
      </div>
    </div>
  );
}
