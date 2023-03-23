import { User, UserAuth } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";

export const signInSchema: ObjectSchema = Joi.object<SignInBody>({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(16).required(),
});

export type SignInBody = Pick<User, "email"> & Pick<UserAuth, "password">;
