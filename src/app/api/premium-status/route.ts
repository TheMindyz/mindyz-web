import { NextResponse } from "next/server";
import { verificarPremium } from "@/lib/verificarPremium";

export async function GET(req: Request) {
  const email = req.headers.get("x-user-email");

  if (!email) {
    return NextResponse.json({ error: "Email ausente" }, { status: 400 });
  }

  const ativo = await verificarPremium(email);
  return NextResponse.json({ premium: ativo });
}
