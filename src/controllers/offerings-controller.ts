import { AuthenticatedRequest } from "@/middlewares";
import { QuerySchema } from "@/schemas";
import { offeringsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getAll(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { enrollments } = req.query as QuerySchema;

  try {
    const offerings = await offeringsService.findAll({
      userId,
      includeEnrollments: enrollments === "true" ? true : false,
    });
    return res.status(httpStatus.OK).send(offerings);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const offeringsController = {
  getAll,
};
