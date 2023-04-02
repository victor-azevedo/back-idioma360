import { prisma } from "@/config";

async function findAll() {
  return await prisma.offering.findMany({ include: { classes: { include: { course: true } } } });
}

async function findAllWithUserEnrollments(userId: number) {
  return await prisma.offering.findMany({
    include: { classes: { include: { enrollments: { where: { userId } } } } },
  });
}

async function findById(id: number) {
  return await prisma.offering.findUnique({ where: { id }, select: { id: true } });
}

export const offeringsRepository = {
  findAll,
  findById,
  findAllWithUserEnrollments,
};
