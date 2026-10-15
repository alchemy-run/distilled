/**
 * Connect to a Codex app-server over a transport — hand-written.
 *
 * `codex app-server` speaks JSON-RPC as newline-delimited JSON, WITHOUT the
 * `"jsonrpc": "2.0"` member, so the peer runs with `omitVersion: true`. This
 * SDK only speaks the protocol: you hand it the endpoint — a spawned
 * process's stdio via `JsonRpc.fromStreams`, a socket via
 * `JsonRpc.fromSocket`, or one end of `JsonRpc.memoryPair` in tests.
 *
 * Inbound requests (approvals, user input, dynamic tool calls, …) are
 * answered by the typed `handlers`; a request with no handler is answered
 * `MethodNotFound`.
 */
import * as JsonRpc from "@distilled.cloud/core/jsonrpc";
import * as Effect from "effect/Effect";
import type * as Scope from "effect/Scope";
import { handlers as bindHandlers, type InboundHandlers } from "./services/codex.ts";

export interface ConnectOptions<R = never> {
  /** Typed implementations of the server→client requests. */
  readonly handlers?: InboundHandlers<R>;
}

/**
 * Open a Codex app-server connection over `transport`. The connection lives
 * as long as the enclosing scope; provide it as {@link CodexConnection} to
 * call the typed operations.
 *
 * @example
 * ```ts
 * const peer = yield* Codex.connect(transport, {
 *   handlers: {
 *     itemCommandExecutionRequestApproval: () => Effect.succeed({ decision: "decline" }),
 *   },
 * });
 * yield* Codex.initialize({ clientInfo: { name: "my-app", version: "1.0.0" } }).pipe(
 *   Effect.provideService(Codex.CodexConnection, peer),
 * );
 * ```
 */
export const connect = <R = never>(
  transport: JsonRpc.Transport,
  options: ConnectOptions<R> = {},
): Effect.Effect<JsonRpc.Peer, never, Scope.Scope | R> =>
  JsonRpc.connect(
    transport,
    options.handlers
      ? Effect.map(bindHandlers(options.handlers), (h): JsonRpc.PeerOptions => ({
          ...h,
          omitVersion: true,
        }))
      : { omitVersion: true },
  );
