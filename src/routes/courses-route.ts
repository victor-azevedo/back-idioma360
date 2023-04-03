import { coursesController } from "@/controllers";
import { authenticateToken, validateQuery } from "@/middlewares";
import { querySchema } from "@/schemas";
import { Router } from "express";

const coursesRouter = Router();

coursesRouter.use(authenticateToken);
coursesRouter.get("/", coursesController.getAll);
coursesRouter.get("/classes", validateQuery(querySchema), coursesController.findAllGroupByCourse);

export { coursesRouter };
