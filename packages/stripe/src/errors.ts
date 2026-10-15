/**
 * Stripe-specific error types.
 *
 * Re-exports common HTTP errors from core and adds Stripe-specific error
 * matching and API error types. Ported from distilled v0's stripe errors
 * module.
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
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Payment error -- returned when a payment request fails (HTTP 402).
 * The parameters were valid but the request failed (e.g., card declined).
 */
export class PaymentError
  extends /*@__PURE__*/ Schema.TaggedError<PaymentError>()("PaymentError", {
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    decline_code: /*@__PURE__*/ Schema.optional(Schema.String),
    charge: /*@__PURE__*/ Schema.optional(Schema.String),
    param: /*@__PURE__*/ Schema.optional(Schema.String),
    doc_url: /*@__PURE__*/ Schema.optional(Schema.String),
    request_log_url: /*@__PURE__*/ Schema.optional(Schema.String),
  }).pipe(Category.withBadRequestError) {}

/**
 * Card error -- returned when a card cannot be charged.
 * Stripe error type: "card_error"
 */
export class CardError
  extends /*@__PURE__*/ Schema.TaggedError<CardError>()("CardError", {
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    decline_code: /*@__PURE__*/ Schema.optional(Schema.String),
    charge: /*@__PURE__*/ Schema.optional(Schema.String),
    param: /*@__PURE__*/ Schema.optional(Schema.String),
    doc_url: /*@__PURE__*/ Schema.optional(Schema.String),
    advice_code: /*@__PURE__*/ Schema.optional(Schema.String),
    network_advice_code: /*@__PURE__*/ Schema.optional(Schema.String),
    network_decline_code: /*@__PURE__*/ Schema.optional(Schema.String),
    payment_method_type: /*@__PURE__*/ Schema.optional(Schema.String),
    request_log_url: /*@__PURE__*/ Schema.optional(Schema.String),
  }).pipe(Category.withBadRequestError) {}

/**
 * Idempotency error -- returned when an Idempotency-Key is re-used
 * on a request that does not match the first request's API endpoint and parameters.
 * Stripe error type: "idempotency_error"
 */
export class IdempotencyError
  extends /*@__PURE__*/ Schema.TaggedError<IdempotencyError>()("IdempotencyError", {
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    doc_url: /*@__PURE__*/ Schema.optional(Schema.String),
    request_log_url: /*@__PURE__*/ Schema.optional(Schema.String),
  }).pipe(Category.withConflictError) {}

/**
 * Invalid request error -- returned when the request has invalid parameters.
 * Stripe error type: "invalid_request_error"
 */
export class InvalidRequestError
  extends /*@__PURE__*/ Schema.TaggedError<InvalidRequestError>()("InvalidRequestError", {
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    param: /*@__PURE__*/ Schema.optional(Schema.String),
    doc_url: /*@__PURE__*/ Schema.optional(Schema.String),
    request_log_url: /*@__PURE__*/ Schema.optional(Schema.String),
  }).pipe(Category.withBadRequestError) {}

/**
 * API error -- returned when something goes wrong on Stripe's end (HTTP 500+).
 * Stripe error type: "api_error"
 */
export class ApiError
  extends /*@__PURE__*/ Schema.TaggedError<ApiError>()("ApiError", {
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    param: /*@__PURE__*/ Schema.optional(Schema.String),
    doc_url: /*@__PURE__*/ Schema.optional(Schema.String),
    request_log_url: /*@__PURE__*/ Schema.optional(Schema.String),
  }).pipe(Category.withServerError, /*@__PURE__*/ Category.withRetryable()) {}

/**
 * External dependency failed -- returned when an external dependency fails (HTTP 424).
 */
export class ExternalDependencyFailed
  extends /*@__PURE__*/ Schema.TaggedError<ExternalDependencyFailed>()("ExternalDependencyFailed", {
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    doc_url: /*@__PURE__*/ Schema.optional(Schema.String),
  }).pipe(Category.withServerError, /*@__PURE__*/ Category.withRetryable()) {}

/**
 * Stripe HTTP status code to error class mapping.
 * Extends core HTTP_STATUS_MAP with Stripe-specific statuses.
 */
export const STRIPE_HTTP_STATUS_MAP = {
  402: PaymentError,
  424: ExternalDependencyFailed,
} as const;

// Unknown Stripe error -- returned when an error type is not recognized
export class UnknownStripeError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownStripeError>()("UnknownStripeError", {
    type: /*@__PURE__*/ Schema.optional(Schema.String),
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    param: /*@__PURE__*/ Schema.optional(Schema.String),
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class StripeParseError
  extends /*@__PURE__*/ Schema.TaggedError<StripeParseError>()("StripeParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * Stripe webhook signature verification failed.
 *
 * This is raised by the local webhook helpers when the Stripe-Signature header
 * is missing, malformed, expired, or does not match the raw request payload.
 */
export class StripeWebhookSignatureError
  extends /*@__PURE__*/ Schema.TaggedError<StripeWebhookSignatureError>()(
    "StripeWebhookSignatureError",
    {
      message: Schema.String,
      cause: /*@__PURE__*/ Schema.optional(Schema.Unknown),
    },
  ).pipe(Category.withAuthError) {}

/**
 * Stripe webhook payload JSON parsing failed after signature verification.
 */
export class StripeWebhookPayloadParseError
  extends /*@__PURE__*/ Schema.TaggedError<StripeWebhookPayloadParseError>()(
    "StripeWebhookPayloadParseError",
    {
      message: Schema.String,
      cause: /*@__PURE__*/ Schema.optional(Schema.Unknown),
    },
  ).pipe(Category.withParseError) {}
