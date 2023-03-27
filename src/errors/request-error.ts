export function requestError(status: number, statusText: string): RequestError {
  return {
    name: "RequestError",
    data: null,
    status,
    statusText,
    message: "No result for this search!",
  };
}

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};
