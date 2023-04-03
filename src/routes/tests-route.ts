import { testsController } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const testsRouter = Router();

testsRouter.use(authenticateToken);
testsRouter.get("/", testsController.getAll);

export { testsRouter };
