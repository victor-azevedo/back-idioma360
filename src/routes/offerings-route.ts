import { offeringsController } from "@/controllers";
import { authenticateToken, authorizationRole, validateBody, validateQuery } from "@/middlewares";
import { offeringSchema, offeringsQuerySchema } from "@/schemas";
import { Router } from "express";

const offeringsRouter = Router();

offeringsRouter.use(authenticateToken);
offeringsRouter.get("/", validateQuery(offeringsQuerySchema), offeringsController.getAll);
offeringsRouter.use(authorizationRole);
offeringsRouter.post("/", validateBody(offeringSchema), offeringsController.createOffer);

export { offeringsRouter };
