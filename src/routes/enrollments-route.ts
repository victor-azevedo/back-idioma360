import { enrollmentsController } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { enrollSchema } from "@/schemas";
import { Router } from "express";

const enrollmentsRouter = Router();

enrollmentsRouter.use(authenticateToken);
enrollmentsRouter.post("/", validateBody(enrollSchema), enrollmentsController.postEnroll);

export { enrollmentsRouter };
