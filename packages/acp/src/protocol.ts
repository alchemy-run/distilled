/**
 * ACP's JSON-RPC protocol: the connection tag every generated operation
 * requires, plus the constructors for the SDK's fallback and parse errors.
 *
 * ACP is JSON-RPC 2.0 over newline-delimited JSON on the agent process's
 * stdio. This SDK is the CLIENT side of the protocol: it calls the agent
 * (`initialize`, `session/new`, `session/prompt`, …) and answers the agent's
 * callbacks (`session/request_permission`, `fs/*`, `terminal/*`, …) through
 * typed handlers. See `./connection.ts` for the layers that open a
 * connection.
 */
import * as JsonRpc from "@distilled.cloud/core/jsonrpc";
import {
  AcpAuthRequired,
  AcpInternalError,
  AcpInvalidParams,
  AcpMethodNotFound,
  AcpParseError,
  AcpRequestCancelled,
  AcpResourceNotFound,
  UnknownAcpError,
} from "./errors.ts";

/**
 * The ACP major protocol version this SDK speaks — pass it as
 * `initialize({ protocolVersion })`. The agent answers with the version it
 * chose; anything else means the two sides cannot talk.
 */
export const ACP_PROTOCOL_VERSION = 1;

/** The running ACP connection (a JSON-RPC peer talking to one agent). */
export class AcpConnection extends JsonRpc.Connection<AcpConnection>()(
  "@distilled.cloud/acp/Connection",
) {}

/** ACP's JSON-RPC protocol — referenced by every generated operation. */
export const AcpProtocol = JsonRpc.protocol({
  connection: AcpConnection,
  unknownError: ({ method, code, message, data }) =>
    new UnknownAcpError({ method, code, message, ...(data !== undefined ? { data } : {}) }),
  parseError: ({ body, cause }) => new AcpParseError({ body, cause }),
});

/**
 * Errors every ACP request can fail with: the protocol-wide error codes,
 * the unknown-code fallback, a strict-mode parse failure, and the transport
 * ending (agent exited, stdio closed).
 */
export type AcpOpError =
  | AcpAuthRequired
  | AcpResourceNotFound
  | AcpRequestCancelled
  | AcpInvalidParams
  | AcpMethodNotFound
  | AcpInternalError
  | UnknownAcpError
  | AcpParseError
  | JsonRpc.JsonRpcTransportError;
