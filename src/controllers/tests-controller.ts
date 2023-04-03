import { AuthenticatedRequest } from "@/middlewares";
import { testsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getAll(req: AuthenticatedRequest, res: Response) {
  try {
    const tests = await testsService.findAll();
    return res.status(httpStatus.OK).send(tests);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function getByTestId(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const tests = await testsService.findByTestId(parseInt(id));
    return res.status(httpStatus.OK).send(tests);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const testsController = {
  getAll,
  getByTestId,
};
