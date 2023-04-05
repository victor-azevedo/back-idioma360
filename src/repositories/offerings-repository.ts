import { prisma } from "@/config";
import { OfferStatus } from "@prisma/client";

async function findAll() {
  return await prisma.offering.findMany({
    include: {
      classes: {
        distinct: ["courseId"],
        orderBy: { course: { name: "asc" } },
        select: { course: { select: { id: true, name: true, imageUrl: true } } },
      },
    },
    orderBy: { id: "asc" },
  });
}

async function findAllWithUserEnrollments(userId: number) {
  return await prisma.offering.findMany({
    include: {
      classes: { orderBy: { course: { name: "asc" } }, include: { course: true, enrollments: { where: { userId } } } },
    },
    orderBy: { id: "asc" },
  });
}

async function findAllFilterStatus(status: OfferStatus) {
  return await prisma.offering.findMany({
    where: { status },
    include: {
      classes: {
        distinct: ["courseId"],
        orderBy: { course: { name: "asc" } },
        select: { course: { select: { id: true, name: true, imageUrl: true } } },
      },
    },
    orderBy: { id: "asc" },
  });
}

export const offeringsRepository = {
  findAll,
  findAllWithUserEnrollments,
  findAllFilterStatus,
};
