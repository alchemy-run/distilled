/**
 * The `Endpoint` override service comes from `@distilled.cloud/s3`; this
 * module adds the environment and the helpers.
 */
import * as Config from "@distilled.cloud/core/config";
import { Endpoint } from "@distilled.cloud/s3/Endpoint";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";

export * from "@distilled.cloud/s3/Endpoint";

/**
 * `AWS_ENDPOINT_URL` -- the LocalStack-standard endpoint override that local
 * emulators (floci, LocalStack) inject into runtime environments (e.g.
 * Lambda containers). Resolves `undefined` when unset, so the SDK's
 * default endpoint resolver runs.
 */
export const fromEnvironment = /*@__PURE__*/ Config.String("AWS_ENDPOINT_URL").pipe(
  Config.option,
  /*@__PURE__*/ Effect.map(Option.getOrUndefined),
);

/** Override the endpoint with whatever the environment names, if anything. */
export const fromEnv = () => Layer.succeed(Endpoint, fromEnvironment);

/** Override the endpoint for a scope, e.g. `Endpoint.of("http://localhost:4566")`. */
export const of = (endpoint: string) => Layer.succeed(Endpoint, Effect.succeed(endpoint));
