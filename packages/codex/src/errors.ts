/**
 * Codex app-server error types — hand-written.
 *
 * A JSON-RPC error response becomes the operation's typed error when one of
 * its error classes' `errorMatchers` matches the error `code`, and
 * {@link UnknownCodexError} otherwise. The app-server answers every method
 * with the same small set of codes (`codex-rs/app-server/src/error_code.rs`),
 * so those are typed once here and appended to every request's error list by
 * the generator (`commonErrorClasses`), the way REST SDKs share their HTTP
 * status classes.
 */
import * as Category from "@distilled.cloud/core/category";
import * as Schema from "effect/Schema";
import * as T from "./traits.ts";

export { JsonRpcTransportError, HandlerError, ErrorCode } from "@distilled.cloud/core/jsonrpc";

const fields = {
  message: Schema.String,
  data: Schema.optional(Schema.Unknown),
};

/**
 * `-32001` — the app-server's request queue is saturated
 * ("Server overloaded; retry later."). Safe to retry with backoff.
 */
export class CodexServerOverloaded extends T.applyErrorMatchers(
  Schema.TaggedError<CodexServerOverloaded>()("CodexServerOverloaded", fields).pipe(
    Category.withThrottlingError,
  ),
  [{ code: -32001 }],
) {}

/**
 * `-32600` — the request is not valid in the connection's current state:
 * sent before `initialize`, a repeated `initialize`, the server is draining,
 * or the method rejected the request (the message says which).
 */
export class CodexInvalidRequest extends T.applyErrorMatchers(
  Schema.TaggedError<CodexInvalidRequest>()("CodexInvalidRequest", fields).pipe(
    Category.withBadRequestError,
  ),
  [{ code: -32600 }],
) {}

/** `-32601` — the app-server does not implement the method (older `codex` binary). */
export class CodexMethodNotFound extends T.applyErrorMatchers(
  Schema.TaggedError<CodexMethodNotFound>()("CodexMethodNotFound", fields).pipe(
    Category.withBadRequestError,
  ),
  [{ code: -32601 }],
) {}

/** `-32602` — the params failed the app-server's validation. */
export class CodexInvalidParams extends T.applyErrorMatchers(
  Schema.TaggedError<CodexInvalidParams>()("CodexInvalidParams", fields).pipe(
    Category.withBadRequestError,
  ),
  [{ code: -32602 }],
) {}

/** `-32603` — the app-server failed while handling the request. */
export class CodexInternalError extends T.applyErrorMatchers(
  Schema.TaggedError<CodexInternalError>()("CodexInternalError", fields).pipe(
    Category.withServerError,
  ),
  [{ code: -32603 }],
) {}

/** A JSON-RPC error response no typed class matched. */
export class UnknownCodexError extends Schema.TaggedError<UnknownCodexError>()(
  "UnknownCodexError",
  {
    method: Schema.String,
    code: Schema.Number,
    message: Schema.String,
    data: Schema.optional(Schema.Unknown),
  },
).pipe(Category.withServerError) {}

/** A result or notification that failed its schema (strict response validation only). */
export class CodexParseError extends Schema.TaggedError<CodexParseError>()("CodexParseError", {
  body: Schema.Unknown,
  cause: Schema.Unknown,
}).pipe(Category.withParseError) {}
