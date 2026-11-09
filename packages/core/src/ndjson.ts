/**
 * Newline-delimited JSON response bodies (`application/x-ndjson`): the
 * `com.distilled#ndjsonStream` member trait.
 *
 * An output member with this trait receives the response body as a
 * `Stream` with one item per line, as the server writes them. The call
 * succeeds when the response headers arrive; a non-2xx response still fails
 * the call with the operation's typed error. The protocol decodes each line
 * like a 2xx body (wire-to-TS key mapping, strict validation, sensitive
 * values as `Redacted`) against the frame schema the trait carries, and a
 * line that is not JSON or does not match fails the stream with the SDK's
 * parse error.
 *
 * The line splitting lives here, behind the trait value, so only programs
 * that call an NDJSON operation bundle `effect/Stream`.
 */
import type * as Effect from "effect/Effect";
import type * as AST from "effect/SchemaAST";
import * as Stream from "effect/Stream";
import { makeAnnotation } from "./trait.ts";

export const ndjsonStreamSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/ndjson-stream");

/** The value of a `NdjsonStream(frame)` annotation. */
export interface NdjsonStreamTrait {
  /** The schema of one line. */
  readonly frame: { readonly ast: AST.AST };
  /** The body's non-empty lines, each run through `decode`. */
  readonly frames: <E1, E2>(
    body: Stream.Stream<Uint8Array, E1>,
    decode: (line: string) => Effect.Effect<unknown, E2>,
  ) => Stream.Stream<unknown, E1 | E2>;
}

const frames: NdjsonStreamTrait["frames"] = (body, decode) =>
  body.pipe(
    Stream.decodeText(),
    Stream.splitLines,
    Stream.filter((line) => line.trim().length > 0),
    Stream.mapEffect(decode),
  );

/**
 * Marks the output member that receives an `application/x-ndjson` body as a
 * stream of `frame` values (mirrors `com.distilled#ndjsonStream`).
 */
export const NdjsonStream = (frame: { readonly ast: AST.AST }) =>
  makeAnnotation(ndjsonStreamSymbol, { frame, frames } satisfies NdjsonStreamTrait);
