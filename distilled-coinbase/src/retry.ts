import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Layer from "effect/Layer";
import type * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import * as ServiceMap from "effect/ServiceMap";
import { isThrottlingError, isTransientError } from "./category";

/**
 * Retry policy options that match the Effect.retry contract.
 */
export interface Options {
  readonly while?: (error: unknown) => boolean;
  readonly schedule?: Schedule.Schedule<unknown>;
}

/**
 * A factory function that creates retry policy options with access to the last error ref.
 */
export type Factory = (lastError: Ref.Ref<unknown>) => Options;

/**
 * A retry policy can be either static options or a factory that receives the last error ref.
 */
export type Policy = Options | Factory;

/**
 * Context tag for configuring retry behavior of Coinbase API calls.
 */
export class Retry extends ServiceMap.Service<Retry, Policy>()("Retry") {}

/**
 * Provides a custom retry policy to all Coinbase API calls in the effect.
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
 */
export const none: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = Effect.provide(
  Layer.succeed(Retry, { while: () => false }),
);

/**
 * Creates the default retry policy used by distilled-coinbase.
 *
 * This policy:
 * - Retries transient errors (throttling, server, network errors)
 * - Uses exponential backoff starting at 100ms with a factor of 2
 * - Ensures at least 500ms delay for throttling errors
 * - Limits to 5 retry attempts
 * - Applies jitter to avoid thundering herd
 */
export const makeDefault: Factory = (lastError) => ({
  while: (error) => isTransientError(error),
  schedule: pipe(
    Schedule.exponential(100, 2),
    Schedule.modifyDelayEffect(
      Effect.fnUntraced(function* (duration) {
        const error = yield* lastError;
        if (isThrottlingError(error)) {
          if (Duration.toMillis(duration) < 500) {
            return Duration.toMillis(Duration.millis(500));
          }
        }
        return Duration.toMillis(duration);
      }),
    ),
    Schedule.both(Schedule.recurs(5)),
    Schedule.jittered,
  ),
});

/**
 * Retry options that retries all throttling errors indefinitely.
 */
export const throttlingOptions: Options = {
  while: isThrottlingError,
  schedule: pipe(
    Schedule.exponential(1000, 2),
    Schedule.modifyDelay((duration) =>
      Duration.toMillis(duration) > 5000 ? Duration.millis(5000) : duration,
    ),
    Schedule.jittered,
  ),
};

/**
 * Retries all throttling errors indefinitely.
 */
export const throttling: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = policy(throttlingOptions);

/**
 * Retry options that retries all transient errors indefinitely.
 */
export const transientOptions: Options = {
  while: isTransientError,
  schedule: pipe(
    Schedule.exponential(1000, 2),
    Schedule.modifyDelay((duration) =>
      Duration.toMillis(duration) > 5000 ? Duration.millis(5000) : duration,
    ),
    Schedule.jittered,
  ),
};

/**
 * Retries all transient errors indefinitely.
 */
export const transient: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = policy(transientOptions);
