/**
 * Connect to an ACP agent over a transport.
 *
 * An ACP agent (`opencode acp`, `gemini --experimental-acp`,
 * `claude-code-acp`, …) speaks newline-delimited JSON-RPC. This SDK only
 * speaks the protocol: you hand it the endpoint — a spawned process's stdio
 * via `JsonRpc.fromStreams`, a socket via `JsonRpc.fromSocket`, or one end of
 * `JsonRpc.memoryPair` in tests — and it never spawns or hosts anything.
 *
 * Inbound methods (the agent calling the client: permission prompts, file
 * system, terminals, elicitation) are answered by the typed `handlers`; a
 * request with no handler is answered `MethodNotFound`, so advertise in
 * `initialize`'s `clientCapabilities` only what you implement.
 */
import * as JsonRpc from "@distilled.cloud/core/jsonrpc";
import * as Effect from "effect/Effect";
import type * as Scope from "effect/Scope";
import { handlers as bindHandlers, type InboundHandlers } from "./services/acp.ts";

export interface ConnectOptions<R = never> {
  /** Typed implementations of the methods the agent calls on the client. */
  readonly handlers?: InboundHandlers<R>;
}

/**
 * Open an ACP connection over `transport`. The connection lives as long as
 * the enclosing scope; provide it as {@link AcpConnection} to call the
 * typed operations.
 *
 * @example
 * ```ts
 * const peer = yield* Acp.connect(transport, {
 *   handlers: {
 *     sessionRequestPermission: ({ options }) =>
 *       Effect.succeed({ outcome: { outcome: "selected", optionId: options[0]!.optionId } }),
 *   },
 * });
 * yield* Acp.initialize({ protocolVersion: Acp.ACP_PROTOCOL_VERSION }).pipe(
 *   Effect.provideService(Acp.AcpConnection, peer),
 * );
 * ```
 */
export const connect = <R = never>(
  transport: JsonRpc.Transport,
  options: ConnectOptions<R> = {},
): Effect.Effect<JsonRpc.Peer, never, Scope.Scope | R> =>
  JsonRpc.connect(transport, options.handlers ? bindHandlers(options.handlers) : undefined);
