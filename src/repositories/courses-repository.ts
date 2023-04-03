import { prisma } from "@/config";
import { OfferStatus } from "@prisma/client";

async function findAll() {
  return await prisma.course.findMany();
}

async function findAllWithClassesFilteredOfferStatus(status: OfferStatus) {
  return await prisma.course.findMany({ select: { name: true, classes: { where: { offering: { status } } } } });
}

async function findAllWithClasses() {
  return await prisma.course.findMany({ select: { name: true, classes: true } });
}

export const coursesRepository = {
  findAll,
  findAllWithClassesFilteredOfferStatus,
  findAllWithClasses,
};
