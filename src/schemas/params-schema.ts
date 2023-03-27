import Joi, { ObjectSchema } from "joi";

export const paramsSchema: ObjectSchema = Joi.object({
  id: Joi.number().greater(0).required(),
});
