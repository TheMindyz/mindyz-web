import { NextRequest, NextResponse } from "next/server";
import mercadopago from "mercadopago";

// Configurar a autenticação
(mercadopago as any).configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const preference = {
      items: [
        {
          title: body.title || "Produto Mindyz",
          quantity: 1,
          unit_price: body.price || 10,
        },
      ],
      back_urls: {
        success: "https://mindyz.com.br/sucesso",
        failure: "https://mindyz.com.br/falha",
        pending: "https://mindyz.com.br/pendente",
      },
      auto_return: "approved",
    };

    const response = await (mercadopago as any).preferences.create(preference);

    return NextResponse.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar pagamento" },
      { status: 500 }
    );
  }
}
