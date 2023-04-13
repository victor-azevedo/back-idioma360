import { classesController } from "@/controllers";
import { authenticateToken, authorizationRole, validateBody, validateParams } from "@/middlewares";
import { classeSchema, paramsSchema } from "@/schemas";
import { Router } from "express";

const classesRouter = Router();

classesRouter.use(authenticateToken);
classesRouter.get("/", classesController.getAll);
classesRouter.get("/:id", validateParams(paramsSchema), classesController.getClasseById);

classesRouter.use(authorizationRole);
classesRouter.post("/", validateBody(classeSchema), classesController.createClasse);

export { classesRouter };
