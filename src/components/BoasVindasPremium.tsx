"use client";
import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function BoasVindasPremium({
  aoContinuar,
}: {
  aoContinuar: () => void;
}) {
  const [portalAberto, setPortalAberto] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPortalAberto(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Partículas */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 80 },
            color: { value: "#00FF99" },
            size: { value: 2 },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.5 },
          },
        }}
        className="absolute inset-0"
      />

      {/* Contorno Neon */}
      <div className="absolute inset-0 border-2 border-green-500 animate-pulse rounded-lg pointer-events-none"></div>

      {/* Conteúdo */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ${
          portalAberto ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-lime-300 to-green-500 drop-shadow-[0_0_10px_#00FF99] mb-6">
          Bem-vindo(a) ao Portal Premium Mindyz
        </h1>

        <p className="text-lg text-zinc-300 max-w-md mx-auto mb-4">
          Você acaba de desbloquear uma jornada de autoconhecimento única.
        </p>

        <p className="text-sm text-zinc-500 italic max-w-sm mx-auto">
          Prepare-se para experiências secretas, ferramentas raras e insights só
          para iniciados.
        </p>

        <button
          onClick={aoContinuar}
          className="mt-8 px-8 py-3 bg-green-500 text-black rounded-full font-bold shadow-[0_0_20px_#00FF99] hover:bg-green-600 transition"
        >
          Entrar no Portal
        </button>
      </div>
    </div>
  );
}
