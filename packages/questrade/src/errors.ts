/**
 * Questrade-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Questrade
 * fallback and parse errors.
 *
 * Questrade answers a failure with `{ code, message }` -- `code` is a number
 * such as `1017` ("Access token is invalid", 401) or `1019` ("Symbol not
 * found", 404); see https://www.questrade.com/api/documentation/error-handling.
 * The documentation ties no code to an operation, so the protocol maps the
 * status to core's shared classes and reports any other status as an
 * `UnknownQuestradeError` carrying the code.
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
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Unknown Questrade error -- returned when an error response matches no
 * shared HTTP status class. `code` is the body's numeric `code` as a string.
 */
export class UnknownQuestradeError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownQuestradeError>()(
    "UnknownQuestradeError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class QuestradeParseError
  extends /*@__PURE__*/ Schema.TaggedError<QuestradeParseError>()("QuestradeParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Questrade operation may surface beyond the core HTTP defaults. */
export type ClientErrors = UnknownQuestradeError | QuestradeParseError;

/**
 * Default Questrade operation errors: the shared HTTP status errors from core
 * plus the Questrade client errors.
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

/**
 * Redeeming the refresh token failed: the login server could not be
 * reached, refused the token (a refresh token redeems once), answered with
 * something that is not a set of tokens, or did not answer in time.
 * `status` is the token endpoint's HTTP status, when it answered. It is a
 * failure of a request at run time, so it is not a `ConfigError`.
 */
export class TokenRequestFailed
  extends /*@__PURE__*/ Schema.TaggedError<TokenRequestFailed>()("TokenRequestFailed", {
    message: Schema.String,
    status: /*@__PURE__*/ Schema.optional(Schema.Number),
  }).pipe(Category.withAuthError) {}

/**
 * The errors declared on the Questrade service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const QuestradeServiceErrors = API_ERRORS;
export type QuestradeServiceError = InstanceType<(typeof QuestradeServiceErrors)[number]>;
