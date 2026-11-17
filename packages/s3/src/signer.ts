/**
 * Signing as a service. By default a request is signed here, with the
 * `Credentials` in context. Provide a {@link Signer} to sign it somewhere
 * else: a process that holds the key signs the request and hands back its
 * signed headers, and the request is then sent from here, straight to AWS.
 *
 * A caller with a `Signer` needs no real credentials. The `Credentials`
 * service must still resolve, so pair it with {@link unsignedCredentials}.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import type { RegionName } from "./region.ts";
import type * as SigV4 from "./sigv4.ts";

/** A request to sign: what `SigV4.sign` takes, without the key. */
export interface SignRequest extends Omit<
  SigV4.SignOptions,
  "accessKeyId" | "secretAccessKey" | "sessionToken"
> {
  /** Sign with SigV4A for these regions instead of SigV4 for `region`. */
  readonly regionSet?: ReadonlyArray<string> | undefined;
}

/**
 * Signs requests in place of the local SigV4 signer. `sign` returns the
 * request with its `authorization` and `x-amz-*` headers (or, with
 * `signQuery`, its presigned URL).
 */
export class Signer extends Context.Service<
  Signer,
  {
    readonly sign: (request: SignRequest) => Effect.Effect<SigV4.SignedRequest, unknown>;
  }
>()("@distilled.cloud/aws/Signer") {}

/**
 * Credentials for a caller whose requests a {@link Signer} signs: they
 * resolve, name the region to sign for, and sign nothing.
 */
export const unsignedCredentials = (region: Effect.Effect<RegionName>) =>
  Layer.succeed(
    Credentials,
    Effect.map(region, (resolved) => ({
      accessKeyId: Redacted.make("signed-by-signer"),
      secretAccessKey: Redacted.make(""),
      sessionToken: undefined,
      region: resolved,
    })),
  );
