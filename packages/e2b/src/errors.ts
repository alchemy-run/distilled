/**
 * E2B-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the unknown-error
 * and parse-error wrappers. The control plane and envd both fail with a
 * `{ code, message }` body (Connect errors use a string `code` such as
 * `not_found`), and no operation narrows which statuses it produces, so the
 * SDK dispatches on the status (the classes here) and carries the body's
 * `code` through on {@link UnknownE2BError}. Specific failures alchemy
 * branches on are typed with patches.
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

/** Unknown E2B error -- a failed response whose status has no mapped error class. */
export class UnknownE2BError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownE2BError>()("UnknownE2BError", {
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class E2BParseError
  extends /*@__PURE__*/ Schema.TaggedError<E2BParseError>()("E2BParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The sandbox is paused or no longer exists: envd calls through E2B's proxy
 * answer 502 ("The sandbox was not found"; through a Cloudflare Worker,
 * Cloudflare's "error code: 502"). Resume a paused sandbox
 * (`sandboxes.connectSandbox`) before calling envd; retrying won't help, so
 * it is a conflict, not a server error. The generated envd
 * operations carry the same tag; this class is the streaming calls' copy.
 */
export class SandboxNotRunning
  extends /*@__PURE__*/ Schema.TaggedError<SandboxNotRunning>()("SandboxNotRunning", {
    code: Schema.Number,
    message: Schema.String,
  }).pipe(Category.withConflictError) {}

/** Errors any E2B operation may surface in addition to the shared HTTP status errors. */
export type ClientErrors = UnknownE2BError | E2BParseError;

/** Default E2B operation errors: any documented status can come back from any call. */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | CoreLocked
  | ClientErrors;
