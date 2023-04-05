import { OfferStatus, StateUF } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";

export const querySchema: ObjectSchema = Joi.object<QuerySchema>({
  uf: Joi.string()
    .length(2)
    .valid(...Object.keys(StateUF))
    .optional(),
  offerStatus: Joi.string()
    .valid(...Object.keys(OfferStatus))
    .optional(),
  address: Joi.boolean().optional(),
});

export type QuerySchema = Partial<{
  uf: StateUF;
  offerStatus: OfferStatus;
  address: string;
}>;
