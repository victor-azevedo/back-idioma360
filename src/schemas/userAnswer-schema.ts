import { Options, UserAnswers } from "@prisma/client";
import Joi, { ArraySchema } from "joi";

export const userAnswerSchema: ArraySchema = Joi.array<UserAnswersBody>().items(
  Joi.object<QuestionAnswer>({
    questionId: Joi.number().greater(0).required(),
    userAnswer: Joi.string().valid(...Object.keys(Options)),
  }),
);

type QuestionAnswer = Pick<UserAnswers, "questionId" | "userAnswer">;
export type UserAnswersBody = QuestionAnswer[];
