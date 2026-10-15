/**
 * Prisma credentials -- hand-written.
 *
 * API-compatible port of the distilled repo's prisma credentials
 * module: the `Credentials` service holds an *effect* that resolves the
 * current credentials on every request. Auth is a single bearer token
 * (`Authorization: Bearer <apiToken>`) against `https://api.prisma.io`.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.prisma.io";

export interface Config {
  readonly apiToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError, never>>()(
    "PrismaCredentials",
  ) {}

/** Layer from a redacted token + optional base URL. */
export const fromApiToken = (config: {
  readonly apiToken: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiToken: config.apiToken,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiToken: /*@__PURE__*/ EffectConfig.Redacted("PRISMA_API_TOKEN").pipe(
    /*@__PURE__*/ EffectConfig.orElse(() => EffectConfig.Redacted("PRISMA_POSTGRES_API_TOKEN")),
  ),
});

/**
 * Layer resolving credentials from `PRISMA_API_TOKEN`, with
 * `PRISMA_POSTGRES_API_TOKEN` as a backwards-compatible fallback.
 * The base URL is fixed to {@link DEFAULT_API_BASE_URL}.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message:
            "PRISMA_API_TOKEN (or PRISMA_POSTGRES_API_TOKEN) environment variable is required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ apiToken }) => ({
      apiToken,
      apiBaseUrl: DEFAULT_API_BASE_URL,
    })),
  ),
);
