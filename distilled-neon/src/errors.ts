/**
 * Global error types for Neon API operations.
 *
 * These errors are shared across all operations and categorized for
 * semantic error handling using the Category system.
 */
import * as Schema from "effect/Schema";
import * as Category from "./category";

// ============================================================================
// Base Errors
// ============================================================================

/**
 * Base error for general Neon errors.
 */
export class NeonError extends Schema.TaggedError<NeonError>()("NeonError", {
  message: Schema.String,
  status: Schema.optional(Schema.Number),
}).pipe(Category.withServerError) {}

/**
 * Configuration error - missing or invalid configuration.
 */
export class ConfigError extends Schema.TaggedError<ConfigError>()("ConfigError", {
  message: Schema.String,
}).pipe(Category.withConfigurationError) {}

// ============================================================================
// API Errors - mapped from Neon API error responses
// ============================================================================

/**
 * Unauthorized - Authentication failure (401).
 * The API key is missing, invalid, or expired.
 */
export class Unauthorized extends Schema.TaggedError<Unauthorized>()("Unauthorized", {
  message: Schema.String,
}).pipe(Category.withAuthError) {}

/**
 * Forbidden - Access denied (403).
 * The authenticated user doesn't have permission for this operation.
 */
export class Forbidden extends Schema.TaggedError<Forbidden>()("Forbidden", {
  message: Schema.String,
}).pipe(Category.withAuthError) {}

/**
 * NotFound - Resource not found (404).
 * The requested resource (project, branch, endpoint, etc.) doesn't exist.
 */
export class NotFound extends Schema.TaggedError<NotFound>()("NotFound", {
  message: Schema.String,
}).pipe(Category.withNotFoundError) {}

/**
 * Conflict - Resource conflict (409).
 * The operation conflicts with the current state of the resource.
 */
export class Conflict extends Schema.TaggedError<Conflict>()("Conflict", {
  message: Schema.String,
}).pipe(Category.withConflictError) {}

/**
 * UnprocessableEntity - Validation error (422).
 * The request was well-formed but contains semantic errors.
 */
export class UnprocessableEntity extends Schema.TaggedError<UnprocessableEntity>()(
  "UnprocessableEntity",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * BadRequest - Invalid request (400).
 * The request was malformed or contains invalid parameters.
 */
export class BadRequest extends Schema.TaggedError<BadRequest>()("BadRequest", {
  message: Schema.String,
}).pipe(Category.withBadRequestError) {}

/**
 * TooManyRequests - Rate limited (429).
 * Too many requests have been made in a given time period.
 * Marked as retryable with throttling backoff.
 */
export class TooManyRequests extends Schema.TaggedError<TooManyRequests>()("TooManyRequests", {
  message: Schema.String,
}).pipe(Category.withThrottlingError, Category.withRetryable({ throttling: true })) {}

/**
 * Locked - Resource locked (423).
 * The resource is temporarily locked (e.g., another operation in progress).
 * Marked as retryable.
 */
export class Locked extends Schema.TaggedError<Locked>()("Locked", {
  message: Schema.String,
}).pipe(Category.withLockedError, Category.withRetryable()) {}

/**
 * InternalServerError - Server error (500).
 * An unexpected error occurred on the Neon server.
 * Marked as retryable.
 */
export class InternalServerError extends Schema.TaggedError<InternalServerError>()(
  "InternalServerError",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/**
 * ServiceUnavailable - Service unavailable (503).
 * The Neon service is temporarily unavailable.
 * Marked as retryable.
 */
export class ServiceUnavailable extends Schema.TaggedError<ServiceUnavailable>()(
  "ServiceUnavailable",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

// ============================================================================
// HTTP Status to Error Mapping
// ============================================================================

/**
 * Mapping from HTTP status codes to error classes.
 */
export const HTTP_STATUS_MAP = {
  400: BadRequest,
  401: Unauthorized,
  403: Forbidden,
  404: NotFound,
  409: Conflict,
  422: UnprocessableEntity,
  423: Locked,
  429: TooManyRequests,
  500: InternalServerError,
  503: ServiceUnavailable,
} as const;

/**
 * All known Neon API error classes.
 */
export const API_ERRORS = [
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  UnprocessableEntity,
  BadRequest,
  TooManyRequests,
  Locked,
  InternalServerError,
  ServiceUnavailable,
] as const;

/**
 * Union type of all API errors.
 */
export type ApiError =
  | Unauthorized
  | Forbidden
  | NotFound
  | Conflict
  | UnprocessableEntity
  | BadRequest
  | TooManyRequests
  | Locked
  | InternalServerError
  | ServiceUnavailable;
