/**
 * Error Category System
 *
 * Provides a unified error classification system across all SDKs.
 * Error classes are decorated with categories using `.pipe()` on Schema.TaggedError classes,
 * enabling semantic error handling (e.g., catch all auth errors regardless of provider).
 *
 * @example
 * ```ts
 * import * as Category from "@distilled.cloud/sdk-core/category";
 *
 * export class Unauthorized extends Schema.TaggedErrorClass<Unauthorized>()(
 *   "Unauthorized",
 *   { message: Schema.String },
 * ).pipe(Category.withAuthError) {}
 *
 * // Catch by category
 * effect.pipe(Category.catchAuthError((err) => Effect.succeed("handled")))
 * ```
 */
import * as Effect from "effect/Effect";
import * as Predicate from "effect/Predicate";
// ============================================================================
// Error Category Constants
// ============================================================================
export const AuthError = "AuthError";
export const BadRequestError = "BadRequestError";
export const ConflictError = "ConflictError";
export const NotFoundError = "NotFoundError";
export const QuotaError = "QuotaError";
export const ServerError = "ServerError";
export const ThrottlingError = "ThrottlingError";
export const NetworkError = "NetworkError";
export const ParseError = "ParseError";
export const ConfigurationError = "ConfigurationError";
export const TimeoutError = "TimeoutError";
export const RetryableError = "RetryableError";
export const LockedError = "LockedError";
export const AbortedError = "AbortedError";
export const AlreadyExistsError = "AlreadyExistsError";
export const DependencyViolationError = "DependencyViolationError";
// ============================================================================
// Category Storage Key
// ============================================================================
/**
 * Key for storing categories on error prototypes.
 * Shared across all SDKs so category checking works uniformly.
 */
export const categoriesKey = "@distilled.cloud/error/categories";
/**
 * Key for storing retryable trait on error prototypes.
 * Separate from categories - indicates this error should be retried.
 */
export const retryableKey = "@distilled.cloud/error/retryable";
// ============================================================================
// Category Decorator
// ============================================================================
/**
 * Add one or more categories to an error class.
 * Use with .pipe() on Schema.TaggedError classes.
 *
 * @example
 * ```ts
 * export class MyError extends Schema.TaggedErrorClass<MyError>()(
 *   "MyError",
 *   { message: Schema.String },
 * ).pipe(Category.withCategory(Category.AuthError)) {}
 * ```
 */
export const withCategory = (...categories) => (C) => {
    for (const category of categories) {
        if (!(categoriesKey in C.prototype)) {
            C.prototype[categoriesKey] = {};
        }
        C.prototype[categoriesKey][category] = true;
    }
    return C;
};
/**
 * Mark an error class as retryable.
 * Use with .pipe() on Schema.TaggedError classes.
 *
 * @example
 * ```ts
 * // Standard retryable error
 * export class TransientError extends Schema.TaggedErrorClass<TransientError>()(
 *   "TransientError",
 *   { message: Schema.String },
 * ).pipe(Category.withRetryable()) {}
 *
 * // Throttling error (uses longer backoff)
 * export class RateLimitError extends Schema.TaggedErrorClass<RateLimitError>()(
 *   "RateLimitError",
 *   { message: Schema.String },
 * ).pipe(Category.withRetryable({ throttling: true })) {}
 * ```
 */
export const withRetryable = (info = {}) => (C) => {
    C.prototype[retryableKey] = info;
    return C;
};
// ============================================================================
// Category Decorators (convenience functions for common categories)
// ============================================================================
export const withAuthError = withCategory(AuthError);
export const withBadRequestError = withCategory(BadRequestError);
export const withConflictError = withCategory(ConflictError);
export const withNotFoundError = withCategory(NotFoundError);
export const withQuotaError = withCategory(QuotaError);
export const withServerError = withCategory(ServerError);
export const withThrottlingError = withCategory(ThrottlingError);
export const withNetworkError = withCategory(NetworkError);
export const withParseError = withCategory(ParseError);
export const withConfigurationError = withCategory(ConfigurationError);
export const withTimeoutError = withCategory(TimeoutError);
export const withRetryableError = withCategory(RetryableError);
export const withLockedError = withCategory(LockedError);
export const withAbortedError = withCategory(AbortedError);
export const withAlreadyExistsError = withCategory(AlreadyExistsError);
export const withDependencyViolationError = withCategory(DependencyViolationError);
// ============================================================================
// Category Predicates
// ============================================================================
/**
 * Check if an error has a specific category.
 */
export const hasCategory = (error, category) => {
    if (Predicate.isObject(error) &&
        Predicate.hasProperty(categoriesKey)(error)) {
        // @ts-expect-error - dynamic property access
        return category in error[categoriesKey];
    }
    return false;
};
export const isAuthError = (error) => hasCategory(error, AuthError);
export const isBadRequestError = (error) => hasCategory(error, BadRequestError);
export const isConflictError = (error) => hasCategory(error, ConflictError);
export const isNotFoundError = (error) => hasCategory(error, NotFoundError);
export const isQuotaError = (error) => hasCategory(error, QuotaError);
export const isServerError = (error) => hasCategory(error, ServerError);
export const isThrottlingError = (error) => hasCategory(error, ThrottlingError);
export const isNetworkError = (error) => hasCategory(error, NetworkError);
export const isParseError = (error) => hasCategory(error, ParseError);
export const isConfigurationError = (error) => hasCategory(error, ConfigurationError);
export const isTimeoutError = (error) => hasCategory(error, TimeoutError);
export const isRetryableError = (error) => hasCategory(error, RetryableError);
export const isLockedError = (error) => hasCategory(error, LockedError);
export const isAbortedError = (error) => hasCategory(error, AbortedError);
export const isAlreadyExistsError = (error) => hasCategory(error, AlreadyExistsError);
export const isDependencyViolationError = (error) => hasCategory(error, DependencyViolationError);
// ============================================================================
// Transient Error Detection (for retry logic)
// ============================================================================
/**
 * Check if an error has the retryable trait (set via withRetryable).
 */
export const isRetryable = (error) => {
    if (Predicate.isObject(error) && Predicate.hasProperty(retryableKey)(error)) {
        return true;
    }
    return false;
};
/**
 * Check if an error is a throttling error.
 * Either has ThrottlingError category or retryable trait with throttling: true.
 */
export const isThrottling = (error) => {
    if (Predicate.isObject(error) && Predicate.hasProperty(retryableKey)(error)) {
        // @ts-expect-error - dynamic property access
        return error[retryableKey]?.throttling === true;
    }
    return hasCategory(error, ThrottlingError);
};
/**
 * Check if an error is a transient error that should be automatically retried.
 * Transient errors include:
 * - Errors marked with withRetryable()
 * - RetryableError category
 * - ThrottlingError (rate limiting)
 * - ServerError (5xx responses)
 * - NetworkError (connection issues)
 * - TimeoutError (request timed out)
 * - LockedError (423 - resource temporarily locked)
 */
export const isTransientError = (error) => {
    // Check for retryable trait first
    if (isRetryable(error)) {
        return true;
    }
    // Fall back to category-based checking
    return (hasCategory(error, RetryableError) ||
        hasCategory(error, ThrottlingError) ||
        hasCategory(error, ServerError) ||
        hasCategory(error, NetworkError) ||
        hasCategory(error, TimeoutError) ||
        hasCategory(error, LockedError));
};
// ============================================================================
// Category Catchers
// ============================================================================
const makeCatcher = (category) => (f) => (effect) => Effect.catchIf(effect, (e) => hasCategory(e, category), f);
/**
 * Catch errors matching any of the specified categories.
 *
 * @example
 * ```ts
 * effect.pipe(
 *   Category.catchErrors(Category.AuthError, Category.NotFoundError, (err) =>
 *     Effect.succeed("handled")
 *   )
 * )
 * ```
 */
export const catchErrors = (...args) => (effect) => {
    const handler = args.pop();
    const categories = args;
    return Effect.catchIf(effect, (e) => categories.some((cat) => hasCategory(e, cat)), handler);
};
// Alias for convenience
export { catchErrors as catch };
export const catchAuthError = makeCatcher(AuthError);
export const catchBadRequestError = makeCatcher(BadRequestError);
export const catchConflictError = makeCatcher(ConflictError);
export const catchNotFoundError = makeCatcher(NotFoundError);
export const catchQuotaError = makeCatcher(QuotaError);
export const catchServerError = makeCatcher(ServerError);
export const catchThrottlingError = makeCatcher(ThrottlingError);
export const catchNetworkError = makeCatcher(NetworkError);
export const catchParseError = makeCatcher(ParseError);
export const catchConfigurationError = makeCatcher(ConfigurationError);
export const catchTimeoutError = makeCatcher(TimeoutError);
export const catchRetryableError = makeCatcher(RetryableError);
export const catchLockedError = makeCatcher(LockedError);
export const catchAbortedError = makeCatcher(AbortedError);
export const catchAlreadyExistsError = makeCatcher(AlreadyExistsError);
export const catchDependencyViolationError = makeCatcher(DependencyViolationError);
/**
 * Catch errors with specified categories with full type narrowing.
 *
 * @example
 * ```ts
 * effect.pipe(
 *   Category.catchCategory(Category.AuthError, (err) => Effect.succeed("handled"))
 * )
 * ```
 */
export const catchCategory = (...args) => (effect) => {
    const f = args.pop();
    const categories = args;
    return Effect.catchIf(effect, (e) => {
        if (Predicate.isObject(e) && Predicate.hasProperty(categoriesKey)(e)) {
            for (const cat of categories) {
                // @ts-expect-error - dynamic property access
                if (cat in e[categoriesKey]) {
                    return true;
                }
            }
        }
        return false;
    }, 
    // @ts-expect-error - type narrowing limitation
    (e) => f(e));
};
//# sourceMappingURL=category.js.map