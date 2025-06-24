"use client";

import React from "react";

export default function BoasVindasPremium({
  aoContinuar,
}: {
  aoContinuar: () => void;
}) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center text-white px-4 bg-black overflow-hidden">
      {/* Neblina animada */}
      <div className="fumaca" />

      {/* Conteúdo */}
      <div className="relative z-10 text-center transition-all duration-1000 opacity-100 scale-100">
        <h1 className="text-3xl md:text-3xl font-extrabold text-green-400 mb-6">
          Bem-vindo(a) ao Portal Premium
          <br />
          <div className="flex justify-center mt-4">
            <img src="/logo.png" alt="Logo Mindyz" className="h-19 md:h-19" />
          </div>
        </h1>

        <p className="text-lg text-zinc-300 max-w-md mx-auto mb-4">
          Você acaba de desbloquear uma jornada de autoconhecimento única.
        </p>

        <p className="text-sm text-zinc-500 italic max-w-sm mx-auto">
          Prepare-se para experiências secretas, ferramentas raras e insights só
          para assinantes.
        </p>

        <button
          onClick={aoContinuar}
          className="mt-8 bg-green-500 text-black font-semibold px-6 py-3 rounded-full animate-pulse-button"
        >
          Entrar no Portal
        </button>
      </div>
    </div>
  );
}
