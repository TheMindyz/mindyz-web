import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const paymentId = body.data?.id;
    const type = body.type;

    if (type === "payment") {
      console.log("Pagamento recebido! ID:", paymentId);

      const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
      if (!token) {
        console.error("Token do Mercado Pago não configurado.");
        return NextResponse.json({ error: "Token ausente" }, { status: 500 });
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
        return NextResponse.json(
          { error: "Erro ao consultar pagamento" },
          { status: 500 }
        );
      }

      const paymentData = await response.json();
      const email = paymentData.payer?.email;

      if (!email) {
        console.warn("E-mail do pagador não encontrado.");
        return NextResponse.json(
          { error: "E-mail não encontrado" },
          { status: 400 }
        );
      }

      if (paymentData.status === "approved") {
        // Atualiza no banco como "ativo"
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
      } else {
        console.log(
          `⚠️ Pagamento não aprovado: status = ${paymentData.status}`
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
