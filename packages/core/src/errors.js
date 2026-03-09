/**
 * Common error types shared across SDKs.
 *
 * Each SDK defines its own provider-specific errors (e.g., Unauthorized, NotFound)
 * using the category system. This module provides base error types and utilities
 * that are used across all SDKs.
 */
import * as Schema from "effect/Schema";
import * as Category from "./category.js";
// ============================================================================
// Common HTTP Status Error Classes
// ============================================================================
/**
 * Unauthorized - Authentication failure (401).
 */
export class Unauthorized extends Schema.TaggedErrorClass()("Unauthorized", { message: Schema.String }).pipe(Category.withAuthError) {
}
/**
 * Forbidden - Access denied (403).
 */
export class Forbidden extends Schema.TaggedErrorClass()("Forbidden", { message: Schema.String }).pipe(Category.withAuthError) {
}
/**
 * NotFound - Resource not found (404).
 */
export class NotFound extends Schema.TaggedErrorClass()("NotFound", {
    message: Schema.String,
}).pipe(Category.withNotFoundError) {
}
/**
 * BadRequest - Invalid request (400).
 */
export class BadRequest extends Schema.TaggedErrorClass()("BadRequest", { message: Schema.String }).pipe(Category.withBadRequestError) {
}
/**
 * Conflict - Resource conflict (409).
 */
export class Conflict extends Schema.TaggedErrorClass()("Conflict", {
    message: Schema.String,
}).pipe(Category.withConflictError) {
}
/**
 * UnprocessableEntity - Validation error (422).
 */
export class UnprocessableEntity extends Schema.TaggedErrorClass()("UnprocessableEntity", { message: Schema.String }).pipe(Category.withBadRequestError) {
}
/**
 * TooManyRequests - Rate limited (429).
 */
export class TooManyRequests extends Schema.TaggedErrorClass()("TooManyRequests", { message: Schema.String }).pipe(Category.withThrottlingError, Category.withRetryable({ throttling: true })) {
}
/**
 * Locked - Resource locked (423).
 */
export class Locked extends Schema.TaggedErrorClass()("Locked", {
    message: Schema.String,
}).pipe(Category.withLockedError, Category.withRetryable()) {
}
/**
 * InternalServerError - Server error (500).
 */
export class InternalServerError extends Schema.TaggedErrorClass()("InternalServerError", { message: Schema.String }).pipe(Category.withServerError, Category.withRetryable()) {
}
/**
 * ServiceUnavailable - Service unavailable (503).
 */
export class ServiceUnavailable extends Schema.TaggedErrorClass()("ServiceUnavailable", { message: Schema.String }).pipe(Category.withServerError, Category.withRetryable()) {
}
/**
 * Configuration error - missing or invalid configuration.
 */
export class ConfigError extends Schema.TaggedErrorClass()("ConfigError", { message: Schema.String }).pipe(Category.withConfigurationError) {
}
// ============================================================================
// Error Maps
// ============================================================================
/**
 * Mapping from HTTP status codes to common error classes.
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
};
/**
 * HTTP status codes that are considered "default" errors (always present).
 * These are excluded from per-operation error types since they're handled globally.
 */
export const DEFAULT_ERROR_STATUSES = new Set([401, 429, 500, 503]);
/**
 * All common API error classes.
 */
export const API_ERRORS = [
    Unauthorized,
    Forbidden,
    NotFound,
    BadRequest,
    Conflict,
    UnprocessableEntity,
    TooManyRequests,
    Locked,
    InternalServerError,
    ServiceUnavailable,
];
/**
 * Default errors that apply to ALL operations.
 * These are infrastructure-level errors that can occur regardless of the operation.
 */
export const DEFAULT_ERRORS = [
    Unauthorized,
    TooManyRequests,
    InternalServerError,
    ServiceUnavailable,
];
//# sourceMappingURL=errors.js.map