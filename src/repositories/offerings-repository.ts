import { prisma } from "@/config";
import { OfferStatus, Prisma } from "@prisma/client";

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

async function createOffer(data: Prisma.OfferingCreateInput) {
  return await prisma.offering.create({ data });
}

async function updateOffer({ where, data }: Prisma.OfferingUpdateArgs) {
  return await prisma.offering.update({ where, data });
}

async function deleteOffer({ id }: Prisma.OfferingWhereUniqueInput) {
  return await prisma.offering.delete({ where: { id } });
}

export const offeringsRepository = {
  findAll,
  findAllWithUserEnrollments,
  findAllFilterStatus,
  createOffer,
  updateOffer,
  deleteOffer,
};
