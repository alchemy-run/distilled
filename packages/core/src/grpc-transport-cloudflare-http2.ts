/**
 * A gRPC transport over HTTP/2 on a `cloudflare:sockets` socket, for a
 * Cloudflare Worker calling a gRPC server that speaks only HTTP/2.
 *
 * workerd has no working `node:http2`, and a Worker's `fetch` reads no
 * trailers, so this module speaks HTTP/2 itself (RFC 9113) over a plain TLS
 * socket.
 *
 * ```ts
 * import * as CloudflareHttp2 from "@distilled.cloud/core/grpc-transport-cloudflare-http2";
 *
 * program.pipe(Effect.provide(CloudflareHttp2.layer));
 * ```
 *
 * `cloudflare:sockets` offers no ALPN, so the connection starts with the
 * HTTP/2 preface straight after the TLS handshake. The server must accept
 * that, as gRPC servers that serve nothing but HTTP/2 do.
 *
 * Each request opens its own connection and uses one stream on it: workerd
 * ties a socket to the request that opened it, so connections are never
 * pooled across events. The exchange is Effect code: the body is an Effect
 * `Stream` that reads frames off the socket in the caller's fiber and closes
 * it when the stream ends or the reader stops, and the trailers settle when
 * it ends.
 */
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";
import {
  isResponseStatus,
  layer as transportLayer,
  type Reply,
  hasNoBody,
  resetTrailers,
  respond,
  type Trailers,
} from "./grpc-transport.ts";
import { encode, type HeaderField, makeDecoder } from "./hpack.ts";

/** The part of `cloudflare:sockets` this transport uses. */
type Connect = (
  address: { hostname: string; port: number },
  options: { secureTransport: "on" | "off"; allowHalfOpen: boolean },
) => Socket;

interface Socket {
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<Uint8Array>;
  close(): Promise<void>;
}

// A non-literal specifier keeps bundlers from resolving it for runtimes
// other than workerd, which resolves its built-in modules at runtime.
/** Run `f`, failing with what it throws as is. */
const attempt = <A>(f: () => A): Effect.Effect<A, unknown> =>
  Effect.try({ try: f, catch: (cause) => cause });

/** Await `f`, failing with what it rejects with as is. */
const attemptPromise = <A>(f: () => PromiseLike<A>): Effect.Effect<A, unknown> =>
  Effect.tryPromise({ try: () => f(), catch: (cause) => cause });

const SOCKETS_MODULE = "cloudflare:sockets";
let connectFn: Connect | undefined;
const loadConnect: Effect.Effect<Connect, unknown> = /*@__PURE__*/ Effect.suspend(() =>
  connectFn !== undefined
    ? Effect.succeed(connectFn)
    : attemptPromise(() => import(SOCKETS_MODULE) as Promise<{ connect: Connect }>).pipe(
        Effect.map((module) => (connectFn = module.connect)),
      ),
);

/** Headers HTTP/2 forbids or derives itself. */
const CONNECTION_HEADERS = new Set([
  "host",
  "connection",
  "keep-alive",
  "content-length",
  "transfer-encoding",
  "upgrade",
]);

// RFC 9113 section 6: frame types.
const DATA = 0;
const HEADERS = 1;
const RST_STREAM = 3;
const SETTINGS = 4;
const PUSH_PROMISE = 5;
const PING = 6;
const GOAWAY = 7;
const WINDOW_UPDATE = 8;
const CONTINUATION = 9;

// Frame flags.
const END_STREAM = 0x1;
const ACK = 0x1;
const END_HEADERS = 0x4;
const PADDED = 0x8;
const PRIORITY = 0x20;

// Settings.
const SETTINGS_ENABLE_PUSH = 2;
const SETTINGS_INITIAL_WINDOW_SIZE = 4;
const SETTINGS_MAX_FRAME_SIZE = 5;

/** The largest flow-control window and the largest frame HTTP/2 allows. */
const MAX_WINDOW = 0x7fffffff;
const MAX_FRAME_LIMIT = 0xffffff;

/** The flow-control window and frame size both ends start with. */
const DEFAULT_WINDOW = 65_535;
const DEFAULT_MAX_FRAME = 16_384;
/** How much reply this end lets the server send before it has been read. */
const RECEIVE_WINDOW = 1_048_576;
/** Read octets are handed back to the server in steps of this size. */
const WINDOW_STEP = 65_536;

/** The one stream of a connection. Client streams are odd. */
const STREAM = 1;

const PREFACE = /*@__PURE__*/ new TextEncoder().encode("PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n");

class ProtocolViolation extends Error {}

const concat = (parts: ReadonlyArray<Uint8Array>): Uint8Array<ArrayBufferLike> => {
  if (parts.length === 1) return parts[0]!;
  let length = 0;
  for (const part of parts) length += part.length;
  const out = new Uint8Array(length);
  let at = 0;
  for (const part of parts) {
    out.set(part, at);
    at += part.length;
  }
  return out;
};

const uint32 = (bytes: Uint8Array, at: number): number =>
  bytes[at]! * 0x1000000 + ((bytes[at + 1]! << 16) | (bytes[at + 2]! << 8) | bytes[at + 3]!);

const frame = (type: number, flags: number, stream: number, payload: Uint8Array): Uint8Array => {
  const out = new Uint8Array(9 + payload.length);
  out[0] = (payload.length >>> 16) & 0xff;
  out[1] = (payload.length >>> 8) & 0xff;
  out[2] = payload.length & 0xff;
  out[3] = type;
  out[4] = flags;
  out[5] = (stream >>> 24) & 0x7f;
  out[6] = (stream >>> 16) & 0xff;
  out[7] = (stream >>> 8) & 0xff;
  out[8] = stream & 0xff;
  out.set(payload, 9);
  return out;
};

const uint32Payload = (value: number): Uint8Array =>
  Uint8Array.of((value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff);

const settings = (entries: ReadonlyArray<readonly [id: number, value: number]>): Uint8Array => {
  const payload = new Uint8Array(entries.length * 6);
  entries.forEach(([id, value], index) => {
    payload[index * 6] = id >>> 8;
    payload[index * 6 + 1] = id & 0xff;
    payload.set(uint32Payload(value), index * 6 + 2);
  });
  return frame(SETTINGS, 0, 0, payload);
};

/** A header block as one HEADERS frame, continued when it outgrows a frame. */
const headerFrames = (block: Uint8Array, endStream: boolean): Uint8Array[] => {
  const frames: Uint8Array[] = [];
  for (let at = 0; at < block.length; at += DEFAULT_MAX_FRAME) {
    const last = at + DEFAULT_MAX_FRAME >= block.length;
    frames.push(
      frame(
        at === 0 ? HEADERS : CONTINUATION,
        (last ? END_HEADERS : 0) | (at === 0 && endStream ? END_STREAM : 0),
        STREAM,
        block.subarray(at, at + DEFAULT_MAX_FRAME),
      ),
    );
  }
  return frames;
};

const transportError = (request: HttpClientRequest.HttpClientRequest, cause: unknown) =>
  new HttpClientError.HttpClientError({
    reason: new HttpClientError.TransportError({
      request,
      cause,
      description: "HTTP/2 request over cloudflare:sockets failed",
    }),
  });

/**
 * Close `socket` once, from whichever comes first: the body ends, its reader
 * stops, the exchange fails, or `signal` aborts.
 */
const closer = (socket: Socket, signal: AbortSignal): Effect.Effect<void> => {
  let closed = false;
  const markClosed = () => {
    if (closed) return false;
    closed = true;
    signal.removeEventListener("abort", onAbort);
    return true;
  };
  const onAbort = () => {
    // Only for a response nobody reads any more (dropped unread, or its
    // scope closed): no fiber is left to run the close in, and no reader to
    // see that a close failed, which only happens to a socket that already
    // failed.
    if (markClosed()) void socket.close().catch(() => undefined);
  };
  signal.addEventListener("abort", onAbort, { once: true });
  return Effect.suspend(() =>
    markClosed()
      ? attemptPromise(() => socket.close()).pipe(
          Effect.ignore({ log: "Debug", message: "closing a cloudflare:sockets socket failed" }),
        )
      : Effect.void,
  );
};

/** Send `request` and read the response head; the body streams afterwards. */
const send = (request: HttpClientRequest.HttpClientRequest, url: URL, signal: AbortSignal) =>
  Effect.gen(function* () {
    // A gRPC request is one frame of octets. Any other body would be left
    // behind, so it is refused before a connection is opened.
    if (request.body._tag !== "Uint8Array" && request.body._tag !== "Empty") {
      return yield* Effect.fail(
        new ProtocolViolation(`a ${request.body._tag} request body cannot be sent`),
      );
    }
    const connect = yield* loadConnect;
    const tls = url.protocol === "https:";
    const socket = yield* attempt(() =>
      connect(
        { hostname: url.hostname, port: Number(url.port || (tls ? 443 : 80)) },
        { secureTransport: tls ? "on" : "off", allowHalfOpen: false },
      ),
    );
    const close = closer(socket, signal);
    // A call that fails before it returns a body leaves no one else to close the socket.
    return yield* exchange(request, url, socket, close).pipe(
      Effect.flatMap((reply) => respond(request, reply)),
      Effect.onError(() => close),
    );
  });

/** One request and its response on stream 1 of a fresh connection. */
const exchange = (
  request: HttpClientRequest.HttpClientRequest,
  url: URL,
  socket: Socket,
  close: Effect.Effect<void>,
): Effect.Effect<Reply, unknown> =>
  Effect.suspend(() => {
    const tls = url.protocol === "https:";
    const writer = socket.writable.getWriter();
    const reader = socket.readable.getReader();
    const write = (bytes: Uint8Array) => attemptPromise(() => writer.write(bytes));
    const read = attemptPromise(() => reader.read());
    const hpack = makeDecoder();
    // What the server lets this end send.
    let sendWindow = DEFAULT_WINDOW;
    let streamSendWindow = DEFAULT_WINDOW;
    let peerInitialWindow = DEFAULT_WINDOW;
    let peerMaxFrame = DEFAULT_MAX_FRAME;
    // Reply octets read and not yet handed back to the server's windows.
    let unacknowledged = 0;

    let responseHeaders: Record<string, string> | undefined;
    let status = 0;
    let trailers: Record<string, string> = {};
    /** The server ended the stream; nothing more arrives on it. */
    let ended = false;
    let failure: { readonly cause: unknown } | undefined;
    const chunks: Uint8Array[] = [];

    // A header block arriving over HEADERS and CONTINUATION frames.
    let block: { readonly fragments: Uint8Array[]; readonly endStream: boolean } | undefined;
    let buffered: Uint8Array<ArrayBufferLike> = new Uint8Array(0);

    // The first failure ends the stream, so there is never a second.
    const fail = (message: string) => {
      failure = { cause: new ProtocolViolation(message) };
      ended = true;
    };

    const onHeaders = (fields: ReadonlyArray<HeaderField>, endStream: boolean) => {
      // A map, so a header named like something every object has (`constructor`,
      // `__proto__`) is a header like any other.
      const joined = new Map<string, string>();
      let pseudoStatus: string | undefined;
      for (const [name, value] of fields) {
        if (name === ":status") pseudoStatus = value;
        else if (!name.startsWith(":")) {
          const previous = joined.get(name);
          joined.set(name, previous === undefined ? value : `${previous}, ${value}`);
        }
      }
      const headers: Record<string, string> = Object.fromEntries(joined);
      if (responseHeaders === undefined) {
        const code = /^[0-9]{3}$/.test(pseudoStatus ?? "") ? Number(pseudoStatus) : Number.NaN;
        // An interim response (100 Continue) precedes the real one.
        if (code >= 100 && code < 200 && !endStream) return;
        if (!isResponseStatus(code)) {
          return fail(`invalid HTTP status ${pseudoStatus ?? "(none)"}`);
        }
        status = code;
        responseHeaders = headers;
      } else {
        // RFC 9113 section 8.1: a second header block is the trailers.
        if (!endStream) return fail("the trailers do not end the stream");
        trailers = headers;
      }
      if (endStream) ended = true;
    };

    const onFrame = (
      type: number,
      flags: number,
      stream: number,
      payload: Uint8Array,
    ): Effect.Effect<void, unknown> =>
      Effect.gen(function* () {
        // RFC 9113 section 6.10: nothing may come between the frames of a block.
        if (block !== undefined && (type !== CONTINUATION || stream !== STREAM)) {
          return fail("a header block was interrupted by another frame");
        }
        // Push is disabled, so the server has no other stream to send these on.
        if (stream !== STREAM && (type === DATA || type === HEADERS || type === CONTINUATION)) {
          return fail(`a frame on stream ${stream}, which this end did not open`);
        }
        switch (type) {
          case DATA: {
            if (responseHeaders === undefined) return fail("DATA before the response headers");
            const start = (flags & PADDED) !== 0 ? 1 : 0;
            const end = payload.length - (start === 1 ? (payload[0] ?? 0) : 0);
            if (end < start) return fail("DATA padding exceeds the frame");
            if (end > start) chunks.push(payload.subarray(start, end));
            if ((flags & END_STREAM) !== 0) ended = true;
            // Padding counts against the window too.
            unacknowledged += payload.length;
            if (unacknowledged >= WINDOW_STEP && !ended) {
              const increment = uint32Payload(unacknowledged);
              unacknowledged = 0;
              yield* write(
                concat([
                  frame(WINDOW_UPDATE, 0, 0, increment),
                  frame(WINDOW_UPDATE, 0, STREAM, increment),
                ]),
              );
            }
            return;
          }
          case HEADERS: {
            const padded = (flags & PADDED) !== 0;
            const start = (padded ? 1 : 0) + ((flags & PRIORITY) !== 0 ? 5 : 0);
            const end = payload.length - (padded ? (payload[0] ?? 0) : 0);
            if (start > end) return fail("HEADERS padding or priority exceeds the frame");
            block = {
              fragments: [payload.subarray(start, end)],
              endStream: (flags & END_STREAM) !== 0,
            };
            break;
          }
          case CONTINUATION: {
            if (block === undefined) return fail("CONTINUATION without a header block");
            block.fragments.push(payload);
            break;
          }
          case SETTINGS: {
            if ((flags & ACK) !== 0) return;
            if (payload.length % 6 !== 0) return fail("malformed SETTINGS");
            for (let at = 0; at < payload.length; at += 6) {
              const id = (payload[at]! << 8) | payload[at + 1]!;
              const value = uint32(payload, at + 2);
              if (id === SETTINGS_INITIAL_WINDOW_SIZE) {
                if (value > MAX_WINDOW)
                  return fail("SETTINGS_INITIAL_WINDOW_SIZE exceeds the limit");
                // The change applies to the stream's window as it stands, which
                // may leave it negative.
                streamSendWindow += value - peerInitialWindow;
                peerInitialWindow = value;
              } else if (id === SETTINGS_MAX_FRAME_SIZE) {
                if (value < DEFAULT_MAX_FRAME || value > MAX_FRAME_LIMIT) {
                  return fail("SETTINGS_MAX_FRAME_SIZE is out of range");
                }
                peerMaxFrame = value;
              }
            }
            yield* write(frame(SETTINGS, ACK, 0, new Uint8Array(0)));
            return;
          }
          case PING: {
            if (payload.length !== 8) return fail("malformed PING");
            if ((flags & ACK) === 0) yield* write(frame(PING, ACK, 0, payload));
            return;
          }
          case WINDOW_UPDATE: {
            if (payload.length !== 4) return fail("malformed WINDOW_UPDATE");
            const increment = uint32(payload, 0) % 0x80000000;
            if (stream === 0) sendWindow += increment;
            else if (stream === STREAM) streamSendWindow += increment;
            return;
          }
          case RST_STREAM: {
            if (payload.length !== 4) return fail("malformed RST_STREAM");
            if (stream !== STREAM) return;
            // A reset ends the call with the gRPC status its code maps to;
            // before the response headers, as a reply of trailers alone.
            if (responseHeaders === undefined) {
              status = 200;
              responseHeaders = { "content-type": "application/grpc" };
            }
            trailers = { ...resetTrailers(uint32(payload, 0)) };
            ended = true;
            return;
          }
          case GOAWAY: {
            if (payload.length < 8) return fail("malformed GOAWAY");
            const lastStream = uint32(payload, 0) % 0x80000000;
            const code = uint32(payload, 4);
            // A graceful shutdown (code 0) that still covers this stream lets it finish.
            if (code !== 0 || lastStream < STREAM) {
              fail(`the server closed the connection (HTTP/2 error ${code})`);
            }
            return;
          }
          case PUSH_PROMISE:
            return fail("the server pushed a stream with push disabled");
          default:
            // PRIORITY and frames this end doesn't know are ignored.
            return;
        }
        if ((flags & END_HEADERS) === 0) return;
        const complete = block;
        block = undefined;
        const fields = yield* attempt(() => hpack.decode(concat(complete.fragments)));
        onHeaders(fields, complete.endStream);
      });

    /**
     * Read from the socket and handle the complete frames that arrived, up to
     * the end of the stream: the connection carries nothing else, so what
     * follows is never read. Only called while the stream is open.
     */
    const step: Effect.Effect<void, unknown> = Effect.gen(function* () {
      const { value, done } = yield* read;
      if (done) return fail("connection closed before the response ended");
      buffered = buffered.length === 0 ? value : concat([buffered, value]);
      while (buffered.length >= 9) {
        const length = (buffered[0]! << 16) | (buffered[1]! << 8) | buffered[2]!;
        // This end never raises SETTINGS_MAX_FRAME_SIZE.
        if (length > DEFAULT_MAX_FRAME) return fail(`a ${length}-octet frame exceeds the limit`);
        if (buffered.length < 9 + length) break;
        const payload = buffered.subarray(9, 9 + length);
        const type = buffered[3]!;
        const flags = buffered[4]!;
        const stream = uint32(buffered, 5) % 0x80000000;
        buffered = buffered.subarray(9 + length);
        yield* onFrame(type, flags, stream, payload);
        if (ended) return;
      }
    });

    const body = request.body._tag === "Uint8Array" ? request.body.body : new Uint8Array(0);
    const fields: HeaderField[] = [
      [":method", request.method],
      [":scheme", tls ? "https" : "http"],
      [":path", `${url.pathname}${url.search}`],
      [":authority", url.host],
    ];
    for (const [key, value] of Object.entries(request.headers)) {
      if (!CONNECTION_HEADERS.has(key)) fields.push([key, value]);
    }
    return Effect.gen(function* () {
      yield* write(
        concat([
          PREFACE,
          settings([
            [SETTINGS_ENABLE_PUSH, 0],
            [SETTINGS_INITIAL_WINDOW_SIZE, RECEIVE_WINDOW],
          ]),
          frame(WINDOW_UPDATE, 0, 0, uint32Payload(RECEIVE_WINDOW - DEFAULT_WINDOW)),
          ...headerFrames(encode(fields), body.length === 0),
        ]),
      );

      // The body goes out as far as the server's windows allow; a full window
      // waits for the server's WINDOW_UPDATE.
      for (let at = 0; at < body.length && !ended;) {
        const size = Math.min(sendWindow, streamSendWindow, peerMaxFrame, body.length - at);
        if (size <= 0) {
          yield* step;
          continue;
        }
        const last = at + size === body.length;
        yield* write(frame(DATA, last ? END_STREAM : 0, STREAM, body.subarray(at, at + size)));
        sendWindow -= size;
        streamSendWindow -= size;
        at += size;
      }

      while (responseHeaders === undefined) {
        // Before its headers a stream only ends by failing.
        if (failure !== undefined) return yield* Effect.fail(failure.cause);
        yield* step;
      }
      const head = responseHeaders;
      // A stream that already ended, or a reply with no body, needs the socket no more.
      if (ended || hasNoBody(status)) yield* close;

      const trailersDone = yield* Deferred.make<Trailers, unknown>();
      /** The next reply octets, or `undefined` once the stream has ended. */
      const next: Effect.Effect<Uint8Array[] | undefined, unknown> = Effect.gen(function* () {
        for (;;) {
          // What arrived before a failure is handed over before the failure.
          if (chunks.length > 0) return chunks.splice(0);
          if (ended) {
            if (failure !== undefined) return yield* Effect.fail(failure.cause);
            yield* Deferred.succeed(trailersDone, trailers);
            return undefined;
          }
          yield* Effect.catch(step, (cause) =>
            Effect.sync(() => {
              failure = { cause };
              ended = true;
            }),
          );
        }
      });
      const stream = Stream.unfold(undefined, () =>
        Effect.map(next, (data) => (data === undefined ? undefined : ([data, undefined] as const))),
      ).pipe(
        Stream.flattenIterable,
        Stream.ensuring(
          Effect.suspend(() =>
            Effect.andThen(
              // Settles nothing once the stream ended well.
              Deferred.fail(
                trailersDone,
                failure?.cause ?? new ProtocolViolation("the body was not read to its end"),
              ),
              close,
            ),
          ),
        ),
      );
      return {
        status,
        headers: head,
        body: stream,
        trailers: Deferred.await(trailersDone),
      } satisfies Reply;
    });
  });

/** An `HttpClient` that sends each request as an HTTP/2 stream on its own `cloudflare:sockets` socket. */
export const client: HttpClient.HttpClient = /*@__PURE__*/ HttpClient.make((request, url, signal) =>
  Effect.mapError(send(request, url, signal), (cause) => transportError(request, cause)),
);

/** Send gRPC calls over HTTP/2 on `cloudflare:sockets` in this scope. */
export const layer: Layer.Layer<never> = /*@__PURE__*/ transportLayer(client);
