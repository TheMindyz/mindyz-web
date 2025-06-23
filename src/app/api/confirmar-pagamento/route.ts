import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const pagamentoAtualizado = await prisma.pagamento.update({
      where: { email },
      data: { status: "ativo" },
    });

    return NextResponse.json({ ok: true, pagamento: pagamentoAtualizado });
  } catch (error) {
    console.error("Erro ao confirmar pagamento:", error);
    return NextResponse.json(
      { ok: false, error: "Erro interno" },
      { status: 500 }
    );
  }
}
