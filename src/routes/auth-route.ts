import { signIn, signInUserTest, signUpUser } from "@/controllers";
import { validateBody } from "@/middlewares";
import { dataRestore } from "@/middlewares/dataRestore-middleware";
import { signInSchema, signInUserTestSchema, signUpSchema } from "@/schemas";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", validateBody(signUpSchema), signUpUser);
authRouter.post("/sign-in", validateBody(signInSchema), signIn);
authRouter.post("/sign-in/user-test", validateBody(signInUserTestSchema), dataRestore(), signInUserTest);

export { authRouter };
