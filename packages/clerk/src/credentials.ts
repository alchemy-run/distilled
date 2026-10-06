import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * Clerk credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Clerk authenticates Backend API calls with a
 * secret key as `Authorization: Bearer <secret>` and versions the API with
 * the `Clerk-API-Version` header.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.clerk.com/v1";
/** Dated Backend API version this package is generated against. */
export const DEFAULT_API_VERSION = "2026-05-12";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly apiVersion: string;
}

export class Credentials extends Context.Service<Credentials, Effect.Effect<Config>>()(
  "ClerkCredentials",
) {}

/** Layer from a redacted secret key + optional base URL and API version. */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly apiVersion?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      apiVersion: config.apiVersion ?? DEFAULT_API_VERSION,
    }),
  );

/** Reads CLERK_SECRET_KEY (required), CLERK_API_BASE_URL, CLERK_API_VERSION. */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.CLERK_SECRET_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "CLERK_SECRET_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.CLERK_API_BASE_URL ?? DEFAULT_API_BASE_URL,
      apiVersion: process.env.CLERK_API_VERSION ?? DEFAULT_API_VERSION,
    };
  }).pipe(Effect.orDie),
);

/**
 * Default Platform API host. Host-only, matching Clerk's CLI
 * (`CLERK_PLATFORM_API_URL`); the Platform protocol appends `/v1` (a base
 * URL that already ends in `/v1` is accepted too).
 */
export const DEFAULT_PLATFORM_API_BASE_URL = "https://api.clerk.com";

/**
 * Resolved Platform API credentials: a workspace (`ak_`) key and the
 * host-only API base URL.
 */
export interface PlatformConfig {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

/**
 * Platform API credentials, separate from the Backend API {@link Credentials}
 * so a workspace key can never be sent to an instance endpoint, or an
 * instance secret key to a Platform endpoint. Like {@link Credentials} it
 * holds an effect resolved on every request.
 */
export class PlatformCredentials extends Context.Service<
  PlatformCredentials,
  Effect.Effect<PlatformConfig>
>()("ClerkPlatformCredentials") {}

/**
 * Layer from a redacted Platform API key + optional host-only base URL
 * (default {@link DEFAULT_PLATFORM_API_BASE_URL}; an empty string also means
 * the default).
 */
export const platformFromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<PlatformCredentials> =>
  Layer.succeed(
    PlatformCredentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl || DEFAULT_PLATFORM_API_BASE_URL,
    }),
  );

/**
 * Reads CLERK_PLATFORM_API_KEY (required) and CLERK_PLATFORM_API_URL
 * (optional, host-only), the same variables Clerk's CLI uses.
 */
export const PlatformCredentialsFromEnv: Layer.Layer<PlatformCredentials> = Layer.succeed(
  PlatformCredentials,
  Effect.gen(function* () {
    const apiKey = process.env.CLERK_PLATFORM_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "CLERK_PLATFORM_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      // `||`: an empty CLERK_PLATFORM_API_URL means unset, not a relative URL.
      apiBaseUrl: process.env.CLERK_PLATFORM_API_URL || DEFAULT_PLATFORM_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
