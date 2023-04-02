import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByUserIdAndOfferingId({ userId, offeringId }: Prisma.EnrollmentCreateManyInput) {
  return await prisma.enrollment.findFirst({ where: { userId, AND: { offeringId } }, select: { id: true } });
}

async function createEnrollment({ userId, offeringId }: Prisma.EnrollmentCreateManyInput) {
  await prisma.enrollment.create({ data: { userId, offeringId } });
}

export const enrollmentsRepository = {
  findByUserIdAndOfferingId,
  createEnrollment,
};
