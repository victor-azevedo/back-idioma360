import { offeringsController } from "@/controllers";
import { authenticateToken, validateQuery } from "@/middlewares";
import { offeringsQuerySchema } from "@/schemas";
import { Router } from "express";

const offeringsRouter = Router();

offeringsRouter.use(authenticateToken);
offeringsRouter.get("/", validateQuery(offeringsQuerySchema), offeringsController.getAll);

export { offeringsRouter };
