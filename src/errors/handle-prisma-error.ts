import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { conflictError } from "./conflict-error";
import { notFoundError } from "./not-found-error";

export function handlePrismaError(error: PrismaError) {
  // eslint-disable-next-line no-console
  console.log(error);
  if (error.code === "P2025") {
    throw notFoundError();
  } else if (error.code === "P2003") {
    throw conflictError();
  }

  throw error;
}
type PrismaError = PrismaClientKnownRequestError & PrismaClientValidationError;
