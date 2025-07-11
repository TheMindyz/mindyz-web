import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Caminho ajustado conforme sua estrutura

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email;

    const pagamento = await prisma.payment.findFirst({
      where: {
        user: {
          email: email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const status = pagamento?.status || "inativo";
    console.log(`-> Status de ${email}: ${status}`);

    return NextResponse.json({ status });
  } catch (error) {
    console.error("❌ Erro ao verificar status premium:", error);
    return NextResponse.json(
      { error: "Erro ao verificar status", status: 500 },
      { status: 500 }
    );
  }
}
