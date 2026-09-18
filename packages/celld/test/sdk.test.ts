import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { buildRequest } from "@distilled.cloud/core/protocol-http";
import * as Endpoint from "../src/endpoint.ts";
import * as Node from "../src/services/node.ts";
import * as Runtime from "../src/services/runtime.ts";
import nodeSpec from "../specs/node.json";
import runtimeSpec from "../specs/runtime.json";

const peer = {
  scope: "__KvNamespace:0123456789abcdef",
  peer_version: "5",
  peer_source: "sdk-test",
  peer_target: "node-test",
  peer_timestamp: "1789680000000",
  peer_nonce: "00000000000000000000000000000001",
  peer_body_sha256: "0".repeat(64),
  peer_signature: "1".repeat(64),
};

const bodyOf = (request: HttpClientRequest.HttpClientRequest) => {
  if (request.body._tag !== "Uint8Array")
    throw new Error("Expected a JSON body");
  return JSON.parse(new TextDecoder().decode(request.body.body));
};

const mock = (
  respond: (request: HttpClientRequest.HttpClientRequest) => Response,
) =>
  HttpClient.make((request) =>
    Effect.sync(() => HttpClientResponse.fromWeb(request, respond(request))),
  );

const run = <A, E>(
  effect: Effect.Effect<A, E, Endpoint.Endpoint | HttpClient.HttpClient>,
  client: HttpClient.HttpClient,
) =>
  Effect.runPromise(
    effect.pipe(
      Effect.provide(
        Layer.mergeAll(
          Endpoint.of("https://celld.test"),
          Layer.succeed(HttpClient.HttpClient, client),
        ),
      ),
    ),
  );

describe("generated Celld SDK", () => {
  test("reads node state using the provided internal endpoint", () =>
    run(
      Node.getNodeState({}).pipe(
        Effect.tap((state) =>
          Effect.sync(() => {
            expect(state.owned_cells).toBe(2);
            expect(state.node_load).toBeNull();
          }),
        ),
      ),
      mock((request) => {
        expect(request.method).toBe("GET");
        expect(request.url).toBe("https://celld.test/state");
        return Response.json({ owned_cells: 2, node_load: null });
      }),
    ));

  test("resolves the endpoint on each call rather than caching the first endpoint", () => {
    const urls: string[] = [];
    return run(
      Effect.gen(function* () {
        yield* Node.getNodeState({});
        yield* Node.getNodeState({}).pipe(
          Effect.provide(Endpoint.of("https://other.test")),
        );
        expect(urls).toEqual([
          "https://celld.test/state",
          "https://other.test/state",
        ]);
      }),
      mock((request) => {
        urls.push(request.url);
        return Response.json({});
      }),
    );
  });

  test("preserves the scope colon and separates signing headers from the JSON body", () =>
    run(
      Runtime.putKv({ ...peer, op: "put", key: "test", value: [104, 105] }),
      mock((request) => {
        expect(request.url).toBe(
          "https://celld.test/runtime/__KvNamespace:0123456789abcdef",
        );
        expect(request.headers["x-cells-peer-signature"]).toBe(
          peer.peer_signature,
        );
        expect(request.headers["x-cells-peer-body-sha256"]).toBe(
          peer.peer_body_sha256,
        );
        expect(request.headers["x-cells-peer-target"]).toBe("node-test");
        expect(bodyOf(request)).toEqual({
          op: "put",
          key: "test",
          value: [104, 105],
        });
        return Response.json({ result: true });
      }),
    ));

  test("preserves dollar signs in valid administrative cell scopes", () => {
    const request = buildRequest({
      input: { scope: "Class$Inner:abc" },
      inputAst: Node.RouteCellRequest.ast,
      baseUrl: "https://celld.test",
    });
    expect(request.url).toBe("https://celld.test/cell/Class$Inner:abc");
  });

  test("keeps KV metadata as JSON text and preserves explicit null replies", () =>
    run(
      Runtime.getKv({ ...peer, op: "get", key: "test" }).pipe(
        Effect.tap((response) =>
          Effect.sync(() => {
            expect(response.result.metadata).toBeNull();
            expect(response.result.expiration).toBeNull();
            expect(response.result.value_encoding).toBe("base64");
          }),
        ),
      ),
      mock(() =>
        Response.json({
          result: {
            found: true,
            value: "aGk=",
            valueEncoding: "base64",
            metadata: null,
            expiration: null,
          },
        }),
      ),
    ));

  test("sends D1 values without marshalling strings or numbers", () =>
    run(
      Runtime.executeD1Statements({
        ...peer,
        scope: "__D1Database:abc",
        statements: [{ sql: "SELECT ?, ?", params: [42, "42"] }],
      }).pipe(
        Effect.tap((response) =>
          Effect.sync(() =>
            expect(response.result[0]?.rows).toEqual([[42, "42"]]),
          ),
        ),
      ),
      mock((request) => {
        expect(bodyOf(request)).toEqual({
          statements: [{ sql: "SELECT ?, ?", params: [42, "42"] }],
        });
        return Response.json({
          result: [{ columns: ["?", "?"], rows: [[42, "42"]] }],
        });
      }),
    ));

  for (const [name, operation, message] of [
    [
      "execD1",
      Runtime.execD1({ ...peer, exec: { sql: "SELECT missing" } }).pipe(
        Effect.asVoid,
      ),
      "D1_EXEC_ERROR: no such table: missing",
    ],
    [
      "executeD1Statements",
      Runtime.executeD1Statements({
        ...peer,
        statements: [{ sql: "SELECT missing" }],
      }).pipe(Effect.asVoid),
      "D1_ERROR: no such table: missing",
    ],
    [
      "migrateD1",
      Runtime.migrateD1({
        ...peer,
        migrate: { name: "failure", sql: "SELECT missing" },
      }).pipe(Effect.asVoid),
      "D1_ERROR: no such table: missing",
    ],
  ] as const) {
    test(`decodes the native SQL error from ${name}`, () =>
      run(
        operation.pipe(
          Effect.result,
          Effect.tap((result) =>
            Effect.sync(() => {
              expect(Result.isFailure(result)).toBe(true);
              if (Result.isFailure(result))
                expect(result.failure._tag).toBe("D1ExecutionError");
            }),
          ),
        ),
        mock(() => new Response(message, { status: 400 })),
      ));
  }

  test("does not retry a signed mutation after an ambiguous server failure", () => {
    let calls = 0;
    return run(
      Runtime.putKv({ ...peer, op: "put", key: "test", value: [] }).pipe(
        Effect.result,
        Effect.tap((result) =>
          Effect.sync(() => {
            expect(Result.isFailure(result)).toBe(true);
            expect(calls).toBe(1);
          }),
        ),
      ),
      mock(() => {
        calls++;
        return new Response("dispatcher unavailable", { status: 503 });
      }),
    );
  });

  for (const [status, message, tag] of [
    [426, "peer protocol version is incompatible", "PeerIncompatibleVersion"],
    [409, "peer request targets a different node session", "PeerWrongTarget"],
    [409, "peer request replay rejected", "PeerReplayRejected"],
    [401, "peer authentication failed", "Unauthorized"],
  ] as const) {
    test(`decodes ${tag} as a typed error`, () =>
      run(
        Runtime.getKv({ ...peer, op: "get", key: "test" }).pipe(
          Effect.result,
          Effect.tap((result) =>
            Effect.sync(() => {
              expect(Result.isFailure(result)).toBe(true);
              if (Result.isFailure(result)) {
                expect(result.failure._tag).toBe(tag);
                expect(result.failure.message).toBe(message);
              }
            }),
          ),
        ),
        mock(() => new Response(message, { status })),
      ));
  }

  test("decodes node-control conflicts without inventing a JSON error envelope", () =>
    run(
      Node.pauseRebalancing({}).pipe(
        Effect.result,
        Effect.tap((result) =>
          Effect.sync(() => {
            expect(Result.isFailure(result)).toBe(true);
            if (Result.isFailure(result))
              expect(result.failure._tag).toBe("NodeHasNoLease");
          }),
        ),
      ),
      mock(() => new Response("this node publishes no lease", { status: 409 })),
    ));

  test("decodes a failed reload's actual 422 response", () =>
    run(
      Node.reloadDeployment({}).pipe(
        Effect.result,
        Effect.tap((result) =>
          Effect.sync(() => {
            expect(Result.isFailure(result)).toBe(true);
            if (Result.isFailure(result)) {
              expect(result.failure._tag).toBe("ReloadFailed");
              expect(result.failure.message).toBe("module could not be built");
            }
          }),
        ),
      ),
      mock(() =>
        Response.json(
          {
            ok: false,
            outcome: "failed",
            version: "fixture",
            prefix: "deploy/test/fixture",
            error: "module could not be built",
          },
          { status: 422 },
        ),
      ),
    ));

  test("validates both untagged run_worker_first variants", () => {
    const decode = Schema.decodeUnknownSync(Schema.toType(Node.RunWorkerFirst));
    expect(decode(true)).toBe(true);
    expect(decode(false)).toBe(false);
    expect(decode(["/api/*"])).toEqual(["/api/*"]);
    for (const invalid of [42, {}, [false], ["/api/*", 1]]) {
      expect(() => decode(invalid)).toThrow();
      expect(() =>
        Schema.decodeUnknownSync(Schema.toType(Node.AssetIndex))({
          schema_version: 1,
          entries: {},
          config: { run_worker_first: invalid },
        }),
      ).toThrow();
    }
  });

  test("encodes shutdown query options without a body field", () => {
    const request = buildRequest({
      input: { handoff: "preserve" },
      inputAst: Node.ShutdownNodeRequest.ast,
      baseUrl: "https://celld.test",
    });
    expect(request.method).toBe("POST");
    expect(request.url).toBe("https://celld.test/shutdown?handoff=preserve");
  });

  test("generates deployment artifacts without a fictitious HTTP deployment operation", () => {
    const manifest: Node.Manifest = {
      schema_version: 1,
      version: "fixture",
      script_name: "test",
      main_module: null,
      do_classes: [],
      sqlite_classes: [],
      modules: [],
      raw_metadata: { bindings: [] },
    };
    expect(
      Schema.decodeUnknownSync(Schema.toType(Node.Manifest))(manifest),
    ).toEqual(manifest);
    const operations = Object.values(nodeSpec.shapes).filter(
      (shape) => shape.type === "operation",
    );
    expect(operations).toHaveLength(7);
    expect(JSON.stringify(operations)).not.toContain('"uri":"/deploy');
    expect(Node.AssetIndex).toBeDefined();
    expect(Node.QueueConsumerAttachment).toBeDefined();
  });

  test("retains v0.5.0 provenance and all fifteen operator body variants", () => {
    expect(nodeSpec.metadata.celld.revision).toBe(
      "12d5b6333fe52717325addcfe1e99e9fd4f77bcd",
    );
    expect(runtimeSpec.metadata.source.revision).toBe(
      nodeSpec.metadata.celld.revision,
    );
    expect(
      Object.values(runtimeSpec.shapes).filter(
        (shape) => shape.type === "operation",
      ),
    ).toHaveLength(15);
  });
});
