/**
 * OpenAI-specific error types — hand-written.
 *
 * Re-exports the common HTTP errors from core and adds:
 *
 * - the OpenAI fallback/parse errors ({@link UnknownOpenAIError},
 *   {@link OpenAIParseError});
 * - {@link MissingCredentials}, raised before any request is sent when the
 *   key an operation needs (API vs Admin) is not configured;
 * - account-wide failures every operation can hit, matched on OpenAI's error
 *   body (`{ "error": { "message", "type", "param", "code" } }`) and raised
 *   by the protocol for every operation ({@link COMMON_ERRORS}). A body
 *   matcher outranks the status-only classes, so these win over
 *   `Unauthorized` / `TooManyRequests` / `NotFound`.
 *
 * Operation-specific typed errors (e.g. `ContextLengthExceeded` on the
 * inference operations) are patched into the spec and generated into the
 * service modules — see `patches/`.
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
import { applyErrorMatchers } from "@distilled.cloud/core/trait";
import * as Schema from "effect/Schema";

/** Unknown OpenAI error — returned when nothing else matches the failure. */
export class UnknownOpenAIError extends Schema.TaggedError<UnknownOpenAIError>()(
  "UnknownOpenAIError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper (strict response validation). */
export class OpenAIParseError extends Schema.TaggedError<OpenAIParseError>()("OpenAIParseError", {
  body: Schema.Unknown,
  cause: Schema.Unknown,
}).pipe(Category.withParseError) {}

/**
 * The key an operation authenticates with is not configured: Admin-API
 * operations need `OPENAI_ADMIN_KEY` (an `sk-admin-…` key), everything else
 * needs `OPENAI_API_KEY`. Raised before the request is sent.
 */
export class MissingCredentials extends Schema.TaggedError<MissingCredentials>()(
  "MissingCredentials",
  {
    credential: Schema.Literals(["OPENAI_API_KEY", "OPENAI_ADMIN_KEY"]),
    message: Schema.String,
  },
).pipe(Category.withConfigurationError) {}

/**
 * 401 `invalid_api_key` — the key is malformed, revoked, or belongs to
 * another environment. Observed: `{"error":{"type":"invalid_request_error",
 * "code":"invalid_api_key","message":"Incorrect API key provided: …"}}`.
 */
export class InvalidApiKey extends applyErrorMatchers(
  Schema.TaggedError<InvalidApiKey>()("InvalidApiKey", {
    message: Schema.String,
  }).pipe(Category.withAuthError),
  [{ status: 401, body: { "/error/code": "invalid_api_key" } }],
) {}

/**
 * 429 with `type: "insufficient_quota"` — the organization is out of credits
 * or over its billing limit (codes `insufficient_quota`,
 * `credit_balance_exhausted`). NOT retryable, unlike a rate limit: waiting
 * does not help until billing changes.
 */
export class InsufficientQuota extends applyErrorMatchers(
  Schema.TaggedError<InsufficientQuota>()("InsufficientQuota", {
    message: Schema.String,
  }).pipe(Category.withQuotaError),
  [{ status: 429, body: { "/error/type": "insufficient_quota" } }],
) {}

/**
 * 429 `rate_limit_exceeded` — a requests- or tokens-per-minute limit was
 * hit. Retryable as throttling.
 */
export class RateLimitExceeded extends applyErrorMatchers(
  Schema.TaggedError<RateLimitExceeded>()("RateLimitExceeded", {
    message: Schema.String,
  }).pipe(Category.withThrottlingError, Category.withRetryable({ throttling: true })),
  [{ status: 429, body: { "/error/code": "rate_limit_exceeded" } }],
) {}

/**
 * 404 `model_not_found` — the model does not exist or the key has no access
 * to it. Returned by every operation that takes a `model` (observed on
 * responses, chat completions and getModel).
 */
export class ModelNotFound extends applyErrorMatchers(
  Schema.TaggedError<ModelNotFound>()("ModelNotFound", {
    message: Schema.String,
  }).pipe(Category.withNotFoundError),
  [{ status: 404, body: { "/error/code": "model_not_found" } }],
) {}

/** Body-matched errors the protocol adds to every operation's error list. */
export const COMMON_ERRORS = [
  InvalidApiKey,
  InsufficientQuota,
  RateLimitExceeded,
  ModelNotFound,
] as const;

/** Errors every OpenAI operation can raise beyond its own typed errors. */
export type CommonErrors =
  | MissingCredentials
  | InvalidApiKey
  | InsufficientQuota
  | RateLimitExceeded
  | ModelNotFound;
