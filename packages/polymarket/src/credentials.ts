/**
 * Polymarket credentials -- hand-written.
 *
 * The `Credentials` service holds an effect that resolves the current
 * configuration on every request. Every part is optional: Gamma, Data,
 * Bridge and most CLOB, Relayer and Perps reads are public, so an empty
 * configuration is a working one.
 *
 * - `clob`: L2 API credentials (`apiKey`, `secret`, `passphrase`) plus the
 *   signer `address`. When set, every CLOB and Combos RFQ request carries
 *   the five `POLY_*` L2 headers, signed with HMAC-SHA256 (see
 *   `signing.ts`). Creating or deriving them needs an L1 (EIP-712) wallet
 *   signature, which this SDK does not produce.
 * - `relayer`: a relayer API key, sent as `RELAYER_API_KEY` and
 *   `RELAYER_API_KEY_ADDRESS`.
 * - `perps`: a Perps proxy session, sent as `POLYMARKET-PROXY` and
 *   `POLYMARKET-SECRET`.
 *
 * Each API has its own host (`baseUrls`); the defaults are the production
 * servers each OpenAPI document declares.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as Redacted from "effect/Redacted";

/** Production hosts, from each document's `servers`. */
export const DEFAULT_BASE_URLS: BaseUrls = {
  gamma: "https://gamma-api.polymarket.com",
  clob: "https://clob.polymarket.com",
  data: "https://data-api.polymarket.com",
  relayer: "https://relayer-v2.polymarket.com",
  bridge: "https://bridge.polymarket.com",
  combosRfq: "https://combos-rfq-api.polymarket.com",
  perps: "https://api.perpetuals.polymarket.com",
};

export interface BaseUrls {
  readonly gamma: string;
  readonly clob: string;
  readonly data: string;
  readonly relayer: string;
  readonly bridge: string;
  readonly combosRfq: string;
  readonly perps: string;
}

/** CLOB L2 API credentials, as returned by `clob.createApiKey`. */
export interface ClobCredentials {
  /** Polygon signer address that owns the API key (`POLY_ADDRESS`). */
  readonly address: string;
  readonly apiKey: Redacted.Redacted<string>;
  /** Base64 HMAC key. */
  readonly secret: Redacted.Redacted<string>;
  readonly passphrase: Redacted.Redacted<string>;
}

/** Relayer API key auth. */
export interface RelayerCredentials {
  /** Address that owns the key (`RELAYER_API_KEY_ADDRESS`). */
  readonly address: string;
  readonly apiKey: Redacted.Redacted<string>;
}

/** Perps proxy session, as returned by `perps.createProxy`. */
export interface PerpsCredentials {
  /** Proxy address (`POLYMARKET-PROXY`). */
  readonly proxy: string;
  readonly secret: Redacted.Redacted<string>;
}

export interface Config {
  readonly clob?: ClobCredentials;
  readonly relayer?: RelayerCredentials;
  readonly perps?: PerpsCredentials;
  readonly baseUrls: BaseUrls;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "PolymarketCredentials",
  ) {}

const optionalString = (name: string) =>
  EffectConfig.String(name).pipe(EffectConfig.option, EffectConfig.map(Option.getOrUndefined));
const optionalRedacted = (name: string) =>
  EffectConfig.Redacted(name).pipe(EffectConfig.option, EffectConfig.map(Option.getOrUndefined));

/**
 * Names mirror the official clients (`CLOB_API_KEY`, `CLOB_SECRET`,
 * `CLOB_PASS_PHRASE`, `CLOB_API_URL`) and, where they have none, the header
 * each value is sent in.
 */
const envConfig = /*@__PURE__*/ EffectConfig.all({
  clobAddress: /*@__PURE__*/ optionalString("POLY_ADDRESS"),
  clobApiKey: /*@__PURE__*/ optionalRedacted("CLOB_API_KEY"),
  clobSecret: /*@__PURE__*/ optionalRedacted("CLOB_SECRET"),
  clobPassphrase: /*@__PURE__*/ optionalRedacted("CLOB_PASS_PHRASE"),
  clobBaseUrl: /*@__PURE__*/ optionalString("CLOB_API_URL"),
  relayerApiKey: /*@__PURE__*/ optionalRedacted("RELAYER_API_KEY"),
  relayerAddress: /*@__PURE__*/ optionalString("RELAYER_API_KEY_ADDRESS"),
  perpsProxy: /*@__PURE__*/ optionalString("POLYMARKET_PROXY"),
  perpsSecret: /*@__PURE__*/ optionalRedacted("POLYMARKET_SECRET"),
});

type Group<A> = { readonly [K in keyof A]: A[K] | undefined };

/**
 * All of a group's values, none of them, or a `ConfigError` naming the
 * missing variables.
 */
const group = <A extends object>(
  label: string,
  values: Group<A>,
  envNames: { readonly [K in keyof A]: string },
): Effect.Effect<A | undefined, ConfigError> => {
  const keys = Object.keys(values) as Array<keyof A & string>;
  const missing = keys.filter((k) => values[k] === undefined);
  if (missing.length === keys.length) return Effect.succeed(undefined);
  if (missing.length === 0) return Effect.succeed(values as A);
  return Effect.fail(
    new ConfigError({
      message: `Polymarket ${label} credentials are incomplete: set ${missing
        .map((k) => envNames[k])
        .join(", ")}`,
      key: envNames[missing[0]!],
    }),
  );
};

export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () => new ConfigError({ message: "Could not read the Polymarket environment variables" }),
    ),
    /*@__PURE__*/ Effect.flatMap((env) =>
      Effect.all({
        clob: group<ClobCredentials>(
          "CLOB",
          {
            address: env.clobAddress,
            apiKey: env.clobApiKey,
            secret: env.clobSecret,
            passphrase: env.clobPassphrase,
          },
          {
            address: "POLY_ADDRESS",
            apiKey: "CLOB_API_KEY",
            secret: "CLOB_SECRET",
            passphrase: "CLOB_PASS_PHRASE",
          },
        ),
        relayer: group<RelayerCredentials>(
          "relayer",
          { address: env.relayerAddress, apiKey: env.relayerApiKey },
          { address: "RELAYER_API_KEY_ADDRESS", apiKey: "RELAYER_API_KEY" },
        ),
        perps: group<PerpsCredentials>(
          "Perps",
          { proxy: env.perpsProxy, secret: env.perpsSecret },
          { proxy: "POLYMARKET_PROXY", secret: "POLYMARKET_SECRET" },
        ),
      }).pipe(
        Effect.map(({ clob, relayer, perps }): Config => ({
          clob,
          relayer,
          perps,
          baseUrls:
            env.clobBaseUrl === undefined
              ? DEFAULT_BASE_URLS
              : { ...DEFAULT_BASE_URLS, clob: env.clobBaseUrl },
        })),
      ),
    ),
  ),
);

/** Credentials from values, e.g. L2 keys held in a secret store. */
export const credentials = (config: {
  readonly clob?: ClobCredentials;
  readonly relayer?: RelayerCredentials;
  readonly perps?: PerpsCredentials;
  readonly baseUrls?: Partial<BaseUrls>;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      clob: config.clob,
      relayer: config.relayer,
      perps: config.perps,
      baseUrls: { ...DEFAULT_BASE_URLS, ...config.baseUrls },
    }),
  );

/** Public endpoints only: no credentials, production hosts. */
export const PublicCredentials: Layer.Layer<Credentials> = /*@__PURE__*/ credentials({});
