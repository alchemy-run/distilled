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
 * pooled across events. The body streams as it arrives and the trailers
 * settle when it ends.
 */
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Layer from "effect/Layer";
import {
  isResponseStatus,
  layer as transportLayer,
  respond,
  type Trailers,
} from "./grpc-transport.ts";
import { encode, type HeaderField, makeDecoder } from "./hpack.ts";

/** The part of `cloudflare:sockets` this transport uses. */
type Connect = (
  address: { hostname: string; port: number },
  options: { secureTransport: "on" | "off"; allowHalfOpen: boolean },
) => {
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<Uint8Array>;
  close(): Promise<void>;
};

// A non-literal specifier keeps bundlers from resolving it for runtimes
// other than workerd, which resolves its built-in modules at runtime.
const SOCKETS_MODULE = "cloudflare:sockets";
let sockets: Promise<Connect> | undefined;
const connectFn = () =>
  (sockets ??= (import(SOCKETS_MODULE) as Promise<{ connect: Connect }>).then(
    (module) => module.connect,
  ));

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
  for (let at = 0; at === 0 || at < block.length; at += DEFAULT_MAX_FRAME) {
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

/** Send `request` and read the response head; the body streams afterwards. */
const send = async (
  request: HttpClientRequest.HttpClientRequest,
  url: URL,
  signal: AbortSignal,
) => {
  const connect = await connectFn();
  const tls = url.protocol === "https:";
  const socket = connect(
    { hostname: url.hostname, port: Number(url.port || (tls ? 443 : 80)) },
    { secureTransport: tls ? "on" : "off", allowHalfOpen: false },
  );
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    signal.removeEventListener("abort", close);
    void socket.close().catch(() => undefined);
  };
  signal.addEventListener("abort", close, { once: true });
  // A call that fails before it returns a body leaves no one to close the socket.
  return exchange(request, url, socket, close).catch((cause: unknown) => {
    close();
    throw cause;
  });
};

/** One request and its response on stream 1 of a fresh connection. */
const exchange = async (
  request: HttpClientRequest.HttpClientRequest,
  url: URL,
  socket: ReturnType<Connect>,
  close: () => void,
) => {
  const tls = url.protocol === "https:";
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
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

  // After the reply ends the server may already have closed the socket.
  const write = (bytes: Uint8Array): Promise<void> =>
    ended ? writer.write(bytes).catch(() => undefined) : writer.write(bytes);

  const fail = (message: string) => {
    failure ??= { cause: new ProtocolViolation(message) };
    ended = true;
  };

  const onHeaders = (fields: ReadonlyArray<HeaderField>, endStream: boolean) => {
    const headers: Record<string, string> = {};
    let pseudoStatus: string | undefined;
    for (const [name, value] of fields) {
      if (name === ":status") pseudoStatus = value;
      else if (!name.startsWith(":")) {
        headers[name] = headers[name] === undefined ? value : `${headers[name]}, ${value}`;
      }
    }
    if (responseHeaders === undefined) {
      const code = Number(pseudoStatus ?? 0);
      // An interim response (100 Continue) precedes the real one.
      if (code >= 100 && code < 200 && !endStream) return;
      status = code;
      responseHeaders = headers;
    } else {
      trailers = headers;
    }
    if (endStream) ended = true;
  };

  const onFrame = async (type: number, flags: number, stream: number, payload: Uint8Array) => {
    if (block !== undefined && type !== CONTINUATION) {
      return fail("a header block was interrupted by another frame");
    }
    switch (type) {
      case DATA: {
        unacknowledged += payload.length;
        if (stream === STREAM && !ended) {
          const padded = (flags & PADDED) !== 0;
          const end = payload.length - (padded ? payload[0]! : 0);
          if (end < (padded ? 1 : 0)) return fail("DATA padding exceeds the frame");
          const data = payload.subarray(padded ? 1 : 0, end);
          if (data.length > 0) chunks.push(data);
          if ((flags & END_STREAM) !== 0) ended = true;
        }
        if (unacknowledged >= WINDOW_STEP && !ended) {
          const increment = uint32Payload(unacknowledged);
          unacknowledged = 0;
          await write(
            concat([
              frame(WINDOW_UPDATE, 0, 0, increment),
              frame(WINDOW_UPDATE, 0, STREAM, increment),
            ]),
          );
        }
        return;
      }
      case HEADERS: {
        let at = 0;
        let end = payload.length;
        if ((flags & PADDED) !== 0) {
          end -= payload[0]!;
          at += 1;
        }
        if ((flags & PRIORITY) !== 0) at += 5;
        if (at > end) return fail("HEADERS padding exceeds the frame");
        block = { fragments: [payload.subarray(at, end)], endStream: (flags & END_STREAM) !== 0 };
        break;
      }
      case CONTINUATION: {
        if (block === undefined) return fail("CONTINUATION without a header block");
        block.fragments.push(payload);
        break;
      }
      case SETTINGS: {
        if ((flags & ACK) !== 0) return;
        for (let at = 0; at + 6 <= payload.length; at += 6) {
          const id = (payload[at]! << 8) | payload[at + 1]!;
          const value = uint32(payload, at + 2);
          if (id === SETTINGS_INITIAL_WINDOW_SIZE) {
            streamSendWindow += value - peerInitialWindow;
            peerInitialWindow = value;
          } else if (id === SETTINGS_MAX_FRAME_SIZE) {
            peerMaxFrame = value;
          }
        }
        await write(frame(SETTINGS, ACK, 0, new Uint8Array(0)));
        return;
      }
      case PING: {
        if ((flags & ACK) === 0) await write(frame(PING, ACK, 0, payload));
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
        // A server may reset a stream it has already ended (code 0).
        if (stream === STREAM && !ended) {
          fail(`the server reset the stream (HTTP/2 error ${uint32(payload, 0)})`);
        }
        return;
      }
      case GOAWAY: {
        const lastStream = uint32(payload, 0) % 0x80000000;
        const code = uint32(payload, 4);
        if (!ended && (code !== 0 || lastStream < STREAM)) {
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
    // Every block is decoded, in order: the dynamic table depends on it.
    const fields = hpack.decode(concat(complete.fragments));
    if (stream === STREAM && !ended) onHeaders(fields, complete.endStream);
  };

  /** Read from the socket and handle every complete frame that arrived. */
  const step = async () => {
    const { value, done } = await reader.read();
    if (done) {
      if (!ended) fail("connection closed before the response ended");
      return;
    }
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
      await onFrame(type, flags, stream, payload);
      if (failure !== undefined) return;
    }
  };

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
  await writer.write(
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
      await step();
      continue;
    }
    const last = at + size === body.length;
    await write(frame(DATA, last ? END_STREAM : 0, STREAM, body.subarray(at, at + size)));
    sendWindow -= size;
    streamSendWindow -= size;
    at += size;
  }

  while (responseHeaders === undefined && !ended) await step();
  if (responseHeaders === undefined) {
    throw failure?.cause ?? new ProtocolViolation("the stream ended before the response headers");
  }
  if (!isResponseStatus(status)) throw new ProtocolViolation(`invalid HTTP status ${status}`);

  let resolveTrailers!: (t: Trailers) => void;
  const trailersDone = new Promise<Trailers>((resolve) => (resolveTrailers = resolve));
  const finish = () => {
    resolveTrailers(trailers);
    close();
  };
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        while (chunks.length === 0 && !ended) await step();
      } catch (error) {
        failure ??= { cause: error };
        ended = true;
      }
      for (const chunk of chunks.splice(0)) controller.enqueue(chunk);
      if (!ended) return;
      finish();
      if (failure === undefined) controller.close();
      else controller.error(failure.cause);
    },
    cancel() {
      finish();
    },
  });
  return { status, headers: responseHeaders, body: stream, trailers: trailersDone };
};

/** An `HttpClient` that sends each request as an HTTP/2 stream on its own `cloudflare:sockets` socket. */
export const client: HttpClient.HttpClient = /*@__PURE__*/ HttpClient.make((request, url, signal) =>
  Effect.map(
    Effect.tryPromise({
      try: () => send(request, url, signal),
      catch: (cause) => transportError(request, cause),
    }),
    (reply) => respond(request, reply),
  ),
);

/** Send gRPC calls over HTTP/2 on `cloudflare:sockets` in this scope. */
export const layer: Layer.Layer<never> = /*@__PURE__*/ transportLayer(client);
