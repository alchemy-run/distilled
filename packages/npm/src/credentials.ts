/**
 * npm registry credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ token?, registryUrl }` per request;
 * the protocol formats `Authorization: Bearer <token>` from it. The token is
 * an npm access token: a granular access token, a session token from
 * `npm login`, or the short-lived token `oidc.exchangeOidcToken` returns.
 * `exchangeOidcToken` itself takes the CI provider's OIDC id_token as its
 * bearer token, so provide that call its own credentials.
 *
 * The token is optional: search and bulk audit need none, and the registry
 * answers `401` on an operation that does.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as Redacted from "effect/Redacted";

/** The public npm registry (the spec's `servers` entry). */
export const DEFAULT_REGISTRY_URL = "https://registry.npmjs.org";

export interface Config {
  /** Sent as `Authorization: Bearer`; without it, only public operations succeed. */
  readonly token?: Redacted.Redacted<string>;
  /** Registry base URL, without a trailing slash. */
  readonly registryUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "NpmCredentials",
  ) {}

const trimSlash = (url: string): string => url.replace(/\/+$/, "");

const envConfig = /*@__PURE__*/ EffectConfig.all({
  token: /*@__PURE__*/ EffectConfig.Redacted("NPM_TOKEN").pipe(EffectConfig.option),
  registryUrl: /*@__PURE__*/ EffectConfig.String("NPM_API_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_REGISTRY_URL),
  ),
});

/**
 * Reads `NPM_TOKEN` (optional) and `NPM_API_BASE_URL` (optional, default
 * {@link DEFAULT_REGISTRY_URL}).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      (error) =>
        new ConfigError({ message: `npm credentials could not be read: ${error.message}` }),
    ),
    /*@__PURE__*/ Effect.map(({ token, registryUrl }) => ({
      token: Option.getOrUndefined(token),
      registryUrl: trimSlash(registryUrl),
    })),
  ),
);

/**
 * Credentials from an optional token and registry URL. Without a token, only
 * public operations succeed.
 */
export const credentials = (config: {
  readonly token?: Redacted.Redacted<string>;
  readonly registryUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: config.token,
      registryUrl: trimSlash(config.registryUrl ?? DEFAULT_REGISTRY_URL),
    }),
  );
