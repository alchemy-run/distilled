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
 *   sign S3 requests, so the layer creates a full-access Spaces key through
 *   the API on the first S3 call and deletes it when the layer's scope
 *   closes. The key is named `distilled-spaces-<time>` so a process that
 *   dies before closing the scope leaves a key you can recognize.
 * - The endpoint: `layerS3({ region })` adds
 *   `https://<region>.digitaloceanspaces.com`; with `layerS3Keys` each call
 *   provides its own `Endpoint`.
 *
 * @example
 * ```ts
 * import * as S3 from "@distilled.cloud/s3";
 * import * as Spaces from "@distilled.cloud/digitalocean/Spaces";
 *
 * const keys = S3.listObjectsV2({ Bucket: "my-space" }).pipe(
 *   Effect.provide(Spaces.layerS3({ region: "nyc3" })),
 * );
 * ```
 */
import { Credentials as S3Keys, type ResolvedCredentials } from "@distilled.cloud/s3/Credentials";
import { Endpoint } from "@distilled.cloud/s3/Endpoint";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as Scope from "effect/Scope";
import { Credentials } from "./credentials.ts";
import { createSpacesKey, deleteSpacesKey } from "./services/digitalocean.ts";

/** The DigitalOcean credentials could not be turned into Spaces S3 keys. */
export class SpacesCredentialsError
  extends /*@__PURE__*/ Data.TaggedError("DigitalOceanSpacesCredentialsError")<{
    message: string;
    cause?: unknown;
  }> {}

// Every S3 operation's error type includes it in programs that use this module.
declare module "@distilled.cloud/s3/Credentials" {
  interface ProviderErrors {
    digitalocean: SpacesCredentialsError;
  }
}

/** The S3 endpoint of a Spaces region, for example `https://nyc3.digitaloceanspaces.com`. */
export const endpointFor = (region: string) => `https://${region}.digitaloceanspaces.com`;

// Spaces accepts any region in the signature; the endpoint picks the region.
const SIGNING_REGION = "us-east-1";

/**
 * `@distilled.cloud/s3`'s `Credentials` for the Spaces buckets of the team
 * the DigitalOcean `Credentials` act on. Provide each call's `Endpoint`
 * (`endpointFor(region)`) yourself, or use `layerS3`.
 */
export const layerS3Keys = (): Layer.Layer<S3Keys, never, Credentials | HttpClient.HttpClient> =>
  Layer.effect(
    S3Keys,
    Effect.gen(function* () {
      const context = yield* Effect.context<Credentials | HttpClient.HttpClient | Scope.Scope>();

      const mint = Effect.gen(function* () {
        const { key } = yield* createSpacesKey({
          name: `distilled-spaces-${Date.now()}`,
          grants: [{ bucket: "", permission: "fullaccess" }],
        });
        yield* Effect.addFinalizer(() =>
          deleteSpacesKey({ access_key: key.access_key }).pipe(Effect.ignore),
        );
        return {
          accessKeyId: Redacted.make(key.access_key),
          secretAccessKey:
            typeof key.secret_key === "string" ? Redacted.make(key.secret_key) : key.secret_key,
        };
      });

      const resolve = Effect.gen(function* () {
        const credentials = yield* yield* Credentials;
        const keys =
          credentials.spacesAccessKeyId !== undefined &&
          credentials.spacesSecretAccessKey !== undefined
            ? {
                accessKeyId: credentials.spacesAccessKeyId,
                secretAccessKey: credentials.spacesSecretAccessKey,
              }
            : yield* mint;
        return {
          ...keys,
          sessionToken: undefined,
          region: SIGNING_REGION,
        } satisfies ResolvedCredentials;
      }).pipe(
        Effect.provideContext(context),
        Effect.mapError(
          (cause) =>
            new SpacesCredentialsError({
              message: "Could not create a Spaces access key with the DigitalOcean token.",
              cause,
            }),
        ),
      );
      // Successes only: a failed attempt is tried again on the next call.
      let resolved: ResolvedCredentials | undefined;
      return Effect.suspend(() =>
        resolved
          ? Effect.succeed(resolved)
          : Effect.tap(resolve, (r) => Effect.sync(() => (resolved = r))),
      );
    }),
  );

/** `layerS3Keys` plus the `Endpoint` of one Spaces region. */
export const layerS3 = (options: {
  readonly region: string;
}): Layer.Layer<S3Keys | Endpoint, never, Credentials | HttpClient.HttpClient> =>
  Layer.merge(layerS3Keys(), Layer.succeed(Endpoint, Effect.succeed(endpointFor(options.region))));
