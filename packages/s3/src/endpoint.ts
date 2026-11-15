/**
 * An endpoint override: the base URL every operation is sent to, in place of
 * the one the endpoint rules resolve (`https://<account>.r2.cloudflarestorage.com`
 * for Cloudflare R2, `http://localhost:9000` for MinIO).
 */
import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type { ProviderError } from "./credentials.ts";

// Annotated so the declaration keeps `ProviderError` unevaluated: an
// inferred base type would be emitted as `never`, and a module augmentation
// of `ProviderErrors` would no longer reach it.
const EndpointService: Context.ServiceClass<
  Endpoint,
  "AWS::Endpoint",
  Effect.Effect<string | undefined, ProviderError>
> = /*@__PURE__*/ Context.Service<Endpoint, Effect.Effect<string | undefined, ProviderError>>()(
  "AWS::Endpoint",
);

export class Endpoint extends EndpointService {}

/**
 * Whether operations skip their `@endpoint` host prefix (`data-` for
 * `data-<host>`), like the AWS SDKs' `disableHostPrefix`. The prefix applies
 * to a custom endpoint too, as in the AWS SDKs; an emulator that serves
 * every operation on one host needs it off.
 */
export const DisableHostPrefix = /*@__PURE__*/ Context.Reference<boolean>(
  "AWS::DisableHostPrefix",
  {
    defaultValue: () => false,
  },
);

/** Send the calls in a scope without their host prefix, e.g. to LocalStack. */
export const disableHostPrefix: Layer.Layer<never> = /*@__PURE__*/ Layer.succeed(
  DisableHostPrefix,
  true,
);
