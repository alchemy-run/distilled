/**
 * PlanetScale retry configuration.
 *
 * Re-exports shared retry utilities and provides a PlanetScale-specific Retry service.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ServiceMap from "effect/ServiceMap";
export {
  type Options,
  type Factory,
  type Policy,
  makeDefault,
  jittered,
  capped,
  throttlingOptions,
  transientOptions,
} from "@distilled.cloud/sdk-core/retry";
import type { Policy } from "@distilled.cloud/sdk-core/retry";

/**
 * Context tag for configuring retry behavior of PlanetScale API calls.
 */
export class Retry extends ServiceMap.Service<Retry, Policy>()(
  "PlanetScaleRetry",
) {}

/**
 * Provides a custom retry policy to all PlanetScale API calls.
 */
export const policy = (optionsOrFactory: Policy) =>
  Effect.provide(Layer.succeed(Retry, optionsOrFactory));

/**
 * Disables all automatic retries.
 */
export const none = Effect.provide(
  Layer.succeed(Retry, { while: () => false }),
);
