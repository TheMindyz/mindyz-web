import React from "react";

export default function BoasVindasPremium({
  aoContinuar,
}: {
  aoContinuar: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-black text-center text-green-300 p-6">
      <h1 className="text-5xl font-extrabold text-purple-400 animate-bounce mb-4">
        ✨ Bem-vindo(a) ao Portal Premium Mindyz
      </h1>
      <p className="text-xl max-w-xl mb-6 text-zinc-100">
        Você acaba de desbloquear um espaço mágico, feito para seu
        autoconhecimento profundo.
      </p>

      <p className="text-md max-w-lg italic text-zinc-400">
        Prepare-se para viver experiências exclusivas, conteúdos raros e
        ferramentas que só os iniciados recebem.
      </p>

      <button
        onClick={aoContinuar}
        className="mt-10 px-6 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-600 transition"
      >
        🌟 Entrar no Portal
      </button>
    </div>
  );
}
