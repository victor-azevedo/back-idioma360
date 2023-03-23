import { ApplicationError } from "../protocols";

export function unprocessableEntityError(details?: string[]): ApplicationInvalidateDataError {
  return {
    name: "UnprocessableEntityError",
    message: "Invalid data",
    details,
  };
}

type ApplicationInvalidateDataError = ApplicationError & {
  details: string[];
};
