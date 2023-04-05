import { OfferStatus } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";

export const offeringsQuerySchema: ObjectSchema = Joi.object<OfferingsQuerySchemaJoi>({
  status: Joi.string()
    .valid(...Object.keys(OfferStatus))
    .optional(),
  enrollments: Joi.boolean().optional(),
});

type OfferingsQuerySchemaJoi = {
  status: OfferStatus;
  enrollments: string;
};

export type OfferingsQuerySchema = Partial<OfferingsQuerySchemaJoi>;
