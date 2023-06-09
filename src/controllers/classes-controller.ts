import { AuthenticatedRequest } from "@/middlewares";
import { ClasseBody, ParamsSchema } from "@/schemas";
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
  const { userId } = req;

  try {
    const classe = await classesService.findClasseByIdWithUserEnrollment({ id: parseInt(id), userId });
    return res.status(httpStatus.OK).send(classe);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function createClasse(req: AuthenticatedRequest, res: Response) {
  const classeBody = req.body as ClasseBody;

  try {
    const classeCreated = await classesService.createClasse(classeBody);
    return res.status(httpStatus.CREATED).send(classeCreated);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function updateClasse(req: AuthenticatedRequest, res: Response) {
  const classe = req.body as Partial<ClasseBody>;
  const { id } = req.params as ParamsSchema;

  try {
    await classesService.updateClasse({ id: parseInt(id), classe });
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function deleteClasse(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params as ParamsSchema;

  try {
    await classesService.deleteClasse(parseInt(id));
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function getClasseResult(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params as ParamsSchema;

  try {
    const classeResult = await classesService.getClasseResult(parseInt(id));
    return res.status(httpStatus.OK).send(classeResult);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const classesController = {
  getAll,
  getClasseById,
  createClasse,
  updateClasse,
  deleteClasse,
  getClasseResult,
};
