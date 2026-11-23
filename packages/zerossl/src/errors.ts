/**
 * ZeroSSL-specific error types.
 *
 * ZeroSSL answers failures with `{ success: false, error: { code, type,
 * info? } }`, usually under HTTP 200. Typed errors are generated from the
 * error-code tables in ZeroSSL's API reference and matched on `error.type`; this module holds the
 * shared HTTP defaults and the package's own fallback.
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
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  NotFound as CoreNotFound,
} from "@distilled.cloud/core/errors";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Unknown ZeroSSL error -- an error envelope whose `type` matches no typed
 * class on the operation. Carries a redacted body for diagnostics; add
 * newly observed errors to the authored model.
 */
export class UnknownZeroSslError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownZeroSslError>()("UnknownZeroSslError", {
    ...UnknownErrorFields,
    /** ZeroSSL's numeric error code. */
    code: /*@__PURE__*/ Schema.optional(Schema.Number),
    type: /*@__PURE__*/ Schema.optional(Schema.String),
  }) {}

/** Schema parse error wrapper. */
export class ZeroSslParseError
  extends /*@__PURE__*/ Schema.TaggedError<ZeroSslParseError>()("ZeroSslParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

export type ClientErrors = UnknownZeroSslError | ZeroSslParseError;

export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | ClientErrors;

/**
 * The errors declared on the ZeroSSL service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`.
 * Each of core's status classes: the protocol builds the one for a failed
 * response's status when the operation's own classes do not match.
 */
export const ZeroSslServiceErrors = API_ERRORS;
export type ZeroSslServiceError = InstanceType<(typeof ZeroSslServiceErrors)[number]>;
