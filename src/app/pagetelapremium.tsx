"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, MessageCircle, Star, Settings, Users } from "lucide-react";
import InicioPage from "../components/InicioPage"; // mantenha o caminho correto

// Recursos premium
const premiumFeatures = [
  {
    icon: "📓",
    title: "Diário emocional",
    desc: "Com insights personalizados",
  },
  { icon: "🎓", title: "Workshops e trilhas", desc: "Conteúdo exclusivo" },
  {
    icon: "🤝",
    title: "Comunidade de apoio",
    desc: "Compartilhe, ouça, acolha",
  },
  { icon: "🚨", title: "SOS emocional", desc: "Desafios guiados" },
  { icon: "💬", title: "Fóruns globais", desc: "Discussões e apoio privado" },
  {
    icon: "📚",
    title: "Conteúdo semanal",
    desc: "Autoconhecimento e evolução",
  },
  {
    icon: "🌟",
    title: "Reconhecimento",
    desc: "Destaque na comunidade Mindyz",
  },
  {
    icon: "🧠",
    title: "Indicação de terapia",
    desc: "Conexões fora da plataforma",
  },
  { icon: "🎫", title: "Eventos exclusivos", desc: "Convites para Premiums" },
  { icon: "🧍‍♀️", title: "Avatares emocionais", desc: "Mostre sua jornada" },
  { icon: "🎁", title: "Clube de benefícios", desc: "Descontos e bem-estar" },
  { icon: "🤖", title: "Chat de apoio", desc: "IA + moderação humana" },
];

export default function PagePremium() {
  const [step, setStep] = useState("premium"); // controlando qual tela mostrar

  return (
    <>
      {/* Botões de navegação */}
      <div className="flex justify-center gap-4 bg-zinc-900 p-4 border-b border-zinc-800">
        <button
          onClick={() => setStep("premium")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
        >
          Ver Premium
        </button>
        <button
          onClick={() => setStep("inicio")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
        >
          Ir para Início
        </button>
      </div>

      {/* Alternando entre telas */}
      {step === "inicio" && <InicioPage />}

      {step === "premium" && (
        <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white flex">
          {/* Sidebar esquerda */}
          <aside className="hidden md:flex flex-col items-center w-20 bg-zinc-900 border-r border-zinc-700 py-6 space-y-6 fixed h-full">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <IconButton icon={<Home />} label="Início" />
            <IconButton icon={<MessageCircle />} label="Chat" />
            <IconButton icon={<Star />} label="Trilhas" />
            <IconButton icon={<Users />} label="Comunidade" />
            <IconButton icon={<Settings />} label="Ajustes" />
          </aside>

          {/* Conteúdo principal */}
          <main className="flex-1 ml-0 md:ml-20 max-w-6xl mx-auto px-4 py-6 space-y-10">
            {/* Boas-vindas */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-green-400 mb-2">
                  Olá, Explorador(a) 🌿
                </h1>
                <p className="text-zinc-300">
                  “Você é mais forte do que imagina. Continue avançando.”
                </p>
              </div>

              {/* Avatar emocional */}
              <div className="flex items-center gap-3 bg-zinc-800 px-4 py-2 rounded-xl shadow border border-zinc-700">
                <img
                  src="/avatar-mistico.svg"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-green-400"
                />
                <div>
                  <p className="text-xs text-zinc-400">Perfil emocional</p>
                  <p className="font-semibold text-green-300 text-sm">
                    Conectado 🌌
                  </p>
                </div>
              </div>
            </div>

            {/* Cards de funcionalidades premium */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {premiumFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-zinc-800 rounded-2xl p-5 shadow hover:shadow-green-400/20 hover:scale-[1.02] transition cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <h3 className="text-lg font-semibold text-green-400 mb-1">
                    {feature.icon} {feature.title}
                  </h3>
                  <p className="text-zinc-300 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Chat global premium */}
            <motion.section
              className="bg-zinc-800 rounded-xl p-6 shadow-lg max-h-[60vh] overflow-y-auto space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-bold text-green-400 mb-4">
                🌍 Chat Global Premium
              </h2>
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-zinc-700 p-3 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="text-green-300 font-semibold">
                    @usuário{i + 1}
                  </p>
                  <p className="text-zinc-100">
                    Mensagem inspiradora nº {i + 1} 💬
                  </p>
                </motion.div>
              ))}
            </motion.section>
          </main>

          {/* Sugestões à direita */}
          <aside className="hidden lg:block w-72 border-l border-zinc-700 p-6 space-y-6 bg-zinc-900">
            <h2 className="text-green-400 font-bold text-lg">💡 Sugestões</h2>
            <ul className="text-zinc-300 space-y-2 text-sm">
              <li>🎓 Nova trilha desbloqueada</li>
              <li>🧠 Dica emocional do dia</li>
              <li>🎁 Recompensa disponível</li>
            </ul>
          </aside>
        </div>
      )}
    </>
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
