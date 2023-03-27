import { prisma } from "@/config";

async function findAll() {
  return await prisma.offering.findMany();
}

export const offeringsRepository = {
  findAll,
};
