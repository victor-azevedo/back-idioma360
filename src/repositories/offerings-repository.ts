import { prisma } from "@/config";

async function findAll() {
  return await prisma.offering.findMany({ include: { classes: { include: { course: true } } } });
}

async function findAllWithUserEnrollments(userId: number) {
  return await prisma.offering.findMany({
    include: { classes: { include: { course: true, enrollments: { where: { userId } } } } },
  });
}

export const offeringsRepository = {
  findAll,
  findAllWithUserEnrollments,
};
