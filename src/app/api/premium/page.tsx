import PremiumGate from "@/components/PremiumGate";

export default function PaginaPremium() {
  const email = "teste@teste.com"; // teste com um e-mail ativo no banco

  return (
    <PremiumGate email={email}>
      <div style={{ padding: "2rem" }}>
        <h1>🎉 Conteúdo Premium Liberado!</h1>
        <p>Você tem acesso total ao conteúdo especial.</p>
      </div>
    </PremiumGate>
  );
}
