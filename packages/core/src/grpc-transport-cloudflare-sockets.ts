/**
 * A gRPC transport over a `cloudflare:sockets` TLS socket (HTTP/1.1), for a
 * Cloudflare Worker calling a gRPC server that is behind Cloudflare.
 *
 * A Worker's `fetch` to a site on Cloudflare takes Cloudflare's internal
 * Worker-to-site path, which resets gRPC upstreams (`grpc-status: 14`,
 * "upstream connect error ... remote reset"). A plain TLS socket from the
 * same Worker reaches the server like any other client.
 *
 * ```ts
 * import * as CloudflareSockets from "@distilled.cloud/core/grpc-transport-cloudflare-sockets";
 *
 * program.pipe(Effect.provide(CloudflareSockets.layer));
 * ```
 *
 * Each request opens its own socket with `connection: close`: workerd ties
 * a socket to the request that opened it, so sockets are never pooled
 * across events. The exchange is Effect code: the body is an Effect `Stream`
 * that reads the socket in the caller's fiber as it arrives (`content-length`,
 * chunked, or until the server closes), and closes it when it ends or the
 * reader stops; chunked trailers, where gRPC puts `grpc-status`, settle when
 * it ends. The server must accept gRPC over HTTP/1.1, as a bridging proxy
 * (envoy) does.
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
  hasNoBody,
  layer as transportLayer,
  respond,
  type Trailers,
} from "./grpc-transport.ts";

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

/** Headers this transport sets itself. */
const FRAMING_HEADERS = new Set([
  "host",
  "connection",
  "keep-alive",
  "content-length",
  "transfer-encoding",
  "upgrade",
]);

const encoder = /*@__PURE__*/ new TextEncoder();
const decoder = /*@__PURE__*/ new TextDecoder();

const concat = (a: Uint8Array, b: Uint8Array): Uint8Array<ArrayBufferLike> => {
  if (a.length === 0) return b;
  const out = new Uint8Array(a.length + b.length);
  out.set(a);
  out.set(b, a.length);
  return out;
};

const indexOf = (bytes: Uint8Array, pattern: readonly number[], from = 0): number => {
  outer: for (let i = from; i + pattern.length <= bytes.length; i++) {
    for (let j = 0; j < pattern.length; j++) if (bytes[i + j] !== pattern[j]) continue outer;
    return i;
  }
  return -1;
};

const CRLF = [13, 10] as const;
const CRLFCRLF = [13, 10, 13, 10] as const;

const parseHeaderLines = (lines: ReadonlyArray<string>): Record<string, string> => {
  // A map, so a header named like something every object has (`constructor`,
  // `__proto__`) is a header like any other.
  const joined = new Map<string, string>();
  for (const line of lines) {
    const colon = line.indexOf(":");
    if (colon <= 0) continue;
    const key = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();
    const previous = joined.get(key);
    joined.set(key, previous === undefined ? value : `${previous}, ${value}`);
  }
  return Object.fromEntries(joined);
};

class ProtocolViolation extends Error {}

/**
 * The body framing of an HTTP/1.1 response: hands back the payload bytes in
 * `input` and whether the body has ended; a chunked body's trailers land in
 * `trailers`.
 */
interface BodyDecoder {
  feed(input: Uint8Array): { readonly data: Uint8Array[]; readonly done: boolean };
  /** The peer closed the connection. */
  end(): boolean;
  readonly trailers: Record<string, string>;
}

const lengthDecoder = (length: number): BodyDecoder => {
  let left = length;
  return {
    trailers: {},
    feed(input) {
      const take = input.subarray(0, left);
      left -= take.length;
      return { data: take.length > 0 ? [take] : [], done: left === 0 };
    },
    end: () => left === 0,
  };
};

const untilCloseDecoder = (): BodyDecoder => ({
  trailers: {},
  feed: (input) => ({ data: input.length > 0 ? [input] : [], done: false }),
  end: () => true,
});

const chunkedDecoder = (): BodyDecoder => {
  let buf: Uint8Array<ArrayBufferLike> = new Uint8Array(0);
  let state: "size" | "data" | "trailers" | "done" = "size";
  let left = 0;
  let trailers: Record<string, string> = {};
  return {
    get trailers() {
      return trailers;
    },
    feed(input) {
      buf = concat(buf, input);
      const data: Uint8Array[] = [];
      for (;;) {
        if (state === "size") {
          const eol = indexOf(buf, CRLF);
          if (eol < 0) break;
          const size = Number.parseInt(decoder.decode(buf.subarray(0, eol)).split(";")[0]!, 16);
          // oxlint-disable-next-line distilled/or-throw -- chunkedDecoder is private to this file, and `exchange` calls feed only inside `attempt` (Effect.try)
          if (Number.isNaN(size)) throw new ProtocolViolation("invalid chunk size");
          buf = buf.subarray(eol + 2);
          if (size === 0) state = "trailers";
          else {
            state = "data";
            left = size;
          }
        } else if (state === "data") {
          if (buf.length < left + 2) {
            // Hand over what arrived; keep the rest of the chunk pending.
            const take = buf.subarray(0, Math.min(buf.length, left));
            if (take.length > 0) data.push(take.slice());
            left -= take.length;
            buf = buf.subarray(take.length);
            break;
          }
          if (left > 0) data.push(buf.slice(0, left));
          buf = buf.subarray(left + 2);
          left = 0;
          state = "size";
        } else if (state === "trailers") {
          if (buf[0] === 13 && buf[1] === 10) {
            state = "done";
            break;
          }
          const end = indexOf(buf, CRLFCRLF);
          if (end < 0) break;
          trailers = parseHeaderLines(decoder.decode(buf.subarray(0, end)).split("\r\n"));
          state = "done";
          break;
        } else break;
      }
      return { data, done: state === "done" };
    },
    end: () => state === "done",
  };
};

const decoderFor = (headers: Record<string, string>): BodyDecoder =>
  (headers["transfer-encoding"] ?? "").toLowerCase().includes("chunked")
    ? chunkedDecoder()
    : headers["content-length"] !== undefined
      ? lengthDecoder(Number(headers["content-length"]))
      : untilCloseDecoder();

const transportError = (request: HttpClientRequest.HttpClientRequest, cause: unknown) =>
  new HttpClientError.HttpClientError({
    reason: new HttpClientError.TransportError({
      request,
      cause,
      description: "request over cloudflare:sockets failed",
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
    return yield* exchange(request, url, socket, close).pipe(Effect.onError(() => close));
  });

const exchange = (
  request: HttpClientRequest.HttpClientRequest,
  url: URL,
  socket: Socket,
  close: Effect.Effect<void>,
) =>
  Effect.gen(function* () {
    const body = request.body._tag === "Uint8Array" ? request.body.body : new Uint8Array(0);
    const head = [`${request.method} ${url.pathname}${url.search} HTTP/1.1`, `host: ${url.host}`];
    for (const [key, value] of Object.entries(request.headers)) {
      if (!FRAMING_HEADERS.has(key)) head.push(`${key}: ${value}`);
    }
    head.push(`content-length: ${body.length}`, "connection: close", "", "");
    const writer = socket.writable.getWriter();
    yield* attemptPromise(() => writer.write(concat(encoder.encode(head.join("\r\n")), body)));
    writer.releaseLock();

    const reader = socket.readable.getReader();
    const read = attemptPromise(() => reader.read());
    let buf: Uint8Array<ArrayBufferLike> = new Uint8Array(0);
    let end = -1;
    while ((end = indexOf(buf, CRLFCRLF)) < 0) {
      const { value, done } = yield* read;
      if (done) {
        return yield* Effect.fail(
          new ProtocolViolation("connection closed before the response headers"),
        );
      }
      buf = concat(buf, value);
    }
    const [statusLine = "", ...lines] = decoder.decode(buf.subarray(0, end)).split("\r\n");
    const status = Number(statusLine.split(" ")[1] ?? 0);
    if (!isResponseStatus(status)) {
      return yield* Effect.fail(new ProtocolViolation(`invalid HTTP status ${status}`));
    }
    const headers = parseHeaderLines(lines);
    const framing = decoderFor(headers);
    const trailers = yield* Deferred.make<Trailers, unknown>();

    let pending: Uint8Array | undefined = buf.subarray(end + 4);
    let finished = false;
    /** The next payload chunks, or `undefined` once the body has ended. */
    const next: Effect.Effect<Uint8Array[] | undefined, unknown> = Effect.gen(function* () {
      while (!finished) {
        let input: Uint8Array;
        if (pending !== undefined) {
          input = pending;
          pending = undefined;
        } else {
          const { value, done } = yield* read;
          if (done) {
            if (!framing.end()) {
              return yield* Effect.fail(new ProtocolViolation("connection closed mid-body"));
            }
            finished = true;
            yield* Deferred.succeed(trailers, framing.trailers);
            return undefined;
          }
          input = value;
        }
        const { data, done } = yield* attempt(() => framing.feed(input));
        if (done) {
          finished = true;
          yield* Deferred.succeed(trailers, framing.trailers);
          return data;
        }
        if (data.length > 0) return data;
      }
      return undefined;
    });
    const stream = Stream.unfold(undefined, () =>
      Effect.map(next, (data) => (data === undefined ? undefined : ([data, undefined] as const))),
    ).pipe(
      Stream.flattenIterable,
      Stream.ensuring(
        Effect.andThen(
          // Settles nothing once the body ended; else no trailers come.
          Deferred.fail(trailers, new ProtocolViolation("the body was not read to its end")),
          close,
        ),
      ),
    );
    // A reply with no body needs the socket no more.
    if (hasNoBody(status)) yield* close;
    // HTTP/1.1: a bridging proxy may drop the trailers.
    return yield* respond(request, {
      status,
      headers,
      body: stream,
      trailers: Deferred.await(trailers),
      reliableTrailers: false,
    });
  });

/** An `HttpClient` that sends each request over its own `cloudflare:sockets` socket. */
export const client: HttpClient.HttpClient = /*@__PURE__*/ HttpClient.make((request, url, signal) =>
  Effect.mapError(send(request, url, signal), (cause) => transportError(request, cause)),
);

/** Send gRPC calls over `cloudflare:sockets` in this scope. */
export const layer: Layer.Layer<never> = /*@__PURE__*/ transportLayer(client);
