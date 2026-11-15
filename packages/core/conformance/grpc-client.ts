import { readFileSync } from "node:fs";
import { join } from "node:path";
/**
 * The gRPC client under test for the Connect conformance suite.
 *
 * `connectconformance --mode client` starts this process and sends it
 * `ClientCompatRequest`s on stdin, each a big-endian u32 length and the
 * message. For each one this makes the RPC through the code under test --
 * `API.make` / `API.makeStreaming` operations over `makeGrpcProtocol`, sent
 * with the `node:http2` transport -- and writes back a `ClientCompatResponse`
 * the same way. Messages are encoded with core's protobuf codec, using
 * descriptors the proto converter builds from the suite's `.proto` files.
 *
 * Supported (see grpc-client.yaml): the gRPC protocol over HTTP/2 cleartext,
 * the proto codec, no compression, unary and server-streaming RPCs.
 */
import * as Cause from "effect/Cause";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { parseProto, protoDescriptors } from "../../dev/src/codegen/proto.ts";
import * as API from "../src/api.ts";
import * as NodeHttp2 from "../src/grpc-transport-node-http2.ts";
import { GrpcTransport, trailersOf } from "../src/grpc-transport.ts";
import { decodeMessage, encodeMessage, type ProtoDescriptors } from "../src/protobuf.ts";
import { Deadline, GRPC_STATUS_NAMES, makeGrpcProtocol } from "../src/protocol-grpc.ts";
import * as S from "../src/schema.ts";
import * as T from "../src/trait.ts";

const HERE = import.meta.dirname;
const PROTO = join(HERE, "connect/proto/connectrpc/conformance/v1");
const WKT = join(HERE, "protobuf/src/google/protobuf");
const files = [
  ...["config", "service", "client_compat"].map((name) => join(PROTO, `${name}.proto`)),
  ...["any", "empty", "struct"].map((name) => join(WKT, `${name}.proto`)),
].map((path) => parseProto(readFileSync(path, "utf8"), path));

const d = protoDescriptors(files, { collectServerStreams: true }) as unknown as ProtoDescriptors;

const PKG = "connectrpc.conformance.v1";
const SERVICE = `${PKG}.ConformanceService`;

// =============================================================================
// Operations over the protocol under test
// =============================================================================

/** Where one RPC goes, and the metadata it sends. */
class Target extends Context.Service<
  Target,
  { readonly url: string; readonly headers: Record<string, string> }
>()("Conformance/Target") {}

/** Any non-OK status, as the protocol surfaces it. */
class RpcError extends Schema.TaggedError<RpcError>()("RpcError", {
  info: Schema.Unknown,
}) {}

const Protocol = makeGrpcProtocol({
  descriptors: d,
  credentials: Effect.gen(function* () {
    return yield* Target;
  }),
  baseUrl: (target) => target.url,
  headers: (target) => target.headers,
  // Report each status by its gRPC code, not the HTTP class it maps to.
  statusError: (info) => new RpcError({ info }),
  unknownError: (info) => new RpcError({ info }),
  parseError: (info) => new RpcError({ info: { code: 2, message: String(info.cause) } }),
});

const request = (method: string) =>
  S.Struct({
    responseDefinition: S.optional(S.Unknown),
    requestData: S.optional(S.Unknown),
  }).pipe(T.Http({ method: "POST", uri: `/${SERVICE}/${method}` }));

const unary = (method: string) =>
  API.make(() => ({
    input: request(method),
    output: S.Struct({ payload: S.optional(S.Unknown) }),
    errors: [] as const,
    protocol: Protocol,
  })) as unknown as (input: unknown) => Effect.Effect<{ payload?: unknown }, unknown, Target>;

const serverStream = API.makeStreaming(() => ({
  input: request("ServerStream"),
  output: S.Struct({ items: S.Array(S.Struct({ payload: S.optional(S.Unknown) })) }),
  errors: [] as const,
  protocol: Protocol,
})) as unknown as {
  readonly stream: (input: unknown) => Stream.Stream<{ payload?: unknown }, unknown, Target>;
};

const UNARY: Record<
  string,
  (input: unknown) => Effect.Effect<{ payload?: unknown }, unknown, Target>
> = {
  Unary: unary("Unary"),
  IdempotentUnary: unary("IdempotentUnary"),
  Unimplemented: unary("Unimplemented"),
};

// =============================================================================
// One ClientCompatRequest
// =============================================================================

interface Header {
  readonly name: string;
  readonly value: ReadonlyArray<string>;
}

interface CompatRequest {
  readonly testName: string;
  readonly host: string;
  readonly port: number;
  readonly method?: string;
  readonly requestHeaders: ReadonlyArray<Header>;
  readonly requestMessages: ReadonlyArray<Readonly<Record<string, unknown>>>;
  readonly timeoutMs?: number;
  readonly cancel?: { readonly afterCloseSendMs?: number; readonly afterNumResponses?: number };
}

const headerList = (headers: Readonly<Record<string, string | undefined>>): Header[] =>
  Object.entries(headers).flatMap(([name, value]) =>
    value === undefined || name.startsWith(":") ? [] : [{ name, value: [value] }],
  );

/** The message inside an `Any`: its proto3 JSON carries the fields inline. */
const unpack = (any: Readonly<Record<string, unknown>>): unknown => {
  const { "@type": _type, ...message } = any;
  return message;
};

/** An error as `connectrpc.conformance.v1.Error`. */
/** A detail `Any` the protocol left opaque, re-read with the suite's descriptors. */
const detailOf = (detail: unknown): unknown => {
  const any = detail as { readonly "@type": string; readonly value?: string };
  const type = any["@type"].slice(any["@type"].lastIndexOf("/") + 1);
  if (d.messages[type] === undefined || typeof any.value !== "string") return detail;
  const message = decodeMessage(d, type, Buffer.from(any.value, "base64"));
  return { "@type": any["@type"], ...(message as Record<string, unknown>) };
};

const errorOf = (cause: unknown) => {
  const info =
    typeof cause === "object" && cause !== null && "info" in cause
      ? (cause as { info: { code?: unknown; message?: unknown; details?: unknown } }).info
      : { code: 2, message: String(cause) };
  const code = Number(info.code ?? 2);
  return {
    code: `CODE_${GRPC_STATUS_NAMES[code] === "CANCELLED" ? "CANCELED" : (GRPC_STATUS_NAMES[code] ?? "UNKNOWN")}`,
    message: typeof info.message === "string" ? info.message : undefined,
    details: Array.isArray(info.details) ? info.details.map(detailOf) : [],
  };
};

const CANCELED = { code: "CODE_CANCELED", message: "canceled by the client" };

const run = Effect.fn(function* (req: CompatRequest) {
  const headers: Record<string, string> = {};
  for (const h of req.requestHeaders) headers[h.name.toLowerCase()] = h.value.join(", ");
  const input = req.requestMessages[0] ? unpack(req.requestMessages[0]) : {};

  // Record the reply's headers and trailers as the transport sees them.
  let response: HttpClientResponse.HttpClientResponse | undefined;
  const recording = HttpClient.transformResponse(NodeHttp2.client, (effect) =>
    Effect.tap(effect, (r) => Effect.sync(() => void (response = r))),
  );
  const context = Layer.mergeAll(
    Layer.succeed(Target, { url: `http://${req.host}:${req.port}`, headers }),
    Layer.succeed(GrpcTransport, recording),
    FetchHttpClient.layer,
    Layer.succeed(Deadline, req.timeoutMs),
  );

  const payloads: unknown[] = [];
  let error: { code: string; message?: string } | undefined;
  const method = req.method ?? "";
  const call =
    method === "ServerStream"
      ? serverStream.stream(input).pipe(
          req.cancel?.afterNumResponses !== undefined
            ? Stream.take(req.cancel.afterNumResponses)
            : (s) => s,
          Stream.runForEach((item) => Effect.sync(() => void payloads.push(item.payload))),
          Effect.tap(() =>
            Effect.sync(() => {
              if (req.cancel?.afterNumResponses !== undefined) error = CANCELED;
            }),
          ),
        )
      : UNARY[method]
        ? Effect.map(UNARY[method]!(input), (out) => void payloads.push(out.payload))
        : Effect.fail({ info: { code: 12, message: `unsupported method ${method}` } });
  const bounded =
    req.cancel?.afterCloseSendMs !== undefined
      ? Effect.raceFirst(
          call,
          Effect.andThen(Effect.sleep(req.cancel.afterCloseSendMs), () =>
            Effect.sync(() => void (error = CANCELED)),
          ),
        )
      : call;
  const exit = yield* Effect.exit(Effect.provide(bounded, context));
  if (Exit.isFailure(exit) && error === undefined) {
    const failure = Cause.findErrorOption(exit.cause);
    error = errorOf(failure._tag === "Some" ? failure.value : Cause.pretty(exit.cause));
  }
  const trailers = response ? yield* trailersOf(response) : {};
  return {
    testName: req.testName,
    response: {
      responseHeaders: response ? headerList(response.headers) : [],
      payloads,
      error,
      responseTrailers: headerList(trailers),
    },
  };
});

// =============================================================================
// stdin / stdout
// =============================================================================

const write = (message: unknown) => {
  const out = encodeMessage(d, `${PKG}.ClientCompatResponse`, message);
  const header = Buffer.alloc(4);
  header.writeUInt32BE(out.length, 0);
  process.stdout.write(Buffer.concat([header, out]));
};

const pending = new Set<Promise<void>>();
let buffer = Buffer.alloc(0);
process.stdin.on("data", (chunk: Buffer) => {
  buffer = Buffer.concat([buffer, chunk]);
  while (buffer.length >= 4) {
    const length = buffer.readUInt32BE(0);
    if (buffer.length < 4 + length) break;
    const req = decodeMessage(
      d,
      `${PKG}.ClientCompatRequest`,
      buffer.subarray(4, 4 + length),
    ) as CompatRequest;
    buffer = buffer.subarray(4 + length);
    const done = Effect.runPromise(run(req)).then(write, (cause) =>
      write({ testName: req.testName, error: { message: String(cause) } }),
    );
    pending.add(done);
    void done.finally(() => pending.delete(done));
  }
});
process.stdin.on("end", () => {
  void Promise.all(pending).then(() => process.exit(0));
});
process.on("SIGTERM", () => process.exit(0));
