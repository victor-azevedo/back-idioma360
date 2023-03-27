import { prisma } from "@/config";

async function findAll() {
  return await prisma.course.findMany();
}

export const coursesRepository = {
  findAll,
};
