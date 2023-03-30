import { offeringsController } from "@/controllers";
import { authenticateToken, validateParams } from "@/middlewares";
import { paramsSchema } from "@/schemas";
import { Router } from "express";

const offeringsRouter = Router();

offeringsRouter.use(authenticateToken);
offeringsRouter.get("/", offeringsController.getAll);
offeringsRouter.post("/:id/enrollments", validateParams(paramsSchema), offeringsController.postEnrollment);

export { offeringsRouter };
