import { questionsController } from "@/controllers";
import { authenticateToken, authorizationRole, validateBody, validateParams } from "@/middlewares";
import { paramsSchema, singleQuestionSchema } from "@/schemas";
import { Router } from "express";

const questionsRouter = Router();

questionsRouter
  .use(authenticateToken)
  .use(authorizationRole)
  .get("/tests/:id", validateParams(paramsSchema), questionsController.getByTestId)
  .post("/", validateBody(singleQuestionSchema), questionsController.createQuestion)
  .delete("/:id", validateParams(paramsSchema), questionsController.deleteQuestion);

export { questionsRouter };
