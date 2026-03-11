/**
 * Fly-io API Client.
 *
 * Wraps the shared REST client from sdk-core with Fly-io-specific
 * error matching and credential handling.
 */
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { makeAPI } from "@distilled.cloud/core/client";
import {
  HTTP_STATUS_MAP,
  UnknownFlyIoError,
  FlyIoParseError,
} from "./errors.ts";

// Re-export for backwards compatibility
export { UnknownFlyIoError } from "./errors.ts";
import { Credentials } from "./credentials.ts";

// API Error Response Schema
const ApiErrorResponse = Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.String,
});

/**
 * Match a Fly-io API error response to the appropriate error class based on HTTP status.
 */
const matchError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<never, unknown> => {
  try {
    const parsed = Schema.decodeUnknownSync(ApiErrorResponse)(errorBody);
    const ErrorClass = (HTTP_STATUS_MAP as any)[status];
    if (ErrorClass) {
      return Effect.fail(new ErrorClass({ message: parsed.message ?? "" }));
    }
    return Effect.fail(
      new UnknownFlyIoError({
        code: parsed.code,
        message: parsed.message,
        body: errorBody,
      }),
    );
  } catch {
    return Effect.fail(new UnknownFlyIoError({ body: errorBody }));
  }
};

/**
 * Fly-io API client.
 */
export const API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => creds.apiBaseUrl,
  getAuthHeaders: (creds: any) => ({
    Authorization: `Bearer ${creds.apiKey}`,
  }),
  matchError,
  ParseError: FlyIoParseError as any,
});
