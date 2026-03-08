/**
 * Cloudflare API operations factory.
 *
 * This module is imported as `import * as API from "../client/api.ts"` by
 * generated service files so that `API.make()`, `API.OperationMethod`, etc.
 * are all accessible as namespace members.
 */
import * as Effect from "effect/Effect";
import {
  makeAPI,
  type OperationMethod,
  type PaginatedOperationMethod,
} from "@distilled.cloud/sdk-core/client";
import {
  HTTP_STATUS_MAP,
  CloudflareApiError,
  CloudflareParseError,
} from "../errors.ts";
import { Credentials } from "../credentials.ts";

export type { OperationMethod, PaginatedOperationMethod };

/**
 * Match a Cloudflare API error response.
 */
const matchError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<never, unknown> => {
  const ErrorClass = (HTTP_STATUS_MAP as any)[status];
  const message =
    typeof errorBody === "object" &&
    errorBody !== null &&
    "errors" in errorBody &&
    Array.isArray((errorBody as any).errors)
      ? ((errorBody as any).errors[0]?.message ?? String(status))
      : String(status);

  if (ErrorClass) {
    return Effect.fail(new ErrorClass({ message }));
  }
  return Effect.fail(
    new CloudflareApiError({ code: status, message, body: errorBody }),
  );
};

const _API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => creds.apiBaseUrl,
  getAuthHeaders: (creds: any) => ({
    Authorization: `Bearer ${creds.apiToken}`,
  }),
  matchError,
  ParseError: CloudflareParseError as any,
});

export const make = _API.make;
export const makePaginated = _API.makePaginated;
