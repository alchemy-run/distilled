/**
 * `schema-lite` with Effect Schema's types, for hand-written modules.
 *
 * Generated services import `schema-lite`, whose builders are typed `any`
 * because every generated schema is cast to its declared interface. Hand-
 * written error classes have no such cast: built from untyped builders,
 * their fields declare as `any` (`ValidationError.message: any`), which
 * erases the field types for every consumer. This module exposes the same
 * lite runtime values with the Effect Schema types, so `S.TaggedError` field
 * types infer as they did with Effect Schema.
 */
import type * as S from "effect/Schema";
import * as L from "./schema-lite-impl.ts";

export type * from "effect/Schema";

export const optional = L.optional as unknown as typeof S.optional;
export const Struct = L.Struct as unknown as typeof S.Struct;
export const suspend = L.suspend as unknown as typeof S.suspend;
export const Array = L.Array as unknown as typeof S.Array;
export const Record = L.Record as unknown as typeof S.Record;
export const Union = L.Union as unknown as typeof S.Union;
export const Literal = L.Literal as unknown as typeof S.Literal;
export const Literals = L.Literals as unknown as typeof S.Literals;
export const NullOr = L.NullOr as unknown as typeof S.NullOr;
export const Tuple = L.Tuple as unknown as typeof S.Tuple;
export const declare = L.declare as unknown as typeof S.declare;
export const instanceOf = L.instanceOf as unknown as typeof S.instanceOf;
export const Redacted = L.Redacted as unknown as typeof S.Redacted;

export const String = L.String as unknown as typeof S.String;
export const Number = L.Number as unknown as typeof S.Number;
export const Int = L.Number as unknown as typeof S.Int;
export const Boolean = L.Boolean as unknown as typeof S.Boolean;
export const Date = L.Date as unknown as typeof S.Date;
export const Duration = L.Duration as unknown as typeof S.Duration;
export const Unknown = L.Unknown as unknown as typeof S.Unknown;
export const Null = L.Null as unknown as typeof S.Null;
export const Void = L.Void as unknown as typeof S.Void;
export const Any = L.Any as unknown as typeof S.Any;

export const TaggedError: L.TaggedErrorFactory = L.TaggedError;
export type { TaggedErrorClass, TaggedErrorFactory } from "./schema-lite-impl.ts";
