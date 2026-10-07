/**
 * A service account key (AIP-4112): a JWT signed with the key's RS256
 * private key is exchanged for an access token at the key's `token_uri`
 * (the OAuth 2.0 JWT bearer grant). Signs with WebCrypto, so it runs in
 * Node, Bun, workers and browsers.
 */
import * as Effect from "effect/Effect";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  type Credentials,
  createRefreshingProvider,
  type ProviderOverrides,
  type TokenSource,
} from "../credentials-service.ts";
import { GCPCredentialsError } from "../errors.ts";
import { CLOUD_PLATFORM_SCOPE, OAUTH_TOKEN_URL, oauthToken, requestJson } from "./oauth.ts";

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
}

const base64url = (bytes: Uint8Array | string): string => {
  const raw = typeof bytes === "string" ? new TextEncoder().encode(bytes) : bytes;
  let binary = "";
  for (const byte of raw) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

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
      const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
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
      const claims = {
        iss: config.clientEmail,
        scope: (config.scopes ?? [CLOUD_PLATFORM_SCOPE]).join(" "),
        aud: tokenUrl,
        iat: issuedAtSeconds,
        exp: issuedAtSeconds + 3600,
      };
      const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
      const signature = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        key,
        new TextEncoder().encode(signingInput),
      );
      return `${signingInput}.${base64url(new Uint8Array(signature))}`;
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
    const body = yield* requestJson(
      step,
      HttpClientRequest.post(tokenUrl).pipe(
        HttpClientRequest.bodyUrlParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion,
        }),
      ),
    );
    return yield* oauthToken(step, body, issuedAt);
  });

/**
 * Credentials from a service account key, minted again five minutes
 * before each access token expires. Prefer `fromApplicationDefault` or
 * `fromWorkloadIdentity` where you can: they need no long-lived key.
 */
export const fromServiceAccountKey = (config: ServiceAccountKeyConfig): Layer.Layer<Credentials> =>
  createRefreshingProvider(serviceAccountKeySource(config), config);
