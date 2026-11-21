/**
 * Tinybird error types.
 *
 * Tinybird answers a failure with `{ "error": "<message>" }` (some routes add
 * `documentation` or other fields) under an HTTP status, and its reference
 * types failures only as per-operation status tables (`400`, `403`, `404`,
 * `409`, `413`, `422`, `429`, `5xx`). The SDK dispatches on the status with
 * core's shared classes; a status nothing maps comes back as
 * {@link UnknownTinybirdError} with the body.
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
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Unknown Tinybird error -- a failed response whose status has no mapped
 * class (`413` payload too large, for one). `message` is Tinybird's `error`.
 */
export class UnknownTinybirdError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownTinybirdError>()(
    "UnknownTinybirdError",
    UnknownErrorFields,
  ) {}

/** A 2xx body that did not match the operation's output (validating modes only). */
export class TinybirdParseError
  extends /*@__PURE__*/ Schema.TaggedError<TinybirdParseError>()("TinybirdParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Tinybird operation may surface besides the shared HTTP status errors. */
export type ClientErrors = UnknownTinybirdError | TinybirdParseError;

/**
 * Default Tinybird operation errors. Every operation carries the whole set:
 * the reference lists statuses per operation inconsistently (many sections
 * list none), so any of them can come back from any call.
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
