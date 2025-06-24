"use client";
import React, { useEffect, useState } from "react";

export default function BoasVindasPremium({
  aoContinuar,
}: {
  aoContinuar: () => void;
}) {
  const [portalAberto, setPortalAberto] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPortalAberto(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Fundo com gradiente radial */}
      <div
        className={`absolute inset-0 bg-gradient-radial from-green-500/20 via-transparent to-black transition-all duration-1000 ${
          portalAberto ? "scale-150 opacity-60" : "scale-50 opacity-0"
        }`}
      ></div>

      {/* Anel de Glow (efeito de energia do portal) */}
      <div
        className={`absolute w-96 h-96 rounded-full border-4 border-green-400 opacity-30 blur-2xl transition-all duration-1000 ${
          portalAberto ? "scale-150 opacity-50" : "scale-0 opacity-0"
        }`}
      ></div>

      {/* Conteúdo */}
      <div
        className={`relative z-10 text-center text-white transition-all duration-1000 ${
          portalAberto ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-4 leading-tight">
          ✨ Bem-vindo(a) ao <br /> Portal Premium Mindyz
        </h1>

        <p className="text-base md:text-lg text-zinc-300 max-w-sm mx-auto mb-4">
          Você acaba de desbloquear uma jornada de autoconhecimento única.
        </p>

        <p className="text-sm md:text-base text-zinc-500 italic max-w-xs mx-auto">
          Prepare-se para experiências secretas, ferramentas raras e insights só
          para iniciados.
        </p>

        <button
          onClick={aoContinuar}
          className="mt-8 px-6 py-3 bg-green-500 text-black rounded-full font-bold shadow-lg hover:bg-green-600 transition"
        >
          🚪 Entrar no Portal
        </button>
      </div>
    </div>
  );
}
