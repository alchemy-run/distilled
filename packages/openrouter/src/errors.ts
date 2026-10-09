/**
 * OpenRouter-specific error types — hand-written.
 *
 * OpenRouter reports every failure as `{ "error": { "code": <status>,
 * "message": "...", "metadata"?: {...} } }`. Operations surface the statuses
 * their spec declares as per-operation classes generated in
 * `services/openrouter.ts`; the protocol's {@link STATUS_MAP} raises the
 * same tags (the classes below) for a status an operation did not declare,
 * so `Effect.catchTag("InsufficientCredits", …)` works on every call.
 */
export {
  BadRequest,
  Conflict,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  NotFound,
  UnprocessableEntity,
} from "@distilled.cloud/core/errors";

import * as Category from "@distilled.cloud/core/category";
import {
  BadRequest,
  Conflict,
  DurationSchema,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  NotFound,
  UnprocessableEntity,
} from "@distilled.cloud/core/errors";
import * as Schema from "effect/Schema";

/** 401 — the API/management key is missing, invalid, disabled or expired. */
export class InvalidApiKey extends Schema.TaggedError<InvalidApiKey>()("InvalidApiKey", {
  message: Schema.String,
}).pipe(Category.withAuthError) {}

/** 402 — the account or key has insufficient credits for the request. */
export class InsufficientCredits extends Schema.TaggedError<InsufficientCredits>()(
  "InsufficientCredits",
  { message: Schema.String },
).pipe(Category.withQuotaError) {}

/** 408 — the request exceeded OpenRouter's time limit. */
export class RequestTimeout extends Schema.TaggedError<RequestTimeout>()("RequestTimeout", {
  message: Schema.String,
  retryAfter: Schema.optional(DurationSchema),
}).pipe(Category.withTimeoutError, Category.withRetryable()) {}

/** 429 — rate limited (per key, per model, or upstream provider). */
export class RateLimited extends Schema.TaggedError<RateLimited>()("RateLimited", {
  message: Schema.String,
  retryAfter: Schema.optional(DurationSchema),
}).pipe(Category.withThrottlingError, Category.withRetryable({ throttling: true })) {}

/** 502 — the upstream model provider returned an error or an invalid response. */
export class ProviderError extends Schema.TaggedError<ProviderError>()("ProviderError", {
  message: Schema.String,
  retryAfter: Schema.optional(DurationSchema),
}).pipe(Category.withServerError, Category.withRetryable()) {}

/** 503 — no available model provider meets the request's routing requirements. */
export class NoAvailableProvider extends Schema.TaggedError<NoAvailableProvider>()(
  "NoAvailableProvider",
  {
    message: Schema.String,
    retryAfter: Schema.optional(DurationSchema),
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/** 524 — the upstream provider timed out at the edge network. */
export class ProviderTimeout extends Schema.TaggedError<ProviderTimeout>()("ProviderTimeout", {
  message: Schema.String,
  retryAfter: Schema.optional(DurationSchema),
}).pipe(Category.withServerError, Category.withRetryable()) {}

/** 529 — the upstream provider is temporarily overloaded. */
export class ProviderOverloaded extends Schema.TaggedError<ProviderOverloaded>()(
  "ProviderOverloaded",
  {
    message: Schema.String,
    retryAfter: Schema.optional(DurationSchema),
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/** Unknown OpenRouter error — returned when nothing else matches the failure. */
export class UnknownOpenRouterError extends Schema.TaggedError<UnknownOpenRouterError>()(
  "UnknownOpenRouterError",
  {
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** A 2xx body that failed strict response validation. */
export class OpenRouterParseError extends Schema.TaggedError<OpenRouterParseError>()(
  "OpenRouterParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * HTTP status → error class the protocol raises when no per-operation class
 * matched. Unmapped 5xx become `InternalServerError`; anything else
 * {@link UnknownOpenRouterError}.
 */
export const STATUS_MAP = {
  400: BadRequest,
  401: InvalidApiKey,
  402: InsufficientCredits,
  403: Forbidden,
  404: NotFound,
  408: RequestTimeout,
  409: Conflict,
  422: UnprocessableEntity,
  429: RateLimited,
  500: InternalServerError,
  502: ProviderError,
  503: NoAvailableProvider,
  504: GatewayTimeout,
  524: ProviderTimeout,
  529: ProviderOverloaded,
} as const;

/** Every error {@link STATUS_MAP} can raise. */
export type StatusErrors = InstanceType<(typeof STATUS_MAP)[keyof typeof STATUS_MAP]>;
