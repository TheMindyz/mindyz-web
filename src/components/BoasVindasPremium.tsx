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
      <div
        className="fixed inset-0 z-0 fumaca opacity-40"
        style={{ backgroundImage: "url('/fog.png')" }}
      />

      {/* Conteúdo acima da neblina */}
      <div className="relative z-10 text-center transition-all duration-1000 opacity-100 scale-100">
        {/* Título elegante */}
        <h1 className="text-2xl md:text-3xl font-semibold text-green-300 mb-2 tracking-wide">
          Acesso Exclusivo Liberado
        </h1>

        {/* Subtítulo com destaque à marca */}
        <p className="text-lg text-white font-light max-w-md mx-auto mb-2">
          Bem-vindo(a) ao{" "}
          <span className="font-semibold text-green-400">Portal Premium</span>{" "}
          da Mindyz.
        </p>

        {/* Frase inspiradora */}
        <p className="text-sm text-zinc-400 italic max-w-sm mx-auto mb-6">
          Prepare-se para explorar ferramentas raras, experiências imersivas
          <br className="hidden md:block" />e conteúdos desbloqueados apenas por
          quem escolheu ir além.
        </p>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo Mindyz" className="h-30 md:h-30" />
        </div>

        {/* Botão elegante */}
        <button
          onClick={aoContinuar}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-full shadow-md animate-pulse-button hover:scale-105 transition-transform duration-300"
        >
          Entrar no Portal
        </button>
      </div>
    </div>
  );
}
