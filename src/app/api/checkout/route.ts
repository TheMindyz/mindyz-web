import { NextResponse } from "next/server";
import { MP_ACCESS_TOKEN } from "@/lib/mercadoPago";
import { prisma } from "@/lib/prisma"; // ✅ Certifique-se de que o prisma está importado corretamente

export async function POST(req: Request) {
  const body = await req.json();

  // 1. Realiza o pagamento com Mercado Pago
  const response = await fetch("https://api.mercadopago.com/v1/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transaction_amount: body.valor,
      token: body.token,
      description: "Assinatura Mindyz",
      installments: 1,
      payment_method_id: body.metodoPagamento,
      payer: {
        email: body.email,
        identification: {
          type: "CPF",
          number: body.cpf,
        },
      },
    }),
  });

  const data = await response.json();

  // 2. Se o pagamento foi aprovado, grava no banco que é Premium
  if (data.status === "approved") {
    try {
      await prisma.user.upsert({
        where: { email: body.email },
        update: { isPremium: true },
        create: {
          email: body.email,
          isPremium: true,
        },
      });
    } catch (err) {
      console.error("Erro ao salvar no banco:", err);
    }
  }

  // 3. Retorna a resposta do Mercado Pago (inclui status, id, etc)
  return NextResponse.json(data);
}
