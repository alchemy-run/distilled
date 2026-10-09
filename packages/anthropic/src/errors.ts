/**
 * Anthropic-specific error types — hand-written.
 *
 * Anthropic reports every failure in one envelope,
 *
 *   { "type": "error", "error": { "type": "rate_limit_error", "message": "…" } }
 *
 * and the `error.type` — not the HTTP status — says what went wrong
 * (https://docs.anthropic.com/en/api/errors). Each type is a class here
 * carrying a body matcher on `/error/type`; generated operations list them
 * all as common error classes, so the REST protocol's typed matcher surfaces
 * a failure as the class its envelope names on every operation. The same
 * matchers type the `error` events of a message stream (see protocol.ts).
 *
 * A failure with no recognizable envelope falls back to the core status
 * classes (`HTTP_STATUS_MAP`, plus 529 → {@link Overloaded}), then to
 * {@link UnknownAnthropicError}.
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
import { DurationSchema } from "@distilled.cloud/core/errors";
import { applyErrorMatchers } from "@distilled.cloud/core/trait";
import * as Schema from "effect/Schema";

/**
 * Fields of an `error.type` class. `body` is the parsed envelope and
 * `headers` the response headers (`request-id` identifies the request to
 * Anthropic support); `retryAfter` is the server's back-off hint on the
 * retryable classes.
 */
const envelopeFields = {
  message: Schema.String,
  body: Schema.optional(Schema.Unknown),
  headers: Schema.optional(Schema.Unknown),
};
const retryableFields = {
  ...envelopeFields,
  retryAfter: Schema.optional(DurationSchema),
};

const matches = (type: string) => [{ body: { "/error/type": type } }];

/** `invalid_request_error` (400) — the request's format or content is wrong. */
export class InvalidRequest extends applyErrorMatchers(
  Schema.TaggedError<InvalidRequest>()("InvalidRequest", envelopeFields).pipe(
    Category.withBadRequestError,
  ),
  matches("invalid_request_error"),
) {}

/** `authentication_error` (401) — the API key or token is missing or invalid. */
export class AuthenticationFailed extends applyErrorMatchers(
  Schema.TaggedError<AuthenticationFailed>()("AuthenticationFailed", envelopeFields).pipe(
    Category.withAuthError,
  ),
  matches("authentication_error"),
) {}

/** `billing_error` (402) — a billing or payment problem on the account. */
export class PaymentRequired extends applyErrorMatchers(
  Schema.TaggedError<PaymentRequired>()("PaymentRequired", envelopeFields).pipe(
    Category.withQuotaError,
  ),
  matches("billing_error"),
) {}

/** `permission_error` (403) — the credential may not use this resource. */
export class PermissionDenied extends applyErrorMatchers(
  Schema.TaggedError<PermissionDenied>()("PermissionDenied", envelopeFields).pipe(
    Category.withAuthError,
  ),
  matches("permission_error"),
) {}

/** `not_found_error` (404) — the requested resource does not exist. */
export class ResourceNotFound extends applyErrorMatchers(
  Schema.TaggedError<ResourceNotFound>()("ResourceNotFound", envelopeFields).pipe(
    Category.withNotFoundError,
  ),
  matches("not_found_error"),
) {}

/** `request_too_large` (413) — the request exceeds the maximum size. */
export class RequestTooLarge extends applyErrorMatchers(
  Schema.TaggedError<RequestTooLarge>()("RequestTooLarge", envelopeFields).pipe(
    Category.withBadRequestError,
  ),
  matches("request_too_large"),
) {}

/** `rate_limit_error` (429) — the account hit a rate limit. */
export class RateLimited extends applyErrorMatchers(
  Schema.TaggedError<RateLimited>()("RateLimited", retryableFields).pipe(
    Category.withThrottlingError,
    Category.withRetryable({ throttling: true }),
  ),
  matches("rate_limit_error"),
) {}

/** `api_error` (500) — an unexpected error inside Anthropic's systems. */
export class ApiServerError extends applyErrorMatchers(
  Schema.TaggedError<ApiServerError>()("ApiServerError", retryableFields).pipe(
    Category.withServerError,
    Category.withRetryable(),
  ),
  matches("api_error"),
) {}

/** `timeout_error` (504) — the request timed out while processing. */
export class RequestTimeout extends applyErrorMatchers(
  Schema.TaggedError<RequestTimeout>()("RequestTimeout", retryableFields).pipe(
    Category.withTimeoutError,
    Category.withRetryable(),
  ),
  matches("timeout_error"),
) {}

/** `overloaded_error` (529) — the API is temporarily overloaded. */
export class Overloaded extends applyErrorMatchers(
  Schema.TaggedError<Overloaded>()("Overloaded", retryableFields).pipe(
    Category.withServerError,
    Category.withRetryable({ throttling: true }),
  ),
  matches("overloaded_error"),
) {}

/**
 * The operation needs a credential the `Credentials` layer does not hold —
 * an Admin API route (`/v1/organizations/*`) without `ANTHROPIC_ADMIN_KEY` /
 * `ANTHROPIC_AUTH_TOKEN`, or any other route without `ANTHROPIC_API_KEY` /
 * `ANTHROPIC_AUTH_TOKEN`. Raised before the request is sent.
 */
export class MissingAnthropicCredentials extends Schema.TaggedError<MissingAnthropicCredentials>()(
  "MissingAnthropicCredentials",
  {
    message: Schema.String,
    /** Which credential the route needs: `"admin"` or `"api"`. */
    required: Schema.Literals(["admin", "api"]),
  },
).pipe(Category.withConfigurationError) {}

/** Unknown Anthropic error — returned when nothing else matches the failure. */
export class UnknownAnthropicError extends Schema.TaggedError<UnknownAnthropicError>()(
  "UnknownAnthropicError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper (strict response validation). */
export class AnthropicParseError extends Schema.TaggedError<AnthropicParseError>()(
  "AnthropicParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/** The `error.type` classes, in the order the protocol matches them. */
export const ENVELOPE_ERRORS = [
  InvalidRequest,
  AuthenticationFailed,
  PaymentRequired,
  PermissionDenied,
  ResourceNotFound,
  RequestTooLarge,
  RateLimited,
  ApiServerError,
  RequestTimeout,
  Overloaded,
] as const;

/** Errors any Anthropic operation may surface beyond the shared HTTP classes. */
export type AnthropicErrors =
  | InstanceType<(typeof ENVELOPE_ERRORS)[number]>
  | MissingAnthropicCredentials
  | UnknownAnthropicError
  | AnthropicParseError;
