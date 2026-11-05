/**
 * How gRPC calls reach a server.
 *
 * A transport is an Effect `HttpClient`: it sends the request
 * `protocol-grpc` builds (`POST`, `application/grpc`, one frame) and returns
 * the response with its body as a stream, so a server-streaming call reads
 * each message as it arrives. gRPC puts the call's status in the trailers;
 * a transport that can read them hands them over with {@link respond}, and
 * the protocol reads them with {@link trailersOf} once the body has ended.
 *
 * By default `protocol-grpc` sends through the caller's `HttpClient`
 * (`fetch`), which works where a proxy bridges HTTP/1.1 to gRPC (envoy) and
 * puts the status in the headers. Provide a different transport for one
 * scope with {@link layer}:
 *
 * - `@distilled.cloud/core/grpc-transport-node-http2` speaks HTTP/2 with
 *   `node:http2`, for servers that offer nothing else;
 * - `@distilled.cloud/core/grpc-transport-cloudflare-sockets` speaks HTTP/1.1
 *   over a `cloudflare:sockets` TLS socket, for a Cloudflare Worker calling a
 *   gRPC server that is itself behind Cloudflare (a Worker's `fetch` to such
 *   a site takes Cloudflare's internal path, which resets gRPC upstreams).
 *
 * Neither is imported by this module, so a bundle only carries the one it
 * provides.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";

/**
 * The `HttpClient` gRPC calls go through. `undefined` (the default) sends
 * through the caller's `HttpClient`.
 */
export const GrpcTransport = /*@__PURE__*/ Context.Reference<HttpClient.HttpClient | undefined>(
  "@distilled.cloud/core/GrpcTransport",
  { defaultValue: () => undefined },
);

/** Send gRPC calls in this scope through `client`. */
export const layer = (client: HttpClient.HttpClient): Layer.Layer<never> =>
  Layer.succeed(GrpcTransport, client);

/** Header and trailer names are lowercase; values as received. */
export type Trailers = Readonly<Record<string, string>>;

// Keyed by the request the transport sent, which a response keeps as
// `response.request` through the wrappers `HttpClient` puts around it.
const trailersByRequest = /*@__PURE__*/ new WeakMap<
  HttpClientRequest.HttpClientRequest,
  { readonly trailers: Promise<Trailers>; readonly reliable: boolean }
>();

/**
 * Whether `status` is a final HTTP status a response can carry (200 to 599).
 * A transport fails the call with a transport error for any other.
 */
export const isResponseStatus = (status: number): boolean =>
  Number.isInteger(status) && status >= 200 && status <= 599;

/**
 * Build a transport's response: the status, the headers, the body as it
 * arrives, and the trailers, which settle once the body has ended.
 */
export const respond = (
  request: HttpClientRequest.HttpClientRequest,
  reply: {
    readonly status: number;
    readonly headers: Trailers;
    readonly body: ReadableStream<Uint8Array>;
    readonly trailers: Promise<Trailers>;
    /**
     * Whether the trailers always arrive. HTTP/2 delivers them end to end;
     * over HTTP/1.1 a bridging proxy may drop them, so the protocol then
     * treats a reply with messages and no status as OK.
     * @default true
     */
    readonly reliableTrailers?: boolean;
  },
): HttpClientResponse.HttpClientResponse => {
  trailersByRequest.set(request, {
    trailers: reply.trailers,
    reliable: reply.reliableTrailers ?? true,
  });
  return HttpClientResponse.fromWeb(
    request,
    new Response(reply.body, { status: reply.status, headers: reply.headers }),
  );
};

/**
 * Whether `response` came from a transport whose trailers always arrive
 * ({@link respond} with `reliableTrailers`), so a missing status is an error.
 */
export const hasTrailers = (response: HttpClientResponse.HttpClientResponse): boolean =>
  trailersByRequest.get(response.request)?.reliable === true;

/**
 * The trailers of a response a transport built with {@link respond}, read
 * after its body; empty for any other response (`fetch` exposes none).
 */
export const trailersOf = (
  response: HttpClientResponse.HttpClientResponse,
): Effect.Effect<Trailers> => {
  const entry = trailersByRequest.get(response.request);
  return entry === undefined
    ? Effect.succeed({})
    : Effect.promise(() => entry.trailers.catch((): Trailers => ({})));
};
