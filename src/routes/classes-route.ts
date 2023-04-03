import { classesController } from "@/controllers";
import { authenticateToken, validateParams } from "@/middlewares";
import { paramsSchema } from "@/schemas";
import { Router } from "express";

const classesRouter = Router();

classesRouter.use(authenticateToken);
classesRouter.get("/", classesController.getAll);
classesRouter.get("/:id", validateParams(paramsSchema), classesController.getClasseById);
classesRouter.post("/:id/enrollment", validateParams(paramsSchema), classesController.postClasseEnroll);

export { classesRouter };
