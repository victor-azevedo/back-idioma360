import Joi, { ObjectSchema } from "joi";

export const paramsSchema: ObjectSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .required(),
});

export type ParamsSchema = Partial<{
  id: string;
}>;
