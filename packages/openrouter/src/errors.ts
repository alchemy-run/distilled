/**
 * OpenRouter-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the unknown-error and
 * parse-error wrappers. OpenRouter types its failures with the plain HTTP
 * vocabulary core already covers (400/401/402/404/429/5xx per operation,
 * mapped through the protocol's status map) — the one status core has no
 * class for is 402 Payment Required, raised when the account is out of
 * credit; it is added here.
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
import type { DefaultErrors as CoreDefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * HTTP 402 — the request is well-formed but the account (or the key's
 * credit limit) cannot pay for it. Retrying unchanged keeps failing until
 * credits are added, so it is NOT marked retryable.
 *
 * Operations that declare a `402` also generate their own `PaymentRequired`
 * class in their service module (from the spec's per-operation error list);
 * this is the one the protocol's status map falls back to everywhere else.
 */
export class PaymentRequired extends Schema.TaggedError<PaymentRequired>()(
  "PaymentRequired",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * Unknown OpenRouter error — returned when a failed response's HTTP status
 * has no mapped error class. Carries the raw body for later cataloging.
 */
export class UnknownOpenRouterError extends Schema.TaggedError<UnknownOpenRouterError>()(
  "UnknownOpenRouterError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class OpenRouterParseError extends Schema.TaggedError<OpenRouterParseError>()(
  "OpenRouterParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any OpenRouter operation may surface in addition to the
 * per-operation typed status errors.
 */
export type ClientErrors =
  | UnknownOpenRouterError
  | OpenRouterParseError
  | PaymentRequired;

/**
 * Default OpenRouter operation errors: the shared HTTP status errors from
 * core plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
