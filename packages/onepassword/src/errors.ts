/**
 * 1Password-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the 1Password
 * fallback errors. Note the generated service module additionally defines
 * its own per-status matcher classes (BadRequest/NotFound/...) for the
 * statuses each operation declares -- those share `_tag`s with the core
 * classes here, so `catchTag` works against either.
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
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Category from "@distilled.cloud/core/category";
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Unknown 1Password error -- returned when nothing else matches the failure. */
export class UnknownOnepasswordError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownOnepasswordError>()(
    "UnknownOnepasswordError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class OnepasswordParseError
  extends /*@__PURE__*/ Schema.TaggedError<OnepasswordParseError>()("OnepasswordParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * A 1Password SDK core error. `kind` is the core's error name when it sent one
 * (`name` would shadow `Error.prototype.name`).
 */
export class OnepasswordSdkError
  extends /*@__PURE__*/ Schema.TaggedError<OnepasswordSdkError>()("OnepasswordSdkError", {
    kind: /*@__PURE__*/ Schema.optional(Schema.String),
    message: Schema.String,
  }) {}

/** The 1Password desktop app session expired; the SDK client re-initialises once and retries. */
export class DesktopSessionExpired
  extends /*@__PURE__*/ Schema.TaggedError<DesktopSessionExpired>()("DesktopSessionExpired", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}

/** The 1Password SDK credentials were rejected or have expired. */
export class AuthExpired
  extends /*@__PURE__*/ Schema.TaggedError<AuthExpired>()("AuthExpired", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}

/** The 1Password SDK core reported a rate limit. */
export class RateLimitExceeded
  extends /*@__PURE__*/ Schema.TaggedError<RateLimitExceeded>()("RateLimitExceeded", {
    message: Schema.String,
  }).pipe(
    Category.withThrottlingError,
    /*@__PURE__*/ Category.withRetryable({ throttling: true }),
  ) {}
