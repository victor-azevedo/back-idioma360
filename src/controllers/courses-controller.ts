import { AuthenticatedRequest } from "@/middlewares";
import { coursesService } from "@/services";
import { OfferStatus } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getAll(req: AuthenticatedRequest, res: Response) {
  try {
    const courses = await coursesService.findAll();
    return res.status(httpStatus.OK).send(courses);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function findAllGroupByCourse(req: AuthenticatedRequest, res: Response) {
  const status = req.query.offerStatus as OfferStatus;

  try {
    const coursesWithClasses = await coursesService.findAllGroupByCourse(status);
    return res.status(httpStatus.OK).send(coursesWithClasses);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const coursesController = {
  getAll,
  findAllGroupByCourse,
};
