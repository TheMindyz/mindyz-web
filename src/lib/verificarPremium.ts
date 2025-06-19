import { prisma } from "@/lib/prisma";

export async function verificarPremium(email: string): Promise<boolean> {
  const resultado = await prisma.pagamento.findUnique({
    where: { email },
  });

  return resultado?.status === "ativo";
}
