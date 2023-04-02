import { CPF_PATTERN_WITH_DOTS, PHONE_PATTERN } from "@/helpers";
import joiDate from "@joi/date";
import { RolesTypes, User, UserAuth } from "@prisma/client";
import coreJoi, { ObjectSchema, StringSchema } from "joi";

const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const cpfSchema: StringSchema = Joi.string().trim().length(14).pattern(CPF_PATTERN_WITH_DOTS, { name: "CPF" });

const phoneSchema: StringSchema = Joi.string()
  .trim()
  .min(13)
  .max(14)
  .pattern(PHONE_PATTERN, { name: "Brazilian phone" });

const nameSchema: StringSchema = Joi.string().trim().min(3);
const emailSchema: StringSchema = Joi.string().trim().email();

export const signUpSchema: ObjectSchema = Joi.object<SignUpBody>({
  name: nameSchema.required(),
  fullName: nameSchema.required(),
  birthday: Joi.date().format("YYYY-MM-DD").required(),
  cpf: cpfSchema.required(),
  email: emailSchema.required(),
  phone: phoneSchema.required(),
  password: Joi.string().trim().min(6).max(16).required(),
});

export const signUpAdminSchema: ObjectSchema = Joi.object<SignUpAdminBody>({
  name: nameSchema.required(),
  fullName: nameSchema.required(),
  birthday: Joi.date().format("YYYY-MM-DD").required(),
  cpf: cpfSchema.required(),
  email: emailSchema.required(),
  phone: phoneSchema.required(),
  password: Joi.string().trim().min(6).max(16).required(),
  role: Joi.string().valid(Object.keys(RolesTypes).join(",")).required(),
});

export type SignUpBody = Pick<User, "name" | "fullName" | "birthday" | "cpf" | "phone" | "email"> &
  Pick<UserAuth, "password">;

export type SignUpAdminBody = Pick<User, "name" | "fullName" | "birthday" | "cpf" | "phone" | "email"> &
  Pick<UserAuth, "password" | "role">;
