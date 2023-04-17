import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findAll() {
  return await prisma.test.findMany({
    orderBy: [{ course: { name: "asc" } }, { name: "asc" }],
    include: { course: { select: { id: true, name: true, imageUrl: true } }, _count: { select: { questions: true } } },
  });
}

async function findTestQuestionsByTestIdForThisUser({ testId, userId }: { testId: number; userId: number }) {
  return await prisma.test.findFirst({
    where: { id: testId, AND: { classe: { some: { enrollments: { some: { userId } } } } } },
    select: {
      name: true,
      questions: {
        orderBy: { id: "asc" },
        select: { id: true, title: true, optionA: true, optionB: true, optionC: true, optionD: true },
      },
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

async function createTest(data: Prisma.TestCreateManyInput) {
  return await prisma.test.create({ data, select: { id: true } });
}

async function createQuestions(data: Prisma.QuestionCreateManyInput[]) {
  await prisma.question.createMany({ data });
}

export const testsRepository = {
  findAll,
  findTestQuestionsByTestIdForThisUser,
  findFullTestByTestIdForThisUser,
  createUserAnswers,
  createTest,
  createQuestions,
};
