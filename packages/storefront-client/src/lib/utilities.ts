import type { ClientResponse } from "./types";
import { CLIENT, GQL_API_ERROR, NO_DATA_OR_ERRORS_ERROR } from "./constants";

export function formatErrorMessage(message: string, client = CLIENT) {
  return message.startsWith(`${client}`) ? message : `${client}: ${message}`;
}

export function getErrorMessage(error: any) {
  return error instanceof Error ? error.message : JSON.stringify(error);
}

export function getErrorCause(error: any): Record<string, any> | undefined {
  return error instanceof Error && Reflect.has(error, "cause")
    ? // @ts-ignore
      error.cause
    : undefined;
}

export function combineErrors(dataArray: Record<string, any>[]) {
  return dataArray.flatMap(({ errors }) => {
    return errors ?? [];
  });
}

export function getKeyValueIfValid(key: string, value?: any) {
  return value &&
    (typeof value !== "object" ||
      Array.isArray(value) ||
      (typeof value === "object" && Object.keys(value).length > 0))
    ? { [key]: value }
    : {};
}

export async function processJSONResponse<TData = any>(
  response: Response
): Promise<ClientResponse<TData>> {
  const { errors, data, extensions } = await response.json();

  return {
    ...getKeyValueIfValid("data", data),
    ...getKeyValueIfValid("extensions", extensions),
    ...(errors || !data
      ? {
          errors: {
            networkStatusCode: response.status,
            message: formatErrorMessage(
              errors ? GQL_API_ERROR : NO_DATA_OR_ERRORS_ERROR
            ),
            ...getKeyValueIfValid("graphQLErrors", errors),
            response,
          },
        }
      : {}),
  };
}
