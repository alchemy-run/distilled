/**
 * Daytona-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the unknown-error
 * and parse-error wrappers. Daytona declares failures as HTTP statuses
 * against a shared `{ message }` (toolbox) or untyped (platform) body —
 * no operation narrows which codes it can produce — so the SDK dispatches
 * on the status (the classes here) and carries any machine-readable `code`
 * through on {@link UnknownDaytonaError}.
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
import * as Category from "@distilled.cloud/core/category";
import type {
  BadRequest as CoreBadRequest,
  Conflict as CoreConflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  Locked as CoreLocked,
  NotFound as CoreNotFound,
  UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";
import * as Schema from "effect/Schema";

/**
 * Unknown Daytona error — returned when a failed response's HTTP status has
 * no mapped error class.
 */
export class UnknownDaytonaError extends Schema.TaggedError<UnknownDaytonaError>()(
  "UnknownDaytonaError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class DaytonaParseError extends Schema.TaggedError<DaytonaParseError>()(
  "DaytonaParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Daytona operation may surface in addition to the shared HTTP
 * status errors.
 */
export type ClientErrors = UnknownDaytonaError | DaytonaParseError;

/**
 * Default Daytona operation errors.
 *
 * EVERY operation carries the whole set: the specs type failures only as a
 * per-operation status list (and often not even that), so any documented
 * status can come back from any call.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | CoreLocked
  | ClientErrors;
