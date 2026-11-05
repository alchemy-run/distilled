/**
 * R2's S3-compatible API with the credentials this SDK already holds.
 * `@distilled.cloud/cloudflare/r2` re-exports it.
 *
 * `layerS3` provides `@distilled.cloud/s3`'s `Credentials` and `Endpoint`
 * from the Cloudflare `Credentials`:
 *
 * - The keys: R2 accepts an API token as S3 keys. The token's id (from
 *   `/user/tokens/verify`, or `/accounts/{account_id}/tokens/verify` for an
 *   account-owned token) is the access key id, and the SHA-256 of the token
 *   is the secret access key.
 * - The endpoint: `https://<account_id>[.<jurisdiction>].r2.cloudflarestorage.com`,
 *   for the credentials' `accountId`, or else the one account the token can
 *   reach.
 *
 * Both are looked up on the first S3 call and kept.
 *
 * @example
 * ```ts
 * import * as S3 from "@distilled.cloud/s3";
 * import * as R2 from "@distilled.cloud/cloudflare/r2";
 *
 * const keys = S3.listObjectsV2({ Bucket: "my-bucket" }).pipe(
 *   Effect.provide(R2.layerS3()),
 * );
 * ```
 */
import * as CoreCrypto from "@distilled.cloud/core/crypto";
import type * as S3Credentials from "@distilled.cloud/s3/Credentials";
import type * as S3Endpoint from "@distilled.cloud/s3/Endpoint";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";

/** The Cloudflare credentials could not be turned into R2 S3 keys or an endpoint. */
export class S3CredentialsError
  extends /*@__PURE__*/ Data.TaggedError("CloudflareR2S3CredentialsError")<{
    message: string;
    cause?: unknown;
  }> {}

// Every S3 operation's error type includes it in programs that use this module.
declare module "@distilled.cloud/s3/Credentials" {
  interface ProviderErrors {
    cloudflare: S3CredentialsError;
  }
}

export interface LayerS3Options {
  /**
   * The jurisdiction the buckets were created in; each has its own
   * endpoint. Default: `"default"`.
   */
  readonly jurisdiction?: "default" | "eu" | "fedramp";
}

interface Resolved {
  readonly keys: S3Credentials.ResolvedCredentials;
  readonly endpoint: string;
}

/**
 * `@distilled.cloud/s3`'s `Credentials` (region `auto`) and `Endpoint` for
 * the R2 buckets of the account the Cloudflare `Credentials` act on.
 */
export const layerS3 = (
  options: LayerS3Options = {},
): Layer.Layer<
  S3Credentials.Credentials | S3Endpoint.Endpoint,
  never,
  Credentials | HttpClient.HttpClient
> =>
  // The S3 runtime and the account APIs load when the layer is built, so
  // importing `r2` costs neither.
  Layer.unwrap(
    Effect.gen(function* () {
      const [{ Credentials: S3Keys }, { Endpoint }] = yield* Effect.promise(() =>
        Promise.all([
          import("@distilled.cloud/s3/Credentials"),
          import("@distilled.cloud/s3/Endpoint"),
        ]),
      );
      const context = yield* Effect.context<Credentials | HttpClient.HttpClient>();
      const resolve = Effect.gen(function* () {
        const credentials = yield* yield* Credentials;
        if (credentials.type !== "apiToken")
          return yield* new S3CredentialsError({
            message: `R2's S3 API signs with an API token; the Cloudflare credentials are ${credentials.type === "apiKey" ? "a global API key" : "an OAuth token"}.`,
          });
        const [Accounts, User] = yield* Effect.promise(() =>
          Promise.all([import("./services/accounts.ts"), import("./services/user.ts")]),
        );
        const accountId = credentials.accountId ?? (yield* onlyAccount(Accounts.listAccounts({})));
        const token = yield* User.verifyToken({}).pipe(
          Effect.catch(() => Accounts.verifyToken({ accountId })),
        );
        const crypto = yield* CoreCrypto.Crypto;
        const secret = yield* crypto.sha256(Redacted.value(credentials.apiToken));
        return {
          keys: {
            accessKeyId: Redacted.make(token.id),
            secretAccessKey: Redacted.make(CoreCrypto.hex(secret)),
            sessionToken: undefined,
            region: "auto",
          },
          endpoint: endpoint(accountId, options.jurisdiction ?? "default"),
        } satisfies Resolved;
      }).pipe(
        Effect.provideContext(context),
        Effect.mapError((cause) =>
          cause instanceof S3CredentialsError
            ? cause
            : new S3CredentialsError({
                message: "Could not look up the Cloudflare API token's id or account.",
                cause,
              }),
        ),
      );
      // Successes only: a failed lookup is tried again on the next call.
      let resolved: Resolved | undefined;
      const cached = Effect.suspend(() =>
        resolved
          ? Effect.succeed(resolved)
          : Effect.tap(resolve, (r) => Effect.sync(() => (resolved = r))),
      );
      return Layer.mergeAll(
        Layer.succeed(
          S3Keys,
          Effect.map(cached, (r) => r.keys),
        ),
        Layer.succeed(
          Endpoint,
          Effect.map(cached, (r) => r.endpoint),
        ),
      );
    }),
  );

/** An account's R2 S3 endpoint in a jurisdiction. */
const endpoint = (accountId: string, jurisdiction: string) =>
  `https://${accountId}${jurisdiction === "default" ? "" : `.${jurisdiction}`}.r2.cloudflarestorage.com`;

/** The id of the one account `accounts` lists, or why there is no single one. */
const onlyAccount = <E, R>(
  accounts: Effect.Effect<
    { readonly result: ReadonlyArray<{ readonly id: string; readonly name: string }> },
    E,
    R
  >,
) =>
  Effect.flatMap(accounts, ({ result }) =>
    result.length === 1
      ? Effect.succeed(result[0]!.id)
      : Effect.fail(
          new S3CredentialsError({
            message:
              result.length === 0
                ? "The Cloudflare API token reaches no account."
                : `The Cloudflare API token reaches ${result.length} accounts (${result.map((a) => a.name).join(", ")}); set accountId in the Cloudflare credentials (CLOUDFLARE_ACCOUNT_ID).`,
          }),
        ),
  );
