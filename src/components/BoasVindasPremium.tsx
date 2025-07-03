"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BoasVindasPremium({
  aoContinuar,
}: {
  aoContinuar: () => void;
}) {
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimar(true), 300);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden text-white">
      {/* Fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black z-0" />

      {/* Portal com animação de expansão */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 1.2, 2.4], opacity: [1, 0.5, 0.1] }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border-4 border-green-400 rounded-full z-10"
        style={{
          boxShadow:
            "0 0 60px 20px rgba(34, 197, 94, 0.6), inset 0 0 80px rgba(34, 197, 94, 0.4)",
        }}
      />

      {/* Fumaça leve */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="fumaca" />
      </div>

      {/* Conteúdo animado */}
      <AnimatePresence>
        {animar && (
          <motion.div
            className="relative z-20 text-center px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold text-green-400 mb-6 drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
            >
              Acesso Exclusivo Liberado
              <div className="flex justify-center mt-4">
                <motion.img
                  src="/logo.png"
                  alt="Logo Mindyz"
                  className="h-16 md:h-20 drop-shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 }}
                />
              </div>
            </motion.h1>

            <motion.p
              className="text-lg text-zinc-300 max-w-md mx-auto mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
            >
              Você acaba de desbloquear uma jornada de autoconhecimento única.
            </motion.p>

            <motion.p
              className="text-sm text-zinc-500 italic max-w-sm mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
            >
              Prepare-se para experiências secretas, ferramentas raras e
              insights só para assinantes.
            </motion.p>

            <motion.button
              onClick={aoContinuar}
              className="mt-8 bg-green-500 text-black font-semibold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1] }}
              transition={{ delay: 2.5, duration: 1.5, repeat: Infinity }}
            >
              Entrar no Portal
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
