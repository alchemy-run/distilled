/**
 * Whop-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the one status Whop
 * uses that core's shared map has no entry for, plus the unknown-error and
 * parse-error wrappers.
 *
 * Whop answers every failure with a single `error` object carrying a
 * machine-readable `type` (`invalid_parameters`, `parameter_missing`,
 * `not_found`, ...) beside the human-readable `message`. The status is what
 * the SDK dispatches on -- that is what the specs declare per operation -- and
 * the finer-grained `type` rides through on `code`, both on the typed
 * per-operation classes and on {@link UnknownWhopError}.
 *
 * @see https://docs.whop.com/developer/troubleshooting
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
import type { DefaultErrors as CoreDefaultErrors } from "@distilled.cloud/core/errors";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";
import { applyErrorMatchers } from "@distilled.cloud/core/trait";

/**
 * HTTP 402 -- the call is well-formed but the money isn't there: an ad
 * campaign whose payment failed, media generation billed against a balance
 * that can't cover it. Retrying unchanged keeps failing until the balance is
 * topped up, so it is NOT marked retryable.
 *
 * Operations that declare a `402` also generate their own `PaymentRequired`
 * class in their service module (from the spec's per-operation error list);
 * this is the one the service's error list falls back to everywhere else.
 */
export class PaymentRequired
  extends /*@__PURE__*/ applyErrorMatchers(
    /*@__PURE__*/ Schema.TaggedError<PaymentRequired>()("PaymentRequired", {
      message: Schema.String,
    }).pipe(Category.withBadRequestError),
    [{ status: 402 }],
  ) {}

/**
 * Unknown Whop error -- returned when a failed response's HTTP status has no
 * mapped error class. `code` carries the envelope's `error.type` (the
 * machine-parsable half of Whop's error object) and `body` the raw payload,
 * so an unmapped status is still actionable.
 */
export class UnknownWhopError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownWhopError>()(
    "UnknownWhopError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class WhopParseError
  extends /*@__PURE__*/ Schema.TaggedError<WhopParseError>()("WhopParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * Errors any Whop operation may surface in addition to the per-operation
 * typed status errors.
 */
export type ClientErrors = UnknownWhopError | WhopParseError | PaymentRequired;

/**
 * Default Whop operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;

/**
 * The errors declared on the Whop service: any operation can return them, and
 * every generated operation lists them as its `serviceErrors`. Each of core's
 * status classes, and {@link PaymentRequired} for 402, matched by its status
 * like an operation's own errors.
 */
export const WhopServiceErrors = [...API_ERRORS, PaymentRequired] as const;
export type WhopServiceError = InstanceType<(typeof WhopServiceErrors)[number]>;
