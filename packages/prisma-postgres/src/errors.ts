/**
 * Prisma Postgres-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds Prisma Postgres-specific
 * error matching and API error types.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  HTTP_STATUS_MAP,
  DEFAULT_ERRORS,
  API_ERRORS,
} from "@distilled.cloud/core/errors";
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

// Unknown Prisma Postgres error - returned when an error code is not recognized
export class UnknownPrismaPostgresError extends Schema.TaggedErrorClass<UnknownPrismaPostgresError>()(
  "UnknownPrismaPostgresError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    hint: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class PrismaPostgresParseError extends Schema.TaggedErrorClass<PrismaPostgresParseError>()(
  "PrismaPostgresParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
