import { testsController } from "@/controllers";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { paramsSchema } from "@/schemas";
import { userAnswerSchema } from "@/schemas/userAnswer-schema";
import { Router } from "express";

const testsRouter = Router();

testsRouter.use(authenticateToken);
testsRouter.get("/", testsController.getAll);
testsRouter.get("/:id", validateParams(paramsSchema), testsController.getByTestId);
testsRouter.post(
  "/:id/userAnswers",
  validateParams(paramsSchema),
  validateBody(userAnswerSchema),
  testsController.postUserAnswers,
);

export { testsRouter };
