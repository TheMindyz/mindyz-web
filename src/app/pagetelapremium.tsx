"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, MessageCircle, Star, Settings, Users } from "lucide-react";

export default function PagePremium() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex">
      {/* Sidebar esquerda */}
      <aside className="hidden md:flex flex-col items-center w-20 bg-zinc-900 border-r border-zinc-700 py-6 space-y-6 fixed h-full">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <IconButton icon={<Home />} label="Início" />
        <IconButton icon={<MessageCircle />} label="Chat" />
        <IconButton icon={<Star />} label="Trilhas" />
        <IconButton icon={<Users />} label="Comunidade" />
        <IconButton icon={<Settings />} label="Ajustes" />
      </aside>

      {/* Feed central */}
      <main className="flex-1 ml-0 md:ml-20 max-w-4xl mx-auto px-4 py-6">
        <motion.h1
          className="text-2xl font-bold text-green-400 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌍 Chat Global Premium
        </motion.h1>

        <section className="bg-zinc-800 rounded-xl p-6 shadow-lg max-h-[80vh] overflow-y-auto space-y-4">
          {/* Exemplo de mensagens */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-zinc-700 p-3 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="text-green-300 font-semibold">@usuário{i + 1}</p>
              <p className="text-zinc-100">
                Mensagem inspiradora nº {i + 1} 💬
              </p>
            </motion.div>
          ))}
        </section>
      </main>

      {/* Direita opcional */}
      <aside className="hidden lg:block w-72 border-l border-zinc-700 p-6 space-y-6 bg-zinc-900">
        <h2 className="text-green-400 font-bold text-lg">💡 Sugestões</h2>
        <ul className="text-zinc-300 space-y-2 text-sm">
          <li>🎓 Nova trilha desbloqueada</li>
          <li>🧠 Dica emocional do dia</li>
          <li>🎁 Recompensa disponível</li>
        </ul>
      </aside>
    </div>
  );
}

function IconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="group flex flex-col items-center text-zinc-400 hover:text-green-400 transition cursor-pointer">
      <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
      <span className="text-xs hidden lg:block group-hover:opacity-100 opacity-0 transition">
        {label}
      </span>
    </div>
  );
}
