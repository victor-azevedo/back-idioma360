import { Options, Question } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";

export const singleQuestionSchema: ObjectSchema = Joi.object<SingleQuestionBody>({
  title: Joi.string().min(3).required(),
  optionA: Joi.string().required(),
  optionB: Joi.string().required(),
  optionC: Joi.string().required(),
  optionD: Joi.string().required(),
  correctAnswer: Joi.string()
    .valid(...Object.keys(Options))
    .required(),
  testId: Joi.number().integer().greater(0).required().prefs({ convert: false }),
});

export type SingleQuestionBody = Pick<
  Question,
  "title" | "optionA" | "optionB" | "optionC" | "optionD" | "correctAnswer" | "testId"
>;
