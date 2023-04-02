import { signIn, signUpUser } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema, signUpSchema } from "@/schemas";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", validateBody(signUpSchema), signUpUser);
authRouter.post("/sign-in", validateBody(signInSchema), signIn);

export { authRouter };
