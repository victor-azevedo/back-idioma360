import { forbiddenError } from "@/errors";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function authorizationRole(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { role } = req;

  if (role !== "admin") {
    return generateForbiddenResponse(res);
  }
  return next();
}

function generateForbiddenResponse(res: Response) {
  res.status(httpStatus.FORBIDDEN).send(forbiddenError());
}
