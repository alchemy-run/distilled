import * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import { getAnn, matchTypedError } from "@distilled.cloud/core/protocol-http";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import { parseServerRetryHint } from "@distilled.cloud/core/retry-after";
import { httpSymbol, type HttpTrait } from "@distilled.cloud/core/trait";
/**
 * AnthropicProtocol — hand-written.
 *
 * Anthropic speaks plain JSON REST, so the body handling is core's
 * `makeRestProtocol`; this module adds what is Anthropic-specific on top:
 *
 *   request:  `anthropic-version` (+ default `anthropic-beta`) on every call;
 *             the credential chosen per route — the admin key on
 *             `/v1/organizations/*`, the API key elsewhere, the OAuth bearer
 *             token as the fallback for both — failing with
 *             {@link MissingAnthropicCredentials} before anything is sent when
 *             none applies; and beta routes' literal `?beta=true` (carried on
 *             the operation's uri, see scripts/convert.ts) folded into the
 *             query string.
 *
 *   response: 2xx JSON is the payload. Failures are matched on the
 *             envelope's `error.type` (`{ type: "error", error: { type,
 *             message } }`) to the classes in errors.ts, with the server's
 *             retry hint stamped on the retryable ones; anything else maps
 *             by status (529 → Overloaded), then to
 *             {@link UnknownAnthropicError}.
 *
 *   streams:  each SSE `data` payload decodes like a 2xx body; an `error`
 *             event mid-stream fails the stream with the same typed classes.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as UrlParams from "effect/http/UrlParams";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import {
  AnthropicParseError,
  ApiServerError,
  ENVELOPE_ERRORS,
  MissingAnthropicCredentials,
  Overloaded,
  RateLimited,
  RequestTimeout,
  UnknownAnthropicError,
} from "./errors.ts";

/**
 * Error channel shared by every generated Anthropic operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * AnthropicOpError, AnthropicOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type AnthropicOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | InstanceType<(typeof ENVELOPE_ERRORS)[number]>
  | MissingAnthropicCredentials
  | UnknownAnthropicError
  | ConfigError
  | HttpClientError.HttpClientError
  | AnthropicParseError;

/** Context (requirements) shared by every generated Anthropic operation. */
export type AnthropicOpContext = Credentials | HttpClient.HttpClient;

/** Admin API routes authenticate with the admin key. */
const ADMIN_ROUTE_PREFIX = "/v1/organizations/";

const resolveCredentials = Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

/** The auth headers for one route, or the typed failure when none applies. */
const authHeaders = (
  creds: Config,
  uri: string,
): Record<string, string> | MissingAnthropicCredentials => {
  const admin = uri.startsWith(ADMIN_ROUTE_PREFIX);
  const key = admin ? creds.adminKey : creds.apiKey;
  if (key !== undefined) return { "x-api-key": Redacted.value(key) };
  if (creds.authToken !== undefined) {
    return { authorization: `Bearer ${Redacted.value(creds.authToken)}` };
  }
  return admin
    ? new MissingAnthropicCredentials({
        required: "admin",
        message:
          "Admin API operations (/v1/organizations/*) need an admin key (ANTHROPIC_ADMIN_KEY) or an OAuth token (ANTHROPIC_AUTH_TOKEN)",
      })
    : new MissingAnthropicCredentials({
        required: "api",
        message:
          "This operation needs an API key (ANTHROPIC_API_KEY) or an OAuth token (ANTHROPIC_AUTH_TOKEN)",
      });
};

/**
 * Fold a literal query in the route (`/v1/messages?beta=true`, built as
 * `<uri>?<params>` by the shared request builder) into the request's
 * URL params.
 */
const foldLiteralQuery = (
  request: HttpClientRequest.HttpClientRequest,
): HttpClientRequest.HttpClientRequest => {
  const i = request.url.indexOf("?");
  if (i < 0) return request;
  const literal = new URLSearchParams(request.url.slice(i + 1).replaceAll("?", "&"));
  return request.pipe(
    HttpClientRequest.setUrl(request.url.slice(0, i)),
    HttpClientRequest.appendUrlParams(UrlParams.fromInput(literal)),
  );
};

const RETRY_HINTED = [RateLimited, Overloaded, ApiServerError, RequestTimeout] as const;

/** Stamp the server's retry hint on a retryable `error.type` failure. */
const withRetryHint = (error: unknown): unknown => {
  for (const Cls of RETRY_HINTED) {
    if (error instanceof Cls && error.retryAfter === undefined && error.headers !== undefined) {
      const retryAfter = parseServerRetryHint(error.headers as Record<string, string | undefined>);
      return retryAfter === undefined
        ? error
        : new Cls({ message: error.message, body: error.body, headers: error.headers, retryAfter });
    }
  }
  return error;
};

const envelope = (body: unknown): { type?: string; message?: string } | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const error = (body as { error?: unknown }).error;
  if (error === null || typeof error !== "object") return undefined;
  const { type, message } = error as { type?: unknown; message?: unknown };
  return {
    type: typeof type === "string" ? type : undefined,
    message: typeof message === "string" ? message : undefined,
  };
};

const RestProtocol: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
  credentials: resolveCredentials,
  baseUrl: (creds) => creds.apiBaseUrl,
  // Auth is per route — added in `encode` below.
  headers: (creds): Record<string, string> => ({
    "anthropic-version": creds.apiVersion,
    ...(creds.betas && creds.betas.length > 0 ? { "anthropic-beta": creds.betas.join(",") } : {}),
  }),
  errorEnvelope: (body) => {
    const env = envelope(body);
    return env === undefined ? undefined : { code: env.type, message: env.message };
  },
  // Overloaded is Anthropic's own 529, for the rare overload with no
  // envelope (an edge proxy answering for the API).
  statusMap: { ...HTTP_STATUS_MAP, 529: Overloaded },
  unknownError: ({ code, message, body }) =>
    new UnknownAnthropicError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new AnthropicParseError({ body, cause }),
});

// Bridge: Protocol effects carry no error channel; failures are the
// operation's typed errors, reintroduced for callers by the generated
// `AnthropicOpError` annotation.
const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

export const AnthropicProtocol: Layer.Layer<API.Protocol> = Layer.effect(
  API.Protocol,
  Effect.gen(function* () {
    const rest = yield* API.Protocol;
    return API.Protocol.of({
      encode: (args) =>
        Effect.gen(function* () {
          const creds = yield* resolveCredentials;
          const http = getAnn(args.inputAst, httpSymbol) as HttpTrait | undefined;
          const auth = authHeaders(creds, http?.uri ?? "");
          if (auth instanceof MissingAnthropicCredentials) return yield* fail(auth);
          const request = yield* rest.encode(args);
          // An operation's own `authorization` header member (the
          // environment work endpoints take a per-environment token) wins.
          const authed =
            request.headers["authorization"] === undefined
              ? HttpClientRequest.setHeaders(request, auth)
              : request;
          return foldLiteralQuery(authed);
        }) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
      decode: (args) =>
        (rest.decode(args) as Effect.Effect<unknown, unknown>).pipe(
          Effect.mapError(withRetryHint),
        ) as Effect.Effect<unknown>,
      decodeEvent: (args) => {
        // `event: error` — `{ type: "error", error: { type, message } }`.
        const data = args.data as { type?: unknown } | null;
        if (data !== null && typeof data === "object" && data.type === "error") {
          const message = envelope(data)?.message ?? "stream error";
          const typed = matchTypedError(ENVELOPE_ERRORS, 200, [{ message }], { body: data });
          return fail(
            typed ?? new UnknownAnthropicError({ code: envelope(data)?.type, message, body: data }),
          );
        }
        return rest.decodeEvent!(args);
      },
    });
  }),
).pipe(Layer.provide(RestProtocol));
