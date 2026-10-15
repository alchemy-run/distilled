/**
 * CodexProtocol — hand-written.
 *
 * Codex's app-server speaks JSON-RPC over stdio (newline-delimited, and
 * without the `"jsonrpc": "2.0"` member — see `connection.ts`). Generated
 * operations resolve the running peer from {@link CodexConnection} and map
 * error responses to typed errors through `errorMatchers`, falling back to
 * {@link UnknownCodexError}; results and notifications that fail strict
 * response validation become {@link CodexParseError}.
 */
import * as JsonRpc from "@distilled.cloud/core/jsonrpc";
import {
  CodexInternalError,
  CodexInvalidParams,
  CodexInvalidRequest,
  CodexMethodNotFound,
  CodexParseError,
  CodexServerOverloaded,
  UnknownCodexError,
} from "./errors.ts";

/** The running app-server connection every generated operation talks through. */
export class CodexConnection extends JsonRpc.Connection<CodexConnection>()(
  "@distilled.cloud/codex/Connection",
) {}

export const CodexProtocol = JsonRpc.protocol({
  connection: CodexConnection,
  unknownError: ({ method, code, message, data }) =>
    new UnknownCodexError({ method, code, message, ...(data !== undefined ? { data } : {}) }),
  parseError: ({ body, cause }) => new CodexParseError({ body, cause }),
});

/**
 * Error channel shared by every generated Codex request: the protocol-wide
 * error codes, the unknown-error fallback, strict-mode parse failures, and
 * the transport ending.
 */
export type CodexOpError =
  | CodexServerOverloaded
  | CodexInvalidRequest
  | CodexMethodNotFound
  | CodexInvalidParams
  | CodexInternalError
  | UnknownCodexError
  | CodexParseError
  | JsonRpc.JsonRpcTransportError;
