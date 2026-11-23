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
 * read (wrapped in `Redacted` whole when its type can hold a sensitive
 * value), and the rest of the response still converts. Exact decoding throws
 * on the first mismatch instead; `"closed"` exact decoding also throws on a
 * key the schema does not model (`ResponseValidation.strict`). Only members
 * the schema declares are kept.
 *
 * Which types hold a secret, and how logs and error messages show them, is
 * core's rule (`@distilled.cloud/core/sensitive`).
 */
import { setOwnKey } from "@distilled.cloud/core/plain-values";
import { encodeKeysKey, type Node } from "@distilled.cloud/core/schema-lite-impl";
import {
  holdsSensitive as holdsSensitiveAst,
  REDACTED,
  redactPlain,
} from "@distilled.cloud/core/sensitive";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import type { Operation } from "../client/operation.ts";
import { ParseError } from "../errors.ts";
import { codecSymbol, isValidDate, type CodecKind } from "../lite.ts";
import { fromBase64, toBase64 } from "./base64.ts";
import { formatDateTime } from "./timestamp.ts";

/** A value that does not fit its schema. */
export class CodecError extends Error {
  /** The ` at [key]` suffixes the failure gained on the way out, innermost first. */
  path = "";
  constructor(
    /** What the schema expected, e.g. `string`. */
    readonly expected: string,
    actual: unknown,
  ) {
    super(`Expected ${expected}, got ${show(actual)}`);
  }
  /** The message without the value found, for a type that can hold a secret. */
  get withheld(): string {
    return `Expected ${this.expected}, got "${REDACTED}"${this.path}`;
  }
}

const show = (u: unknown): string => {
  if (u === undefined) return "undefined";
  if (typeof u === "string") return JSON.stringify(u);
  if (u instanceof Date) return `Date(${isValidDate(u) ? u.toISOString() : "Invalid"})`;
  if (Array.isArray(u)) return "an array";
  if (typeof u === "object" && u !== null) return "an object";
  return String(u);
};

const fail = (expected: string, actual: unknown): never => {
  throw new CodecError(expected, actual);
};

/** Prefix a member's failure with its key, as Effect's issue paths did. */
const within = (e: unknown, key: PropertyKey): unknown => {
  if (e instanceof CodecError) {
    const at = ` at [${JSON.stringify(key)}]`;
    e.message += at;
    e.path += at;
  }
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

/** Whether a value of the type `n` can hold a `sensitive` value (core's rule). */
export const holdsSensitive = (n: Node): boolean => holdsSensitiveAst(n as AST.AST);

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
        if (!m.optional && v[wire ? m.wire : m.name] == null) return false;
      return true;
    case "Arrays":
      return Array.isArray(v);
    case "Union":
      return n.types!.some((t) => fits(t, v, wire));
    default:
      return primitive(n, v);
  }
};

/**
 * Whether a wire value has the shape of `n` (for a union, of one of its
 * members): the members it requires are present. Event-stream decoding uses
 * it to tell a modeled event that does not match from an unmodeled one.
 */
export const fitsWire = (n: Node, v: unknown): boolean => fits(n, v, true);

const keyedUnions = /*@__PURE__*/ new WeakMap<Node, ReadonlyMap<string, Node> | null>();

/**
 * A Smithy union's members by key: each member of `n` is a struct with one
 * required member whose wire key is its type key. `null` for any other union.
 */
const keyedUnion = (n: Node): ReadonlyMap<string, Node> | null => {
  let keyed = keyedUnions.get(n);
  if (keyed !== undefined) return keyed;
  const byKey = new Map<string, Node>();
  for (const t of n.types!) {
    const members =
      t._tag === "Objects" && !codecOf(t) && !t.indexSignatures?.length ? shapeOf(t).members : [];
    const m = members[0];
    if (members.length !== 1 || m!.optional || m!.wire !== m!.name) {
      keyedUnions.set(n, null);
      return null;
    }
    byKey.set(m!.name, t);
  }
  keyedUnions.set(n, (keyed = byKey));
  return keyed;
};

/**
 * The member of a Smithy union that `v` sets, found by its one non-null key
 * (DynamoDB's `AttributeValue`: `{ S }`, `{ N }`, `{ M }`, ...). The other
 * members require a key `v` does not have, so none of them fits. `undefined`
 * when the key does not decide it: `{}`, two keys, or a key not modeled.
 */
const keyedMember = (n: Node, v: unknown): Node | undefined => {
  if (!isRecord(v)) return undefined;
  const keyed = keyedUnion(n);
  if (keyed === null) return undefined;
  let member: Node | undefined;
  for (const key in v) {
    if (v[key] == null) continue;
    const t = keyed.get(key);
    if (t === undefined || member !== undefined) return undefined;
    member = t;
  }
  return member;
};

/** Whether `null` is a value of the type `n` (a `@sparse` list element or map value). */
const acceptsNull = (n: Node): boolean => {
  switch (n._tag) {
    case "Suspend":
      return acceptsNull(n.thunk!());
    case "Union":
      return n.types!.some(acceptsNull);
    case "Null":
      return true;
    default:
      return false;
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

/**
 * The wire form of `v`, a value of the type `n` declares. Throws
 * {@link CodecError}. A `binary` wire (CBOR) has a type for bytes, dates and
 * every number: blobs stay `Uint8Array`, timestamps `Date`, and NaN and the
 * infinities numbers.
 */
export const encode = (n: Node, v: unknown, binary = false): unknown => {
  const codec = codecOf(n);
  if (codec !== undefined) return encodeCodec(codec, n, v, binary);
  switch (n._tag) {
    case "Suspend":
      return encode(n.thunk!(), v, binary);
    case "Objects":
      return encodeObjects(n, v, binary);
    case "Arrays":
      return convertArray(n, v, binary ? encodeBinary : encode);
    case "Union":
      return encodeUnion(n, v, binary);
    case "Number":
      // JSON has no NaN or Infinity: AWS sends "NaN", "Infinity", "-Infinity".
      if (typeof v === "number" && !Number.isFinite(v) && !binary) return String(v);
      return primitive(n, v) ? v : fail(expected(n), v);
    default:
      return primitive(n, v) ? v : fail(expected(n), v);
  }
};

const encodeBinary = (n: Node, v: unknown): unknown => encode(n, v, true);

/** The strings AWS sends for the numbers JSON cannot write. */
const nonFinite = (v: unknown): v is "NaN" | "Infinity" | "-Infinity" =>
  v === "NaN" || v === "Infinity" || v === "-Infinity";

const encodeCodec = (codec: CodecKind, n: Node, v: unknown, binary: boolean): unknown => {
  if (codec === "sensitive")
    return encode(innerOf(n), Redacted.isRedacted(v) ? Redacted.value(v) : v, binary);
  if (codec === "blob")
    return v instanceof Uint8Array ? (binary ? v : toBase64(v)) : fail("a Uint8Array", v);
  if (!isValidDate(v)) return fail("a valid Date", v);
  if (binary) return v;
  // Whole seconds: some services reject fractional epoch values (IoT
  // SiteWise GetAssetPropertyAggregates: "The date can only be in seconds.").
  if (codec === "epoch-seconds") return Math.floor(v.getTime() / 1000);
  return codec === "http-date" ? v.toUTCString() : formatDateTime(v);
};

const encodeObjects = (n: Node, v: unknown, binary: boolean): unknown => {
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
      out[m.wire] = encode(m.type, x, binary);
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
        setOwnKey(
          out,
          key,
          x === undefined && isOptional(index.type) ? undefined : encode(index.type, x, binary),
        );
      } catch (e) {
        throw within(e, key);
      }
    }
  return out;
};

const encodeUnion = (n: Node, v: unknown, binary: boolean): unknown => {
  const types = n.types!;
  if (isOptional(n) && types.length === 2)
    return v === undefined ? undefined : encode(types[0]!, v, binary);
  // The one member that fits: encoding it alone throws what the loop would.
  const member = keyedMember(n, v);
  if (member !== undefined) return encode(member, v, binary);
  let first: unknown;
  for (const t of types) {
    if (!fits(t, v, false)) continue;
    try {
      return encode(t, v, binary);
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
 * How {@link decode} treats a mismatch: `false` keeps the value as read,
 * `true` throws, `"closed"` also throws on a key the schema does not model.
 */
export type Exactness = boolean | "closed";

/** A decoder for one schema node in one {@link Exactness}. */
type Decoder = (v: unknown) => unknown;

/**
 * Decoders by node, one table per exactness (lenient, exact, closed). Each
 * node's decoder is built on first use and reads what the node declares
 * (its codec, members, keys, union members) once, so a value only pays for
 * converting itself.
 */
const decoders = [
  /*@__PURE__*/ new WeakMap<Node, Decoder>(),
  /*@__PURE__*/ new WeakMap<Node, Decoder>(),
  /*@__PURE__*/ new WeakMap<Node, Decoder>(),
];

const decoderOf = (n: Node, exact: Exactness): Decoder => {
  const table = decoders[exact === "closed" ? 2 : exact ? 1 : 0]!;
  let d = table.get(n);
  if (d === undefined) table.set(n, (d = buildDecoder(n, exact)));
  return d;
};

/**
 * The typed form of `v`, a value read off the wire for the type `n`
 * declares. Lenient by default: a value that does not fit is kept as read.
 * With `exact`, a mismatch throws {@link CodecError} instead.
 */
export const decode = (n: Node, v: unknown, exact: Exactness = false): unknown =>
  decoderOf(n, exact)(v);

/**
 * `v` kept as read by a lenient decode: `Redacted` whole when `n` can hold a
 * secret, which is decided on first use.
 */
const readAs = (n: Node): Decoder => {
  let sensitive: boolean | undefined;
  return (v) =>
    v !== undefined && v !== null && (sensitive ??= holdsSensitive(n)) ? Redacted.make(v) : v;
};

/** {@link primitive} for `n` as one test, or `undefined` when `n` accepts anything. */
const leafCheck = (n: Node): ((v: unknown) => boolean) | undefined => {
  switch (n._tag) {
    case "String":
      return (v) => typeof v === "string";
    case "Boolean":
      return (v) => typeof v === "boolean";
    case "Literal":
    case "Null":
    case "Undefined":
    case "Void":
    case "Declaration":
      return (v) => primitive(n, v);
    default:
      return undefined;
  }
};

const buildDecoder = (n: Node, exact: Exactness): Decoder => {
  const codec = codecOf(n);
  if (codec !== undefined) return codecDecoder(codec, n, exact);
  switch (n._tag) {
    case "Suspend": {
      // Resolved on first call: a recursive schema refers back to itself here.
      let inner: Decoder | undefined;
      return (v) => (inner ??= decoderOf(n.thunk!(), exact))(v);
    }
    case "Objects":
      return objectsDecoder(n, exact);
    case "Arrays":
      return arraysDecoder(n, exact);
    case "Union":
      return unionDecoder(n, exact);
    case "Number": {
      const what = expected(n);
      return (v) =>
        nonFinite(v) ? Number(v) : !exact || typeof v === "number" ? v : fail(what, v);
    }
    default: {
      if (!exact) return (v) => v;
      const what = expected(n);
      const is = leafCheck(n);
      return is === undefined ? (v) => v : (v) => (is(v) ? v : fail(what, v));
    }
  }
};

const codecDecoder = (codec: CodecKind, n: Node, exact: Exactness): Decoder => {
  if (codec === "sensitive") {
    const inner = decoderOf(innerOf(n), exact);
    return (v) => Redacted.make(inner(v));
  }
  if (codec === "blob")
    return (v) => {
      // A binary wire (CBOR) reads bytes as bytes.
      if (v instanceof Uint8Array) return v;
      if (typeof v !== "string") return exact ? fail("a base64 string", v) : v;
      try {
        return fromBase64(v);
      } catch {
        // Not base64: the same failure as a non-string.
        return exact ? fail("a base64 string", v) : v;
      }
    };
  const epoch = codec === "epoch-seconds";
  const what = epoch ? "epoch seconds" : "a date string";
  return (v) => {
    // A binary wire (CBOR) reads a timestamp as a `Date`.
    if (v instanceof Date && isValidDate(v)) return v;
    const date = epoch
      ? typeof v === "number"
        ? new Date(v * 1000)
        : undefined
      : typeof v === "string"
        ? new Date(v)
        : undefined;
    if (date && isValidDate(date)) return date;
    return exact ? fail(what, v) : v;
  };
};

const arraysDecoder = (n: Node, exact: Exactness): Decoder => {
  const asRead = readAs(n);
  const elements = (n.elements ?? []).map((t) => decoderOf(t, exact));
  const restNode = n.rest?.[0];
  const rest = restNode && decoderOf(restNode, exact);
  // A list that is not `@sparse` cannot hold null: drop its nulls.
  const dropNulls = restNode !== undefined && !acceptsNull(restNode);
  return (input) => {
    if (!Array.isArray(input)) return exact ? fail("an array", input) : asRead(input);
    const v = dropNulls && input.includes(null) ? input.filter((x) => x !== null) : input;
    // Copied once an element decodes to another value; until then the list as read.
    let out: unknown[] | undefined = v === input ? undefined : v;
    for (let i = 0; i < v.length; i++) {
      const d = elements[i] ?? rest;
      if (!d) continue;
      const x = v[i];
      let y: unknown;
      try {
        y = d(x);
      } catch (e) {
        throw within(e, i);
      }
      if (y === x) continue;
      out ??= v.slice();
      out[i] = y;
    }
    return out ?? v;
  };
};

/** A map value left out of the result (a null in a map that is not `@sparse`). */
const absent = Symbol();

const objectsDecoder = (n: Node, exact: Exactness): Decoder => {
  const asRead = readAs(n);
  const shape = shapeOf(n);
  const members = shape.members.map((m) => ({
    name: m.name,
    wire: m.wire,
    required: !m.optional,
    decode: decoderOf(m.type, exact),
  }));
  const indexNode = n.indexSignatures?.[0]?.type;
  const index = indexNode && decoderOf(indexNode, exact);
  // A map that is not `@sparse` has no null values.
  const indexNulls = indexNode !== undefined && acceptsNull(indexNode);
  const closed = exact === "closed" && members.length > 0;
  if (index && members.length === 0)
    // A map: the value as read until one of its values decodes to another.
    return (v) => {
      if (!isRecord(v)) return exact ? fail("an object", v) : asRead(v);
      let out: Record<string, unknown> | undefined;
      const keys = Object.keys(v);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]!;
        const x = v[key];
        let y: unknown;
        if (x === null && !indexNulls) y = absent;
        else
          try {
            y = index(x);
          } catch (e) {
            throw within(e, key);
          }
        if (y === x && out === undefined) continue;
        if (out === undefined) {
          out = {};
          for (let j = 0; j < i; j++) setOwnKey(out, keys[j]!, v[keys[j]!]);
        }
        if (y !== absent) setOwnKey(out, key, y);
      }
      return out ?? v;
    };
  return (v) => {
    if (!isRecord(v)) return exact ? fail("an object", v) : asRead(v);
    const out: Record<string, unknown> = {};
    for (let i = 0; i < members.length; i++) {
      const m = members[i]!;
      const x = v[m.wire];
      try {
        // JSON sends null for an absent member.
        if (x == null) {
          if (exact && m.required) fail("a value", x);
          continue;
        }
        out[m.name] = m.decode(x);
      } catch (e) {
        throw within(e, m.wire);
      }
    }
    if (index)
      for (const key of Object.keys(v)) {
        if (shape.wireKeys.has(key)) continue;
        const x = v[key];
        if (x === null && !indexNulls) continue;
        try {
          setOwnKey(out, key, index(x));
        } catch (e) {
          throw within(e, key);
        }
      }
    else if (closed)
      for (const key of Object.keys(v))
        if (!shape.wireKeys.has(key) && v[key] != null)
          throw within(
            new CodecError("no value (the schema does not model this key)", v[key]),
            key,
          );
    return out;
  };
};

const unionDecoder = (n: Node, exact: Exactness): Decoder => {
  const types = n.types!;
  if (isOptional(n) && types.length === 2) {
    const inner = decoderOf(types[0]!, exact);
    return (v) => (v === undefined ? undefined : inner(v));
  }
  const asRead = readAs(n);
  // A member is tried exactly, so a lenient decode can fall back to the next.
  const memberExact = exact === "closed" ? "closed" : true;
  const exactOf = types.map((t) => decoderOf(t, memberExact));
  const lenientOf = exact ? undefined : types.map((t) => decoderOf(t, false));
  const keyed = keyedUnion(n);
  // For each key, the member's decoder and its one member's decoder.
  const byKey =
    keyed &&
    new Map(
      [...keyed]
        .map(
          ([key, t]) =>
            [
              key,
              decoderOf(t, memberExact),
              decoderOf(shapeOf(t).members[0]!.type, memberExact),
            ] as const,
        )
        .map(([key, struct, value]) => [key, { struct, value }] as const),
    );
  const what = types.map(expected).join(" | ");
  return (v) => {
    if (byKey && isRecord(v)) {
      // A Smithy union value sets one key, and that key names the member.
      let member: { struct: Decoder; value: Decoder } | undefined;
      let setKey = "";
      let keys = 0;
      let decided = true;
      for (const key in v) {
        keys++;
        if (v[key] == null) continue;
        const d = byKey.get(key);
        if (d === undefined || member !== undefined) {
          decided = false;
          break;
        }
        member = d;
        setKey = key;
      }
      if (decided && member !== undefined)
        try {
          if (keys > 1) return member.struct(v);
          // `{ [setKey]: x }` alone: what the member's struct decoder returns, without the copy.
          const x = v[setKey];
          let y: unknown;
          try {
            y = member.value(x);
          } catch (e) {
            throw within(e, setKey);
          }
          return y === x ? v : { [setKey]: y };
        } catch (e) {
          // Lenient: the loops below keep the value converted as far as it fits.
          if (exact) throw e;
        }
    }
    let first: unknown;
    for (let i = 0; i < types.length; i++) {
      if (!fits(types[i]!, v, true)) continue;
      try {
        return exactOf[i]!(v);
      } catch (e) {
        first ??= e;
      }
    }
    if (exact) {
      if (first) throw first;
      return fail(what, v);
    }
    // Lenient: convert as the first member that looks right, else keep as read.
    for (let i = 0; i < types.length; i++) if (fits(types[i]!, v, true)) return lenientOf![i]!(v);
    return asRead(v);
  };
};

//#endregion

/** The message of a failed encode or decode, without the value it found when `withhold`. */
export const decodeFailure = (e: unknown, withhold: boolean): string => {
  if (withhold) return e instanceof CodecError ? e.withheld : REDACTED;
  return e instanceof Error ? e.message : String(e);
};

/** A 2xx body to quote in an error message: `[REDACTED]` when the output can hold a secret. */
export const outputBody = (operation: Operation<any, any, any>, body: string): string =>
  redactPlain(operation.output.ast, body);

/**
 * An error body to quote in an error message: `[REDACTED]` when one of the
 * errors the operation or its service declares can hold a secret.
 */
export const errorBody = (operation: Operation<any, any, any>, body: string): string =>
  [...(operation.errors ?? []), ...(operation.serviceErrors ?? [])].some((e) =>
    holdsSensitive(e.ast),
  )
    ? REDACTED
    : body;

const encodeFailure = (ast: Node, e: unknown): ParseError =>
  new ParseError({ message: decodeFailure(e, holdsSensitive(ast)) });

/**
 * An operation input encoder for protocols: encode failures become
 * `ParseError`, without the value found when the input can hold a secret.
 */
export const inputEncoder =
  (ast: Node, binary = false) =>
  (input: unknown): Effect.Effect<unknown, ParseError> => {
    try {
      return Effect.succeed(encode(ast, input, binary));
    } catch (e) {
      return Effect.fail(encodeFailure(ast, e));
    }
  };

/** {@link inputEncoder} as a plain function: encode failures throw `ParseError`. */
export const inputEncoderSync =
  (ast: Node, binary = false) =>
  (input: unknown): unknown => {
    try {
      return encode(ast, input, binary);
    } catch (e) {
      throw encodeFailure(ast, e);
    }
  };
