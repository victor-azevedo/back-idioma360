import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";

async function findByUserIdAndClasseId({ userId, classeId }: Pick<Enrollment, "userId" | "classeId">) {
  return await prisma.enrollment.findFirst({ where: { userId, AND: { classeId } }, select: { id: true } });
}

async function createEnrollment(data: Pick<Enrollment, "userId" | "classeId">) {
  await prisma.enrollment.create({ data });
}

async function findUserEnrolls({ userId }: Pick<Enrollment, "userId">) {
  return await prisma.enrollment.findMany({
    where: { userId },
    include: { classe: { include: { offering: { select: { testDate: true } } } } },
  });
}

async function findUserEnrollSameClasseOffer({ userId, classeId }: Pick<Enrollment, "userId" | "classeId">) {
  return await prisma.enrollment.findFirst({
    where: { userId, classe: { offering: { classes: { some: { id: classeId } } } } },
    select: { id: true },
  });
}

export const enrollmentsRepository = {
  findByUserIdAndClasseId,
  createEnrollment,
  findUserEnrolls,
  findUserEnrollSameClasseOffer,
};
