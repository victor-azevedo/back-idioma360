import { AuthenticatedRequest } from "@/middlewares";
import { TestBody } from "@/schemas";
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

async function getByCourseId(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const tests = await testsService.findByCourseId({ courseId: parseInt(id) });
    return res.status(httpStatus.OK).send(tests);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function getByTestIdAdmin(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const test = await testsService.findByTestIdAdmin(parseInt(id));
    return res.status(httpStatus.OK).send(test);
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

async function createTest(req: AuthenticatedRequest, res: Response) {
  const test = req.body as TestBody;

  try {
    const testId = await testsService.createTest(test);
    return res.status(httpStatus.CREATED).send({ testId });
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const testsController = {
  getAll,
  getByCourseId,
  getByTestId,
  getByTestIdAdmin,
  postUserAnswers,
  createTest,
};
