"use client";

import React, { useEffect, useState } from "react";

// Tipagem correta com children
interface PremiumGateProps {
  email: string;
  children: React.ReactNode;
}

export default function PremiumGate({ email, children }: PremiumGateProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarStatus = async () => {
      try {
        const res = await fetch(`/api/premium-status?email=${email}`);
        const data = await res.json();
        setIsPremium(data?.isPremium);
      } catch (err) {
        console.error("Erro ao verificar status premium:", err);
      } finally {
        setCarregando(false);
      }
    };

    verificarStatus();
  }, [email]);

  if (carregando) return <p>Verificando acesso...</p>;

  if (!isPremium)
    return <p>🚫 Acesso negado: esta área é exclusiva para membros premium.</p>;

  return <>{children}</>;
}
