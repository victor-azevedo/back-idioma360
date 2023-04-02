import { addressController } from "@/controllers";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { addressSchema, querySchema } from "@/schemas";
import { Router } from "express";

const addressRouter = Router();

addressRouter.use(authenticateToken);
addressRouter.post("/user", validateBody(addressSchema), addressController.postUserAddress);
addressRouter.get("/user", addressController.getUserAddress);
addressRouter.get("/states", addressController.getStates);
addressRouter.get("/cities", validateQuery(querySchema), addressController.getUfCities);

export { addressRouter };
