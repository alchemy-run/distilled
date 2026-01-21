/**
 * LSP module for TypeScript error surfacing.
 *
 * Provides a pure Effect implementation of LSP (Language Server Protocol)
 * for getting type errors and linting diagnostics from:
 * - typescript-language-server (type checking)
 * - oxlint --lsp (fast linting)
 */

export {
  JsonRpcParseError,
  JsonRpcProtocolError,
  make as makeJsonRpc,
  type JsonRpcConnection,
} from "./jsonrpc.ts";

export {
  DiagnosticSeverity,
  makeLSPClient,
  type Diagnostic,
  type LSPClient,
  type Position,
  type Range,
} from "./client.ts";

export {
  DefaultServers,
  OxlintServer,
  TypeScriptServer,
  type ServerConfig,
} from "./servers.ts";

export { LSPManager, LSPManagerLive } from "./manager.ts";
