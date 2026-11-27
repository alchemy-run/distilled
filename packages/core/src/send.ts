/**
 * Send one HTTP request for an operation: `Telemetry.execute` (spans, trace
 * headers, debug output), plus the facts the retry layer reads after a
 * failure (see `./retry-state.ts`): which host the request went to, whether
 * it succeeded, and the response's bounded retry hint.
 *
 * Every protocol sends through this, so the retry budget and the
 * `x-amz-retry-after` / `x-distilled-retry-after` headers work for all of
 * them. A protocol that calls `client.execute` directly still retries, on
 * the plain backoff, outside the budget.
 *
 * A body it cannot send twice (the caller's own stream) makes the call
 * `oneShot`: the retry layer then never sends it again. A stream body is
 * one-shot unless the protocol says otherwise (S3 replays a Blob's stream).
 *
 * Redirects are followed here, not by `fetch`. `fetch` removes only
 * `Authorization` and `Cookie` when a redirect goes to another origin, so
 * an API key in `x-api-key`, `DD-API-KEY` or `X-Auth-Token` would reach the
 * new host. A hop to the same origin keeps every header; a hop to another
 * origin keeps only {@link CROSS_ORIGIN_HEADERS}. Every `HttpClient` gets
 * the same rule: the Node clients hand a `3xx` back too.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Headers from "effect/http/Headers";
import * as HttpBody from "effect/http/HttpBody";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Url from "effect/http/Url";
import * as UrlParams from "effect/http/UrlParams";
import * as Option from "effect/Option";
import * as Result from "effect/Result";
import * as RetryState from "./retry-state.ts";
import * as Telemetry from "./telemetry.ts";

/** Redirects followed before the last `3xx` is returned as the response. */
export const MAX_REDIRECTS = 5;

/**
 * The only request headers a redirect to another origin keeps. Credentials,
 * signatures and provider headers are all dropped.
 */
export const CROSS_ORIGIN_HEADERS: ReadonlySet<string> = new Set([
  "accept",
  "accept-encoding",
  "accept-language",
  "cache-control",
  "content-language",
  "content-length",
  "content-type",
  "if-match",
  "if-modified-since",
  "if-none-match",
  "if-range",
  "if-unmodified-since",
  "range",
  "user-agent",
]);

// A browser returns an opaque response with no `Location` for
// `redirect: "manual"`, so there the browser's own redirect rule stays.
const isBrowser =
  typeof (globalThis as { document?: unknown }).document !== "undefined" ||
  typeof (globalThis as { importScripts?: unknown }).importScripts === "function";

/**
 * The caller's `RequestInit` with `redirect: "manual"`, unless the caller
 * chose a redirect mode. Only the fetch client reads it.
 */
const manualRedirects = (context: Context.Context<any>): globalThis.RequestInit | undefined => {
  if (isBrowser) return undefined;
  const init = Context.getOrUndefined(context, FetchHttpClient.RequestInit);
  return init?.redirect !== undefined ? undefined : { ...init, redirect: "manual" };
};

/**
 * The request for the next hop of a redirect, or `undefined` when the
 * response is not one to follow.
 */
const nextHop = (
  request: HttpClientRequest.HttpClientRequest,
  response: HttpClientResponse.HttpClientResponse,
  replayable: boolean,
): HttpClientRequest.HttpClientRequest | undefined => {
  const status = response.status;
  const location = response.headers.location;
  if (status < 300 || status >= 400 || status === 304 || location === undefined) return undefined;
  const parsed = Url.fromString(location, request.url);
  if (Result.isFailure(parsed)) return undefined;
  const url = parsed.success;
  url.hash = "";

  let method = request.method;
  let body = request.body;
  let headers = request.headers;
  if (
    ((status === 301 || status === 302) && method === "POST") ||
    (status === 303 && method !== "GET" && method !== "HEAD")
  ) {
    method = "GET";
    body = HttpBody.empty;
    headers = Headers.remove(headers, "content-type");
    headers = Headers.remove(headers, "content-length");
    headers = Headers.remove(headers, "content-encoding");
  } else if (body._tag !== "Empty" && !replayable) {
    // A 307 or 308 sends the body again, and the caller's stream is spent.
    return undefined;
  }
  // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `Url.fromString(location, request.url)` above parsed `request.url` as its base, so it is a URL
  if (url.origin !== new URL(request.url).origin) {
    headers = Headers.fromInput(
      Object.entries(headers).filter(([name]) => CROSS_ORIGIN_HEADERS.has(name)),
    );
  }
  // The `Location` as sent: a `URL` object would re-encode a signed query.
  return HttpClientRequest.makeWith(
    method,
    url.href,
    UrlParams.empty,
    Option.none(),
    headers,
    body,
  );
};

export const send = (
  context: Context.Context<any>,
  client: HttpClient.HttpClient,
  request: HttpClientRequest.HttpClientRequest,
  oneShot?: boolean,
): Effect.Effect<HttpClientResponse.HttpClientResponse, HttpClientError.HttpClientError> => {
  const once = oneShot ?? request.body._tag === "Stream";
  const hop = (
    request: HttpClientRequest.HttpClientRequest,
    redirects: number,
  ): Effect.Effect<HttpClientResponse.HttpClientResponse, HttpClientError.HttpClientError> =>
    // Inside `suspend`: the retry layer runs this same effect again for each
    // attempt, and each attempt must record its own request.
    Effect.suspend(() => {
      RetryState.recordRequest(request.url, once);
      return Effect.flatMap(Telemetry.execute(context, client, request), (response) => {
        const next = redirects < MAX_REDIRECTS ? nextHop(request, response, !once) : undefined;
        if (next !== undefined) return hop(next, redirects + 1);
        RetryState.recordResponse(
          response.status,
          response.headers as Readonly<Record<string, string | undefined>>,
        );
        return Effect.succeed(response);
      });
    });
  const init = manualRedirects(context);
  const sent = hop(request, 0);
  return init === undefined ? sent : Effect.provideService(sent, FetchHttpClient.RequestInit, init);
};
