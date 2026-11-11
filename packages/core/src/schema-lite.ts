/**
 * Effect Schema's API surface for generated code, backed by lite schemas
 * (see `schema-lite-impl.ts`): the same names and types as
 * `@distilled.cloud/core/schema`, without importing Effect Schema at runtime.
 */
import type * as S from "effect/Schema";
import * as L from "./schema-lite-impl.ts";

export type * from "effect/Schema";
export type AnyFn = (...args: any[]) => any;

export const optional: AnyFn = L.optional;
export const Struct: AnyFn = L.Struct;
export const StructWithRest: AnyFn = L.StructWithRest;
export const suspend: AnyFn = L.suspend;
export const Array: AnyFn = L.Array;
export const Record: AnyFn = L.Record;
export const Union: AnyFn = L.Union;
export const Literal: AnyFn = L.Literal;
export const Literals: AnyFn = L.Literals;
export const NullOr: AnyFn = L.NullOr;
export const Tuple: AnyFn = L.Tuple;
export const encodeKeys: AnyFn = L.encodeKeys;
export const declare: typeof S.declare = L.declare as unknown as typeof S.declare;
export const instanceOf: AnyFn = L.instanceOf;
export const Redacted: AnyFn = L.Redacted;

export const String: any = L.String;
export const Number: any = L.Number;
export const Int: any = L.Number;
export const Boolean: any = L.Boolean;
export const Date: any = L.Date;
export const Duration: any = L.Duration;
export const Unknown: any = L.Unknown;
export const Null: any = L.Null;
export const Void: any = L.Void;
export const Any: any = L.Any;

export const TaggedError = L.TaggedError as unknown as L.TaggedErrorFactory;
export type { TaggedErrorClass, TaggedErrorFactory } from "./schema-lite-impl.ts";

/** Lite `chunks.at`: generated services name this module `__L`. */
export const at = L.at;
export { liteKey, toEffect } from "./schema-lite-impl.ts";
