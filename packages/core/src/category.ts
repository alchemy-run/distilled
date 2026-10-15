/**
 * Error Category System
 *
 * Provides a unified error classification system across all SDKs.
 * Error classes are decorated with categories using `.pipe()` on Schema.TaggedError classes,
 * enabling semantic error handling (e.g., catch all auth errors regardless of provider).
 *
 * @example
 * ```ts
 * import * as Category from "@distilled.cloud/core/category";
 *
 * export class Unauthorized extends Schema.TaggedError<Unauthorized>()(
 *   "Unauthorized",
 *   { message: Schema.String },
 * ).pipe(Category.withAuthError) {}
 *
 * // Catch by category
 * effect.pipe(Category.catchAuthError((err) => Effect.succeed("handled")))
 * ```
 */
import * as Effect from "effect/Effect";
import * as HttpClientError from "effect/http/HttpClientError";
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

export type Category =
  | typeof AuthError
  | typeof BadRequestError
  | typeof ConflictError
  | typeof NotFoundError
  | typeof QuotaError
  | typeof ServerError
  | typeof ThrottlingError
  | typeof NetworkError
  | typeof ParseError
  | typeof ConfigurationError
  | typeof TimeoutError
  | typeof RetryableError
  | typeof LockedError
  | typeof AbortedError
  | typeof AlreadyExistsError
  | typeof DependencyViolationError;

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

export interface RetryableInfo {
  /** If true, this is a throttling error (use longer backoff) */
  throttling?: boolean;
}

// ============================================================================
// Category Decorator
// ============================================================================

/**
 * Add one or more categories to an error class.
 * Use with .pipe() on Schema.TaggedError classes.
 *
 * @example
 * ```ts
 * export class MyError extends Schema.TaggedError<MyError>()(
 *   "MyError",
 *   { message: Schema.String },
 * ).pipe(Category.withCategory(Category.AuthError)) {}
 * ```
 */
export const withCategory =
  <Categories extends Array<Category>>(...categories: Categories) =>
  <Args extends Array<any>, Ret, C extends { new (...args: Args): Ret }>(
    C: C,
  ): C & {
    new (...args: Args): Ret & { [categoriesKey]: { [Cat in Categories[number]]: true } };
  } => {
    for (const category of categories) {
      if (!(categoriesKey in C.prototype)) {
        C.prototype[categoriesKey] = {};
      }
      C.prototype[categoriesKey][category] = true;
    }
    return C as any;
  };

/**
 * Mark an error class as retryable.
 * Use with .pipe() on Schema.TaggedError classes.
 *
 * @example
 * ```ts
 * // Standard retryable error
 * export class TransientError extends Schema.TaggedError<TransientError>()(
 *   "TransientError",
 *   { message: Schema.String },
 * ).pipe(Category.withRetryable()) {}
 *
 * // Throttling error (uses longer backoff)
 * export class RateLimitError extends Schema.TaggedError<RateLimitError>()(
 *   "RateLimitError",
 *   { message: Schema.String },
 * ).pipe(Category.withRetryable({ throttling: true })) {}
 * ```
 */
export const withRetryable =
  (info: RetryableInfo = {}) =>
  <Args extends Array<any>, Ret, C extends { new (...args: Args): Ret }>(
    C: C,
  ): C & {
    new (...args: Args): Ret & { [retryableKey]: RetryableInfo };
  } => {
    C.prototype[retryableKey] = info;
    return C as any;
  };

// ============================================================================
// Category Decorators (convenience functions for common categories)
// ============================================================================

export const withAuthError = /*@__PURE__*/ withCategory(AuthError);
export const withBadRequestError = /*@__PURE__*/ withCategory(BadRequestError);
export const withConflictError = /*@__PURE__*/ withCategory(ConflictError);
export const withNotFoundError = /*@__PURE__*/ withCategory(NotFoundError);
export const withQuotaError = /*@__PURE__*/ withCategory(QuotaError);
export const withServerError = /*@__PURE__*/ withCategory(ServerError);
export const withThrottlingError = /*@__PURE__*/ withCategory(ThrottlingError);
export const withNetworkError = /*@__PURE__*/ withCategory(NetworkError);
export const withParseError = /*@__PURE__*/ withCategory(ParseError);
export const withConfigurationError = /*@__PURE__*/ withCategory(ConfigurationError);
export const withTimeoutError = /*@__PURE__*/ withCategory(TimeoutError);
export const withRetryableError = /*@__PURE__*/ withCategory(RetryableError);
export const withLockedError = /*@__PURE__*/ withCategory(LockedError);
export const withAbortedError = /*@__PURE__*/ withCategory(AbortedError);
export const withAlreadyExistsError = /*@__PURE__*/ withCategory(AlreadyExistsError);
export const withDependencyViolationError = /*@__PURE__*/ withCategory(DependencyViolationError);

// ============================================================================
// Category Predicates
// ============================================================================

/**
 * Check if an error has a specific category.
 */
export const hasCategory = (error: unknown, category: Category): boolean => {
  if (Predicate.isObject(error) && Predicate.hasProperty(categoriesKey)(error)) {
    // @ts-expect-error - dynamic property access
    return category in error[categoriesKey];
  }
  return false;
};

export const isAuthError = (error: unknown): boolean => hasCategory(error, AuthError);

export const isBadRequestError = (error: unknown): boolean => hasCategory(error, BadRequestError);

export const isConflictError = (error: unknown): boolean => hasCategory(error, ConflictError);

export const isNotFoundError = (error: unknown): boolean => hasCategory(error, NotFoundError);

export const isQuotaError = (error: unknown): boolean => hasCategory(error, QuotaError);

export const isServerError = (error: unknown): boolean => hasCategory(error, ServerError);

export const isThrottlingError = (error: unknown): boolean => hasCategory(error, ThrottlingError);

export const isNetworkError = (error: unknown): boolean => hasCategory(error, NetworkError);

export const isParseError = (error: unknown): boolean => hasCategory(error, ParseError);

export const isConfigurationError = (error: unknown): boolean =>
  hasCategory(error, ConfigurationError);

export const isTimeoutError = (error: unknown): boolean => hasCategory(error, TimeoutError);

export const isRetryableError = (error: unknown): boolean => hasCategory(error, RetryableError);

export const isLockedError = (error: unknown): boolean => hasCategory(error, LockedError);

export const isAbortedError = (error: unknown): boolean => hasCategory(error, AbortedError);

export const isAlreadyExistsError = (error: unknown): boolean =>
  hasCategory(error, AlreadyExistsError);

export const isDependencyViolationError = (error: unknown): boolean =>
  hasCategory(error, DependencyViolationError);

// ============================================================================
// Transient Error Detection (for retry logic)
// ============================================================================

/**
 * Check if an error has the retryable trait (set via withRetryable).
 */
export const isRetryable = (error: unknown): boolean => {
  if (Predicate.isObject(error) && Predicate.hasProperty(retryableKey)(error)) {
    return true;
  }
  return false;
};

/**
 * Check if an error is a throttling error.
 * Either has ThrottlingError category or retryable trait with throttling: true.
 */
export const isThrottling = (error: unknown): boolean => {
  if (Predicate.isObject(error) && Predicate.hasProperty(retryableKey)(error)) {
    // @ts-expect-error - dynamic property access
    return error[retryableKey]?.throttling === true;
  }
  return hasCategory(error, ThrottlingError);
};

/**
 * Check if an error is an Effect `HttpClientError` caused by a wire-level
 * transport failure (undici `ConnectTimeoutError`, socket reset, DNS
 * failure, premature stream close, ...). The request never reached the
 * server (or the response never finished) so retrying is safe.
 *
 * Status-code retries are intentionally left to the per-SDK API client,
 * which knows whether a given response is genuinely retryable.
 */
const isHttpTransportError = (error: unknown): boolean =>
  HttpClientError.isHttpClientError(error) && error.reason._tag === "TransportError";

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
 * - Effect `HttpClientError` with `reason._tag === "TransportError"`
 *   (undici connect/read timeout, socket reset, DNS failure, premature
 *   stream close)
 */
export const isTransientError = (error: unknown): boolean => {
  // Check for retryable trait first
  if (isRetryable(error)) {
    return true;
  }
  // Fall back to category-based checking
  return (
    hasCategory(error, RetryableError) ||
    hasCategory(error, ThrottlingError) ||
    hasCategory(error, ServerError) ||
    hasCategory(error, NetworkError) ||
    hasCategory(error, TimeoutError) ||
    hasCategory(error, LockedError) ||
    isHttpTransportError(error)
  );
};

// ============================================================================
// Category Type Utilities
// ============================================================================

export type AllKeys<E> = E extends { [categoriesKey]: infer Q } ? keyof Q : never;

export type ExtractAll<E, Cats extends PropertyKey> = Cats extends any
  ? Extract<E, { [categoriesKey]: { [K in Cats]: any } }>
  : never;

// ============================================================================
// Category Catchers
// ============================================================================

const makeCatcher =
  (category: Category) =>
  <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>) =>
    Effect.catchIf(effect, (e) => hasCategory(e, category), f) as Effect.Effect<
      A | A2,
      E | E2,
      R | R2
    >;

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
export const catchErrors =
  <Categories extends Category[], A2, E2, R2>(
    ...args: [...Categories, (err: any) => Effect.Effect<A2, E2, R2>]
  ) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>) => {
    const handler = args.pop() as (err: any) => Effect.Effect<A2, E2, R2>;
    const categories = args as unknown as Categories;
    return Effect.catchIf(
      effect,
      (e) => categories.some((cat) => hasCategory(e, cat)),
      handler,
    ) as Effect.Effect<A | A2, E | E2, R | R2>;
  };

// Alias for convenience
export { catchErrors as catch };

export const catchAuthError = /*@__PURE__*/ makeCatcher(AuthError);
export const catchBadRequestError = /*@__PURE__*/ makeCatcher(BadRequestError);
export const catchConflictError = /*@__PURE__*/ makeCatcher(ConflictError);
export const catchNotFoundError = /*@__PURE__*/ makeCatcher(NotFoundError);
export const catchQuotaError = /*@__PURE__*/ makeCatcher(QuotaError);
export const catchServerError = /*@__PURE__*/ makeCatcher(ServerError);
export const catchThrottlingError = /*@__PURE__*/ makeCatcher(ThrottlingError);
export const catchNetworkError = /*@__PURE__*/ makeCatcher(NetworkError);
export const catchParseError = /*@__PURE__*/ makeCatcher(ParseError);
export const catchConfigurationError = /*@__PURE__*/ makeCatcher(ConfigurationError);
export const catchTimeoutError = /*@__PURE__*/ makeCatcher(TimeoutError);
export const catchRetryableError = /*@__PURE__*/ makeCatcher(RetryableError);
export const catchLockedError = /*@__PURE__*/ makeCatcher(LockedError);
export const catchAbortedError = /*@__PURE__*/ makeCatcher(AbortedError);
export const catchAlreadyExistsError = /*@__PURE__*/ makeCatcher(AlreadyExistsError);
export const catchDependencyViolationError = /*@__PURE__*/ makeCatcher(DependencyViolationError);

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
export const catchCategory =
  <E, const Categories extends Array<AllKeys<E>>, A2, E2, R2>(
    ...args: [
      ...Categories,
      f: (err: ExtractAll<E, Categories[number]>) => Effect.Effect<A2, E2, R2>,
    ]
  ) =>
  <A, R>(
    effect: Effect.Effect<A, E, R>,
  ): Effect.Effect<A | A2, E2 | Exclude<E, ExtractAll<E, Categories[number]>>, R | R2> => {
    const f = args.pop()!;
    const categories = args;
    return Effect.catchIf(
      effect,
      (e) => {
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
      (e) => f(e),
    ) as any;
  };
