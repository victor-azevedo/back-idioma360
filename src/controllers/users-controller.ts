import { AuthenticatedRequest } from "@/middlewares";
import { ParamsSchema, QuerySchema } from "@/schemas";
import { usersService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getUserData(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params as ParamsSchema;
  const { address } = req.query as QuerySchema;

  try {
    const userData = await usersService.findUserData({
      userId,
      id: parseInt(id),
      includeAddress: address === "true" ? true : false,
    });
    return res.status(httpStatus.OK).send(userData);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const usersController = {
  getUserData,
};
