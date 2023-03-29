import { prisma } from "@/config";

async function findAll() {
  return await prisma.classe.findMany();
}

async function findById(id: number) {
  return await prisma.classe.findUnique({ where: { id }, include: { course: true, offering: true } });
}

export const classesRepository = {
  findAll,
  findById,
};
