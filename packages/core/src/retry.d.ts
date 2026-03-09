/**
 * Retry Policy System
 *
 * Provides configurable retry policies for API operations.
 * Each SDK creates its own Retry service tag but uses these shared utilities
 * for building retry schedules and policies.
 *
 * @example
 * ```ts
 * import * as Retry from "@distilled.cloud/sdk-core/retry";
 *
 * // Use the default retry policy
 * myEffect.pipe(Retry.policy(myRetryService, Retry.makeDefault()))
 *
 * // Disable retries
 * myEffect.pipe(Retry.none(myRetryService))
 * ```
 */
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import * as ServiceMap from "effect/ServiceMap";
/**
 * Retry policy options that match the Effect.retry contract.
 */
export interface Options {
    /**
     * Predicate to determine if an error should trigger a retry.
     */
    readonly while?: (error: unknown) => boolean;
    /**
     * The schedule to use for retrying.
     */
    readonly schedule?: Schedule.Schedule<unknown>;
}
/**
 * A factory function that creates retry policy options with access to the last error ref.
 * This allows dynamic policies that can inspect the last error for retry-after headers, etc.
 */
export type Factory = (lastError: Ref.Ref<unknown>) => Options;
/**
 * A retry policy can be either static options or a factory that receives the last error ref.
 */
export type Policy = Options | Factory;
/**
 * Create a typed Retry service class for an SDK.
 * Each SDK should create its own Retry service using this factory.
 *
 * @example
 * ```ts
 * // In planetscale-sdk/src/retry.ts
 * export class Retry extends makeRetryService("PlanetScaleRetry") {}
 * ```
 */
export declare const makeRetryService: (name: string) => ServiceMap.ServiceClass<any, string, Policy>;
/**
 * Provides a custom retry policy for API calls.
 */
export declare const policy: (Service: any, optionsOrFactory: Policy) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, unknown, unknown>;
/**
 * Disables all automatic retries.
 */
export declare const none: (Service: any) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, unknown, unknown>;
/**
 * Custom jittered schedule helper.
 * Adds random jitter between 0-50ms to avoid thundering herd.
 */
export declare const jittered: <Input, Error, Env>(self: Schedule.Schedule<unknown, Input, Error, Env>) => Schedule.Schedule<unknown, Input, Error, Env>;
/**
 * Cap delay at a maximum duration.
 */
export declare const capped: (max: Duration.Duration) => <Input, Error, Env>(self: Schedule.Schedule<Duration.Duration, Input, Error, Env>) => Schedule.Schedule<Duration.Duration, Input, Error, Env>;
/**
 * Creates the default retry policy.
 *
 * This policy:
 * - Retries transient errors (throttling, server, network, locked errors)
 * - Uses exponential backoff starting at 100ms with a factor of 2
 * - Ensures at least 500ms delay for throttling errors
 * - Limits to 5 retry attempts
 * - Applies jitter to avoid thundering herd
 */
export declare const makeDefault: Factory;
/**
 * Retry options that retries all throttling errors indefinitely.
 */
export declare const throttlingOptions: Options;
/**
 * Retry options that retries all transient errors indefinitely.
 *
 * This includes:
 * 1. Throttling errors
 * 2. Server errors
 * 3. Network errors
 * 4. Locked errors (423)
 */
export declare const transientOptions: Options;
//# sourceMappingURL=retry.d.ts.map