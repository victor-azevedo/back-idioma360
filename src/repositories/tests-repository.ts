import { prisma } from "@/config";

async function findAll() {
  return await prisma.test.findMany({ include: { questions: true } });
}

async function findByTestId(id: number) {
  return await prisma.test.findFirst({ where: { id }, include: { questions: true } });
}

export const testsRepository = {
  findAll,
  findByTestId,
};
