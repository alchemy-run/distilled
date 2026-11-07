/**
 * GitHub App authentication -- hand-written.
 *
 * A GitHub App authenticates in two steps
 * (https://docs.github.com/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app):
 *
 * 1. As the App itself, with a short-lived JWT signed by the App's private
 *    key ({@link appJwt}, {@link appCredentials}). This reaches the
 *    App-level endpoints: `apps.getAuthenticated`, `apps.listInstallations`,
 *    `apps.createInstallationAccessToken`.
 * 2. As one installation, with an installation access token the App mints
 *    using that JWT ({@link installationCredentials}). The token lasts an
 *    hour and reaches what the installation was granted.
 *
 * Both layers mint on the first request, reuse the result, and mint again
 * shortly before it expires; concurrent requests share one mint. Signing uses
 * WebCrypto, so it runs in Node, Bun, workers and browsers.
 *
 * @example
 * ```ts
 * import * as GitHub from "@distilled.cloud/github";
 * import * as App from "@distilled.cloud/github/App";
 *
 * const issue = GitHub.issues.get({ owner, repo, issue_number: 1 }).pipe(
 *   Effect.provide(
 *     App.installationCredentials({
 *       appId: "123456",
 *       privateKey: Redacted.make(pem),
 *       installationId: 7890,
 *     }),
 *   ),
 * );
 * ```
 */
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Semaphore from "effect/Semaphore";
import {
  type Config,
  Credentials,
  DEFAULT_API_BASE_URL,
  DEFAULT_USER_AGENT,
} from "./credentials.ts";
import { GithubAppAuthError } from "./errors.ts";
import { type AppPermissions, createInstallationAccessToken } from "./services/apps.ts";

export interface AppConfig {
  /**
   * The App's id, or its client id (`Iv1.<hex>`). Either identifies the App as
   * the JWT's issuer.
   */
  readonly appId: string | number;
  /**
   * The App's private key as GitHub issues it: a PEM, either PKCS #1
   * (`-----BEGIN RSA PRIVATE KEY-----`) or PKCS #8
   * (`-----BEGIN PRIVATE KEY-----`).
   */
  readonly privateKey: Redacted.Redacted<string>;
  /** Defaults to `https://api.github.com`; GHES uses `https://HOSTNAME/api/v3`. */
  readonly apiBaseUrl?: string;
  readonly userAgent?: string;
}

export interface InstallationConfig extends AppConfig {
  /** The installation to act as. */
  readonly installationId: number;
  /** Narrow the token to these repositories, by name. */
  readonly repositories?: ReadonlyArray<string>;
  /** Narrow the token to these repositories, by id. */
  readonly repositoryIds?: ReadonlyArray<number>;
  /** Narrow the token to these permissions (a subset of the installation's). */
  readonly permissions?: AppPermissions;
}

// =============================================================================
// JWT
// =============================================================================

/**
 * GitHub accepts a JWT that expires at most ten minutes after it was issued,
 * and suggests backdating `iat` a minute against clock drift.
 */
const JWT_BACKDATE_SECONDS = 60;
const JWT_LIFETIME_SECONDS = 9 * 60;

const encoder = /*@__PURE__*/ new TextEncoder();

const base64url = (bytes: Uint8Array): string => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/** A DER length: short form below 128, else long form. */
const derLength = (length: number): number[] => {
  if (length < 0x80) return [length];
  const bytes: number[] = [];
  for (let n = length; n > 0; n = Math.floor(n / 256)) bytes.unshift(n % 256);
  return [0x80 | bytes.length, ...bytes];
};

const der = (tag: number, content: ReadonlyArray<number> | Uint8Array): number[] => [
  tag,
  ...derLength(content.length),
  ...content,
];

/**
 * `AlgorithmIdentifier { rsaEncryption, NULL }` and `version 0`: the fixed
 * parts of a PKCS #8 `PrivateKeyInfo` wrapping an RSA key (RFC 5208).
 */
const PKCS8_VERSION = [0x02, 0x01, 0x00];
const RSA_ALGORITHM = /*@__PURE__*/ der(
  0x30,
  [0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00],
);

/**
 * The DER bytes of a PKCS #8 RSA key. A PKCS #1 key (what GitHub issues) is
 * wrapped in a `PrivateKeyInfo`, since WebCrypto imports only PKCS #8.
 */
const pkcs8Der = (pem: string): Uint8Array | undefined => {
  const match = /-----BEGIN (RSA )?PRIVATE KEY-----([\s\S]+?)-----END (RSA )?PRIVATE KEY-----/.exec(
    pem,
  );
  if (!match) return undefined;
  const body = Uint8Array.from(atob(match[2]!.replace(/\s+/g, "")), (c) => c.charCodeAt(0));
  if (!match[1]) return body;
  return Uint8Array.from(der(0x30, [...PKCS8_VERSION, ...RSA_ALGORITHM, ...der(0x04, body)]));
};

/**
 * Sign the App's JWT: RS256, `iss` the App, `iat` backdated a minute, `exp`
 * nine minutes out. Use it as the bearer token for App-level endpoints, or
 * let {@link appCredentials} mint and refresh it.
 */
export const appJwt = (
  config: Pick<AppConfig, "appId" | "privateKey">,
): Effect.Effect<Redacted.Redacted<string>, GithubAppAuthError> =>
  Effect.suspend(() => {
    const issuedAt = Math.floor(Date.now() / 1000) - JWT_BACKDATE_SECONDS;
    return signJwt(config, issuedAt);
  });

const signJwt = (
  config: Pick<AppConfig, "appId" | "privateKey">,
  issuedAt: number,
): Effect.Effect<Redacted.Redacted<string>, GithubAppAuthError> => {
  const key = pkcs8Der(Redacted.value(config.privateKey));
  if (key === undefined) {
    return Effect.fail(
      new GithubAppAuthError({
        message: `The private key of GitHub App ${config.appId} is not a PEM-encoded RSA private key.`,
      }),
    );
  }
  const header = base64url(encoder.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const claims = base64url(
    encoder.encode(
      JSON.stringify({
        iss: String(config.appId),
        iat: issuedAt,
        exp: issuedAt + JWT_BACKDATE_SECONDS + JWT_LIFETIME_SECONDS,
      }),
    ),
  );
  const signingInput = `${header}.${claims}`;
  return Effect.tryPromise({
    try: async () => {
      const cryptoKey = await crypto.subtle.importKey(
        "pkcs8",
        key as Uint8Array<ArrayBuffer>,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const signature = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        cryptoKey,
        encoder.encode(signingInput),
      );
      return Redacted.make(`${signingInput}.${base64url(new Uint8Array(signature))}`);
    },
    // The cause can quote key material, so it is not attached.
    catch: () =>
      new GithubAppAuthError({
        message: `Could not sign a JWT with the private key of GitHub App ${config.appId}; it must be an RSA key.`,
      }),
  });
};

// =============================================================================
// Refreshing credentials
// =============================================================================

/** A minted token and when it stops working, in epoch milliseconds. */
interface Minted {
  readonly config: Config;
  readonly expiresAt: number;
}

/** Mint again this long before the token expires. */
const REFRESH_WINDOW_MS = 60_000;

/**
 * A `Credentials` layer over `mint`: the first request mints, later requests
 * reuse the token until a minute before it expires, and concurrent requests
 * share one mint.
 */
const refreshing = (
  mint: Effect.Effect<Minted, GithubAppAuthError, HttpClient.HttpClient>,
): Layer.Layer<Credentials> => {
  const lock = Semaphore.makeUnsafe(1);
  let cached: Minted | undefined;
  const fresh = () => cached !== undefined && Date.now() < cached.expiresAt - REFRESH_WINDOW_MS;
  const resolve = Effect.suspend(() =>
    fresh()
      ? Effect.succeed(cached!.config)
      : Semaphore.withPermit(
          lock,
          Effect.suspend(() =>
            fresh()
              ? Effect.succeed(cached!.config)
              : withHttpClient(mint).pipe(
                  Effect.map((minted) => {
                    cached = minted;
                    return minted.config;
                  }),
                ),
          ),
        ),
  );
  return Layer.succeed(Credentials, resolve);
};

/**
 * Run `effect` with the calling fiber's `HttpClient` (an operation always
 * has one), else with `fetch`, so the credentials layer has no requirements.
 */
const withHttpClient = <A, E>(
  effect: Effect.Effect<A, E, HttpClient.HttpClient>,
): Effect.Effect<A, E> =>
  Effect.flatMap(Effect.serviceOption(HttpClient.HttpClient), (client) =>
    Option.isSome(client)
      ? Effect.provideService(effect, HttpClient.HttpClient, client.value)
      : Effect.provide(effect, FetchHttpClient.layer),
  );

const endpoint = (config: AppConfig) => ({
  apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
  userAgent: config.userAgent ?? DEFAULT_USER_AGENT,
});

/**
 * Authenticate as the App itself, with its JWT, minted again shortly before
 * it expires. For the App-level endpoints (`apps.getAuthenticated`,
 * `apps.listInstallations`, `apps.createInstallationAccessToken`); repository
 * endpoints need {@link installationCredentials}.
 */
export const appCredentials = (config: AppConfig): Layer.Layer<Credentials> =>
  refreshing(
    Effect.map(appJwt(config), (token) => ({
      config: { token, ...endpoint(config) },
      expiresAt: Date.now() + JWT_LIFETIME_SECONDS * 1000,
    })),
  );

/**
 * Authenticate as one installation of the App: an installation access token
 * minted with the App's JWT (`apps.createInstallationAccessToken`), optionally
 * narrowed to some repositories or permissions, and minted again shortly
 * before its hour runs out. A refusal (an unknown installation, a revoked
 * key) fails the operation with `GithubAppAuthError`, the API error as its
 * `cause`.
 */
export const installationCredentials = (config: InstallationConfig): Layer.Layer<Credentials> =>
  refreshing(
    Effect.gen(function* () {
      const jwt = yield* appJwt(config);
      const minted = yield* createInstallationAccessToken({
        installation_id: config.installationId,
        repositories: config.repositories ? [...config.repositories] : undefined,
        repository_ids: config.repositoryIds ? [...config.repositoryIds] : undefined,
        permissions: config.permissions,
      }).pipe(
        Effect.provideService(Credentials, Effect.succeed({ token: jwt, ...endpoint(config) })),
        Effect.mapError(
          (cause) =>
            new GithubAppAuthError({
              message: `Could not mint an access token for installation ${config.installationId} of GitHub App ${config.appId}: ${
                "message" in cause && typeof cause.message === "string" ? cause.message : cause._tag
              }`,
              cause,
            }),
        ),
      );
      return {
        config: {
          token: Redacted.make(minted.token),
          ...endpoint(config),
          issuedAt: Date.now(),
        },
        expiresAt: Date.parse(minted.expires_at),
      };
    }),
  );
