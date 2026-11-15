/**
 * Dokploy credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, url }` per request; the
 * protocol sends the key as the `x-api-key` header (the spec's `apiKey`
 * security scheme). Generate a key in the Dokploy dashboard under
 * Settings > API Keys.
 *
 * Dokploy is self-hosted, so there is no default host: `url` is the
 * instance's own URL (for example `https://dokploy.example.com`) and the API
 * is served under its `/api` path. The environment variables are the ones
 * the official Dokploy CLI reads.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  /** Instance URL, without the `/api` suffix or a trailing slash. */
  readonly url: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "DokployCredentials",
  ) {}

const trimUrl = (url: string): string => url.replace(/\/+$/, "");

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.Redacted("DOKPLOY_API_KEY"),
  url: /*@__PURE__*/ EffectConfig.String("DOKPLOY_URL"),
});

/** Reads `DOKPLOY_API_KEY` and `DOKPLOY_URL` (both required). */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "DOKPLOY_API_KEY and DOKPLOY_URL environment variables are required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ apiKey, url }) => ({ apiKey, url: trimUrl(url) })),
  ),
);

/** Credentials for a known instance. */
export const credentials = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly url: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, Effect.succeed({ apiKey: config.apiKey, url: trimUrl(config.url) }));
