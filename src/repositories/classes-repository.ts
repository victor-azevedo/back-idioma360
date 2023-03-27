import { prisma } from "@/config";

async function findAll() {
  return await prisma.classe.findMany();
}

export const classesRepository = {
  findAll,
};
