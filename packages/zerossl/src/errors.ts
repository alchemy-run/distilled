/**
 * ZeroSSL-specific error types.
 *
 * ZeroSSL answers failures with `{ success: false, error: { code, type,
 * info? } }`, usually under HTTP 200. Typed errors are generated from
 * `manual-specs/zerossl.json` and matched on `error.type`; this module holds the
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
import type {
  BadRequest as CoreBadRequest,
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  NotFound as CoreNotFound,
} from "@distilled.cloud/core/errors";
import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * Unknown ZeroSSL error — an error envelope whose `type` matches no typed
 * class on the operation. Carries a redacted body for diagnostics; add
 * newly observed errors to the authored model.
 */
export class UnknownZeroSslError extends Schema.TaggedError<UnknownZeroSslError>()(
  "UnknownZeroSslError",
  {
    code: Schema.optional(Schema.Number),
    type: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
) {}

/** Schema parse error wrapper. */
export class ZeroSslParseError extends Schema.TaggedError<ZeroSslParseError>()(
  "ZeroSslParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

export type ClientErrors = UnknownZeroSslError | ZeroSslParseError;

export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | ClientErrors;
