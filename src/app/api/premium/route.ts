export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email;

    const pagamento = await prisma.pagamento.findUnique({
      where: { email },
    });

    const status = pagamento?.status || "inativo";
    console.log(`→ Status de ${email}: ${status}`);

    return NextResponse.json({ status });
  } catch (error) {
    console.error("X Erro ao verificar status premium:", error);
    return NextResponse.json(
      { error: "Erro ao verificar status" },
      { status: 500 }
    );
  }
}
