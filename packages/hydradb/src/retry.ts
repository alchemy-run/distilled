/**
 * HydraDB retry surface -- a veneer over `@distilled.cloud/core/retry`.
 *
 * The `Retry` service tag is threaded into every generated operation, so a
 * caller-installed policy applies to all HydraDB calls below it and
 * core's `makeDefault` is the fallback when none is provided.
 *
 * HydraDB documents `429`, `500`, `502` and `503` as the retryable statuses
 * (core's `TooManyRequests`, `InternalServerError`, `BadGateway`,
 * `ServiceUnavailable`); the default policy retries them with backoff and
 * honors a `Retry-After` header. A `422` `TENANT_INFRA_NOT_READY` is not
 * retried: poll `getDatabaseStatus` until the database is ready instead.
 *
 * @example
 * ```ts
 * import * as HydraDB from "@distilled.cloud/hydradb";
 *
 * myEffect.pipe(HydraDB.Retry.transient);
 * ```
 */
import { type Policy, throttlingFactory, transientFactory } from "@distilled.cloud/core/retry";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export {
  type Factory,
  type Options,
  type Policy,
  capped,
  jittered,
  makeDefault,
  throttlingFactory,
  throttlingOptions,
  transientFactory,
  transientOptions,
} from "@distilled.cloud/core/retry";

/** Context tag for configuring retry behavior of HydraDB API calls. */
export class Retry extends /*@__PURE__*/ Context.Service<Retry, Policy>()("HydraDBRetry") {}

/** Provides a custom retry policy to every HydraDB API call below it. */
export const policy = (optionsOrFactory: Policy) =>
  Effect.provide(Layer.succeed(Retry, optionsOrFactory));

/** Disables all automatic retries. */
export const none = /*@__PURE__*/ Effect.provide(
  /*@__PURE__*/ Layer.succeed(Retry, { while: () => false }),
);

/** Retries all throttling errors indefinitely (honoring server hints). */
export const throttling = /*@__PURE__*/ policy(throttlingFactory);

/** Retries all transient errors indefinitely (honoring server hints). */
export const transient = /*@__PURE__*/ policy(transientFactory);
