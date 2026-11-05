/**
 * Entire credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ token, coreBaseUrl, apiBaseUrl }`
 * per request. The token is a bearer JWT: a login access token (the RFC 8628
 * device flow or the browser login `entire login` runs), or a service
 * account session minted by token exchange. Entire issues no long-lived API
 * keys.
 *
 * Entire serves two APIs, and the token's home region decides both hosts:
 *
 * - `coreBaseUrl` -- the Core control plane (orgs, projects, repos, mirrors,
 *   service accounts). Defaults to the US console.
 * - `apiBaseUrl` -- the regional cell (trails, sessions, checkpoints, search,
 *   environments, agents). Defaults to the US cell; `listClusters` returns
 *   each cell's `apiUrl`.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** The US home-region Core control plane (routes carry `/api/v1`). */
export const DEFAULT_CORE_BASE_URL = "https://us.console.entire.io";

/** The US cell data plane (routes carry `/api/v1`). */
export const DEFAULT_API_BASE_URL = "https://aws-us-east-2.api.entire.io";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly coreBaseUrl: string;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "EntireCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  token: /*@__PURE__*/ EffectConfig.Redacted("ENTIRE_TOKEN"),
  coreBaseUrl: /*@__PURE__*/ EffectConfig.String("ENTIRE_CORE_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_CORE_BASE_URL),
  ),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("ENTIRE_API_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/**
 * Reads `ENTIRE_TOKEN` (the bearer `entire auth token` prints), and
 * optionally `ENTIRE_CORE_BASE_URL` and `ENTIRE_API_BASE_URL`.
 */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "ENTIRE_TOKEN environment variable is required",
        }),
    ),
  ),
);

/** Layer from a redacted bearer token + optional Core and cell base URLs. */
export const credentials = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly coreBaseUrl?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: config.token,
      coreBaseUrl: config.coreBaseUrl ?? DEFAULT_CORE_BASE_URL,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
