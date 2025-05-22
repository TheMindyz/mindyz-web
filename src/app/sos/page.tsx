'use client';

import React, { useRef } from 'react';

export default function SosPage() {
  const chuvaRef = useRef<HTMLAudioElement>(null);
  const marRef = useRef<HTMLAudioElement>(null);
  const florestaRef = useRef<HTMLAudioElement>(null);
  const fogueiraRef = useRef<HTMLAudioElement>(null);

  const tocarSom = (somRef: React.RefObject<HTMLAudioElement | null>) => {
    [chuvaRef, marRef, florestaRef, fogueiraRef].forEach(ref => {
      if (ref.current) {
        ref.current.pause();s
        ref.current.currentTime = 0;
      }
    });
    if (somRef.current) {
      somRef.current.play();
    }
  };
  const pararTodosOsSons = () => {
    [chuvaRef, marRef, florestaRef, fogueiraRef].forEach(ref => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      <section className="bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-2xl text-center space-y-6">
        <a
          href="/"
          className="bg-zinc-700 hover:bg-zinc-600 text-white py-1 px-4 rounded transition mb-4 inline-block"
        >
          ← Voltar
        </a>

        <h2 className="text-2xl font-bold text-rose-400">
          🚑 SOS Emocional
        </h2>

        <p className="text-zinc-300">
          Se você está se sentindo sobrecarregado, ansioso ou em crise, aqui estão práticas e orientações para te ajudar agora.
        </p>

        {/* Círculo simulando respiração */}
        <div className="flex justify-center">
          <div className="w-40 h-40 rounded-full bg-rose-500 opacity-50 animate-ping"></div>
        </div>

        <p className="text-rose-300 font-semibold">
          🌬️ Inspire... Segura... Expira... Repete comigo.
        </p>

        {/* Elementos de áudio ocultos */}
        <audio ref={chuvaRef} src="/sons/chuva.mp3" loop />
        <audio ref={marRef} src="/sons/mar.mp3" loop />
        <audio ref={florestaRef} src="/sons/floresta.mp3" loop />
        <audio ref={fogueiraRef} src="/sons/fogueira.mp3" loop />

        {/* Sons Terapêuticos */}
        <div className="space-y-2">
          <h3 className="text-rose-400 font-semibold">
            🌿 Sons Terapêuticos
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => tocarSom(chuvaRef)}
              className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-xl text-zinc-200"
            >
              🌧️ Chuva
            </button>
            <button
              onClick={() => tocarSom(marRef)}
              className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-xl text-zinc-200"
            >
              🌊 Mar
            </button>
            <button
              onClick={() => tocarSom(florestaRef)}
              className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-xl text-zinc-200"
            >
              🌳 Floresta
            </button>
            <button
              onClick={() => tocarSom(fogueiraRef)}
              className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-xl text-zinc-200"
            >
              🔥 Fogueira
            </button>
            <button
              onClick={pararTodosOsSons}
              className="bg-red-800 hover:bg-red-700 p-2 rounded-xl text-white col-span-2"
            >
              ⏹️ Parar Sons
            </button>
          </div>
        </div>

        {/* Guia de Primeiros Socorros Psicológicos */}
        <div className="space-y-4">
          <h3 className="text-rose-400 font-semibold text-xl">
            🧠 Primeiros Socorros Psicológicos
          </h3>
          <ul className="space-y-2 text-zinc-300 text-left">
            <li>✔️ Reconheça: Está tudo bem não estar bem agora.</li>
            <li>✔️ Respire fundo e foque na sua respiração.</li>
            <li>✔️ Identifique o que está sentindo, sem se julgar.</li>
            <li>✔️ Se puder, fale com alguém de confiança.</li>
            <li>✔️ Procure um lugar seguro e confortável.</li>
            <li>✔️ Pratique aterramento: perceba seus 5 sentidos.</li>
            <li>✔️ Lembre-se: isso vai passar.</li>
          </ul>
        </div>

        <p className="text-center text-sm text-zinc-400">
          Se precisar de apoio imediato, fale com o <b>CVV — 188</b> ou com um profissional de saúde mental.
        </p>
      </section>
    </main>
  );
}