import { expect, test } from "bun:test";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { buildRequest } from "@distilled.cloud/core/protocol-http";
import * as Effect from "effect/Effect";
import * as Result from "effect/Result";
import type * as Schema from "effect/Schema";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Endpoint from "../src/endpoint.ts";
import * as Node from "../src/services/node.ts";
import * as Runtime from "../src/services/runtime.ts";

const endpoint = process.env.CELLD_TEST_NODE_URL;
const d1 =
  "__D1Database:498fd8c73de14627dc96027158c6cd561c0fc27929f02c7c0e2756789d764ebd";
const kv =
  "__KvNamespace:5d7042785ffa25ca16c13a7085cc42fec01216e0b3264843db2200dbaf09cf9c";
const queue =
  "__Queue:bcfaf0e2818d88911c6d98a13e53f91b6fc5e9f4f4b794e1b27864d5e59d6c61";

// This signer uses only the fixed key in the disposable prepare-live.ts fixture.
const signed = <T extends object>(schema: Schema.Top, input: T) =>
  Effect.sync(() => {
    const peer = {
      peer_version: "5",
      peer_source: "sdk-test",
      peer_target: "sdk-test-node",
      peer_timestamp: String(Date.now()),
      peer_nonce: randomBytes(16).toString("hex"),
      peer_body_sha256: "",
      peer_signature: "",
    };
    const request = buildRequest({
      input: { ...input, ...peer },
      inputAst: schema.ast,
      baseUrl: endpoint!,
    });
    if (request.body._tag !== "Uint8Array")
      throw new Error("Expected JSON request body");
    peer.peer_body_sha256 = createHash("sha256")
      .update(request.body.body)
      .digest("hex");
    const url = new URL(request.url);
    const canonical = [
      "cells-peer-request-v1",
      peer.peer_version,
      request.method,
      url.pathname + url.search,
      peer.peer_body_sha256,
      peer.peer_source,
      peer.peer_target,
      peer.peer_timestamp,
      peer.peer_nonce,
    ].join("\n");
    peer.peer_signature = createHmac(
      "sha256",
      Buffer.from("11".repeat(32), "hex"),
    )
      .update(canonical)
      .digest("hex");
    return { ...input, ...peer };
  });

test.skipIf(!endpoint)(
  "generated operations against the disposable Celld v0.5.0 fixture",
  () => {
    if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(endpoint!))
      throw new Error("Use only the disposable loopback node");
    return Effect.runPromise(
      Effect.gen(function* () {
        const state = yield* Node.getNodeState({});
        expect(state.deployment?.version).toBeDefined();
        expect((yield* Node.pauseRebalancing({})).rebalance_paused).toBe(true);
        expect((yield* Node.resumeRebalancing({})).rebalance_paused).toBe(
          false,
        );
        expect((yield* Node.reloadDeployment({})).ok).toBe(true);

        const exec = yield* Runtime.execD1(
          yield* signed(Runtime.ExecD1Input, {
            scope: d1,
            name: "sdk-db",
            exec: {
              sql: "CREATE TABLE IF NOT EXISTS sdk_items (id INTEGER PRIMARY KEY, value TEXT);",
              rows: true,
            },
          }),
        );
        expect(exec.result.count).toBeGreaterThanOrEqual(1);
        const rows = yield* Runtime.executeD1Statements(
          yield* signed(Runtime.ExecuteD1StatementsInput, {
            scope: d1,
            statements: [{ sql: "SELECT ?, ?", params: [42, "42"] }],
          }),
        );
        expect(rows.result[0]?.rows).toEqual([[42, "42"]]);
        yield* Runtime.migrateD1(
          yield* signed(Runtime.MigrateD1Input, {
            scope: d1,
            migrate: {
              name: "0001-sdk",
              sql: "CREATE TABLE sdk_migrated (id INTEGER PRIMARY KEY);",
            },
          }),
        );

        expect(
          (yield* Runtime.putKv(
            yield* signed(Runtime.PutKvInput, {
              scope: kv,
              op: "put",
              key: "sdk-inline",
              value: [104, 105],
              metadata: '{"fixture":true}',
            }),
          )).result.ok,
        ).toBe(true);
        const value = yield* Runtime.getKv(
          yield* signed(Runtime.GetKvInput, {
            scope: kv,
            op: "get",
            key: "sdk-inline",
          }),
        );
        expect(value.result.value).toEqual([104, 105]);
        expect(value.result.metadata).toBe('{"fixture":true}');
        expect(value.result.expiration).toBeNull();
        expect(
          (yield* Runtime.putKvBase64(
            yield* signed(Runtime.PutKvBase64Input, {
              scope: kv,
              op: "put-base64",
              key: "sdk-base64",
              value: "aGk=",
              expiration_ttl: 120,
            }),
          )).result.ok,
        ).toBe(true);
        const listed = yield* Runtime.listKv(
          yield* signed(Runtime.ListKvInput, {
            scope: kv,
            op: "list",
            prefix: "sdk-",
            limit: 10,
          }),
        );
        expect(listed.result.keys.map((key) => key.name)).toEqual([
          "sdk-base64",
          "sdk-inline",
        ]);
        expect(
          (yield* Runtime.getKvInfo(
            yield* signed(Runtime.GetKvInfoInput, { scope: kv, op: "info" }),
          )).result.live,
        ).toBe(2);
        expect(
          (yield* Runtime.deleteKv(
            yield* signed(Runtime.DeleteKvInput, {
              scope: kv,
              op: "delete",
              keys: ["sdk-inline", "sdk-base64"],
            }),
          )).result.ok,
        ).toBe(true);
        expect(
          (yield* Runtime.getKv(
            yield* signed(Runtime.GetKvInput, {
              scope: kv,
              op: "get",
              key: "sdk-inline",
            }),
          )).result.found,
        ).toBe(false);

        expect(
          (yield* Runtime.getQueueInfo(
            yield* signed(Runtime.GetQueueInfoInput, {
              scope: queue,
              op: "info",
            }),
          )).result.backlog_count,
        ).toBe(0);
        expect(
          (yield* Runtime.pauseQueue(
            yield* signed(Runtime.PauseQueueInput, {
              scope: queue,
              op: "pause",
            }),
          )).result.paused,
        ).toBe(true);
        expect(
          (yield* Runtime.resumeQueue(
            yield* signed(Runtime.ResumeQueueInput, {
              scope: queue,
              op: "resume",
            }),
          )).result.paused,
        ).toBe(false);
        expect(
          (yield* Runtime.peekQueue(
            yield* signed(Runtime.PeekQueueInput, {
              scope: queue,
              op: "peek",
              limit: 10,
            }),
          )).result.messages,
        ).toEqual([]);
        expect(
          (yield* Runtime.redriveQueue(
            yield* signed(Runtime.RedriveQueueInput, {
              scope: queue,
              op: "redrive",
              limit: 10,
            }),
          )).result.redriven,
        ).toBe(0);
        expect(
          (yield* Runtime.purgeQueue(
            yield* signed(Runtime.PurgeQueueInput, {
              scope: queue,
              op: "purge",
            }),
          )).result.deleted,
        ).toBe(0);

        const replay = yield* signed(Runtime.GetKvInput, {
          scope: kv,
          op: "get",
          key: "missing",
        });
        yield* Runtime.getKv(replay);
        const rejected = yield* Runtime.getKv(replay).pipe(Effect.result);
        expect(Result.isFailure(rejected)).toBe(true);
        if (Result.isFailure(rejected))
          expect(rejected.failure._tag).toBe("PeerReplayRejected");

        expect((yield* Node.routeCell({ scope: d1 })).route).toBe("local");
        expect(
          (yield* Node.evictCell({ scope: d1 }).pipe(
            Effect.timeout("10 seconds"),
          )).ok,
        ).toBe(true);
        if (process.env.CELLD_TEST_SHUTDOWN === "1")
          expect((yield* Node.shutdownNode({ handoff: "preserve" })).ok).toBe(
            true,
          );
      }).pipe(
        Effect.provide(Endpoint.of(endpoint!)),
        Effect.provide(FetchHttpClient.layer),
        Effect.timeout("90 seconds"),
      ),
    );
  },
  100_000,
);
