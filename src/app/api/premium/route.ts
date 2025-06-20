import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // ✅ correto: importação nomeada

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email;

    const pagamento = await prisma.pagamento.findUnique({
      where: { email },
    });

    const status = pagamento?.status || "inativo";
    console.log(`📨 Status de ${email}: ${status}`);

    return NextResponse.json({ status }, { status: 200 });
  } catch (error) {
    console.error("❌ Erro ao verificar status premium:", error);
    return NextResponse.json(
      { error: "Erro ao verificar status" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
