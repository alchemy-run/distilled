/**
 * ZeroSSL credentials — hand-written.
 *
 * ZeroSSL's REST API authenticates with the account's access key, sent as
 * the `Authorization: ApiKey` header on every request. The `Credentials`
 * service holds an *effect* that resolves the current credentials so the
 * protocol picks up rotations per request.
 *
 * Reads `ZEROSSL_ACCESS_KEY`, falling back to `ZERO_SSL_KEY`.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.zerossl.com";

export interface Config {
  readonly accessKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<Credentials, Effect.Effect<Config>>()(
  "ZeroSslCredentials",
) {}

const envConfig = EffectConfig.Redacted("ZEROSSL_ACCESS_KEY").pipe(
  EffectConfig.orElse(() => EffectConfig.Redacted("ZERO_SSL_KEY")),
);

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "ZEROSSL_ACCESS_KEY (or ZERO_SSL_KEY) environment variable is required",
        }),
    ),
    Effect.map((accessKey): Config => ({
      accessKey,
      apiBaseUrl: DEFAULT_API_BASE_URL,
    })),
    Effect.orDie,
  ),
);

/** A fixed credentials layer. */
export const layer = (config: Config | Effect.Effect<Config>) =>
  Layer.succeed(Credentials, Effect.isEffect(config) ? config : Effect.succeed(config));
