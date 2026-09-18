import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * Daytona credentials — hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, apiBaseUrl, analyticsBaseUrl,
 * toolboxBaseUrl, sandboxId?, organizationId? }` per request; the protocol
 * layer formats the `Authorization: Bearer <apiKey>` header from it. The
 * key is a Daytona API key from https://app.daytona.io/dashboard/keys.
 *
 * Daytona speaks from THREE endpoints:
 *
 *   • Platform  (`https://app.daytona.io/api`) — sandboxes, orgs, snapshots
 *   • Analytics (`https://analytics.app.daytona.io`) — telemetry and usage
 *   • Toolbox   (`https://proxy.app.daytona.io/toolbox/{sandboxId}`) —
 *     in-sandbox fs/git/process/computer-use. The sandbox id is part of
 *     the CLIENT configuration, not of any operation input: set `sandboxId`
 *     (or a fully-resolved `toolboxBaseUrl`) to call those services.
 *
 * The protocol picks the endpoint per request from the operation's route
 * (see protocol.ts). `DAYTONA_API_KEY` / `DAYTONA_API_URL` are what the
 * official SDKs read.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** Daytona Cloud's platform API root. */
export const DEFAULT_API_BASE_URL = "https://app.daytona.io/api";

/** Daytona Cloud's analytics API root. */
export const DEFAULT_ANALYTICS_BASE_URL = "https://analytics.app.daytona.io";

/**
 * Toolbox endpoint template. `{sandboxId}` is replaced with the configured
 * sandbox (the docs' `{toolboxProxyUrl}/{sandboxId}` form). Pass a fully
 * resolved URL — e.g. a sandbox's `toolboxProxyUrl` — to skip substitution.
 */
export const DEFAULT_TOOLBOX_BASE_URL = "https://proxy.app.daytona.io/toolbox/{sandboxId}";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly analyticsBaseUrl: string;
  readonly toolboxBaseUrl: string;
  /**
   * Sandbox scope for the toolbox services. Calling a toolbox operation
   * without a sandbox configured (and with a `{sandboxId}` template still
   * in `toolboxBaseUrl`) fails with `ConfigError`.
   */
  readonly sandboxId?: string;
  /**
   * Sent as `X-Daytona-Organization-ID` when set. Required with JWT auth
   * to pick an organization; API keys already carry one.
   */
  readonly organizationId?: string;
}

export class Credentials extends Context.Service<Credentials, Effect.Effect<Config>>()(
  "DaytonaCredentials",
) {}

const envConfig = EffectConfig.all({
  apiKey: EffectConfig.String("DAYTONA_API_KEY"),
  apiBaseUrl: EffectConfig.String("DAYTONA_API_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
  analyticsBaseUrl: EffectConfig.String("DAYTONA_ANALYTICS_URL").pipe(
    EffectConfig.withDefault(DEFAULT_ANALYTICS_BASE_URL),
  ),
  toolboxBaseUrl: EffectConfig.String("DAYTONA_TOOLBOX_URL").pipe(
    EffectConfig.withDefault(DEFAULT_TOOLBOX_BASE_URL),
  ),
  sandboxId: EffectConfig.String("DAYTONA_SANDBOX_ID").pipe(EffectConfig.option),
  organizationId: EffectConfig.String("DAYTONA_ORGANIZATION_ID").pipe(EffectConfig.option),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "DAYTONA_API_KEY environment variable is required",
        }),
    ),
    Effect.map(
      ({ apiKey, apiBaseUrl, analyticsBaseUrl, toolboxBaseUrl, sandboxId, organizationId }) => ({
        apiKey: Redacted.make(apiKey),
        apiBaseUrl,
        analyticsBaseUrl,
        toolboxBaseUrl,
        sandboxId: sandboxId._tag === "Some" ? sandboxId.value : undefined,
        organizationId: organizationId._tag === "Some" ? organizationId.value : undefined,
      }),
    ),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain API key + optional endpoints/scope. */
export const credentials = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
  readonly analyticsBaseUrl?: string;
  readonly toolboxBaseUrl?: string;
  readonly sandboxId?: string;
  readonly organizationId?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      analyticsBaseUrl: config.analyticsBaseUrl ?? DEFAULT_ANALYTICS_BASE_URL,
      toolboxBaseUrl: config.toolboxBaseUrl ?? DEFAULT_TOOLBOX_BASE_URL,
      sandboxId: config.sandboxId,
      organizationId: config.organizationId,
    }),
  );
