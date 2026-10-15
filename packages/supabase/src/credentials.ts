/**
 * Supabase credentials -- hand-written.
 *
 * API-compatible port of the distilled repo's supabase credentials module:
 * the `Credentials` service holds an *effect* that resolves the current
 * credentials on every request. Auth is a plain personal access token sent
 * as `Authorization: Bearer <token>`; `CredentialsFromEnv` reads
 * `SUPABASE_ACCESS_TOKEN`.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.supabase.com";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "SupabaseCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  accessToken: /*@__PURE__*/ EffectConfig.String("SUPABASE_ACCESS_TOKEN"),
});

export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "SUPABASE_ACCESS_TOKEN environment variable is required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ accessToken }) => ({
      accessToken: Redacted.make(accessToken),
      apiBaseUrl: DEFAULT_API_BASE_URL,
    })),
    Effect.orDie,
  ),
);

/**
 * Convenience layer from a redacted token + optional base URL.
 */
export const credentials = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: config.accessToken,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/** Auth headers for a resolved credential config. */
export const formatHeaders = (config: Config): Record<string, string> => ({
  Authorization: `Bearer ${Redacted.value(config.accessToken)}`,
});
