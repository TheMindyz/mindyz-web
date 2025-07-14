import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface MercadoPagoWebhookBody {
  type: string;
  data?: {
    id?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: MercadoPagoWebhookBody = await req.json();
    const paymentId = body.data?.id;
    const type = body.type;

    if (!paymentId) {
      console.warn("Webhook recebido sem paymentId");
      return NextResponse.json({ error: "paymentId ausente" }, { status: 400 });
    }

    if (type === "payment") {
      const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
      if (!token) {
        console.error("Token Mercado Pago ausente");
        return NextResponse.json({ error: "Token ausente" }, { status: 500 });
      }

      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        console.error(
          "Erro ao consultar pagamento Mercado Pago",
          await response.text()
        );
        return NextResponse.json(
          { error: "Erro ao consultar pagamento" },
          { status: 500 }
        );
      }

      const paymentData = await response.json();
      const email = paymentData.external_reference;

      if (!email) {
        console.warn("Pagamento aprovado mas sem external_reference (email)");
        return NextResponse.json(
          { error: "Email não encontrado no pagamento" },
          { status: 400 }
        );
      }

      // Apenas ativa se status é aprovado
      if (paymentData.status === "approved") {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          console.warn(`Usuário não encontrado para email: ${email}`);
          return NextResponse.json(
            { error: "Usuário não encontrado" },
            { status: 404 }
          );
        }

        // Registra o pagamento (sem checar duplicação por externalPaymentId)
        await prisma.payment.create({
          data: {
            amount: paymentData.transaction_amount,
            status: "approved",
            userId: user.id,
            email: user.email,
            externalPaymentId: paymentId,
          },
        });

        // Atualiza usuário para premium
        await prisma.user.update({
          where: { id: user.id },
          data: { isPremium: true },
        });

        console.log(`✅ Premium ativado para: ${email}`);
        return NextResponse.json({ message: "Premium ativado" });
      } else {
        console.log(`Pagamento status não aprovado: ${paymentData.status}`);
        return NextResponse.json({
          message: `Pagamento status: ${paymentData.status}`,
        });
      }
    }

    return NextResponse.json({ message: "Evento ignorado" });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
