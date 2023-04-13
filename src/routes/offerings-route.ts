import { offeringsController } from "@/controllers";
import { authenticateToken, authorizationRole, validateBody, validateParams, validateQuery } from "@/middlewares";
import { offeringSchema, offeringSchemaPatch, offeringsQuerySchema, paramsSchema } from "@/schemas";
import { Router } from "express";

const offeringsRouter = Router();

offeringsRouter.use(authenticateToken);
offeringsRouter.get("/", validateQuery(offeringsQuerySchema), offeringsController.getAll);

offeringsRouter.use(authorizationRole);
offeringsRouter.post("/", validateBody(offeringSchema), offeringsController.createOffer);
offeringsRouter.patch(
  "/:id",
  validateParams(paramsSchema),
  validateBody(offeringSchemaPatch),
  offeringsController.updateOffer,
);
offeringsRouter.delete("/:id", validateParams(paramsSchema), offeringsController.deleteOffer);

export { offeringsRouter };
