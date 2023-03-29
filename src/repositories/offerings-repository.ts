import { prisma } from "@/config";

async function findAll() {
  return await prisma.offering.findMany({ include: { classe: { include: { course: { select: { name: true } } } } } });
}

export const offeringsRepository = {
  findAll,
};
