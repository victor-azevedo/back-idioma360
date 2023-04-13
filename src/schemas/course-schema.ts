import { Course } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";

export const courseSchema: ObjectSchema = Joi.object<CourseBody>({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  creditHours: Joi.number().integer().min(0).required().prefs({ convert: false }),
  imageUrl: Joi.string().uri().required(),
});

export const courseSchemaPatch: ObjectSchema = Joi.object<Partial<CourseBody>>({
  name: Joi.string().min(3).optional(),
  description: Joi.string().min(3).optional(),
  creditHours: Joi.number().integer().min(0).optional().prefs({ convert: false }),
  imageUrl: Joi.string().uri().optional(),
});

export type CourseBody = Pick<Course, "name" | "description" | "creditHours" | "imageUrl">;
