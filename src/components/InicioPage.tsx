"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  setStep: (step: string) => void;
}

export default function InicioPage({ setStep }: Props) {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white px-6 py-10 space-y-10">
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

      {/* Boas-vindas */}
      <section>
        <h1 className="text-3xl font-bold text-green-400 mb-2">
          Olá, Explorador(a) 🌿
        </h1>
        <p className="text-zinc-300 text-sm">
          Seu estado emocional atual parece ser{" "}
          <strong className="text-yellow-300">ansioso</strong>. Recomendamos
          atividades de respiração e foco no presente.
        </p>
      </section>

      {/* Cards com recomendações */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {[
          {
            icon: "📓",
            title: "Diário emocional",
            desc: "Escreva seus sentimentos com segurança",
          },
          {
            icon: "🧘‍♀️",
            title: "Respiração guiada",
            desc: "Exercício de 5 minutos para relaxar",
          },
          {
            icon: "🎧",
            title: "Meditação",
            desc: "Escute uma trilha calmante",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-zinc-800 p-5 rounded-2xl shadow hover:shadow-green-400/20 hover:scale-[1.02] transition cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold text-green-400 mb-1">
              {item.icon} {item.title}
            </h3>
            <p className="text-zinc-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Missões da semana */}
      <section className="bg-zinc-800 p-6 rounded-2xl shadow space-y-3">
        <h2 className="text-lg text-green-400 font-semibold">
          🎯 Missões da semana
        </h2>
        <ul className="text-zinc-300 list-disc pl-5 text-sm space-y-1">
          <li>Fazer 3 check-ins emocionais</li>
          <li>Responder 1 desafio de autoconhecimento</li>
          <li>Participar de uma conversa na comunidade</li>
        </ul>
      </section>

      {/* Acesso rápido */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-zinc-300">
        {[
          { icon: "🧠", label: "Diário" },
          { icon: "💬", label: "Chat IA" },
          { icon: "🚨", label: "SOS emocional" },
          { icon: "🌐", label: "Comunidade" },
        ].map((btn, i) => (
          <div
            key={i}
            className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer"
          >
            <div className="text-2xl mb-1">{btn.icon}</div>
            <div>{btn.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
