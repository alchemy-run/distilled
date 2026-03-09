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
export declare const AuthError = "AuthError";
export declare const BadRequestError = "BadRequestError";
export declare const ConflictError = "ConflictError";
export declare const NotFoundError = "NotFoundError";
export declare const QuotaError = "QuotaError";
export declare const ServerError = "ServerError";
export declare const ThrottlingError = "ThrottlingError";
export declare const NetworkError = "NetworkError";
export declare const ParseError = "ParseError";
export declare const ConfigurationError = "ConfigurationError";
export declare const TimeoutError = "TimeoutError";
export declare const RetryableError = "RetryableError";
export declare const LockedError = "LockedError";
export declare const AbortedError = "AbortedError";
export declare const AlreadyExistsError = "AlreadyExistsError";
export declare const DependencyViolationError = "DependencyViolationError";
export type Category = typeof AuthError | typeof BadRequestError | typeof ConflictError | typeof NotFoundError | typeof QuotaError | typeof ServerError | typeof ThrottlingError | typeof NetworkError | typeof ParseError | typeof ConfigurationError | typeof TimeoutError | typeof RetryableError | typeof LockedError | typeof AbortedError | typeof AlreadyExistsError | typeof DependencyViolationError;
/**
 * Key for storing categories on error prototypes.
 * Shared across all SDKs so category checking works uniformly.
 */
export declare const categoriesKey = "@distilled.cloud/error/categories";
/**
 * Key for storing retryable trait on error prototypes.
 * Separate from categories - indicates this error should be retried.
 */
export declare const retryableKey = "@distilled.cloud/error/retryable";
export interface RetryableInfo {
    /** If true, this is a throttling error (use longer backoff) */
    throttling?: boolean;
}
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
export declare const withCategory: <Categories extends Category[]>(...categories: Categories) => <Args extends any[], Ret, C extends new (...args: Args) => Ret>(C: C) => C & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": { [Cat in Categories[number]]: true; };
});
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
export declare const withRetryable: (info?: RetryableInfo) => <Args extends any[], Ret, C extends new (...args: Args) => Ret>(C: C) => C & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/retryable": RetryableInfo;
});
export declare const withAuthError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        AuthError: true;
    };
});
export declare const withBadRequestError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        BadRequestError: true;
    };
});
export declare const withConflictError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        ConflictError: true;
    };
});
export declare const withNotFoundError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        NotFoundError: true;
    };
});
export declare const withQuotaError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        QuotaError: true;
    };
});
export declare const withServerError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        ServerError: true;
    };
});
export declare const withThrottlingError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        ThrottlingError: true;
    };
});
export declare const withNetworkError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        NetworkError: true;
    };
});
export declare const withParseError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        ParseError: true;
    };
});
export declare const withConfigurationError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        ConfigurationError: true;
    };
});
export declare const withTimeoutError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        TimeoutError: true;
    };
});
export declare const withRetryableError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        RetryableError: true;
    };
});
export declare const withLockedError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        LockedError: true;
    };
});
export declare const withAbortedError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        AbortedError: true;
    };
});
export declare const withAlreadyExistsError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        AlreadyExistsError: true;
    };
});
export declare const withDependencyViolationError: <Args extends any[], Ret, C_1 extends new (...args: Args) => Ret>(C: C_1) => C_1 & (new (...args: Args) => Ret & {
    "@distilled.cloud/error/categories": {
        DependencyViolationError: true;
    };
});
/**
 * Check if an error has a specific category.
 */
export declare const hasCategory: (error: unknown, category: Category) => boolean;
export declare const isAuthError: (error: unknown) => boolean;
export declare const isBadRequestError: (error: unknown) => boolean;
export declare const isConflictError: (error: unknown) => boolean;
export declare const isNotFoundError: (error: unknown) => boolean;
export declare const isQuotaError: (error: unknown) => boolean;
export declare const isServerError: (error: unknown) => boolean;
export declare const isThrottlingError: (error: unknown) => boolean;
export declare const isNetworkError: (error: unknown) => boolean;
export declare const isParseError: (error: unknown) => boolean;
export declare const isConfigurationError: (error: unknown) => boolean;
export declare const isTimeoutError: (error: unknown) => boolean;
export declare const isRetryableError: (error: unknown) => boolean;
export declare const isLockedError: (error: unknown) => boolean;
export declare const isAbortedError: (error: unknown) => boolean;
export declare const isAlreadyExistsError: (error: unknown) => boolean;
export declare const isDependencyViolationError: (error: unknown) => boolean;
/**
 * Check if an error has the retryable trait (set via withRetryable).
 */
export declare const isRetryable: (error: unknown) => boolean;
/**
 * Check if an error is a throttling error.
 * Either has ThrottlingError category or retryable trait with throttling: true.
 */
export declare const isThrottling: (error: unknown) => boolean;
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
export declare const isTransientError: (error: unknown) => boolean;
export type AllKeys<E> = E extends {
    [categoriesKey]: infer Q;
} ? keyof Q : never;
export type ExtractAll<E, Cats extends PropertyKey> = Cats extends any ? Extract<E, {
    [categoriesKey]: {
        [K in Cats]: any;
    };
}> : never;
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
export declare const catchErrors: <Categories extends Category[], A2, E2, R2>(...args: [...Categories, (err: any) => Effect.Effect<A2, E2, R2>]) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export { catchErrors as catch };
export declare const catchAuthError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchBadRequestError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchConflictError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchNotFoundError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchQuotaError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchServerError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchThrottlingError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchNetworkError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchParseError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchConfigurationError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchTimeoutError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchRetryableError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchLockedError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchAbortedError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchAlreadyExistsError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
export declare const catchDependencyViolationError: <A2, E2, R2>(f: (err: any) => Effect.Effect<A2, E2, R2>) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E | E2, R | R2>;
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
export declare const catchCategory: <E, const Categories extends AllKeys<E>[], A2, E2, R2>(...args: [...Categories, f: (err: ExtractAll<E, Categories[number]>) => Effect.Effect<A2, E2, R2>]) => <A, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A | A2, E2 | Exclude<E, ExtractAll<E, Categories[number]>>, R | R2>;
//# sourceMappingURL=category.d.ts.map