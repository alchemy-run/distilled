/**
 * Rivet-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Rivet
 * fallback and parse errors.
 *
 * Rivet error bodies are `{ group, code, message, metadata? }` (for example
 * `{ group: "pool", code: "not_found" }`), and the response also carries an
 * `x-rivet-error: <group>.<code>` header, which per-operation error matchers
 * in `patches/` match on. The protocol reports the same `<group>.<code>` as
 * the code of an `UnknownRivetError`.
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
 * Unknown Rivet error -- returned when an error response matches neither an
 * operation's typed errors nor a shared HTTP status class. `code` is the
 * `<group>.<code>` pair from the body.
 */
export class UnknownRivetError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownRivetError>()("UnknownRivetError", {
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

/** A 2xx response that does not match the operation's output schema. */
export class RivetParseError
  extends /*@__PURE__*/ Schema.TaggedError<RivetParseError>()("RivetParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Rivet operation may surface beyond the core HTTP defaults. */
export type ClientErrors = UnknownRivetError | RivetParseError;

/**
 * Default Rivet operation errors: the shared HTTP status errors from core
 * plus the Rivet client errors.
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
