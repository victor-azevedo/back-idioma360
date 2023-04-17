import { notFoundError } from "@/errors";
import { questionsRepository, testsRepository } from "@/repositories";
import { SingleQuestionBody } from "@/schemas";

async function findByTestId(testId: number) {
  return await questionsRepository.findByTestId({ testId });
}

async function createQuestion(question: SingleQuestionBody) {
  const { testId } = question;

  const isThereTest = await testsRepository.findByTestIdAdmin({ id: testId });
  if (!isThereTest) {
    throw notFoundError();
  }

  return await questionsRepository.createQuestion(question);
}

async function deleteQuestion(id: number) {
  const isThereQuestion = await questionsRepository.findById({ id });
  if (!isThereQuestion) {
    throw notFoundError();
  }

  return await questionsRepository.deleteQuestion({ id });
}

export const questionsService = {
  findByTestId,
  createQuestion,
  deleteQuestion,
};
