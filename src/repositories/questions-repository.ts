import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findById({ id }: Prisma.QuestionWhereUniqueInput) {
  return await prisma.question.findUnique({ where: { id } });
}

async function findByTestId({ testId }: Prisma.QuestionWhereInput) {
  return await prisma.question.findMany({
    where: { testId },
    include: { _count: true, test: true },
  });
}

async function createQuestion(data: Prisma.QuestionUncheckedCreateInput) {
  return await prisma.question.create({ data });
}

async function deleteQuestion({ id }: Prisma.QuestionWhereUniqueInput) {
  return await prisma.question.delete({ where: { id } });
}

export const questionsRepository = {
  findById,
  findByTestId,
  createQuestion,
  deleteQuestion,
};
