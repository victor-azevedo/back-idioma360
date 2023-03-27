import { addressController } from "@/controllers";
import { authenticateToken, validateQuery } from "@/middlewares";
import { querySchema } from "@/schemas";
import { Router } from "express";

const addressRouter = Router();

addressRouter.use(authenticateToken);
addressRouter.get("/states", addressController.getStates);
addressRouter.get("/cities", validateQuery(querySchema), addressController.getUfCities);

export { addressRouter };
