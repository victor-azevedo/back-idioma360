import { testsController } from "@/controllers";
import { authenticateToken, authorizationRole, validateBody, validateParams } from "@/middlewares";
import { paramsSchema, testSchema } from "@/schemas";
import { userAnswerSchema } from "@/schemas/userAnswer-schema";
import { Router } from "express";

const testsRouter = Router();

testsRouter.use(authenticateToken);
testsRouter.get("/:id", validateParams(paramsSchema), testsController.getByTestId);
testsRouter.post(
  "/:id/userAnswers",
  validateParams(paramsSchema),
  validateBody(userAnswerSchema),
  testsController.postUserAnswers,
);

testsRouter.use(authorizationRole);
testsRouter.get("/", testsController.getAll);
testsRouter.get("/admin/:id", validateParams(paramsSchema), testsController.getByTestIdAdmin);
testsRouter.post("/", validateBody(testSchema), testsController.createTest);

export { testsRouter };
