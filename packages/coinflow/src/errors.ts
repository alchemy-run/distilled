/**
 * Coinflow-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Coinflow
 * fallback and parse errors.
 *
 * Coinflow failure bodies are `{ msg }` for most operations (some answer
 * `{ message }`, or a richer body such as a 451's `verificationLink`). Each
 * status an operation declares is a typed error class in the generated
 * service module (`VerificationRequired`, `PreconditionFailed`,
 * `CustomerBlocked`, ...) carrying `message` and the parsed `body`; other
 * failures surface as the shared status classes or `UnknownCoinflowError`.
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
 * Unknown Coinflow error -- returned when an error response matches neither
 * an operation's typed errors nor a shared HTTP status class.
 */
export class UnknownCoinflowError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownCoinflowError>()("UnknownCoinflowError", {
    status: /*@__PURE__*/ Schema.optional(Schema.Number),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

/** A 2xx response that does not match the operation's output schema. */
export class CoinflowParseError
  extends /*@__PURE__*/ Schema.TaggedError<CoinflowParseError>()("CoinflowParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Coinflow operation may surface beyond the core HTTP defaults. */
export type ClientErrors = UnknownCoinflowError | CoinflowParseError;

/**
 * Default Coinflow operation errors: the shared HTTP status errors from core
 * plus the Coinflow client errors.
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
