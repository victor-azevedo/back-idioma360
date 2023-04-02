import { AuthenticatedRequest } from "@/middlewares";
import { offeringsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getAll(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { enrollments } = req.query;

  try {
    const offerings = await offeringsService.findAll({ userId, includeEnrollments: enrollments ? true : false });
    return res.status(httpStatus.OK).send(offerings);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const offeringsController = {
  getAll,
};
