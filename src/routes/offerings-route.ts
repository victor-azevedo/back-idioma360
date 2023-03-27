import { offeringsController } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const offeringsRouter = Router();

offeringsRouter.use(authenticateToken);
offeringsRouter.get("/", offeringsController.getAll);

export { offeringsRouter };
