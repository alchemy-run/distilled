/**
 * Freestyle credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Auth is a Freestyle API key sent as
 * `Authorization: Bearer <apiKey>`. Exec and PTY routes also accept an
 * identity access token as `x-freestyle-identity-access-token` instead of
 * (or in addition to) the API key.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Freestyle production API root. Paths in the spec already include `/v5`. */
export const DEFAULT_API_BASE_URL = "https://api.freestyle.sh";

export interface Config {
  readonly apiKey?: Redacted.Redacted<string>;
  readonly identityAccessToken?: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("FreestyleCredentials") {}

const envConfig = EffectConfig.all({
  apiKey: EffectConfig.String("FREESTYLE_API_KEY").pipe(EffectConfig.option),
  identityAccessToken: EffectConfig.String(
    "FREESTYLE_IDENTITY_ACCESS_TOKEN",
  ).pipe(EffectConfig.option),
  apiBaseUrl: EffectConfig.String("FREESTYLE_API_BASE_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.flatMap(({ apiKey, identityAccessToken, apiBaseUrl }) => {
      if (apiKey._tag === "None" && identityAccessToken._tag === "None") {
        return Effect.fail(
          new ConfigError({
            message:
              "FREESTYLE_API_KEY or FREESTYLE_IDENTITY_ACCESS_TOKEN environment variable is required",
          }),
        );
      }
      return Effect.succeed({
        apiKey:
          apiKey._tag === "Some" ? Redacted.make(apiKey.value) : undefined,
        identityAccessToken:
          identityAccessToken._tag === "Some"
            ? Redacted.make(identityAccessToken.value)
            : undefined,
        apiBaseUrl,
      });
    }),
    Effect.orDie,
  ),
);

/** Layer from a plain API key + optional identity token and base URL. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly identityAccessToken?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> => credentials(config);

/** Convenience layer from an API key and/or identity access token. */
export const credentials = (config: {
  readonly apiKey?: string;
  readonly identityAccessToken?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey:
        config.apiKey !== undefined ? Redacted.make(config.apiKey) : undefined,
      identityAccessToken:
        config.identityAccessToken !== undefined
          ? Redacted.make(config.identityAccessToken)
          : undefined,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
