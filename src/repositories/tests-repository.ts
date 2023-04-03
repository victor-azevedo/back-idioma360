import { prisma } from "@/config";

async function findAll() {
  return await prisma.test.findMany({ include: { questions: true } });
}

export const testsRepository = {
  findAll,
};
