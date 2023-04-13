import { coursesController } from "@/controllers";
import { authenticateToken, authorizationRole, validateBody, validateQuery } from "@/middlewares";
import { courseSchema, querySchema } from "@/schemas";
import { Router } from "express";

const coursesRouter = Router();

coursesRouter.use(authenticateToken);
coursesRouter.get("/", coursesController.getAll);
coursesRouter.get("/classes", validateQuery(querySchema), coursesController.findAllGroupByCourse);
coursesRouter.use(authorizationRole);
coursesRouter.post("/", validateBody(courseSchema), coursesController.createCourse);

export { coursesRouter };
