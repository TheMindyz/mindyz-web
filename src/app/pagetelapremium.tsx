"use client";

import React, { useEffect, useState } from "react";
import BoasVindasPremium from "./api/components/BoasVindas";
import FuncoesPremium from "./api/components/FuncoesPremium";

export default function PremiumPage() {
  const [mostrarBoasVindas, setMostrarBoasVindas] = useState(false);

  useEffect(() => {
    const jaViu = localStorage.getItem("jaViuBoasVindasPremium");
    if (!jaViu) {
      setMostrarBoasVindas(true);
      localStorage.setItem("jaViuBoasVindasPremium", "true");
    }
  }, []);

  if (mostrarBoasVindas) {
    return (
      <BoasVindasPremium aoContinuar={() => setMostrarBoasVindas(false)} />
    );
  }

  return <FuncoesPremium />;
}
