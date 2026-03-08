/**
 * GCP API Client.
 *
 * Wraps the shared REST client from sdk-core with GCP-specific
 * error matching and credential handling.
 */
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { makeAPI } from "@distilled.cloud/sdk-core/client";
import { HTTP_STATUS_MAP, GCPApiError, GCPParseError } from "./errors.ts";
import { Credentials } from "./credentials.ts";

/**
 * Match a GCP API error response to the appropriate error class.
 */
const matchError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<never, unknown> => {
  const ErrorClass = (HTTP_STATUS_MAP as any)[status];
  const message =
    typeof errorBody === "object" && errorBody !== null && "error" in errorBody
      ? ((errorBody as any).error?.message ?? String(status))
      : String(status);

  if (ErrorClass) {
    return Effect.fail(new ErrorClass({ message }));
  }
  return Effect.fail(
    new GCPApiError({ code: status, message, body: errorBody }),
  );
};

/**
 * GCP API client.
 * Note: GCP uses per-service base URLs from the Discovery Documents,
 * so the base URL is set per-service via the Service trait, not globally.
 */
export const API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (_creds: any) => "", // Set per-service via Http trait
  getAuthHeaders: (creds: any) => ({
    Authorization: `Bearer ${creds.accessToken}`,
  }),
  matchError,
  ParseError: GCPParseError as any,
});
