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
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
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
 * The OAuth token request the Users API credentials make failed:
 * 1Password could not be reached, refused the client credentials, answered
 * with something that is not a token, or did not answer in time.
 * `status` is the token endpoint's HTTP status, when it answered. It is a
 * failure of a request at run time, so it is not a `ConfigError`.
 */
export class TokenRequestFailed
  extends /*@__PURE__*/ Schema.TaggedError<TokenRequestFailed>()("TokenRequestFailed", {
    message: Schema.String,
    status: /*@__PURE__*/ Schema.optional(Schema.Number),
  }).pipe(Category.withAuthError) {}

/**
 * The errors declared on the 1Password service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const OnepasswordServiceErrors = API_ERRORS;
export type OnepasswordServiceError = InstanceType<(typeof OnepasswordServiceErrors)[number]>;
