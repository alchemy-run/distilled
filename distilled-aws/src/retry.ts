import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Layer from "effect/Layer";
import * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import * as ServiceMap from "effect/ServiceMap";
import {
  isRetryable,
  isThrottlingError,
  isTransientError,
} from "./category.ts";

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
 * Context tag for configuring retry behavior of AWS API calls.
 */
export class Retry extends ServiceMap.Service<Retry, Policy>()(
  "distilled-aws/Retry",
) {}

/**
 * Provides a custom retry policy to all AWS API calls in the effect.
 *
 * @example
 * ```ts
 * import { Retry } from "distilled-aws"
 * import * as Schedule from "effect/Schedule"
 *
 * // Static policy
 * myEffect.pipe(
 *   Retry.policy({
 *     while: isThrottlingError,
 *     schedule: Schedule.exponential(1000),
 *   })
 * )
 *
 * // Dynamic policy with access to last error ref
 * myEffect.pipe(
 *   Retry.policy((lastError) => ({
 *     while: isThrottlingError,
 *     schedule: Schedule.exponential(1000).pipe(
 *       Schedule.modifyDelayEffect(
 *         Effect.gen(function* () {
 *           const error = yield* lastError;
 *           if (error?.retryAfterSeconds) {
 *             return Duration.seconds(error.retryAfterSeconds);
 *           }
 *           return duration;
 *         })
 *       )
 *     ),
 *   }))
 * )
 * ```
 */
export const policy: {
  (
    options: Options,
  ): <A, E, R>(
    effect: Effect.Effect<A, E, R>,
  ) => Effect.Effect<A, E, Exclude<R, Retry>>;
  (
    factory: Factory,
  ): <A, E, R>(
    effect: Effect.Effect<A, E, R>,
  ) => Effect.Effect<A, E, Exclude<R, Retry>>;
} = (optionsOrFactory: Options | Factory) =>
  Effect.provide(Layer.succeed(Retry, optionsOrFactory));

/**
 * Disables all automatic retries.
 *
 * @example
 * ```ts
 * import { Retry } from "distilled-aws"
 *
 * myEffect.pipe(Retry.none)
 * ```
 */
export const none: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = Effect.provide(
  Layer.succeed(Retry, { while: () => false }),
);

/**
 * Creates the default retry policy used by distilled-aws.
 *
 * This policy:
 * - Retries transient errors, throttling errors, and errors with the @retryable trait
 * - Uses exponential backoff starting at 100ms with a factor of 2
 * - Respects RetryAfter headers when present
 * - Ensures at least 500ms delay for throttling errors
 * - Limits to 5 retry attempts
 * - Applies jitter to avoid thundering herd
 */
export const makeDefault: Factory = (lastError) => ({
  while: (error) =>
    isTransientError(error) || isThrottlingError(error) || isRetryable(error),
  schedule: pipe(
    Schedule.exponential(100, 2),
    Schedule.modifyDelay(
      Effect.fnUntraced(function* (duration) {
        const error = yield* Ref.get(lastError);
        if (isRetryable(error)) {
          const retryAfter = Number(
            error.retryAfterSeconds ?? error.RetryAfterSeconds ?? 0,
          );
          if (!isNaN(retryAfter)) {
            return Duration.toMillis(Duration.seconds(retryAfter));
          }
        }
        if (isThrottlingError(error)) {
          if (Duration.toMillis(duration) < 500) {
            // if we got throttled, ensure the delay is at least 500ms
            return Duration.toMillis(Duration.millis(500));
          }
        }
        return Duration.toMillis(duration);
      }),
    ),
    Schedule.both(Schedule.recurs(5)),
    jittered,
  ),
});

export const jittered = Schedule.addDelay(() =>
  // Add random jitter between 0-50ms
  Effect.succeed(Duration.millis(Math.random() * 50)),
);

export const capped = (max: Duration.Duration) =>
  Schedule.modifyDelay((duration: Duration.Duration) =>
    Effect.succeed(Duration.isGreaterThan(duration, max) ? max : duration),
  );

/**
 * Retry options that retries all throttling errors indefinitely.
 */
export const throttlingOptions: Options = {
  while: isThrottlingError,
  schedule: pipe(
    Schedule.exponential(1000, 2),
    capped(Duration.seconds(5)),
    jittered,
  ),
};

/**
 * Retries all throttling errors indefinitely.
 *
 * @example
 * ```ts
 * import { Retry } from "distilled-aws"
 *
 * myEffect.pipe(Retry.throttling)
 * ```
 */
export const throttling: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = policy(throttlingOptions);

/**
 * Retry options that retries all transient errors indefinitely.
 *
 * This includes:
 * 1. Throttling errors
 * 2. Smithy's @retryable trait
 * 3. Server errors
 */
export const transientOptions: Options = {
  while: isTransientError,
  schedule: pipe(
    Schedule.exponential(1000, 2),
    capped(Duration.seconds(5)),
    jittered,
  ),
};

/**
 * Retries all transient errors indefinitely.
 *
 * @example
 * ```ts
 * import { Retry } from "distilled-aws"
 *
 * myEffect.pipe(Retry.transient)
 * ```
 */
export const transient: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = policy(transientOptions);
