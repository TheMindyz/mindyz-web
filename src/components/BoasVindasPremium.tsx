"use client";

import React from "react";

export default function BoasVindasPremium({
  aoContinuar,
}: {
  aoContinuar: () => void;
}) {
  return (
    <div className="relative w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden px-4">
      {/* Neblina roxa animada cobrindo toda a tela */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="neblina roxo1" />
        <div className="neblina roxo2" />
        <div className="neblina roxo3" />
      </div>

      {/* Conteúdo central */}
      <div className="relative z-10 text-center">
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

      {/* Estilo da neblina animada */}
      <style jsx>{`
        .neblina {
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, #a855f7 10%, transparent 70%);
          opacity: 0.15;
          filter: blur(100px);
          z-index: 0;
        }

        .roxo1 {
          animation: mover1 25s ease-in-out infinite alternate;
        }

        .roxo2 {
          animation: mover2 35s ease-in-out infinite alternate;
        }

        .roxo3 {
          animation: mover3 40s ease-in-out infinite alternate;
        }

        @keyframes mover1 {
          0% {
            transform: translate(-30%, -30%) scale(1);
          }
          100% {
            transform: translate(10%, 10%) scale(1.2);
          }
        }

        @keyframes mover2 {
          0% {
            transform: translate(30%, -20%) scale(1);
          }
          100% {
            transform: translate(-20%, 30%) scale(1.1);
          }
        }

        @keyframes mover3 {
          0% {
            transform: translate(0%, 40%) scale(1);
          }
          100% {
            transform: translate(-40%, -40%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
