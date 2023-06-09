import { prisma } from "@/config";
import { unauthorizedError } from "@/errors";
import { RolesTypes } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader.split(" ")[1];
  if (!token) return generateUnauthorizedResponse(res);

  try {
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const userSession = await prisma.userSession.findFirst({
      where: {
        token,
      },
    });
    if (!userSession) return generateUnauthorizedResponse(res);

    req.userId = userId;
    req.role = role;
    return next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

export type JWTPayload = {
  userId: number;
  role: RolesTypes;
};
