/**
 * Protobuf binary wire codec over generated descriptors.
 *
 * Proto-sourced SDKs keep their schemas in proto3 JSON shape (camelCase wire
 * names, 64-bit integers as strings, bytes as base64, enums by name,
 * `google.protobuf.Timestamp` as RFC 3339). Servers that only speak binary
 * gRPC need the same values as protobuf bytes, so this module transcodes
 * between the two using a descriptor table the converter emits next to the
 * services (`src/descriptors.ts`): field numbers, scalar kinds, message and
 * enum references.
 *
 * Decoding follows proto3: a field without presence (a plain scalar, enum,
 * `repeated` or `map` field) reads as its default when the wire omits it
 * (`""`, `0`, `"0"` for 64-bit integers, `false`, the enum's zero value,
 * `[]`, `{}`), so the JSON always carries it. Fields with presence (marked
 * `optional`, message fields and `oneof` members) are omitted when absent.
 * Enum numbers map back to names, and unknown fields are skipped.
 */

/** A scalar or composite field kind. */
export type FieldKind =
  | "double"
  | "float"
  | "int32"
  | "int64"
  | "uint32"
  | "uint64"
  | "sint32"
  | "sint64"
  | "fixed32"
  | "fixed64"
  | "sfixed32"
  | "sfixed64"
  | "bool"
  | "string"
  | "bytes"
  | "enum"
  | "message"
  | "map";

/** `[keyKind, valueKind, valueRef?]` for a `map<K, V>` field. */
export type MapRef = readonly [key: FieldKind, value: FieldKind, ref?: string];

/**
 * One field: `[number, jsonName, kind, ref?, repeated?, presence?]`. `ref`
 * names the message or enum for `message`/`enum` kinds and is a
 * {@link MapRef} for `map`; `repeated` is `1` for repeated fields. `presence`
 * is set for a field whose absence is observable: `1` for a proto3
 * `optional` field, and `n >= 2` for the members of the message's oneof `n`
 * (setting one member clears the others). Message fields always have
 * presence.
 */
export type FieldDescriptor = readonly [
  number: number,
  jsonName: string,
  kind: FieldKind,
  ref?: string | MapRef | 0,
  repeated?: 0 | 1,
  presence?: number,
];

export interface ProtoDescriptors {
  /** Message full name -> fields. */
  readonly messages: Readonly<Record<string, ReadonlyArray<FieldDescriptor>>>;
  /** Enum full name -> value name -> number. */
  readonly enums: Readonly<Record<string, Readonly<Record<string, number>>>>;
  /**
   * gRPC method path (`/<package>.<Service>/<Method>`) ->
   * `[requestMessage, responseMessage, serverStream?]`. A server-streaming
   * method's JSON output is `{ items: [response, ...] }`.
   */
  readonly methods: Readonly<
    Record<string, readonly [request: string, response: string, serverStream?: 0 | 1]>
  >;
}

/** A value the descriptors can't encode (a wrong type for its field). */
export class ProtobufEncodeError extends Error {
  readonly _tag = "ProtobufEncodeError";
}

/** Bytes that aren't valid protobuf for the expected message. */
export class ProtobufDecodeError extends Error {
  readonly _tag: string = "ProtobufDecodeError";
}

/**
 * Valid protobuf whose value proto3 JSON can't represent: a Timestamp
 * outside years 0001 to 9999, or a Duration beyond 10,000 years.
 */
export class ProtobufJsonRangeError extends ProtobufDecodeError {
  override readonly _tag = "ProtobufJsonRangeError";
}

// ============================================================================
// Writer
// ============================================================================

class Writer {
  buf = new Uint8Array(64);
  pos = 0;

  ensure(n: number): void {
    if (this.pos + n <= this.buf.length) return;
    let size = this.buf.length * 2;
    while (size < this.pos + n) size *= 2;
    const next = new Uint8Array(size);
    next.set(this.buf.subarray(0, this.pos));
    this.buf = next;
  }

  byte(b: number): void {
    this.ensure(1);
    this.buf[this.pos++] = b;
  }

  bytes(b: Uint8Array): void {
    this.ensure(b.length);
    this.buf.set(b, this.pos);
    this.pos += b.length;
  }

  /** Unsigned varint of a non-negative number below 2^53. */
  uvarint(n: number): void {
    while (n > 0x7f) {
      this.byte((n % 0x80) | 0x80);
      n = Math.floor(n / 0x80);
    }
    this.byte(n);
  }

  /** Varint of a 64-bit value (two's complement for negatives). */
  varint64(n: bigint): void {
    let v = BigInt.asUintN(64, n);
    while (v > 0x7fn) {
      this.byte(Number(v & 0x7fn) | 0x80);
      v >>= 7n;
    }
    this.byte(Number(v));
  }

  tag(field: number, wire: number): void {
    this.uvarint(field * 8 + wire);
  }

  fixed32(n: number): void {
    this.ensure(4);
    new DataView(this.buf.buffer, this.buf.byteOffset).setUint32(this.pos, n >>> 0, true);
    this.pos += 4;
  }

  fixed64(n: bigint): void {
    this.ensure(8);
    new DataView(this.buf.buffer, this.buf.byteOffset).setBigUint64(
      this.pos,
      BigInt.asUintN(64, n),
      true,
    );
    this.pos += 8;
  }

  float(n: number): void {
    this.ensure(4);
    new DataView(this.buf.buffer, this.buf.byteOffset).setFloat32(this.pos, n, true);
    this.pos += 4;
  }

  double(n: number): void {
    this.ensure(8);
    new DataView(this.buf.buffer, this.buf.byteOffset).setFloat64(this.pos, n, true);
    this.pos += 8;
  }

  /** Length-delimited payload written by `f` (length-prefixed afterwards). */
  delimited(f: (w: Writer) => void): void {
    const inner = new Writer();
    f(inner);
    this.uvarint(inner.pos);
    this.bytes(inner.finish());
  }

  finish(): Uint8Array {
    return this.buf.subarray(0, this.pos);
  }
}

// ============================================================================
// Reader
// ============================================================================

class Reader {
  pos = 0;
  readonly view: DataView;
  constructor(readonly buf: Uint8Array) {
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  }

  get done(): boolean {
    return this.pos >= this.buf.length;
  }

  /** A varint of at most ten bytes, truncated to 64 bits. */
  varint64(): bigint {
    let result = 0n;
    let shift = 0n;
    for (let i = 0; i < 10; i++) {
      if (this.pos >= this.buf.length) throw new ProtobufDecodeError("truncated varint");
      const b = this.buf[this.pos++]!;
      result |= BigInt(b & 0x7f) << shift;
      if ((b & 0x80) === 0) return BigInt.asUintN(64, result);
      shift += 7n;
    }
    throw new ProtobufDecodeError("varint longer than ten bytes");
  }

  uvarint(): number {
    // Fast path for small values (tags, lengths).
    let result = 0;
    let mul = 1;
    for (let i = 0; i < 8; i++) {
      if (this.pos >= this.buf.length) throw new ProtobufDecodeError("truncated varint");
      const b = this.buf[this.pos++]!;
      result += (b & 0x7f) * mul;
      if ((b & 0x80) === 0) return result;
      mul *= 0x80;
    }
    this.pos -= 8;
    return Number(this.varint64());
  }

  take(n: number): Uint8Array {
    if (this.pos + n > this.buf.length) throw new ProtobufDecodeError("truncated field");
    const out = this.buf.subarray(this.pos, this.pos + n);
    this.pos += n;
    return out;
  }

  delimited(): Uint8Array {
    return this.take(this.uvarint());
  }

  fixed32(): number {
    const v = this.view.getUint32(this.take(4).byteOffset - this.buf.byteOffset, true);
    return v;
  }

  fixed64(): bigint {
    return this.view.getBigUint64(this.take(8).byteOffset - this.buf.byteOffset, true);
  }

  float(): number {
    return this.view.getFloat32(this.take(4).byteOffset - this.buf.byteOffset, true);
  }

  double(): number {
    return this.view.getFloat64(this.take(8).byteOffset - this.buf.byteOffset, true);
  }

  /** A field tag: its number (1 to 2^29 - 1) and wire type (0 to 5). */
  tag(): readonly [num: number, wire: number] {
    const start = this.pos;
    const tag = Number(this.varint64());
    // A tag is a 32-bit varint: at most five bytes.
    if (this.pos - start > 5) throw new ProtobufDecodeError("overlong field tag");
    const num = Math.floor(tag / 8);
    const wire = tag & 7;
    if (num < 1 || num > MAX_FIELD_NUMBER) {
      throw new ProtobufDecodeError(`invalid field number ${num}`);
    }
    if (wire > 5) throw new ProtobufDecodeError(`invalid wire type ${wire}`);
    return [num, wire];
  }

  /** Skip an unknown field's value; a group is skipped to its end tag. */
  skip(wire: number, num: number): void {
    switch (wire) {
      case 0:
        this.varint64();
        return;
      case 1:
        this.take(8);
        return;
      case 2:
        this.take(this.uvarint());
        return;
      case 3:
        for (;;) {
          if (this.done) throw new ProtobufDecodeError("unterminated group");
          const [n, w] = this.tag();
          if (w === 4) {
            if (n !== num) throw new ProtobufDecodeError("mismatched end group");
            return;
          }
          this.skip(w, n);
        }
      case 4:
        throw new ProtobufDecodeError("unexpected end group");
      case 5:
        this.take(4);
        return;
      default:
        throw new ProtobufDecodeError(`invalid wire type ${wire}`);
    }
  }
}

const MAX_FIELD_NUMBER = 536_870_911;

// ============================================================================
// Shared helpers
// ============================================================================

const textEncoder = /*@__PURE__*/ new TextEncoder();
const textDecoder = /*@__PURE__*/ new TextDecoder();

const wireTypeOf = (kind: FieldKind): number => {
  switch (kind) {
    case "double":
    case "fixed64":
    case "sfixed64":
      return 1;
    case "float":
    case "fixed32":
    case "sfixed32":
      return 5;
    case "string":
    case "bytes":
    case "message":
    case "map":
      return 2;
    default:
      return 0;
  }
};

const isPackable = (kind: FieldKind): boolean =>
  kind !== "string" && kind !== "bytes" && kind !== "message" && kind !== "map";

/** A JSON number's text: what a quoted number may be. */
const JSON_NUMBER = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;

const INT_RANGES: Partial<Record<FieldKind | "enum", readonly [bigint, bigint]>> = {
  int32: [-(2n ** 31n), 2n ** 31n - 1n],
  sint32: [-(2n ** 31n), 2n ** 31n - 1n],
  sfixed32: [-(2n ** 31n), 2n ** 31n - 1n],
  enum: [-(2n ** 31n), 2n ** 31n - 1n],
  uint32: [0n, 2n ** 32n - 1n],
  fixed32: [0n, 2n ** 32n - 1n],
  int64: [-(2n ** 63n), 2n ** 63n - 1n],
  sint64: [-(2n ** 63n), 2n ** 63n - 1n],
  sfixed64: [-(2n ** 63n), 2n ** 63n - 1n],
  uint64: [0n, 2n ** 64n - 1n],
  fixed64: [0n, 2n ** 64n - 1n],
};

/**
 * An integer field's value: a bigint, an integral number, or a string of
 * one (proto3 JSON quotes 64-bit integers, and allows `"1e5"`). Fails when
 * it isn't an integer or is out of the kind's range.
 */
const toBigInt = (value: unknown, field: string, kind: FieldKind | "enum"): bigint => {
  let n: bigint | undefined;
  if (typeof value === "bigint") n = value;
  else if (typeof value === "number" && Number.isInteger(value)) n = BigInt(value);
  else if (typeof value === "string" && /^-?\d+$/.test(value)) n = BigInt(value);
  else if (
    typeof value === "string" &&
    JSON_NUMBER.test(value) &&
    Number.isInteger(Number(value))
  ) {
    n = BigInt(Number(value));
  }
  if (n === undefined) {
    throw new ProtobufEncodeError(`${field}: expected an integer, got ${JSON.stringify(value)}`);
  }
  const range = INT_RANGES[kind];
  if (range && (n < range[0] || n > range[1])) {
    throw new ProtobufEncodeError(`${field}: ${n} is out of range for ${kind}`);
  }
  return n;
};

const FLOAT_MAX = 3.4028234663852886e38;

/**
 * A float or double field's value: a number, a JSON number's text, or
 * `"NaN"` / `"Infinity"` / `"-Infinity"`. Fails for a finite value too large
 * for the kind.
 */
const toNumber = (value: unknown, field: string, kind: "float" | "double"): number => {
  let n: number | undefined;
  if (typeof value === "number") n = value;
  else if (value === "NaN") n = Number.NaN;
  else if (value === "Infinity") n = Number.POSITIVE_INFINITY;
  else if (value === "-Infinity") n = Number.NEGATIVE_INFINITY;
  else if (typeof value === "string" && JSON_NUMBER.test(value)) {
    n = Number(value);
    if (!Number.isFinite(n)) {
      throw new ProtobufEncodeError(`${field}: ${value} is out of range for ${kind}`);
    }
  }
  if (n === undefined) {
    throw new ProtobufEncodeError(`${field}: expected a number, got ${JSON.stringify(value)}`);
  }
  if (kind === "float" && Number.isFinite(n) && Math.abs(n) > FLOAT_MAX) {
    throw new ProtobufEncodeError(`${field}: ${n} is out of range for float`);
  }
  return n;
};

const base64ToBytes = (value: string): Uint8Array => {
  const normal = value.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(normal);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

const bytesToBase64 = (bytes: Uint8Array): string => {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
};

const toBytes = (value: unknown, field: string): Uint8Array => {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (typeof value === "string") return base64ToBytes(value);
  throw new ProtobufEncodeError(`${field}: expected bytes (base64 string or Uint8Array)`);
};

// ============================================================================
// Encode (proto3 JSON -> binary)
// ============================================================================

const writeScalar = (
  d: ProtoDescriptors,
  w: Writer,
  kind: FieldKind,
  ref: string | undefined,
  value: unknown,
  field: string,
): void => {
  switch (kind) {
    case "double":
    case "float":
      return kind === "double"
        ? w.double(toNumber(value, field, kind))
        : w.float(toNumber(value, field, kind));
    case "int32":
    case "int64":
    case "uint32":
    case "uint64":
      return w.varint64(toBigInt(value, field, kind));
    case "sint32":
    case "sint64": {
      const n = toBigInt(value, field, kind);
      return w.varint64(n >= 0n ? n << 1n : (-n << 1n) - 1n);
    }
    case "fixed32":
    case "sfixed32":
      return w.fixed32(Number(BigInt.asUintN(32, toBigInt(value, field, kind))));
    case "fixed64":
    case "sfixed64":
      return w.fixed64(toBigInt(value, field, kind));
    case "bool":
      if (typeof value !== "boolean") {
        throw new ProtobufEncodeError(`${field}: expected a boolean, got ${JSON.stringify(value)}`);
      }
      return w.byte(value ? 1 : 0);
    case "enum": {
      if (typeof value === "number") return w.varint64(toBigInt(value, field, "enum"));
      const values = ref ? d.enums[ref] : undefined;
      const n = typeof value === "string" ? values?.[value] : undefined;
      if (n === undefined) {
        throw new ProtobufEncodeError(`${field}: unknown enum value ${JSON.stringify(value)}`);
      }
      return w.varint64(BigInt(n));
    }
    default:
      throw new ProtobufEncodeError(`${field}: ${kind} is not a scalar`);
  }
};

const writeValue = (
  d: ProtoDescriptors,
  w: Writer,
  num: number,
  kind: FieldKind,
  ref: string | MapRef | 0 | undefined,
  value: unknown,
  field: string,
): void => {
  switch (kind) {
    case "string":
      if (typeof value !== "string") {
        throw new ProtobufEncodeError(`${field}: expected a string, got ${JSON.stringify(value)}`);
      }
      w.tag(num, 2);
      return w.delimited((inner) => inner.bytes(textEncoder.encode(value)));
    case "bytes":
      w.tag(num, 2);
      return w.delimited((inner) => inner.bytes(toBytes(value, field)));
    case "message":
      w.tag(num, 2);
      return w.delimited((inner) => writeMessageInto(d, inner, ref as string, value, field));
    default:
      w.tag(num, wireTypeOf(kind));
      return writeScalar(d, w, kind, typeof ref === "string" ? ref : undefined, value, field);
  }
};

// --- well-known types --------------------------------------------------------

/** Timestamp range: 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. */
const MIN_TIMESTAMP = -62_135_596_800n;
const MAX_TIMESTAMP = 253_402_300_799n;
/** Duration range: +/-10,000 years. */
const MAX_DURATION = 315_576_000_000n;

const RFC3339 =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,9}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;

const parseTimestamp = (value: unknown, field: string): { seconds: bigint; nanos: number } => {
  if (value instanceof Date) {
    const ms = value.getTime();
    return { seconds: BigInt(Math.floor(ms / 1000)), nanos: (((ms % 1000) + 1000) % 1000) * 1e6 };
  }
  const m = typeof value === "string" ? RFC3339.exec(value) : null;
  if (!m)
    throw new ProtobufEncodeError(
      `${field}: expected an RFC 3339 timestamp, got ${JSON.stringify(value)}`,
    );
  const [, y, mo, dd, hh, mi, ss, frac, sign, oh, om] = m;
  const date = new Date(0);
  date.setUTCFullYear(Number(y), Number(mo) - 1, Number(dd));
  date.setUTCHours(Number(hh), Number(mi), Number(ss), 0);
  if (
    date.getUTCFullYear() !== Number(y) ||
    date.getUTCMonth() !== Number(mo) - 1 ||
    date.getUTCDate() !== Number(dd) ||
    Number(hh) > 23 ||
    Number(mi) > 59 ||
    Number(ss) > 59
  ) {
    throw new ProtobufEncodeError(`${field}: invalid timestamp ${JSON.stringify(value)}`);
  }
  const offset = sign ? (sign === "-" ? -1 : 1) * (Number(oh) * 3600 + Number(om) * 60) : 0;
  const seconds = BigInt(Math.floor(date.getTime() / 1000) - offset);
  if (seconds < MIN_TIMESTAMP || seconds > MAX_TIMESTAMP) {
    throw new ProtobufEncodeError(`${field}: timestamp ${value} is out of range`);
  }
  return { seconds, nanos: frac ? Number(frac.padEnd(9, "0")) : 0 };
};

const formatTimestamp = (seconds: bigint, nanos: number): string => {
  const date = new Date(Number(seconds) * 1000);
  const year = String(date.getUTCFullYear()).padStart(4, "0");
  const iso = date
    .toISOString()
    .replace(/^[+-]?\d+/, year)
    .replace(/\.\d{3}Z$/, "");
  return `${iso}${fraction(nanos)}Z`;
};

/** A Duration's proto3 JSON (`"-1.5s"`), or a number of seconds. */
const parseDuration = (value: unknown, field: string): { seconds: bigint; nanos: number } => {
  if (typeof value === "number" && Number.isFinite(value)) {
    const whole = Math.trunc(value);
    return { seconds: BigInt(whole), nanos: Math.round((value - whole) * 1e9) };
  }
  const m = typeof value === "string" ? /^(-)?(\d+)(?:\.(\d{1,9}))?s$/.exec(value) : null;
  if (!m)
    throw new ProtobufEncodeError(
      `${field}: expected a duration like "1.5s", got ${JSON.stringify(value)}`,
    );
  const sign = m[1] ? -1n : 1n;
  const seconds = sign * BigInt(m[2]!);
  if (seconds > MAX_DURATION || seconds < -MAX_DURATION) {
    throw new ProtobufEncodeError(`${field}: duration ${value} is out of range`);
  }
  const nanos = m[3] ? Number(m[3].padEnd(9, "0")) : 0;
  return { seconds, nanos: m[1] ? -nanos : nanos };
};

const writeStructValue = (w: Writer, value: unknown): void => {
  // google.protobuf.Value: null_value=1 (enum), number_value=2, string_value=3,
  // bool_value=4, struct_value=5, list_value=6.
  if (value === null || value === undefined) {
    w.tag(1, 0);
    w.byte(0);
  } else if (typeof value === "number") {
    w.tag(2, 1);
    w.double(value);
  } else if (typeof value === "string") {
    w.tag(3, 2);
    w.delimited((inner) => inner.bytes(textEncoder.encode(value)));
  } else if (typeof value === "boolean") {
    w.tag(4, 0);
    w.byte(value ? 1 : 0);
  } else if (Array.isArray(value)) {
    w.tag(6, 2);
    w.delimited((list) => {
      for (const item of value) {
        list.tag(1, 2);
        list.delimited((inner) => writeStructValue(inner, item));
      }
    });
  } else {
    w.tag(5, 2);
    w.delimited((inner) => writeStruct(inner, value as Record<string, unknown>));
  }
};

const writeStruct = (w: Writer, value: Record<string, unknown>): void => {
  // google.protobuf.Struct: map<string, Value> fields = 1.
  for (const [key, item] of Object.entries(value)) {
    w.tag(1, 2);
    w.delimited((entry) => {
      entry.tag(1, 2);
      entry.delimited((inner) => inner.bytes(textEncoder.encode(key)));
      entry.tag(2, 2);
      entry.delimited((inner) => writeStructValue(inner, item));
    });
  }
};

const WRAPPER_KINDS: Record<string, FieldKind> = {
  "google.protobuf.DoubleValue": "double",
  "google.protobuf.FloatValue": "float",
  "google.protobuf.Int64Value": "int64",
  "google.protobuf.UInt64Value": "uint64",
  "google.protobuf.Int32Value": "int32",
  "google.protobuf.UInt32Value": "uint32",
  "google.protobuf.BoolValue": "bool",
  "google.protobuf.StringValue": "string",
  "google.protobuf.BytesValue": "bytes",
};

/** Write a well-known type's fields; `false` when `name` isn't one. */
const writeWellKnown = (
  d: ProtoDescriptors,
  w: Writer,
  name: string,
  value: unknown,
  field: string,
): boolean => {
  if (!name.startsWith("google.protobuf.")) return false;
  switch (name) {
    case "google.protobuf.Empty":
      return true;
    case "google.protobuf.Timestamp":
    case "google.protobuf.Duration": {
      const { seconds, nanos } =
        name === "google.protobuf.Timestamp"
          ? parseTimestamp(value, field)
          : parseDuration(value, field);
      if (seconds !== 0n) {
        w.tag(1, 0);
        w.varint64(seconds);
      }
      if (nanos !== 0) {
        w.tag(2, 0);
        w.varint64(BigInt(nanos));
      }
      return true;
    }
    case "google.protobuf.Struct":
      writeStruct(w, (value ?? {}) as Record<string, unknown>);
      return true;
    case "google.protobuf.Value":
      writeStructValue(w, value);
      return true;
    case "google.protobuf.ListValue":
      for (const item of (value ?? []) as unknown[]) {
        w.tag(1, 2);
        w.delimited((inner) => writeStructValue(inner, item));
      }
      return true;
    case "google.protobuf.FieldMask": {
      if (typeof value !== "string") {
        throw new ProtobufEncodeError(
          `${field}: expected a FieldMask string, got ${JSON.stringify(value)}`,
        );
      }
      for (const path of value === "" ? [] : value.split(",")) {
        w.tag(1, 2);
        w.delimited((inner) => inner.bytes(textEncoder.encode(pathFromJson(path, field))));
      }
      return true;
    }
    case "google.protobuf.Any": {
      // proto3 JSON: `{ "@type": url, ...fields }`, or `{ "@type": url, value }`
      // for a well-known type with its own JSON. A type the descriptors don't
      // know is `{ "@type": url, value: <base64 bytes> }`.
      if (value === null || typeof value !== "object" || Array.isArray(value)) {
        throw new ProtobufEncodeError(`${field}: expected an Any object`);
      }
      const { "@type": typeUrl, ...rest } = value as Record<string, unknown>;
      if (typeUrl === undefined && Object.keys(rest).length === 0) return true;
      if (typeof typeUrl !== "string" || !typeUrl.includes("/")) {
        throw new ProtobufEncodeError(`${field}: an Any needs an "@type" type URL`);
      }
      const type = typeNameOf(typeUrl);
      let inner: Uint8Array;
      if (!isKnownMessage(d, type)) {
        if (typeof rest.value !== "string") {
          throw new ProtobufEncodeError(`${field}: unknown Any type ${typeUrl}`);
        }
        inner = toBytes(rest.value, field);
      } else {
        inner = encodeMessage(d, type, CUSTOM_JSON.has(type) ? rest.value : rest);
      }
      w.tag(1, 2);
      w.delimited((out) => out.bytes(textEncoder.encode(typeUrl)));
      if (inner.length > 0) {
        w.tag(2, 2);
        w.delimited((out) => out.bytes(inner));
      }
      return true;
    }
    default: {
      const kind = WRAPPER_KINDS[name];
      if (!kind) return false;
      writeValue(d, w, 1, kind, undefined, value, field);
      return true;
    }
  }
};

const writeMessageInto = (
  d: ProtoDescriptors,
  w: Writer,
  name: string,
  value: unknown,
  path: string,
): void => {
  if (writeWellKnown(d, w, name, value, path)) return;
  const fields = d.messages[name];
  if (!fields) throw new ProtobufEncodeError(`${path}: unknown message ${name}`);
  if (value === null || value === undefined) return;
  if (typeof value !== "object") {
    throw new ProtobufEncodeError(`${path}: expected an object for ${name}`);
  }
  const obj = value as Record<string, unknown>;
  const set = new Map<number, string>();
  for (const [num, json, kind, ref, repeated, presence] of fields) {
    const v = obj[json];
    // `null` is "not set", except in a google.protobuf.Value, where it is NullValue.
    if (v === undefined || (v === null && ref !== "google.protobuf.Value")) continue;
    if (presence !== undefined && presence >= 2) {
      const other = set.get(presence);
      if (other !== undefined) {
        throw new ProtobufEncodeError(`${path}: ${other} and ${json} are members of one oneof`);
      }
      set.set(presence, json);
    }
    // proto3: a field without presence is not written at its default.
    if (
      !repeated &&
      !presence &&
      kind !== "message" &&
      kind !== "map" &&
      isDefault(d, kind, ref, v)
    ) {
      continue;
    }
    const field = `${path}.${json}`;
    if (kind === "map") {
      const [kk, vk, vr] = ref as MapRef;
      for (const [k, item] of Object.entries(v as Record<string, unknown>)) {
        if (item === undefined) continue;
        w.tag(num, 2);
        w.delimited((entry) => {
          writeValue(d, entry, 1, kk, undefined, kk === "bool" ? k === "true" : k, `${field}.key`);
          writeValue(d, entry, 2, vk, vr, item, `${field}[${k}]`);
        });
      }
      continue;
    }
    if (repeated) {
      if (!Array.isArray(v)) throw new ProtobufEncodeError(`${field}: expected an array`);
      if (v.length === 0) continue;
      if (isPackable(kind)) {
        w.tag(num, 2);
        w.delimited((inner) => {
          for (const item of v) writeScalar(d, inner, kind, ref as string, item, field);
        });
      } else {
        for (const item of v) writeValue(d, w, num, kind, ref, item, field);
      }
      continue;
    }
    writeValue(d, w, num, kind, ref, v, field);
  }
};

/** Whether `v` is the proto3 default of a scalar or enum field (`-0.0` is not). */
const isDefault = (
  d: ProtoDescriptors,
  kind: FieldKind,
  ref: string | MapRef | 0 | undefined,
  v: unknown,
): boolean => {
  switch (kind) {
    case "string":
    case "bytes":
      return v === "";
    case "bool":
      return v === false;
    case "enum":
      return (
        v === 0 || (typeof ref === "string" && typeof v === "string" && d.enums[ref]?.[v] === 0)
      );
    default:
      return (v === 0 && !Object.is(v, -0)) || v === "0" || v === 0n;
  }
};

/** Encode a proto3 JSON value of message `name` to protobuf bytes. */
export const encodeMessage = (d: ProtoDescriptors, name: string, value: unknown): Uint8Array => {
  if (value === null && name !== "google.protobuf.Value") {
    throw new ProtobufEncodeError(`${name}: expected a message, got null`);
  }
  const w = new Writer();
  writeMessageInto(d, w, name, value, name);
  return w.finish();
};

// ============================================================================
// Decode (binary -> proto3 JSON)
// ============================================================================

const readScalar = (
  d: ProtoDescriptors,
  r: Reader,
  kind: FieldKind,
  ref: string | undefined,
): unknown => {
  switch (kind) {
    case "double":
      return r.double();
    case "float":
      return r.float();
    case "int32":
      return Number(BigInt.asIntN(32, r.varint64()));
    case "uint32":
      return Number(BigInt.asUintN(32, r.varint64()));
    case "int64":
      return BigInt.asIntN(64, r.varint64()).toString();
    case "uint64":
      return BigInt.asUintN(64, r.varint64()).toString();
    case "sint32":
    case "sint64": {
      // Zigzag over the kind's width: a sint32 is the low 32 bits of the varint.
      const n = kind === "sint32" ? BigInt.asUintN(32, r.varint64()) : r.varint64();
      const v = (n >> 1n) ^ -(n & 1n);
      return kind === "sint32" ? Number(v) : BigInt.asIntN(64, v).toString();
    }
    case "fixed32":
      return r.fixed32();
    case "sfixed32":
      return r.fixed32() | 0;
    case "fixed64":
      return r.fixed64().toString();
    case "sfixed64":
      return BigInt.asIntN(64, r.fixed64()).toString();
    case "bool":
      return r.varint64() !== 0n;
    case "enum": {
      const n = Number(BigInt.asIntN(32, r.varint64()));
      const values = ref ? d.enums[ref] : undefined;
      if (values) {
        for (const key in values) if (values[key] === n) return key;
      }
      return n;
    }
    default:
      throw new ProtobufDecodeError(`${kind} is not a scalar`);
  }
};

const readValue = (
  d: ProtoDescriptors,
  r: Reader,
  wire: number,
  kind: FieldKind,
  ref: string | MapRef | 0 | undefined,
): unknown => {
  switch (kind) {
    case "string":
      return textDecoder.decode(r.delimited());
    case "bytes":
      return bytesToBase64(r.delimited());
    case "message":
      return decodeMessage(d, ref as string, r.delimited());
    default:
      if (wire === 2) throw new ProtobufDecodeError("unexpected length-delimited scalar");
      return readScalar(d, r, kind, typeof ref === "string" ? ref : undefined);
  }
};

const readStructValue = (bytes: Uint8Array): unknown => {
  const r = new Reader(bytes);
  let out: unknown = null;
  while (!r.done) {
    const [num, wire] = r.tag();
    switch (num) {
      case 1:
        r.varint64();
        out = null;
        break;
      case 2:
        out = r.double();
        break;
      case 3:
        out = textDecoder.decode(r.delimited());
        break;
      case 4:
        out = r.varint64() !== 0n;
        break;
      case 5:
        out = readStruct(r.delimited());
        break;
      case 6:
        out = readList(r.delimited());
        break;
      default:
        r.skip(wire, num);
    }
  }
  return out;
};

const readList = (bytes: Uint8Array): unknown[] => {
  const r = new Reader(bytes);
  const items: unknown[] = [];
  while (!r.done) {
    const [num, wire] = r.tag();
    if (num === 1 && wire === 2) items.push(readStructValue(r.delimited()));
    else r.skip(wire, num);
  }
  return items;
};

const readStruct = (bytes: Uint8Array): Record<string, unknown> => {
  const r = new Reader(bytes);
  const out: Record<string, unknown> = {};
  while (!r.done) {
    const [num, wire] = r.tag();
    if (num !== 1 || wire !== 2) {
      r.skip(wire, num);
      continue;
    }
    const entry = new Reader(r.delimited());
    let key = "";
    let value: unknown = null;
    while (!entry.done) {
      const [n, w] = entry.tag();
      if (n === 1 && w === 2) key = textDecoder.decode(entry.delimited());
      else if (n === 2 && w === 2) value = readStructValue(entry.delimited());
      else entry.skip(w, n);
    }
    out[key] = value;
  }
  return out;
};

/** `seconds` and `nanos` of a Timestamp or Duration. */
const readSecondsNanos = (bytes: Uint8Array): { seconds: bigint; nanos: number } => {
  const r = new Reader(bytes);
  let seconds = 0n;
  let nanos = 0;
  while (!r.done) {
    const [n, wire] = r.tag();
    if (n === 1 && wire === 0) seconds = BigInt.asIntN(64, r.varint64());
    else if (n === 2 && wire === 0) nanos = Number(BigInt.asIntN(32, r.varint64()));
    else r.skip(wire, n);
  }
  return { seconds, nanos };
};

/** Fractional seconds as proto3 JSON writes them: 0, 3, 6 or 9 digits. */
const fraction = (nanos: number): string =>
  nanos === 0
    ? ""
    : nanos % 1_000_000 === 0
      ? `.${String(nanos / 1_000_000).padStart(3, "0")}`
      : nanos % 1_000 === 0
        ? `.${String(nanos / 1_000).padStart(6, "0")}`
        : `.${String(nanos).padStart(9, "0")}`;

const formatDuration = (seconds: bigint, nanos: number): string => {
  const negative = seconds < 0n || nanos < 0;
  const abs = seconds < 0n ? -seconds : seconds;
  return `${negative ? "-" : ""}${abs}${fraction(Math.abs(nanos))}s`;
};

/** A FieldMask path in proto3 JSON: `foo_bar.baz` -> `fooBar.baz`. */
const pathToJson = (path: string): string =>
  path.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());

/** A FieldMask path from proto3 JSON: `fooBar.baz` -> `foo_bar.baz`. */
const pathFromJson = (path: string, field: string): string => {
  if (/_/.test(path) || !/^[A-Za-z0-9.]*$/.test(path)) {
    throw new ProtobufEncodeError(`${field}: invalid FieldMask path ${JSON.stringify(path)}`);
  }
  return path.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
};

/** Well-known types whose proto3 JSON isn't an object of their fields. */
const CUSTOM_JSON = new Set([
  "google.protobuf.Any",
  "google.protobuf.Timestamp",
  "google.protobuf.Duration",
  "google.protobuf.FieldMask",
  "google.protobuf.Struct",
  "google.protobuf.Value",
  "google.protobuf.ListValue",
  "google.protobuf.DoubleValue",
  "google.protobuf.FloatValue",
  "google.protobuf.Int64Value",
  "google.protobuf.UInt64Value",
  "google.protobuf.Int32Value",
  "google.protobuf.UInt32Value",
  "google.protobuf.BoolValue",
  "google.protobuf.StringValue",
  "google.protobuf.BytesValue",
]);

/** The message name a type URL names (`type.googleapis.com/a.B` -> `a.B`). */
const typeNameOf = (url: string): string => url.slice(url.lastIndexOf("/") + 1);

const isKnownMessage = (d: ProtoDescriptors, name: string): boolean =>
  CUSTOM_JSON.has(name) || name === "google.protobuf.Empty" || d.messages[name] !== undefined;

const readWellKnown = (
  d: ProtoDescriptors,
  name: string,
  bytes: Uint8Array,
): { value: unknown } | undefined => {
  if (!name.startsWith("google.protobuf.")) return undefined;
  switch (name) {
    case "google.protobuf.Empty":
      return { value: {} };
    case "google.protobuf.Timestamp": {
      // proto3 JSON can't write a Timestamp outside 0001 to 9999.
      const { seconds, nanos } = readSecondsNanos(bytes);
      if (seconds < MIN_TIMESTAMP || seconds > MAX_TIMESTAMP || nanos < 0 || nanos > 999_999_999) {
        throw new ProtobufJsonRangeError(`Timestamp ${seconds}s ${nanos}ns is out of range`);
      }
      return { value: formatTimestamp(seconds, nanos) };
    }
    case "google.protobuf.Duration": {
      // Nor a Duration beyond 10,000 years, or whose parts differ in sign.
      const { seconds, nanos } = readSecondsNanos(bytes);
      if (
        seconds > MAX_DURATION ||
        seconds < -MAX_DURATION ||
        Math.abs(nanos) > 999_999_999 ||
        (seconds > 0n && nanos < 0) ||
        (seconds < 0n && nanos > 0)
      ) {
        throw new ProtobufJsonRangeError(`Duration ${seconds}s ${nanos}ns is out of range`);
      }
      return { value: formatDuration(seconds, nanos) };
    }
    case "google.protobuf.FieldMask": {
      const r = new Reader(bytes);
      const paths: string[] = [];
      while (!r.done) {
        const [n, wire] = r.tag();
        if (n === 1 && wire === 2) paths.push(pathToJson(textDecoder.decode(r.delimited())));
        else r.skip(wire, n);
      }
      return { value: paths.join(",") };
    }
    case "google.protobuf.Struct":
      return { value: readStruct(bytes) };
    case "google.protobuf.Value":
      return { value: readStructValue(bytes) };
    case "google.protobuf.ListValue":
      return { value: readList(bytes) };
    case "google.protobuf.Any": {
      const r = new Reader(bytes);
      let typeUrl = "";
      let inner: Uint8Array = new Uint8Array(0);
      while (!r.done) {
        const [n, wire] = r.tag();
        if (n === 1 && wire === 2) typeUrl = textDecoder.decode(r.delimited());
        else if (n === 2 && wire === 2) inner = r.delimited();
        else r.skip(wire, n);
      }
      if (typeUrl === "") return { value: {} };
      const type = typeNameOf(typeUrl);
      // A type the descriptors don't know stays opaque: its bytes, base64.
      if (!isKnownMessage(d, type))
        return { value: { "@type": typeUrl, value: bytesToBase64(inner) } };
      const message = decodeMessage(d, type, inner);
      return {
        value: CUSTOM_JSON.has(type)
          ? { "@type": typeUrl, value: message }
          : { "@type": typeUrl, ...(message as Record<string, unknown>) },
      };
    }
    default: {
      const kind = WRAPPER_KINDS[name];
      if (!kind) return undefined;
      const r = new Reader(bytes);
      let value: unknown = defaultOf(d, kind, undefined);
      while (!r.done) {
        const [n, wire] = r.tag();
        if (n === 1 && wire === wireTypeOf(kind)) value = readValue(d, r, wire, kind, undefined);
        else r.skip(wire, n);
      }
      return { value };
    }
  }
};

const concatBytes = (chunks: ReadonlyArray<Uint8Array>): Uint8Array => {
  if (chunks.length === 1) return chunks[0]!;
  const out = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
  let at = 0;
  for (const c of chunks) {
    out.set(c, at);
    at += c.length;
  }
  return out;
};

/** The JSON names of each oneof's members, by presence group. */
const oneofCache = /*@__PURE__*/ new WeakMap<
  ReadonlyArray<FieldDescriptor>,
  Map<number, string[]>
>();

const oneofsOf = (fields: ReadonlyArray<FieldDescriptor>): Map<number, string[]> => {
  let groups = oneofCache.get(fields);
  if (!groups) {
    groups = new Map();
    for (const [, json, , , , presence] of fields) {
      if (presence !== undefined && presence >= 2) {
        groups.set(presence, [...(groups.get(presence) ?? []), json]);
      }
    }
    oneofCache.set(fields, groups);
  }
  return groups;
};

/**
 * Decode protobuf bytes of message `name` to a proto3 JSON value. As in any
 * proto3 parser, the last value of a singular field wins, a message field
 * seen more than once is merged, setting a oneof member clears the others,
 * a field whose wire type doesn't match its kind is skipped as unknown, and
 * unknown fields are dropped.
 */
export const decodeMessage = (d: ProtoDescriptors, name: string, bytes: Uint8Array): unknown => {
  const wk = readWellKnown(d, name, bytes);
  if (wk) return wk.value;
  const fields = d.messages[name];
  if (!fields) throw new ProtobufDecodeError(`unknown message ${name}`);
  const byNumber = fieldIndex(fields);
  const oneofs = oneofsOf(fields);
  const out: Record<string, unknown> = {};
  // A singular message field's occurrences, merged by decoding them as one.
  const messages = new Map<string, { ref: string; chunks: Uint8Array[] }>();
  const r = new Reader(bytes);
  while (!r.done) {
    const [num, wire] = r.tag();
    const f = byNumber.get(num);
    if (!f) {
      r.skip(wire, num);
      continue;
    }
    const [, json, kind, ref, repeated, presence] = f;
    const packed = repeated && wire === 2 && isPackable(kind);
    if (wire !== wireTypeOf(kind) && !packed) {
      r.skip(wire, num);
      continue;
    }
    if (presence !== undefined && presence >= 2) {
      for (const other of oneofs.get(presence) ?? []) {
        if (other === json) continue;
        delete out[other];
        messages.delete(other);
      }
    }
    if (kind === "map") {
      const [kk, vk, vr] = ref as MapRef;
      const entry = new Reader(r.delimited());
      let key: unknown = defaultOf(d, kk, undefined);
      let value: unknown =
        vk === "message" ? decodeMessage(d, vr as string, new Uint8Array(0)) : defaultOf(d, vk, vr);
      while (!entry.done) {
        const [n, w] = entry.tag();
        if (n === 1 && w === wireTypeOf(kk)) key = readValue(d, entry, w, kk, undefined);
        else if (n === 2 && w === wireTypeOf(vk)) value = readValue(d, entry, w, vk, vr);
        else entry.skip(w, n);
      }
      const map = (out[json] ??= {}) as Record<string, unknown>;
      map[String(key)] = value;
      continue;
    }
    if (repeated) {
      const list = (out[json] ??= []) as unknown[];
      if (packed) {
        const items = new Reader(r.delimited());
        while (!items.done) list.push(readScalar(d, items, kind, ref as string));
      } else {
        list.push(readValue(d, r, wire, kind, ref));
      }
      continue;
    }
    if (kind === "message") {
      const seen = messages.get(json);
      if (seen) seen.chunks.push(r.delimited());
      else messages.set(json, { ref: ref as string, chunks: [r.delimited()] });
      continue;
    }
    out[json] = readValue(d, r, wire, kind, ref);
  }
  for (const [json, { ref, chunks }] of messages) {
    out[json] = decodeMessage(d, ref, concatBytes(chunks));
  }
  for (const [, json, kind, ref, repeated, presence] of fields) {
    // A singular message field has presence; a repeated one reads as [].
    if (presence || (kind === "message" && !repeated) || json in out) continue;
    out[json] = repeated ? [] : kind === "map" ? {} : defaultOf(d, kind, ref);
  }
  return out;
};

/** The proto3 default of a scalar or enum field. */
const defaultOf = (d: ProtoDescriptors, kind: FieldKind, ref: string | MapRef | 0 | undefined) => {
  switch (kind) {
    case "string":
    case "bytes":
      return "";
    case "bool":
      return false;
    case "int64":
    case "uint64":
    case "sint64":
    case "fixed64":
    case "sfixed64":
      return "0";
    case "enum": {
      const values = typeof ref === "string" ? d.enums[ref] : undefined;
      if (values) for (const key in values) if (values[key] === 0) return key;
      return 0;
    }
    default:
      return 0;
  }
};

const indexCache = /*@__PURE__*/ new WeakMap<
  ReadonlyArray<FieldDescriptor>,
  Map<number, FieldDescriptor>
>();

const fieldIndex = (fields: ReadonlyArray<FieldDescriptor>): Map<number, FieldDescriptor> => {
  let index = indexCache.get(fields);
  if (!index) {
    index = new Map(fields.map((f) => [f[0], f]));
    indexCache.set(fields, index);
  }
  return index;
};

// ============================================================================
// gRPC length-prefixed framing
// ============================================================================

/** One gRPC message frame: `[flag=0][u32 length BE][payload]`. */
export const frame = (payload: Uint8Array): Uint8Array => {
  const out = new Uint8Array(5 + payload.length);
  new DataView(out.buffer).setUint32(1, payload.length, false);
  out.set(payload, 5);
  return out;
};

/**
 * Reads gRPC message frames from a body that arrives in chunks: `push` each
 * chunk and get back the messages it completed. `rest` is the number of
 * bytes held for an incomplete frame (`0` once a body ends cleanly).
 * Compressed frames are rejected. A gRPC-Web trailer frame (flag `0x80`) is
 * not a message: its `name: value` lines are collected in `trailers`.
 */
export class FrameReader {
  private buf: Uint8Array<ArrayBufferLike> = new Uint8Array(0);

  /** The trailers of the gRPC-Web trailer frames read so far, names lowercase. */
  readonly trailers: Record<string, string> = {};

  get rest(): number {
    return this.buf.length;
  }

  push(chunk: Uint8Array): Uint8Array[] {
    if (this.buf.length === 0) this.buf = chunk;
    else {
      const next = new Uint8Array(this.buf.length + chunk.length);
      next.set(this.buf);
      next.set(chunk, this.buf.length);
      this.buf = next;
    }
    const out: Uint8Array[] = [];
    let pos = 0;
    const view = new DataView(this.buf.buffer, this.buf.byteOffset, this.buf.byteLength);
    while (pos + 5 <= this.buf.length) {
      const flag = this.buf[pos]!;
      const len = view.getUint32(pos + 1, false);
      if (pos + 5 + len > this.buf.length) break;
      if (flag & 1 && !(flag & 0x80)) {
        throw new ProtobufDecodeError("compressed gRPC frames are not supported");
      }
      if (flag & 0x80) this.readTrailers(this.buf.subarray(pos + 5, pos + 5 + len));
      else out.push(this.buf.slice(pos + 5, pos + 5 + len));
      pos += 5 + len;
    }
    this.buf = this.buf.subarray(pos);
    return out;
  }

  private readTrailers(payload: Uint8Array): void {
    for (const line of trailerDecoder.decode(payload).split("\r\n")) {
      const colon = line.indexOf(":");
      if (colon > 0)
        this.trailers[line.slice(0, colon).trim().toLowerCase()] = line.slice(colon + 1).trim();
    }
  }
}

const trailerDecoder = /*@__PURE__*/ new TextDecoder();

/** Split a whole gRPC body into message payloads. */
export const unframe = (body: Uint8Array): Uint8Array[] => {
  const reader = new FrameReader();
  const out = reader.push(body);
  if (reader.rest !== 0) throw new ProtobufDecodeError("truncated gRPC frame");
  return out;
};
