import { prisma } from "@/lib/prisma";

export async function verificarPremium(email: string): Promise<boolean> {
  const resultado = await prisma.payment.findFirst({
    where: {
      user: {
        email,
      },
    },
  });

  return resultado?.status === "ativo";
}
