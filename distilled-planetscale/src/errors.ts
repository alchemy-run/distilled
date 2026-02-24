/**
 * Global error types for PlanetScale API operations.
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
 * Base error for general PlanetScale errors.
 */
export class PlanetScaleError extends Schema.TaggedErrorClass<PlanetScaleError>()(
  "PlanetScaleError",
  {
    message: Schema.String,
    status: Schema.optional(Schema.Number),
  },
).pipe(Category.withServerError) {}

/**
 * Configuration error - missing or invalid configuration.
 */
export class ConfigError extends Schema.TaggedErrorClass<ConfigError>()(
  "ConfigError",
  {
    message: Schema.String,
  },
).pipe(Category.withConfigurationError) {}

// ============================================================================
// API Errors - mapped from PlanetScale API error codes
// ============================================================================

/**
 * Unauthorized - Authentication failure (401).
 * The API token is missing, invalid, or expired.
 */
export class Unauthorized extends Schema.TaggedErrorClass<Unauthorized>()(
  "Unauthorized",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * Forbidden - Access denied (403).
 * The authenticated user doesn't have permission for this operation.
 */
export class Forbidden extends Schema.TaggedErrorClass<Forbidden>()(
  "Forbidden",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * NotFound - Resource not found (404).
 * The requested resource (organization, database, branch, etc.) doesn't exist.
 */
export class NotFound extends Schema.TaggedErrorClass<NotFound>()("NotFound", {
  message: Schema.String,
}).pipe(Category.withNotFoundError) {}

/**
 * Conflict - Resource conflict (409).
 * The operation conflicts with the current state of the resource.
 */
export class Conflict extends Schema.TaggedErrorClass<Conflict>()("Conflict", {
  message: Schema.String,
}).pipe(Category.withConflictError) {}

/**
 * UnprocessableEntity - Validation error (422).
 * The request was well-formed but contains semantic errors.
 */
export class UnprocessableEntity extends Schema.TaggedErrorClass<UnprocessableEntity>()(
  "UnprocessableEntity",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * BadRequest - Invalid request (400).
 * The request was malformed or contains invalid parameters.
 */
export class BadRequest extends Schema.TaggedErrorClass<BadRequest>()(
  "BadRequest",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * TooManyRequests - Rate limited (429).
 * Too many requests have been made in a given time period.
 * Marked as retryable with throttling backoff.
 */
export class TooManyRequests extends Schema.TaggedErrorClass<TooManyRequests>()(
  "TooManyRequests",
  {
    message: Schema.String,
  },
).pipe(
  Category.withThrottlingError,
  Category.withRetryable({ throttling: true }),
) {}

/**
 * InternalServerError - Server error (500).
 * An unexpected error occurred on the PlanetScale server.
 * Marked as retryable.
 */
export class InternalServerError extends Schema.TaggedErrorClass<InternalServerError>()(
  "InternalServerError",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/**
 * ServiceUnavailable - Service unavailable (503).
 * The PlanetScale service is temporarily unavailable.
 * Marked as retryable.
 */
export class ServiceUnavailable extends Schema.TaggedErrorClass<ServiceUnavailable>()(
  "ServiceUnavailable",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

// ============================================================================
// Error Code Mapping
// ============================================================================

/**
 * Mapping from PlanetScale API error codes to error classes.
 */
export const ERROR_CODE_MAP = {
  unauthorized: Unauthorized,
  forbidden: Forbidden,
  not_found: NotFound,
  conflict: Conflict,
  unprocessable_entity: UnprocessableEntity,
  bad_request: BadRequest,
  too_many_requests: TooManyRequests,
  internal_server_error: InternalServerError,
  service_unavailable: ServiceUnavailable,
} as const;

/**
 * All known PlanetScale API error classes.
 */
export const API_ERRORS = [
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  UnprocessableEntity,
  BadRequest,
  TooManyRequests,
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
  | InternalServerError
  | ServiceUnavailable;
