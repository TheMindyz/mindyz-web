"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Rocket } from "lucide-react";

declare global {
  interface Window {
    MercadoPago: any;
    mp: any;
  }
}

export default function FormularioPagamento({
  plano: planoInicial,
  voltar,
  onPagamentoAprovado,
}: {
  plano?: string;
  voltar?: () => void;
  onPagamentoAprovado?: () => void;
}) {
  const [plano, setPlano] = useState<string | null>(planoInicial || null);
  const [valor, setValor] = useState("7.90");

  useEffect(() => {
    if (!plano) return;

    const valores: Record<string, string> = {
      mensal: "7.90",
      trimestral: "19.90",
      anual: "69.90",
    };

    setValor(valores[plano] || "7.90");
  }, [plano]);

  useEffect(() => {
    if (!plano) return;

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const mp = new window.MercadoPago(
        process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || ""
      );
      window.mp = mp;

      mp.cardForm({
        amount: valor,
        autoMount: true,
        form: {
          id: "form-checkout",
          cardholderName: { id: "form-checkout__cardholderName" },
          cardNumber: { id: "form-checkout__cardNumber" },
          cardExpirationMonth: { id: "form-checkout__cardExpirationMonth" },
          cardExpirationYear: { id: "form-checkout__cardExpirationYear" },
          securityCode: { id: "form-checkout__securityCode" },
          identificationNumber: { id: "form-checkout__identificationNumber" },
          email: { id: "form-checkout__email" },
        },
        callbacks: {
          onSubmit: async (event: Event) => {
            event.preventDefault();
            const data = window.mp.cardForm.getCardFormData();
            try {
              const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  valor: parseFloat(valor),
                  token: data.token,
                  metodoPagamento: data.paymentMethodId,
                  email: data.email,
                  cpf: data.identificationNumber,
                  plano,
                }),
              });

              const resultado = await response.json();
              if (resultado.status === "approved") {
                alert("✅ Pagamento aprovado!");

                // Salva o e-mail no navegador (para saber que esse usuário é premium)
                localStorage.setItem("user_email", data.email);

                // Leva ele para a tela de boas-vindas
                if (typeof window !== "undefined") {
                  const evento = new CustomEvent("premiumLiberado");
                  window.dispatchEvent(evento);
                }

                if (onPagamentoAprovado) onPagamentoAprovado();
              } else {
                alert("❌ Pagamento recusado. Verifique os dados.");
              }
            } catch (error) {
              console.error("Erro no pagamento:", error);
              alert("Erro ao processar o pagamento.");
            }
          },
        },
      });
    };
    document.body.appendChild(script);
  }, [valor, plano, onPagamentoAprovado]);

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      {!plano ? (
        <div className="max-w-4xl mx-auto bg-zinc-900 border-4 border-green-500 rounded-3xl shadow-xl p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-500 mb-4 flex justify-center items-center gap-2">
            <span className="text-cyan-400">💎</span> Torne-se Premium Mindyz
          </h1>
          <p className="text-zinc-300 max-w-2xl mx-auto mb-10">
            A assinatura Premium desbloqueia recursos avançados, experiências
            exclusivas e suporte completo para o seu autodesenvolvimento
            emocional.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Plano Mensal */}
            <div className="bg-zinc-800 p-6 rounded-2xl border border-green-500 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-green-400">
                  Plano Mensal
                </h3>
                <p className="text-zinc-300 mt-2">
                  Ideal para quem está começando.
                </p>
                <p className="text-3xl font-extrabold text-white mt-4">
                  R$ 7,90
                </p>
                <p className="text-sm text-zinc-400">/ mês até dez/2025</p>
                <ul className="mt-4 space-y-1 text-green-300 text-sm">
                  <li>✔️ Acesso completo a recursos Premium</li>
                  <li>✔️ SOS Emocional completo</li>
                  <li>✔️ Conteúdos semanais exclusivos</li>
                </ul>
              </div>
              <button
                onClick={() => setPlano("mensal")}
                className="mt-6 bg-green-500 text-black font-bold py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600"
              >
                <Rocket size={18} /> Assinar Agora
              </button>
            </div>

            {/* Trimestral */}
            <div className="bg-zinc-800 p-6 rounded-2xl border border-emerald-500 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-emerald-400">
                  Plano Trimestral
                </h3>
                <p className="text-zinc-300 mt-2">
                  Mais economia com benefícios extras.
                </p>
                <p className="text-3xl font-extrabold text-white mt-4">
                  R$ 19,90
                </p>
                <p className="text-sm text-zinc-400">/ a cada 3 meses</p>
                <ul className="mt-4 space-y-1 text-green-300 text-sm">
                  <li>✔️ Tudo do plano mensal</li>
                  <li>✔️ Acesso a eventos ao vivo</li>
                  <li>✔️ Prioridade no suporte</li>
                </ul>
              </div>
              <button
                onClick={() => setPlano("trimestral")}
                className="mt-6 bg-emerald-500 text-black font-bold py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-600"
              >
                <Rocket size={18} /> Assinar Agora
              </button>
            </div>

            {/* Anual */}
            <div className="bg-zinc-800 p-6 rounded-2xl border border-teal-500 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-teal-400">Plano Anual</h3>
                <p className="text-zinc-300 mt-2">
                  Compromisso total com sua jornada.
                </p>
                <p className="text-3xl font-extrabold text-white mt-4">
                  R$ 69,90
                </p>
                <p className="text-sm text-zinc-400">/ ano</p>
                <ul className="mt-4 space-y-1 text-green-300 text-sm">
                  <li>✔️ Tudo dos outros planos</li>
                  <li>✔️ Acesso antecipado a novas funcionalidades</li>
                  <li>✔️ Reconhecimento na comunidade Mindyz</li>
                </ul>
              </div>
              <button
                onClick={() => setPlano("anual")}
                className="mt-6 bg-teal-500 text-black font-bold py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-teal-600"
              >
                <Rocket size={18} /> Assinar Agora
              </button>
            </div>
          </div>

          <button
            onClick={voltar}
            className="mt-10 underline text-sm text-zinc-400 hover:text-green-400"
          >
            ← Voltar para o portal
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-green-500 rounded-2xl p-6 shadow-lg max-w-xl mx-auto text-white relative">
          {voltar && (
            <button
              onClick={() => setPlano(null)}
              className="absolute top-4 left-4 text-green-400 hover:text-green-300 transition flex items-center gap-1"
            >
              <ArrowLeft size={20} /> <span>Voltar</span>
            </button>
          )}

          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center mt-6">
            💳 Checkout - Plano {plano}
          </h2>

          <form id="form-checkout" className="space-y-4">
            <label className="block text-sm text-zinc-300">
              Nome no Cartão
              <input
                id="form-checkout__cardholderName"
                placeholder="Ex: Maria Oliveira"
                className="w-full mt-1 p-2 rounded bg-zinc-800"
              />
            </label>

            <label className="block text-sm text-zinc-300">
              Número do Cartão
              <input
                id="form-checkout__cardNumber"
                placeholder="0000 0000 0000 0000"
                className="w-full mt-1 p-2 rounded bg-zinc-800"
              />
            </label>

            <div className="flex gap-4">
              <label className="w-1/2 text-sm text-zinc-300">
                Mês de Expiração (MM)
                <input
                  id="form-checkout__cardExpirationMonth"
                  placeholder="MM"
                  className="w-full mt-1 p-2 rounded bg-zinc-800"
                />
              </label>
              <label className="w-1/2 text-sm text-zinc-300">
                Ano de Expiração (YY)
                <input
                  id="form-checkout__cardExpirationYear"
                  placeholder="YY"
                  className="w-full mt-1 p-2 rounded bg-zinc-800"
                />
              </label>
            </div>

            <label className="block text-sm text-zinc-300">
              Código de Segurança (CVV)
              <input
                id="form-checkout__securityCode"
                placeholder="Ex: 123"
                className="w-full mt-1 p-2 rounded bg-zinc-800"
              />
            </label>

            <hr className="my-4 border-zinc-700" />

            <label className="block text-sm text-zinc-300">
              CPF
              <input
                id="form-checkout__identificationNumber"
                placeholder="Ex: 123.456.789-00"
                className="w-full mt-1 p-2 rounded bg-zinc-800"
              />
            </label>

            <hr className="my-4 border-zinc-700" />

            <label className="block text-sm text-zinc-300">
              E-mail
              <input
                id="form-checkout__email"
                placeholder="seuemail@email.com"
                className="w-full mt-1 p-2 rounded bg-zinc-800"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-green-500 text-black font-bold py-2 px-4 rounded hover:bg-green-600 transition mt-4"
            >
              💰 Confirmar Pagamento de R$ {valor}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
