"use client";

import { useEffect, useState } from "react";
import PremiumGate from "@/components/PremiumGate";

export default function PaginaPremium() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailSalvo = localStorage.getItem("user_email");
    if (emailSalvo) {
      setEmail(emailSalvo);
    }
  }, []);

  if (!email) return <p>Carregando...</p>; // enquanto o email não está disponível

  return (
    <PremiumGate email={email}>
      <div style={{ padding: "2rem" }}>
        <h1>✨ Conteúdo Premium Liberado!</h1>
        <p>Você tem acesso total ao conteúdo especial.</p>
      </div>
    </PremiumGate>
  );
}
