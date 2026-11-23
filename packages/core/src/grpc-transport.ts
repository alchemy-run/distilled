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
 * puts the status in the headers. A transport built here is Effect code: the
 * body is an Effect `Stream` read in the caller's fiber, and the trailers an
 * `Effect` that fails when the transport can't read them, so no failure
 * turns into an empty value on the way. Provide a different transport for one
 * scope with {@link layer}:
 *
 * - `@distilled.cloud/core/grpc-transport-node-http2` speaks HTTP/2 with
 *   `node:http2`, for servers that offer nothing else;
 * - `@distilled.cloud/core/grpc-transport-cloudflare-sockets` speaks HTTP/1.1
 *   over a `cloudflare:sockets` TLS socket, for a Cloudflare Worker calling a
 *   gRPC server that is itself behind Cloudflare (a Worker's `fetch` to such
 *   a site takes Cloudflare's internal path, which resets gRPC upstreams);
 * - `@distilled.cloud/core/grpc-transport-cloudflare-http2` speaks HTTP/2
 *   over a `cloudflare:sockets` socket, for a Cloudflare Worker calling a
 *   server that offers nothing else (workerd has no working `node:http2`).
 *
 * None is imported by this module, so a bundle only carries the ones it
 * provides.
 */
import * as Context from "effect/Context";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as Cookies from "effect/http/Cookies";
import * as Headers from "effect/http/Headers";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as HttpIncomingMessage from "effect/http/HttpIncomingMessage";
import * as UrlParams from "effect/http/UrlParams";
import * as Inspectable from "effect/Inspectable";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import { pipeArguments } from "effect/Pipeable";
import type * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";

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

/** What a transport hands over for a response. */
export interface Reply {
  readonly status: number;
  readonly headers: Trailers;
  /**
   * The body as it arrives. It runs in the fiber that reads the response, so
   * that fiber's interruption and finalizers reach the connection.
   */
  readonly body: Stream.Stream<Uint8Array, unknown>;
  /** The trailers, once the body has ended. Fails when they can't be read. */
  readonly trailers: Effect.Effect<Trailers, unknown>;
  /**
   * Whether the trailers always arrive. HTTP/2 delivers them end to end;
   * over HTTP/1.1 a bridging proxy may drop them, so the protocol then
   * treats a reply with messages and no status as OK.
   * @default true
   */
  readonly reliableTrailers?: boolean;
}

// Keyed by the request the transport sent, which a response keeps as
// `response.request` through the wrappers `HttpClient` puts around it.
const repliesByRequest = /*@__PURE__*/ new WeakMap<HttpClientRequest.HttpClientRequest, Reply>();

/**
 * Whether `status` is a final HTTP status a response can carry (200 to 599).
 * A transport fails the call with a transport error for any other.
 */
export const isResponseStatus = (status: number): boolean =>
  Number.isInteger(status) && status >= 200 && status <= 599;

/**
 * Whether a response with `status` has no body (RFC 9110 sections 15.3.5,
 * 15.3.6 and 15.4.5). Its transport lets the connection go at once.
 */
export const hasNoBody = (status: number): boolean =>
  status === 204 || status === 205 || status === 304;

/** HTTP/2 error code (RFC 9113 section 7) -> gRPC status, where it isn't INTERNAL. */
const RESET_STATUS: ReadonlyMap<number, readonly [status: number, message: string]> =
  /*@__PURE__*/ new Map([
    [0x0, [13, "the server reset the stream without a grpc-status"]],
    [0x7, [14, "the server refused the stream"]],
    [0x8, [1, "the server cancelled the call"]],
    [0xb, [8, "the server asked to slow down"]],
    [0xc, [7, "the connection is not secure enough"]],
  ]);

/**
 * The trailers of a stream the server reset with the HTTP/2 error `code`
 * before it sent a status: the gRPC status the gRPC over HTTP/2 spec maps
 * the code to (`PROTOCOL-HTTP2.md`, "Errors"), as grpc-js does. The call
 * fails like any other gRPC error: `REFUSED_STREAM` (the server did no work)
 * as `UNAVAILABLE`, which retries, `NO_ERROR` and unknown codes as
 * `INTERNAL`, which doesn't.
 */
export const resetTrailers = (code: number): Trailers => {
  const [status, message] = RESET_STATUS.get(code) ?? [13, "the server reset the stream"];
  return { "grpc-status": String(status), "grpc-message": `${message} (HTTP/2 error ${code})` };
};

/**
 * The reply for a stream the server reset with the HTTP/2 error `code`
 * before its response headers: a gRPC reply of trailers alone, carrying
 * {@link resetTrailers}.
 */
export const resetReply = (code: number): Reply => ({
  status: 200,
  headers: { "content-type": "application/grpc" },
  body: Stream.empty,
  trailers: Effect.succeed(resetTrailers(code)),
});

/**
 * Build a transport's response from its {@link Reply}. Fails with the
 * `TypeError` of a head that is no valid HTTP head (a header name that is no
 * token, a value with a line break), as `fetch` would. A response with
 * {@link hasNoBody} has an empty body and no trailers.
 */
export const respond = (
  request: HttpClientRequest.HttpClientRequest,
  reply: Reply,
): Effect.Effect<HttpClientResponse.HttpClientResponse, unknown> =>
  Effect.try({
    try: () => new globalThis.Headers(reply.headers as Record<string, string>),
    catch: (cause) => cause,
  }).pipe(
    Effect.map(() => {
      const kept = hasNoBody(reply.status)
        ? { ...reply, body: Stream.empty, trailers: Effect.succeed({}) }
        : reply;
      repliesByRequest.set(request, kept);
      return new ReplyResponse(request, kept);
    }),
  );

/**
 * Whether `response` came from a transport whose trailers always arrive
 * ({@link Reply.reliableTrailers}), so a missing status is an error.
 */
export const hasTrailers = (response: HttpClientResponse.HttpClientResponse): boolean => {
  const reply = repliesByRequest.get(response.request);
  return reply !== undefined && (reply.reliableTrailers ?? true);
};

/**
 * The trailers of a response a transport built with {@link respond}, read
 * after its body; empty for any other response (`fetch` exposes none). A
 * transport that can't read them fails with a `DecodeError`.
 */
export const trailersOf = (
  response: HttpClientResponse.HttpClientResponse,
): Effect.Effect<Trailers, HttpClientError.HttpClientError> => {
  const reply = repliesByRequest.get(response.request);
  return reply === undefined
    ? Effect.succeed({})
    : Effect.mapError(reply.trailers, (cause) => decodeError(response, cause));
};

const decodeError = (response: HttpClientResponse.HttpClientResponse, cause: unknown) =>
  new HttpClientError.HttpClientError({
    reason: new HttpClientError.DecodeError({ request: response.request, response, cause }),
  });

/**
 * An `HttpClientResponse` over a {@link Reply}, built like Effect's own web
 * response, with the body read from the transport's stream.
 */
class ReplyResponse extends Inspectable.Class implements HttpClientResponse.HttpClientResponse {
  readonly [HttpIncomingMessage.TypeId] = HttpIncomingMessage.TypeId;
  readonly [HttpClientResponse.TypeId] = HttpClientResponse.TypeId;
  readonly headers: Headers.Headers;
  readonly cookies: Cookies.Cookies;
  readonly remoteAddress = Option.none<string>();
  /** The body, read once and shared by `arrayBuffer`, `text` and `json`. */
  private bytes?: Deferred.Deferred<Uint8Array, HttpClientError.HttpClientError>;

  readonly request: HttpClientRequest.HttpClientRequest;
  private readonly reply: Reply;

  constructor(request: HttpClientRequest.HttpClientRequest, reply: Reply) {
    super();
    this.request = request;
    this.reply = reply;
    this.headers = Headers.fromInput(reply.headers);
    const setCookie = reply.headers["set-cookie"];
    this.cookies = setCookie === undefined ? Cookies.empty : Cookies.fromSetCookie(setCookie);
  }

  get status(): number {
    return this.reply.status;
  }

  get url(): string {
    const url = HttpClientRequest.toUrl(this.request);
    if (Option.isNone(url)) return "";
    url.value.hash = "";
    return url.value.href;
  }

  get stream(): Stream.Stream<Uint8Array, HttpClientError.HttpClientError> {
    return Stream.mapError(this.reply.body, (cause) => decodeError(this, cause));
  }

  private get body(): Effect.Effect<Uint8Array, HttpClientError.HttpClientError> {
    return Effect.suspend(() => {
      if (this.bytes !== undefined) return Deferred.await(this.bytes);
      const bytes = (this.bytes = Deferred.makeUnsafe());
      return Effect.flatMap(Deferred.into(Stream.mkUint8Array(this.stream), bytes), () =>
        Deferred.await(bytes),
      );
    });
  }

  get arrayBuffer(): Effect.Effect<ArrayBuffer, HttpClientError.HttpClientError> {
    return Effect.map(this.body, (bytes) => bytes.slice().buffer as ArrayBuffer);
  }

  get text(): Effect.Effect<string, HttpClientError.HttpClientError> {
    return Effect.map(this.body, (bytes) => new TextDecoder().decode(bytes));
  }

  get json(): Effect.Effect<Schema.Json, HttpClientError.HttpClientError> {
    return Effect.flatMap(this.text, (text) =>
      Effect.try({
        try: () => (text === "" ? null : (JSON.parse(text) as Schema.Json)),
        catch: (cause) => decodeError(this, cause),
      }),
    );
  }

  get urlParamsBody(): Effect.Effect<UrlParams.UrlParams, HttpClientError.HttpClientError> {
    return Effect.map(this.text, (text) => UrlParams.fromInput(new URLSearchParams(text)));
  }

  get formData(): Effect.Effect<FormData, HttpClientError.HttpClientError> {
    return Effect.fail(decodeError(this, new Error("a gRPC transport reads no form data")));
  }

  get upgrade(): Effect.Effect<never, HttpClientError.HttpClientError> {
    return Effect.fail(
      new HttpClientError.HttpClientError({
        reason: new HttpClientError.StatusCodeError({
          request: this.request,
          response: this,
          description: "a gRPC transport cannot hand over the connection of an HTTP upgrade",
        }),
      }),
    );
  }

  toJSON(): unknown {
    return HttpIncomingMessage.inspect(this, {
      _id: "HttpClientResponse",
      request: this.request.toJSON(),
      status: this.status,
    });
  }

  pipe() {
    return pipeArguments(this, arguments);
  }
}
