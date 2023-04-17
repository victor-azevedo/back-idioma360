import { testsRepository, usersRepository } from "@/repositories";
import { TestBody } from "@/schemas";
import { UserAnswersBody } from "@/schemas/userAnswer-schema";
import {
  hasUserNoAnswersForThisTestOrError,
  isEnrolledUserForThisTestOrError,
  isOnlyQuestionsForThisTestOrError,
  isTestAnsweredFullyOrError,
} from "./validations";

async function findAll() {
  return await testsRepository.findAll();
}

async function findByTestId({ testId, userId }: { testId: number; userId: number }) {
  const testToAnswer = await testsRepository.findTestQuestionsByTestIdForThisUser({ testId, userId });

  isEnrolledUserForThisTestOrError(testToAnswer);

  const userAnswersInDB = await usersRepository.findUserTestAnswers({ userId, testId });
  hasUserNoAnswersForThisTestOrError(userAnswersInDB);

  return testToAnswer;
}

async function createUserAnswers({ userId, testId, userAnswers }: CreateUserAnswer) {
  const test = await testsRepository.findFullTestByTestIdForThisUser({ testId, userId });

  isEnrolledUserForThisTestOrError(test);

  isTestAnsweredFullyOrError(test, userAnswers);

  isOnlyQuestionsForThisTestOrError(test, userAnswers);

  const userAnswersInDB = await usersRepository.findUserTestAnswers({ userId, testId });
  hasUserNoAnswersForThisTestOrError(userAnswersInDB);

  const answersToDB = userAnswers.map((answer) => ({ ...answer, userId }));
  await testsRepository.createUserAnswers(answersToDB);
}

async function createTest({ name, questions, courseId }: TestBody) {
  const { id } = await testsRepository.createTest({ name, courseId });

  if (questions) {
    const questionsParsed = questions.map((question) => ({ ...question, testId: id }));
    await testsRepository.createQuestions(questionsParsed);
  }

  return id;
}

type CreateUserAnswer = {
  userId: number;
  testId: number;
  userAnswers: UserAnswersBody;
};

export const testsService = {
  findAll,
  findByTestId,
  createUserAnswers,
  createTest,
};
