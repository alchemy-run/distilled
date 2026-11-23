export {
  API_ERRORS,
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  DEFAULT_ERRORS,
  Forbidden,
  GatewayTimeout,
  HTTP_STATUS_MAP,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
} from "@distilled.cloud/core/errors";
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Category from "@distilled.cloud/core/category";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

export class UnknownTailscaleError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownTailscaleError>()(
    "UnknownTailscaleError",
    UnknownErrorFields,
  ) {}

export class TailscaleParseError extends Schema.TaggedError<TailscaleParseError>()(
  "TailscaleParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * The OAuth token exchange the credentials make failed: Tailscale could
 * not be reached, refused the client credentials, answered with something
 * that is not a token, or did not answer in time.
 * `status` is the token endpoint's HTTP status, when it answered. It is a
 * failure of a request at run time, so it is not a `ConfigError`.
 */
export class TokenRequestFailed
  extends /*@__PURE__*/ Schema.TaggedError<TokenRequestFailed>()("TokenRequestFailed", {
    message: Schema.String,
    status: /*@__PURE__*/ Schema.optional(Schema.Number),
  }).pipe(Category.withAuthError) {}

/**
 * The errors declared on the Tailscale service: any operation can return
 * them, and every generated operation lists them as its `serviceErrors`.
 * Each of core's status classes: the protocol builds the one for a failed
 * response's status when the operation's own classes do not match.
 */
export const TailscaleServiceErrors = API_ERRORS;
export type TailscaleServiceError = InstanceType<(typeof TailscaleServiceErrors)[number]>;
