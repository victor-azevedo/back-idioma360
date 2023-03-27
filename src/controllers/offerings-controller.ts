import { AuthenticatedRequest } from "@/middlewares";
import { offeringsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getAll(req: AuthenticatedRequest, res: Response) {
  try {
    const offerings = await offeringsService.findAll();
    return res.status(httpStatus.OK).send(offerings);
  } catch (error) {
    handleRequestError(error, res);
  }
}
export const offeringsController = {
  getAll,
};
