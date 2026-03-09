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
import { pipe } from "effect/Function";
import * as Layer from "effect/Layer";
import * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import * as ServiceMap from "effect/ServiceMap";
import { isThrottling, isTransientError } from "./category.js";
// ============================================================================
// Retry Service Factory
// ============================================================================
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
export const makeRetryService = (name) => ServiceMap.Service()(name);
/**
 * Provides a custom retry policy for API calls.
 */
export const policy = (Service, optionsOrFactory) => (effect) => Effect.provide(effect, Layer.succeed(Service, optionsOrFactory));
/**
 * Disables all automatic retries.
 */
export const none = (Service) => (effect) => Effect.provide(effect, Layer.succeed(Service, { while: () => false }));
// ============================================================================
// Retry Schedule Utilities
// ============================================================================
/**
 * Custom jittered schedule helper.
 * Adds random jitter between 0-50ms to avoid thundering herd.
 */
export const jittered = Schedule.addDelay(() => Effect.succeed(Duration.millis(Math.random() * 50)));
/**
 * Cap delay at a maximum duration.
 */
export const capped = (max) => Schedule.modifyDelay((duration) => Effect.succeed(Duration.isGreaterThan(duration, max) ? Duration.millis(5000) : duration));
// ============================================================================
// Default Retry Policies
// ============================================================================
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
export const makeDefault = (lastError) => ({
    while: (error) => isTransientError(error),
    schedule: pipe(Schedule.exponential(100, 2), Schedule.modifyDelay(Effect.fnUntraced(function* (duration) {
        const error = yield* Ref.get(lastError);
        if (isThrottling(error)) {
            if (Duration.toMillis(duration) < 500) {
                return Duration.toMillis(Duration.millis(500));
            }
        }
        return Duration.toMillis(duration);
    })), Schedule.both(Schedule.recurs(5)), jittered),
});
/**
 * Retry options that retries all throttling errors indefinitely.
 */
export const throttlingOptions = {
    while: (error) => isThrottling(error),
    schedule: pipe(Schedule.exponential(1000, 2), capped(Duration.seconds(5)), jittered),
};
/**
 * Retry options that retries all transient errors indefinitely.
 *
 * This includes:
 * 1. Throttling errors
 * 2. Server errors
 * 3. Network errors
 * 4. Locked errors (423)
 */
export const transientOptions = {
    while: isTransientError,
    schedule: pipe(Schedule.exponential(1000, 2), capped(Duration.seconds(5)), jittered),
};
//# sourceMappingURL=retry.js.map