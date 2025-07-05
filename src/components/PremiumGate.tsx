"use client";

import React, { useEffect, useState } from "react";

type PremiumGateProps = {
  email: string;
  children?: React.ReactNode;
};

export default function PremiumGate({ email, children }: PremiumGateProps) {
  const [temAcesso, setTemAcesso] = useState<boolean | null>(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    // Verifica se o email bate e se é premium
    if (usuario?.email === email && usuario?.isPremium === true) {
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
      </div>
    );
  }

  return <>{children}</>;
}
