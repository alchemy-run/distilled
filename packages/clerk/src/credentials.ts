import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * Clerk credentials -- hand-written.
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

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
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
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ Effect.gen(function* () {
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
  }),
);

/**
 * Default Platform API host, matching Clerk's CLERK_PLATFORM_API_URL setting.
 * The Platform protocol appends /v1 when it is not already present.
 */
export const DEFAULT_PLATFORM_API_BASE_URL = "https://api.clerk.com";

/**
 * A supplied Platform bearer access token and its API host or /v1 base URL.
 */
export interface PlatformConfig {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

/**
 * Resolves Platform credentials per request, independently of Backend credentials.
 */
export class PlatformCredentials
  extends /*@__PURE__*/ Context.Service<
    PlatformCredentials,
    Effect.Effect<PlatformConfig, ConfigError>
  >()("ClerkPlatformCredentials") {}

/**
 * Builds a Platform credential layer from a redacted bearer token and optional URL.
 * @param config - Platform token and optional host or /v1 base URL.
 * @returns A layer providing Platform credentials only.
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
 * Reads CLERK_PLATFORM_API_KEY and optional CLERK_PLATFORM_API_URL per request.
 * Missing or unreadable configuration fails with ConfigError; tokens stay redacted.
 */
export const PlatformCredentialsFromEnv: Layer.Layer<PlatformCredentials> =
  /*@__PURE__*/ Layer.succeed(
    PlatformCredentials,
    /*@__PURE__*/ EffectConfig.all({
      apiKey: /*@__PURE__*/ EffectConfig.Redacted("CLERK_PLATFORM_API_KEY"),
      apiBaseUrl: /*@__PURE__*/ EffectConfig.String("CLERK_PLATFORM_API_URL").pipe(
        /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_PLATFORM_API_BASE_URL),
      ),
    }).pipe(
      /*@__PURE__*/ Effect.mapError(
        () =>
          new ConfigError({
            message: "Unable to read CLERK_PLATFORM_API_KEY or CLERK_PLATFORM_API_URL",
          }),
      ),
      /*@__PURE__*/ Effect.map(({ apiKey, apiBaseUrl }) => ({
        apiKey,
        apiBaseUrl: apiBaseUrl || DEFAULT_PLATFORM_API_BASE_URL,
      })),
    ),
  );
