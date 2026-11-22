/**
 * A gRPC transport over HTTP/2 with `node:http2`, for servers that offer
 * nothing else (`fetch` in Node and Bun speaks HTTP/1.1).
 *
 * ```ts
 * import * as NodeHttp2 from "@distilled.cloud/core/grpc-transport-node-http2";
 *
 * program.pipe(Effect.provide(NodeHttp2.layer));
 * ```
 *
 * Requests share one session per origin; an idle session doesn't keep the
 * process alive. {@link unixSocket} sends them over a Unix domain socket
 * instead (a gRPC server on a local socket, such as Modal's
 * `unix:/run/modal.sock` inside its containers). The response body is an
 * Effect `Stream` fed by the HTTP/2 stream as data arrives; the trailers
 * settle when it ends, and fail when the stream fails or closes first. A
 * stream the server resets ends the call with the gRPC status the reset's
 * code maps to (`resetTrailers`). `node:http2` is found on first use (no
 * static import), so the module loads in any runtime and only a call needs
 * Node.
 */
import * as Cause from "effect/Cause";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import type * as Layer from "effect/Layer";
import * as Queue from "effect/Queue";
import * as Stream from "effect/Stream";
import {
  isResponseStatus,
  hasNoBody,
  layer as transportLayer,
  resetReply,
  resetTrailers,
  respond,
  type Trailers,
} from "./grpc-transport.ts";

type Http2 = typeof import("node:http2");
type Net = typeof import("node:net");
type Session = import("node:http2").ClientHttp2Session;
type IncomingHeaders = import("node:http2").IncomingHttpHeaders;

const builtin = <A>(id: string): A | undefined =>
  (
    globalThis as { process?: { getBuiltinModule?: (id: string) => unknown } }
  ).process?.getBuiltinModule?.(id) as A | undefined;

const http2Module = (): Http2 | undefined => builtin<Http2>("node:http2");

const sessions = new Map<string, { session: Session; active: number }>();

/** Where a session connects: an origin over TCP, or a Unix domain socket. */
type Target = { readonly origin: string } | { readonly socketPath: string };

const keyOf = (target: Target) =>
  "socketPath" in target ? `unix:${target.socketPath}` : target.origin;

const connect = (http2: Http2, target: Target): Session => {
  if (!("socketPath" in target)) return http2.connect(target.origin);
  const net = builtin<Net>("node:net");
  if (net === undefined) throw new Error("node:net is not available in this runtime");
  // The authority is only the `:authority` pseudo-header; the socket is the transport.
  return http2.connect("http://localhost", {
    createConnection: () => net.connect(target.socketPath),
  });
};

const sessionFor = (http2: Http2, target: Target) => {
  const key = keyOf(target);
  const existing = sessions.get(key);
  if (existing && !existing.session.closed && !existing.session.destroyed) return existing;
  const entry = { session: connect(http2, target), active: 0 };
  entry.session.unref();
  const drop = () => {
    if (sessions.get(key) === entry) sessions.delete(key);
  };
  entry.session.on("error", drop);
  entry.session.on("close", drop);
  entry.session.on("goaway", drop);
  sessions.set(key, entry);
  return entry;
};

/** Headers HTTP/2 forbids or derives itself. */
const CONNECTION_HEADERS = new Set([
  "host",
  "connection",
  "keep-alive",
  "content-length",
  "transfer-encoding",
  "upgrade",
]);

const plain = (incoming: IncomingHeaders): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(incoming)) {
    if (key.startsWith(":") || value === undefined) continue;
    out[key] = Array.isArray(value) ? value.join(", ") : String(value);
  }
  return out;
};

const transportError = (request: HttpClientRequest.HttpClientRequest, cause: unknown) =>
  new HttpClientError.HttpClientError({
    reason: new HttpClientError.TransportError({
      request,
      cause,
      description: "HTTP/2 request failed",
    }),
  });

const bodyOf = (request: HttpClientRequest.HttpClientRequest): Uint8Array | undefined =>
  request.body._tag === "Uint8Array" ? request.body.body : undefined;

/**
 * An `HttpClient` that sends each request as an HTTP/2 stream, to the
 * request's origin or to `socketPath`.
 */
const make = (socketPath: string | undefined): HttpClient.HttpClient =>
  HttpClient.make((request, url, signal) =>
    Effect.gen(function* () {
      // Fed by the HTTP/2 stream's events from the moment it opens, and read
      // as the response's body in the caller's fiber.
      const chunks = yield* Queue.unbounded<Uint8Array, unknown>();
      const trailers = yield* Deferred.make<Trailers, unknown>();
      return yield* Effect.callback<
        HttpClientResponse.HttpClientResponse,
        HttpClientError.HttpClientError
      >((resume) => {
        const http2 = http2Module();
        if (http2 === undefined) {
          resume(
            Effect.fail(
              transportError(request, new Error("node:http2 is not available in this runtime")),
            ),
          );
          return;
        }
        let entry: { session: Session; active: number };
        try {
          entry = sessionFor(
            http2,
            socketPath === undefined ? { origin: url.origin } : { socketPath },
          );
        } catch (error) {
          resume(Effect.fail(transportError(request, error)));
          return;
        }
        if (entry.active++ === 0) entry.session.ref();
        let settled = false;
        const settle = () => {
          if (settled) return;
          settled = true;
          if (--entry.active === 0 && !entry.session.destroyed) entry.session.unref();
        };
        const headers: Record<string, string> = {};
        for (const [key, value] of Object.entries(request.headers)) {
          if (!CONNECTION_HEADERS.has(key)) headers[key] = value;
        }
        const stream = entry.session.request({
          ":method": request.method,
          ":path": `${url.pathname}${url.search}`,
          ...headers,
        });
        // The response is dropped unread, its scope closed, or the call interrupted.
        const onAbort = () => stream.close(http2.constants.NGHTTP2_CANCEL);
        if (signal.aborted) onAbort();
        else signal.addEventListener("abort", onAbort, { once: true });

        let received: Trailers = {};
        let ended = false;
        let started = false;
        /** The call already failed with a transport error. */
        let failed = false;
        const failWith = (cause: unknown) => {
          Queue.failCauseUnsafe(chunks, Cause.fail(cause));
          Deferred.doneUnsafe(trailers, Effect.fail(cause));
        };
        const fail = (cause: unknown) => {
          failed = true;
          if (started) return failWith(cause);
          resume(Effect.fail(transportError(request, cause)));
        };
        stream.on("trailers", (incoming) => (received = plain(incoming)));
        stream.on("data", (chunk: Uint8Array) => {
          Queue.offerUnsafe(chunks, new Uint8Array(chunk));
        });
        stream.on("end", () => {
          ended = true;
          Queue.endUnsafe(chunks);
          Deferred.doneUnsafe(trailers, Effect.succeed(received));
        });
        // Every stream ends here, a reset included, which emits no `error` for
        // NO_ERROR or CANCEL. As in grpc-js, the reset code decides the call.
        stream.on("close", () => {
          settle();
          signal.removeEventListener("abort", onAbort);
          if (failed) return;
          // Node closes every stream of a lost connection with CANCEL; that is
          // a transport failure, which retries, and no answer from the server.
          if (entry.session.destroyed) {
            if (!started || !ended) {
              fail(new Error("the HTTP/2 connection closed before the response ended"));
            }
            return;
          }
          if (!started) {
            started = true;
            resume(
              respond(request, resetReply(stream.rstCode)).pipe(
                Effect.mapError((cause) => transportError(request, cause)),
              ),
            );
          } else if (!ended) {
            ended = true;
            Queue.endUnsafe(chunks);
            Deferred.doneUnsafe(trailers, Effect.succeed(resetTrailers(stream.rstCode)));
          }
        });

        stream.on("response", (incoming) => {
          started = true;
          const status = Number(incoming[":status"] ?? 0);
          if (!isResponseStatus(status)) {
            stream.close(http2.constants.NGHTTP2_CANCEL);
            resume(
              Effect.fail(transportError(request, new Error(`invalid HTTP status ${status}`))),
            );
            return;
          }
          const body = Stream.fromQueue(chunks).pipe(
            // A reader that stops early lets the stream go.
            Stream.ensuring(
              Effect.sync(() => {
                if (!ended) stream.close(http2.constants.NGHTTP2_CANCEL);
              }),
            ),
          );
          if (hasNoBody(status)) stream.close(http2.constants.NGHTTP2_CANCEL);
          resume(
            respond(request, {
              status,
              headers: plain(incoming),
              body,
              trailers: Deferred.await(trailers),
            }).pipe(
              Effect.mapError((cause) => transportError(request, cause)),
              Effect.tapError(() =>
                Effect.sync(() => stream.close(http2.constants.NGHTTP2_CANCEL)),
              ),
            ),
          );
        });
        stream.on("error", (error: Error & { code?: string }) => {
          // The server's RST_STREAM: `close` follows with its code.
          if (error.code === "ERR_HTTP2_STREAM_ERROR") return;
          fail(error);
        });
        const body = bodyOf(request);
        stream.end(body === undefined ? undefined : body);
      });
    }),
  );

/** An `HttpClient` that sends each request as an HTTP/2 stream. */
export const client: HttpClient.HttpClient = /*@__PURE__*/ make(undefined);

/**
 * An `HttpClient` that sends each request as an HTTP/2 stream over the Unix
 * domain socket at `path`, whatever the request's host. Requests share one
 * session per socket.
 *
 * ```ts
 * program.pipe(Effect.provide(NodeHttp2.unixLayer("/run/modal.sock")));
 * ```
 */
export const unixSocket = (path: string): HttpClient.HttpClient => make(path);

/** Send gRPC calls over HTTP/2 in this scope. */
export const layer: Layer.Layer<never> = /*@__PURE__*/ transportLayer(client);

/** Send gRPC calls over HTTP/2 on the Unix domain socket at `path` in this scope. */
export const unixLayer = (path: string): Layer.Layer<never> => transportLayer(unixSocket(path));
