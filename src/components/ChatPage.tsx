"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ChatPage() {
  const mensagens = [
    {
      usuario: "@Explorador1",
      texto:
        "Hoje foi um dia difícil, mas estou tentando focar na minha respiração 🌬️",
    },
    {
      usuario: "@Pioneiro542",
      texto: "Você não está só. Estamos aqui com você! 💚",
    },
    {
      usuario: "@Guardião698",
      texto:
        "Alguém já tentou escrever no diário emocional hoje? Me ajudou bastante.",
    },
    {
      usuario: "@Empático3",
      texto: "Ouvi uma trilha de meditação agora e estou mais tranquilo 🎧",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white p-6">
      <h2 className="text-2xl font-bold text-green-400 mb-4">
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
            <p className="font-semibold text-green-300">@{msg.usuario}</p>
            <p className="text-zinc-100">{msg.texto}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
