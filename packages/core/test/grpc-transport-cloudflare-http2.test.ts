import * as http2 from "node:http2";
import type { AddressInfo } from "node:net";
import * as net from "node:net";
import { Readable, Writable } from "node:stream";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import * as API from "../src/api.ts";
import * as CloudflareHttp2 from "../src/grpc-transport-cloudflare-http2.ts";
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

// workerd's `cloudflare:sockets`, over a plain TCP socket.
vi.mock("cloudflare:sockets", () => ({
  connect: (address: { hostname: string; port: number }) => {
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
