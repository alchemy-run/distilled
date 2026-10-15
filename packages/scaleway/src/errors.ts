/**
 * Scaleway error types.
 *
 * Re-exports the common HTTP errors from core and adds Scaleway's own.
 * Every Scaleway API answers a failure with one JSON envelope —
 * `{ "type": "...", "message": "...", ... }` — whose `type` names the
 * failure and decides which fields come with it (`resource` /
 * `resource_id` for `not_found`, `current_state` for `transient_state`,
 * `details[]` for `invalid_arguments` / `quotas_exceeded` /
 * `permissions_denied`, …). The protocol dispatches on `type` first, the
 * same table the official SDKs use (scaleway-sdk-js
 * `packages/client/src/scw/errors/error-parser.ts`, scaleway-sdk-go
 * `scw/errors.go`), then on the HTTP status, so a `409` is a
 * {@link TransientStateError} or an {@link AlreadyExistsError} rather than
 * a bare `Conflict`.
 *
 * The specs declare no error responses at all, so these classes ride every
 * operation's `ScalewayOpError` instead of per-operation error lists.
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
import * as Schema from "effect/Schema";

/** One rejected argument of an `invalid_arguments` failure. */
export const InvalidArgumentDetail = Schema.Struct({
  argument_name: Schema.String,
  /** `required`, `format` or `constraint`. */
  reason: Schema.String,
  help_message: Schema.optional(Schema.String),
});

/** One exceeded quota of a `quotas_exceeded` failure. */
export const QuotaDetail = Schema.Struct({
  resource: Schema.String,
  quota: Schema.Number,
  current: Schema.Number,
});

/** One missing permission of a `permissions_denied` failure. */
export const PermissionDetail = Schema.Struct({
  resource: Schema.String,
  action: Schema.String,
});

/**
 * `invalid_arguments` (400) — one or more request fields were missing,
 * malformed or out of range; `details` names each one. Also raised for the
 * legacy `invalid_request_error` envelope (Instance v1) when it lists
 * `fields`.
 */
export class InvalidArgumentsError extends Schema.TaggedError<InvalidArgumentsError>()(
  "InvalidArgumentsError",
  {
    message: Schema.String,
    details: Schema.Array(InvalidArgumentDetail),
    body: Schema.Unknown,
  },
).pipe(Category.withBadRequestError) {}

/**
 * `denied_authentication` (401) — the secret key is missing, unknown,
 * expired or the wrong kind for this API. `method` is the authentication
 * method tried, `reason` why it failed (`invalid_argument`, `not_found`,
 * `expired`, …).
 */
export class DeniedAuthenticationError extends Schema.TaggedError<DeniedAuthenticationError>()(
  "DeniedAuthenticationError",
  {
    message: Schema.String,
    method: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withAuthError) {}

/**
 * `permissions_denied` (403) — the key authenticated, but its IAM policy
 * does not grant the listed actions.
 */
export class PermissionsDeniedError extends Schema.TaggedError<PermissionsDeniedError>()(
  "PermissionsDeniedError",
  {
    message: Schema.String,
    details: Schema.Array(PermissionDetail),
    body: Schema.Unknown,
  },
).pipe(Category.withAuthError) {}

/**
 * `quotas_exceeded` (403) — creating the resource would exceed an
 * Organization quota (`details[].quota` vs `details[].current`). Raise the
 * quota in the console or free capacity; retrying does not help.
 */
export class QuotasExceededError extends Schema.TaggedError<QuotasExceededError>()(
  "QuotasExceededError",
  {
    message: Schema.String,
    details: Schema.Array(QuotaDetail),
    body: Schema.Unknown,
  },
).pipe(Category.withQuotaError) {}

/**
 * `not_found` (404) — no `resource` with `resource_id` is visible to this
 * key. Also raised for the legacy `unknown_resource` envelope when its
 * message names the missing UUID.
 */
export class ResourceNotFoundError extends Schema.TaggedError<ResourceNotFoundError>()(
  "ResourceNotFoundError",
  {
    message: Schema.String,
    resource: Schema.optional(Schema.String),
    resource_id: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withNotFoundError) {}

/** `expired` (410) — the resource existed but expired at `expired_since`. */
export class ResourceExpiredError extends Schema.TaggedError<ResourceExpiredError>()(
  "ResourceExpiredError",
  {
    message: Schema.String,
    resource: Schema.optional(Schema.String),
    resource_id: Schema.optional(Schema.String),
    expired_since: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withNotFoundError) {}

/**
 * `locked` (423) — Scaleway has locked the resource (abuse, billing or
 * legal hold); it cannot be changed until the lock is lifted.
 */
export class ResourceLockedError extends Schema.TaggedError<ResourceLockedError>()(
  "ResourceLockedError",
  {
    message: Schema.String,
    resource: Schema.optional(Schema.String),
    resource_id: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withLockedError) {}

/**
 * `transient_state` (409) — the resource is mid-transition
 * (`current_state`: `starting`, `stopping`, `deleting`, …) and refuses the
 * change until it settles. Retryable: the default policy retries it with
 * backoff, the way the official SDKs' `waitFor*` helpers poll.
 */
export class TransientStateError extends Schema.TaggedError<TransientStateError>()(
  "TransientStateError",
  {
    message: Schema.String,
    resource: Schema.optional(Schema.String),
    resource_id: Schema.optional(Schema.String),
    current_state: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withConflictError, Category.withRetryable()) {}

/**
 * `already_exists` (409) — a `resource` with that identity (name, domain,
 * key) already exists, as `resource_id`.
 */
export class AlreadyExistsError extends Schema.TaggedError<AlreadyExistsError>()(
  "AlreadyExistsError",
  {
    message: Schema.String,
    resource: Schema.optional(Schema.String),
    resource_id: Schema.optional(Schema.String),
    help_message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withAlreadyExistsError) {}

/**
 * `precondition_failed` (412) — the resource is in a state that forbids the
 * call (`precondition`, e.g. `resource_still_in_use`, `attribute_must_be_set`)
 * and will stay that way until the caller changes something.
 */
export class PreconditionFailedError extends Schema.TaggedError<PreconditionFailedError>()(
  "PreconditionFailedError",
  {
    message: Schema.String,
    precondition: Schema.optional(Schema.String),
    help_message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withConflictError) {}

/**
 * `out_of_stock` — the zone has no capacity left for `resource` (an
 * Instance or Elastic Metal offer). Try another zone or offer.
 */
export class OutOfStockError extends Schema.TaggedError<OutOfStockError>()("OutOfStockError", {
  message: Schema.String,
  resource: Schema.optional(Schema.String),
  body: Schema.Unknown,
}).pipe(Category.withQuotaError) {}

/**
 * Unknown Scaleway error — returned when nothing else matches the failure.
 * `code` is the envelope's `type` when it had one.
 */
export class UnknownScalewayError extends Schema.TaggedError<UnknownScalewayError>()(
  "UnknownScalewayError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class ScalewayParseError extends Schema.TaggedError<ScalewayParseError>()(
  "ScalewayParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/** The errors Scaleway's `type` envelope can name. */
export type ScalewayErrors =
  | InvalidArgumentsError
  | DeniedAuthenticationError
  | PermissionsDeniedError
  | QuotasExceededError
  | ResourceNotFoundError
  | ResourceExpiredError
  | ResourceLockedError
  | TransientStateError
  | AlreadyExistsError
  | PreconditionFailedError
  | OutOfStockError;

/**
 * Default Scaleway operation errors.
 *
 * EVERY operation carries the whole set: the specs declare no failures, and
 * any Scaleway API can answer with any `type` — the error channel says so
 * rather than pretending a `404` is impossible on a route that never
 * declared one. The status classes cover failures whose body has no
 * recognised `type` (a proxy error page, a gateway timeout).
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | CoreLocked
  | ScalewayErrors
  | UnknownScalewayError
  | ScalewayParseError;
