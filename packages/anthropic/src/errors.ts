/**
 * Claude Platform (Anthropic) error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Anthropic
 * fallback and parse errors.
 *
 * Every failure is `{ type: "error", error: { type, message }, request_id }`
 * (`ErrorResponse` in the spec), where `error.type` is one of
 * `invalid_request_error`, `authentication_error`, `billing_error`,
 * `permission_error`, `not_found_error`, `rate_limit_error`,
 * `timeout_error`, `api_error` or `overloaded_error`. The spec gives every
 * operation the same envelope for every status, so the SDK dispatches on the
 * status and carries `error.type` on {@link UnknownAnthropicError} for
 * statuses nothing maps.
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
  NotFound as CoreNotFound,
} from "@distilled.cloud/core/errors";
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Unknown Anthropic error -- returned when a failed response's HTTP status
 * has no mapped error class (413 `request_too_large`, 402
 * `billing_error`). `code` is the body's `error.type`.
 */
export class UnknownAnthropicError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownAnthropicError>()(
    "UnknownAnthropicError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class AnthropicParseError
  extends /*@__PURE__*/ Schema.TaggedError<AnthropicParseError>()("AnthropicParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Anthropic operation may surface beyond the core HTTP defaults. */
export type ClientErrors = UnknownAnthropicError | AnthropicParseError;

/**
 * Default Anthropic operation errors: the shared HTTP status errors from
 * core for the statuses the spec lists on every operation (400, 401, 403,
 * 404, 408 and 504 as `GatewayTimeout`, 409, 429, 500, 503, and 529
 * `overloaded_error` as `ServiceUnavailable`), plus the Anthropic client
 * errors.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | ClientErrors;
