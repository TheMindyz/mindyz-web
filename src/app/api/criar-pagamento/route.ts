import { NextRequest, NextResponse } from "next/server";
import mercadopago from "mercadopago";

type Preference = {
  items: {
    title: string;
    quantity: number;
    unit_price: number;
  }[];
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return: "approved" | "all";
  currency_id: string;
  external_reference?: string;
};

// 👇 OBRIGATÓRIO para Vercel rodar API com código dinâmico
export const dynamic = "force-dynamic";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { email, plano } = await req.json();

    if (!email || !plano) {
      return NextResponse.json(
        { error: "Email ou plano não informado." },
        { status: 400 }
      );
    }

    const preference: Preference = {
      items: [
        {
          title:
            plano === "anual"
              ? "Mindzy Premium - Plano Anual"
              : plano === "trimestral"
              ? "Mindzy Premium - Plano Trimestral"
              : "Mindzy Premium - Plano Mensal",
          quantity: 1,
          unit_price:
            plano === "anual" ? 69.9 : plano === "trimestral" ? 19.9 : 7.9,
        },
      ],
      back_urls: {
        success: "https://mindyz.vercel.app/boasvindaspremium",
        failure: "https://mindyz.vercel.app",
        pending: "https://mindyz.vercel.app",
      },
      auto_return: "approved",
      currency_id: "BRL",
      external_reference: email,
    };

    const response = await mercadopago.preferences.create(preference);

    return NextResponse.json({ url: response.body.init_point });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    return NextResponse.json(
      { error: "Erro ao criar preferência de pagamento." },
      { status: 500 }
    );
  }
}
