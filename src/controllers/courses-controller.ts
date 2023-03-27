import { AuthenticatedRequest } from "@/middlewares";
import { coursesService } from "@/services";
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
export const coursesController = {
  getAll,
};
