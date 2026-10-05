/**
 * Iceberg REST Catalog error types.
 *
 * Every failure carries one envelope — `{ "error": { "message", "type",
 * "code" } }` — where `type` names the exception (`NoSuchTableException`,
 * `CommitFailedException`, …). The exceptions an operation documents are
 * generated per operation in `services/catalog.ts` and matched on status
 * plus `error.type`; this module holds what every route shares: core's
 * HTTP status errors, the 419 the spec adds, and the unknown-error and
 * parse-error wrappers.
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
  UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";
import * as Schema from "effect/Schema";

/**
 * HTTP 419 — `AuthenticationTimeoutException`: the token expired. The spec
 * lets a catalog send this instead of 401; refresh the token and retry.
 */
export class AuthenticationTimeout extends Schema.TaggedError<AuthenticationTimeout>()(
  "AuthenticationTimeout",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * Unknown Iceberg error — a failed response nothing else matched. `code` is
 * the envelope's `error.code` (the HTTP status the server reported).
 */
export class UnknownIcebergError extends Schema.TaggedError<UnknownIcebergError>()(
  "UnknownIcebergError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class IcebergParseError extends Schema.TaggedError<IcebergParseError>()(
  "IcebergParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Iceberg operation may surface in addition to the shared HTTP
 * status errors.
 */
export type ClientErrors = UnknownIcebergError | IcebergParseError | AuthenticationTimeout;

/**
 * Default Iceberg operation errors.
 *
 * Beyond core's defaults, every operation carries the 4xx statuses a
 * catalog may answer with when its `error.type` is not one the operation
 * documents (a 404 from a catalog that names it `NotFoundException`, a 409
 * from a rename): those fall back to the status classes rather than
 * pretending they cannot happen.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | ClientErrors;
