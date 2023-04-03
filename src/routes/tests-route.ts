import { testsController } from "@/controllers";
import { authenticateToken, validateParams } from "@/middlewares";
import { paramsSchema } from "@/schemas";
import { Router } from "express";

const testsRouter = Router();

testsRouter.use(authenticateToken);
testsRouter.get("/", testsController.getAll);
testsRouter.get("/:id", validateParams(paramsSchema), testsController.getByTestId);

export { testsRouter };
