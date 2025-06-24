"use client";

import React from "react";

export default function BoasVindasPremium({
  aoContinuar,
}: {
  aoContinuar: () => void;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-4">
      {/* Neblina roxa cobrindo toda a tela */}
      <div className="neblina-bg" />

      {/* Conteúdo principal */}
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

      {/* Estilo da neblina roxa em toda a tela */}
      <style jsx>{`
        .neblina-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              circle at center,
              rgba(168, 85, 247, 0.2),
              transparent 70%
            ),
            radial-gradient(
              circle at 30% 40%,
              rgba(168, 85, 247, 0.15),
              transparent 60%
            ),
            radial-gradient(
              circle at 70% 60%,
              rgba(168, 85, 247, 0.15),
              transparent 60%
            );
          filter: blur(120px);
          animation: moverNeblina 25s ease-in-out infinite alternate;
          z-index: 0;
        }

        @keyframes moverNeblina {
          0% {
            transform: scale(1) translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05) translateY(-15px);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) translateY(15px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
