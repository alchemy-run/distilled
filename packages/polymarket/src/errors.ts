/**
 * Polymarket error types.
 *
 * Re-exports the common HTTP errors from core and adds the status the
 * Perps API documents that core's shared map has no entry for (413), plus
 * the unknown-error and parse-error wrappers.
 *
 * Every Polymarket API answers a failure with an `error` string (CLOB and
 * Data add a string `code`), so the SDK dispatches on the HTTP status and
 * keeps the code on {@link UnknownPolymarketError} for statuses nothing
 * else maps.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  HTTP_STATUS_MAP,
  DEFAULT_ERRORS,
  API_ERRORS,
} from "@distilled.cloud/core/errors";
export { CryptoError } from "@distilled.cloud/core/crypto";
import * as Category from "@distilled.cloud/core/category";
import type {
  BadRequest as CoreBadRequest,
  Conflict as CoreConflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  NotFound as CoreNotFound,
  UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * HTTP 413 -- the Perps gateway refused a request body over its size cap
 * (`payload_too_large`). Split the batch into smaller requests.
 */
export class PayloadTooLarge
  extends /*@__PURE__*/ Schema.TaggedError<PayloadTooLarge>()("PayloadTooLarge", {
    message: Schema.String,
  }).pipe(Category.withBadRequestError) {}

/**
 * Unknown Polymarket error -- returned when a failed response's HTTP status
 * has no mapped error class. `code` is the API's own error code, when the
 * body has one.
 */
export class UnknownPolymarketError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownPolymarketError>()("UnknownPolymarketError", {
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class PolymarketParseError
  extends /*@__PURE__*/ Schema.TaggedError<PolymarketParseError>()("PolymarketParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Polymarket operation may surface besides the shared HTTP ones. */
export type ClientErrors = UnknownPolymarketError | PolymarketParseError | PayloadTooLarge;

/**
 * Default Polymarket operation errors. Every operation carries the whole
 * set: the documents list statuses per operation over one shared error
 * body, and the protocol maps by status alone.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | ClientErrors;
