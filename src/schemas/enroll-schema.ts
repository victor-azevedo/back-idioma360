import Joi, { ObjectSchema } from "joi";

export const enrollSchema: ObjectSchema = Joi.object<EnrollBody>({
  classeId: Joi.number().integer().greater(0).required().prefs({ convert: false }),
});

export type EnrollBody = { classeId: number };
