import { ApplicationError } from "../protocols";

export function serviceUnavailableError(message?: string): ApplicationError {
  return {
    name: "ServiceUnavailableError",
    message: message || "Service Unavailable",
  };
}
