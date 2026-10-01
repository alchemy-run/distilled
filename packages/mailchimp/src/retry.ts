/**
 * Mailchimp retry configuration.
 *
 * @example
 * ```ts
 * import * as Mailchimp from "@distilled.cloud/mailchimp";
 *
 * myEffect.pipe(Mailchimp.Retry.throttling);
 * ```
 *
 * Mailchimp allows 10 simultaneous connections per key and answers 429 past
 * that; `throttling` is the policy that recovers it.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import {
  type Policy,
  throttlingFactory,
  transientFactory,
} from "@distilled.cloud/core/retry";

export {
  type Options,
  type Factory,
  type Policy,
  makeDefault,
  jittered,
  capped,
  throttlingOptions,
  transientOptions,
  throttlingFactory,
  transientFactory,
} from "@distilled.cloud/core/retry";

export class Retry extends Context.Service<Retry, Policy>()("MailchimpRetry") {}

/** Provides a custom retry policy to every Mailchimp API call below it. */
export const policy = (optionsOrFactory: Policy) =>
  Effect.provide(Layer.succeed(Retry, optionsOrFactory));

/** Disables all automatic retries. */
export const none = Effect.provide(
  Layer.succeed(Retry, { while: () => false }),
);

/** Retries throttling errors indefinitely. */
export const throttling = policy(throttlingFactory);

/** Retries all transient errors indefinitely. */
export const transient = policy(transientFactory);
