import { usersController } from "@/controllers";
import { authenticateToken, validateParams, validateQuery } from "@/middlewares";
import { paramsSchema, querySchema } from "@/schemas";
import { Router } from "express";

const usersRouter = Router();

usersRouter.use(authenticateToken);
// TODO: add to admins
// usersRouter.get("/", usersController.getAll);
usersRouter.get("/:id", validateParams(paramsSchema), validateQuery(querySchema), usersController.getUserData);

export { usersRouter };
