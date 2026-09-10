/**
 * Modal credentials — hand-written.
 *
 * The `Credentials` service resolves `{ tokenId, tokenSecret, apiBaseUrl }`
 * per request; the protocol layer sends them as `x-modal-token-id` /
 * `x-modal-token-secret` (the same headers the official JS/Go clients use).
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/**
 * Modal production control-plane URL.
 *
 * Override with `MODAL_SERVER_URL` (the spelling the official SDKs use) or
 * `MODAL_API_URL`.
 */
export const DEFAULT_API_BASE_URL = "https://api.modal.com";

export interface Config {
  readonly tokenId: Redacted.Redacted<string>;
  readonly tokenSecret: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("ModalCredentials") {}

const envConfig = EffectConfig.all({
  tokenId: EffectConfig.String("MODAL_TOKEN_ID"),
  tokenSecret: EffectConfig.String("MODAL_TOKEN_SECRET"),
  apiBaseUrl: EffectConfig.String("MODAL_SERVER_URL").pipe(
    EffectConfig.orElse(() =>
      EffectConfig.String("MODAL_API_URL").pipe(
        EffectConfig.withDefault(DEFAULT_API_BASE_URL),
      ),
    ),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message:
            "MODAL_TOKEN_ID and MODAL_TOKEN_SECRET environment variables are required",
        }),
    ),
    Effect.map(({ tokenId, tokenSecret, apiBaseUrl }) => ({
      tokenId: Redacted.make(tokenId),
      tokenSecret: Redacted.make(tokenSecret),
      apiBaseUrl,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a token pair + optional base URL. */
export const credentials = (config: {
  readonly tokenId: string;
  readonly tokenSecret: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      tokenId: Redacted.make(config.tokenId),
      tokenSecret: Redacted.make(config.tokenSecret),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
