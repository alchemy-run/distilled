/**
 * Tests for the hand-written glue: the Codex connection layers (omitVersion,
 * inbound handlers) driving generated operations against a fake app-server
 * on an in-memory transport. The real `codex app-server` is exercised by
 * Alchemy's harness tests, not here.
 */
import * as JsonRpc from "@distilled.cloud/core/jsonrpc";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as Scope from "effect/Scope";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import * as Codex from "./index.ts";

const run = <A, E>(effect: Effect.Effect<A, E, Scope.Scope>) =>
  Effect.runPromise(Effect.result(Effect.scoped(effect)) as Effect.Effect<any, never, never>);

/** Wrap a transport so every frame the SDK writes is recorded verbatim. */
const recording = (transport: JsonRpc.Transport, frames: string[]): JsonRpc.Transport => ({
  incoming: transport.incoming,
  send: (outgoing) =>
    transport.send(outgoing.pipe(Stream.tap((frame) => Effect.sync(() => frames.push(frame))))),
});

const thread = (id: string) => ({
  cliVersion: "0.0.0-test",
  createdAt: 1,
  cwd: "/work",
  ephemeral: true,
  id,
  modelProvider: "openai",
  preview: "",
  projectId: null,
  sessionId: "session-1",
  source: "appServer",
  status: { type: "idle" },
  turns: [],
  updatedAt: 1,
});

interface FakeServer {
  readonly peer: JsonRpc.Peer;
  /** Wire messages the fake server received, by method. */
  readonly received: Array<{ readonly method: string; readonly params: unknown }>;
  /** Decisions the SDK's approval handler answered with. */
  readonly decisions: unknown[];
}

/**
 * A fake `codex app-server` on one end of a memory pair. `turn/start`
 * answers immediately, then streams two agent-message deltas, asks the client
 * to approve a command, and completes the turn.
 */
const fakeServer = (transport: JsonRpc.Transport) =>
  Effect.gen(function* () {
    const scope = yield* Effect.scope;
    const received: FakeServer["received"] = [];
    const decisions: unknown[] = [];
    let peer: JsonRpc.Peer | undefined;
    const record = (method: string) => (params: unknown) =>
      Effect.sync(() => received.push({ method, params }));

    const turnScript = (threadId: string, turnId: string) =>
      Effect.gen(function* () {
        const p = peer!;
        for (const delta of ["Hel", "lo"]) {
          yield* p.notify("item/agentMessage/delta", { threadId, turnId, itemId: "msg-1", delta });
        }
        const answer = yield* p.request("item/commandExecution/requestApproval", {
          threadId,
          turnId,
          itemId: "cmd-1",
          command: "rm -rf build",
          startedAtMs: 42,
        });
        decisions.push(answer);
        yield* p.notify("turn/completed", {
          threadId,
          turn: { id: turnId, items: [], status: "completed" },
        });
      });

    peer = yield* JsonRpc.makePeer(transport, {
      omitVersion: true,
      requests: new Map<string, JsonRpc.RawHandler>([
        [
          "initialize",
          (params) =>
            record("initialize")(params).pipe(
              Effect.as({
                codexHome: "/home/test/.codex",
                platformFamily: "unix",
                platformOs: "macos",
                userAgent: "codex_app_server/0.0.0-test",
              }),
            ),
        ],
        [
          "thread/start",
          (params) =>
            record("thread/start")(params).pipe(
              Effect.as({
                approvalPolicy: "on-request",
                approvalsReviewer: "user",
                cwd: "/work",
                model: "gpt-5-codex",
                modelProvider: "openai",
                sandbox: { type: "readOnly" },
                thread: thread("thread-1"),
              }),
            ),
        ],
        [
          "turn/start",
          (params) =>
            Effect.gen(function* () {
              yield* record("turn/start")(params);
              const { threadId } = params as { threadId: string };
              yield* turnScript(threadId, "turn-1").pipe(Effect.orDie, Effect.forkIn(scope));
              return { turn: { id: "turn-1", items: [], status: "inProgress" } };
            }),
        ],
        ["account/logout", (params) => record("account/logout")(params).pipe(Effect.as({}))],
        [
          "model/list",
          () =>
            Effect.fail(
              new JsonRpc.HandlerError({
                code: -32001,
                message: "Server overloaded; retry later.",
              }),
            ),
        ],
        [
          "config/read",
          () => Effect.fail(new JsonRpc.HandlerError({ code: 4242, message: "weird", data: [1] })),
        ],
      ]),
      notifications: new Map([["initialized", record("initialized")]]),
    });
    return { peer, received, decisions } satisfies FakeServer;
  });

/** Connect the SDK to a fresh fake server; returns the server and the SDK's raw frames. */
const withFakeServer = <A, E>(
  body: (server: FakeServer) => Effect.Effect<A, E, Codex.CodexConnection>,
  handlers?: Codex.InboundHandlers,
) =>
  Effect.gen(function* () {
    const [sdkSide, serverSide] = yield* JsonRpc.memoryPair;
    const frames: string[] = [];
    const server = yield* fakeServer(serverSide);
    const peer = yield* Codex.connect(recording(sdkSide, frames), handlers ? { handlers } : {});
    const result = yield* body(server).pipe(Effect.provideService(Codex.CodexConnection, peer));
    return { result, server, frames };
  });

describe("Codex connection (fake app-server)", () => {
  test("initialize → thread/start → turn/start streams events and answers an approval", async () => {
    const outcome = await run(
      withFakeServer(
        () =>
          Effect.gen(function* () {
            // Subscribe before the turn starts so no event is missed.
            const deltas = yield* Codex.itemAgentMessageDelta.pipe(
              Stream.take(2),
              Stream.runCollect,
              Effect.forkChild,
            );
            const completed = yield* Codex.turnCompleted.pipe(
              Stream.take(1),
              Stream.runCollect,
              Effect.forkChild,
            );
            for (let i = 0; i < 5; i++) yield* Effect.yieldNow;

            const init = yield* Codex.initialize({
              clientInfo: { name: "distilled-test", version: "1.0.0" },
              capabilities: { experimentalApi: true },
            });
            yield* Codex.initialized();
            const started = yield* Codex.threadStart({ cwd: "/work", ephemeral: true });
            const turn = yield* Codex.turnStart({
              threadId: started.thread.id,
              input: [{ type: "text", text: "say hello" }],
            });
            return {
              init,
              started,
              turn,
              deltas: Array.from(yield* Fiber.join(deltas)),
              completed: Array.from(yield* Fiber.join(completed)),
            };
          }),
        {
          itemCommandExecutionRequestApproval: (params) =>
            Effect.succeed({
              decision: params.command?.startsWith("rm ") ? ("decline" as const) : "accept",
            }),
        },
      ),
    );
    expect(outcome._tag).toBe("Success");
    const { result, server, frames } = outcome.success;

    expect(result.init.userAgent).toBe("codex_app_server/0.0.0-test");
    expect(result.started.thread.id).toBe("thread-1");
    expect(result.turn.turn.status).toBe("inProgress");
    expect(result.deltas.map((d: Codex.ItemAgentMessageDeltaRequest) => d.delta)).toEqual([
      "Hel",
      "lo",
    ]);
    expect(result.completed[0]).toMatchObject({
      threadId: "thread-1",
      turn: { id: "turn-1", status: "completed" },
    });

    // The typed approval handler answered the server's request.
    expect(server.decisions).toEqual([{ decision: "decline" }]);

    // Wire: params went out as Codex expects them; `initialized` carries no params.
    expect(server.received).toEqual([
      {
        method: "initialize",
        params: {
          clientInfo: { name: "distilled-test", version: "1.0.0" },
          capabilities: { experimentalApi: true },
        },
      },
      { method: "initialized", params: undefined },
      { method: "thread/start", params: { cwd: "/work", ephemeral: true } },
      {
        method: "turn/start",
        params: { threadId: "thread-1", input: [{ type: "text", text: "say hello" }] },
      },
    ]);

    // omitVersion: the SDK never sends the `"jsonrpc": "2.0"` member — on
    // requests, notifications, or responses to the server's requests.
    const messages: Array<Record<string, unknown>> = (frames as string[]).map((f) => JSON.parse(f));
    expect(messages.length).toBeGreaterThanOrEqual(5);
    for (const m of messages) expect(m).not.toHaveProperty("jsonrpc");
    expect(messages.find((m) => m.method === "initialized")).toEqual({ method: "initialized" });
    expect(messages.some((m) => "result" in m && !("method" in m))).toBe(true);
  });

  test("a method without params sends no params member", async () => {
    const outcome = await run(withFakeServer(() => Codex.accountLogout()));
    expect(outcome._tag).toBe("Success");
    const logout = outcome.success.frames
      .map((f: string) => JSON.parse(f))
      .find((m: { method?: string }) => m.method === "account/logout");
    expect(logout).toEqual({ id: expect.any(Number), method: "account/logout" });
  });

  test("Codex error codes become typed errors; unknown codes fall back", async () => {
    const overloaded = await run(withFakeServer(() => Codex.modelList({})));
    expect(overloaded.failure).toBeInstanceOf(Codex.CodexServerOverloaded);
    expect(overloaded.failure.message).toBe("Server overloaded; retry later.");

    const unknown = await run(withFakeServer(() => Codex.configRead({})));
    expect(unknown.failure).toBeInstanceOf(Codex.UnknownCodexError);
    expect(unknown.failure).toMatchObject({
      method: "config/read",
      code: 4242,
      message: "weird",
      data: [1],
    });
  });

  test("an unhandled server request is answered MethodNotFound", async () => {
    const outcome = await run(
      withFakeServer((server) =>
        server.peer.request("item/tool/requestUserInput", {
          threadId: "t",
          turnId: "u",
          itemId: "i",
          questions: [],
        }),
      ),
    );
    expect(outcome._tag).toBe("Failure");
    expect(outcome.failure.error).toMatchObject({ code: JsonRpc.ErrorCode.MethodNotFound });
  });
});
