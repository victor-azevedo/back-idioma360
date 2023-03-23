import { Response } from "express";
import httpStatus from "http-status";
import { ApplicationError } from "../protocols";

export function handleRequestError(error: ApplicationError | Error, res: Response) {
  if (error.name === "BadRequestError") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: error.message,
    });
  }
  
  if (error.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: error.message,
    });
  }
  
  if (error.name === "ForbiddenError") {
    return res.status(httpStatus.FORBIDDEN).send({
      message: error.message,
    });
  }
  
  if (error.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: error.message,
    });
  }

  if (error.name === "ConflictError") {
    return res.status(httpStatus.CONFLICT).send({
      message: error.message,
    });
  }

  if (error.name === "UnprocessableEntityError") {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: error.message,
    });
  }

  if (error.name === "ServiceUnavailableError") {
    return res.status(httpStatus.SERVICE_UNAVAILABLE).send({
      message: error.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
