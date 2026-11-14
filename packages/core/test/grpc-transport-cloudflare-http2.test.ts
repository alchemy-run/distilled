import * as http2 from "node:http2";
import type { AddressInfo } from "node:net";
import * as net from "node:net";
import { Readable, Writable } from "node:stream";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpBody from "effect/http/HttpBody";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import * as Tracer from "effect/Tracer";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import * as API from "../src/api.ts";
import * as CloudflareHttp2 from "../src/grpc-transport-cloudflare-http2.ts";
import {
  GrpcTransport,
  hasTrailers,
  isResponseStatus,
  respond,
  trailersOf,
} from "../src/grpc-transport.ts";
import { encode, type HeaderField, HpackError, makeDecoder } from "../src/hpack.ts";
import {
  decodeMessage,
  encodeMessage,
  frame,
  unframe,
  type ProtoDescriptors,
} from "../src/protobuf.ts";
import { makeGrpcProtocol } from "../src/protocol-grpc.ts";
import * as S from "../src/schema.ts";
import * as T from "../src/trait.ts";

/**
 * The next socket `connect` hands out, and every call it got. A test that
 * scripts the server sets `next`; the others reach a real one over TCP.
 */
const sockets = vi.hoisted(() => ({
  next: undefined as (() => unknown) | undefined,
  calls: [] as Array<{ readonly address: unknown; readonly options: unknown }>,
}));

// workerd's `cloudflare:sockets`.
vi.mock("cloudflare:sockets", () => ({
  connect: (address: { hostname: string; port: number }, options: unknown) => {
    sockets.calls.push({ address, options });
    const scripted = sockets.next;
    if (scripted !== undefined) {
      sockets.next = undefined;
      return scripted();
    }
    const socket = net.connect(address.port, address.hostname);
    return {
      readable: Readable.toWeb(socket) as ReadableStream<Uint8Array>,
      writable: Writable.toWeb(socket) as WritableStream<Uint8Array>,
      close: async () => void socket.destroy(),
    };
  },
}));

const descriptors: ProtoDescriptors = {
  messages: {
    "test.Req": [
      [1, "count", "int32"],
      [2, "padding", "string"],
    ],
    "test.Reply": [
      [1, "index", "int32"],
      [2, "padding", "string"],
    ],
  },
  enums: {},
  methods: {
    "/test.Svc/Count": ["test.Req", "test.Reply", 1],
    "/test.Svc/Get": ["test.Req", "test.Reply"],
  },
};

/** What the server saw of the last request. */
let seen: { headers: http2.IncomingHttpHeaders; padding: number } | undefined;

/**
 * A plain HTTP/2 server (prior knowledge, as the transport speaks it). `count`
 * picks the reply: 7 fails in the trailers, 8 fails with no body at all. An
 * `x-early` header gets a reply before the request is read.
 */
const server = http2.createServer();
server.on("stream", (stream: http2.ServerHttp2Stream, headers) => {
  const trailers = (fields: http2.OutgoingHttpHeaders) => {
    stream.on("wantTrailers", () => stream.sendTrailers(fields));
  };
  if (headers["x-early"] !== undefined) {
    stream.respond(
      {
        ":status": 200,
        "content-type": "application/grpc",
        "grpc-status": "5",
        "grpc-message": "early",
      },
      { endStream: true },
    );
    return;
  }
  const chunks: Buffer[] = [];
  stream.on("data", (chunk: Buffer) => chunks.push(chunk));
  stream.on("end", async () => {
    const [payload] = unframe(new Uint8Array(Buffer.concat(chunks)));
    const { count, padding } = decodeMessage(descriptors, "test.Req", payload!) as {
      count: number;
      padding?: string;
    };
    seen = { headers, padding: padding?.length ?? 0 };
    if (count === 8) {
      // Trailers-only: the status rides the one header block.
      stream.respond(
        {
          ":status": 200,
          "content-type": "application/grpc",
          "grpc-status": "5",
          "grpc-message": "gone at once",
        },
        { endStream: true },
      );
      return;
    }
    stream.respond(
      { ":status": 200, "content-type": "application/grpc", "x-reply": "yes" },
      { waitForTrailers: true },
    );
    trailers(count === 7 ? { "grpc-status": "5", "grpc-message": "gone" } : { "grpc-status": "0" });
    for (let i = 1; i <= Math.max(count, 1); i++) {
      const bytes = frame(
        encodeMessage(descriptors, "test.Reply", {
          index: i,
          // A reply larger than a frame and, over a few, than the window.
          padding: count === 3 ? "r".repeat(700_000) : "",
        }),
      );
      stream.write(bytes.subarray(0, 3));
      await new Promise((resolve) => setTimeout(resolve, 5));
      stream.write(bytes.subarray(3));
    }
    stream.end();
  });
});

let url = "";
beforeAll(async () => {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  url = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterAll(() => new Promise((resolve) => server.close(resolve)));

class Endpoint extends Context.Service<
  Endpoint,
  { readonly url: string; readonly headers?: Record<string, string> }
>()("Http2Test/Endpoint") {}

class Gone extends T.applyErrorMatchers(
  Schema.TaggedError<Gone>()("Gone", { message: Schema.String }),
  [{ code: 5 }],
) {}

const Protocol = makeGrpcProtocol({
  descriptors,
  credentials: Effect.gen(function* () {
    return yield* Endpoint;
  }),
  baseUrl: (endpoint) => endpoint.url,
  headers: (endpoint) => endpoint.headers ?? {},
  unknownError: (info) => new Error(JSON.stringify(info)),
  parseError: (info) => new Error(String(info.cause)),
});

const Request = S.Struct({ count: S.Number, padding: S.optional(S.String) });
const Reply = S.Struct({ index: S.Number, padding: S.optional(S.String) });
type Request = { count: number; padding?: string };
type Reply = { index: number; padding?: string };

const get: API.OperationMethod<Request, Reply, any, Endpoint> = API.make(() => ({
  input: Request.pipe(T.Http({ method: "POST", uri: "/test.Svc/Get" })),
  output: Reply,
  errors: [Gone] as const,
  protocol: Protocol,
})) as any;

const count: API.StreamingOperationMethod<
  Request,
  { readonly items: ReadonlyArray<Reply> },
  any,
  Endpoint
> = API.makeStreaming(() => ({
  input: Request.pipe(T.Http({ method: "POST", uri: "/test.Svc/Count" })),
  output: S.Struct({ items: S.Array(Reply) }),
  errors: [Gone] as const,
  protocol: Protocol,
})) as any;

const run = <A, E>(effect: Effect.Effect<A, E, any>, headers?: Record<string, string>) =>
  Effect.runPromise(
    Effect.result(
      Effect.provide(
        effect,
        Layer.mergeAll(
          Layer.succeed(Endpoint, { url, headers }),
          CloudflareHttp2.layer,
          FetchHttpClient.layer,
        ),
      ),
    ) as Effect.Effect<any, never, never>,
  );

describe("gRPC over HTTP/2 on cloudflare:sockets", () => {
  test("reads a reply and its trailers", async () => {
    const result = await run(get({ count: 1 }), { authorization: `Bearer ${"t".repeat(300)}` });
    expect(result._tag).toBe("Success");
    expect(result.success.index).toBe(1);
    expect(seen?.headers[":path"]).toBe("/test.Svc/Get");
    expect(seen?.headers[":method"]).toBe("POST");
    expect(seen?.headers.authorization).toBe(`Bearer ${"t".repeat(300)}`);
    expect(seen?.headers["content-type"]).toContain("application/grpc");
    expect(seen?.headers.te).toBe("trailers");
  });

  test("a status in the trailers is the operation's typed error", async () => {
    const result = await run(get({ count: 7 }));
    expect(result._tag).toBe("Failure");
    expect(result.failure._tag).toBe("Gone");
    expect(result.failure.message).toBe("gone");
  });

  test("a reply of headers alone carries the status", async () => {
    const result = await run(get({ count: 8 }));
    expect(result._tag).toBe("Failure");
    expect(result.failure._tag).toBe("Gone");
    expect(result.failure.message).toBe("gone at once");
  });

  test("a server may answer before it has read the request", async () => {
    // More than one window of request, which the server never reads.
    const result = await run(get({ count: 1, padding: "q".repeat(200_000) }), { "x-early": "1" });
    expect(result._tag).toBe("Failure");
    expect(result.failure._tag).toBe("Gone");
    expect(result.failure.message).toBe("early");
  });

  test("streams messages split across frames", async () => {
    const result = await run(Stream.runCollect(count.stream({ count: 4 })));
    expect(result._tag).toBe("Success");
    expect(Array.from(result.success as Iterable<Reply>).map((r) => r.index)).toEqual([1, 2, 3, 4]);
  });

  test("sends a request larger than the flow-control window", async () => {
    const result = await run(get({ count: 1, padding: "q".repeat(300_000) }));
    expect(result._tag).toBe("Success");
    expect(seen?.padding).toBe(300_000);
  });

  test("reads replies larger than the flow-control window", async () => {
    const result = await run(Stream.runCollect(count.stream({ count: 3 })));
    expect(result._tag).toBe("Success");
    const replies = Array.from(result.success as Iterable<Reply>);
    expect(replies.map((r) => r.index)).toEqual([1, 2, 3]);
    expect(replies.map((r) => r.padding?.length)).toEqual([700_000, 700_000, 700_000]);
  });

  test("a connection that speaks no HTTP/2 is a transport error", async () => {
    const plain = net.createServer((socket) => {
      socket.resume();
      socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
    });
    await new Promise<void>((resolve) => plain.listen(0, "127.0.0.1", resolve));
    const previous = url;
    url = `http://127.0.0.1:${(plain.address() as AddressInfo).port}`;
    const result = await run(get({ count: 1 }));
    url = previous;
    await new Promise((resolve) => plain.close(resolve));
    expect(result._tag).toBe("Failure");
    expect(result.failure._tag).not.toBe("Gone");
  });
});

// ---------------------------------------------------------------------------
// A scripted server: each read the transport makes gets the next move, so a
// case states the exact octets the server sends and checks the exact octets
// the transport wrote.
// ---------------------------------------------------------------------------

const DATA = 0x0;
const HEADERS = 0x1;
const PRIORITY_FRAME = 0x2;
const RST_STREAM = 0x3;
const SETTINGS = 0x4;
const PUSH_PROMISE = 0x5;
const PING = 0x6;
const GOAWAY = 0x7;
const WINDOW_UPDATE = 0x8;
const CONTINUATION = 0x9;
/** A frame type HTTP/2 does not define. */
const UNKNOWN = 0xfa;

const END_STREAM = 0x1;
const ACK = 0x1;
const END_HEADERS = 0x4;
const PADDED = 0x8;
const PRIORITY = 0x20;

const PREFACE = "PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n";

type Octets = ArrayLike<number>;

const text = (value: string) => new TextEncoder().encode(value);

const cat = (...parts: ReadonlyArray<Octets>): Uint8Array => {
  const out = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let at = 0;
  for (const part of parts) {
    out.set(part, at);
    at += part.length;
  }
  return out;
};

/** All 32 bits, so a case can set the reserved one. */
const u32 = (value: number) => [
  value >>> 24,
  (value >>> 16) & 0xff,
  (value >>> 8) & 0xff,
  value & 0xff,
];

/** A frame header alone, for a length the payload does not have. */
const frameHeader = (length: number, type: number, flags: number, stream: number) =>
  Uint8Array.of(length >>> 16, (length >>> 8) & 0xff, length & 0xff, type, flags, ...u32(stream));

const frameOf = (type: number, flags: number, stream: number, payload: Octets = []) =>
  cat(frameHeader(payload.length, type, flags, stream), payload);

const settingsOf = (...entries: ReadonlyArray<readonly [id: number, value: number]>) =>
  frameOf(
    SETTINGS,
    0,
    0,
    entries.flatMap(([id, value]) => [id >>> 8, id & 0xff, ...u32(value)]),
  );

const head = (fields: ReadonlyArray<HeaderField>, flags = END_HEADERS, stream = 1) =>
  frameOf(HEADERS, flags, stream, encode(fields));

const data = (payload: string | Octets, flags = 0, stream = 1) =>
  frameOf(DATA, flags, stream, typeof payload === "string" ? text(payload) : payload);

const windowUpdate = (stream: number, increment: number) =>
  frameOf(WINDOW_UPDATE, 0, stream, u32(increment));

const ping = (payload: Octets = [1, 2, 3, 4, 5, 6, 7, 8], flags = 0) =>
  frameOf(PING, flags, 0, payload);

const goaway = (lastStream: number, code: number, debug = "") =>
  frameOf(GOAWAY, 0, 0, [...u32(lastStream), ...u32(code), ...text(debug)]);

const rst = (stream: number, code: number) => frameOf(RST_STREAM, 0, stream, u32(code));

/** A response head that leaves the stream open. */
const head200 = head([[":status", "200"]]);
/** A whole response: a head that ends the stream. */
const done = head([[":status", "200"]], END_HEADERS | END_STREAM);
/** The trailers of a call that worked. */
const okTrailers = head([["grpc-status", "0"]], END_HEADERS | END_STREAM);
/** A full DATA frame. */
const d16 = data(new Uint8Array(16_384).fill(0x61));

type Move = Uint8Array | "close" | "hang" | { readonly error: Error };
/** A function is called when the transport reads, so it sees what was written by then. */
type Step = Move | ((peer: Peer) => Move);

interface PeerOptions {
  /** The index of the write that fails. */
  readonly failWrite?: number;
  /** Whether closing the socket rejects. */
  readonly closeRejects?: boolean;
}

/** A `cloudflare:sockets` socket whose other end follows a script. */
class Peer {
  readonly writes: Uint8Array[] = [];
  reads = 0;
  closes = 0;
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<Uint8Array>;
  readonly close: () => Promise<void>;

  constructor(script: ReadonlyArray<Step>, options: PeerOptions = {}) {
    const steps = [...script];
    let controller!: ReadableStreamDefaultController<Uint8Array>;
    let attempts = 0;
    this.readable = new ReadableStream<Uint8Array>(
      {
        start: (c) => {
          controller = c;
        },
        // With no buffer, this runs once for each read the transport makes.
        pull: (c) => {
          this.reads++;
          const step = steps.shift() ?? "close";
          const move = typeof step === "function" ? step(this) : step;
          if (move === "hang") return new Promise<void>(() => undefined);
          if (move === "close") return c.close();
          if (move instanceof Uint8Array) return c.enqueue(move);
          c.error(move.error);
        },
      },
      { highWaterMark: 0 },
    );
    this.writable = new WritableStream<Uint8Array>({
      write: (chunk) => {
        if (attempts++ === options.failWrite) throw new Error("write refused");
        this.writes.push(chunk.slice());
      },
    });
    this.close = async () => {
      this.closes++;
      try {
        controller.close();
      } catch {
        // The script already closed or failed the stream.
      }
      if (options.closeRejects) throw new Error("close refused");
    };
  }

  /** The frames written after the preface. `stream` keeps the reserved bit. */
  get frames() {
    const all = cat(...this.writes);
    const frames: Array<{ type: number; flags: number; stream: number; payload: Uint8Array }> = [];
    for (let at = PREFACE.length; at < all.length;) {
      const length = (all[at]! << 16) | (all[at + 1]! << 8) | all[at + 2]!;
      frames.push({
        type: all[at + 3]!,
        flags: all[at + 4]!,
        stream:
          ((all[at + 5]! << 24) | (all[at + 6]! << 16) | (all[at + 7]! << 8) | all[at + 8]!) >>> 0,
        payload: all.slice(at + 9, at + 9 + length),
      });
      at += 9 + length;
    }
    return frames;
  }
}

const dataFrames = (peer: Peer) => peer.frames.filter((f) => f.type === DATA);
const dataOctets = (peer: Peer) => dataFrames(peer).reduce((n, f) => n + f.payload.length, 0);
/** The windows handed back after the first, as `[stream, increment]`. */
const updates = (peer: Peer) =>
  peer.frames
    .filter((f) => f.type === WINDOW_UPDATE)
    .slice(1)
    .map((f) => [f.stream, new DataView(f.payload.buffer).getUint32(0)]);
/** The request's header fields, as the server decodes them. */
const requestFields = (peer: Peer) =>
  makeDecoder().decode(
    cat(
      ...peer.frames
        .filter((f) => f.type === HEADERS || f.type === CONTINUATION)
        .map((f) => f.payload),
    ),
  );

const SETTINGS_ACK = [0, 0, 0, SETTINGS, ACK, 0, 0, 0, 0];

// Tracing would add its own headers to the request.
const execute = (request: HttpClientRequest.HttpClientRequest) =>
  CloudflareHttp2.client
    .execute(request)
    .pipe(Effect.provideService(Tracer.DisablePropagation, true));

const getRequest = (to = "http://grpc.test/svc/Call") => HttpClientRequest.get(to);

const postRequest = (body: Uint8Array | number = 5, to = "http://grpc.test/svc/Call") =>
  HttpClientRequest.post(to).pipe(
    HttpClientRequest.bodyUint8Array(
      typeof body === "number" ? new Uint8Array(body).fill(0x62) : body,
      "application/grpc",
    ),
    HttpClientRequest.setHeader("te", "trailers"),
  );

interface ExchangeOptions extends PeerOptions {
  readonly request?: HttpClientRequest.HttpClientRequest;
}

const causeOf = (error: HttpClientError.HttpClientError) =>
  (error.reason as { readonly cause?: unknown }).cause;

/** Send one request to a server that follows `script`. */
const exchange = async (script: ReadonlyArray<Step>, options: ExchangeOptions = {}) => {
  const peer = new Peer(script, options);
  sockets.next = () => peer;
  const result = await Effect.runPromise(Effect.result(execute(options.request ?? getRequest())));
  return { peer, result };
};

/** The response to a request the server answered. */
const reply = async (script: ReadonlyArray<Step>, options?: ExchangeOptions) => {
  const { peer, result } = await exchange(script, options);
  if (!Result.isSuccess(result)) {
    throw new Error(`no response: ${String(causeOf(result.failure))}`);
  }
  return { peer, response: result.success };
};

/** The cause of a request that failed before its response head. */
const refused = async (script: ReadonlyArray<Step>, options?: ExchangeOptions) => {
  const { peer, result } = await exchange(script, options);
  if (!Result.isFailure(result)) throw new Error("the request was answered");
  const reason = result.failure.reason as { readonly _tag: string; readonly description?: string };
  expect(result.failure._tag).toBe("HttpClientError");
  expect(reason._tag).toBe("TransportError");
  expect(reason.description).toBe("HTTP/2 request over cloudflare:sockets failed");
  expect(peer.closes).toBe(1);
  return { peer, cause: causeOf(result.failure) as Error };
};

/** The cause of a response whose body failed after its head arrived. */
const bodyFailure = async (script: ReadonlyArray<Step>, options?: ExchangeOptions) => {
  const { peer, response } = await reply(script, options);
  const body = await Effect.runPromise(Effect.result(response.arrayBuffer));
  if (!Result.isFailure(body)) throw new Error("the body was read");
  expect(body.failure.reason._tag).toBe("DecodeError");
  expect(peer.closes).toBe(1);
  expect(await Effect.runPromise(trailersOf(response))).toEqual({});
  return { peer, response, cause: causeOf(body.failure) as Error };
};

const refusedWith = async (
  script: ReadonlyArray<Step>,
  message: string,
  options?: ExchangeOptions,
) => {
  const { peer, cause } = await refused(script, options);
  expect(cause).toBeInstanceOf(Error);
  expect(cause.message).toBe(message);
  return peer;
};

const bodyFailsWith = async (
  script: ReadonlyArray<Step>,
  message: string,
  options?: ExchangeOptions,
) => {
  const { peer, cause } = await bodyFailure(script, options);
  expect(cause).toBeInstanceOf(Error);
  expect(cause.message).toBe(message);
  return peer;
};

const textOf = (response: HttpClientResponse.HttpClientResponse) =>
  Effect.runPromise(response.text);
const trailersFor = (response: HttpClientResponse.HttpClientResponse) =>
  Effect.runPromise(trailersOf(response));

/**
 * Send a body larger than the window to a server that answers with `replies`
 * and then a whole response. `sent` is how much of the body had gone out at
 * each read.
 */
const upload = async (replies: ReadonlyArray<Uint8Array>, size = 70_000) => {
  const sent: number[] = [];
  const observe =
    (move: Uint8Array): Step =>
    (peer) => {
      sent.push(dataOctets(peer));
      return move;
    };
  const { peer, response } = await reply([...replies.map(observe), observe(done)], {
    request: postRequest(size),
  });
  expect(await textOf(response)).toBe("");
  expect(dataOctets(peer)).toBe(size);
  expect(dataFrames(peer).map((f) => f.flags)).toEqual([
    ...dataFrames(peer)
      .slice(1)
      .map(() => 0),
    END_STREAM,
  ]);
  return { peer, sent, sizes: dataFrames(peer).map((f) => f.payload.length) };
};

beforeEach(() => {
  sockets.next = undefined;
  sockets.calls.length = 0;
});

describe("HTTP/2 on cloudflare:sockets: the request", () => {
  test("opens with the preface, SETTINGS, a window and the headers, in one write", async () => {
    const { peer, response } = await reply([done]);
    expect(response.status).toBe(200);
    expect(peer.writes.length).toBe(1);
    expect(new TextDecoder().decode(peer.writes[0]!.subarray(0, 24))).toBe(PREFACE);
    const [settings, window, headers, ...rest] = peer.frames;
    expect(rest).toEqual([]);
    // ENABLE_PUSH = 0, INITIAL_WINDOW_SIZE = 1 048 576.
    expect(settings).toEqual({
      type: SETTINGS,
      flags: 0,
      stream: 0,
      payload: Uint8Array.of(0, 2, 0, 0, 0, 0, 0, 4, 0, 0x10, 0, 0),
    });
    // The connection's window, raised from 65 535 to match.
    expect(window).toEqual({
      type: WINDOW_UPDATE,
      flags: 0,
      stream: 0,
      payload: Uint8Array.from(u32(1_048_576 - 65_535)),
    });
    expect(headers).toMatchObject({ type: HEADERS, flags: END_HEADERS | END_STREAM, stream: 1 });
    expect(requestFields(peer)).toEqual([
      [":method", "GET"],
      [":scheme", "http"],
      [":path", "/svc/Call"],
      [":authority", "grpc.test"],
    ]);
  });

  test("connects to the URL's host, on port 80 without TLS", async () => {
    await reply([done]);
    expect(sockets.calls).toEqual([
      {
        address: { hostname: "grpc.test", port: 80 },
        options: { secureTransport: "off", allowHalfOpen: false },
      },
    ]);
  });

  test("an https URL connects with TLS on port 443", async () => {
    const { peer } = await reply([done], { request: getRequest("https://grpc.test/svc/Call") });
    expect(sockets.calls).toEqual([
      {
        address: { hostname: "grpc.test", port: 443 },
        options: { secureTransport: "on", allowHalfOpen: false },
      },
    ]);
    expect(requestFields(peer)).toContainEqual([":scheme", "https"]);
    expect(requestFields(peer)).toContainEqual([":authority", "grpc.test"]);
  });

  test("a port in the URL is the port connected to and part of :authority", async () => {
    for (const [to, tls] of [
      ["http://grpc.test:8080/svc/Call", "off"],
      ["https://grpc.test:8443/svc/Call", "on"],
    ] as const) {
      sockets.calls.length = 0;
      const { peer } = await reply([done], { request: getRequest(to) });
      const port = Number(new URL(to).port);
      expect(sockets.calls[0]).toEqual({
        address: { hostname: "grpc.test", port },
        options: { secureTransport: tls, allowHalfOpen: false },
      });
      expect(requestFields(peer)).toContainEqual([":authority", `grpc.test:${port}`]);
    }
  });

  test(":path keeps the query string, and is / for a bare origin", async () => {
    const query = await reply([done], { request: getRequest("http://grpc.test/svc/Call?x=1&y=2") });
    expect(requestFields(query.peer)).toContainEqual([":path", "/svc/Call?x=1&y=2"]);
    const bare = await reply([done], { request: getRequest("http://grpc.test") });
    expect(requestFields(bare.peer)).toContainEqual([":path", "/"]);
  });

  test("sends the request's headers, without the ones HTTP/2 forbids", async () => {
    const { peer } = await reply([done], {
      request: getRequest().pipe(
        HttpClientRequest.setHeaders({
          host: "elsewhere.test",
          connection: "keep-alive",
          "keep-alive": "timeout=5",
          "content-length": "0",
          "transfer-encoding": "chunked",
          upgrade: "h2c",
          "X-Kept": "yes",
          te: "trailers",
        }),
      ),
    });
    expect(requestFields(peer)).toEqual([
      [":method", "GET"],
      [":scheme", "http"],
      [":path", "/svc/Call"],
      [":authority", "grpc.test"],
      ["x-kept", "yes"],
      ["te", "trailers"],
    ]);
  });

  test("a body goes out as DATA after the headers, which then leave the stream open", async () => {
    const { peer } = await reply([done], { request: postRequest(Uint8Array.of(1, 2, 3, 4, 5)) });
    expect(peer.writes.length).toBe(2);
    expect(peer.frames[2]).toMatchObject({ type: HEADERS, flags: END_HEADERS, stream: 1 });
    expect(requestFields(peer)).toEqual([
      [":method", "POST"],
      [":scheme", "http"],
      [":path", "/svc/Call"],
      [":authority", "grpc.test"],
      ["content-type", "application/grpc"],
      ["te", "trailers"],
    ]);
    expect(peer.frames.slice(3)).toEqual([
      { type: DATA, flags: END_STREAM, stream: 1, payload: Uint8Array.of(1, 2, 3, 4, 5) },
    ]);
    expect(peer.writes[1]).toEqual(data([1, 2, 3, 4, 5], END_STREAM));
  });

  test("an empty body ends the stream on the headers", async () => {
    const { peer } = await reply([done], { request: postRequest(new Uint8Array(0)) });
    expect(peer.writes.length).toBe(1);
    expect(peer.frames[2]).toMatchObject({ type: HEADERS, flags: END_HEADERS | END_STREAM });
    expect(dataFrames(peer)).toEqual([]);
  });

  test("a body is split at the frame size, each frame its own write", async () => {
    for (const [size, sizes] of [
      [16_384, [16_384]],
      [16_385, [16_384, 1]],
      [40_000, [16_384, 16_384, 7_232]],
    ] as const) {
      const body = Uint8Array.from({ length: size }, (_, i) => i % 251);
      const { peer } = await reply([done], { request: postRequest(body) });
      const frames = dataFrames(peer);
      expect(frames.map((f) => f.payload.length)).toEqual(sizes);
      expect(frames.map((f) => f.flags)).toEqual(
        sizes.map((_, i) => (i === sizes.length - 1 ? 1 : 0)),
      );
      expect(frames.every((f) => f.stream === 1)).toBe(true);
      expect(cat(...frames.map((f) => f.payload))).toEqual(body);
      expect(peer.writes.length).toBe(1 + sizes.length);
    }
  });

  test("a header block larger than a frame continues in CONTINUATION frames", async () => {
    const big = "v".repeat(40_000);
    const { peer } = await reply([done], {
      request: getRequest().pipe(HttpClientRequest.setHeader("x-big", big)),
    });
    expect(peer.writes.length).toBe(1);
    expect(peer.frames.slice(2).map((f) => [f.type, f.flags, f.stream, f.payload.length])).toEqual([
      // END_STREAM rides the HEADERS frame; END_HEADERS the last fragment.
      [HEADERS, END_STREAM, 1, 16_384],
      [CONTINUATION, 0, 1, 16_384],
      [CONTINUATION, END_HEADERS, 1, peer.frames[4]!.payload.length],
    ]);
    expect(requestFields(peer)).toContainEqual(["x-big", big]);
  });

  test("a header block of exactly one frame is not continued, one octet more is", async () => {
    const blockLength = async (length: number) => {
      const { peer } = await reply([done], {
        request: getRequest().pipe(HttpClientRequest.setHeader("x-big", "v".repeat(length))),
      });
      return peer.frames.slice(2).map((f) => [f.type, f.flags, f.payload.length]);
    };
    // A block grows by one octet for each octet of the value.
    const [[, , measured]] = (await blockLength(16_000)) as [[number, number, number]];
    const exact = 16_000 + (16_384 - measured);
    expect(await blockLength(exact)).toEqual([[HEADERS, END_HEADERS | END_STREAM, 16_384]]);
    expect(await blockLength(exact + 1)).toEqual([
      [HEADERS, END_STREAM, 16_384],
      [CONTINUATION, END_HEADERS, 1],
    ]);
  });

  test("a body that is not octets is refused before a connection is opened", async () => {
    for (const [tag, request] of [
      [
        "Stream",
        HttpClientRequest.post("http://grpc.test/svc/Call").pipe(
          HttpClientRequest.bodyStream(Stream.make(new Uint8Array(1))),
        ),
      ],
      [
        "FormData",
        HttpClientRequest.post("http://grpc.test/svc/Call").pipe(
          HttpClientRequest.bodyFormData(new FormData()),
        ),
      ],
      [
        "Raw",
        HttpClientRequest.post("http://grpc.test/svc/Call").pipe(
          HttpClientRequest.setBody(HttpBody.raw("x")),
        ),
      ],
    ] as const) {
      const { peer, result } = await exchange([done], { request });
      if (!Result.isFailure(result)) throw new Error("the request was sent");
      const reason = result.failure.reason as {
        readonly _tag: string;
        readonly description?: string;
      };
      expect(reason._tag).toBe("TransportError");
      expect(reason.description).toBe("HTTP/2 request over cloudflare:sockets failed");
      expect((causeOf(result.failure) as Error).message).toBe(
        `a ${tag} request body cannot be sent`,
      );
      expect(sockets.calls).toEqual([]);
      expect(peer.reads).toBe(0);
      expect(peer.closes).toBe(0);
    }
  });

  test("a connection that cannot be opened is a transport error", async () => {
    const failure = new Error("no route");
    sockets.next = () => {
      throw failure;
    };
    const result = await Effect.runPromise(Effect.result(execute(getRequest())));
    if (!Result.isFailure(result)) throw new Error("the request was sent");
    expect((result.failure.reason as { readonly _tag: string })._tag).toBe("TransportError");
    expect(causeOf(result.failure)).toBe(failure);
  });
});

describe("HTTP/2 on cloudflare:sockets: the server's windows", () => {
  const both = (increment: number) => cat(windowUpdate(0, increment), windowUpdate(1, increment));

  test("a body stops at the 65 535-octet window and resumes when both windows open", async () => {
    const { sent, sizes } = await upload([windowUpdate(0, 10_000), windowUpdate(1, 10_000)]);
    // The connection's window alone does not release the stream's.
    expect(sent).toEqual([65_535, 65_535, 70_000]);
    expect(sizes).toEqual([16_384, 16_384, 16_384, 16_383, 4_465]);
  });

  test("the stream's window alone does not release the connection's", async () => {
    const { sent } = await upload([windowUpdate(1, 10_000), windowUpdate(0, 10_000)]);
    expect(sent).toEqual([65_535, 65_535, 70_000]);
  });

  test("a window for another stream releases nothing", async () => {
    const { sent } = await upload([windowUpdate(3, 10_000), both(10_000)]);
    expect(sent).toEqual([65_535, 65_535, 70_000]);
  });

  test("a small window lets that much out", async () => {
    const { sent, sizes } = await upload([both(100), both(10_000)]);
    expect(sent).toEqual([65_535, 65_635, 70_000]);
    expect(sizes).toEqual([16_384, 16_384, 16_384, 16_383, 100, 4_365]);
  });

  test("the reserved bit of a window increment is ignored", async () => {
    const { sent } = await upload([both(0x80000005), both(10_000)]);
    expect(sent).toEqual([65_535, 65_540, 70_000]);
  });

  test("a larger SETTINGS_INITIAL_WINDOW_SIZE grows the stream's window, not the connection's", async () => {
    const { peer, sent } = await upload([settingsOf([4, 70_000]), windowUpdate(0, 4_465)]);
    expect(sent).toEqual([65_535, 65_535, 70_000]);
    expect(peer.writes.some((w) => Array.from(w).join() === SETTINGS_ACK.join())).toBe(true);
  });

  test("a smaller SETTINGS_INITIAL_WINDOW_SIZE takes the stream's window below zero", async () => {
    const { sent } = await upload([
      settingsOf([4, 65_435]),
      // 100 only brings the stream's window back to zero.
      cat(windowUpdate(0, 10_000), windowUpdate(1, 100)),
      windowUpdate(1, 10_000),
    ]);
    expect(sent).toEqual([65_535, 65_535, 65_535, 70_000]);
  });

  test("a setting sent twice applies in order", async () => {
    const { sent } = await upload([
      settingsOf([4, 70_000], [4, 65_535]),
      windowUpdate(0, 10_000),
      windowUpdate(1, 10_000),
    ]);
    expect(sent).toEqual([65_535, 65_535, 65_535, 70_000]);
  });

  test("SETTINGS_MAX_FRAME_SIZE raises the size of the DATA frames sent", async () => {
    const { sent, sizes } = await upload([cat(settingsOf([5, 32_768]), both(40_000))], 105_535);
    expect(sent).toEqual([65_535, 105_535]);
    expect(sizes).toEqual([16_384, 16_384, 16_384, 16_383, 32_768, 7_232]);
  });

  test("a graceful GOAWAY that covers the stream lets the body finish", async () => {
    const { sent } = await upload([goaway(1, 0), both(10_000)]);
    expect(sent).toEqual([65_535, 65_535, 70_000]);
  });

  test("a response that ends the stream ends the upload", async () => {
    const { peer, response } = await reply([done], { request: postRequest(70_000) });
    expect(response.status).toBe(200);
    expect(await textOf(response)).toBe("");
    expect(dataOctets(peer)).toBe(65_535);
    expect(dataFrames(peer).every((f) => f.flags === 0)).toBe(true);
    expect(peer.closes).toBe(1);
  });

  test("a response head does not end the upload", async () => {
    const { peer, response } = await reply([head200, both(10_000), cat(data("ok"), okTrailers)], {
      request: postRequest(70_000),
    });
    expect(await textOf(response)).toBe("ok");
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
    expect(dataOctets(peer)).toBe(70_000);
    expect(dataFrames(peer).at(-1)!.flags).toBe(END_STREAM);
  });

  test("a reset while the upload waits fails the request", async () => {
    const peer = await refusedWith([rst(1, 8)], "the server reset the stream (HTTP/2 error 8)", {
      request: postRequest(70_000),
    });
    expect(dataOctets(peer)).toBe(65_535);
  });

  test("a connection closed while the upload waits fails the request", async () => {
    await refusedWith(["close"], "connection closed before the response ended", {
      request: postRequest(70_000),
    });
  });
});

describe("HTTP/2 on cloudflare:sockets: SETTINGS", () => {
  test("is acknowledged", async () => {
    const { peer, response } = await reply([cat(settingsOf(), done)]);
    expect(response.status).toBe(200);
    expect(peer.writes.length).toBe(2);
    expect(Array.from(peer.writes[1]!)).toEqual(SETTINGS_ACK);
  });

  test("an acknowledgement is not acknowledged", async () => {
    const { peer, response } = await reply([cat(frameOf(SETTINGS, ACK, 0), done)]);
    expect(response.status).toBe(200);
    expect(peer.writes.length).toBe(1);
  });

  test.each([
    ["the smallest SETTINGS_MAX_FRAME_SIZE", [5, 16_384]],
    ["the largest SETTINGS_MAX_FRAME_SIZE", [5, 0xffffff]],
    ["the largest SETTINGS_INITIAL_WINDOW_SIZE", [4, 0x7fffffff]],
    ["a zero SETTINGS_INITIAL_WINDOW_SIZE", [4, 0]],
    ["SETTINGS_HEADER_TABLE_SIZE", [1, 0]],
    ["SETTINGS_ENABLE_PUSH", [2, 1]],
    ["SETTINGS_MAX_CONCURRENT_STREAMS", [3, 0]],
    ["SETTINGS_MAX_HEADER_LIST_SIZE", [6, 1]],
    ["a setting it does not know", [0xffff, 0xffffffff]],
    // Both octets of the id name the setting, not only the last.
    ["a setting whose id ends like SETTINGS_INITIAL_WINDOW_SIZE", [0x0104, 0xffffffff]],
    ["a setting whose id ends like SETTINGS_MAX_FRAME_SIZE", [0x0105, 1]],
  ] as const)("accepts %s", async (_, entry) => {
    const { peer, response } = await reply([cat(settingsOf(entry), done)]);
    expect(response.status).toBe(200);
    expect(Array.from(peer.writes[1]!)).toEqual(SETTINGS_ACK);
  });

  test.each([
    [
      "a SETTINGS_MAX_FRAME_SIZE below 16 384",
      [5, 16_383],
      "SETTINGS_MAX_FRAME_SIZE is out of range",
    ],
    [
      "a SETTINGS_MAX_FRAME_SIZE above 2^24-1",
      [5, 0x1000000],
      "SETTINGS_MAX_FRAME_SIZE is out of range",
    ],
    [
      "a SETTINGS_INITIAL_WINDOW_SIZE above 2^31-1",
      [4, 0x80000000],
      "SETTINGS_INITIAL_WINDOW_SIZE exceeds the limit",
    ],
  ] as const)("refuses %s, without an acknowledgement", async (_, entry, message) => {
    const peer = await refusedWith([cat(settingsOf(entry), done)], message);
    expect(peer.writes.length).toBe(1);
  });

  test("refuses a setting after valid ones", async () => {
    const peer = await refusedWith(
      [cat(settingsOf([4, 100], [5, 1]), done)],
      "SETTINGS_MAX_FRAME_SIZE is out of range",
    );
    expect(peer.writes.length).toBe(1);
  });

  test.each([1, 5, 7, 11])("refuses a payload of %i octets", async (length) => {
    const peer = await refusedWith(
      [cat(frameOf(SETTINGS, 0, 0, new Uint8Array(length)), done)],
      "malformed SETTINGS",
    );
    expect(peer.writes.length).toBe(1);
  });
});

describe("HTTP/2 on cloudflare:sockets: response HEADERS", () => {
  const block = encode([
    [":status", "200"],
    ["x-a", "1"],
  ]);
  const priority = [0x80, 0, 0, 3, 200];
  const all = END_HEADERS | END_STREAM;

  test.each([
    ["plain", 0, Array.from(block)],
    ["padded", PADDED, [3, ...block, 0, 0, 0]],
    ["padded with no padding", PADDED, [0, ...block]],
    ["with a priority", PRIORITY, [...priority, ...block]],
    ["padded with a priority", PADDED | PRIORITY, [2, ...priority, ...block, 0, 0]],
  ] as const)("reads a %s block", async (_, flags, payload) => {
    const { peer, response } = await reply([frameOf(HEADERS, all | flags, 1, payload)]);
    expect(response.status).toBe(200);
    expect(response.headers).toEqual({ "x-a": "1" });
    expect(await textOf(response)).toBe("");
    expect(peer.writes.length).toBe(1);
  });

  test.each([
    ["padding longer than the frame", PADDED, [block.length + 1, ...block]],
    ["padding of 255 octets in a short frame", PADDED, [255, ...block]],
    ["a padded frame with no pad length", PADDED, []],
    ["a priority cut short", PRIORITY, [0, 0, 0, 3]],
    ["a priority with no octets", PRIORITY, []],
    ["padding that reaches into the priority", PADDED | PRIORITY, [3, ...priority, 0]],
    ["a padded priority cut short", PADDED | PRIORITY, [0, 0, 0, 0, 3]],
  ] as const)("refuses %s", async (_, flags, payload) => {
    await refusedWith(
      [frameOf(HEADERS, all | flags, 1, payload)],
      "HEADERS padding or priority exceeds the frame",
    );
  });

  test("padding that leaves no block is a response with no status", async () => {
    await refusedWith(
      [frameOf(HEADERS, all | PADDED, 1, [block.length, ...block])],
      "invalid HTTP status (none)",
    );
  });

  test("a block continues over CONTINUATION frames, split anywhere", async () => {
    const { response } = await reply([
      frameOf(HEADERS, 0, 1, block.subarray(0, 3)),
      // A fragment may be empty, and may come in a later read.
      cat(frameOf(CONTINUATION, 0, 1), frameOf(CONTINUATION, 0, 1, block.subarray(3, 4))),
      cat(frameOf(CONTINUATION, END_HEADERS, 1, block.subarray(4)), data("x", END_STREAM)),
    ]);
    expect(response.status).toBe(200);
    expect(response.headers).toEqual({ "x-a": "1" });
    expect(await textOf(response)).toBe("x");
  });

  test("padding and priority are taken off the HEADERS frame only", async () => {
    const { response } = await reply([
      cat(
        frameOf(HEADERS, PADDED | PRIORITY | END_STREAM, 1, [
          1,
          ...priority,
          ...block.subarray(0, 2),
          0,
        ]),
        frameOf(CONTINUATION, END_HEADERS, 1, block.subarray(2)),
      ),
    ]);
    expect(response.headers).toEqual({ "x-a": "1" });
  });

  test("END_STREAM on the HEADERS frame holds once the block is complete", async () => {
    const { peer, response } = await reply([
      cat(
        frameOf(HEADERS, END_STREAM, 1, block.subarray(0, 2)),
        frameOf(CONTINUATION, END_HEADERS, 1, block.subarray(2)),
      ),
      "hang",
    ]);
    expect(await textOf(response)).toBe("");
    expect(peer.reads).toBe(1);
    expect(peer.closes).toBe(1);
  });

  test("CONTINUATION has no END_STREAM flag", async () => {
    const { response } = await reply([
      cat(
        frameOf(HEADERS, 0, 1, block.subarray(0, 2)),
        frameOf(CONTINUATION, END_HEADERS | 0x1, 1, block.subarray(2)),
      ),
      data("still open", END_STREAM),
    ]);
    expect(await textOf(response)).toBe("still open");
  });

  test("refuses CONTINUATION with no block open", async () => {
    await refusedWith(
      [frameOf(CONTINUATION, END_HEADERS, 1, block)],
      "CONTINUATION without a header block",
    );
    await bodyFailsWith(
      [cat(head200, frameOf(CONTINUATION, END_HEADERS, 1, block))],
      "CONTINUATION without a header block",
    );
  });

  test.each([
    ["DATA", data("x")],
    ["HEADERS", frameOf(HEADERS, END_HEADERS, 1, block)],
    ["PRIORITY", frameOf(PRIORITY_FRAME, 0, 1, priority)],
    ["RST_STREAM", rst(1, 0)],
    ["SETTINGS", settingsOf()],
    ["a SETTINGS acknowledgement", frameOf(SETTINGS, ACK, 0)],
    ["PUSH_PROMISE", frameOf(PUSH_PROMISE, END_HEADERS, 1, [0, 0, 0, 2])],
    ["PING", ping()],
    ["GOAWAY", goaway(1, 0)],
    ["WINDOW_UPDATE", windowUpdate(0, 1)],
    ["a frame of an unknown type", frameOf(UNKNOWN, 0, 0)],
    ["CONTINUATION on another stream", frameOf(CONTINUATION, END_HEADERS, 3, block.subarray(2))],
    ["CONTINUATION on the connection", frameOf(CONTINUATION, END_HEADERS, 0, block.subarray(2))],
  ] as const)("refuses %s inside a header block", async (_, intruder) => {
    const peer = await refusedWith(
      [
        cat(
          frameOf(HEADERS, 0, 1, block.subarray(0, 2)),
          intruder,
          frameOf(CONTINUATION, END_HEADERS, 1, block.subarray(2)),
        ),
      ],
      "a header block was interrupted by another frame",
    );
    // Nothing is acknowledged or echoed.
    expect(peer.writes.length).toBe(1);
  });

  test("refuses a frame inside the trailers' block", async () => {
    await bodyFailsWith(
      [cat(head200, frameOf(HEADERS, END_STREAM, 1, [0x88]), ping())],
      "a header block was interrupted by another frame",
    );
  });

  test.each([
    ["HEADERS", HEADERS, 0],
    ["HEADERS", HEADERS, 2],
    ["HEADERS", HEADERS, 3],
    ["DATA", DATA, 0],
    ["DATA", DATA, 2],
    ["DATA", DATA, 3],
    ["CONTINUATION", CONTINUATION, 0],
    ["CONTINUATION", CONTINUATION, 3],
    ["DATA", DATA, 0x7fffffff],
  ] as const)("refuses %s on stream %i, which it did not open", async (_, type, stream) => {
    const intruder = frameOf(type, END_HEADERS | END_STREAM, stream, block);
    const message = `a frame on stream ${stream}, which this end did not open`;
    await refusedWith([intruder], message);
    await bodyFailsWith([cat(head200, intruder)], message);
  });

  test("a stream id's reserved bit is ignored", async () => {
    const { response } = await reply([
      cat(
        frameOf(HEADERS, END_HEADERS, 0x80000001, block),
        data("a", 0, 0x80000001),
        frameOf(HEADERS, all, 0x80000001, encode([["grpc-status", "0"]])),
      ),
    ]);
    expect(response.headers).toEqual({ "x-a": "1" });
    expect(await textOf(response)).toBe("a");
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
  });
});

describe("HTTP/2 on cloudflare:sockets: DATA", () => {
  test("frames in one read and across reads are one body", async () => {
    const { response } = await reply([
      cat(head200, data("ab"), data("cd")),
      data("ef"),
      cat(data("gh"), data("ij", END_STREAM)),
    ]);
    expect(await textOf(response)).toBe("abcdefghij");
    expect(await trailersFor(response)).toEqual({});
  });

  test("an empty frame adds nothing, and may end the stream", async () => {
    const { peer, response } = await reply([
      cat(head200, data(""), data("a"), data("")),
      data("", END_STREAM),
      "hang",
    ]);
    expect(await textOf(response)).toBe("a");
    expect(peer.reads).toBe(2);
  });

  test("an empty frame is no part of the body", async () => {
    const { response } = await reply([
      head200,
      data(""),
      frameOf(DATA, PADDED, 1, [2, 0, 0]),
      data("a"),
      data(""),
      data("b", END_STREAM),
    ]);
    const parts = await Effect.runPromise(Stream.runCollect(response.stream));
    expect(Array.from(parts, (part) => new TextDecoder().decode(part))).toEqual(["a", "b"]);
  });

  test.each([
    ["some padding", [2, ...text("hi"), 0, 0], "hi"],
    ["no padding", [0, ...text("hi")], "hi"],
    ["nothing but padding", [2, 0, 0], ""],
    ["nothing but the pad length", [0], ""],
  ] as const)("reads a padded frame with %s", async (_, payload, body) => {
    const { response } = await reply([
      cat(head200, frameOf(DATA, PADDED | END_STREAM, 1, payload)),
    ]);
    expect(await textOf(response)).toBe(body);
  });

  test.each([
    ["padding longer than the frame", [3, 1, 2]],
    ["padding as long as the frame", [1]],
    ["a padded frame with no pad length", []],
  ] as const)("refuses %s", async (_, payload) => {
    await bodyFailsWith(
      [cat(head200, frameOf(DATA, PADDED | END_STREAM, 1, payload))],
      "DATA padding exceeds the frame",
    );
  });

  test("refuses DATA before the response head", async () => {
    await refusedWith([data("x")], "DATA before the response headers");
    await refusedWith([data("", END_STREAM)], "DATA before the response headers");
    // An interim response is not the head.
    await refusedWith(
      [cat(head([[":status", "100"]]), data("x"))],
      "DATA before the response headers",
    );
  });

  test("a body of every octet value arrives unchanged", async () => {
    const octets = Uint8Array.from({ length: 256 }, (_, i) => i);
    const { response } = await reply([cat(head200, data(octets, END_STREAM))]);
    expect(new Uint8Array(await Effect.runPromise(response.arrayBuffer))).toEqual(octets);
  });
});

describe("HTTP/2 on cloudflare:sockets: this end's windows", () => {
  const end = data("", END_STREAM);
  /** The response `frames` make, then what the transport handed back. */
  const handedBack = async (...frames: ReadonlyArray<Uint8Array>) => {
    const { peer, response } = await reply([cat(head200, ...frames)]);
    const body = new Uint8Array(await Effect.runPromise(response.arrayBuffer));
    return { peer, received: body.length, updates: updates(peer) };
  };

  test("hands back both windows once 65 536 octets were read, in one write", async () => {
    const { peer, received, updates } = await handedBack(d16, d16, d16, d16, data("z", END_STREAM));
    expect(received).toBe(65_537);
    expect(updates).toEqual([
      [0, 65_536],
      [1, 65_536],
    ]);
    expect(peer.writes.length).toBe(2);
    expect(peer.writes[1]).toEqual(cat(windowUpdate(0, 65_536), windowUpdate(1, 65_536)));
  });

  test("hands nothing back one octet short of that", async () => {
    const { peer, received, updates } = await handedBack(
      d16,
      d16,
      d16,
      data(new Uint8Array(16_383)),
      end,
    );
    expect(received).toBe(65_535);
    expect(updates).toEqual([]);
    expect(peer.writes.length).toBe(1);
  });

  test("the octet that crosses the threshold hands it back", async () => {
    const { updates } = await handedBack(
      d16,
      d16,
      d16,
      data(new Uint8Array(16_383)),
      data("z"),
      end,
    );
    expect(updates).toEqual([
      [0, 65_536],
      [1, 65_536],
    ]);
  });

  test("hands back everything read, not only the threshold", async () => {
    const { updates } = await handedBack(d16, d16, d16, data(new Uint8Array(16_383)), d16, end);
    expect(updates).toEqual([
      [0, 81_919],
      [1, 81_919],
    ]);
  });

  test("padding counts against the windows", async () => {
    const padded = frameOf(DATA, PADDED, 1, [
      255,
      ...new Uint8Array(16_128).fill(0x61),
      ...new Uint8Array(255),
    ]);
    const { received, updates } = await handedBack(padded, padded, padded, padded, end);
    expect(received).toBe(4 * 16_128);
    expect(updates).toEqual([
      [0, 65_536],
      [1, 65_536],
    ]);
  });

  test("hands back again after each further 65 536 octets", async () => {
    const { peer, updates } = await handedBack(d16, d16, d16, d16, d16, d16, d16, d16, end);
    expect(updates).toEqual([
      [0, 65_536],
      [1, 65_536],
      [0, 65_536],
      [1, 65_536],
    ]);
    expect(peer.writes.length).toBe(3);
  });

  test("hands nothing back for the frame that ends the stream", async () => {
    const { received, updates } = await handedBack(
      d16,
      d16,
      d16,
      data(new Uint8Array(16_384), END_STREAM),
    );
    expect(received).toBe(65_536);
    expect(updates).toEqual([]);
  });
});

describe("HTTP/2 on cloudflare:sockets: control frames", () => {
  test("a PING is echoed with ACK", async () => {
    const { peer, response } = await reply([cat(ping([9, 8, 7, 6, 5, 4, 3, 2]), done)]);
    expect(response.status).toBe(200);
    expect(peer.writes.length).toBe(2);
    expect(peer.writes[1]).toEqual(frameOf(PING, ACK, 0, [9, 8, 7, 6, 5, 4, 3, 2]));
  });

  test("a PING acknowledgement is not echoed", async () => {
    const { peer, response } = await reply([cat(ping(undefined, ACK), done)]);
    expect(response.status).toBe(200);
    expect(peer.writes.length).toBe(1);
  });

  test.each([
    [0, 0],
    [7, 0],
    [9, 0],
    [7, ACK],
    [9, ACK],
  ] as const)("refuses a PING of %i octets (flags %i)", async (length, flags) => {
    const peer = await refusedWith(
      [cat(ping(new Uint8Array(length), flags), done)],
      "malformed PING",
    );
    expect(peer.writes.length).toBe(1);
  });

  test.each([
    [0, 0],
    [3, 0],
    [5, 1],
    [3, 3],
  ] as const)("refuses a WINDOW_UPDATE of %i octets on stream %i", async (length, stream) => {
    await refusedWith(
      [cat(frameOf(WINDOW_UPDATE, 0, stream, new Uint8Array(length)), done)],
      "malformed WINDOW_UPDATE",
    );
  });

  test("a WINDOW_UPDATE is not answered", async () => {
    const { peer, response } = await reply([
      cat(windowUpdate(0, 1), windowUpdate(1, 1), windowUpdate(3, 1), done),
    ]);
    expect(response.status).toBe(200);
    expect(peer.writes.length).toBe(1);
  });

  test("RST_STREAM fails the request with the server's code", async () => {
    await refusedWith([rst(1, 8)], "the server reset the stream (HTTP/2 error 8)");
    await refusedWith([rst(1, 0)], "the server reset the stream (HTTP/2 error 0)");
    await refusedWith(
      [rst(1, 0xffffffff)],
      "the server reset the stream (HTTP/2 error 4294967295)",
    );
  });

  test("RST_STREAM after the head fails the body", async () => {
    await bodyFailsWith([head200, rst(1, 2)], "the server reset the stream (HTTP/2 error 2)");
    await bodyFailsWith(
      [cat(head200, data("partial"), rst(1, 11))],
      "the server reset the stream (HTTP/2 error 11)",
    );
  });

  test("RST_STREAM for another stream is ignored", async () => {
    const { response } = await reply([cat(rst(3, 8), rst(0, 8), done)]);
    expect(response.status).toBe(200);
  });

  test.each([
    [3, 1],
    [5, 1],
    [0, 1],
    [3, 3],
    [5, 0],
  ] as const)("refuses a RST_STREAM of %i octets on stream %i", async (length, stream) => {
    await refusedWith(
      [cat(frameOf(RST_STREAM, 0, stream, new Uint8Array(length)), done)],
      "malformed RST_STREAM",
    );
  });

  test("GOAWAY with an error fails the request", async () => {
    await refusedWith([goaway(1, 2)], "the server closed the connection (HTTP/2 error 2)");
    await refusedWith(
      [goaway(0x7fffffff, 0xffffffff, "debug")],
      "the server closed the connection (HTTP/2 error 4294967295)",
    );
  });

  test("a graceful GOAWAY that leaves the stream out fails the request", async () => {
    await refusedWith([goaway(0, 0)], "the server closed the connection (HTTP/2 error 0)");
    // The reserved bit is not part of the stream id.
    await refusedWith([goaway(0x80000000, 0)], "the server closed the connection (HTTP/2 error 0)");
  });

  test.each([
    ["this stream", 1, ""],
    ["a later stream", 0x7fffffff, ""],
    ["a stream whose id is all in its first octet", 0x01000000, ""],
    ["this stream with the reserved bit set", 0x80000001, ""],
    ["this stream, with debug data", 1, "shutting down"],
  ] as const)("a graceful GOAWAY that covers %s lets it finish", async (_, lastStream, debug) => {
    const { peer, response } = await reply([
      cat(goaway(lastStream, 0, debug), head200),
      cat(data("a"), okTrailers),
    ]);
    expect(await textOf(response)).toBe("a");
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
    expect(peer.writes.length).toBe(1);
  });

  test("GOAWAY with an error after the head fails the body", async () => {
    await bodyFailsWith(
      [head200, goaway(1, 11)],
      "the server closed the connection (HTTP/2 error 11)",
    );
  });

  test.each([0, 4, 7])("refuses a GOAWAY of %i octets", async (length) => {
    await refusedWith(
      [cat(frameOf(GOAWAY, 0, 0, new Uint8Array(length)), done)],
      "malformed GOAWAY",
    );
  });

  test("refuses PUSH_PROMISE, which this end disabled", async () => {
    const promise = frameOf(PUSH_PROMISE, END_HEADERS, 1, [0, 0, 0, 2, 0x88]);
    await refusedWith([promise], "the server pushed a stream with push disabled");
    await refusedWith(
      [frameOf(PUSH_PROMISE, END_HEADERS, 0, [0, 0, 0, 2])],
      "the server pushed a stream with push disabled",
    );
    await bodyFailsWith([cat(head200, promise)], "the server pushed a stream with push disabled");
  });

  test.each([
    ["PRIORITY", PRIORITY_FRAME, 0],
    ["PRIORITY", PRIORITY_FRAME, 1],
    ["PRIORITY", PRIORITY_FRAME, 3],
    ["a frame of an unknown type", UNKNOWN, 0],
    ["a frame of an unknown type", UNKNOWN, 1],
    ["a frame of an unknown type", UNKNOWN, 3],
    ["a frame of the last type", 0xff, 0],
  ] as const)("ignores %s on stream %i", async (_, type, stream) => {
    // Any flags and any payload, an empty one included.
    const frames = cat(
      frameOf(type, 0xff, stream, [0, 0, 0, 0, 16]),
      frameOf(type, 0, stream),
      frameOf(type, 0xff, stream, new Uint8Array(16_384)),
    );
    const { peer, response } = await reply([
      cat(frames, head200, frames),
      cat(frames, data("a", 1)),
    ]);
    expect(await textOf(response)).toBe("a");
    expect(peer.writes.length).toBe(1);
  });
});

describe("HTTP/2 on cloudflare:sockets: framing", () => {
  /** A response with every kind of frame the transport reads. */
  const mixed = cat(
    settingsOf([4, 100_000]),
    ping([1, 1, 2, 3, 5, 8, 13, 21]),
    head([[":status", "100"]]),
    frameOf(HEADERS, PADDED, 1, [2, ...encode([[":status", "200"]]), 0, 0]),
    frameOf(CONTINUATION, END_HEADERS, 1, encode([["x-a", "1"]])),
    data("hello "),
    frameOf(UNKNOWN, 0, 0, [1, 2, 3]),
    frameOf(DATA, PADDED, 1, [1, ...text("world"), 0]),
    windowUpdate(0, 10),
    head([["grpc-status", "0"]], END_HEADERS | END_STREAM),
  );
  const read = async (script: ReadonlyArray<Step>) => {
    const { peer, response } = await reply(script);
    return {
      status: response.status,
      headers: { ...response.headers },
      body: await textOf(response),
      trailers: await trailersFor(response),
      written: Array.from(cat(...peer.writes.slice(1))),
    };
  };
  const whole = {
    status: 200,
    headers: { "x-a": "1" },
    body: "hello world",
    trailers: { "grpc-status": "0" },
    written: [...SETTINGS_ACK, ...frameOf(PING, ACK, 0, [1, 1, 2, 3, 5, 8, 13, 21])],
  };

  test("reads a response delivered in one read", async () => {
    expect(await read([mixed])).toEqual(whole);
  });

  test("reads a response delivered one octet at a time", async () => {
    expect(await read(Array.from(mixed, (octet) => Uint8Array.of(octet)))).toEqual(whole);
  });

  test("reads a response split at any octet", async () => {
    for (let at = 1; at < mixed.length; at++) {
      expect(await read([mixed.subarray(0, at), mixed.subarray(at)])).toEqual(whole);
    }
  });

  test("a read of no octets is not the end", async () => {
    const empty = new Uint8Array(0);
    expect(
      await read([
        empty,
        mixed.subarray(0, 4),
        empty,
        empty,
        mixed.subarray(4, 60),
        empty,
        mixed.subarray(60),
      ]),
    ).toEqual(whole);
  });

  test("what follows the end of the stream is never read", async () => {
    const { peer, response } = await reply([
      cat(
        head200,
        data("a", END_STREAM),
        // Each of these would otherwise be answered or refused.
        settingsOf(),
        ping(),
        frameHeader(0xffffff, DATA, 0, 1),
      ),
      "hang",
    ]);
    expect(await textOf(response)).toBe("a");
    expect(peer.writes.length).toBe(1);
    expect(peer.reads).toBe(1);
  });

  test("what follows a failure is never read", async () => {
    const peer = await refusedWith(
      [cat(rst(1, 8), ping(), done)],
      "the server reset the stream (HTTP/2 error 8)",
    );
    expect(peer.writes.length).toBe(1);
  });

  test("accepts a frame of 16 384 octets, the most it allows", async () => {
    const { response } = await reply([
      cat(head200, frameOf(UNKNOWN, 0, 0, new Uint8Array(16_384)), d16, data("", END_STREAM)),
    ]);
    expect((await textOf(response)).length).toBe(16_384);
  });

  test.each([
    [16_385, DATA, 1],
    [16_385, UNKNOWN, 0],
    [0xffffff, SETTINGS, 0],
    [0xffffff, UNKNOWN, 3],
  ] as const)("refuses a %i-octet frame from its header alone", async (length, type, stream) => {
    const message = `a ${length}-octet frame exceeds the limit`;
    await refusedWith([frameHeader(length, type, 0, stream), "hang"], message);
    await bodyFailsWith([cat(head200, frameHeader(length, type, 0, stream)), "hang"], message);
  });

  test("a connection closed before the head fails the request", async () => {
    const message = "connection closed before the response ended";
    await refusedWith(["close"], message);
    await refusedWith([], message);
    // Inside a frame header, inside a frame, and inside a header block.
    await refusedWith([head200.subarray(0, 5), "close"], message);
    await refusedWith([head200.subarray(0, 10), "close"], message);
    await refusedWith([frameOf(HEADERS, 0, 1, [0x88]), "close"], message);
    await refusedWith([cat(settingsOf(), ping()), "close"], message);
    // A frame header one octet short says nothing yet, whatever length it starts with.
    await refusedWith([frameHeader(0xffffff, DATA, 0, 1).subarray(0, 8), "close"], message);
  });

  test("a connection closed before the stream ends fails the body", async () => {
    const message = "connection closed before the response ended";
    await bodyFailsWith([head200, "close"], message);
    await bodyFailsWith([cat(head200, data("abc")), "close"], message);
    await bodyFailsWith([cat(head200, data("abc").subarray(0, 4)), "close"], message);
    await bodyFailsWith([cat(head200, data("abc").subarray(0, 11)), "close"], message);
    await bodyFailsWith(
      [cat(head200, data("abc"), frameOf(HEADERS, END_STREAM, 1, [])), "close"],
      message,
    );
  });

  test("a socket that fails is the cause, before the head and after", async () => {
    const error = new Error("socket reset");
    const before = await refused([{ error }]);
    expect(before.cause).toBe(error);
    const after = await bodyFailure([head200, { error }]);
    expect(after.cause).toBe(error);
    const partial = await bodyFailure([cat(head200, data("abc")), { error }]);
    expect(partial.cause).toBe(error);
  });
});

describe("HTTP/2 on cloudflare:sockets: the status", () => {
  test.each(["200", "201", "404", "503", "599"])("%s is the response's status", async (status) => {
    const { response } = await reply([head([[":status", status]], END_HEADERS | END_STREAM)]);
    expect(response.status).toBe(Number(status));
    expect(await textOf(response)).toBe("");
  });

  test.each([204, 205, 304])("%i has no body, and the stream is let go", async (status) => {
    const { peer, response } = await reply([
      head([
        [":status", String(status)],
        ["x-a", "1"],
      ]),
      "hang",
    ]);
    expect(response.status).toBe(status);
    expect(response.headers).toEqual({ "x-a": "1" });
    expect(await textOf(response)).toBe("");
    expect(await trailersFor(response)).toEqual({});
    expect(peer.closes).toBe(1);
  });

  test("interim responses are skipped, with their headers", async () => {
    const { response } = await reply([
      cat(
        head([
          [":status", "100"],
          ["x-interim", "1"],
        ]),
        head([
          [":status", "103"],
          ["link", "</a>"],
        ]),
      ),
      head([[":status", "199"]]),
      cat(
        head([
          [":status", "200"],
          ["x-a", "1"],
        ]),
        data("a", END_STREAM),
      ),
    ]);
    expect(response.status).toBe(200);
    expect(response.headers).toEqual({ "x-a": "1" });
    expect(await textOf(response)).toBe("a");
  });

  test.each(["100", "103", "199"])(
    "an interim %s that ends the stream is no response",
    async (status) => {
      await refusedWith(
        [head([[":status", status]], END_HEADERS | END_STREAM)],
        `invalid HTTP status ${status}`,
      );
    },
  );

  test.each(["abc", "20", "600", "999", "099", "000", "2e2", " 200", "200 ", "1000", "+20", ""])(
    "refuses the status %j",
    async (status) => {
      await refusedWith([head([[":status", status]])], `invalid HTTP status ${status}`);
    },
  );

  test("refuses digits that are not ASCII", async () => {
    // A header value is read one character per octet, so the message has the octets.
    const status = "٢٠٠";
    await refusedWith(
      [head([[":status", status]])],
      `invalid HTTP status ${Buffer.from(status, "utf8").toString("latin1")}`,
    );
  });

  test("refuses a head with no status", async () => {
    await refusedWith([head([["x-a", "1"]])], "invalid HTTP status (none)");
    await refusedWith(
      [frameOf(HEADERS, END_HEADERS | END_STREAM, 1)],
      "invalid HTTP status (none)",
    );
  });

  test("the last :status of a block is the one read", async () => {
    const { response } = await reply([
      head(
        [
          [":status", "500"],
          [":status", "200"],
        ],
        END_HEADERS | END_STREAM,
      ),
    ]);
    expect(response.status).toBe(200);
  });
});

describe("HTTP/2 on cloudflare:sockets: headers and trailers", () => {
  const end = END_HEADERS | END_STREAM;

  test("a name sent more than once is one header, its values joined", async () => {
    const { response } = await reply([
      head([
        [":status", "200"],
        ["x-a", "1"],
        ["x-b", "only"],
        ["x-a", "2"],
        ["x-a", ""],
        ["x-a", "3"],
      ]),
      head(
        [
          ["x-t", "1"],
          ["grpc-status", "0"],
          ["x-t", "2"],
        ],
        end,
      ),
    ]);
    expect(response.headers).toEqual({ "x-a": "1, 2, , 3", "x-b": "only" });
    expect(await textOf(response)).toBe("");
    expect(await trailersFor(response)).toEqual({ "x-t": "1, 2", "grpc-status": "0" });
  });

  test("pseudo-headers are not headers, in the head or the trailers", async () => {
    const { response } = await reply([
      head([
        [":status", "200"],
        [":path", "/x"],
        [":unknown", "1"],
        ["x-a", "1"],
      ]),
      head(
        [
          [":status", "500"],
          [":unknown", "1"],
          ["grpc-status", "0"],
        ],
        end,
      ),
    ]);
    expect(response.status).toBe(200);
    expect(response.headers).toEqual({ "x-a": "1" });
    expect(await textOf(response)).toBe("");
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
  });

  test("a name every object has is a header like any other", async () => {
    const { response } = await reply([
      head([
        [":status", "200"],
        ["constructor", "a"],
        ["constructor", "b"],
        ["valueof", "c"],
      ]),
      head(
        [
          ["constructor", "a"],
          ["__proto__", "b"],
          ["constructor", "c"],
          ["__proto__", "d"],
          ["hasownproperty", "e"],
        ],
        end,
      ),
    ]);
    expect(Object.entries(response.headers)).toEqual([
      ["constructor", "a, b"],
      ["valueof", "c"],
    ]);
    expect(await textOf(response)).toBe("");
    expect(Object.entries(await trailersFor(response))).toEqual([
      ["constructor", "a, c"],
      ["__proto__", "b, d"],
      ["hasownproperty", "e"],
    ]);
  });

  test("the trailers follow the body", async () => {
    const { response } = await reply([cat(head200, data("a")), data("b"), okTrailers]);
    expect(await textOf(response)).toBe("ab");
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
  });

  test("a stream that DATA ends has no trailers", async () => {
    const { response } = await reply([cat(head200, data("a", END_STREAM))]);
    expect(await textOf(response)).toBe("a");
    expect(await trailersFor(response)).toEqual({});
  });

  test("a reply of one header block carries its status as headers, and has no trailers", async () => {
    const { response } = await reply([
      head(
        [
          [":status", "200"],
          ["grpc-status", "5"],
          ["grpc-message", "gone"],
        ],
        end,
      ),
    ]);
    expect(response.headers).toEqual({ "grpc-status": "5", "grpc-message": "gone" });
    expect(await textOf(response)).toBe("");
    expect(await trailersFor(response)).toEqual({});
  });

  test("empty trailers end the stream", async () => {
    const { response } = await reply([cat(head200, data("a"), frameOf(HEADERS, end, 1))]);
    expect(await textOf(response)).toBe("a");
    expect(await trailersFor(response)).toEqual({});
  });

  test("refuses trailers that do not end the stream", async () => {
    const message = "the trailers do not end the stream";
    await bodyFailsWith([head200, head([["grpc-status", "0"]])], message);
    await bodyFailsWith([cat(head200, data("a"), head([["grpc-status", "0"]]), done)], message);
    // A second response head is no better.
    await bodyFailsWith([cat(head200, head200)], message);
    // Nor an interim response after the final one.
    await bodyFailsWith([cat(head200, head([[":status", "100"]]))], message);
  });

  test("the head and the trailers share one HPACK table", async () => {
    const { response } = await reply([
      // `:status: 200` from the static table, then a literal that is indexed.
      frameOf(HEADERS, END_HEADERS, 1, [0x88, 0x40, 3, ...text("x-k"), 1, ...text("v")]),
      // The entry it added, by index.
      frameOf(HEADERS, end, 1, [0xbe]),
    ]);
    expect(response.headers).toEqual({ "x-k": "v" });
    expect(await textOf(response)).toBe("");
    expect(await trailersFor(response)).toEqual({ "x-k": "v" });
  });

  test("an interim response's block counts toward the HPACK table", async () => {
    const { response } = await reply([
      frameOf(HEADERS, END_HEADERS, 1, [
        0x08,
        3,
        ...text("100"),
        0x40,
        3,
        ...text("x-k"),
        1,
        ...text("v"),
      ]),
      frameOf(HEADERS, end, 1, [0x88, 0xbe]),
    ]);
    expect(response.status).toBe(200);
    expect(response.headers).toEqual({ "x-k": "v" });
  });

  test("a header block that does not decode fails the request", async () => {
    const { cause } = await refused([frameOf(HEADERS, END_HEADERS, 1, [0x80])]);
    expect(cause).toBeInstanceOf(HpackError);
    expect(cause.message).toBe("no header at index 0");
    // A block cut short, over a CONTINUATION frame.
    const cut = await refused([
      cat(
        frameOf(HEADERS, 0, 1, [0x88, 0x40, 3]),
        frameOf(CONTINUATION, END_HEADERS, 1, text("x-")),
      ),
    ]);
    expect(cut.cause).toBeInstanceOf(HpackError);
  });

  test("trailers that do not decode fail the body", async () => {
    const { cause } = await bodyFailure([
      cat(head200, data("a")),
      frameOf(HEADERS, end, 1, [0xbe]),
    ]);
    expect(cause).toBeInstanceOf(HpackError);
    expect(cause.message).toBe("no header at index 62");
  });

  test.each([
    ["a name that is no token", ["x y", "1"]],
    ["an empty name", ["", "1"]],
    ["a value with a line break", ["x-a", "a\nb"]],
  ] as const)("a head with %s fails the request", async (_, field) => {
    const { cause } = await refused([head([[":status", "200"], field]), "hang"]);
    expect(cause).toBeInstanceOf(TypeError);
  });
});

describe("HTTP/2 on cloudflare:sockets: the connection", () => {
  test("stays open until the body ends, then is closed once", async () => {
    const { peer, response } = await reply([head200, data("a"), okTrailers]);
    expect(peer.closes).toBe(0);
    expect(await textOf(response)).toBe("a");
    expect(peer.closes).toBe(1);
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
    expect(peer.closes).toBe(1);
    expect(peer.reads).toBe(3);
  });

  test("is closed once the stream ends, before the body is read", async () => {
    const { peer, response } = await reply([cat(head200, data("a"), okTrailers), "hang"]);
    await vi.waitFor(() => expect(peer.closes).toBe(1));
    expect(peer.reads).toBe(1);
    expect(await textOf(response)).toBe("a");
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
    expect(peer.closes).toBe(1);
  });

  test("is closed when the body is let go, and the trailers settle empty", async () => {
    const { peer, response } = await reply([head200, data("abc"), "hang"]);
    const first = await Effect.runPromise(Stream.runHead(response.stream));
    expect(Option.getOrThrow(first)).toEqual(text("abc"));
    await vi.waitFor(() => expect(peer.closes).toBe(1));
    expect(await trailersFor(response)).toEqual({});
    expect(peer.closes).toBe(1);
  });

  test("the body streams as it arrives", async () => {
    const { peer, response } = await reply([head200, data("a"), data("b"), data("c", END_STREAM)]);
    const parts = await Effect.runPromise(Stream.runCollect(response.stream));
    expect(Array.from(parts, (part) => new TextDecoder().decode(part))).toEqual(["a", "b", "c"]);
    expect(peer.closes).toBe(1);
  });

  test("is closed when the request is interrupted before the head", async () => {
    const peer = new Peer(["hang"]);
    sockets.next = () => peer;
    const fiber = Effect.runFork(execute(getRequest()));
    await vi.waitFor(() => expect(peer.reads).toBe(1));
    expect(peer.closes).toBe(0);
    await Effect.runPromise(Fiber.interrupt(fiber));
    expect(peer.closes).toBe(1);
  });

  test("is closed when the request is interrupted while it waits to send", async () => {
    const peer = new Peer(["hang"]);
    sockets.next = () => peer;
    const fiber = Effect.runFork(execute(postRequest(70_000)));
    await vi.waitFor(() => expect(peer.reads).toBe(1));
    expect(dataOctets(peer)).toBe(65_535);
    await Effect.runPromise(Fiber.interrupt(fiber));
    expect(peer.closes).toBe(1);
  });

  test("is closed when the read of the body is interrupted", async () => {
    const peer = new Peer([head200, "hang"]);
    sockets.next = () => peer;
    const fiber = Effect.runFork(
      Effect.flatMap(execute(getRequest()), (response) => response.text),
    );
    await vi.waitFor(() => expect(peer.reads).toBe(2));
    expect(peer.closes).toBe(0);
    await Effect.runPromise(Fiber.interrupt(fiber));
    await vi.waitFor(() => expect(peer.closes).toBe(1));
  });

  test("a socket that fails to close does not fail the call", async () => {
    const { peer, response } = await reply([head200, cat(data("a"), okTrailers)], {
      closeRejects: true,
    });
    expect(await textOf(response)).toBe("a");
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
    expect(peer.closes).toBe(1);
    await refusedWith([rst(1, 8)], "the server reset the stream (HTTP/2 error 8)", {
      closeRejects: true,
    });
    await bodyFailsWith([head200, "close"], "connection closed before the response ended", {
      closeRejects: true,
    });
  });

  test("a reset after the head, while the request body waits, fails the body", async () => {
    const peer = await bodyFailsWith(
      [head200, rst(1, 8)],
      "the server reset the stream (HTTP/2 error 8)",
      {
        request: postRequest(70_000),
      },
    );
    expect(dataOctets(peer)).toBe(65_535);
  });

  test.each([
    ["the opening write", () => getRequest(), [done], 0],
    ["a DATA frame", () => postRequest(5), [done], 1],
    ["a later DATA frame", () => postRequest(40_000), [done], 2],
    ["the SETTINGS acknowledgement", () => getRequest(), [cat(settingsOf(), done)], 1],
    ["a PING acknowledgement", () => getRequest(), [cat(ping(), done)], 1],
    [
      "a window handed back in the read with the head",
      () => getRequest(),
      [cat(head200, d16, d16, d16, d16, data("a", END_STREAM))],
      1,
    ],
  ] as const)("a failed write of %s fails the request", async (_, request, script, failWrite) => {
    const peer = await refusedWith(script, "write refused", { request: request(), failWrite });
    expect(peer.writes.length).toBe(failWrite);
  });

  test.each([
    ["a PING acknowledgement", [head200, cat(ping(), data("a", END_STREAM))]],
    ["the SETTINGS acknowledgement", [head200, cat(settingsOf(), data("a", END_STREAM))]],
    ["a window handed back", [head200, cat(d16, d16, d16, d16, data("a", END_STREAM))]],
  ] as const)("a failed write of %s after the head fails the body", async (_, script) => {
    const peer = await bodyFailsWith(script, "write refused", { failWrite: 1 });
    expect(peer.writes.length).toBe(1);
  });
});

describe("a gRPC transport's response", () => {
  const request = () => HttpClientRequest.get("http://grpc.test/svc/Call");
  /** A body that counts how often it is let go. */
  const body = (cancel?: () => Promise<void>) => {
    const seen = { cancels: 0, pulls: 0 };
    const stream = new ReadableStream<Uint8Array>(
      {
        pull: (controller) => {
          seen.pulls++;
          controller.enqueue(text("abc"));
          controller.close();
        },
        cancel: () => {
          seen.cancels++;
          return cancel?.();
        },
      },
      { highWaterMark: 0 },
    );
    return { stream, seen };
  };
  const none = Promise.resolve({});

  test.each([
    [199, false],
    [200, true],
    [204, true],
    [404, true],
    [599, true],
    [600, false],
    [100, false],
    [0, false],
    [-200, false],
    [200.5, false],
    [Number.NaN, false],
    [Number.POSITIVE_INFINITY, false],
  ] as const)("%d is a response status: %s", (status, expected) => {
    expect(isResponseStatus(status)).toBe(expected);
  });

  test("has the status, the headers, the body and the request", async () => {
    const sent = request();
    const { stream, seen } = body();
    const response = respond(sent, {
      status: 418,
      headers: { "x-a": "1", "content-type": "application/grpc" },
      body: stream,
      trailers: Promise.resolve({ "grpc-status": "0" }),
    });
    expect(response.status).toBe(418);
    expect(response.headers).toEqual({ "x-a": "1", "content-type": "application/grpc" });
    expect(response.request).toBe(sent);
    // The body is not read until it is asked for.
    expect(seen.pulls).toBe(0);
    expect(await textOf(response)).toBe("abc");
    expect(seen.cancels).toBe(0);
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
  });

  test.each([204, 205, 304])("a %i lets the body go and has none", async (status) => {
    const { stream, seen } = body();
    const response = respond(request(), {
      status,
      headers: { "x-a": "1" },
      body: stream,
      trailers: Promise.resolve({ "x-t": "1" }),
    });
    expect(response.status).toBe(status);
    expect(response.headers).toEqual({ "x-a": "1" });
    expect(seen).toEqual({ cancels: 1, pulls: 0 });
    expect(await textOf(response)).toBe("");
    expect(seen).toEqual({ cancels: 1, pulls: 0 });
    expect(await trailersFor(response)).toEqual({ "x-t": "1" });
  });

  test("a body that fails to be let go does not fail the response", async () => {
    const { stream, seen } = body(() => Promise.reject(new Error("cancel refused")));
    const response = respond(request(), { status: 204, headers: {}, body: stream, trailers: none });
    expect(response.status).toBe(204);
    expect(seen.cancels).toBe(1);
    expect(await textOf(response)).toBe("");
  });

  test.each([200, 201, 203, 206, 300, 303, 305, 404, 500])(
    "a %i keeps its body",
    async (status) => {
      const { stream, seen } = body();
      const response = respond(request(), { status, headers: {}, body: stream, trailers: none });
      expect(await textOf(response)).toBe("abc");
      expect(seen.cancels).toBe(0);
    },
  );

  test("throws for a head `Response` refuses, which the transport reports", () => {
    const heads: ReadonlyArray<{ status: number; headers: Record<string, string> }> = [
      { status: 200, headers: { "x y": "1" } },
      { status: 200, headers: { "x-a": "a\nb" } },
      { status: 199, headers: {} },
      { status: 600, headers: {} },
    ];
    for (const reply of heads) {
      const { stream } = body();
      expect(() => respond(request(), { ...reply, body: stream, trailers: none })).toThrow();
    }
  });

  test("its trailers always arrive unless the transport says otherwise", () => {
    const reliable = (reliableTrailers?: boolean) =>
      hasTrailers(
        respond(request(), {
          status: 200,
          headers: {},
          body: body().stream,
          trailers: none,
          ...(reliableTrailers === undefined ? {} : { reliableTrailers }),
        }),
      );
    expect(reliable()).toBe(true);
    expect(reliable(true)).toBe(true);
    expect(reliable(false)).toBe(false);
  });

  test("unreliable trailers are still read", async () => {
    const response = respond(request(), {
      status: 200,
      headers: {},
      body: body().stream,
      trailers: Promise.resolve({ "grpc-status": "0" }),
      reliableTrailers: false,
    });
    expect(await trailersFor(response)).toEqual({ "grpc-status": "0" });
  });

  test("a response no transport built has no trailers", async () => {
    const response = HttpClientResponse.fromWeb(request(), new Response("x"));
    expect(hasTrailers(response)).toBe(false);
    expect(await trailersFor(response)).toEqual({});
  });

  test("trailers that fail are no trailers", async () => {
    const response = respond(request(), {
      status: 200,
      headers: {},
      body: body().stream,
      trailers: Promise.reject(new Error("no trailers")),
    });
    expect(hasTrailers(response)).toBe(true);
    expect(await trailersFor(response)).toEqual({});
    // Asked again, the answer is the same.
    expect(await trailersFor(response)).toEqual({});
  });

  test("trailers wait for the transport to settle them", async () => {
    let settle!: (trailers: Record<string, string>) => void;
    const response = respond(request(), {
      status: 200,
      headers: {},
      body: body().stream,
      trailers: new Promise((resolve) => (settle = resolve)),
    });
    let read: unknown;
    const pending = trailersFor(response).then((trailers) => (read = trailers));
    await new Promise((resolve) => setTimeout(resolve, 5));
    expect(read).toBeUndefined();
    settle({ "grpc-status": "0" });
    await pending;
    expect(read).toEqual({ "grpc-status": "0" });
  });

  test("trailers belong to the request they answer", async () => {
    const first = respond(request(), {
      status: 200,
      headers: {},
      body: body().stream,
      trailers: Promise.resolve({ n: "1" }),
    });
    const second = respond(request(), {
      status: 200,
      headers: {},
      body: body().stream,
      trailers: Promise.resolve({ n: "2" }),
      reliableTrailers: false,
    });
    expect(await trailersFor(first)).toEqual({ n: "1" });
    expect(await trailersFor(second)).toEqual({ n: "2" });
    expect(hasTrailers(first)).toBe(true);
    expect(hasTrailers(second)).toBe(false);
  });

  test("a request answered again has the later answer's trailers", async () => {
    const sent = request();
    const first = respond(sent, {
      status: 200,
      headers: {},
      body: body().stream,
      trailers: Promise.resolve({ n: "1" }),
    });
    respond(sent, {
      status: 200,
      headers: {},
      body: body().stream,
      trailers: Promise.resolve({ n: "2" }),
    });
    expect(await trailersFor(first)).toEqual({ n: "2" });
  });
});

describe("the gRPC transport in scope", () => {
  const inScope = Effect.gen(function* () {
    return yield* GrpcTransport;
  });

  test("is the caller's HttpClient unless one is provided", async () => {
    expect(await Effect.runPromise(inScope)).toBeUndefined();
  });

  test("is the HTTP/2 client under its layer", async () => {
    const transport = await Effect.runPromise(inScope.pipe(Effect.provide(CloudflareHttp2.layer)));
    expect(transport).toBe(CloudflareHttp2.client);
  });

  test("a call under the layer goes through the socket, not the caller's HttpClient", async () => {
    const reply = frame(encodeMessage(descriptors, "test.Reply", { index: 9 }));
    const peer = new Peer([
      cat(
        head([
          [":status", "200"],
          ["content-type", "application/grpc"],
        ]),
        data(reply),
        okTrailers,
      ),
    ]);
    sockets.next = () => peer;
    const result = await Effect.runPromise(
      Effect.result(
        Effect.provide(
          get({ count: 2 }),
          Layer.mergeAll(
            Layer.succeed(Endpoint, { url: "https://grpc.test:8443", headers: { "x-k": "v" } }),
            CloudflareHttp2.layer,
            // A caller's client that would fail the call if it were used.
            Layer.succeed(
              HttpClient.HttpClient,
              HttpClient.make(() => Effect.die("the caller's HttpClient was used")),
            ),
          ),
        ) as Effect.Effect<Reply, unknown, never>,
      ),
    );
    if (!Result.isSuccess(result)) throw new Error(`the call failed: ${String(result.failure)}`);
    expect(result.success.index).toBe(9);
    expect(sockets.calls).toEqual([
      {
        address: { hostname: "grpc.test", port: 8443 },
        options: { secureTransport: "on", allowHalfOpen: false },
      },
    ]);
    const fields = Object.fromEntries(requestFields(peer));
    expect(fields).toMatchObject({
      ":method": "POST",
      ":scheme": "https",
      ":path": "/test.Svc/Get",
      ":authority": "grpc.test:8443",
      "x-k": "v",
      te: "trailers",
    });
    expect(fields["content-type"]).toContain("application/grpc");
    // The request is one gRPC frame of the message.
    const [message] = unframe(cat(...dataFrames(peer).map((f) => f.payload)));
    expect(decodeMessage(descriptors, "test.Req", message!)).toMatchObject({ count: 2 });
    expect(dataFrames(peer).at(-1)!.flags).toBe(END_STREAM);
    expect(peer.closes).toBe(1);
  });
});
