/**
 * STACKIT credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, region }` per request; the
 * protocol layer formats the `Authorization: Bearer <token>` header from it
 * and rewrites each operation's spec `servers` URL for the region. The token
 * is a STACKIT service-account access token — the same value the official
 * Go SDK, CLI and Terraform provider read from
 * `STACKIT_SERVICE_ACCOUNT_TOKEN`. Key-file exchange
 * (`STACKIT_SERVICE_ACCOUNT_KEY_PATH`) is not modelled: mint the token
 * outside the SDK.
 *
 * Each STACKIT product has its own host (`iaas.api.eu01.stackit.cloud`,
 * `ske.api.eu01.stackit.cloud`, …). The per-operation host is baked into
 * the generated `T.Http` trait from the OpenAPI `servers` entry; `region`
 * (default `eu01`) is substituted at request time. An explicit `apiBaseUrl`
 * overrides that host for every call — a proxy, not a per-product map.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** STACKIT's primary public region (Schwarz IT / Germany). */
export const DEFAULT_REGION = "eu01";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  /**
   * Region inserted into product hosts (`eu01` →
   * `https://iaas.api.eu01.stackit.cloud`). `"global"` leaves the spec URL
   * unchanged.
   */
  readonly region: string;
  /** When set, every operation uses this host instead of the spec's. */
  readonly apiBaseUrl?: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("StackitCredentials") {}

const envConfig = EffectConfig.all({
  // `STACKIT_SERVICE_ACCOUNT_TOKEN` / `STACKIT_REGION` are what the
  // official Go SDK, CLI and Terraform provider read.
  token: EffectConfig.String("STACKIT_SERVICE_ACCOUNT_TOKEN"),
  region: EffectConfig.String("STACKIT_REGION").pipe(
    EffectConfig.withDefault(DEFAULT_REGION),
  ),
  apiBaseUrl: EffectConfig.String("STACKIT_API_BASE_URL").pipe(
    EffectConfig.option,
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message:
            "STACKIT_SERVICE_ACCOUNT_TOKEN environment variable is required",
        }),
    ),
    Effect.map(({ token, region, apiBaseUrl }) => ({
      token: Redacted.make(token),
      region,
      apiBaseUrl: apiBaseUrl._tag === "Some" ? apiBaseUrl.value : undefined,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain token + optional region / base URL. */
export const credentials = (config: {
  readonly token: string;
  readonly region?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: Redacted.make(config.token),
      region: config.region ?? DEFAULT_REGION,
      apiBaseUrl: config.apiBaseUrl,
    }),
  );
