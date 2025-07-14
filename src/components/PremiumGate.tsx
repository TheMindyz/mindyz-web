"use client";

import React, { useEffect, useState } from "react";

type PremiumGateProps = {
  email?: string;
  children?: React.ReactNode;
};

export default function PremiumGate({ email, children }: PremiumGateProps) {
  const [temAcesso, setTemAcesso] = useState<boolean | null>(null);
  const [emailVerificado, setEmailVerificado] = useState<string>("");

  useEffect(() => {
    const emailFinal = email || localStorage.getItem("user_email") || "";

    if (!emailFinal) {
      setTemAcesso(false);
      return;
    }

    setEmailVerificado(emailFinal);

    // Se o usuário já é premium no localStorage, pula verificação
    const localPremium = localStorage.getItem("user_premium");
    if (localPremium === "true") {
      setTemAcesso(true);
      return;
    }

    const verificarStatus = async () => {
      try {
        const res = await fetch(`/api/premium-status?email=${emailFinal}`);
        const data = await res.json();

        if (data?.isPremium) {
          localStorage.setItem("user_premium", "true");
          setTemAcesso(true);
        } else {
          setTemAcesso(false);
        }
      } catch (err) {
        console.error("Erro ao verificar status premium:", err);
        setTemAcesso(false);
      }
    };

    verificarStatus();
  }, [email]);

  if (temAcesso === null) {
    return (
      <p className="text-white text-center mt-10">Verificando acesso...</p>
    );
  }

  if (!temAcesso) {
    return (
      <div className="text-white text-center mt-10">
        <p>🚫 Você ainda não tem acesso premium.</p>
        <p className="text-sm text-zinc-400 mt-2">Email: {emailVerificado}</p>
      </div>
    );
  }

  return <>{children}</>;
}
