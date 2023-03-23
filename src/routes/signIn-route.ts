import { signIn } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { Router } from "express";

const signInRouter = Router();

signInRouter.post("/", validateBody(signInSchema), signIn);

export { signInRouter };
