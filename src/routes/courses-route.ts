import { coursesController } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const coursesRouter = Router();

coursesRouter.use(authenticateToken);
coursesRouter.get("/", coursesController.getAll);

export { coursesRouter };
