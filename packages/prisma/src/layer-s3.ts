import { loadModule, type SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * A Prisma bucket's S3-compatible API with the credentials this SDK already
 * holds. `@distilled.cloud/prisma/management` re-exports it.
 *
 * Prisma's S3 keys are bucket keys, and a bucket key's secret is returned
 * only when the key is created. So `layerS3` creates a bucket key with the
 * Prisma `Credentials` when the layer is built, provides
 * `@distilled.cloud/s3`'s `Credentials` (region `auto`) and `Endpoint` from
 * it, and deletes the key when the layer's scope closes. The bucket's S3
 * name, which differs from its id, is the `S3BucketName` service.
 *
 * @example
 * ```ts
 * import * as S3 from "@distilled.cloud/s3";
 * import * as Management from "@distilled.cloud/prisma/management";
 *
 * const keys = Effect.gen(function* () {
 *   const Bucket = yield* Management.S3BucketName;
 *   return yield* S3.listObjectsV2({ Bucket });
 * }).pipe(Effect.provide(Management.layerS3({ bucketId })));
 * ```
 */
import type * as S3Credentials from "@distilled.cloud/s3/Credentials";
import type * as S3Endpoint from "@distilled.cloud/s3/Endpoint";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type { Credentials } from "./credentials.ts";

/** The bucket key for the S3 API could not be created. */
export class S3CredentialsError
  extends /*@__PURE__*/ Data.TaggedError("PrismaS3CredentialsError")<{
    message: string;
    cause?: unknown;
  }> {}

const loadFailure = (e: SdkError) =>
  new S3CredentialsError({ message: `the S3 layer could not load: ${e.message}`, cause: e });

/** The bucket's name on the S3 API (the `Bucket` of every S3 call). */
export class S3BucketName
  extends /*@__PURE__*/ Context.Service<S3BucketName, string>()("Prisma::S3BucketName") {}

export interface LayerS3Options {
  readonly bucketId: string;
  /** The access the bucket key grants. Default: `"read_write"`. */
  readonly role?: "read" | "read_write";
}

const reveal = (value: string | Redacted.Redacted<string>) =>
  Redacted.isRedacted(value) ? value : Redacted.make(value);

/**
 * `@distilled.cloud/s3`'s `Credentials` and `Endpoint`, and the bucket's
 * `S3BucketName`, from a bucket key this layer creates and deletes.
 */
export const layerS3 = (
  options: LayerS3Options,
): Layer.Layer<
  S3Credentials.Credentials | S3Endpoint.Endpoint | S3BucketName,
  S3CredentialsError,
  Credentials | HttpClient.HttpClient
> =>
  Layer.unwrap(
    Effect.gen(function* () {
      // The S3 runtime and the management API load when the layer is built,
      // so importing `management` costs neither.
      const [{ Credentials: S3Keys }, { Endpoint }, Management] = yield* loadModule(() =>
        Promise.all([
          import("@distilled.cloud/s3/Credentials"),
          import("@distilled.cloud/s3/Endpoint"),
          import("./services/management.ts"),
        ]),
      ).pipe(Effect.mapError(loadFailure));
      const context = yield* Effect.context<Credentials | HttpClient.HttpClient>();
      const key = yield* Effect.acquireRelease(
        Management.createBucketKey({
          bucketId: options.bucketId,
          name: "distilled-s3",
          role: options.role ?? "read_write",
        }).pipe(
          Effect.map((response) => response.data),
          Effect.provideContext(context),
          Effect.mapError(
            (cause) =>
              new S3CredentialsError({
                message: `Could not create an S3 key for Prisma bucket ${options.bucketId}.`,
                cause,
              }),
          ),
        ),
        (key) =>
          Management.deleteBucketKey({ bucketId: options.bucketId, keyId: key.id }).pipe(
            Effect.provideContext(context),
            Effect.ignore,
          ),
      );
      const keys: S3Credentials.ResolvedCredentials = {
        accessKeyId: reveal(key.accessKeyId),
        secretAccessKey: reveal(key.secretAccessKey),
        sessionToken: undefined,
        region: "auto",
      };
      return Layer.mergeAll(
        Layer.succeed(S3Keys, Effect.succeed(keys)),
        Layer.succeed(Endpoint, Effect.succeed(key.endpoint)),
        Layer.succeed(S3BucketName, key.bucketName),
      );
    }),
  );
