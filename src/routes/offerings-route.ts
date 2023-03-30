import { offeringsController } from "@/controllers";
import { authenticateToken, validateParams, validateQuery } from "@/middlewares";
import { paramsSchema, querySchema } from "@/schemas";
import { Router } from "express";

const offeringsRouter = Router();

offeringsRouter.use(authenticateToken);
offeringsRouter.get("/", validateQuery(querySchema), offeringsController.getAll);
offeringsRouter.post("/:id/enrollments", validateParams(paramsSchema), offeringsController.postEnrollment);

export { offeringsRouter };
