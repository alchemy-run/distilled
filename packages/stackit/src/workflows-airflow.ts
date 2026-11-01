/**
 * STACKIT Workflows data plane helpers -- hand-written.
 *
 * A Workflows instance serves Apache Airflow's REST API, which takes neither a STACKIT token
 * nor a credential STACKIT issues. `services/workflows_airflow` holds the operations; this
 * module holds what the spec can't: the login STACKIT's docs describe.
 *
 * 1. Get an access token from the identity provider the instance is configured with, with the
 *    `client_credentials` grant, using an OAuth2 client of that provider.
 * 2. Exchange it at the instance's `POST /api/stackit/v1/session`, which answers with a cookie.
 * 3. Send that cookie on every Airflow call.
 *
 * The session endpoint is disabled until the instance's identity provider has `apiAudience`
 * set, and the token's `aud` claim has to match it. See
 * https://docs.stackit.cloud/products/data-and-ai/workflows/basics/concepts/#api-authentication
 *
 * The answer to step 2 isn't documented beyond "the returned session cookie", so everything it
 * sets is kept, and the cookie's own lifetime decides when to log in again when it states one. A
 * session can also stop working early, so {@link withWorkflowsAirflowSession} logs in again once
 * when a call answers `Unauthorized` or `InvalidSession`.
 *
 * A failed login surfaces on the operation as `ConfigError`, as a failed token exchange does. A
 * refusal is held for a minute, so request traffic with a stale secret can't turn into a stream
 * of failed logins. The cache belongs to the returned value, and holds only text: no connection
 * outlives a request on a host like workerd, and `refresh-gate.ts` lets requests share a login.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Clock from "effect/Clock";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Cookies from "effect/http/Cookies";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { type WorkflowsAirflowConfig, WorkflowsAirflowCredentials } from "./credentials.ts";
import { makeRefreshGate } from "./refresh-gate.ts";

export { type WorkflowsAirflowConfig, WorkflowsAirflowCredentials } from "./credentials.ts";

/** Log in again this long before a session that states its lifetime expires. */
export const WORKFLOWS_AIRFLOW_REFRESH_WINDOW_MS = 5 * 60 * 1000;

/** How long to hold a refused login. A secret fixed meanwhile works within a minute. */
const REFUSED_COOLDOWN_MS = 60 * 1000;

/** The session endpoint, from STACKIT's docs. */
const SESSION_PATH = "/api/stackit/v1/session";

/**
 * The API root for an instance's `endpoints.url`: a bare host gets `https://`, any user and
 * password are dropped, and so is a trailing slash. Returns `undefined` for something that isn't
 * a URL.
 */
export const workflowsAirflowApiUrl = (instanceUrl: string): string | undefined => {
  const withScheme = /^https?:\/\//.test(instanceUrl) ? instanceUrl : `https://${instanceUrl}`;
  if (!URL.canParse(withScheme)) return undefined;
  const url = new URL(withScheme);
  return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
};

/** An OAuth2 client of the instance's identity provider, and where that provider is. */
export interface WorkflowsAirflowClient {
  /** The instance's `endpoints.url`. */
  readonly instanceUrl: string;
  /** The provider's OpenID configuration, ending in `/.well-known/openid-configuration`. */
  readonly discoveryEndpoint: string;
  /** The client's id. */
  readonly clientId: string;
  /** The client's secret. */
  readonly clientSecret: Redacted.Redacted<string>;
  /** Scopes to request, when the provider needs them to issue the instance's audience. */
  readonly scope?: string | undefined;
}

/** A client's login: its cached session, and how to drop it. */
export interface WorkflowsAirflowSession {
  /** The session, from the cache or a new login. */
  readonly credentials: Effect.Effect<WorkflowsAirflowConfig, ConfigError, HttpClient.HttpClient>;
  /** Forget the session, so the next read logs in again. */
  readonly invalidate: Effect.Effect<void>;
}

/** A step's failure: `refused` when asking again from here gets the same answer. */
interface StepFailure {
  readonly refused: boolean;
  readonly error: ConfigError;
}

const stepFailure = (refused: boolean, message: string): StepFailure => ({
  refused,
  error: new ConfigError({ message }),
});

const isRefusal = (status: number) => status >= 400 && status < 500;

const isSuccess = (status: number) => status >= 200 && status < 300;

/** What a client may send a secret to. */
const isHttpsUrl = (url: string): boolean =>
  URL.canParse(url) && new URL(url).protocol === "https:";

/** A short description of a provider's failure: never the body, which could echo a credential. */
const describeOAuthError = (text: string): string => {
  try {
    const body = JSON.parse(text) as {
      readonly error?: unknown;
      readonly error_description?: unknown;
    };
    const parts = [body?.error, body?.error_description].filter(
      (part): part is string => typeof part === "string" && part !== "",
    );
    return parts.length === 0 ? "no error code" : parts.join(": ");
  } catch {
    return "no error code";
  }
};

/** FastAPI's `detail` when it is text, which is all the session endpoint's refusal can say. */
const describeSessionError = (text: string): string => {
  try {
    const body = JSON.parse(text) as { readonly detail?: unknown };
    return typeof body?.detail === "string" ? body.detail : "no detail";
  } catch {
    return "no detail";
  }
};

/** When the first of these cookies expires, if any of them says. */
const earliestExpiry = (
  cookies: ReadonlyArray<Cookies.Cookie>,
  now: number,
): number | undefined => {
  const expiries = cookies.flatMap((cookie) => {
    const maxAge = cookie.options?.maxAge;
    if (maxAge !== undefined) return [now + Duration.toMillis(Duration.fromInputUnsafe(maxAge))];
    return cookie.options?.expires === undefined ? [] : [cookie.options.expires.getTime()];
  });
  return expiries.length === 0 ? undefined : Math.min(...expiries);
};

/**
 * A login for one OAuth2 client on one instance. The session cache belongs to the returned value,
 * so build it once per isolate and share it.
 */
export const makeWorkflowsAirflowSession = (
  config: WorkflowsAirflowClient,
): WorkflowsAirflowSession => {
  const apiUrl = workflowsAirflowApiUrl(config.instanceUrl);
  if (apiUrl === undefined) {
    return {
      credentials: Effect.fail(
        new ConfigError({ message: "A Workflows instance's `endpoints.url` is not a URL" }),
      ),
      invalidate: Effect.void,
    };
  }

  const withClaim = makeRefreshGate();
  let tokenEndpoint: string | undefined;
  let cached:
    | { readonly config: WorkflowsAirflowConfig; readonly refreshAt: number | undefined }
    | undefined;
  let refused: { readonly error: ConfigError; readonly until: number } | undefined;

  const fromCache = <E, R>(orElse: Effect.Effect<WorkflowsAirflowConfig, E, R>) =>
    Effect.flatMap(
      Clock.currentTimeMillis,
      (now): Effect.Effect<WorkflowsAirflowConfig, E | ConfigError, R> =>
        cached !== undefined && (cached.refreshAt === undefined || now < cached.refreshAt)
          ? Effect.succeed(cached.config)
          : refused !== undefined && now < refused.until
            ? Effect.fail(refused.error)
            : orElse,
    );

  /** Run a request and read its body: a network failure is not a refusal. */
  const send = (
    client: HttpClient.HttpClient,
    step: string,
    request: HttpClientRequest.HttpClientRequest,
  ): Effect.Effect<
    { readonly response: HttpClientResponse.HttpClientResponse; readonly text: string },
    StepFailure
  > =>
    client.execute(request).pipe(
      Effect.flatMap((response) => Effect.map(response.text, (text) => ({ response, text }))),
      Effect.mapError((error) => stepFailure(false, `${step} failed: ${error.message}`)),
    );

  /** Step 0: where the provider issues tokens, which its OpenID configuration says. */
  const discoverTokenEndpoint = (client: HttpClient.HttpClient) =>
    Effect.gen(function* () {
      if (tokenEndpoint !== undefined) return tokenEndpoint;
      const step = `OpenID discovery at ${config.discoveryEndpoint}`;
      if (!isHttpsUrl(config.discoveryEndpoint)) {
        return yield* Effect.fail(stepFailure(true, `${step} failed: not an https URL`));
      }
      const { response, text } = yield* send(
        client,
        step,
        HttpClientRequest.get(config.discoveryEndpoint).pipe(HttpClientRequest.acceptJson),
      );
      if (!isSuccess(response.status)) {
        return yield* Effect.fail(
          stepFailure(isRefusal(response.status), `${step} failed with HTTP ${response.status}`),
        );
      }
      const found = yield* Effect.try({
        try: () => (JSON.parse(text) as { readonly token_endpoint?: unknown }).token_endpoint,
        catch: () => stepFailure(true, `${step} returned a non-JSON body`),
      });
      if (typeof found !== "string" || !isHttpsUrl(found)) {
        return yield* Effect.fail(
          stepFailure(true, `${step} returned no https \`token_endpoint\``),
        );
      }
      tokenEndpoint = found;
      return found;
    });

  /** Step 1: an access token for the client. */
  const requestToken = (client: HttpClient.HttpClient, url: string) =>
    Effect.gen(function* () {
      const step = `Token request for client ${config.clientId} at ${url}`;
      const { response, text } = yield* send(
        client,
        step,
        HttpClientRequest.post(url).pipe(
          HttpClientRequest.acceptJson,
          HttpClientRequest.basicAuth(config.clientId, config.clientSecret),
          HttpClientRequest.bodyUrlParams({
            grant_type: "client_credentials",
            ...(config.scope === undefined ? {} : { scope: config.scope }),
          }),
        ),
      );
      if (!isSuccess(response.status)) {
        return yield* Effect.fail(
          stepFailure(
            isRefusal(response.status),
            `${step} failed with HTTP ${response.status}: ${describeOAuthError(text)}`,
          ),
        );
      }
      const token = yield* Effect.try({
        try: () => (JSON.parse(text) as { readonly access_token?: unknown }).access_token,
        catch: () => stepFailure(true, `${step} returned a non-JSON body`),
      });
      if (typeof token !== "string" || token === "") {
        return yield* Effect.fail(stepFailure(true, `${step} returned no \`access_token\``));
      }
      return Redacted.make(token);
    });

  /** Step 2: the session, in exchange for the token. */
  const exchange = (client: HttpClient.HttpClient, token: Redacted.Redacted<string>) =>
    Effect.gen(function* () {
      const step = `Session exchange at ${apiUrl}${SESSION_PATH}`;
      const { response, text } = yield* send(
        client,
        step,
        HttpClientRequest.post(`${apiUrl}${SESSION_PATH}`).pipe(
          HttpClientRequest.bearerToken(token),
        ),
      );
      if (!isSuccess(response.status)) {
        return yield* Effect.fail(
          stepFailure(
            isRefusal(response.status),
            `${step} failed with HTTP ${response.status}: ${describeSessionError(text)}. ` +
              "It takes an instance whose OAuth2 identity provider has `apiAudience` set, and " +
              "a token whose `aud` claim matches it.",
          ),
        );
      }
      return Object.values(response.cookies.cookies);
    });

  const fresh = Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const now = yield* Clock.currentTimeMillis;
    const session = yield* Effect.gen(function* () {
      const url = yield* discoverTokenEndpoint(client);
      const token = yield* requestToken(client, url);
      const cookies = yield* exchange(client, token);
      // A cookie already out of date is one the server is clearing, not one to send.
      const live = cookies.filter((cookie) => (earliestExpiry([cookie], now) ?? now + 1) > now);
      if (live.length === 0) {
        return yield* Effect.fail(
          stepFailure(true, `Session exchange at ${apiUrl}${SESSION_PATH} set no cookie`),
        );
      }
      return live;
    }).pipe(
      Effect.tapError((failure) =>
        Effect.sync(() => {
          if (failure.refused) {
            refused = { error: failure.error, until: now + REFUSED_COOLDOWN_MS };
          }
        }),
      ),
      Effect.mapError((failure) => failure.error),
    );

    const expiresAt = earliestExpiry(session, now);
    const airflowConfig: WorkflowsAirflowConfig = {
      apiUrl,
      cookie: Redacted.make(session.map((c) => `${c.name}=${c.valueEncoded}`).join("; ")),
    };
    cached = {
      config: airflowConfig,
      // Half the lifetime when that's shorter than the window, so a short session still caches.
      refreshAt:
        expiresAt === undefined
          ? undefined
          : expiresAt - Math.min(WORKFLOWS_AIRFLOW_REFRESH_WINDOW_MS, (expiresAt - now) / 2),
    };
    refused = undefined;
    return airflowConfig;
  });

  return {
    credentials: fromCache(withClaim(fromCache(fresh))),
    invalidate: Effect.sync(() => {
      cached = undefined;
    }),
  };
};

/** The answers that mean the session stopped working, which a new one can fix. */
const SESSION_LOST: ReadonlySet<string> = new Set(["Unauthorized", "InvalidSession"]);

/**
 * Run a `workflows_airflow` operation with a session. An `Unauthorized` or `InvalidSession` answer
 * means the session stopped working early, such as across a restart, so this logs in again and
 * repeats the call once. A second such answer is the caller's.
 */
export const withWorkflowsAirflowSession =
  (session: WorkflowsAirflowSession) =>
  <A, E extends { readonly _tag: string }, R>(
    operation: Effect.Effect<A, E, R>,
  ): Effect.Effect<A, E, Exclude<R, WorkflowsAirflowCredentials> | HttpClient.HttpClient> =>
    Effect.flatMap(HttpClient.HttpClient, (client) => {
      const run = operation.pipe(
        Effect.provideService(
          WorkflowsAirflowCredentials,
          session.credentials.pipe(Effect.provideService(HttpClient.HttpClient, client)),
        ),
      );
      return run.pipe(
        Effect.catchIf(
          (error) => SESSION_LOST.has(error._tag),
          () => Effect.andThen(session.invalidate, run),
        ),
      );
    });

/**
 * `WorkflowsAirflowCredentials` from an OAuth2 client. The session cache belongs to the returned
 * layer value, so build it once per isolate and share it.
 */
export const workflowsAirflowFromClient = (
  config: WorkflowsAirflowClient,
): Layer.Layer<WorkflowsAirflowCredentials, never, HttpClient.HttpClient> =>
  Layer.effect(
    WorkflowsAirflowCredentials,
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      return makeWorkflowsAirflowSession(config).credentials.pipe(
        Effect.provideService(HttpClient.HttpClient, client),
      );
    }),
  );
