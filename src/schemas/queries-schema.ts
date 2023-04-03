import { OfferStatus, StateUF } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";

export const querySchema: ObjectSchema = Joi.object<QuerySchema>({
  uf: Joi.string()
    .length(2)
    .valid(...Object.keys(StateUF))
    .optional(),
  enrollments: Joi.boolean().optional(),
  offerStatus: Joi.string()
    .valid(...Object.keys(OfferStatus))
    .optional(),
});

export type QuerySchema = Partial<{
  uf: StateUF;
  enrollments: boolean;
  offerStatus: OfferStatus;
}>;
