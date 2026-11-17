/**
 * Technitium error types -- hand-written.
 *
 * Technitium answers HTTP 200 for failed calls too and reports the outcome in the `status`
 * member of the JSON envelope. The protocol maps it:
 *
 * | `status`        | Error                                                          |
 * | --------------- | -------------------------------------------------------------- |
 * | `error`         | {@link TechnitiumError}, or `Forbidden` for `Access was denied.` |
 * | `invalid-token` | `Unauthorized`                                                 |
 * | `2fa-required`  | {@link TwoFactorAuthRequired}                                  |
 * | anything else   | {@link UnknownTechnitiumError}                                 |
 *
 * A non-2xx response (from a reverse proxy, for example) maps by HTTP status to core's classes.
 */
export {
  BadGateway,
  BadRequest,
  ConfigError,
  Conflict,
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
} from "@distilled.cloud/core/errors";

import * as Category from "@distilled.cloud/core/category";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** A call failed with `status: "error"`. `message` is Technitium's `errorMessage`. */
export class TechnitiumError
  extends /*@__PURE__*/ Schema.TaggedError<TechnitiumError>()("TechnitiumError", {
    message: Schema.String,
    innerMessage: /*@__PURE__*/ Schema.optional(Schema.String),
  }).pipe(Category.withBadRequestError) {}

/** The user has two-factor authentication enabled and the call needs a one-time code. */
export class TwoFactorAuthRequired
  extends /*@__PURE__*/ Schema.TaggedError<TwoFactorAuthRequired>()("TwoFactorAuthRequired", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}

/** A response the protocol cannot interpret: not JSON, or an unknown `status`. */
export class UnknownTechnitiumError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownTechnitiumError>()("UnknownTechnitiumError", {
    message: Schema.String,
    httpStatus: Schema.Number,
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

/** A successful response that does not match the operation's output in a validating mode. */
export class TechnitiumParseError
  extends /*@__PURE__*/ Schema.TaggedError<TechnitiumParseError>()("TechnitiumParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
