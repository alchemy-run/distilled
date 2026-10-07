/**
 * Workload identity federation (AIP-4117): an OIDC or SAML token from
 * another platform (Vercel, GitHub Actions, AWS, Azure, …) is exchanged at
 * Google's Security Token Service, optionally for a service account's
 * token, and exchanged again before it expires.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  type Credentials,
  createRefreshingProvider,
  type Token,
  type TokenSource,
} from "../credentials-service.ts";
import { GCPCredentialsError } from "../errors.ts";
import { CLOUD_PLATFORM_SCOPE, oauthToken, requestJson } from "./oauth.ts";

const STS_TOKEN_URL = "https://sts.googleapis.com/v1/token";
const JWT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:jwt";

export interface WorkloadIdentityConfig {
  /**
   * The workload identity pool provider, as STS expects it:
   * `//iam.googleapis.com/projects/<project number>/locations/global/workloadIdentityPools/<pool>/providers/<provider>`.
   */
  readonly audience: string;
  /**
   * The token from the other platform, e.g. a Vercel or GitHub Actions OIDC
   * token. Pass an `Effect` for a token that expires; it runs again on every
   * exchange.
   */
  readonly subjectToken:
    | Redacted.Redacted<string>
    | Effect.Effect<Redacted.Redacted<string>, unknown>;
  /** Defaults to `urn:ietf:params:oauth:token-type:jwt` (OIDC). */
  readonly subjectTokenType?: string;
  /**
   * Service account to impersonate. Without one, the federated token from
   * STS is used directly, so the pool's principal needs the IAM roles.
   */
  readonly serviceAccountEmail?: string;
  /** Defaults to `https://www.googleapis.com/auth/cloud-platform`. */
  readonly scopes?: ReadonlyArray<string>;
  /**
   * Lifetime of the impersonated service account token. Google allows 600 to
   * 3600 (up to 43200 with an organization policy); defaults to 3600.
   */
  readonly tokenLifetimeSeconds?: number;
  /** Defaults to `https://sts.googleapis.com/v1/token`. */
  readonly tokenUrl?: string;
  readonly project?: string;
  readonly region?: string;
  readonly quotaProject?: string;
}

/** RFC 8693 token exchange at Google's Security Token Service. */
const exchangeSubjectToken = (
  config: WorkloadIdentityConfig,
  subjectToken: Redacted.Redacted<string>,
  scopes: ReadonlyArray<string>,
): TokenSource =>
  Effect.gen(function* () {
    const step = "The workload identity token exchange";
    const issuedAt = Date.now();
    const body = yield* requestJson(
      step,
      HttpClientRequest.post(config.tokenUrl ?? STS_TOKEN_URL).pipe(
        HttpClientRequest.bodyUrlParams({
          grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
          audience: config.audience,
          scope: scopes.join(" "),
          requested_token_type: "urn:ietf:params:oauth:token-type:access_token",
          subject_token: Redacted.value(subjectToken),
          subject_token_type: config.subjectTokenType ?? JWT_TOKEN_TYPE,
        }),
      ),
    );
    return yield* oauthToken(step, body, issuedAt);
  });

/**
 * IAM Credentials `generateAccessToken`: trade `source` (which needs the
 * cloud-platform or IAM scope) for `serviceAccountEmail`'s access token.
 */
export const impersonateServiceAccount = (
  serviceAccountEmail: string,
  source: Token,
  options: {
    readonly scopes: ReadonlyArray<string>;
    readonly lifetimeSeconds?: number;
    readonly delegates?: ReadonlyArray<string>;
  },
): Effect.Effect<Token, GCPCredentialsError, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const step = `Impersonating ${serviceAccountEmail}`;
    const body = yield* requestJson(
      step,
      HttpClientRequest.post(
        `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${encodeURIComponent(serviceAccountEmail)}:generateAccessToken`,
      ).pipe(
        HttpClientRequest.bearerToken(Redacted.value(source.accessToken)),
        HttpClientRequest.bodyJsonUnsafe({
          scope: options.scopes,
          lifetime: `${options.lifetimeSeconds ?? 3600}s`,
          ...(options.delegates?.length ? { delegates: options.delegates } : {}),
        }),
      ),
    );
    const expiresAt = typeof body.expireTime === "string" ? Date.parse(body.expireTime) : NaN;
    if (typeof body.accessToken !== "string" || Number.isNaN(expiresAt)) {
      return yield* new GCPCredentialsError({
        message: `${step} returned no accessToken or expireTime.`,
      });
    }
    return { accessToken: Redacted.make(body.accessToken), expiresAt };
  });

/** The token source behind {@link fromWorkloadIdentity}. */
export const workloadIdentitySource = (config: WorkloadIdentityConfig): TokenSource =>
  Effect.gen(function* () {
    const scopes = config.scopes ?? [CLOUD_PLATFORM_SCOPE];
    const subjectToken = Redacted.isRedacted(config.subjectToken)
      ? config.subjectToken
      : yield* config.subjectToken.pipe(
          Effect.mapError(
            (cause) =>
              new GCPCredentialsError({
                message: "Could not resolve the workload identity subject token.",
                cause,
              }),
          ),
        );
    if (config.serviceAccountEmail === undefined) {
      return yield* exchangeSubjectToken(config, subjectToken, scopes);
    }
    // Impersonation needs the cloud-platform scope on the federated token;
    // the caller's scopes go to generateAccessToken.
    const federated = yield* exchangeSubjectToken(config, subjectToken, [CLOUD_PLATFORM_SCOPE]);
    return yield* impersonateServiceAccount(config.serviceAccountEmail, federated, {
      scopes,
      lifetimeSeconds: config.tokenLifetimeSeconds,
    });
  });

/**
 * Credentials from workload identity federation: the caller's OIDC or SAML
 * token is exchanged at Google STS and, when `serviceAccountEmail` is set,
 * for that service account's access token. The token is cached and
 * exchanged again five minutes before it expires; concurrent requests share
 * one exchange.
 *
 * ```ts
 * fromWorkloadIdentity({
 *   audience:
 *     "//iam.googleapis.com/projects/123456789/locations/global/workloadIdentityPools/vercel/providers/vercel",
 *   serviceAccountEmail: "deployer@acme.iam.gserviceaccount.com",
 *   subjectToken: Effect.promise(() => getVercelOidcToken()).pipe(Effect.map(Redacted.make)),
 * });
 * ```
 */
export const fromWorkloadIdentity = (config: WorkloadIdentityConfig): Layer.Layer<Credentials> =>
  createRefreshingProvider(workloadIdentitySource(config), config);
