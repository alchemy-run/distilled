/**
 * WorkOS credentials -- hand-written.
 *
 * Port of the distilled v0 workos credentials module: the `Credentials`
 * service resolves `{ apiKey, apiBaseUrl }` per request; the protocol
 * formats the `Authorization: Bearer <apiKey>` header from it.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/**
 * WorkOS production API base URL.
 *
 * The staging environment is reachable at https://api.workos-test.com -- set
 * the `WORKOS_API_URL` environment variable to override the default.
 */
export const DEFAULT_API_BASE_URL = "https://api.workos.com";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "WorkosCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.String("WORKOS_API_KEY"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("WORKOS_API_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/**
 * Its configuration is read and checked once, when the layer is built: a
 * problem there fails the layer with `ConfigError`.
 */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.effect(
  Credentials,
  /*@__PURE__*/ Effect.map(
    /*@__PURE__*/ envConfig.pipe(
      /*@__PURE__*/ Effect.mapError(
        () =>
          new ConfigError({
            message: "WORKOS_API_KEY environment variable is required",
          }),
      ),
      /*@__PURE__*/ Effect.map(({ apiKey, apiBaseUrl }) => ({
        apiKey: Redacted.make(apiKey),
        apiBaseUrl,
      })),
    ),
    (config) => Effect.succeed(config),
  ),
);

/** Convenience layer from a redacted API key + optional base URL. */
export const credentials = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
