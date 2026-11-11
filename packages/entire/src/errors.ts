/**
 * Entire-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Entire-specific
 * ones. Every Entire failure is an RFC 9457 problem document --
 * `{ status, title, detail, errors? }` -- and the spec types failures only as
 * a per-operation status list against that one shape, so the SDK dispatches
 * on the status.
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
 * 421 -- the request reached a region that does not own the resource (a
 * repo homed in another jurisdiction, or a token minted for another region).
 */
export class MisdirectedRequest
  extends /*@__PURE__*/ Schema.TaggedError<MisdirectedRequest>()("MisdirectedRequest", {
    message: Schema.String,
  }).pipe(Category.withBadRequestError) {}

/** 410 -- the resource existed but has been permanently removed. */
export class Gone
  extends /*@__PURE__*/ Schema.TaggedError<Gone>()("Gone", {
    message: Schema.String,
  }).pipe(Category.withNotFoundError) {}

/** 412 -- an `If-Match` precondition no longer matches the resource's version. */
export class PreconditionFailed
  extends /*@__PURE__*/ Schema.TaggedError<PreconditionFailed>()("PreconditionFailed", {
    message: Schema.String,
  }).pipe(Category.withConflictError) {}

/** 428 -- the operation requires an `If-Match` precondition header. */
export class PreconditionRequired
  extends /*@__PURE__*/ Schema.TaggedError<PreconditionRequired>()("PreconditionRequired", {
    message: Schema.String,
  }).pipe(Category.withBadRequestError) {}

/** 413 -- the request body is larger than the operation accepts. */
export class PayloadTooLarge
  extends /*@__PURE__*/ Schema.TaggedError<PayloadTooLarge>()("PayloadTooLarge", {
    message: Schema.String,
  }).pipe(Category.withBadRequestError) {}

/**
 * Unknown Entire error -- returned when a failed response's HTTP status has
 * no mapped error class.
 */
export class UnknownEntireError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownEntireError>()("UnknownEntireError", {
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class EntireParseError
  extends /*@__PURE__*/ Schema.TaggedError<EntireParseError>()("EntireParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * Errors any Entire operation may surface in addition to the shared HTTP
 * status errors.
 */
export type ClientErrors =
  | MisdirectedRequest
  | Gone
  | PreconditionFailed
  | PreconditionRequired
  | PayloadTooLarge
  | UnknownEntireError
  | EntireParseError;

/**
 * Default Entire operation errors.
 *
 * EVERY operation carries the whole set: the spec types failures only as a
 * per-operation status list against one shared problem document, so any
 * documented status can come back from any call.
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
