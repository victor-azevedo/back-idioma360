import { AuthenticatedRequest } from "@/middlewares";
import { SingleQuestionBody } from "@/schemas";
import { questionsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getByTestId(req: AuthenticatedRequest, res: Response) {
  const testId = req.params.id;

  try {
    const questions = await questionsService.findByTestId(parseInt(testId));
    return res.status(httpStatus.OK).send(questions);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function createQuestion(req: AuthenticatedRequest, res: Response) {
  const question = req.body as SingleQuestionBody;

  try {
    const questionCreated = await questionsService.createQuestion(question);
    return res.status(httpStatus.CREATED).send(questionCreated);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function deleteQuestion(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    await questionsService.deleteQuestion(parseInt(id));
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const questionsController = {
  getByTestId,
  createQuestion,
  deleteQuestion,
};
