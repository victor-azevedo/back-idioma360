import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";

async function findByUserIdAndClasseId({ userId, classeId }: Pick<Enrollment, "userId" | "classeId">) {
  return await prisma.enrollment.findFirst({ where: { userId, AND: { classeId } }, select: { id: true } });
}

async function createEnrollment(data: Pick<Enrollment, "userId" | "classeId">) {
  await prisma.enrollment.create({ data });
}

export const enrollmentsRepository = {
  findByUserIdAndClasseId,
  createEnrollment,
};
