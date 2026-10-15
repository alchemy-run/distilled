/**
 * Modal credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ tokenId, tokenSecret, apiBaseUrl }`
 * per request; the protocol layer sends them as `x-modal-token-id` /
 * `x-modal-token-secret` (the same headers the official JS/Go clients use).
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

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

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()("ModalCredentials") {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  tokenId: /*@__PURE__*/ EffectConfig.Redacted("MODAL_TOKEN_ID"),
  tokenSecret: /*@__PURE__*/ EffectConfig.Redacted("MODAL_TOKEN_SECRET"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("MODAL_SERVER_URL").pipe(
    /*@__PURE__*/ EffectConfig.orElse(() =>
      EffectConfig.String("MODAL_API_URL").pipe(EffectConfig.withDefault(DEFAULT_API_BASE_URL)),
    ),
  ),
});

export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "MODAL_TOKEN_ID and MODAL_TOKEN_SECRET environment variables are required",
        }),
    ),
    Effect.orDie,
  ),
);

/** Convenience layer from a token pair + optional base URL. */
export const credentials = (config: {
  readonly tokenId: Redacted.Redacted<string>;
  readonly tokenSecret: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      tokenId: config.tokenId,
      tokenSecret: config.tokenSecret,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
