import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findAll() {
  return await prisma.classe.findMany({ orderBy: { startDate: "asc" }, include: { course: true, offering: true } });
}

async function findById({ id }: Prisma.ClasseWhereUniqueInput) {
  return await prisma.classe.findUnique({ where: { id }, include: { offering: true } });
}

async function findClasseByIdWithUserEnrollment({ id, userId }: { id: number; userId: number }) {
  return await prisma.classe.findUnique({
    where: { id },
    include: { course: true, offering: true, enrollments: { orderBy: { id: "asc" }, where: { userId } } },
  });
}

async function createClasse(data: Prisma.ClasseCreateInput) {
  return await prisma.classe.create({ data, include: { course: true } });
}

async function updateClasse({ where, data }: Prisma.ClasseUpdateArgs) {
  return await prisma.classe.update({ where, data });
}

async function deleteClasse({ id }: Prisma.ClasseWhereUniqueInput) {
  return await prisma.classe.delete({ where: { id } });
}

async function getClasseResult({ id }: Prisma.ClasseWhereUniqueInput) {
  const resString = await prisma.$queryRaw`
    SELECT users."id", users."fullName", COUNT(questions."correctAnswer")::INTEGER as "correctAnswersCount"
    FROM users
    JOIN "UserAnswers" ON "UserAnswers"."userId" = users."id"
    JOIN questions ON questions."id" = "UserAnswers"."questionId"
    JOIN tests ON tests."id" = questions."testId"
    JOIN classes ON classes."testId" = tests."id"
    WHERE questions."correctAnswer" = "UserAnswers"."userAnswer" AND classes."id" = ${id}
    GROUP BY users."id", users."fullName"
    ORDER BY "correctAnswersCount" DESC;`;
  return resString;
}

export const classesRepository = {
  findAll,
  findById,
  findClasseByIdWithUserEnrollment,
  createClasse,
  updateClasse,
  deleteClasse,
  getClasseResult,
};
