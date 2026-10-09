/**
 * Notion-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the unknown-error and
 * parse-error wrappers. Every Notion failure carries the same envelope —
 * `{ "object": "error", "status": number, "code": string, "message": string }`
 * — and the spec types no failure per operation beyond the status list, so
 * the SDK dispatches on the status and carries `code` through on
 * {@link UnknownNotionError} for statuses nothing else maps (406
 * `row_limit_exceeded`).
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
 * Unknown Notion error — returned when a failed response's HTTP status has
 * no mapped error class.
 */
export class UnknownNotionError extends Schema.TaggedError<UnknownNotionError>()(
  "UnknownNotionError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class NotionParseError extends Schema.TaggedError<NotionParseError>()("NotionParseError", {
  body: Schema.Unknown,
  cause: Schema.Unknown,
}).pipe(Category.withParseError) {}

/**
 * Errors any Notion operation may surface in addition to the shared HTTP
 * status errors.
 */
export type ClientErrors = UnknownNotionError | NotionParseError;

/**
 * Default Notion operation errors.
 *
 * EVERY operation carries the whole set: the spec types failures only as a
 * per-operation status list against one shared envelope, so any documented
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
