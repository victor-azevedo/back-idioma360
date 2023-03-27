import { POSTAL_CODE_PATTERN } from "@/helpers";
import { Address } from "@prisma/client";
import Joi, { ObjectSchema, StringSchema } from "joi";

const postalCodeSchema: StringSchema = Joi.string().trim().length(9).pattern(POSTAL_CODE_PATTERN, { name: "CEP" });

export const addressSchema: ObjectSchema = Joi.object<AddressBody>({
  street: Joi.string().required(),
  number: Joi.string().required(),
  complement: Joi.string().allow(null).optional(),
  district: Joi.string().required(),
  postalCode: postalCodeSchema.required(),
  cityId: Joi.number().required(),
});

export type AddressBody = Omit<Address, "id" | "createdAt" | "updatedAt">;
