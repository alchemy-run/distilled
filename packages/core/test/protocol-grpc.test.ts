import * as http from "node:http";
import * as http2 from "node:http2";
import type { AddressInfo } from "node:net";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import * as API from "../src/api.ts";
import * as NodeHttp2 from "../src/grpc-transport-node-http2.ts";
import {
  decodeMessage,
  encodeMessage,
  frame,
  unframe,
  type ProtoDescriptors,
} from "../src/protobuf.ts";
import { Deadline, makeGrpcProtocol } from "../src/protocol-grpc.ts";
import * as S from "../src/schema.ts";
import * as T from "../src/trait.ts";

// =============================================================================
// An echo service, served by node:http2 (h2c) and node:http (HTTP/1.1)
// =============================================================================

const descriptors: ProtoDescriptors = {
  messages: {
    "test.EchoRequest": [
      [1, "text", "string"],
      [2, "count", "int32"],
    ],
    "test.EchoReply": [
      [1, "text", "string"],
      [2, "index", "int32"],
      [3, "tags", "string", 0, 1],
      [4, "note", "string", 0, 0, 1],
    ],
  },
  enums: {},
  methods: {
    "/test.Echo/Say": ["test.EchoRequest", "test.EchoReply"],
    "/test.Echo/Count": ["test.EchoRequest", "test.EchoReply", 1],
  },
};

type Request = { text: string; count: number };

/** How the server answers one call. */
type Script = (
  request: Request,
  send: {
    readonly message: (reply: Record<string, unknown>) => void;
    readonly end: (status: number, message?: string) => void;
    /** A trailers-only reply: the status in the headers, no body. */
    readonly fail: (status: number, message: string) => void;
  },
) => void | Promise<void>;

const scripts: Record<string, Script> = {
  "/test.Echo/Say": (request, send) => {
    if (request.text === "missing") return send.fail(5, "Thing 'missing' not found");
    if (request.text === "late-error") return send.end(9, "precondition%20failed");
    if (request.text === "hang") return;
    // An empty text is left off the wire: the client reads it as "".
    send.message(
      request.text === "" ? { index: 1 } : { text: request.text.toUpperCase(), index: 1 },
    );
    send.end(0);
  },
  "/test.Echo/Count": async (request, send) => {
    for (let i = 1; i <= request.count; i++) {
      send.message({ text: request.text, index: i });
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    if (request.text === "boom") return send.end(13, "stream broke");
    send.end(0);
  },
};

const seen: Array<{ path: string; headers: Record<string, unknown> }> = [];

const h2Server = http2.createServer();
h2Server.on("stream", (stream: http2.ServerHttp2Stream, headers) => {
  const path = String(headers[":path"]);
  seen.push({ path, headers: { ...headers } });
  const chunks: Buffer[] = [];
  stream.on("data", (chunk: Buffer) => chunks.push(chunk));
  stream.on("end", () => {
    const [payload] = unframe(new Uint8Array(Buffer.concat(chunks)));
    const request = decodeMessage(descriptors, "test.EchoRequest", payload!) as Request;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      stream.respond(
        { ":status": 200, "content-type": "application/grpc" },
        { waitForTrailers: true },
      );
    };
    void scripts[path]!(request, {
      message: (reply) => {
        start();
        if (!stream.destroyed)
          stream.write(frame(encodeMessage(descriptors, "test.EchoReply", reply)));
      },
      end: (status, message) => {
        start();
        stream.once("wantTrailers", () =>
          stream.sendTrailers({
            "grpc-status": String(status),
            ...(message ? { "grpc-message": message } : {}),
          }),
        );
        if (!stream.destroyed) stream.end();
      },
      fail: (status, message) => {
        stream.respond(
          {
            ":status": 200,
            "content-type": "application/grpc",
            "grpc-status": String(status),
            "grpc-message": message,
          },
          { endStream: true },
        );
      },
    });
  });
  stream.on("error", () => undefined);
});

/** HTTP/1.1, as a bridging proxy answers `fetch`: status in the headers, no trailers. */
const h1Server = http.createServer((req, res) => {
  const chunks: Buffer[] = [];
  req.on("data", (chunk: Buffer) => chunks.push(chunk));
  req.on("end", () => {
    const [payload] = unframe(new Uint8Array(Buffer.concat(chunks)));
    const request = decodeMessage(descriptors, "test.EchoRequest", payload!) as Request;
    if (request.text === "missing") {
      res.writeHead(200, {
        "content-type": "application/grpc",
        "grpc-status": "5",
        "grpc-message": "Thing 'missing' not found",
      });
      return res.end();
    }
    res.writeHead(200, { "content-type": "application/grpc" });
    res.end(
      frame(
        encodeMessage(descriptors, "test.EchoReply", {
          text: request.text.toUpperCase(),
          index: 1,
        }),
      ),
    );
  });
});

let h2Url = "";
let h1Url = "";

beforeAll(async () => {
  await new Promise<void>((resolve) => h2Server.listen(0, "127.0.0.1", resolve));
  await new Promise<void>((resolve) => h1Server.listen(0, "127.0.0.1", resolve));
  h2Url = `http://127.0.0.1:${(h2Server.address() as AddressInfo).port}`;
  h1Url = `http://127.0.0.1:${(h1Server.address() as AddressInfo).port}`;
});

afterAll(async () => {
  await new Promise((resolve) => h2Server.close(resolve));
  await new Promise((resolve) => h1Server.close(resolve));
});

// =============================================================================
// Operations
// =============================================================================

class Endpoint extends Context.Service<Endpoint, { readonly url: string }>()("GrpcTest/Endpoint") {}

class TestUnknownError extends Schema.TaggedError<TestUnknownError>()("TestUnknownError", {
  info: Schema.Unknown,
}) {}

class TestParseError extends Schema.TaggedError<TestParseError>()("TestParseError", {
  info: Schema.Unknown,
}) {}

class ThingNotFound extends T.applyErrorMatchers(
  Schema.TaggedError<ThingNotFound>()("ThingNotFound", { message: Schema.String }),
  [{ code: 5 }],
) {}

class PreconditionFailed extends T.applyErrorMatchers(
  Schema.TaggedError<PreconditionFailed>()("PreconditionFailed", { message: Schema.String }),
  [{ code: 9 }],
) {}

const Protocol = makeGrpcProtocol({
  descriptors,
  credentials: Effect.gen(function* () {
    return yield* Endpoint;
  }),
  baseUrl: (endpoint) => endpoint.url,
  headers: () => ({ "x-test": "1" }),
  unknownError: (info) => new TestUnknownError({ info }),
  parseError: (info) => new TestParseError({ info }),
});

const Reply = S.Struct({
  text: S.String,
  index: S.Number,
  tags: S.Array(S.String),
  note: S.optional(S.String),
});

const EchoInput = (uri: string) =>
  S.Struct({ text: S.String, count: S.optional(S.Number) }).pipe(T.Http({ method: "POST", uri }));

interface EchoRequest {
  readonly text: string;
  readonly count?: number;
}

interface EchoReply {
  readonly text: string;
  readonly index: number;
  readonly tags: ReadonlyArray<string>;
  readonly note?: string;
}

// Generated SDKs annotate each operation's type the same way.
const say: API.OperationMethod<EchoRequest, EchoReply, any, Endpoint> = API.make(() => ({
  input: EchoInput("/test.Echo/Say"),
  output: Reply,
  errors: [ThingNotFound, PreconditionFailed] as const,
  protocol: Protocol,
})) as any;

const count: API.StreamingOperationMethod<
  EchoRequest,
  { readonly items: ReadonlyArray<EchoReply> },
  any,
  Endpoint
> = API.makeStreaming(() => ({
  input: EchoInput("/test.Echo/Count"),
  output: S.Struct({ items: S.Array(Reply) }),
  errors: [] as const,
  protocol: Protocol,
})) as any;

const overHttp2 = () =>
  Layer.mergeAll(Layer.succeed(Endpoint, { url: h2Url }), NodeHttp2.layer, FetchHttpClient.layer);
const overFetch = () =>
  Layer.mergeAll(Layer.succeed(Endpoint, { url: h1Url }), FetchHttpClient.layer);

const run = <A, E>(effect: Effect.Effect<A, E, any>, layer: Layer.Layer<any>) =>
  Effect.runPromise(
    Effect.result(Effect.provide(effect, layer)) as Effect.Effect<any, never, never>,
  );

const succeed = async <A>(effect: Effect.Effect<A, any, any>, layer: Layer.Layer<any>) => {
  const result = await run(effect, layer);
  if (result._tag !== "Success") throw new Error(`expected success, got ${String(result.failure)}`);
  return result.success as A;
};

const fail = async (effect: Effect.Effect<any, any, any>, layer: Layer.Layer<any>) => {
  const result = await run(effect, layer);
  if (result._tag !== "Failure") throw new Error("expected failure");
  return result.failure as any;
};

// =============================================================================
// Tests
// =============================================================================

describe("gRPC over node:http2", () => {
  test("sends one protobuf frame and decodes the reply, with proto3 defaults", async () => {
    expect(await succeed(say({ text: "hello" }), overHttp2())).toEqual({
      text: "HELLO",
      index: 1,
      tags: [],
    });
    expect(await succeed(say({ text: "" }), overHttp2())).toEqual({ text: "", index: 1, tags: [] });
    const call = seen.find((s) => s.path === "/test.Echo/Say")!;
    expect(call.headers["content-type"]).toBe("application/grpc");
    expect(call.headers.te).toBe("trailers");
    expect(call.headers["x-test"]).toBe("1");
  });

  test("a status in the trailers is the operation's typed error", async () => {
    const error = await fail(say({ text: "late-error" }), overHttp2());
    expect(error._tag).toBe("PreconditionFailed");
    expect(error.message).toBe("precondition failed");
  });

  test("a trailers-only reply is the operation's typed error", async () => {
    const error = await fail(say({ text: "missing" }), overHttp2());
    expect(error._tag).toBe("ThingNotFound");
    expect(error.message).toBe("Thing 'missing' not found");
  });

  test("calling a server-streaming operation collects every message", async () => {
    const reply = await succeed(count({ text: "n", count: 3 }), overHttp2());
    expect(reply.items.map((item) => item.index)).toEqual([1, 2, 3]);
  });

  test(".stream emits each message as it arrives", async () => {
    const started = Date.now();
    const arrivals: number[] = [];
    const items = await succeed(
      count.stream({ text: "n", count: 4 }).pipe(
        Stream.tap(() => Effect.sync(() => arrivals.push(Date.now() - started))),
        Stream.runCollect,
      ),
      overHttp2(),
    );
    expect(Array.from(items).map((item) => item.index)).toEqual([1, 2, 3, 4]);
    // The first message arrives before the server has sent the last one.
    expect(arrivals[0]!).toBeLessThan(arrivals[3]! - 30);
  });

  test("taking part of a stream cancels the call", async () => {
    const items = await succeed(
      count.stream({ text: "n", count: 50 }).pipe(Stream.take(2), Stream.runCollect),
      overHttp2(),
    );
    expect(Array.from(items).map((item) => item.index)).toEqual([1, 2]);
  });

  test("a stream that ends with an error status fails after its messages", async () => {
    const received: number[] = [];
    const error = await fail(
      count
        .stream({ text: "boom", count: 2 })
        .pipe(Stream.runForEach((item) => Effect.sync(() => received.push(item.index)))),
      overHttp2(),
    );
    expect(received).toEqual([1, 2]);
    // INTERNAL maps to HTTP 500, which core classifies.
    expect(error._tag).toBe("InternalServerError");
    expect(error.message).toBe("stream broke");
  });

  test("the deadline is sent as grpc-timeout and enforced", async () => {
    const error = await fail(
      say({ text: "hang" }).pipe(Effect.provideService(Deadline, "200 millis")),
      overHttp2(),
    );
    // DEADLINE_EXCEEDED maps to HTTP 504.
    expect(error._tag).toBe("GatewayTimeout");
    const call = seen.findLast((s) => s.path === "/test.Echo/Say")!;
    expect(call.headers["grpc-timeout"]).toBe("200m");
  });

  test("a call bound with yield* keeps .stream", async () => {
    const items = await succeed(
      Effect.gen(function* () {
        const bound = yield* count;
        return yield* Stream.runCollect(bound.stream({ text: "n", count: 2 }));
      }),
      overHttp2(),
    );
    expect(Array.from(items)).toHaveLength(2);
  });
});

describe("gRPC over the caller's HttpClient (HTTP/1.1, no trailers)", () => {
  test("decodes a reply whose status the transport can't see", async () => {
    expect(await succeed(say({ text: "hi" }), overFetch())).toEqual({
      text: "HI",
      index: 1,
      tags: [],
    });
  });

  test("reads a status the proxy put in the headers", async () => {
    const error = await fail(say({ text: "missing" }), overFetch());
    expect(error._tag).toBe("ThingNotFound");
  });
});
