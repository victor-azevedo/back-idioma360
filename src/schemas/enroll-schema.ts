import Joi, { ObjectSchema } from "joi";

export const enrollSchema: ObjectSchema = Joi.object<EnrollBody>({
  classeId: Joi.number().greater(0).required(),
});

export type EnrollBody = { classeId: number };
