import { Options, Question, Test } from "@prisma/client";
import Joi, { ArraySchema, ObjectSchema } from "joi";

const questionsSchema: ArraySchema = Joi.array<QuestionBody[]>().items(
  Joi.object<QuestionBody>({
    title: Joi.string().min(3).required(),
    optionA: Joi.string().required(),
    optionB: Joi.string().required(),
    optionC: Joi.string().required(),
    optionD: Joi.string().required(),
    correctAnswer: Joi.string()
      .valid(...Object.keys(Options))
      .required(),
  }),
);

export const testSchema: ObjectSchema = Joi.object<TestBody>({
  name: Joi.string().min(3).required(),
  questions: questionsSchema.length(5).optional(),
  courseId: Joi.number().integer().min(0).required().prefs({ convert: false }),
});

type QuestionBody = Pick<Question, "title" | "optionA" | "optionB" | "optionC" | "optionD" | "correctAnswer">;
export type TestBody = Pick<Test, "name"> & { questions?: QuestionBody[]; courseId: number };
