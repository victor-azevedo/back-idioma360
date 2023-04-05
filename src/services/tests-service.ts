import { testsRepository, usersRepository } from "@/repositories";
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

async function findByTestId(id: number) {
  return await testsRepository.findTestQuestionsByTestId(id);
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

type CreateUserAnswer = {
  userId: number;
  testId: number;
  userAnswers: UserAnswersBody;
};

export const testsService = {
  findAll,
  findByTestId,
  createUserAnswers,
};
