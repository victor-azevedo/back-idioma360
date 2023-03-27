import { statesUFList } from "@/helpers";
import { StateUF } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";

export const querySchema: ObjectSchema = Joi.object<QuerySchema>({
  uf: Joi.string()
    .length(2)
    .valid(...statesUFList)
    .optional(),
});

export type QuerySchema = Partial<{
  uf: StateUF;
}>;
