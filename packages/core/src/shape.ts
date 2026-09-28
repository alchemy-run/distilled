/**
 * Runtime shape descriptors.
 *
 * Generated service modules describe only the parts of a Smithy shape the
 * wire protocol cannot infer from the value itself: timestamps, blobs and
 * sensitive members on the way out, HTTP bindings, renamed members, and the
 * XML facts (lists, maps, numbers, booleans) a text format cannot carry.
 * Everything else passes through untouched, so most members never appear.
 *
 * Descriptors are built lazily: every operation wraps its descriptor in a
 * function that runs on the first call, and shapes shared between operations
 * are hoisted to top-level arrow functions ({@link LazyStruct}) that resolve
 * (and memoize) on first use. Importing a service therefore allocates no
 * descriptor objects at all.
 */
import * as Redacted from "effect/Redacted";

/** A leaf transform, identified by a string constant. */
export type Leaf =
  | "ts"
  | `ts:${TimestampFormat}`
  | "blob"
  | "secret"
  | "secretBlob"
  | "stream"
  | "num"
  | "bool"
  | "str"
  | "text";

export type TimestampFormat = "date-time" | "http-date" | "epoch-seconds";

/**
 * A structure (or tagged union): only the members that need runtime data.
 *
 * Keys starting with `@` are structure facts rather than members:
 * `"@xmlns"` / `"@xmlnsPrefix"` carry an XML namespace, `"@xmlName"` the
 * element name.
 */
export interface Struct {
  readonly [member: string]: Member | string;
}

/** A hoisted structure, resolved on first use. */
export type LazyStruct = () => Struct;

export type Shape = Leaf | Struct | LazyStruct | ListShape | MapShape | Events;

/**
 * A member descriptor. `0` marks a member that needs no transform but must
 * be listed anyway (XML element order).
 */
export type Member = Shape | MemberSpec | 0;

export class ListShape {
  constructor(
    readonly element: Shape | undefined,
    /** XML element name of each item (restXml/awsQuery). */
    readonly item: string | undefined,
    /** xmlFlattened: items repeat without a wrapper element. */
    readonly flat: boolean,
  ) {}
}

export class MapShape {
  constructor(
    readonly value: Shape | undefined,
    readonly keyName: string | undefined,
    readonly valueName: string | undefined,
    readonly flat: boolean,
  ) {}
}

/** An event stream: event name → event shape. */
export class Events {
  constructor(
    readonly events: Readonly<Record<string, Shape | undefined>>,
    /** Event name → the member bound to the raw event payload (`@eventPayload`). */
    readonly payloads: Readonly<Record<string, string>>,
  ) {}
}

export interface MemberSpecFields {
  /** Nested shape descriptor. */
  readonly shape?: Shape;
  /** Wire name, when it breaks the service's naming rule. */
  readonly wire?: string;
  /** XML attribute. */
  readonly attr?: boolean;
  /** HTTP header binding. */
  readonly header?: string;
  /** HTTP query-string binding. */
  readonly query?: string;
  /** httpPrefixHeaders binding. */
  readonly prefix?: string;
  /** httpQueryParams binding (a map spread into the query string). */
  readonly queryParams?: boolean;
  /** httpPayload binding. */
  readonly payload?: boolean;
  /** httpResponseCode binding. */
  readonly status?: boolean;
  /** Auto-filled idempotency token. */
  readonly idempotency?: boolean;
  /** smithy.rules#contextParam: feeds the endpoint rules. */
  readonly context?: string;
  /** Request payload must carry a Content-Length (requiresLength). */
  readonly requiresLength?: boolean;
}

export class MemberSpec implements MemberSpecFields {
  readonly shape?: Shape;
  readonly wire?: string;
  readonly attr?: boolean;
  readonly header?: string;
  readonly query?: string;
  readonly prefix?: string;
  readonly queryParams?: boolean;
  readonly payload?: boolean;
  readonly status?: boolean;
  readonly idempotency?: boolean;
  readonly context?: string;
  readonly requiresLength?: boolean;
  constructor(fields: MemberSpecFields) {
    Object.assign(this, fields);
  }
}

// ---------------------------------------------------------------------------
// Combinators used by generated code
// ---------------------------------------------------------------------------

export const ts = "ts" as const;
export const blob = "blob" as const;
export const secret = "secret" as const;
export const secretBlob = "secretBlob" as const;
export const stream = "stream" as const;
export const num = "num" as const;
export const bool = "bool" as const;
/** A boolean member sent as its string spelling ("true"/"false"). */
export const str = "str" as const;
/** A payload that is raw text (never parsed as a document). */
export const text = "text" as const;

/** A timestamp with an explicit wire format. */
export const tsAs = (format: TimestampFormat): Leaf => `ts:${format}`;

export const list = (
  element?: Shape | 0,
  options?: { readonly item?: string; readonly flat?: boolean },
): ListShape =>
  new ListShape(element || undefined, options?.item, options?.flat === true);

export const map = (
  value?: Shape | 0,
  options?: {
    readonly key?: string;
    readonly value?: string;
    readonly flat?: boolean;
  },
): MapShape =>
  new MapShape(
    value || undefined,
    options?.key,
    options?.value,
    options?.flat === true,
  );

export const events = (
  shapes: Readonly<Record<string, Shape | 0>>,
  payloads: Readonly<Record<string, string>> = {},
): Events => {
  const resolved: Record<string, Shape | undefined> = {};
  for (const [k, v] of Object.entries(shapes)) resolved[k] = v || undefined;
  return new Events(resolved, payloads);
};

/** A member spec with several facts at once. */
export const m = (fields: MemberSpecFields): MemberSpec =>
  new MemberSpec(fields);

export const as = (wire: string, shape?: Shape): MemberSpec =>
  new MemberSpec({ wire, shape });
export const attr = (wire?: string | 0, shape?: Shape): MemberSpec =>
  new MemberSpec({ attr: true, wire: wire || undefined, shape });
export const header = (name: string, shape?: Shape): MemberSpec =>
  new MemberSpec({ header: name, shape });
export const query = (name: string, shape?: Shape): MemberSpec =>
  new MemberSpec({ query: name, shape });
export const prefixHeaders = (prefix: string): MemberSpec =>
  new MemberSpec({ prefix });
export const payload = (shape?: Shape): MemberSpec =>
  new MemberSpec({ payload: true, shape });
export const queryParams = new MemberSpec({ queryParams: true });
export const status = new MemberSpec({ status: true });
export const idempotency = new MemberSpec({ idempotency: true });
export const context = (name: string, shape?: Shape): MemberSpec =>
  new MemberSpec({ context: name, shape });

// ---------------------------------------------------------------------------
// Resolution helpers used by the protocols
// ---------------------------------------------------------------------------

const resolved = new WeakMap<LazyStruct, Struct>();

/** Resolve a (possibly lazy) shape. */
export const resolve = (shape: Shape | undefined): Shape | undefined => {
  if (typeof shape !== "function") return shape;
  let s = resolved.get(shape);
  if (s === undefined) {
    s = shape();
    resolved.set(shape, s);
  }
  return s;
};

/** The shape carried by a member (spec or bare shape). */
export const shapeOf = (
  member: Member | string | undefined,
): Shape | undefined =>
  member instanceof MemberSpec
    ? resolve(member.shape)
    : member === 0
      ? undefined
      : resolve(member as Shape);

/** The spec of a member, or undefined when the member is a bare shape. */
export const specOf = (
  member: Member | string | undefined,
): MemberSpec | undefined =>
  member instanceof MemberSpec ? member : undefined;

export const isStruct = (shape: Shape | undefined): shape is Struct =>
  typeof shape === "object" &&
  !(shape instanceof ListShape) &&
  !(shape instanceof MapShape) &&
  !(shape instanceof Events);

export const timestampFormatOf = (
  shape: Shape | undefined,
): TimestampFormat | undefined =>
  typeof shape === "string" && shape.startsWith("ts:")
    ? (shape.slice(3) as TimestampFormat)
    : undefined;

export const isTimestamp = (shape: Shape | undefined): boolean =>
  typeof shape === "string" && (shape === "ts" || shape.startsWith("ts:"));

/** Iterate a struct's members (skipping `@` structure facts). */
export const membersOf = function* (
  struct: Struct,
): Generator<readonly [name: string, member: Member]> {
  for (const key in struct) {
    if (key.charCodeAt(0) === 64 /* @ */) continue;
    yield [key, struct[key] as Member];
  }
};

// ---------------------------------------------------------------------------
// Value conversions
// ---------------------------------------------------------------------------

const unwrapRedacted = (value: unknown): unknown =>
  Redacted.isRedacted(value) ? Redacted.value(value) : value;
export { unwrapRedacted };

export const toBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
};

export const fromBase64 = (value: string): Uint8Array =>
  Uint8Array.from(atob(value), (c) => c.charCodeAt(0));

/** Serialize a timestamp in the given wire format. */
export const formatTimestamp = (
  date: Date,
  format: TimestampFormat,
): string | number => {
  switch (format) {
    case "epoch-seconds":
      // Whole seconds: some services reject fractional epoch values.
      return Math.floor(date.getTime() / 1000);
    case "http-date":
      return date.toUTCString();
    default:
      return date.toISOString();
  }
};

const EPOCH = /^-?\d+(?:\.\d+)?$/;

/** Parse a wire timestamp in any of the three Smithy formats. */
export const parseTimestamp = (value: unknown): unknown => {
  if (value instanceof Date) return value;
  if (typeof value === "number") return new Date(value * 1000);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return undefined;
    return EPOCH.test(trimmed)
      ? new Date(Number(trimmed) * 1000)
      : new Date(trimmed);
  }
  return value;
};

/** A header/query/label value in its text form. */
export const toText = (value: unknown, format: TimestampFormat): string => {
  const v = unwrapRedacted(value);
  if (v instanceof Date) return String(formatTimestamp(v, format));
  if (v instanceof Uint8Array) return toBase64(v);
  return String(v);
};

/**
 * Decode a leaf from its wire value. Text formats (XML, headers) deliver
 * numbers and booleans as strings; JSON delivers them natively.
 */
export const decodeLeaf = (leaf: Leaf, value: unknown): unknown => {
  switch (leaf) {
    case "blob":
      return typeof value === "string" ? fromBase64(value) : value;
    case "secret":
      return Redacted.make(value);
    case "secretBlob":
      return Redacted.make(
        typeof value === "string" ? fromBase64(value) : value,
      );
    case "num":
      return typeof value === "string" ? Number(value) : value;
    case "bool":
      return typeof value === "string" ? value.trim() === "true" : value;
    case "stream":
    case "str":
    case "text":
      return value;
    default:
      return parseTimestamp(value);
  }
};

// ---------------------------------------------------------------------------
// JSON documents
// ---------------------------------------------------------------------------

/**
 * Encode a value into a JSON-ready document. Dates, bytes and Redacted
 * values are recognised by their runtime type; the descriptor only supplies
 * renames, timestamp formats and string-encoded booleans. Members carrying
 * an HTTP binding are skipped (the protocol binds them elsewhere).
 */
export const encodeJson = (
  value: unknown,
  shape: Shape | undefined,
  defaultTimestamp: TimestampFormat,
): unknown => {
  const v = unwrapRedacted(value);
  if (v === null || v === undefined) return undefined;
  if (v instanceof Date) {
    return formatTimestamp(v, timestampFormatOf(shape) ?? defaultTimestamp);
  }
  if (v instanceof Uint8Array) return toBase64(v);
  if (typeof v !== "object") {
    return shape === "str" && typeof v === "boolean" ? String(v) : v;
  }
  const s = resolve(shape);
  if (Array.isArray(v)) {
    const el = s instanceof ListShape ? s.element : undefined;
    return v.map((item) => encodeJson(item, el, defaultTimestamp));
  }
  const obj = v as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  if (s instanceof MapShape) {
    for (const key in obj) {
      const item = encodeJson(obj[key], s.value, defaultTimestamp);
      if (item !== undefined) out[key] = item;
    }
    return out;
  }
  const struct = isStruct(s) ? s : undefined;
  for (const key in obj) {
    // Request structures are closed: keys the model doesn't have are dropped
    if (struct !== undefined && !(key in struct)) continue;
    const member = struct?.[key] as Member | undefined;
    const spec = specOf(member);
    if (spec !== undefined && isBound(spec)) continue;
    const item = encodeJson(obj[key], shapeOf(member), defaultTimestamp);
    if (item !== undefined) out[spec?.wire ?? key] = item;
  }
  return out;
};

/** Whether a member is bound outside the body (header, query, status…). */
export const isBound = (spec: MemberSpec): boolean =>
  spec.header !== undefined ||
  spec.query !== undefined ||
  spec.prefix !== undefined ||
  spec.queryParams === true ||
  spec.status === true;

/**
 * Decode a parsed JSON document in place. Only paths the descriptor marks
 * are visited; everything else is returned as parsed.
 */
export const decodeJson = (
  value: unknown,
  shape: Shape | undefined,
): unknown => {
  if (value === null || value === undefined || shape === undefined) {
    return value;
  }
  const s = resolve(shape);
  if (typeof s === "string") return decodeLeaf(s, value);
  if (s instanceof ListShape) {
    if (!Array.isArray(value) || s.element === undefined) return value;
    for (let i = 0; i < value.length; i++) {
      value[i] = decodeJson(value[i], s.element);
    }
    return value;
  }
  if (s instanceof MapShape) {
    if (typeof value !== "object" || s.value === undefined) return value;
    const obj = value as Record<string, unknown>;
    for (const key in obj) obj[key] = decodeJson(obj[key], s.value);
    return value;
  }
  if (!isStruct(s) || typeof value !== "object") return value;
  const obj = value as Record<string, unknown>;
  for (const [name, member] of membersOf(s)) {
    const spec = specOf(member);
    if (spec !== undefined && isBound(spec)) continue;
    const wire = spec?.wire ?? name;
    if (!(wire in obj)) continue;
    const decoded = decodeJson(obj[wire], shapeOf(member));
    if (wire !== name) delete obj[wire];
    obj[name] = decoded;
  }
  return value;
};
