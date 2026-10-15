import * as NodeServices from "@effect/platform-node/NodeServices";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as ChildProcess from "effect/process/ChildProcess";
import { ChildProcessSpawner } from "effect/process/ChildProcessSpawner";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import * as JsonRpc from "./jsonrpc.ts";
import * as S from "./schema.ts";
import * as T from "./trait.ts";

// =============================================================================
// Fixtures: a tiny "agent" protocol
// =============================================================================

class TestConnection extends JsonRpc.Connection<TestConnection>()("JsonRpcTest/Connection") {}

class UnknownTestError extends Schema.TaggedError<UnknownTestError>()("UnknownTestError", {
  info: Schema.Unknown,
}) {}

class TestParseError extends Schema.TaggedError<TestParseError>()("TestParseError", {
  info: Schema.Unknown,
}) {}

class SessionNotFound extends T.applyErrorMatchers(
  Schema.TaggedError<SessionNotFound>()("SessionNotFound", { message: Schema.String }),
  [{ code: -32002 }],
) {}

const TestProtocol = JsonRpc.protocol({
  connection: TestConnection,
  unknownError: (info) => new UnknownTestError({ info }),
  parseError: (info) => new TestParseError({ info }),
});

const PromptRequest = S.Struct({
  sessionId: S.String.pipe(T.Body("session_id")),
  text: S.String,
});
const PromptResponse = S.Struct({
  stopReason: S.String.pipe(T.Body("stop_reason")),
});
const UpdateNotification = S.Struct({
  sessionId: S.String.pipe(T.Body("session_id")),
  delta: S.String,
});
const ReadFileRequest = S.Struct({ path: S.String });
const ReadFileResponse = S.Struct({ content: S.String });

const prompt = JsonRpc.request(() => ({
  method: "session/prompt",
  input: PromptRequest,
  output: PromptResponse,
  errors: [SessionNotFound],
  protocol: TestProtocol,
}));

const cancel = JsonRpc.notify(() => ({
  method: "session/cancel",
  input: S.Struct({ sessionId: S.String.pipe(T.Body("session_id")) }),
  protocol: TestProtocol,
}));

const sessionUpdates = JsonRpc.notifications(() => ({
  method: "session/update",
  params: UpdateNotification,
  protocol: TestProtocol,
}));

const inbound = {
  fsReadTextFile: {
    method: "fs/read_text_file",
    kind: "request",
    params: ReadFileRequest,
    result: ReadFileResponse,
  },
} as const satisfies Record<string, JsonRpc.InboundMethod>;

const run = <A, E>(effect: Effect.Effect<A, E, any>) =>
  Effect.runPromise(Effect.result(Effect.scoped(effect)) as Effect.Effect<any, never, never>);

/**
 * A fake agent on one end of a memory pair, the SDK connection on the other.
 * `agent` gets the raw peer to script its side of the conversation.
 */
const withAgent = <A, E>(
  agentRequests: Record<string, JsonRpc.RawHandler>,
  body: (agent: JsonRpc.Peer) => Effect.Effect<A, E, TestConnection>,
  handlers: Parameters<typeof JsonRpc.bindHandlers>[1] = {},
) =>
  Effect.gen(function* () {
    const [sdkSide, agentSide] = yield* JsonRpc.memoryPair;
    const agent = yield* JsonRpc.makePeer(agentSide, {
      requests: new Map(Object.entries(agentRequests)),
    });
    const connection = yield* JsonRpc.connect(sdkSide, JsonRpc.bindHandlers(inbound, handlers));
    return yield* body(agent).pipe(Effect.provideService(TestConnection, connection));
  });

// =============================================================================
// Tests
// =============================================================================

describe("JsonRpc peer + operations", () => {
  test("a typed request round-trips with wire-key mapping both ways", async () => {
    const seen: unknown[] = [];
    const result = await run(
      withAgent(
        {
          "session/prompt": (params) =>
            Effect.sync(() => {
              seen.push(params);
              return { stop_reason: "end_turn" };
            }),
        },
        () => prompt({ sessionId: "s1", text: "hi" }),
      ),
    );
    expect(result._tag).toBe("Success");
    expect(result.success).toEqual({ stopReason: "end_turn" });
    expect(seen).toEqual([{ session_id: "s1", text: "hi" }]);
  });

  test("an error response matching an errorMatchers code is the typed error", async () => {
    const result = await run(
      withAgent(
        {
          "session/prompt": () =>
            Effect.fail(new JsonRpc.HandlerError({ code: -32002, message: "no such session" })),
        },
        () => prompt({ sessionId: "nope", text: "hi" }),
      ),
    );
    expect(result._tag).toBe("Failure");
    expect(result.failure).toBeInstanceOf(SessionNotFound);
    expect(result.failure.message).toBe("no such session");
  });

  test("an unmatched error code falls back to the package's unknown error", async () => {
    const result = await run(
      withAgent(
        {
          "session/prompt": () =>
            Effect.fail(new JsonRpc.HandlerError({ code: 4242, message: "weird", data: { x: 1 } })),
        },
        () => prompt({ sessionId: "s1", text: "hi" }),
      ),
    );
    expect(result.failure).toBeInstanceOf(UnknownTestError);
    expect(result.failure.info).toEqual({
      method: "session/prompt",
      code: 4242,
      message: "weird",
      data: { x: 1 },
    });
  });

  test("an unhandled method is answered MethodNotFound", async () => {
    const result = await run(withAgent({}, () => prompt({ sessionId: "s1", text: "hi" })));
    expect(result.failure).toBeInstanceOf(UnknownTestError);
    expect(result.failure.info.code).toBe(JsonRpc.ErrorCode.MethodNotFound);
  });

  test("the peer calls back into SDK handlers (inbound requests)", async () => {
    const result = await run(
      withAgent(
        {
          "session/prompt": () => Effect.succeed({ stop_reason: "end_turn" }),
        },
        (agent) => agent.request("fs/read_text_file", { path: "/a.txt" }),
        {
          fsReadTextFile: ({ path }: { path: string }) =>
            Effect.succeed({ content: `contents of ${path}` }),
        },
      ),
    );
    expect(result.success).toEqual({ content: "contents of /a.txt" });
  });

  test("inbound notifications stream to subscribers, decoded", async () => {
    const result = await run(
      withAgent({}, (agent) =>
        Effect.gen(function* () {
          const fiber = yield* sessionUpdates.pipe(
            Stream.take(2),
            Stream.runCollect,
            Effect.forkChild,
          );
          yield* Effect.yieldNow;
          yield* agent.notify("session/update", { session_id: "s1", delta: "He" });
          yield* agent.notify("other/thing", {});
          yield* agent.notify("session/update", { session_id: "s1", delta: "llo" });
          return yield* Fiber.join(fiber);
        }),
      ),
    );
    expect(Array.from(result.success)).toEqual([
      { sessionId: "s1", delta: "He" },
      { sessionId: "s1", delta: "llo" },
    ]);
  });

  test("outbound notifications reach the peer", async () => {
    const result = await run(
      withAgent({}, (agent) =>
        Effect.gen(function* () {
          const fiber = yield* agent.notifications.pipe(
            Stream.take(1),
            Stream.runCollect,
            Effect.forkChild,
          );
          yield* Effect.yieldNow;
          yield* cancel({ sessionId: "s1" });
          return yield* Fiber.join(fiber);
        }),
      ),
    );
    expect(Array.from(result.success)).toEqual([
      { method: "session/cancel", params: { session_id: "s1" } },
    ]);
  });

  test("pending requests fail with JsonRpcTransportError when the peer goes away", async () => {
    const result = await run(
      Effect.gen(function* () {
        const [sdkSide, agentSide] = yield* JsonRpc.memoryPair;
        // The agent end never answers and then closes its outgoing side.
        const agentScope = yield* Effect.scope;
        void agentScope;
        const closeAgent = agentSide.send(Stream.empty);
        const connection = yield* JsonRpc.connect(sdkSide);
        return yield* Effect.gen(function* () {
          const fiber = yield* prompt({ sessionId: "s1", text: "hi" }).pipe(Effect.forkChild);
          yield* Effect.yieldNow;
          yield* closeAgent;
          return yield* Fiber.join(fiber);
        }).pipe(Effect.provideService(TestConnection, connection));
      }),
    );
    expect(result._tag).toBe("Failure");
    expect(result.failure).toBeInstanceOf(JsonRpc.JsonRpcTransportError);
    expect(result.failure.reason).toBe("closed");
  });
});

describe("JsonRpc.fromStreams", () => {
  // A real NDJSON peer over stdio: answers `echo` requests and sends one
  // notification first. Spawning is the caller's job; distilled only speaks
  // the protocol over the streams it is handed.
  const agentScript = `
    const rl = require("node:readline").createInterface({ input: process.stdin });
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", method: "hello", params: {} }) + "\\n");
    rl.on("line", (line) => {
      const m = JSON.parse(line);
      if (m.method === "echo") {
        process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: m.id, result: { echoed: m.params.text } }) + "\\n");
      }
    });
  `;

  test("talks NDJSON JSON-RPC over a spawned process's stdio", async () => {
    const echo = JsonRpc.request(() => ({
      method: "echo",
      input: S.Struct({ text: S.String }),
      output: S.Struct({ echoed: S.String }),
      protocol: TestProtocol,
    }));
    const program = Effect.gen(function* () {
      const spawner = yield* ChildProcessSpawner;
      const handle = yield* spawner.spawn(
        ChildProcess.make(process.execPath, ["-e", agentScript], { stderr: "inherit" }),
      );
      const connection = yield* JsonRpc.connect(
        JsonRpc.fromStreams({ readable: handle.stdout, writable: handle.stdin }),
      );
      return yield* echo({ text: "over stdio" }).pipe(
        Effect.provideService(TestConnection, connection),
      );
    }).pipe(Effect.provide(NodeServices.layer));
    const result = await run(program);
    expect(result._tag).toBe("Success");
    expect(result.success).toEqual({ echoed: "over stdio" });
  });
});
