/**
 * Fly.io credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request. The protocol layer resolves it per request
 * and formats the `Authorization` header.
 *
 * Alchemy and `flyctl` read `FLY_API_TOKEN`. `FLY_IO_API_KEY` is kept as a
 * fallback for older distilled consumers. Optional `FLY_API_HOSTNAME`
 * overrides the Machines API host (default `https://api.machines.dev`).
 *
 * Managed REST (MPG), GraphQL add-ons (Tigris, Redis), and Sprites all
 * reuse this token. Sprites never reads a separate env var: the protocol
 * mints a Sprites bearer from `FLY_API_TOKEN` (see `SpritesProtocol`).
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/**
 * Machines API host. The generated Machines routes carry the `/v1` prefix
 * (`/v1/apps/{app_name}/machines`), as the upstream OpenAPI spells them, so
 * the base URL must not.
 */
export const DEFAULT_API_BASE_URL = "https://api.machines.dev";

/** UI-EX REST + GraphQL host (MPG, Tigris, Redis). Not overridable via an invented env var. */
export const DEFAULT_FLY_API_BASE_URL = "https://api.fly.io";

/** Sprites REST root. Auth is a bearer minted from `FLY_API_TOKEN` — never `SPRITES_TOKEN`. */
export const DEFAULT_SPRITES_API_BASE_URL = "https://api.sprites.dev/v1";

/**
 * Normalize a Fly API hostname into the Machines API base URL.
 *
 * - unset / empty → `https://api.machines.dev`
 * - trailing slashes stripped
 * - a trailing `/v1` is dropped: `flyctl` and older consumers set
 *   `FLY_API_HOSTNAME` to the `/v1` root, and the routes already carry it
 */
export const normalizeApiBaseUrl = (hostname?: string): string => {
  if (hostname === undefined) return DEFAULT_API_BASE_URL;
  const trimmed = hostname.trim().replace(/\/+$/, "");
  if (trimmed.length === 0) return DEFAULT_API_BASE_URL;
  return trimmed.endsWith("/v1") ? trimmed.slice(0, -3) : trimmed;
};

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("Fly-ioCredentials") {}

const envConfig = EffectConfig.all({
  apiKey: EffectConfig.string("FLY_API_TOKEN").pipe(
    EffectConfig.orElse(() => EffectConfig.string("FLY_IO_API_KEY")),
  ),
  apiBaseUrl: EffectConfig.string("FLY_API_HOSTNAME").pipe(
    EffectConfig.withDefault(""),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message:
            "FLY_API_TOKEN (or FLY_IO_API_KEY) environment variable is required",
        }),
    ),
    Effect.map(({ apiKey, apiBaseUrl }) => ({
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: normalizeApiBaseUrl(apiBaseUrl || undefined),
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain API token + optional base URL. */
export const credentials = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: normalizeApiBaseUrl(config.apiBaseUrl),
    }),
  );
