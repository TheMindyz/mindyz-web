// src/app/api/premium-status/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email não fornecido" }, { status: 400 });
  }

  // Lógica de teste: desbloqueia apenas para este e-mail
  if (email === "equipemindyz@gmail.com") {
    return NextResponse.json({ isPremium: true });
  }

  return NextResponse.json({ isPremium: false });
}
