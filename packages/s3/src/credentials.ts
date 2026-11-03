/**
 * The `Credentials` service every operation signs with.
 *
 * This package provides no layer for it, and reads no environment variable
 * or file: give it the keys yourself, or use the layer of the SDK that
 * already holds them (`@distilled.cloud/aws`'s credential providers,
 * `@distilled.cloud/cloudflare/R2S3`).
 *
 * @example
 * ```ts
 * Layer.succeed(Credentials, Effect.succeed({
 *   accessKeyId: Redacted.make(accessKeyId),
 *   secretAccessKey: Redacted.make(secretAccessKey),
 *   sessionToken: undefined,
 *   region: "auto",
 * }))
 * ```
 */
import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";
import type * as Redacted from "effect/Redacted";
import type { RegionName } from "./region.ts";

/**
 * Credential values ready for request signing.
 *
 * `region` is not optional: it is the region the keys sign for (`auto` for
 * Cloudflare R2). A `Region` override can still send one call elsewhere.
 */
export interface ResolvedCredentials {
  readonly accessKeyId: Redacted.Redacted<string>;
  readonly secretAccessKey: Redacted.Redacted<string>;
  readonly sessionToken: Redacted.Redacted<string> | undefined;
  readonly region: RegionName;
  /** When the credentials stop being accepted (epoch milliseconds). */
  readonly expiration?: number;
}

/**
 * The errors a provided `Credentials`, `Region` or `Endpoint` can fail with,
 * keyed by the package whose layers raise them. Empty here, because keys
 * given directly cannot fail. A package that provides such a layer adds its
 * errors with a module augmentation, so they appear in every operation's
 * error type only in programs that use that package:
 *
 * ```ts
 * declare module "@distilled.cloud/s3/Credentials" {
 *   interface ProviderErrors {
 *     aws: CredentialsError;
 *   }
 * }
 * ```
 */
export interface ProviderErrors {}

/** Every error in {@link ProviderErrors}. */
export type ProviderError = ProviderErrors[keyof ProviderErrors];

// Annotated so the declaration keeps `ProviderError` unevaluated: an
// inferred base type would be emitted as `never`, and a module augmentation
// of `ProviderErrors` would no longer reach it.
const CredentialsService: Context.ServiceClass<
  Credentials,
  "AWS::Credentials",
  Effect.Effect<ResolvedCredentials, ProviderError>
> = /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<ResolvedCredentials, ProviderError>>()(
  "AWS::Credentials",
);

export class Credentials extends CredentialsService {}
