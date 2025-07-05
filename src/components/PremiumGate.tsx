"use client";

import React, { useEffect, useState } from "react";

type PremiumGateProps = {
  email?: string; // agora opcional
  children?: React.ReactNode;
};

export default function PremiumGate({ email, children }: PremiumGateProps) {
  const [temAcesso, setTemAcesso] = useState<boolean | null>(null);
  const [emailVerificado, setEmailVerificado] = useState<string>("");

  useEffect(() => {
    // Se não veio email pela prop, tenta pegar do localStorage
    const emailFinal = email || localStorage.getItem("user_email") || "";
    setEmailVerificado(emailFinal);

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    if (usuario?.email === emailFinal && usuario?.isPremium === true) {
      setTemAcesso(true);
    } else {
      setTemAcesso(false);
    }
  }, [email]);

  if (temAcesso === null) {
    return (
      <p className="text-white text-center mt-10">Verificando acesso...</p>
    );
  }

  if (!temAcesso) {
    return (
      <div className="text-white text-center mt-10">
        <p>Você ainda não tem acesso premium.</p>
        <p className="text-sm text-zinc-400 mt-2">
          Email: {emailVerificado || "desconhecido"}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
