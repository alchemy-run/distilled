/**
 * ACME credentials — hand-written.
 *
 * An ACME "credential" is the **account key**: a private JWK that signs
 * every request. The CA is addressed by its **directory URL** (Let's
 * Encrypt, ZeroSSL, Google Trust Services and Pebble differ only there),
 * plus, for CAs that require it, an **External Account Binding** (key id +
 * HMAC key from the CA's dashboard) presented once on `newAccount`.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials, so the protocol picks up a rotated key or a newly learned
 * account URL per request.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** Well-known ACME directories. */
export const Directories = {
  LetsEncrypt: "https://acme-v02.api.letsencrypt.org/directory",
  LetsEncryptStaging: "https://acme-staging-v02.api.letsencrypt.org/directory",
  ZeroSSL: "https://acme.zerossl.com/v2/DV90",
  GoogleTrustServices: "https://dv.acme-v02.api.pki.goog/directory",
  GoogleTrustServicesStaging: "https://dv.acme-v02.test-api.pki.goog/directory",
} as const;

export interface ExternalAccountBinding {
  /** The CA-issued EAB key id. */
  readonly keyId: string;
  /** The CA-issued base64url HMAC key. */
  readonly hmacKey: Redacted.Redacted<string>;
}

export interface Config {
  /** The CA's directory URL. */
  readonly directoryUrl: string;
  /**
   * The account's private key as a JSON Web Key (JSON text). ES256 (`EC`
   * P-256) by default; RS256 (`RSA`) is accepted.
   */
  readonly accountKey: Redacted.Redacted<string>;
  /**
   * The account URL the CA assigned (`Location` of `newAccount`). Sent as
   * `kid` on every request once known; `newAccount` uses the bare JWK.
   */
  readonly accountUrl?: string | undefined;
  /** EAB for CAs that require it (ZeroSSL, Google Trust Services). */
  readonly externalAccountBinding?: ExternalAccountBinding | undefined;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("AcmeCredentials") {}

/**
 * Credentials from the environment:
 *
 * - `ACME_DIRECTORY_URL` (default: Let's Encrypt production)
 * - `ACME_ACCOUNT_KEY` — the private JWK as JSON
 * - `ACME_ACCOUNT_URL` — optional, once the account exists
 * - `ACME_EAB_KID` / `ACME_EAB_HMAC_KEY` — optional EAB pair
 */
export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  EffectConfig.all({
    directoryUrl: EffectConfig.String("ACME_DIRECTORY_URL").pipe(
      EffectConfig.withDefault(Directories.LetsEncrypt),
    ),
    accountKey: EffectConfig.Redacted("ACME_ACCOUNT_KEY"),
    accountUrl: EffectConfig.option(EffectConfig.String("ACME_ACCOUNT_URL")),
    eabKid: EffectConfig.option(EffectConfig.String("ACME_EAB_KID")),
    eabHmac: EffectConfig.option(EffectConfig.Redacted("ACME_EAB_HMAC_KEY")),
  }).pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message:
            "ACME_ACCOUNT_KEY (a private JWK) is required; ACME_DIRECTORY_URL, ACME_ACCOUNT_URL, ACME_EAB_KID and ACME_EAB_HMAC_KEY are optional",
        }),
    ),
    Effect.map(
      ({ directoryUrl, accountKey, accountUrl, eabKid, eabHmac }): Config => ({
        directoryUrl,
        accountKey,
        accountUrl: Option.getOrUndefined(accountUrl),
        externalAccountBinding:
          Option.isSome(eabKid) && Option.isSome(eabHmac)
            ? { keyId: eabKid.value, hmacKey: eabHmac.value }
            : undefined,
      }),
    ),
    Effect.orDie,
  ),
);

/** A fixed credentials layer (tests, and consumers that manage keys themselves). */
export const layer = (config: Config | Effect.Effect<Config>) =>
  Layer.succeed(
    Credentials,
    Effect.isEffect(config) ? config : Effect.succeed(config),
  );
