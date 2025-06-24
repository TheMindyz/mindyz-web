"use client";

import React from "react";

export default function BoasVindasPremium({
  aoContinuar,
}: {
  aoContinuar: () => void;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-4">
      {/* Neblina roxa animada */}
      <div className="neblina roxo1" />
      <div className="neblina roxo2" />
      <div className="neblina roxo3" />

      {/* Conteúdo da tela */}
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

      {/* Estilos da neblina roxa em movimento */}
      <style jsx>{`
        .neblina {
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, #a855f7 10%, transparent 60%);
          opacity: 0.2;
          filter: blur(90px);
          z-index: 0;
        }

        .roxo1 {
          animation: mover1 20s ease-in-out infinite alternate;
        }

        .roxo2 {
          animation: mover2 25s ease-in-out infinite alternate;
        }

        .roxo3 {
          animation: mover3 30s ease-in-out infinite alternate;
        }

        @keyframes mover1 {
          0% {
            transform: translate(-20%, -20%) scale(1);
          }
          100% {
            transform: translate(10%, 10%) scale(1.1);
          }
        }

        @keyframes mover2 {
          0% {
            transform: translate(30%, -10%) scale(1);
          }
          100% {
            transform: translate(-10%, 20%) scale(1.05);
          }
        }

        @keyframes mover3 {
          0% {
            transform: translate(0%, 30%) scale(1);
          }
          100% {
            transform: translate(-20%, -30%) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
