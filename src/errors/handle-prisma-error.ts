import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { notFoundError } from "./not-found-error";

export function handlePrismaError(error: PrismaError) {
  // eslint-disable-next-line no-console
  console.log(error);
  if (error.code === "P2025") {
    throw notFoundError();
  }
  throw error;
}
type PrismaError = PrismaClientKnownRequestError & PrismaClientValidationError;
