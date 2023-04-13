import joiDate from "@joi/date";
import { Prisma, WeekDay } from "@prisma/client";
import coreJoi, { ObjectSchema } from "joi";

const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const classeSchema: ObjectSchema = Joi.object<ClasseBody>({
  name: Joi.string().min(3).required(),
  days: Joi.array()
    .items(Joi.string().valid(...Object.keys(WeekDay)))
    .min(1)
    .required(),
  startTime: Joi.date().format("HH:mm").required(),
  endTime: Joi.date().format("HH:mm").required(),
  startDate: Joi.date().format("YYYY-MM-DD").required(),
  endDate: Joi.date().format("YYYY-MM-DD").required(),
  courseId: Joi.number().integer().greater(0).required().prefs({ convert: false }),
  vacancies: Joi.number().integer().greater(0).required().prefs({ convert: false }),
  offeringId: Joi.number().integer().greater(0).required().prefs({ convert: false }),
});

export const classeSchemaPatch: ObjectSchema = Joi.object<Partial<ClasseBody>>({
  name: Joi.string().min(3).optional(),
  days: Joi.array()
    .items(Joi.string().valid(...Object.keys(WeekDay)))
    .min(1)
    .optional(),
  startTime: Joi.date().format("HH:mm").optional(),
  endTime: Joi.date().format("HH:mm").optional(),
  startDate: Joi.date().format("YYYY-MM-DD").optional(),
  endDate: Joi.date().format("YYYY-MM-DD").optional(),
  courseId: Joi.number().integer().greater(0).optional().prefs({ convert: false }),
  vacancies: Joi.number().integer().greater(0).optional().prefs({ convert: false }),
  offeringId: Joi.number().integer().greater(0).optional().prefs({ convert: false }),
});

export type ClasseBody = Prisma.ClasseCreateManyInput;
