/**
 * Workload identity federation (AIP-4117): an OIDC or SAML token from
 * another platform (Vercel, GitHub Actions, AWS, Azure, …) is exchanged at
 * Google's Security Token Service, optionally for a service account's
 * token, and exchanged again before it expires.
 */
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Semaphore from "effect/Semaphore";
import { type Config, Credentials } from "../credentials-service.ts";
import { GCPCredentialsError } from "../errors.ts";

const STS_TOKEN_URL = "https://sts.googleapis.com/v1/token";
const CLOUD_PLATFORM_SCOPE = "https://www.googleapis.com/auth/cloud-platform";
const JWT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:jwt";
/** Refresh this long before the access token expires. */
const REFRESH_WINDOW_MS = 5 * 60 * 1000;

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
}

interface AccessToken {
  readonly token: Redacted.Redacted<string>;
  readonly expiresAt: number;
}

/**
 * The fiber's `HttpClient` when one is in scope (an operation always has
 * one), else `fetch`, so the layer itself has no requirements.
 */
const withHttpClient = <A, E>(
  effect: Effect.Effect<A, E, HttpClient.HttpClient>,
): Effect.Effect<A, E> =>
  Effect.serviceOption(HttpClient.HttpClient).pipe(
    Effect.flatMap((client) =>
      Option.isSome(client)
        ? Effect.provideService(effect, HttpClient.HttpClient, client.value)
        : Effect.provide(effect, FetchHttpClient.layer),
    ),
  );

/** POST and read a JSON body, failing with the endpoint's own error text. */
const postJson = (step: string, request: HttpClientRequest.HttpClientRequest) =>
  Effect.gen(function* () {
    const http = yield* HttpClient.HttpClient;
    const response = yield* http.execute(request);
    const text = yield* response.text;
    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      body = undefined;
    }
    if (response.status < 200 || response.status >= 300) {
      return yield* new GCPCredentialsError({
        message: `${step} failed with status ${response.status}: ${errorText(body) ?? text.slice(0, 200)}`,
        status: response.status,
      });
    }
    if (typeof body !== "object" || body === null) {
      return yield* new GCPCredentialsError({
        message: `${step} returned a body that is not JSON.`,
        status: response.status,
      });
    }
    return body as Record<string, unknown>;
  }).pipe(
    Effect.catchTag(
      "HttpClientError",
      (cause) => new GCPCredentialsError({ message: `${step} failed: ${cause.message}`, cause }),
    ),
  );

/** STS: `{ error, error_description }`; IAM: `{ error: { message } }`. */
const errorText = (body: unknown): string | undefined => {
  if (typeof body !== "object" || body === null) return undefined;
  const { error, error_description } = body as {
    error?: unknown;
    error_description?: unknown;
  };
  if (typeof error_description === "string") return error_description;
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return undefined;
};

/** RFC 8693 token exchange at Google's Security Token Service. */
const exchangeSubjectToken = (
  config: WorkloadIdentityConfig,
  subjectToken: Redacted.Redacted<string>,
  scopes: ReadonlyArray<string>,
): Effect.Effect<AccessToken, GCPCredentialsError, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const now = Date.now();
    const body = yield* postJson(
      "The workload identity token exchange",
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
    if (typeof body.access_token !== "string") {
      return yield* new GCPCredentialsError({
        message: "The workload identity token exchange returned no access_token.",
      });
    }
    const expiresIn = typeof body.expires_in === "number" ? body.expires_in : 3600;
    return {
      token: Redacted.make(body.access_token),
      expiresAt: now + expiresIn * 1000,
    };
  });

/** IAM Credentials `generateAccessToken`, signed with the federated token. */
const impersonate = (
  serviceAccountEmail: string,
  federated: AccessToken,
  scopes: ReadonlyArray<string>,
  lifetimeSeconds: number,
): Effect.Effect<AccessToken, GCPCredentialsError, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const body = yield* postJson(
      `Impersonating ${serviceAccountEmail}`,
      HttpClientRequest.post(
        `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${encodeURIComponent(serviceAccountEmail)}:generateAccessToken`,
      ).pipe(
        HttpClientRequest.bearerToken(Redacted.value(federated.token)),
        HttpClientRequest.bodyJsonUnsafe({
          scope: scopes,
          lifetime: `${lifetimeSeconds}s`,
        }),
      ),
    );
    const expiresAt = typeof body.expireTime === "string" ? Date.parse(body.expireTime) : NaN;
    if (typeof body.accessToken !== "string" || Number.isNaN(expiresAt)) {
      return yield* new GCPCredentialsError({
        message: `Impersonating ${serviceAccountEmail} returned no accessToken or expireTime.`,
      });
    }
    return { token: Redacted.make(body.accessToken), expiresAt };
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
export const fromWorkloadIdentity = (config: WorkloadIdentityConfig): Layer.Layer<Credentials> => {
  const scopes = config.scopes ?? [CLOUD_PLATFORM_SCOPE];
  const lock = Semaphore.makeUnsafe(1);
  let cached: AccessToken | undefined;

  const exchange = Effect.gen(function* () {
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
    return yield* impersonate(
      config.serviceAccountEmail,
      federated,
      scopes,
      config.tokenLifetimeSeconds ?? 3600,
    );
  });

  const fresh = () => cached !== undefined && Date.now() < cached.expiresAt - REFRESH_WINDOW_MS;

  const resolve = Effect.suspend(() =>
    fresh()
      ? Effect.succeed(cached!)
      : Semaphore.withPermit(
          lock,
          Effect.suspend(() =>
            fresh()
              ? Effect.succeed(cached!)
              : withHttpClient(exchange).pipe(
                  Effect.tap((token) =>
                    Effect.sync(() => {
                      cached = token;
                    }),
                  ),
                ),
          ),
        ),
  ).pipe(
    Effect.map((token): Config => ({
      accessToken: token.token,
      project: config.project,
      region: config.region,
    })),
  );

  return Layer.succeed(Credentials, resolve);
};
