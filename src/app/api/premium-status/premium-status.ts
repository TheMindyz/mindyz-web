import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: "E-mail ausente no corpo da requisição" });
    }

    const pagamento = await prisma.pagamento.findUnique({ where: { email } });

    const isPremium = pagamento?.status === "ativo";

    return res.status(200).json({ isPremium });
  } catch (error) {
    console.error("Erro ao verificar status premium:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
