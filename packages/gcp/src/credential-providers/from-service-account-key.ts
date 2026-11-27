/**
 * A service account key (AIP-4112): a JWT signed with the key's RS256
 * private key is exchanged for an access token at the key's `token_uri`
 * (the OAuth 2.0 JWT bearer grant). Signs with WebCrypto, so it runs in
 * Node, Bun, workers and browsers.
 */
import { fromBase64, toBase64Url } from "@distilled.cloud/core/base64";
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  type Credentials,
  createRefreshingProvider,
  type ProviderOverrides,
  type TokenSource,
} from "../credentials-service.ts";
import { GCPCredentialsError } from "../errors.ts";
import { exchangeJwtBearer, jwtBearerClaims, OAUTH_TOKEN_URL } from "./oauth.ts";

export interface ServiceAccountKeyConfig extends ProviderOverrides {
  /** The key file's `client_email`. */
  readonly clientEmail: string;
  /** The key file's `private_key`: a PKCS #8 PEM. */
  readonly privateKey: Redacted.Redacted<string>;
  /** The key file's `private_key_id`, sent as the JWT `kid`. */
  readonly privateKeyId?: string;
  /** Defaults to `https://www.googleapis.com/auth/cloud-platform`. */
  readonly scopes?: ReadonlyArray<string>;
  /** The key file's `token_uri`; defaults to `https://oauth2.googleapis.com/token`. */
  readonly tokenUrl?: string;
  /**
   * Email of a Google Workspace user to act as (domain-wide delegation),
   * sent as the JWT `sub`. A Workspace admin must allow the service
   * account's client ID for `scopes`. Use one layer per user: each layer
   * caches its own token.
   */
  readonly subject?: string;
}

const signAssertion = (
  config: ServiceAccountKeyConfig,
  tokenUrl: string,
  issuedAtSeconds: number,
): Effect.Effect<string, GCPCredentialsError> =>
  Effect.tryPromise({
    try: async () => {
      const pem = Redacted.value(config.privateKey)
        .replace(/-----(BEGIN|END) PRIVATE KEY-----/g, "")
        .replace(/\s+/g, "");
      // `undefined` for a key that is not base64: `importKey` rejects it,
      // and the catch below reports it.
      const der = fromBase64(pem) as Uint8Array<ArrayBuffer>;
      const key = await crypto.subtle.importKey(
        "pkcs8",
        der,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const header = {
        alg: "RS256",
        typ: "JWT",
        ...(config.privateKeyId && { kid: config.privateKeyId }),
      };
      const claims = jwtBearerClaims({ ...config, tokenUrl }, issuedAtSeconds);
      const signingInput = `${toBase64Url(JSON.stringify(header))}.${toBase64Url(JSON.stringify(claims))}`;
      const signature = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        key,
        new TextEncoder().encode(signingInput),
      );
      return `${signingInput}.${toBase64Url(new Uint8Array(signature))}`;
    },
    // The cause can quote key material, so it is not attached.
    catch: () =>
      new GCPCredentialsError({
        message: `Could not sign a JWT with the private key of ${config.clientEmail}; it must be an RSA key in PKCS #8 PEM form.`,
      }),
  });

/** The token source behind {@link fromServiceAccountKey}. */
export const serviceAccountKeySource = (config: ServiceAccountKeyConfig): TokenSource =>
  Effect.gen(function* () {
    const step = `Exchanging the key of ${config.clientEmail} for an access token`;
    const tokenUrl = config.tokenUrl ?? OAUTH_TOKEN_URL;
    const issuedAt = Date.now();
    const assertion = yield* signAssertion(config, tokenUrl, Math.floor(issuedAt / 1000));
    return yield* exchangeJwtBearer(step, tokenUrl, assertion, issuedAt);
  });

/**
 * Credentials from a service account key, minted again five minutes
 * before each access token expires. Prefer `fromApplicationDefault`,
 * `fromWorkloadIdentity` or `fromImpersonatedServiceAccount` where you
 * can: they need no long-lived key.
 */
export const fromServiceAccountKey = (config: ServiceAccountKeyConfig): Layer.Layer<Credentials> =>
  createRefreshingProvider(serviceAccountKeySource(config), config);
