import { prisma } from "@/config";

async function findAll() {
  return await prisma.offering.findMany({ include: { classe: { include: { course: { select: { name: true } } } } } });
}

async function findById(id: number) {
  return await prisma.offering.findUnique({ where: { id }, select: { id: true } });
}

export const offeringsRepository = {
  findAll,
  findById,
};
