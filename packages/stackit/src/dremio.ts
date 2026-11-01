/**
 * STACKIT Dremio data plane helpers -- hand-written.
 *
 * A Dremio instance serves its own REST API, which takes Dremio's tokens rather than
 * STACKIT access tokens. `services/dremio_rest` holds the operations; this module holds
 * what the spec can't: turning a user's password into a token and keeping that token.
 *
 * A login token lasts 30 hours (Dremio's docs). The cache here logs in again five minutes
 * before it expires and lets concurrent requests share one login. A token can also stop
 * working early, so {@link withDremioLogin} logs in again once when a call answers
 * `Unauthorized`.
 *
 * A failed login surfaces on the operation as `ConfigError`, as a failed token exchange
 * does. A refusal is held for a minute, so request traffic with a stale password can't turn
 * into a stream of failed logins.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { type DremioConfig, DremioCredentials, DremioEndpoint } from "./credentials.ts";
import { makeRefreshGate } from "./refresh-gate.ts";
import * as rest from "./services/dremio_rest.ts";

export { type DremioConfig, DremioCredentials, DremioEndpoint } from "./credentials.ts";

/** Log in again this long before the cached token expires. */
export const DREMIO_REFRESH_WINDOW_MS = 5 * 60 * 1000;

/** How long to hold a refused login. A password fixed meanwhile works within a minute. */
const REFUSED_COOLDOWN_MS = 60 * 1000;

/** How long to keep a token whose login answer has no `expires`: Dremio's docs say 30 hours. */
const DEFAULT_TOKEN_LIFETIME_MS = 30 * 60 * 60 * 1000;

/** Refusals of these credentials from here: logging in again gets the same answer. */
const REFUSALS: ReadonlySet<string> = new Set([
  "BadRequest",
  "Forbidden",
  "LoginRefused",
  "NotFound",
  "TooManyRequests",
  "Unauthorized",
  "UnprocessableEntity",
]);

const loginError = (
  apiUrl: string,
  error: { readonly _tag: string; readonly message?: string | undefined },
) =>
  new ConfigError({
    message: `Dremio login at ${apiUrl} failed with ${error._tag}: ${error.message ?? "no message"}`,
  });

/**
 * The API root for an instance's `endpoints.ui`: a bare host gets `https://`, any user and
 * password are dropped, and so is a trailing slash. Returns `undefined` for something that
 * isn't a URL.
 */
export const dremioApiUrl = (uiUrl: string): string | undefined => {
  const withScheme = /^https?:\/\//.test(uiUrl) ? uiUrl : `https://${uiUrl}`;
  if (!URL.canParse(withScheme)) return undefined;
  const url = new URL(withScheme);
  return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
};

/** A user's login: its cached credentials, and how to drop them. */
export interface DremioLogin {
  /** The token, from the cache or a new login. */
  readonly credentials: Effect.Effect<DremioConfig, ConfigError, HttpClient.HttpClient>;
  /** Forget the token, so the next read logs in again. */
  readonly invalidate: Effect.Effect<void>;
}

/**
 * A login for one user on one instance. The token cache belongs to the returned value, so
 * build it once per isolate and share it.
 */
export const makeDremioLogin = (config: {
  /** The instance's `endpoints.ui`. */
  readonly uiUrl: string;
  readonly username: string;
  readonly password: Redacted.Redacted<string>;
}): DremioLogin => {
  const apiUrl = dremioApiUrl(config.uiUrl);
  if (apiUrl === undefined) {
    return {
      credentials: Effect.fail(
        new ConfigError({ message: "A Dremio instance's `endpoints.ui` is not a URL" }),
      ),
      invalidate: Effect.void,
    };
  }
  const withClaim = makeRefreshGate();
  let cached: { readonly config: DremioConfig; readonly expiresAt: number } | undefined;
  let refused: { readonly error: ConfigError; readonly until: number } | undefined;

  const fromCache = <E, R>(orElse: Effect.Effect<DremioConfig, E, R>) =>
    Effect.flatMap(
      Clock.currentTimeMillis,
      (now): Effect.Effect<DremioConfig, E | ConfigError, R> =>
        cached !== undefined && now < cached.expiresAt - DREMIO_REFRESH_WINDOW_MS
          ? Effect.succeed(cached.config)
          : refused !== undefined && now < refused.until
            ? Effect.fail(refused.error)
            : orElse,
    );

  const toConfigError = (error: rest.LoginError) =>
    error._tag === "ConfigError" ? error : loginError(apiUrl, error);

  const fresh = Effect.gen(function* () {
    const issuedAt = yield* Clock.currentTimeMillis;
    const login = yield* rest.login({ userName: config.username, password: config.password }).pipe(
      Effect.provideService(DremioEndpoint, apiUrl),
      Effect.tapError((error) =>
        Effect.sync(() => {
          if (REFUSALS.has(error._tag)) {
            refused = { error: toConfigError(error), until: issuedAt + REFUSED_COOLDOWN_MS };
          }
        }),
      ),
      Effect.mapError(toConfigError),
    );
    const token = login.token;
    const dremioConfig: DremioConfig = {
      apiUrl,
      token: Redacted.isRedacted(token) ? token : Redacted.make(token),
    };
    cached = {
      config: dremioConfig,
      expiresAt: login.expires ?? issuedAt + DEFAULT_TOKEN_LIFETIME_MS,
    };
    refused = undefined;
    return dremioConfig;
  });

  return {
    credentials: fromCache(withClaim(fromCache(fresh))),
    invalidate: Effect.sync(() => {
      cached = undefined;
    }),
  };
};

/**
 * Run a `dremio_rest` operation with a login. An `Unauthorized` answer means the token
 * stopped working early, such as across a restart, so this logs in again and repeats the
 * call once. A second `Unauthorized` is the caller's.
 */
export const withDremioLogin =
  (login: DremioLogin) =>
  <A, E extends { readonly _tag: string }, R>(
    operation: Effect.Effect<A, E, R>,
  ): Effect.Effect<A, E, Exclude<R, DremioCredentials> | HttpClient.HttpClient> =>
    Effect.flatMap(HttpClient.HttpClient, (client) => {
      const run = operation.pipe(
        Effect.provideService(
          DremioCredentials,
          login.credentials.pipe(Effect.provideService(HttpClient.HttpClient, client)),
        ),
      );
      return run.pipe(
        Effect.catchIf(
          (error) => error._tag === "Unauthorized",
          () => Effect.andThen(login.invalidate, run),
        ),
      );
    });

/**
 * `DremioCredentials` from a user's password. The token cache belongs to the returned layer
 * value, so build it once per isolate and share it.
 */
export const dremioFromPassword = (config: {
  /** The instance's `endpoints.ui`. */
  readonly uiUrl: string;
  readonly username: string;
  readonly password: Redacted.Redacted<string>;
}): Layer.Layer<DremioCredentials, never, HttpClient.HttpClient> =>
  Layer.effect(
    DremioCredentials,
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      return makeDremioLogin(config).credentials.pipe(
        Effect.provideService(HttpClient.HttpClient, client),
      );
    }),
  );

/** `DremioCredentials` from a token you already hold, such as a personal access token. */
export const dremioFromToken = (config: {
  /** The instance's `endpoints.ui`. */
  readonly uiUrl: string;
  readonly token: Redacted.Redacted<string>;
}): Layer.Layer<DremioCredentials> => {
  const apiUrl = dremioApiUrl(config.uiUrl);
  return Layer.succeed(
    DremioCredentials,
    apiUrl === undefined
      ? Effect.fail(new ConfigError({ message: "A Dremio instance's `endpoints.ui` is not a URL" }))
      : Effect.succeed({ apiUrl, token: config.token }),
  );
};
