import { AuthenticatedRequest } from "@/middlewares";
import { OfferingsQuerySchema } from "@/schemas";
import { offeringsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getAll(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { enrollments } = req.query as OfferingsQuerySchema;
  const { status } = req.query as OfferingsQuerySchema;

  try {
    const offerings = await offeringsService.findAll({
      userId,
      includeEnrollments: enrollments === "true" ? true : false,
      status,
    });
    return res.status(httpStatus.OK).send(offerings);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const offeringsController = {
  getAll,
};
