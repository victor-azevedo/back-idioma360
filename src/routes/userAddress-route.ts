import { addressController } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { addressSchema } from "@/schemas";
import { Router } from "express";

const userAddressRouter = Router();

userAddressRouter.use(authenticateToken);
userAddressRouter.post("/", validateBody(addressSchema), addressController.postUserAddress);
userAddressRouter.get("/", addressController.getUserAddress);

export { userAddressRouter };
