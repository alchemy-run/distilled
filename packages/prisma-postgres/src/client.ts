/**
 * Prisma Postgres API Client.
 *
 * Wraps the shared REST client from sdk-core with Prisma Postgres-specific
 * error matching and credential handling.
 */
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { makeAPI } from "@distilled.cloud/core/client";
import {
  HTTP_STATUS_MAP,
  UnknownPrismaPostgresError,
  PrismaPostgresParseError,
} from "./errors.ts";

// Re-export for backwards compatibility
export { UnknownPrismaPostgresError } from "./errors.ts";
import { Credentials } from "./credentials.ts";

// API Error Response Schema — Prisma Postgres wraps errors in { error: { code, message, hint? } }
const ApiErrorResponse = Schema.Struct({
  error: Schema.Struct({
    code: Schema.optional(Schema.String),
    message: Schema.String,
    hint: Schema.optional(Schema.String),
  }),
});

/**
 * Match a Prisma Postgres API error response to the appropriate error class based on HTTP status.
 */
const matchError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<never, unknown> => {
  try {
    const parsed = Schema.decodeUnknownSync(ApiErrorResponse)(errorBody);
    const ErrorClass = (HTTP_STATUS_MAP as any)[status];
    if (ErrorClass) {
      return Effect.fail(
        new ErrorClass({ message: parsed.error.message ?? "" }),
      );
    }
    return Effect.fail(
      new UnknownPrismaPostgresError({
        code: parsed.error.code,
        message: parsed.error.message,
        hint: parsed.error.hint,
        body: errorBody,
      }),
    );
  } catch {
    return Effect.fail(new UnknownPrismaPostgresError({ body: errorBody }));
  }
};

/**
 * Prisma Postgres API client.
 */
export const API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => creds.apiBaseUrl,
  getAuthHeaders: (creds: any) => ({
    Authorization: `Bearer ${creds.apiToken}`,
  }),
  matchError,
  ParseError: PrismaPostgresParseError as any,
});
