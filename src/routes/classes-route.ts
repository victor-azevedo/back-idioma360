import { classesController } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const classesRouter = Router();

classesRouter.use(authenticateToken);
classesRouter.get("/", classesController.getAll);

export { classesRouter };
