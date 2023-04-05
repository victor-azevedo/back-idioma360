import { prisma } from "@/config";
import { OfferStatus } from "@prisma/client";

async function findAll() {
  return await prisma.offering.findMany({
    include: {
      classes: { distinct: ["courseId"], select: { course: { select: { id: true, name: true, imageUrl: true } } } },
    },
  });
}

async function findAllWithUserEnrollments(userId: number) {
  return await prisma.offering.findMany({
    include: { classes: { include: { course: true, enrollments: { where: { userId } } } } },
  });
}

async function findAllFilterStatus(status: OfferStatus) {
  return await prisma.offering.findMany({
    where: { status },
    include: {
      classes: { distinct: ["courseId"], select: { course: { select: { id: true, name: true, imageUrl: true } } } },
    },
  });
}

export const offeringsRepository = {
  findAll,
  findAllWithUserEnrollments,
  findAllFilterStatus,
};
