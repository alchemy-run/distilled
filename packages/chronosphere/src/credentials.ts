import { ConfigError } from "@distilled.cloud/core/errors";
import { originFromConfig } from "@distilled.cloud/core/protocol-http";
/**
 * Chronosphere credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol resolves it per request
 * on the calling fiber).
 *
 * Chronosphere authenticates Config API requests with an API token
 * (`API-Token` header, also accepted as `Authorization: Bearer`). The
 * instance origin is tenant-specific (`https://<instance>.chronosphere.io`).
 *
 * A layer here reads and checks its configuration when it is built: a
 * missing variable or an instance that is more than a host is a
 * `ConfigError` at setup, and no call fails for it.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /**
   * Optional actor shown in version history on config-mutating APIs
   * (`Chronosphere-Actor` header).
   */
  readonly actor?: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "ChronosphereCredentials",
  ) {}

/**
 * Turn an instance name (`acme`), host or origin into `https://<host>`. It
 * picks the host only, so a value with a path, query or user fails with
 * `ConfigError` (core `originFromConfig`).
 */
const originFrom = (value: string): Effect.Effect<string, ConfigError> => {
  const trimmed = value.replace(/\/+$/, "");
  const origin = originFromConfig(
    "Chronosphere instance",
    /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) || trimmed.includes(".")
      ? trimmed
      : `${trimmed}.chronosphere.io`,
  );
  return typeof origin === "string" ? Effect.succeed(origin) : Effect.fail(origin);
};

/** A layer that resolves and checks `config` once, when it is built. */
const layer = (config: Effect.Effect<Config, ConfigError>): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(config, (resolved) => Effect.succeed(resolved)),
  );

/**
 * Layer from a redacted API token + instance origin, which is checked when
 * the layer is built.
 */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly actor?: string;
}): Layer.Layer<Credentials, ConfigError> =>
  layer(
    Effect.map(originFrom(config.apiBaseUrl), (apiBaseUrl) => ({
      apiKey: config.apiKey,
      apiBaseUrl,
      actor: config.actor,
    })),
  );

/**
 * Reads CHRONOSPHERE_API_TOKEN (required) and either
 * CHRONOSPHERE_API_BASE_URL or CHRONOSPHERE_DOMAIN (required).
 * CHRONOSPHERE_ACTOR is optional. The environment is read, and the instance
 * checked, once: when the layer is built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ layer(
  /*@__PURE__*/ Effect.gen(function* () {
    const apiKey = process.env.CHRONOSPHERE_API_TOKEN;
    const domain = process.env.CHRONOSPHERE_API_BASE_URL ?? process.env.CHRONOSPHERE_DOMAIN;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "CHRONOSPHERE_API_TOKEN environment variable is required",
      });
    }
    if (!domain) {
      return yield* new ConfigError({
        message:
          "CHRONOSPHERE_API_BASE_URL or CHRONOSPHERE_DOMAIN environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: yield* originFrom(domain),
      actor: process.env.CHRONOSPHERE_ACTOR,
    };
  }),
);
