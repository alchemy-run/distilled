/**
 * S2 (s2.dev) error types.
 *
 * Re-exports the common HTTP errors from core and adds the three statuses
 * S2 uses that core's shared map has no entry for (408, 412, 416), plus the
 * unknown-error and parse-error wrappers.
 *
 * Every S2 failure carries the same envelope — `{ "code": string,
 * "message": string }` — where `code` is the machine-readable half (e.g.
 * `append_condition_failed`). The spec types no failure per operation beyond
 * the status list, so the SDK dispatches on the status (the classes here)
 * and carries the code through on {@link UnknownS2Error} for the statuses
 * nothing else maps.
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
 * HTTP 408 — a long-poll `read` (one with `wait` set) elapsed before any
 * record matched. Nothing is wrong: re-issue the read to keep waiting, so
 * the error is marked retryable and the default policy re-asks after a
 * short backoff.
 */
export class RequestTimeout extends Schema.TaggedError<RequestTimeout>()("RequestTimeout", {
  message: Schema.String,
}).pipe(Category.withRetryableError) {}

/**
 * HTTP 412 — `append_condition_failed`: an append's precondition did not
 * hold — the fencing token did not match (another writer holds the fence)
 * or the expected next sequence number was wrong (a concurrent append got
 * there first). Retrying unchanged keeps failing until the caller reconciles
 * with the stream's actual tail, so it is NOT retryable; `checkTail` is the
 * fix.
 */
export class PreconditionFailed extends Schema.TaggedError<PreconditionFailed>()(
  "PreconditionFailed",
  {
    message: Schema.String,
  },
).pipe(Category.withConflictError) {}

/**
 * HTTP 416 — the requested read position is outside the stream's current
 * range: a `seq_num` past the tail, or a `timestamp` older than anything
 * retained. Not retryable as-is — read from an earlier/clamped position.
 */
export class RangeNotSatisfiable extends Schema.TaggedError<RangeNotSatisfiable>()(
  "RangeNotSatisfiable",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * Unknown S2 error — returned when a failed response's HTTP status has no
 * mapped error class. `code` is S2's own error code (the machine-parsable
 * half of its error envelope). See https://s2.dev/docs.
 */
export class UnknownS2Error extends Schema.TaggedError<UnknownS2Error>()("UnknownS2Error", {
  code: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  body: Schema.Unknown,
}).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class S2ParseError extends Schema.TaggedError<S2ParseError>()("S2ParseError", {
  body: Schema.Unknown,
  cause: Schema.Unknown,
}).pipe(Category.withParseError) {}

/**
 * Errors any S2 operation may surface in addition to the shared HTTP
 * status errors.
 */
export type ClientErrors =
  | UnknownS2Error
  | S2ParseError
  | RequestTimeout
  | PreconditionFailed
  | RangeNotSatisfiable;

/**
 * Default S2 operation errors.
 *
 * EVERY operation carries the whole set: the spec types failures only as a
 * per-operation status list against the shared `ErrorInfo` envelope, so any
 * documented status can come back from any call and the error channel says
 * so rather than pretending a `404` is impossible on a route that never
 * declared one.
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
