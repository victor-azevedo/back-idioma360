import { AuthenticatedRequest, handleRequestError } from "@/middlewares";
import { EnrollBody } from "@/schemas";
import { enrollmentsService } from "@/services/enrollments-service";
import { Response } from "express";
import httpStatus from "http-status";

async function postEnroll(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const enrollBody = req.body as EnrollBody;

  try {
    await enrollmentsService.createEnrollment({ userId, ...enrollBody });
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function getUserEnrolls(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollments = await enrollmentsService.findUserEnrolls({ userId });
    return res.status(httpStatus.OK).send(enrollments);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const enrollmentsController = {
  postEnroll,
  getUserEnrolls,
};
