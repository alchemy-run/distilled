/**
 * Credentials cached by `aws login`. The CLI writes a token document under
 * `~/.aws/login/cache`, named after the profile's `login_session`, that
 * already contains a set of credentials; when they are close to expiring
 * they are renewed through the signin service's OAuth 2.0 token endpoint.
 *
 * That call is authorised by a DPoP proof (RFC 9449): an ES256 JWT over the
 * request's method and URL, signed with the private key in the cached
 * document. Node only — the cache is a file and the proof needs
 * `node:crypto`.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import {
  createHash,
  createPrivateKey,
  createPublicKey,
  randomUUID,
  sign,
} from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  Credentials,
  fromAwsCredentialIdentity,
} from "../credentials.browser.ts";
import type * as Region from "../region.ts";
import { getHomeDir } from "../util/shared-config.ts";
import {
  type CredentialSource,
  CredentialSourceError,
  env,
} from "./credential-source.ts";
import { withHttpClient } from "./http-client.ts";
import { getProfileName, loadProfiles } from "./profile.ts";
import { stsRegion } from "./sts.ts";

/** Credentials this close to expiring are renewed rather than returned. */
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000;

const ENV_CACHE_DIRECTORY = "AWS_LOGIN_CACHE_DIRECTORY";

interface LoginAccessToken {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  accountId?: string;
  expiresAt: string;
}

interface LoginToken {
  accessToken: LoginAccessToken;
  clientId: string;
  refreshToken: string;
  dpopKey: string;
  tokenType?: string;
  idToken?: string;
}

/**
 * The cache file for a login session: a sha256 of the session name under
 * `~/.aws/login/cache`, as the CLI writes it.
 */
const tokenFilePath = (loginSession: string): string =>
  join(
    env(ENV_CACHE_DIRECTORY) ?? join(getHomeDir(), ".aws", "login", "cache"),
    `${createHash("sha256").update(Buffer.from(loginSession, "utf8")).digest("hex")}.json`,
  );

const invalidToken = (message: string, cause?: unknown) =>
  new CredentialSourceError({
    message: `${message} Please re-authenticate using \`aws login\`.`,
    cause,
    // The cache exists but cannot be used; another source cannot fix that.
    tryNextLink: false,
  });

const isLoginToken = (value: unknown): value is LoginToken => {
  const token = value as LoginToken | null;
  return (
    typeof token === "object" &&
    token !== null &&
    typeof token.clientId === "string" &&
    typeof token.refreshToken === "string" &&
    typeof token.dpopKey === "string" &&
    typeof token.accessToken === "object" &&
    token.accessToken !== null &&
    typeof token.accessToken.accessKeyId === "string" &&
    typeof token.accessToken.secretAccessKey === "string" &&
    typeof token.accessToken.sessionToken === "string" &&
    typeof token.accessToken.expiresAt === "string" &&
    typeof token.accessToken.accountId === "string"
  );
};

const loadToken = (
  loginSession: string,
): Effect.Effect<LoginToken, CredentialSourceError> => {
  const path = tokenFilePath(loginSession);
  return Effect.tryPromise({
    try: () => readFile(path, "utf8"),
    catch: (cause) =>
      invalidToken(`Failed to load the login token at ${path}.`, cause),
  }).pipe(
    Effect.flatMap((contents) =>
      Effect.try({
        try: () => JSON.parse(contents) as unknown,
        catch: (cause) =>
          invalidToken(`The login token at ${path} is not valid JSON.`, cause),
      }),
    ),
    Effect.flatMap((parsed) =>
      isLoginToken(parsed)
        ? Effect.succeed(parsed)
        : Effect.fail(
            invalidToken(`The login token at ${path} is missing fields.`),
          ),
    ),
  );
};

/** Best effort: failing to update the cache does not invalidate the token. */
const saveToken = (loginSession: string, token: LoginToken) => {
  const path = tokenFilePath(loginSession);
  return Effect.promise(() =>
    mkdir(dirname(path), { recursive: true }).then(() =>
      writeFile(path, JSON.stringify(token, null, 2), "utf8"),
    ),
  ).pipe(Effect.ignore);
};

const unredact = (value: string | Redacted.Redacted<string>): string =>
  Redacted.isRedacted(value) ? Redacted.value(value) : value;

const toCredentials = (token: LoginAccessToken): AwsCredentialIdentity => ({
  accessKeyId: token.accessKeyId,
  secretAccessKey: token.secretAccessKey,
  sessionToken: token.sessionToken,
  expiration: new Date(token.expiresAt),
  ...(token.accountId && { accountId: token.accountId }),
});

const expiresAt = (token: LoginToken): number =>
  new Date(token.accessToken.expiresAt).getTime();

// ---------------------------------------------------------------------------
// DPoP
// ---------------------------------------------------------------------------

const base64url = (value: string): string =>
  Buffer.from(value).toString("base64url");

/** ES256 signatures are DER from `node:crypto` but raw `r || s` in a JWT. */
const derToRaw = (der: Buffer): Buffer => {
  if (der[0] !== 0x30 || der[2] !== 0x02) {
    throw new Error("Invalid DER signature");
  }
  const rLength = der[3];
  let r = der.subarray(4, 4 + rLength);
  if (der[4 + rLength] !== 0x02) {
    throw new Error("Invalid DER signature");
  }
  const sLength = der[5 + rLength];
  let s = der.subarray(6 + rLength, 6 + rLength + sLength);
  r = r[0] === 0x00 ? r.subarray(1) : r;
  s = s[0] === 0x00 ? s.subarray(1) : s;
  return Buffer.concat([
    Buffer.alloc(32 - r.length),
    r,
    Buffer.alloc(32 - s.length),
    s,
  ]);
};

type DpopProof = (method: string, endpoint: string) => string;

/**
 * A signer for the cached key. The key is parsed once, up front, so a
 * malformed one fails before a request is made rather than mid-flight.
 */
const dpopProof = (
  dpopKey: string,
): Effect.Effect<DpopProof, CredentialSourceError> =>
  Effect.try({
    try: () => {
      const privateKey = createPrivateKey({
        key: dpopKey,
        format: "pem",
        type: "sec1",
      });
      const publicKey = createPublicKey(privateKey).export({
        format: "der",
        type: "spki",
      });
      // The uncompressed EC point (0x04 || x || y) at the end of the SPKI.
      const point = publicKey.indexOf(0x04, publicKey.length - 66);
      const header = base64url(
        JSON.stringify({
          alg: "ES256",
          typ: "dpop+jwt",
          jwk: {
            kty: "EC",
            crv: "P-256",
            x: publicKey.subarray(point + 1, point + 33).toString("base64url"),
            y: publicKey.subarray(point + 33, point + 65).toString("base64url"),
          },
        }),
      );
      return (method: string, endpoint: string) => {
        const payload = base64url(
          JSON.stringify({
            jti: randomUUID(),
            htm: method,
            htu: endpoint,
            iat: Math.floor(Date.now() / 1000),
          }),
        );
        const message = `${header}.${payload}`;
        const signature = derToRaw(
          sign("sha256", Buffer.from(message), privateKey),
        );
        return `${message}.${signature.toString("base64url")}`;
      };
    },
    catch: (cause) =>
      invalidToken(
        "Failed to generate a DPoP proof from the login token.",
        cause,
      ),
  });

/** The proof covers the method and the URL without its query string. */
const endpoint = (url: string): string => {
  const parsed = new URL(url);
  return `${parsed.origin}${parsed.pathname}`;
};

const withDpop =
  (proof: DpopProof) =>
  <A, E>(
    effect: Effect.Effect<A, E, HttpClient.HttpClient>,
  ): Effect.Effect<A, E, HttpClient.HttpClient> =>
    effect.pipe(
      Effect.updateService(HttpClient.HttpClient, (client) =>
        HttpClient.mapRequest(client, (request) =>
          HttpClientRequest.setHeader(
            request,
            "DPoP",
            proof(request.method, endpoint(request.url)),
          ),
        ),
      ),
    );

// ---------------------------------------------------------------------------
// Refresh
// ---------------------------------------------------------------------------

/** The advice the signin service's `AccessDeniedException` codes map to. */
const accessDeniedMessage = (code: string, message: string): string => {
  switch (code) {
    case "TOKEN_EXPIRED":
      return "Your session has expired. Please reauthenticate.";
    case "USER_CREDENTIALS_CHANGED":
      return "Unable to refresh credentials because of a change in your password. Please reauthenticate with your new password.";
    case "INSUFFICIENT_PERMISSIONS":
      return "Unable to refresh credentials due to insufficient permissions. You may be missing permission for the 'CreateOAuth2Token' action.";
    default:
      return `Failed to refresh the login token: ${message}. Please re-authenticate using \`aws login\`.`;
  }
};

/**
 * Exchange the refresh token for a new set of credentials. The call is
 * authorised by the DPoP proof, but the generated operation still requires
 * a `Credentials` service, so a placeholder identity is supplied; only its
 * region is used.
 */
const refresh = (
  loginSession: string,
  token: LoginToken,
  region: Region.RegionName,
): CredentialSource =>
  Effect.gen(function* () {
    const proof = yield* dpopProof(token.dpopKey);
    const Signin = yield* Effect.promise(() => import("../services/signin.ts"));
    const refreshed = yield* Signin.createOAuth2Token({
      tokenInput: {
        clientId: token.clientId,
        grantType: "refresh_token",
        refreshToken: token.refreshToken,
      },
    }).pipe(
      Effect.provideService(
        Credentials,
        Effect.succeed(
          fromAwsCredentialIdentity(
            { accessKeyId: "", secretAccessKey: "" },
            region,
          ),
        ),
      ),
      withDpop(proof),
      withHttpClient,
      Effect.map((response) => {
        // The payload-bound `tokenOutput` member is not re-wrapped when the
        // response is decoded, so the operation resolves with the payload
        // itself; accept either shape.
        const output = response.tokenOutput ?? response;
        const updated: LoginToken = {
          ...token,
          accessToken: {
            ...token.accessToken,
            accessKeyId: output.accessToken.accessKeyId,
            secretAccessKey: output.accessToken.secretAccessKey,
            sessionToken: output.accessToken.sessionToken,
            expiresAt: new Date(
              Date.now() + (output.expiresIn || 900) * 1000,
            ).toISOString(),
          },
          refreshToken: unredact(output.refreshToken),
        };
        return updated;
      }),
      Effect.catch((cause) =>
        cause._tag === "AccessDeniedException"
          ? Effect.fail(
              new CredentialSourceError({
                message: accessDeniedMessage(
                  "error" in cause ? cause.error : "",
                  cause.message,
                ),
                cause,
                tryNextLink: false,
              }),
            )
          : // A token that has not expired yet outlives a failed refresh.
            expiresAt(token) > Date.now()
            ? Effect.succeed(undefined)
            : Effect.fail(
                invalidToken(
                  `Failed to refresh the login token: ${String(cause)}.`,
                  cause,
                ),
              ),
      ),
    );
    if (refreshed === undefined) {
      return toCredentials(token.accessToken);
    }
    yield* saveToken(loginSession, refreshed);
    return toCredentials(refreshed.accessToken);
  });

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface FromLoginCredentialsOptions {
  readonly profile?: string;
  /**
   * Region the signin service is called in. Defaults to the profile's
   * `region`, else the environment, else `us-east-1`.
   */
  readonly region?: string;
}

/**
 * Credentials from the token `aws login` cached for the profile's
 * `login_session`, renewed through the signin service when they are within
 * five minutes of expiring.
 */
export const fromLoginCredentials = (
  options: FromLoginCredentialsOptions = {},
): CredentialSource =>
  Effect.gen(function* () {
    const profileName = getProfileName(options.profile);
    const profiles = yield* loadProfiles();
    const profile = profiles[profileName];
    const loginSession = profile?.login_session;
    if (!loginSession) {
      return yield* new CredentialSourceError({
        message: `Profile ${profileName} does not contain login_session.`,
      });
    }
    const token = yield* loadToken(loginSession);
    if (expiresAt(token) - Date.now() > REFRESH_THRESHOLD_MS) {
      return toCredentials(token.accessToken);
    }
    const region = yield* stsRegion(options.region ?? profile.region);
    return yield* refresh(loginSession, token, region);
  });
