import { ApplicationError } from "../protocols";

export function unprocessableEntityError(message?: string, details?: string[]): ApplicationInvalidateDataError {
  return {
    name: "UnprocessableEntityError",
    message: message || "Invalid data",
    details,
  };
}

type ApplicationInvalidateDataError = ApplicationError & {
  details: string[];
};
