import { NextRequest, NextResponse } from "next/server";
import { verificarPremium } from "@/lib/verificarPremium";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email não fornecido" }, { status: 400 });
  }

  try {
    const isPremium = await verificarPremium(email);
    return NextResponse.json({ isPremium });
  } catch (error) {
    console.error("Erro ao verificar status premium:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
