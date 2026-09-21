/**
 * S2 (s2.dev) credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, accountBaseUrl, basin,
 * basinBaseUrl }` per request; the protocol layer formats the
 * `Authorization: Bearer <token>` header from it. The token is an S2 access
 * token, issued per account via `accessTokens.issueAccessToken` or
 * the S2 dashboard.
 *
 * S2 speaks from TWO endpoints: account-level operations (basins, access
 * tokens, locations, metrics) go to `https://a.s2.dev/v1`, while stream and
 * record operations go to the basin's own host,
 * `https://{basin}.b.s2.dev/v1` (the OpenAPI document declares these as
 * per-path `servers` with a `basin` variable). The basin is therefore part
 * of the CLIENT configuration, not of any operation input: set `basin` here
 * to call the streams/records services. The protocol picks the endpoint per
 * request from the operation's route (see protocol.ts).
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** S2's account-level API root (the spec's top-level `servers` entry). */
export const DEFAULT_ACCOUNT_BASE_URL = "https://a.s2.dev/v1";

/**
 * The basin endpoint template; `{basin}` is replaced with the configured
 * basin name (the spec's per-path `servers` entry for streams/records).
 */
export const DEFAULT_BASIN_BASE_URL = "https://{basin}.b.s2.dev/v1";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly accountBaseUrl: string;
  /**
   * Basin scope for the streams/records services. Calling one of those
   * operations without a basin configured fails with `ConfigError`.
   */
  readonly basin?: string;
  readonly basinBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("S2Credentials") {}

const envConfig = EffectConfig.all({
  // `S2_ACCESS_TOKEN` / `S2_BASIN` are what the official `s2` CLI reads.
  token: EffectConfig.String("S2_ACCESS_TOKEN"),
  basin: EffectConfig.String("S2_BASIN").pipe(EffectConfig.option),
  accountBaseUrl: EffectConfig.String("S2_ACCOUNT_ENDPOINT").pipe(
    EffectConfig.withDefault(DEFAULT_ACCOUNT_BASE_URL),
  ),
  basinBaseUrl: EffectConfig.String("S2_BASIN_ENDPOINT").pipe(
    EffectConfig.withDefault(DEFAULT_BASIN_BASE_URL),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "S2_ACCESS_TOKEN environment variable is required",
        }),
    ),
    Effect.map(({ token, basin, accountBaseUrl, basinBaseUrl }) => ({
      token: Redacted.make(token),
      basin: basin._tag === "Some" ? basin.value : undefined,
      accountBaseUrl,
      basinBaseUrl,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain token + optional basin/endpoints. */
export const credentials = (config: {
  readonly token: string;
  readonly basin?: string;
  readonly accountBaseUrl?: string;
  readonly basinBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: Redacted.make(config.token),
      basin: config.basin,
      accountBaseUrl: config.accountBaseUrl ?? DEFAULT_ACCOUNT_BASE_URL,
      basinBaseUrl: config.basinBaseUrl ?? DEFAULT_BASIN_BASE_URL,
    }),
  );
