import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByUserIdAndClasseId({ userId, classeId }: Prisma.EnrollmentCreateManyInput) {
  return await prisma.enrollment.findFirst({ where: { userId, AND: { classeId } }, select: { id: true } });
}

async function createEnrollment({ userId, classeId }: Prisma.EnrollmentCreateManyInput) {
  await prisma.enrollment.create({ data: { userId, classeId } });
}

export const enrollmentsRepository = {
  findByUserIdAndClasseId,
  createEnrollment,
};
