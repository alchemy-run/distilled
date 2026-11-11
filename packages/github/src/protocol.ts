import * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP, TooManyRequests } from "@distilled.cloud/core/errors";
import { getAnn } from "@distilled.cloud/core/protocol-http";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
  type RestErrorInfo,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfter } from "@distilled.cloud/core/retry-after";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import { httpSymbol, type HttpTrait } from "@distilled.cloud/core/trait";
/**
 * GithubProtocol -- the shared bearer-REST protocol instantiated for GitHub.
 *
 * GitHub speaks plain JSON with no response envelope: list endpoints return a
 * bare array, single resources return the object itself. Failures carry
 * `{ message, documentation_url, status?, errors? }`; the `errors[]` entries
 * (validation failures on 422) carry their own `code`, which is the closest
 * thing the API has to a machine-readable error code -- the envelope surfaces
 * the first one so error matchers can key on it.
 *
 * Every request sends the version-pinned `Accept` and `X-GitHub-Api-Version`
 * headers plus a User-Agent, which GitHub rejects requests without.
 *
 * On top of the shared REST protocol, GitHub's own rules:
 *
 * - A rate-limited 403 or 429 fails with `TooManyRequests`, carrying the wait
 *   GitHub asks for as `retryAfter` (see {@link rateLimited}).
 * - A 401 within five seconds of a token's `issuedAt` is sent again: GitHub
 *   can refuse an installation token it minted a moment ago.
 * - Under {@link paceWrites}, POST, PATCH, PUT and DELETE requests are spaced
 *   apart, as GitHub asks of clients that create content.
 */
import * as Context from "effect/Context";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { Gone, UnknownGithubError, type DefaultErrors, GithubParseError } from "./errors.ts";

/**
 * The REST API version the generated services were built from -- sent on
 * every request so GitHub never silently serves a newer, differently-shaped
 * payload. Bump it together with a regeneration.
 */
export const API_VERSION = "2022-11-28";

/**
 * Error channel shared by every generated GitHub operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, GithubOpError,
 * GithubOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type GithubOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated GitHub operation. */
export type GithubOpContext = Credentials | HttpClient.HttpClient;

/**
 * GitHub error bodies are `{ message, documentation_url }`, optionally with
 * an `errors` array whose entries carry a string `code` (e.g. `"missing"`,
 * `"already_exists"`) -- the only machine-readable code the API offers.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : undefined;
  const first = Array.isArray(b.errors) ? b.errors[0] : undefined;
  const code =
    first !== null && typeof first === "object"
      ? typeof (first as Record<string, unknown>).code === "string"
        ? ((first as Record<string, unknown>).code as string)
        : undefined
      : undefined;
  return { code, message };
};

/**
 * GitHub asks a client that hits a secondary rate limit with no hint
 * headers to wait at least a minute.
 */
const SECONDARY_RATE_LIMIT_WAIT = /*@__PURE__*/ Duration.minutes(1);

/**
 * A rate-limited response, read the way GitHub documents it
 * (https://docs.github.com/rest/using-the-rest-api/rate-limits-for-the-rest-api#exceeding-the-rate-limit):
 * a 403 or 429 with `retry-after`, with `x-ratelimit-remaining: 0`, or whose
 * message names a rate limit (a secondary limit can come back with no
 * headers). The wait is `retry-after`, else the time until
 * `x-ratelimit-reset`, else a minute. Any other 403 is a permission refusal.
 */
export const rateLimited = (info: RestErrorInfo): TooManyRequests | undefined => {
  if (info.status !== 403 && info.status !== 429) return undefined;
  const retryAfter = parseRetryAfter(info.headers);
  const exhausted = info.headers["x-ratelimit-remaining"] === "0";
  if (retryAfter === undefined && !exhausted && !/rate limit/i.test(info.message)) {
    return undefined;
  }
  const reset = Number(info.headers["x-ratelimit-reset"]);
  return new TooManyRequests({
    message: info.message,
    retryAfter:
      retryAfter ??
      (exhausted && Number.isFinite(reset)
        ? Duration.millis(Math.max(0, reset * 1000 - Date.now()))
        : SECONDARY_RATE_LIMIT_WAIT),
  });
};

const RestProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the CALLING fiber per request (the layer is memoized per
  // process); the Credentials service holds an effect so rotating tokens
  // (GitHub App installation tokens expire hourly) Just Work.
  credentials: Credentials,
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": API_VERSION,
    "User-Agent": creds.userAgent,
  }),
  errorEnvelope,
  classifyError: rateLimited,
  // Core's shared map plus 410 -- GitHub uses Gone far more than most APIs
  // (issues disabled, deleted migration archives).
  statusMap: { ...HTTP_STATUS_MAP, 410: Gone },
  unknownError: ({ status, code, message, body, headers }) =>
    new UnknownGithubError({
      status,
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      headers,
      body,
    }),
  parseError: ({ body, cause }) => new GithubParseError({ body, cause }),
});

// =============================================================================
// Write pacing
// =============================================================================

/** Spaces requests that create content; see {@link paceWrites}. */
interface WriteGate {
  readonly intervalMs: number;
  /** Epoch milliseconds the next write may start at. */
  next: number;
}

/** The write gate in scope, if any; none by default. */
const WritePacing = /*@__PURE__*/ Context.Reference<WriteGate | undefined>(
  "@distilled.cloud/github/WritePacing",
  { defaultValue: () => undefined },
);

const WRITE_METHODS = /*@__PURE__*/ new Set(["POST", "PATCH", "PUT", "DELETE"]);

/**
 * Space POST, PATCH, PUT and DELETE requests at least `interval` apart
 * (default one second) for every GitHub call below this layer. GitHub asks
 * clients that make many such requests to wait a second between them, and
 * answers bursts with secondary rate limits
 * (https://docs.github.com/rest/using-the-rest-api/best-practices-for-using-the-rest-api#pause-between-mutative-requests).
 * Reads are not paced. Each layer build keeps its own schedule.
 *
 * @example
 * ```ts
 * program.pipe(Effect.provide(GitHub.paceWrites()));
 * ```
 */
export const paceWrites = (options?: { readonly interval?: Duration.Input }): Layer.Layer<never> =>
  Layer.sync(WritePacing, () => ({
    intervalMs: Duration.toMillis(Duration.fromInputUnsafe(options?.interval ?? "1 second")),
    next: 0,
  }));

/** Wait for this request's slot when a write gate is in scope. */
const paced = <A, E, R>(
  op: API.PreparedOperation,
  effect: Effect.Effect<A, E, R>,
): Effect.Effect<A, E, R> =>
  Effect.flatMap(Effect.service(WritePacing), (gate) => {
    const method = (getAnn(op.inputAst, httpSymbol) as HttpTrait | undefined)?.method;
    if (gate === undefined || method === undefined || !WRITE_METHODS.has(method)) return effect;
    const now = Date.now();
    const start = Math.max(now, gate.next);
    gate.next = start + gate.intervalMs;
    return start > now ? Effect.andThen(Effect.sleep(start - now), effect) : effect;
  });

// =============================================================================
// Protocol
// =============================================================================

/** How long after a token is minted a 401 is taken for replication lag. */
const FRESH_TOKEN_WINDOW_MS = 5_000;
const FRESH_TOKEN_RETRY_DELAY = /*@__PURE__*/ Duration.millis(500);

/**
 * Send a call again while it fails with 401 and the token is younger than
 * {@link FRESH_TOKEN_WINDOW_MS}, as Octokit's `@octokit/auth-app` does.
 */
const retryFreshToken = (call: Effect.Effect<unknown>): Effect.Effect<unknown> => {
  // Protocol effects erase their error and requirement channels (see
  // core/protocol-rest), so the failure is read by its tag here.
  const attempt = Effect.catch(call, (error: unknown) =>
    (error as { readonly _tag?: unknown } | null)?._tag === "Unauthorized"
      ? Effect.flatMap(
          Effect.flatMap(Effect.service(Credentials), (resolve) => resolve),
          (creds) =>
            creds.issuedAt !== undefined && Date.now() - creds.issuedAt < FRESH_TOKEN_WINDOW_MS
              ? Effect.andThen(Effect.sleep(FRESH_TOKEN_RETRY_DELAY), attempt)
              : Effect.fail(error),
        )
      : Effect.fail(error),
  ) as Effect.Effect<unknown>;
  return attempt;
};

export const GithubProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.effect(
  API.Protocol,
  /*@__PURE__*/ Effect.map(Effect.service(API.Protocol), (rest) =>
    API.Protocol.of({
      ...rest,
      call: (op, input) => paced(op, retryFreshToken(rest.call!(op, input))),
    }),
  ),
).pipe(/*@__PURE__*/ Layer.provide(RestProtocol));
