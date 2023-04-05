import { invalidDataError } from "@/errors";

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { AnySchema, ObjectSchema } from "joi";

export function validateBody<T>(schema: AnySchema<T>): ValidationMiddleware {
  return validate(schema, "body");
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "params");
}

export function validateQuery<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "query");
}

function validate(schema: AnySchema, type: "body" | "params" | "query") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).send(invalidDataError(error.details.map((d) => d.message)));
    }
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;
