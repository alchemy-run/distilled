/**
 * ACP error types.
 *
 * A failed ACP request is a JSON-RPC error response `{ code, message, data }`.
 * ACP defines its codes once for the whole protocol (the schema's
 * `ErrorCode`), not per method — any request may come back `auth_required`
 * or `resource_not_found` — so the typed classes below are COMMON errors:
 * every generated request lists them (`commonErrorClasses` in
 * `scripts/generate.ts`) and core's JSON-RPC runtime picks the one whose
 * `errorMatchers` code equals the response's `code`. A code nothing matches
 * becomes {@link UnknownAcpError}.
 *
 * Matched classes carry the wire `code` and `message`; the JSON-RPC `data`
 * member arrives as `body`.
 *
 * `-32700` (parse error) and `-32600` (invalid request) mean the peer could
 * not read our frame at all — a transport-level bug, not something a caller
 * handles — so they stay on {@link UnknownAcpError}.
 */
import * as Category from "@distilled.cloud/core/category";
import * as Schema from "effect/Schema";
import * as T from "./traits.ts";

const fields = {
  /** The JSON-RPC error `code`. */
  code: Schema.Number,
  message: Schema.String,
  /** The JSON-RPC error `data`, when the agent sent one. */
  body: Schema.optional(Schema.Unknown),
};

/** `-32000` — authentication is required before this operation can run. Call `authenticate`. */
export class AcpAuthRequired extends T.applyErrorMatchers(
  Schema.TaggedError<AcpAuthRequired>()("AcpAuthRequired", fields).pipe(Category.withAuthError),
  [{ code: -32000 }],
) {}

/** `-32002` — a resource the request named (a session, a file, …) was not found. */
export class AcpResourceNotFound extends T.applyErrorMatchers(
  Schema.TaggedError<AcpResourceNotFound>()("AcpResourceNotFound", fields).pipe(
    Category.withNotFoundError,
  ),
  [{ code: -32002 }],
) {}

/** `-32800` — the request was cancelled (`$/cancel_request`, shutdown, or resource limits). */
export class AcpRequestCancelled extends T.applyErrorMatchers(
  Schema.TaggedError<AcpRequestCancelled>()("AcpRequestCancelled", fields).pipe(
    Category.withAbortedError,
  ),
  [{ code: -32800 }],
) {}

/** `-32602` — the agent rejected the request's params. */
export class AcpInvalidParams extends T.applyErrorMatchers(
  Schema.TaggedError<AcpInvalidParams>()("AcpInvalidParams", fields).pipe(
    Category.withBadRequestError,
  ),
  [{ code: -32602 }],
) {}

/**
 * `-32601` — the agent does not implement this method (an optional
 * capability such as `session/list` or `session/load` it did not advertise).
 */
export class AcpMethodNotFound extends T.applyErrorMatchers(
  Schema.TaggedError<AcpMethodNotFound>()("AcpMethodNotFound", fields).pipe(
    Category.withBadRequestError,
  ),
  [{ code: -32601 }],
) {}

/** `-32603` — the agent failed internally while handling the request. */
export class AcpInternalError extends T.applyErrorMatchers(
  Schema.TaggedError<AcpInternalError>()("AcpInternalError", fields).pipe(Category.withServerError),
  [{ code: -32603 }],
) {}

/** Unknown ACP error — an error response whose code no typed class matches. */
export class UnknownAcpError extends Schema.TaggedError<UnknownAcpError>()("UnknownAcpError", {
  /** The wire method of the failed request. */
  method: Schema.String,
  code: Schema.Number,
  message: Schema.String,
  data: Schema.optional(Schema.Unknown),
}).pipe(Category.withServerError) {}

/** A response or notification that did not match its schema (strict mode only). */
export class AcpParseError extends Schema.TaggedError<AcpParseError>()("AcpParseError", {
  body: Schema.Unknown,
  cause: Schema.Unknown,
}).pipe(Category.withParseError) {}
