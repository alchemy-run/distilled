import * as http from "node:http";
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
import * as CloudflareSockets from "../src/grpc-transport-cloudflare-sockets.ts";
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
    "test.Req": [[1, "count", "int32"]],
    "test.Reply": [[1, "index", "int32"]],
  },
  enums: {},
  methods: {
    "/test.Svc/Count": ["test.Req", "test.Reply", 1],
    "/test.Svc/Get": ["test.Req", "test.Reply"],
  },
};

/** Chunked replies with the status in trailers, each frame split across writes. */
const server = http.createServer((req, res) => {
  const chunks: Buffer[] = [];
  req.on("data", (chunk: Buffer) => chunks.push(chunk));
  req.on("end", async () => {
    const [payload] = unframe(new Uint8Array(Buffer.concat(chunks)));
    const { count } = decodeMessage(descriptors, "test.Req", payload!) as { count: number };
    res.writeHead(200, {
      "content-type": "application/grpc",
      trailer: "grpc-status, grpc-message",
    });
    for (let i = 1; i <= Math.max(count, 1); i++) {
      const bytes = frame(encodeMessage(descriptors, "test.Reply", { index: i }));
      res.write(bytes.subarray(0, 3));
      await new Promise((resolve) => setTimeout(resolve, 5));
      res.write(bytes.subarray(3));
    }
    res.addTrailers(
      count === 7 ? { "grpc-status": "5", "grpc-message": "gone" } : { "grpc-status": "0" },
    );
    res.end();
  });
});

let url = "";
beforeAll(async () => {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  url = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterAll(() => new Promise((resolve) => server.close(resolve)));

class Endpoint extends Context.Service<Endpoint, { readonly url: string }>()(
  "SocketsTest/Endpoint",
) {}

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
  headers: () => ({}),
  unknownError: (info) => new Error(JSON.stringify(info)),
  parseError: (info) => new Error(String(info.cause)),
});

const Reply = S.Struct({ index: S.Number });

const get: API.OperationMethod<{ count: number }, { index: number }, any, Endpoint> = API.make(
  () => ({
    input: S.Struct({ count: S.Number }).pipe(T.Http({ method: "POST", uri: "/test.Svc/Get" })),
    output: Reply,
    errors: [Gone] as const,
    protocol: Protocol,
  }),
) as any;

const count: API.StreamingOperationMethod<
  { count: number },
  { readonly items: ReadonlyArray<{ index: number }> },
  any,
  Endpoint
> = API.makeStreaming(() => ({
  input: S.Struct({ count: S.Number }).pipe(T.Http({ method: "POST", uri: "/test.Svc/Count" })),
  output: S.Struct({ items: S.Array(Reply) }),
  errors: [Gone] as const,
  protocol: Protocol,
})) as any;

const layer = () =>
  Layer.mergeAll(Layer.succeed(Endpoint, { url }), CloudflareSockets.layer, FetchHttpClient.layer);

const run = <A, E>(effect: Effect.Effect<A, E, any>) =>
  Effect.runPromise(
    Effect.result(Effect.provide(effect, layer())) as Effect.Effect<any, never, never>,
  );

describe("gRPC over cloudflare:sockets", () => {
  test("reads a chunked reply and its trailers", async () => {
    const result = await run(get({ count: 1 }));
    expect(result._tag).toBe("Success");
    expect(result.success).toEqual({ index: 1 });
  });

  test("a status in the chunked trailers is the operation's typed error", async () => {
    const result = await run(get({ count: 7 }));
    expect(result._tag).toBe("Failure");
    expect(result.failure._tag).toBe("Gone");
    expect(result.failure.message).toBe("gone");
  });

  test("streams messages split across chunks", async () => {
    const result = await run(Stream.runCollect(count.stream({ count: 4 })));
    expect(result._tag).toBe("Success");
    expect(Array.from(result.success as Iterable<{ index: number }>).map((r) => r.index)).toEqual([
      1, 2, 3, 4,
    ]);
  });
});
