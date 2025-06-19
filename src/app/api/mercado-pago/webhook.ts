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
    const body = req.body;
    const paymentId = body.data?.id;
    const type = body.type;

    if (type === "payment") {
      console.log("Pagamento recebido! ID:", paymentId);

      const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
      if (!token) {
        console.error("Token do Mercado Pago não configurado.");
        return res.status(500).json({ error: "Token ausente" });
      }

      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Erro ao consultar pagamento:", await response.text());
        return res.status(500).json({ error: "Erro ao consultar pagamento" });
      }

      const paymentData = await response.json();
      const email = paymentData.payer?.email;

      if (!email) {
        return res.status(400).json({ error: "E-mail não encontrado" });
      }

      if (paymentData.status === "approved") {
        await prisma.pagamento.upsert({
          where: { email },
          update: {
            status: "ativo",
            criadoEm: new Date(),
          },
          create: {
            email,
            status: "ativo",
            criadoEm: new Date(),
          },
        });

        console.log(`✅ Status premium ativado para: ${email}`);
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
