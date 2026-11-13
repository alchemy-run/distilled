/**
 * Convex credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials, so the protocol layer picks up rotations per request.
 *
 * Convex speaks from two places. The Management API lives at
 * `https://api.convex.dev/v1`. The Deployment API and the public HTTP API
 * live on each deployment's own URL, so the deployment is part of the client
 * configuration, not of any operation input: set `deploymentUrl` to call the
 * `deployment` and `functions` services.
 *
 * `token` is a team access token for the Management API, and a team access
 * token, deploy key or self-hosted admin key for the Deployment API. The
 * public API takes no token.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.convex.dev/v1";

export interface Config {
  readonly token?: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /** The deployment's URL, such as `https://happy-otter-123.convex.cloud`. */
  readonly deploymentUrl?: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "ConvexCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  token: /*@__PURE__*/ EffectConfig.Redacted("CONVEX_ACCESS_TOKEN"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("CONVEX_API_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/** Reads `CONVEX_ACCESS_TOKEN`, and `CONVEX_API_BASE_URL` when set. */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "CONVEX_ACCESS_TOKEN environment variable is required",
        }),
    ),
  ),
);

/** Credentials for the Management API from a team access token. */
export const fromToken = (token: Redacted.Redacted<string>) =>
  Layer.succeed(Credentials, Effect.succeed({ token, apiBaseUrl: DEFAULT_API_BASE_URL }));

/**
 * Credentials for one deployment's `deployment` and `functions` services. The
 * public API needs only `url`.
 */
export const fromDeployment = (input: {
  readonly url: string;
  readonly token?: Redacted.Redacted<string>;
}) =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: input.token,
      apiBaseUrl: DEFAULT_API_BASE_URL,
      deploymentUrl: input.url,
    }),
  );
