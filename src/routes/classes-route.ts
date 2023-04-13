import { classesController } from "@/controllers";
import { authenticateToken, authorizationRole, validateBody, validateParams } from "@/middlewares";
import { classeSchema, classeSchemaPatch, paramsSchema } from "@/schemas";
import { Router } from "express";

const classesRouter = Router();

classesRouter.use(authenticateToken);
classesRouter.get("/", classesController.getAll);
classesRouter.get("/:id", validateParams(paramsSchema), classesController.getClasseById);

classesRouter.use(authorizationRole);
classesRouter.post("/", validateBody(classeSchema), classesController.createClasse);
classesRouter.patch(
  "/:id",
  validateParams(paramsSchema),
  validateBody(classeSchemaPatch),
  classesController.updateClasse,
);
classesRouter.delete("/:id", validateParams(paramsSchema), classesController.deleteClasse);

export { classesRouter };
