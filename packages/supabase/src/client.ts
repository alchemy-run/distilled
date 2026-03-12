/**
 * Supabase API Client.
 *
 * Wraps the shared REST client from sdk-core with Supabase-specific
 * error matching and credential handling.
 */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import { makeAPI } from "@distilled.cloud/core/client";
import {
  HTTP_STATUS_MAP,
  UnknownSupabaseError,
  SupabaseParseError,
} from "./errors.ts";

// Re-export for backwards compatibility
export { UnknownSupabaseError } from "./errors.ts";
import { Credentials } from "./credentials.ts";

// API Error Response Schema
const ApiErrorResponse = Schema.Struct({
  message: Schema.String,
});

/**
 * Match a Supabase API error response to the appropriate error class based on HTTP status.
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
      new UnknownSupabaseError({
        message: parsed.message,
        body: errorBody,
      }),
    );
  } catch {
    return Effect.fail(new UnknownSupabaseError({ body: errorBody }));
  }
};

/**
 * Supabase API client.
 */
export const API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => creds.apiBaseUrl,
  getAuthHeaders: (creds: any) => ({
    Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
  }),
  matchError,
  ParseError: SupabaseParseError as any,
});
