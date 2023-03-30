import { prisma } from "@/config";

async function findAll() {
  return await prisma.classe.findMany();
}

async function findById({ id, userId }: { id: number; userId: number }) {
  return await prisma.classe.findUnique({
    where: { id },
    include: { course: true, offering: { include: { enrolment: { where: { userId } } } } },
  });
}

export const classesRepository = {
  findAll,
  findById,
};
