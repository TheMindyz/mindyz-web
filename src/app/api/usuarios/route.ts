// src/app/api/usuarios/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });
  }

  try {
    const existe = await prisma.user.findUnique({ where: { email } });

    if (!existe) {
      await prisma.user.create({
        data: {
          email,
          isPremium: false,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
