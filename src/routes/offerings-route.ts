import { offeringsController } from "@/controllers";
import { authenticateToken, validateQuery } from "@/middlewares";
import { querySchema } from "@/schemas";
import { Router } from "express";

const offeringsRouter = Router();

offeringsRouter.use(authenticateToken);
offeringsRouter.get("/", validateQuery(querySchema), offeringsController.getAll);

export { offeringsRouter };
