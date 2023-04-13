import joiDate from "@joi/date";
import { OfferStatus, Prisma } from "@prisma/client";
import coreJoi, { ObjectSchema } from "joi";

const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const offeringsQuerySchema: ObjectSchema = Joi.object<OfferingsQuerySchemaJoi>({
  status: Joi.string()
    .valid(...Object.keys(OfferStatus))
    .optional(),
  enrollments: Joi.boolean().optional(),
});

export const offeringSchema: ObjectSchema = Joi.object<OfferingBody>({
  name: Joi.string().min(3).required(),
  startDate: Joi.date().format("YYYY-MM-DD").required(),
  endDate: Joi.date().format("YYYY-MM-DD").required(),
  testDate: Joi.date().format("YYYY-MM-DD").required(),
  testStartTime: Joi.date().format("HH:mm").required(),
  testEndTime: Joi.date().format("HH:mm").required(),
  resultDate: Joi.date().format("YYYY-MM-DD").required(),
  enrollPrice: Joi.number().min(0).required(),
  status: Joi.string()
    .valid(...Object.keys(OfferStatus))
    .required(),
});

export const offeringSchemaPatch: ObjectSchema = Joi.object<Partial<OfferingBody>>({
  name: Joi.string().min(3).optional(),
  startDate: Joi.date().format("YYYY-MM-DD").optional(),
  endDate: Joi.date().format("YYYY-MM-DD").optional(),
  testDate: Joi.date().format("YYYY-MM-DD").optional(),
  testStartTime: Joi.date().format("HH:mm").optional(),
  testEndTime: Joi.date().format("HH:mm").optional(),
  resultDate: Joi.date().format("YYYY-MM-DD").optional(),
  enrollPrice: Joi.number().min(0).optional(),
  status: Joi.string()
    .valid(...Object.keys(OfferStatus))
    .optional(),
});

type OfferingsQuerySchemaJoi = {
  status: OfferStatus;
  enrollments: string;
};
export type OfferingsQuerySchema = Partial<OfferingsQuerySchemaJoi>;
export type OfferingBody = Prisma.OfferingCreateInput;
