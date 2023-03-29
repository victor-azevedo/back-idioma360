import { AuthenticatedRequest } from "@/middlewares";
import { classesService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getAll(req: AuthenticatedRequest, res: Response) {
  try {
    const classes = await classesService.findAll();
    return res.status(httpStatus.OK).send(classes);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function getClasseById(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const classe = await classesService.findById(parseInt(id));
    return res.status(httpStatus.OK).send(classe);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const classesController = {
  getAll,
  getClasseById,
};
