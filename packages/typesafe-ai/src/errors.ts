/**
 * TypeSafe AI-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the TypeSafe fallback
 * errors. Note the generated service module additionally defines its own
 * per-status matcher classes (UnprocessableEntity/…) for the statuses each
 * operation declares — those share `_tag`s with the core classes here, so
 * `catchTag` works against either.
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
import { DurationSchema } from "@distilled.cloud/core/errors";

/**
 * TypeSafe is temporarily overloaded (HTTP 529). Retry with backoff — the
 * same policy the docs recommend for 429.
 */
export class Overloaded extends Schema.TaggedError<Overloaded>()("Overloaded", {
  message: Schema.String,
  retryAfter: Schema.optional(DurationSchema),
}).pipe(Category.withServerError, Category.withRetryable()) {}

/** Unknown TypeSafe AI error — returned when nothing else matches the failure. */
export class UnknownTypesafeAiError extends Schema.TaggedError<UnknownTypesafeAiError>()(
  "UnknownTypesafeAiError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class TypesafeAiParseError extends Schema.TaggedError<TypesafeAiParseError>()(
  "TypesafeAiParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
