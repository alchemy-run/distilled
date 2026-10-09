/**
 * The hand-written glue of the ACP SDK — protocol, error classes, connection
 * layers — exercised against a FAKE agent on the other end of an in-memory
 * JSON-RPC pair. The fake agent speaks raw wire JSON (core's `makePeer`), so
 * these tests pin what the generated operations put on and take off the wire.
 * Live agents are exercised by Alchemy's harness tests, not here.
 */
import * as JsonRpc from "@distilled.cloud/core/jsonrpc";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import * as Acp from "./index.ts";

const run = <A, E>(effect: Effect.Effect<A, E, any>) =>
  Effect.runPromise(Effect.result(Effect.scoped(effect)) as Effect.Effect<any, never, never>);

/**
 * Run `body` against a fake agent. `agentRequests` script the agent's side;
 * each gets the agent's own peer so it can notify / call back into the SDK.
 */
const withFakeAgent = <A, E>(
  agentRequests: Record<
    string,
    (params: any, agent: JsonRpc.Peer) => Effect.Effect<unknown, JsonRpc.HandlerError>
  >,
  body: Effect.Effect<A, E, Acp.AcpConnection>,
  handlers: Acp.InboundHandlers = {},
) =>
  Effect.gen(function* () {
    const [sdkSide, agentSide] = yield* JsonRpc.memoryPair;
    let agent: JsonRpc.Peer | undefined;
    agent = yield* JsonRpc.makePeer(agentSide, {
      requests: new Map(
        Object.entries(agentRequests).map(([method, h]) => [
          method,
          (params: unknown) => Effect.suspend(() => h(params, agent!)),
        ]),
      ),
    });
    const peer = yield* Acp.connect(sdkSide, handlers ? { handlers } : {});
    return yield* body.pipe(Effect.provideService(Acp.AcpConnection, peer));
  });

const initializeResult = {
  protocolVersion: 1,
  agentCapabilities: { loadSession: true, promptCapabilities: { image: false } },
  authMethods: [],
};

describe("ACP over a fake agent", () => {
  test("initialize → session/new → session/prompt with updates and a permission callback", async () => {
    const seen: Array<{ method: string; params: unknown }> = [];
    const record = (method: string, result: unknown) => (params: unknown) =>
      Effect.sync(() => {
        seen.push({ method, params });
        return result;
      });

    const result = await run(
      withFakeAgent(
        {
          initialize: record("initialize", initializeResult),
          "session/new": record("session/new", { sessionId: "sess-1" }),
          "session/prompt": (params, agent) =>
            Effect.gen(function* () {
              seen.push({ method: "session/prompt", params });
              // (a) stream the turn as session/update notifications
              yield* agent.notify("session/update", {
                sessionId: "sess-1",
                update: {
                  sessionUpdate: "agent_message_chunk",
                  content: { type: "text", text: "Hello, " },
                },
              });
              yield* agent.notify("session/update", {
                sessionId: "sess-1",
                update: {
                  sessionUpdate: "tool_call",
                  toolCallId: "call-1",
                  title: "Write hello.txt",
                  kind: "edit",
                  status: "pending",
                },
              });
              // (b) ask the client for permission before running the tool
              const permission = (yield* agent
                .request("session/request_permission", {
                  sessionId: "sess-1",
                  toolCall: { toolCallId: "call-1" },
                  options: [
                    { optionId: "allow", name: "Allow once", kind: "allow_once" },
                    { optionId: "deny", name: "Reject", kind: "reject_once" },
                  ],
                })
                .pipe(
                  Effect.mapError(
                    () => new JsonRpc.HandlerError({ code: -32603, message: "permission failed" }),
                  ),
                )) as { outcome: { outcome: string; optionId?: string } };
              // (c) end the turn, echoing the decision so the test can see it
              return {
                stopReason: "end_turn",
                _meta: { permission: permission.outcome },
              };
            }).pipe(
              Effect.catchTag("JsonRpcTransportError", (e) =>
                Effect.fail(new JsonRpc.HandlerError({ code: -32603, message: e.message })),
              ),
            ),
        },
        Effect.gen(function* () {
          const init = yield* Acp.initialize({
            protocolVersion: Acp.ACP_PROTOCOL_VERSION,
            clientCapabilities: { fs: { readTextFile: true, writeTextFile: true } },
          });
          const { sessionId } = yield* Acp.sessionNew({ cwd: "/work", mcpServers: [] });

          const updates = yield* Acp.sessionUpdates.pipe(
            Stream.take(2),
            Stream.runCollect,
            Effect.forkChild,
          );
          yield* Effect.yieldNow;

          const prompt = yield* Acp.sessionPrompt({
            sessionId,
            prompt: [{ type: "text", text: "Say hello" }],
          });
          return { init, sessionId, prompt, updates: Array.from(yield* Fiber.join(updates)) };
        }),
        {
          sessionRequestPermission: ({ options }) =>
            Effect.succeed({
              outcome: {
                outcome: "selected" as const,
                optionId: options.find((o) => o.kind === "allow_once")!.optionId,
              },
            }),
        },
      ),
    );

    expect(result._tag).toBe("Success");
    const { init, sessionId, prompt, updates } = result.success;
    expect(init.protocolVersion).toBe(1);
    expect(init.agentCapabilities?.loadSession).toBe(true);
    expect(sessionId).toBe("sess-1");

    // (a) updates arrive decoded, and the union narrows on its discriminator
    expect(updates).toHaveLength(2);
    const [chunk, toolCall] = updates.map((n: Acp.SessionUpdatesRequest) => n.update);
    expect(chunk!.sessionUpdate).toBe("agent_message_chunk");
    if (chunk!.sessionUpdate === "agent_message_chunk") {
      expect(chunk!.content).toEqual({ type: "text", text: "Hello, " });
    }
    expect(toolCall).toMatchObject({ sessionUpdate: "tool_call", toolCallId: "call-1" });

    // (b) the typed permission handler answered the agent's callback
    expect(prompt._meta).toEqual({ permission: { outcome: "selected", optionId: "allow" } });
    // (c) the prompt response
    expect(prompt.stopReason).toBe("end_turn");

    // What went on the wire: ACP is camelCase already, params pass verbatim.
    expect(seen.map((s) => s.method)).toEqual(["initialize", "session/new", "session/prompt"]);
    expect(seen[0]!.params).toEqual({
      protocolVersion: 1,
      clientCapabilities: { fs: { readTextFile: true, writeTextFile: true } },
    });
    expect(seen[2]!.params).toEqual({
      sessionId: "sess-1",
      prompt: [{ type: "text", text: "Say hello" }],
    });
  });

  test("outbound notifications reach the agent (session/cancel, $/cancel_request)", async () => {
    const result = await run(
      Effect.gen(function* () {
        const [sdkSide, agentSide] = yield* JsonRpc.memoryPair;
        const agent = yield* JsonRpc.makePeer(agentSide);
        return yield* Effect.gen(function* () {
          const received = yield* agent.notifications.pipe(
            Stream.take(2),
            Stream.runCollect,
            Effect.forkChild,
          );
          yield* Effect.yieldNow;
          yield* Acp.sessionCancel({ sessionId: "sess-1" });
          yield* Acp.cancelRequest({ requestId: 7 });
          return Array.from(yield* Fiber.join(received));
        }).pipe(Effect.provideServiceEffect(Acp.AcpConnection, Acp.connect(sdkSide)));
      }),
    );
    expect(result.success).toEqual([
      { method: "session/cancel", params: { sessionId: "sess-1" } },
      { method: "$/cancel_request", params: { requestId: 7 } },
    ]);
  });

  test("an inbound request with no handler is answered MethodNotFound", async () => {
    const result = await run(
      Effect.gen(function* () {
        const [sdkSide, agentSide] = yield* JsonRpc.memoryPair;
        const agent = yield* JsonRpc.makePeer(agentSide);
        yield* Acp.connect(sdkSide);
        return yield* agent
          .request("fs/read_text_file", { sessionId: "s", path: "/a" })
          .pipe(Effect.flip);
      }),
    );
    expect(result.success.error.code).toBe(JsonRpc.ErrorCode.MethodNotFound);
  });
});

describe("ACP error codes → typed errors", () => {
  const failWith = (code: number, message: string, data?: unknown) => () =>
    Effect.fail(
      new JsonRpc.HandlerError({ code, message, ...(data !== undefined ? { data } : {}) }),
    );

  test.each([
    [-32000, Acp.AcpAuthRequired, "AcpAuthRequired"],
    [-32002, Acp.AcpResourceNotFound, "AcpResourceNotFound"],
    [-32800, Acp.AcpRequestCancelled, "AcpRequestCancelled"],
    [-32602, Acp.AcpInvalidParams, "AcpInvalidParams"],
    [-32601, Acp.AcpMethodNotFound, "AcpMethodNotFound"],
    [-32603, Acp.AcpInternalError, "AcpInternalError"],
  ])("code %i is %s", async (code, cls, tag) => {
    const result = await run(
      withFakeAgent(
        { "session/load": failWith(code, "nope", { hint: "x" }) },
        Acp.sessionLoad({ sessionId: "missing", cwd: "/work", mcpServers: [] }),
      ),
    );
    expect(result._tag).toBe("Failure");
    expect(result.failure).toBeInstanceOf(cls);
    expect(result.failure._tag).toBe(tag);
    expect(result.failure.code).toBe(code);
    expect(result.failure.message).toBe("nope");
    expect(result.failure.body).toEqual({ hint: "x" });
  });

  test("catchTag narrows on a typed ACP error", async () => {
    const result = await run(
      withFakeAgent(
        { "session/new": failWith(-32000, "Authentication required") },
        Acp.sessionNew({ cwd: "/work", mcpServers: [] }).pipe(
          Effect.catchTag("AcpAuthRequired", (e) => Effect.succeed(`auth: ${e.message}`)),
        ),
      ),
    );
    expect(result.success).toBe("auth: Authentication required");
  });

  test("an undefined code falls back to UnknownAcpError with the method", async () => {
    const result = await run(
      withFakeAgent(
        { "session/prompt": failWith(-31999, "weird", { x: 1 }) },
        Acp.sessionPrompt({ sessionId: "s", prompt: [] }),
      ),
    );
    expect(result.failure).toBeInstanceOf(Acp.UnknownAcpError);
    expect(result.failure).toMatchObject({
      method: "session/prompt",
      code: -31999,
      message: "weird",
      data: { x: 1 },
    });
  });
});
