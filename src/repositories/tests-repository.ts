import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findAll() {
  return await prisma.test.findMany({ include: { questions: true } });
}

async function findTestQuestionsByTestId(id: number) {
  return await prisma.test.findUnique({
    where: { id },
    select: {
      name: true,
      questions: { select: { id: true, title: true, optionA: true, optionB: true, optionC: true, optionD: true } },
    },
  });
}

async function findFullTestByTestIdForThisUser({ testId, userId }: { testId: number; userId: number }) {
  return await prisma.test.findFirst({
    where: { id: testId, AND: { classe: { some: { enrollments: { some: { userId } } } } } },
    include: {
      questions: { orderBy: { id: "asc" } },
      _count: { select: { questions: true } },
    },
  });
}

async function createUserAnswers(data: Prisma.UserAnswersCreateManyInput[]) {
  await prisma.userAnswers.createMany({ data });
}

export const testsRepository = {
  findAll,
  findTestQuestionsByTestId,
  findFullTestByTestIdForThisUser,
  createUserAnswers,
};
