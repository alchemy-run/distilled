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

export class Retry extends ServiceMap.Service<Retry, Policy>()(
  "CloudflareRetry",
) {}

export const policy = (optionsOrFactory: Policy) =>
  Effect.provide(Layer.succeed(Retry, optionsOrFactory));

export const none = Effect.provide(
  Layer.succeed(Retry, { while: () => false }),
);
