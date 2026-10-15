import * as EffectConfig from "@distilled.cloud/core/config";
/**
 * Turso credentials -- hand-written.
 *
 * API-compatible port of the distilled repo's turso credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials, so the protocol layer picks up rotations per request. Turso
 * auth is a plain bearer token (`Authorization: Bearer <apiKey>`).
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.turso.tech";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()("TursoCredentials") {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.String("TURSO_API_KEY"),
});

export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "TURSO_API_KEY environment variable is required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ apiKey }) => ({
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: DEFAULT_API_BASE_URL,
    })),
    Effect.orDie,
  ),
);
