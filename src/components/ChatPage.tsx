"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  setStep: (step: string) => void;
}

export default function ChatPage({ setStep }: Props) {
  const mensagens = [
    {
      usuario: "Explorador1",
      perfil: "Pioneiro",
      texto:
        "Hoje foi um dia difícil, mas estou tentando focar na minha respiração 🌬️",
      tempo: "há 5 min",
    },
    {
      usuario: "Pioneiro542",
      perfil: "Pioneiro",
      texto: "Você não está só. Estamos aqui com você! 💚",
      tempo: "há 3 min",
    },
    {
      usuario: "Guardião698",
      perfil: "Guardião",
      texto:
        "Alguém já tentou escrever no diário emocional hoje? Me ajudou bastante.",
      tempo: "há 2 min",
    },
    {
      usuario: "Empático3",
      perfil: "Empático",
      texto: "Ouvi uma trilha de meditação agora e estou mais tranquilo 🎧",
      tempo: "agora",
    },
  ];

  const perfilCores: Record<string, string> = {
    Pioneiro: "bg-green-500",
    Guardião: "bg-red-500",
    Empático: "bg-blue-500",
    Estratégico: "bg-purple-500",
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white p-6 space-y-6">
      {/* Botão Voltar */}
      <div>
        <button
          onClick={() => setStep("premium")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white hover:shadow-lg transition-all duration-200"
        >
          <span className="text-lg">←</span>
          Voltar
        </button>
      </div>

      <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
        💬 Chat da Comunidade
      </h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {mensagens.map((msg, i) => (
          <motion.div
            key={i}
            className="bg-zinc-800 p-4 rounded-xl shadow border border-zinc-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-300">
                  @{msg.usuario}
                </span>
                <span
                  className={`text-xs text-white px-2 py-0.5 rounded-full ${
                    perfilCores[msg.perfil] || "bg-zinc-600"
                  }`}
                >
                  {msg.perfil}
                </span>
              </div>
              <span className="text-xs text-zinc-400">{msg.tempo}</span>
            </div>
            <p className="text-zinc-100">{msg.texto}</p>

            <div className="flex gap-3 mt-2 text-zinc-400 text-sm">
              <button className="hover:text-red-400 transition">
                ❤️ Apoiar
              </button>
              <button className="hover:text-green-400 transition">
                💬 Responder
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
