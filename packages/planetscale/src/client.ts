/**
 * PlanetScale API Client.
 *
 * Wraps the shared REST client from sdk-core with PlanetScale-specific
 * error matching and credential handling.
 */
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { makeAPI } from "@distilled.cloud/core/client";
import {
  HTTP_STATUS_MAP,
  UnknownPlanetScaleError,
  PlanetScaleParseError,
} from "./errors.ts";

// Re-export for backwards compatibility (tests import UnknownPlanetScaleError from client)
export { UnknownPlanetScaleError } from "./errors.ts";
import { Credentials } from "./credentials.ts";

// API Error Response Schema
const ApiErrorResponse = Schema.Struct({
  code: Schema.String,
  message: Schema.optional(Schema.String),
});

/**
 * Match a PlanetScale API error response to the appropriate error class.
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
      new UnknownPlanetScaleError({
        code: parsed.code,
        message: parsed.message,
        body: errorBody,
      }),
    );
  } catch {
    return Effect.fail(new UnknownPlanetScaleError({ body: errorBody }));
  }
};

/**
 * PlanetScale API client.
 */
export const API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => creds.apiBaseUrl,
  getAuthHeaders: (creds: any) => ({ Authorization: creds.token }),
  matchError,
  ParseError: PlanetScaleParseError as any,
});
