/**
 * Error categories for GCP API errors.
 *
 * Maps to gRPC status codes and common GCP error patterns.
 * Categories enable pattern-based error handling (e.g., retry all throttling errors).
 */

import * as Effect from "effect/Effect";
import * as Predicate from "effect/Predicate";

// =============================================================================
// Category Constants
// =============================================================================

/** Authentication/authorization failures (UNAUTHENTICATED / PERMISSION_DENIED) */
export const AuthError = "AuthError" as const;
export type AuthError = typeof AuthError;

/** Invalid request parameters (INVALID_ARGUMENT / OUT_OF_RANGE) */
export const BadRequestError = "BadRequestError" as const;
export type BadRequestError = typeof BadRequestError;

/** Resource state conflicts (ALREADY_EXISTS / ABORTED) */
export const ConflictError = "ConflictError" as const;
export type ConflictError = typeof ConflictError;

/** Resource not found (NOT_FOUND) */
export const NotFoundError = "NotFoundError" as const;
export type NotFoundError = typeof NotFoundError;

/** Quota/resource exhaustion (RESOURCE_EXHAUSTED) */
export const QuotaError = "QuotaError" as const;
export type QuotaError = typeof QuotaError;

/** Rate limiting (RESOURCE_EXHAUSTED with rate limit reason) */
export const ThrottlingError = "ThrottlingError" as const;
export type ThrottlingError = typeof ThrottlingError;

/** Request timeouts (DEADLINE_EXCEEDED) */
export const TimeoutError = "TimeoutError" as const;
export type TimeoutError = typeof TimeoutError;

/** Server errors (INTERNAL / DATA_LOSS / UNKNOWN) */
export const ServerError = "ServerError" as const;
export type ServerError = typeof ServerError;

/** Network/transport failures */
export const NetworkError = "NetworkError" as const;
export type NetworkError = typeof NetworkError;

/** General retryable error */
export const RetryableError = "RetryableError" as const;
export type RetryableError = typeof RetryableError;

/** Precondition failures (FAILED_PRECONDITION) */
export const PreconditionError = "PreconditionError" as const;
export type PreconditionError = typeof PreconditionError;

/** Service unavailable (UNAVAILABLE) */
export const UnavailableError = "UnavailableError" as const;
export type UnavailableError = typeof UnavailableError;

/** Unknown error type */
export const UnknownError = "UnknownError" as const;
export type UnknownError = typeof UnknownError;

export type Category =
  | AuthError
  | BadRequestError
  | ConflictError
  | NotFoundError
  | QuotaError
  | ThrottlingError
  | TimeoutError
  | ServerError
  | NetworkError
  | RetryableError
  | PreconditionError
  | UnavailableError
  | UnknownError;

// =============================================================================
// Category Infrastructure
// =============================================================================

export const categoriesKey = "@distilled/gcp/error/categories";
export const retryableKey = "@distilled/gcp/error/retryable";

export interface RetryableInfo {
  throttling?: boolean;
}

/**
 * Apply categories to an error class prototype.
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

// =============================================================================
// Category Decorators
// =============================================================================

export const withAuthError = withCategory(AuthError);
export const withBadRequestError = withCategory(BadRequestError);
export const withConflictError = withCategory(ConflictError);
export const withNotFoundError = withCategory(NotFoundError);
export const withQuotaError = withCategory(QuotaError);
export const withThrottlingError = withCategory(ThrottlingError);
export const withTimeoutError = withCategory(TimeoutError);
export const withServerError = withCategory(ServerError);
export const withNetworkError = withCategory(NetworkError);
export const withRetryableError = withCategory(RetryableError);
export const withPreconditionError = withCategory(PreconditionError);
export const withUnavailableError = withCategory(UnavailableError);

// =============================================================================
// Category Checking
// =============================================================================

export const hasCategory = (error: unknown, category: Category): boolean => {
  if (
    Predicate.isObject(error) &&
    Predicate.hasProperty(categoriesKey)(error)
  ) {
    // @ts-expect-error - accessing dynamic property
    return category in error[categoriesKey];
  }
  return false;
};

// =============================================================================
// Category Predicates
// =============================================================================

export const isThrottlingError = (error: unknown): boolean => {
  if (hasCategory(error, ThrottlingError)) return true;
  if (Predicate.isObject(error) && Predicate.hasProperty(retryableKey)(error)) {
    // @ts-expect-error - accessing dynamic property
    return error[retryableKey]?.throttling === true;
  }
  if (Predicate.isObject(error) && "_tag" in error) {
    const tag = (error as { _tag: string })._tag;
    return tag === "RateLimited" || tag.includes("RateLimit");
  }
  return false;
};

export const isAuthError = (error: unknown): boolean => {
  if (hasCategory(error, AuthError)) return true;
  if (Predicate.isObject(error) && "_tag" in error) {
    const tag = (error as { _tag: string })._tag;
    return (
      tag === "Unauthenticated" ||
      tag === "PermissionDenied" ||
      tag.includes("Auth")
    );
  }
  return false;
};

export const isNotFoundError = (error: unknown): boolean => {
  if (hasCategory(error, NotFoundError)) return true;
  if (Predicate.isObject(error) && "_tag" in error) {
    const tag = (error as { _tag: string })._tag;
    return tag.includes("NotFound") || tag.includes("NoSuch");
  }
  return false;
};

export const isServerError = (error: unknown): boolean => {
  if (hasCategory(error, ServerError)) return true;
  if (Predicate.isObject(error) && "_tag" in error) {
    const tag = (error as { _tag: string })._tag;
    return tag.includes("Internal") || tag.includes("Server");
  }
  return false;
};

export const isRetryable = <E>(error: E): error is E & RetryableInfo => {
  if (Predicate.isObject(error) && Predicate.hasProperty(retryableKey)(error)) {
    return true;
  }
  return false;
};

export const isHttpClientTransportError = (error: unknown): boolean => {
  if (
    Predicate.isObject(error) &&
    "_tag" in error &&
    error._tag === "RequestError" &&
    "reason" in error &&
    error.reason === "Transport"
  ) {
    return true;
  }
  return false;
};

export const isTransientError = (error: unknown): boolean => {
  if (isRetryable(error)) return true;
  if (isHttpClientTransportError(error)) return true;
  return (
    hasCategory(error, RetryableError) ||
    hasCategory(error, ThrottlingError) ||
    hasCategory(error, ServerError) ||
    hasCategory(error, NetworkError) ||
    hasCategory(error, UnavailableError)
  );
};

// =============================================================================
// Type Helpers for catchCategory
// =============================================================================

export type AllKeys<E> = E extends { [categoriesKey]: infer Q }
  ? keyof Q
  : never;

export type ExtractAll<E, Cats extends PropertyKey> = Cats extends any
  ? Extract<E, { [categoriesKey]: { [K in Cats]: any } }>
  : never;

export const catchCategory =
  <E, const Categories extends Array<AllKeys<E>>, A2, E2, R2>(
    ...args: [
      ...Categories,
      f: (err: ExtractAll<E, Categories[number]>) => Effect.Effect<A2, E2, R2>,
    ]
  ) =>
  <A, R>(
    effect: Effect.Effect<A, E, R>,
  ): Effect.Effect<
    A | A2,
    E2 | Exclude<E, ExtractAll<E, Categories[number]>>,
    R | R2
  > => {
    const f = args.pop()!;
    const categories = args;
    return Effect.catchIf(
      effect,
      (e) => {
        if (Predicate.isObject(e) && Predicate.hasProperty(categoriesKey)(e)) {
          for (const cat of categories) {
            // @ts-expect-error - accessing dynamic property
            if (cat in e[categoriesKey]) {
              return true;
            }
          }
        }
        return false;
      },
      // @ts-expect-error - type narrowing
      (e) => f(e),
    ) as any;
  };

// =============================================================================
// Category Catchers
// =============================================================================

const makeCatcher =
  (category: Category) =>
  <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>) =>
    Effect.catchIf(effect, (e) => hasCategory(e, category), f) as Effect.Effect<
      A | A2,
      E | E2,
      R | R2
    >;

export const catchAuthError = makeCatcher(AuthError);
export const catchBadRequestError = makeCatcher(BadRequestError);
export const catchConflictError = makeCatcher(ConflictError);
export const catchNotFoundError = makeCatcher(NotFoundError);
export const catchQuotaError = makeCatcher(QuotaError);
export const catchThrottlingError = makeCatcher(ThrottlingError);
export const catchTimeoutError = makeCatcher(TimeoutError);
export const catchServerError = makeCatcher(ServerError);
export const catchNetworkError = makeCatcher(NetworkError);
export const catchRetryableError = makeCatcher(RetryableError);

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

export { catchErrors as catch };
