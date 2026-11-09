/**
 * Exa-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Exa
 * fallback and parse errors.
 *
 * Exa error bodies are `{ requestId, error, tag }`, for example
 * `{ "error": "Invalid request body", "tag": "INVALID_REQUEST_BODY" }`
 * (https://exa.ai/docs/admin/error-codes); the Team Management API answers
 * `{ error }`. The protocol reports `tag` as the code of an
 * `UnknownExaError`. `402 Payment Required` (credits exhausted, a budget
 * exceeded) is a generated `PaymentRequired` class on the operations that
 * document it.
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
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Unknown Exa error -- returned when an error response matches neither an
 * operation's typed errors nor a shared HTTP status class. `code` is the
 * body's `tag`.
 */
export class UnknownExaError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownExaError>()("UnknownExaError", {
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

/** A 2xx response that does not match the operation's output schema. */
export class ExaParseError
  extends /*@__PURE__*/ Schema.TaggedError<ExaParseError>()("ExaParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Exa operation may surface beyond the core HTTP defaults. */
export type ClientErrors = UnknownExaError | ExaParseError;

/**
 * Default Exa operation errors: the shared HTTP status errors from core plus
 * the Exa client errors.
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
