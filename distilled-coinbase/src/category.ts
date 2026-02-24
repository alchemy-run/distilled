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
export const PaymentRequiredError = "PaymentRequiredError";
export const PolicyError = "PolicyError";
export const MfaError = "MfaError";

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
  | typeof PaymentRequiredError
  | typeof PolicyError
  | typeof MfaError;

// ============================================================================
// Category Storage Key
// ============================================================================

export const categoriesKey = "@distilled-coinbase/error/categories";

/**
 * Key for storing retryable trait on error prototypes.
 * Separate from categories - indicates this error should be retried.
 */
export const retryableKey = "@distilled-coinbase/error/retryable";

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
 */
export const withCategory =
  <Categories extends Array<Category>>(...categories: Categories) =>
  <Args extends Array<any>, Ret, C extends { new (...args: Args): Ret }>(
    C: C,
  ): C & {
    new (
      ...args: Args
    ): Ret & { [categoriesKey]: { [Cat in Categories[number]]: true } };
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
export const withPaymentRequiredError = withCategory(PaymentRequiredError);
export const withPolicyError = withCategory(PolicyError);
export const withMfaError = withCategory(MfaError);

// ============================================================================
// Category Predicates
// ============================================================================

/**
 * Check if an error has a specific category
 */
export const hasCategory = (error: unknown, category: Category): boolean => {
  if (
    Predicate.isObject(error) &&
    Predicate.hasProperty(categoriesKey)(error)
  ) {
    // @ts-expect-error - dynamic property access
    return category in error[categoriesKey];
  }
  return false;
};

export const isAuthError = (error: unknown): boolean =>
  hasCategory(error, AuthError);

export const isBadRequestError = (error: unknown): boolean =>
  hasCategory(error, BadRequestError);

export const isConflictError = (error: unknown): boolean =>
  hasCategory(error, ConflictError);

export const isNotFoundError = (error: unknown): boolean =>
  hasCategory(error, NotFoundError);

export const isQuotaError = (error: unknown): boolean =>
  hasCategory(error, QuotaError);

export const isServerError = (error: unknown): boolean =>
  hasCategory(error, ServerError);

export const isThrottlingError = (error: unknown): boolean =>
  hasCategory(error, ThrottlingError);

export const isNetworkError = (error: unknown): boolean =>
  hasCategory(error, NetworkError);

export const isParseError = (error: unknown): boolean =>
  hasCategory(error, ParseError);

export const isConfigurationError = (error: unknown): boolean =>
  hasCategory(error, ConfigurationError);

export const isTimeoutError = (error: unknown): boolean =>
  hasCategory(error, TimeoutError);

export const isRetryableError = (error: unknown): boolean =>
  hasCategory(error, RetryableError);

export const isPaymentRequiredError = (error: unknown): boolean =>
  hasCategory(error, PaymentRequiredError);

export const isPolicyError = (error: unknown): boolean =>
  hasCategory(error, PolicyError);

export const isMfaError = (error: unknown): boolean =>
  hasCategory(error, MfaError);

/**
 * Check if an error is transient (good for retry logic).
 * Includes: ThrottlingError | ServerError | NetworkError | TimeoutError
 */
export const isTransientError = (error: unknown): boolean =>
  isThrottlingError(error) ||
  isServerError(error) ||
  isNetworkError(error) ||
  isTimeoutError(error);

/**
 * Check if an error has the retryable trait.
 */
export const isRetryable = (error: unknown): boolean => {
  if (Predicate.isObject(error) && Predicate.hasProperty(retryableKey)(error)) {
    return true;
  }
  return false;
};

/**
 * Get retryable info from an error, if present.
 */
export const getRetryableInfo = (error: unknown): RetryableInfo | undefined => {
  if (Predicate.isObject(error) && Predicate.hasProperty(retryableKey)(error)) {
    return (error as any)[retryableKey] as RetryableInfo;
  }
  return undefined;
};

// ============================================================================
// Category-based Error Catching
// ============================================================================

/**
 * Catch errors matching a specific category.
 */
export const catchCategory =
  <E2, A2, R2>(
    category: Category,
    handler: (error: unknown) => Effect.Effect<A2, E2, R2>,
  ) =>
  <A, E, R>(
    effect: Effect.Effect<A, E, R>,
  ): Effect.Effect<A | A2, E | E2, R | R2> =>
    Effect.catchIf(
      effect,
      (e) => hasCategory(e, category),
      handler as (error: E) => Effect.Effect<A2, E2, R2>,
    );

export const catchAuthError = <E2, A2, R2>(
  handler: (error: unknown) => Effect.Effect<A2, E2, R2>,
) => catchCategory(AuthError, handler);

export const catchNotFoundError = <E2, A2, R2>(
  handler: (error: unknown) => Effect.Effect<A2, E2, R2>,
) => catchCategory(NotFoundError, handler);

export const catchBadRequestError = <E2, A2, R2>(
  handler: (error: unknown) => Effect.Effect<A2, E2, R2>,
) => catchCategory(BadRequestError, handler);

export const catchConflictError = <E2, A2, R2>(
  handler: (error: unknown) => Effect.Effect<A2, E2, R2>,
) => catchCategory(ConflictError, handler);

export const catchServerError = <E2, A2, R2>(
  handler: (error: unknown) => Effect.Effect<A2, E2, R2>,
) => catchCategory(ServerError, handler);

export const catchThrottlingError = <E2, A2, R2>(
  handler: (error: unknown) => Effect.Effect<A2, E2, R2>,
) => catchCategory(ThrottlingError, handler);

/**
 * Catch errors matching multiple categories.
 */
export const catchErrors = <E2, A2, R2>(
  ...args: [...Category[], (error: unknown) => Effect.Effect<A2, E2, R2>]
) => {
  const handler = args[args.length - 1] as (
    error: unknown,
  ) => Effect.Effect<A2, E2, R2>;
  const categories = args.slice(0, -1) as Category[];

  return <A, E, R>(
    effect: Effect.Effect<A, E, R>,
  ): Effect.Effect<A | A2, E | E2, R | R2> =>
    Effect.catchIf(
      effect,
      (e) => categories.some((cat) => hasCategory(e, cat)),
      handler as (error: E) => Effect.Effect<A2, E2, R2>,
    );
};
