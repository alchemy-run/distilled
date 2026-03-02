/**
 * Retry policy infrastructure for GCP API calls.
 *
 * Provides configurable retry behavior via Effect context.
 *
 * @example
 * ```ts
 * import * as Retry from "distilled-gcp/retry"
 *
 * // Use default policy (5 retries with exponential backoff)
 * myEffect.pipe(Retry.policy(Retry.makeDefault))
 *
 * // Retry transient errors indefinitely (for tests)
 * myEffect.pipe(Retry.transient)
 *
 * // Disable retries
 * myEffect.pipe(Retry.none)
 * ```
 */

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

export interface Options {
  readonly while?: (error: unknown) => boolean;
  readonly schedule?: Schedule.Schedule<unknown>;
}

export type Factory = (lastError: Ref.Ref<unknown>) => Options;
export type Policy = Options | Factory;

export class Retry extends ServiceMap.Service<Retry, Policy>()("Retry") {}

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

export const none: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = Effect.provide(
  Layer.succeed(Retry, { while: () => false }),
);

export const jittered = Schedule.addDelay(() =>
  Effect.succeed(Duration.millis(Math.random() * 50)),
);

export const capped = (max: Duration.Duration) =>
  Schedule.modifyDelay((duration: Duration.Duration) =>
    Effect.succeed(
      Duration.isGreaterThan(duration, max) ? Duration.millis(5000) : duration,
    ),
  );

/**
 * Default retry policy for GCP APIs.
 *
 * - Retries transient, throttling, and retryable errors
 * - Exponential backoff starting at 100ms with factor 2
 * - Respects Retry-After headers when present
 * - 500ms minimum for throttling
 * - Max 5 retries with jitter
 */
export const makeDefault: Factory = (lastError) => ({
  while: (error) =>
    isTransientError(error) || isThrottlingError(error) || isRetryable(error),
  schedule: pipe(
    Schedule.exponential(100, 2),
    Schedule.modifyDelay(
      Effect.fnUntraced(function* (duration) {
        const error = yield* Ref.get(lastError);
        if (isThrottlingError(error)) {
          if (Duration.toMillis(duration) < 500) {
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

export const throttlingOptions: Options = {
  while: isThrottlingError,
  schedule: pipe(
    Schedule.exponential(1000, 2),
    capped(Duration.seconds(5)),
    jittered,
  ),
};

export const throttling: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = policy(throttlingOptions);

export const transientOptions: Options = {
  while: isTransientError,
  schedule: pipe(
    Schedule.exponential(1000, 2),
    capped(Duration.seconds(5)),
    jittered,
  ),
};

export const transient: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = policy(transientOptions);
