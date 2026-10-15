/**
 * Value conversion between the types a generated AWS schema declares and
 * their wire form, by walking the schema's lite AST.
 *
 * `encode` turns an operation input into its wire form before a protocol
 * serializes it: struct keys renamed by `encodeKeys`, timestamps to the
 * format their `codecSymbol` names, blobs to base64, `Redacted` values
 * unwrapped. It checks what it walks the way Effect Schema's encoder did
 * (required members present, primitives of the declared type, a union
 * member that fits), and throws {@link CodecError} otherwise.
 *
 * `decode` is the reverse, for values a protocol read off the wire. Lenient
 * decoding never fails: a value that does not fit its schema is kept as
 * read, and the rest of the response still converts. Exact decoding throws
 * on the first mismatch instead. Only members the schema declares are kept.
 */
import { encodeKeysKey, type Node } from "@distilled.cloud/core/schema-lite-impl";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { ParseError } from "../errors.ts";
import { codecSymbol, isValidDate, type CodecKind } from "../lite.ts";
import { toBase64 } from "./base64.ts";

export class CodecError extends Error {}

const show = (u: unknown): string => {
  if (u === undefined) return "undefined";
  if (typeof u === "string") return JSON.stringify(u);
  if (u instanceof Date) return `Date(${isValidDate(u) ? u.toISOString() : "Invalid"})`;
  if (Array.isArray(u)) return "an array";
  if (typeof u === "object" && u !== null) return "an object";
  return String(u);
};

const fail = (expected: string, actual: unknown): never => {
  throw new CodecError(`Expected ${expected}, got ${show(actual)}`);
};

/** Prefix a member's failure with its key, as Effect's issue paths did. */
const within = (e: unknown, key: PropertyKey): unknown => {
  if (e instanceof CodecError) e.message = `${e.message} at [${JSON.stringify(key)}]`;
  return e;
};

interface Member {
  /** Key in the type. */
  readonly name: string;
  /** Key on the wire (`encodeKeys`). */
  readonly wire: string;
  readonly type: Node;
  readonly optional: boolean;
}

interface Shape {
  readonly members: ReadonlyArray<Member>;
  /** Keys the members take, so a record index skips them. */
  readonly wireKeys: ReadonlySet<string>;
  readonly typeKeys: ReadonlySet<string>;
}

const shapes = /*@__PURE__*/ new WeakMap<Node, Shape>();

const isOptional = (n: Node): boolean => n._tag === "Union" && n.context?.isOptional === true;

const shapeOf = (n: Node): Shape => {
  let shape = shapes.get(n);
  if (!shape) {
    const mapping = n.annotations?.[encodeKeysKey] as Record<string, string> | undefined;
    const members = (n.propertySignatures ?? []).map((p) => {
      const name = String(p.name);
      return {
        name,
        wire: mapping && Object.hasOwn(mapping, name) ? mapping[name]! : name,
        type: p.type,
        optional: isOptional(p.type),
      };
    });
    shape = {
      members,
      wireKeys: new Set(members.map((m) => m.wire)),
      typeKeys: new Set(members.map((m) => m.name)),
    };
    shapes.set(n, shape);
  }
  return shape;
};

const isRecord = (u: unknown): u is Record<string, unknown> =>
  typeof u === "object" && u !== null && !Array.isArray(u);

const codecOf = (n: Node): CodecKind | undefined =>
  n.annotations?.[codecSymbol] as CodecKind | undefined;

/** The wire-side node of a `sensitive` value. */
const innerOf = (n: Node): Node => n.encoding![0]!.to;

/** Whether `v` is a value of a leaf type (anything for types this does not check). */
const primitive = (n: Node, v: unknown): boolean => {
  switch (n._tag) {
    case "String":
      return typeof v === "string";
    case "Number":
      return typeof v === "number";
    case "Boolean":
      return typeof v === "boolean";
    case "Literal":
      return v === n.literal;
    case "Null":
      return v === null;
    case "Undefined":
    case "Void":
      return v === undefined;
    case "Declaration":
      return n.check ? n.check(v) : true;
    default:
      return true;
  }
};

/**
 * Whether `v` can be this union member, judged shallowly: the primitive
 * kind, or a struct's required members (by wire or type key). Members that
 * pass are then converted in order, and the first that succeeds wins.
 */
const fits = (n: Node, v: unknown, wire: boolean): boolean => {
  if (codecOf(n)) return true;
  switch (n._tag) {
    case "Suspend":
      return fits(n.thunk!(), v, wire);
    case "Objects":
      if (!isRecord(v)) return false;
      for (const m of shapeOf(n).members)
        if (!m.optional && v[wire ? m.wire : m.name] === undefined) return false;
      return true;
    case "Arrays":
      return Array.isArray(v);
    case "Union":
      return n.types!.some((t) => fits(t, v, wire));
    default:
      return primitive(n, v);
  }
};

const expected = (n: Node): string =>
  n._tag === "Literal" ? JSON.stringify(n.literal) : n._tag.toLowerCase();

const convertArray = (n: Node, v: unknown, f: (n: Node, v: unknown) => unknown): unknown => {
  if (!Array.isArray(v)) return fail("an array", v);
  const rest = n.rest?.[0];
  const elements = n.elements ?? [];
  const out = new Array(v.length);
  for (let i = 0; i < v.length; i++) {
    const t = elements[i] ?? rest;
    try {
      out[i] = t ? f(t, v[i]) : v[i];
    } catch (e) {
      throw within(e, i);
    }
  }
  return out;
};

//#region encode

/** The wire form of `v`, a value of the type `n` declares. Throws {@link CodecError}. */
export const encode = (n: Node, v: unknown): unknown => {
  const codec = codecOf(n);
  if (codec !== undefined) return encodeCodec(codec, n, v);
  switch (n._tag) {
    case "Suspend":
      return encode(n.thunk!(), v);
    case "Objects":
      return encodeObjects(n, v);
    case "Arrays":
      return convertArray(n, v, encode);
    case "Union":
      return encodeUnion(n, v);
    default:
      return primitive(n, v) ? v : fail(expected(n), v);
  }
};

const encodeCodec = (codec: CodecKind, n: Node, v: unknown): unknown => {
  if (codec === "sensitive")
    return encode(innerOf(n), Redacted.isRedacted(v) ? Redacted.value(v) : v);
  if (codec === "blob") return v instanceof Uint8Array ? toBase64(v) : fail("a Uint8Array", v);
  if (!isValidDate(v)) return fail("a valid Date", v);
  // Whole seconds: some services reject fractional epoch values (IoT
  // SiteWise GetAssetPropertyAggregates: "The date can only be in seconds.").
  if (codec === "epoch-seconds") return Math.floor(v.getTime() / 1000);
  return codec === "http-date" ? v.toUTCString() : v.toISOString();
};

const encodeObjects = (n: Node, v: unknown): unknown => {
  if (!isRecord(v)) return fail("an object", v);
  const shape = shapeOf(n);
  const out: Record<string, unknown> = {};
  for (const m of shape.members) {
    const x = v[m.name];
    try {
      if (x === undefined) {
        if (!m.optional) fail("a value", x);
        continue;
      }
      out[m.wire] = encode(m.type, x);
    } catch (e) {
      throw within(e, m.name);
    }
  }
  const index = n.indexSignatures?.[0];
  if (index)
    for (const key of Object.keys(v)) {
      if (shape.typeKeys.has(key)) continue;
      const x = v[key];
      try {
        out[key] = x === undefined && isOptional(index.type) ? undefined : encode(index.type, x);
      } catch (e) {
        throw within(e, key);
      }
    }
  return out;
};

const encodeUnion = (n: Node, v: unknown): unknown => {
  const types = n.types!;
  if (isOptional(n) && types.length === 2)
    return v === undefined ? undefined : encode(types[0]!, v);
  let first: unknown;
  for (const t of types) {
    if (!fits(t, v, false)) continue;
    try {
      return encode(t, v);
    } catch (e) {
      first ??= e;
    }
  }
  if (first) throw first;
  return fail(types.map(expected).join(" | "), v);
};

//#endregion

//#region decode

/**
 * The typed form of `v`, a value read off the wire for the type `n`
 * declares. Lenient by default: a value that does not fit is kept as read.
 * With `exact`, a mismatch throws {@link CodecError} instead.
 */
export const decode = (n: Node, v: unknown, exact = false): unknown => {
  const codec = codecOf(n);
  if (codec !== undefined) return decodeCodec(codec, n, v, exact);
  switch (n._tag) {
    case "Suspend":
      return decode(n.thunk!(), v, exact);
    case "Objects":
      return decodeObjects(n, v, exact);
    case "Arrays":
      return Array.isArray(v) || exact ? convertArray(n, v, (t, x) => decode(t, x, exact)) : v;
    case "Union":
      return decodeUnion(n, v, exact);
    default:
      return !exact || primitive(n, v) ? v : fail(expected(n), v);
  }
};

const decodeCodec = (codec: CodecKind, n: Node, v: unknown, exact: boolean): unknown => {
  if (codec === "sensitive") return Redacted.make(decode(innerOf(n), v, exact));
  if (codec === "blob") {
    if (typeof v === "string") {
      try {
        return Uint8Array.from(atob(v), (c) => c.charCodeAt(0));
      } catch {}
    }
    return exact ? fail("a base64 string", v) : v;
  }
  const date =
    codec === "epoch-seconds"
      ? typeof v === "number"
        ? new Date(v * 1000)
        : undefined
      : typeof v === "string"
        ? new Date(v)
        : undefined;
  if (date && isValidDate(date)) return date;
  return exact ? fail(codec === "epoch-seconds" ? "epoch seconds" : "a date string", v) : v;
};

const decodeObjects = (n: Node, v: unknown, exact: boolean): unknown => {
  if (!isRecord(v)) return exact ? fail("an object", v) : v;
  const shape = shapeOf(n);
  const out: Record<string, unknown> = {};
  for (const m of shape.members) {
    const x = v[m.wire];
    try {
      if (x === undefined) {
        if (exact && !m.optional) fail("a value", x);
        continue;
      }
      out[m.name] = decode(m.type, x, exact);
    } catch (e) {
      throw within(e, m.wire);
    }
  }
  const index = n.indexSignatures?.[0];
  if (index)
    for (const key of Object.keys(v)) {
      if (shape.wireKeys.has(key)) continue;
      const x = v[key];
      try {
        out[key] = decode(index.type, x, exact);
      } catch (e) {
        throw within(e, key);
      }
    }
  return out;
};

const decodeUnion = (n: Node, v: unknown, exact: boolean): unknown => {
  const types = n.types!;
  if (isOptional(n) && types.length === 2)
    return v === undefined ? undefined : decode(types[0]!, v, exact);
  let first: unknown;
  for (const t of types) {
    if (!fits(t, v, true)) continue;
    try {
      return decode(t, v, true);
    } catch (e) {
      first ??= e;
    }
  }
  if (exact) {
    if (first) throw first;
    return fail(types.map(expected).join(" | "), v);
  }
  // Lenient: convert as the first member that looks right, else keep as read.
  for (const t of types) if (fits(t, v, true)) return decode(t, v);
  return v;
};

//#endregion

/** An operation input encoder for protocols: encode failures become `ParseError`. */
export const inputEncoder =
  (ast: Node) =>
  (input: unknown): Effect.Effect<unknown, ParseError> => {
    try {
      return Effect.succeed(encode(ast, input));
    } catch (e) {
      return Effect.fail(new ParseError({ message: e instanceof Error ? e.message : String(e) }));
    }
  };

/** {@link inputEncoder} as a plain function: encode failures throw `ParseError`. */
export const inputEncoderSync =
  (ast: Node) =>
  (input: unknown): unknown => {
    try {
      return encode(ast, input);
    } catch (e) {
      throw new ParseError({ message: e instanceof Error ? e.message : String(e) });
    }
  };
