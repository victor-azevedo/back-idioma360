import { prisma } from "@/config";

async function findAll() {
  return await prisma.classe.findMany({ orderBy: { startDate: "asc" }, include: { course: true, offering: true } });
}

async function findById(id: number) {
  return await prisma.classe.findUnique({ where: { id }, include: { offering: true } });
}

async function findClasseByIdWithUserEnrollment({ id, userId }: { id: number; userId: number }) {
  return await prisma.classe.findUnique({
    where: { id },
    include: { course: true, offering: true, enrollments: { orderBy: { id: "asc" }, where: { userId } } },
  });
}

export const classesRepository = {
  findAll,
  findById,
  findClasseByIdWithUserEnrollment,
};
