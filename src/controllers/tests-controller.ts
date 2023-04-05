import { AuthenticatedRequest } from "@/middlewares";
import { UserAnswersBody } from "@/schemas/userAnswer-schema";
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
  const { userId } = req;
  const { id } = req.params;

  try {
    const tests = await testsService.findByTestId({ testId: parseInt(id), userId });
    return res.status(httpStatus.OK).send(tests);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function postUserAnswers(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;
  const userAnswers = req.body as UserAnswersBody;

  try {
    await testsService.createUserAnswers({ userAnswers, userId, testId: parseInt(id) });
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const testsController = {
  getAll,
  getByTestId,
  postUserAnswers,
};
