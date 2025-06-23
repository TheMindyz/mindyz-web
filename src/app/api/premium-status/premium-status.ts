// src/app/api/premium-status/route.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Troca de POST para GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const email = req.query.email as string;

    if (!email) {
      return res
        .status(400)
        .json({ error: "E-mail ausente na query da requisição" });
    }

    const pagamento = await prisma.pagamento.findUnique({ where: { email } });
    const isPremium = pagamento?.status === "ativo";

    return res.status(200).json({ isPremium });
  } catch (error) {
    console.error("Erro ao verificar status premium:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
