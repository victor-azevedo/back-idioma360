import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { notFoundError } from "./not-found-error";

export function handlePrismaError(error: PrismaClientKnownRequestError) {
  // eslint-disable-next-line no-console
  console.log(error);
  if (error.code === "P2025") {
    throw notFoundError();
  }
}
