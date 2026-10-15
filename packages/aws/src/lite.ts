/**
 * AWS value types on lite schemas: timestamps, blobs and sensitive values.
 *
 * A generated AWS schema is a tree of lite nodes (`@distilled.cloud/core/schema-lite`).
 * Most values cross the wire unchanged. These ones do not, so their node
 * carries a {@link codecSymbol} annotation naming the conversion, and an
 * `encoding` link to the wire-side node (the shape of Effect's encoding
 * chain, which the protocol helpers in `util/ast.ts` follow to find the wire
 * type). `util/codec.ts` applies the conversions.
 *
 * Kept free of `traits.ts` imports: `sensitive.ts` and `errors.ts` use it,
 * and the protocols import those.
 */
import {
  fromNode,
  Number as LiteNumber,
  String as LiteString,
  type Lite,
} from "@distilled.cloud/core/schema-lite-impl";
import * as Redacted from "effect/Redacted";

/** Annotation naming how a value converts between the wire and the type. */
export const codecSymbol = "distilled-aws/codec" as const;

/**
 * - `epoch-seconds`: Date <-> number of seconds
 * - `http-date`: Date <-> RFC 7231 string
 * - `date-string`: Date <-> ISO 8601 string
 * - `blob`: Uint8Array <-> base64 string
 * - `sensitive`: Redacted <-> the value of `encoding[0].to`
 */
export type CodecKind = "epoch-seconds" | "http-date" | "date-string" | "blob" | "sensitive";

export const isValidDate = (u: unknown): u is Date => u instanceof Date && !isNaN(u.getTime());
const isBytes = (u: unknown): boolean => u instanceof Uint8Array;

/** A timestamp sent as `kind` on the wire. */
export const timestamp = (
  kind: "epoch-seconds" | "http-date" | "date-string",
  annotations?: Record<string, unknown>,
): Lite =>
  fromNode({
    _tag: "Declaration",
    typeParameters: [],
    annotations: { [codecSymbol]: kind, ...annotations },
    encoding: [{ to: kind === "epoch-seconds" ? LiteNumber.ast : LiteString.ast }],
    check: isValidDate,
  });

/** Binary data sent as base64 (smithy blob without @streaming). */
export const blob = (annotations?: Record<string, unknown>): Lite =>
  fromNode({
    _tag: "Declaration",
    typeParameters: [],
    annotations: { [codecSymbol]: "blob", ...annotations },
    encoding: [{ to: LiteString.ast }],
    check: isBytes,
  });

/**
 * A value sent as `schema` on the wire and held as `Redacted` in responses.
 * Requests accept the plain value or a `Redacted` one.
 */
export const sensitive = (schema: Lite, identifier: string): Lite =>
  fromNode({
    _tag: "Union",
    types: [
      schema.ast,
      fromNode({
        _tag: "Declaration",
        typeParameters: [schema.ast],
        check: Redacted.isRedacted,
      }).ast,
    ],
    annotations: { identifier, [codecSymbol]: "sensitive" },
    encoding: [{ to: schema.ast }],
  });
