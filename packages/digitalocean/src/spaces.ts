/**
 * Spaces' S3-compatible API with the credentials this SDK already holds.
 *
 * `layerS3` provides `@distilled.cloud/s3`'s `Credentials` and `Endpoint`
 * from the DigitalOcean `Credentials`:
 *
 * - The keys: the Spaces access key in the credentials when they carry one
 *   (`spacesAccessKeyId` + `spacesSecretAccessKey`, or the
 *   `SPACES_ACCESS_KEY_ID` / `SPACES_SECRET_ACCESS_KEY` variables that
 *   `CredentialsFromEnv` reads). Otherwise a Personal Access Token cannot
 *   sign S3 requests, so the layer creates a Spaces key for `bucket` alone
 *   (`readwrite` by default, or `read`) through the API when the layer is
 *   built, and deletes it when the layer's scope closes. Every S3 call under
 *   the layer signs with that one key, and a key that could not be created
 *   fails the layer with `SpacesCredentialsError`. The key is named
 *   `distilled-spaces-<bucket>-<time>` so a process that dies before closing
 *   the scope leaves a key you can recognize.
 * - The endpoint: `layerS3({ bucket, region })` adds
 *   `https://<region>.digitaloceanspaces.com`; with `layerS3Keys` each call
 *   provides its own `Endpoint`.
 *
 * @example
 * ```ts
 * import * as S3 from "@distilled.cloud/s3";
 * import * as Spaces from "@distilled.cloud/digitalocean/Spaces";
 *
 * const keys = S3.listObjectsV2({ Bucket: "my-space" }).pipe(
 *   Effect.provide(Spaces.layerS3({ bucket: "my-space", region: "nyc3" })),
 * );
 * ```
 */
import { invalidHostLabel, type InvalidInput } from "@distilled.cloud/core/protocol-http";
import { Credentials as S3Keys, type ResolvedCredentials } from "@distilled.cloud/s3/Credentials";
import { Endpoint } from "@distilled.cloud/s3/Endpoint";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { createSpacesKey, deleteSpacesKey } from "./services/digitalocean.ts";

/** The DigitalOcean credentials could not be turned into Spaces S3 keys. */
export class SpacesCredentialsError
  extends /*@__PURE__*/ Data.TaggedError("DigitalOceanSpacesCredentialsError")<{
    message: string;
    cause?: unknown;
  }> {}

// Every S3 operation's error type includes them in programs that use this
// module (`InvalidInput` is in it already).
declare module "@distilled.cloud/s3/Credentials" {
  interface ProviderErrors {
    digitalocean: SpacesCredentialsError | InvalidInput;
  }
}

/** The S3 endpoint of a Spaces region, for example `https://nyc3.digitaloceanspaces.com`. */
export const endpointFor = (region: string) => `https://${region}.digitaloceanspaces.com`;

// Spaces accepts any region in the signature; the endpoint picks the region.
const SIGNING_REGION = "us-east-1";

export interface LayerS3KeysOptions {
  /** The bucket the created key may access. */
  readonly bucket: string;
  /** The access the created key grants. Default: `"readwrite"`. */
  readonly permission?: "read" | "readwrite";
}

/**
 * `@distilled.cloud/s3`'s `Credentials` for one Spaces bucket of the team
 * the DigitalOcean `Credentials` act on. Provide each call's `Endpoint`
 * (`endpointFor(region)`) yourself, or use `layerS3`. When the credentials
 * carry no Spaces key, the layer creates one when it is built, and a key
 * that could not be created fails the layer with `SpacesCredentialsError`.
 */
export const layerS3Keys = (
  options: LayerS3KeysOptions,
): Layer.Layer<S3Keys, SpacesCredentialsError, Credentials | HttpClient.HttpClient> =>
  Layer.effect(
    S3Keys,
    Effect.gen(function* () {
      const credentials = yield* yield* Credentials;
      const keys =
        credentials.spacesAccessKeyId !== undefined &&
        credentials.spacesSecretAccessKey !== undefined
          ? {
              accessKeyId: credentials.spacesAccessKeyId,
              secretAccessKey: credentials.spacesSecretAccessKey,
            }
          : yield* createKey(options);
      const resolved: ResolvedCredentials = {
        ...keys,
        sessionToken: undefined,
        region: SIGNING_REGION,
      };
      return Effect.succeed(resolved);
    }),
  );

/** Creates a Spaces key for `options.bucket` and deletes it when the scope closes. */
const createKey = (options: LayerS3KeysOptions) =>
  Effect.acquireRelease(
    createSpacesKey({
      name: `distilled-spaces-${options.bucket}-${Date.now()}`,
      grants: [{ bucket: options.bucket, permission: options.permission ?? "readwrite" }],
    }).pipe(
      Effect.mapError(
        (cause) =>
          new SpacesCredentialsError({
            message: `Could not create a Spaces access key for bucket ${options.bucket} with the DigitalOcean token.`,
            cause,
          }),
      ),
    ),
    // A finalizer can't fail, so a key that could not be deleted is logged
    // with its id: it stays valid until someone deletes it.
    ({ key }) =>
      deleteSpacesKey({ access_key: key.access_key }).pipe(
        Effect.ignore({
          log: "Warn",
          message: `Could not delete the temporary Spaces key ${key.access_key}; it stays valid until you delete it in DigitalOcean.`,
        }),
      ),
  ).pipe(
    Effect.map(({ key }) => ({
      accessKeyId: Redacted.make(key.access_key),
      secretAccessKey:
        typeof key.secret_key === "string" ? Redacted.make(key.secret_key) : key.secret_key,
    })),
  );

/**
 * `layerS3Keys` plus the `Endpoint` of the bucket's Spaces region. A region
 * that is not one DNS label (it becomes a label of the host name) fails each
 * S3 call with `InvalidInput`.
 */
export const layerS3 = (
  options: LayerS3KeysOptions & { readonly region: string },
): Layer.Layer<S3Keys | Endpoint, SpacesCredentialsError, Credentials | HttpClient.HttpClient> => {
  const invalid = invalidHostLabel("region", options.region);
  return Layer.merge(
    layerS3Keys(options),
    Layer.succeed(
      Endpoint,
      invalid === undefined ? Effect.succeed(endpointFor(options.region)) : Effect.fail(invalid),
    ),
  );
};
