import { coursesController } from "@/controllers";
import { authenticateToken, authorizationRole, validateBody, validateParams, validateQuery } from "@/middlewares";
import { courseSchema, courseSchemaPatch, paramsSchema, querySchema } from "@/schemas";
import { Router } from "express";

const coursesRouter = Router();

coursesRouter.use(authenticateToken);
coursesRouter.get("/", coursesController.getAll);
coursesRouter.get("/classes", validateQuery(querySchema), coursesController.findAllGroupByCourse);
coursesRouter.use(authorizationRole);
coursesRouter.post("/", validateBody(courseSchema), coursesController.createCourse);
coursesRouter.patch(
  "/:id",
  validateParams(paramsSchema),
  validateBody(courseSchemaPatch),
  coursesController.updateCourse,
);
coursesRouter.delete("/:id", validateParams(paramsSchema), coursesController.deleteCourse);

export { coursesRouter };
