// src/app/api/components/telagratuítavoltar.tsx
"use client";

import { useRouter } from "next/navigation";

export default function BotaoVoltarGratuito() {
  const router = useRouter();

  return (
    <button onClick={() => router.push("/home")}>
      ← Voltar para Mindyz Gratuito
    </button>
  );
}
