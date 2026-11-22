import * as Retries from "@distilled.cloud/core/retry";
/**
 * WhatsApp retry surface -- a veneer over `@distilled.cloud/core/retry`.
 *
 * The spec documents 429 Too Many Requests on most operations;
 * `throttling` is the policy that recovers it.
 *
 * The `Retry` service tag is threaded into every generated operation via
 * `API.make({ retry: Retry })`, so a caller-installed policy applies to all
 * WhatsApp calls below it and core's `makeDefault` is the fallback when none is
 * provided.
 *
 * @example
 * ```ts
 * import * as WhatsApp from "@distilled.cloud/whatsapp";
 *
 * myEffect.pipe(WhatsApp.Retry.throttling);
 * ```
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export type Options = Retries.Options;
export type Factory = Retries.Factory;
export type Policy = Retries.Policy;

/** Context tag for configuring retry behavior of WhatsApp API calls. */
export class Retry extends /*@__PURE__*/ Context.Service<Retry, Policy>()("WhatsAppRetry") {}

/** Provides a custom retry policy to every WhatsApp API call below it. */
export const policy: {
  (
    options: Options,
  ): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, Retry>>;
  (
    factory: Factory,
  ): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, Retry>>;
} = (optionsOrFactory: Options | Factory) => Effect.provide(Layer.succeed(Retry, optionsOrFactory));

/** Disables all automatic retries. */
export const none: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = /*@__PURE__*/ Effect.provide(
  /*@__PURE__*/ Layer.succeed(Retry, { while: () => false }),
);

/**
 * The default retry policy (core's): transient/throttling/retryable errors,
 * capped exponential backoff with jitter, server `retryAfter` hints honored
 * with precedence.
 */
export const makeDefault: Factory = Retries.makeDefault;

export const jittered = Retries.jittered;
export const capped = Retries.capped;

/** Retry options that retry all throttling errors indefinitely. */
export const throttlingOptions: Options = Retries.throttlingOptions;

/** Retries all throttling errors indefinitely (honoring server hints). */
export const throttling: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = /*@__PURE__*/ policy(Retries.throttlingFactory);

/** Retry options that retry all transient errors indefinitely. */
export const transientOptions: Options = Retries.transientOptions;

/** Retries all transient errors indefinitely. */
export const transient: <A, E, R>(
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, Exclude<R, Retry>> = /*@__PURE__*/ policy(Retries.transientFactory);
