import { conflictError, forbiddenError } from "@/errors";
import { UserAnswersBody } from "@/schemas/userAnswer-schema";
import { Question, Test, UserAnswers } from "@prisma/client";

export function isEnrolledUserForThisTestOrError<T>(test: T) {
  const isEnrolledUserForThisTest = test ? true : false;
  if (!isEnrolledUserForThisTest) {
    throw forbiddenError("Não permitido. Usuário não inscrito para este teste");
  }
  return true;
}

export function isTestAnsweredFullyOrError(test: UserTestId, userAnswers: UserAnswersBody) {
  const numberOfQuestions = test._count.questions;
  const numberOfAnswers = userAnswers.length;
  if (numberOfQuestions !== numberOfAnswers) {
    throw conflictError("Quantidade de questões do teste diferente da respostas recebidas");
  }
  return true;
}

export function isOnlyQuestionsForThisTestOrError(test: UserTestId, userAnswers: UserAnswersBody) {
  const { questions } = test;
  const questionIdList = questions.map((question) => question.id);
  userAnswers.forEach((userAnswer) => {
    // TODO: refactor to binary search
    const isTestQuestion = questionIdList.includes(userAnswer.questionId);
    if (!isTestQuestion) {
      throw conflictError("Recebido resposta de questão que não pertence a este teste");
    }
  });
  return true;
}

export function hasUserNoAnswersForThisTestOrError(userAnswersDB: { UserAnswers: UserAnswers[] }) {
  const isThereUserAnswerForThisTest = userAnswersDB.UserAnswers.length > 0 ? true : false;
  if (isThereUserAnswerForThisTest) {
    throw conflictError("Usuário já possui respostas para este teste");
  }
}

type UserTestId = Test & { questions: Question[]; _count: { questions: number } };
