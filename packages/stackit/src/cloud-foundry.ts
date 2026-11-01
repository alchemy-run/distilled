/**
 * STACKIT Cloud Foundry data plane helpers -- hand-written.
 *
 * Apps, routes and service instances live behind the Cloud Foundry v3 API on a platform's
 * `apiUrl`, which takes UAA access tokens rather than STACKIT ones. `services/cloud_foundry` holds
 * the operations; this module holds the login: read the `login` link from the API root, exchange
 * a user's name and password at its `/oauth/token` with the public `cf` client, cache the token,
 * and log in again one minute before it expires. Concurrent requests share one login.
 *
 * A failed login surfaces on the operation as `ConfigError`, as a failed token exchange does. UAA
 * locks a user out after repeated failed logins, so a refusal is held for a minute: request
 * traffic with a stale password can't turn into a lockout. The cache belongs to the returned
 * value and holds only text, so no connection outlives a request on a host like workerd.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  type CloudFoundryConfig,
  CloudFoundryCredentials,
  CloudFoundryEndpoint,
} from "./credentials.ts";
import { makeRefreshGate } from "./refresh-gate.ts";
import * as cf from "./services/cloud_foundry.ts";

export {
  type CloudFoundryConfig,
  CloudFoundryCredentials,
  CloudFoundryEndpoint,
} from "./credentials.ts";

/** Log in again this long before the cached token expires. */
export const CLOUD_FOUNDRY_REFRESH_WINDOW_MS = 60 * 1000;

/** How long to hold a refused login. A password fixed meanwhile works within a minute. */
const REFUSED_COOLDOWN_MS = 60 * 1000;

/** What a client may send a password to. */
const isHttpsUrl = (url: string): boolean =>
  URL.canParse(url) && new URL(url).protocol === "https:";

/** A user of a Cloud Foundry platform, and where the platform is. */
export interface CloudFoundryLogin {
  /** The platform's `apiUrl`. */
  readonly apiUrl: string;
  /** The user's name. */
  readonly username: string;
  /** The user's password. */
  readonly password: Redacted.Redacted<string>;
}

/** Refusals of these credentials: logging in again from here gets the same answer. */
const REFUSALS: ReadonlySet<string> = new Set([
  "BadRequest",
  "Forbidden",
  "NotFound",
  "TooManyRequests",
  "Unauthorized",
]);

/**
 * `CloudFoundryCredentials`' value for one user on one platform. The token cache belongs to the
 * returned value, so build it once per isolate and share it.
 */
export const passwordCloudFoundryCredentials = (
  config: CloudFoundryLogin,
): Effect.Effect<CloudFoundryConfig, ConfigError, HttpClient.HttpClient> => {
  const withClaim = makeRefreshGate();
  let cached: { readonly config: CloudFoundryConfig; readonly expiresAt: number } | undefined;
  let refused: { readonly error: ConfigError; readonly until: number } | undefined;

  const fromCache = <E, R>(orElse: Effect.Effect<CloudFoundryConfig, E, R>) =>
    Effect.flatMap(
      Clock.currentTimeMillis,
      (now): Effect.Effect<CloudFoundryConfig, E | ConfigError, R> =>
        cached !== undefined && now < cached.expiresAt - CLOUD_FOUNDRY_REFRESH_WINDOW_MS
          ? Effect.succeed(cached.config)
          : refused !== undefined && now < refused.until
            ? Effect.fail(refused.error)
            : orElse,
    );

  const fail = (message: string, refusal: boolean, now: number) =>
    Effect.suspend(() => {
      const error = new ConfigError({ message });
      if (refusal) refused = { error, until: now + REFUSED_COOLDOWN_MS };
      return Effect.fail(error);
    });

  const failedStep =
    (step: string, now: number) =>
    (error: { readonly _tag: string; readonly message?: string | undefined }) =>
      error._tag === "ConfigError"
        ? fail(error.message ?? `${step} failed`, true, now)
        : fail(
            `${step} at ${config.apiUrl} failed with ${error._tag}: ${error.message ?? "no message"}`,
            REFUSALS.has(error._tag),
            now,
          );

  const fresh = Effect.gen(function* () {
    const issuedAt = yield* Clock.currentTimeMillis;
    if (!isHttpsUrl(config.apiUrl)) {
      return yield* fail(`Cloud Foundry API URL is not https: ${config.apiUrl}`, true, issuedAt);
    }
    const root = yield* cf
      .getApiRoot({})
      .pipe(
        Effect.provideService(CloudFoundryEndpoint, config.apiUrl),
        Effect.catch(failedStep("Cloud Foundry API discovery", issuedAt)),
      );
    const login = root.links?.login?.href;
    if (login === undefined || !isHttpsUrl(login)) {
      return yield* fail(
        `The Cloud Foundry API at ${config.apiUrl} names no https login endpoint`,
        true,
        issuedAt,
      );
    }
    const { access_token, expires_in } = yield* cf
      .requestToken({
        grant_type: "password",
        username: config.username,
        password: config.password,
        token_format: "jwt",
      })
      .pipe(
        Effect.provideService(CloudFoundryEndpoint, login),
        Effect.catch(failedStep("Cloud Foundry login", issuedAt)),
      );
    const value: CloudFoundryConfig = {
      apiUrl: config.apiUrl,
      token: Redacted.isRedacted(access_token) ? access_token : Redacted.make(access_token),
    };
    cached = { config: value, expiresAt: issuedAt + expires_in * 1000 };
    refused = undefined;
    return value;
  });

  return fromCache(withClaim(fromCache(fresh)));
};

/**
 * `CloudFoundryCredentials` from a user. The token cache belongs to the returned layer value, so
 * build it once per platform and user, and share it.
 */
export const fromCloudFoundryPassword = (
  config: CloudFoundryLogin,
): Layer.Layer<CloudFoundryCredentials, never, HttpClient.HttpClient> =>
  Layer.effect(
    CloudFoundryCredentials,
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      return passwordCloudFoundryCredentials(config).pipe(
        Effect.provideService(HttpClient.HttpClient, client),
      );
    }),
  );

/** The id of a job from the `Location` an asynchronous operation answered with. */
export const cloudFoundryJobGuid = (location: string | undefined): string | undefined => {
  if (location === undefined) return undefined;
  const last = location
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "")
    .split("/")
    .pop();
  return last === undefined || last === "" ? undefined : last;
};
