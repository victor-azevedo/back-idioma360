import { signIn, signUpUser } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema, signUpSchema } from "@/schemas";
import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post("/sign-up", validateBody(signUpSchema), signUpUser);
AuthRouter.post("/sign-in", validateBody(signInSchema), signIn);

export { AuthRouter };
