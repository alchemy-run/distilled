/**
 * Freestyle-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Freestyle
 * fallback errors. Note the generated service modules additionally define
 * their own per-status matcher classes (BadRequest/NotFound/…) for the
 * statuses each operation declares — those share `_tag`s with the core
 * classes here, so `catchTag` works against either.
 *
 * Every Freestyle failure carries `{ code, message }` (`PublicErrorBody`);
 * `code` is a stable `SCREAMING_SNAKE_CASE` identifier.
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

/** Unknown Freestyle error — returned when nothing else matches the failure. */
export class UnknownFreestyleError extends Schema.TaggedError<UnknownFreestyleError>()(
  "UnknownFreestyleError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class FreestyleParseError extends Schema.TaggedError<FreestyleParseError>()(
  "FreestyleParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
