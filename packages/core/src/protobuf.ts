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
 * {@link MapRef} for `map`; `repeated` is `1` for repeated fields; `presence`
 * is `1` for a field whose absence is observable (`optional`, a `oneof`
 * member). Message fields always have presence.
 */
export type FieldDescriptor = readonly [
  number: number,
  jsonName: string,
  kind: FieldKind,
  ref?: string | MapRef | 0,
  repeated?: 0 | 1,
  presence?: 0 | 1,
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
  readonly _tag = "ProtobufDecodeError";
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

  varint64(): bigint {
    let result = 0n;
    let shift = 0n;
    while (true) {
      if (this.pos >= this.buf.length) throw new ProtobufDecodeError("truncated varint");
      const b = this.buf[this.pos++]!;
      result |= BigInt(b & 0x7f) << shift;
      if ((b & 0x80) === 0) return result;
      shift += 7n;
      if (shift > 70n) throw new ProtobufDecodeError("varint too long");
    }
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

  skip(wire: number): void {
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
      case 5:
        this.take(4);
        return;
      default:
        throw new ProtobufDecodeError(`unsupported wire type ${wire}`);
    }
  }
}

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

const toBigInt = (value: unknown, field: string): bigint => {
  if (typeof value === "bigint") return value;
  if (typeof value === "number" && Number.isInteger(value)) return BigInt(value);
  if (typeof value === "string" && /^-?\d+$/.test(value.trim())) return BigInt(value.trim());
  throw new ProtobufEncodeError(`${field}: expected an integer, got ${JSON.stringify(value)}`);
};

const toNumber = (value: unknown, field: string): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  if (value === "NaN") return Number.NaN;
  if (value === "Infinity") return Number.POSITIVE_INFINITY;
  if (value === "-Infinity") return Number.NEGATIVE_INFINITY;
  throw new ProtobufEncodeError(`${field}: expected a number, got ${JSON.stringify(value)}`);
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
      return w.double(toNumber(value, field));
    case "float":
      return w.float(toNumber(value, field));
    case "int32":
    case "int64":
    case "uint64":
      return w.varint64(toBigInt(value, field));
    case "uint32":
      return w.varint64(BigInt.asUintN(32, toBigInt(value, field)));
    case "sint32":
    case "sint64": {
      const n = toBigInt(value, field);
      return w.varint64(n >= 0n ? n << 1n : (-n << 1n) - 1n);
    }
    case "fixed32":
    case "sfixed32":
      return w.fixed32(Number(BigInt.asUintN(32, toBigInt(value, field))));
    case "fixed64":
    case "sfixed64":
      return w.fixed64(toBigInt(value, field));
    case "bool":
      return w.byte(value === true || value === "true" ? 1 : 0);
    case "enum": {
      if (typeof value === "number") return w.varint64(BigInt(value));
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
      w.tag(num, 2);
      return w.delimited((inner) => inner.bytes(textEncoder.encode(String(value))));
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

const parseTimestamp = (value: unknown, field: string): { seconds: bigint; nanos: number } => {
  if (value instanceof Date) {
    const ms = value.getTime();
    return { seconds: BigInt(Math.floor(ms / 1000)), nanos: (ms % 1000) * 1e6 };
  }
  if (typeof value === "number") {
    return { seconds: BigInt(Math.floor(value)), nanos: Math.round((value % 1) * 1e9) };
  }
  if (typeof value === "string") {
    const m = /^(.*?)(?:\.(\d{1,9}))?(Z|[+-]\d\d:\d\d)$/.exec(value);
    const ms = Date.parse(m ? `${m[1]}${m[3]}` : value);
    if (!Number.isNaN(ms)) {
      const nanos = m?.[2] ? Number(m[2].padEnd(9, "0")) : 0;
      return { seconds: BigInt(Math.floor(ms / 1000)), nanos };
    }
  }
  throw new ProtobufEncodeError(`${field}: expected an RFC 3339 timestamp`);
};

const formatTimestamp = (seconds: bigint, nanos: number): string => {
  const iso = new Date(Number(seconds) * 1000).toISOString().replace(/\.\d{3}Z$/, "");
  if (nanos === 0) return `${iso}Z`;
  const frac = String(nanos).padStart(9, "0").replace(/0+$/, "");
  return `${iso}.${frac}Z`;
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
          : (() => {
              const s = typeof value === "string" ? value.replace(/s$/, "") : String(value);
              const n = Number(s);
              const whole = Math.trunc(n);
              return { seconds: BigInt(whole), nanos: Math.round((n - whole) * 1e9) };
            })();
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
    case "google.protobuf.Any": {
      const any = (value ?? {}) as { "@type"?: string; typeUrl?: string; value?: unknown };
      const typeUrl = any["@type"] ?? any.typeUrl;
      if (typeUrl) {
        w.tag(1, 2);
        w.delimited((inner) => inner.bytes(textEncoder.encode(typeUrl)));
      }
      if (any.value !== undefined) {
        w.tag(2, 2);
        w.delimited((inner) => inner.bytes(toBytes(any.value, field)));
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
  for (const [num, json, kind, ref, repeated] of fields) {
    const v = obj[json];
    if (v === undefined || v === null) continue;
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

/** Encode a proto3 JSON value of message `name` to protobuf bytes. */
export const encodeMessage = (d: ProtoDescriptors, name: string, value: unknown): Uint8Array => {
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
      const n = r.varint64();
      const v = (n >> 1n) ^ -(n & 1n);
      return kind === "sint32" ? Number(v) : v.toString();
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
    const tag = r.uvarint();
    const num = Math.floor(tag / 8);
    const wire = tag & 7;
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
      case 6: {
        const list = new Reader(r.delimited());
        const items: unknown[] = [];
        while (!list.done) {
          const t = list.uvarint();
          if (Math.floor(t / 8) === 1) items.push(readStructValue(list.delimited()));
          else list.skip(t & 7);
        }
        out = items;
        break;
      }
      default:
        r.skip(wire);
    }
  }
  return out;
};

const readStruct = (bytes: Uint8Array): Record<string, unknown> => {
  const r = new Reader(bytes);
  const out: Record<string, unknown> = {};
  while (!r.done) {
    const tag = r.uvarint();
    if (Math.floor(tag / 8) !== 1) {
      r.skip(tag & 7);
      continue;
    }
    const entry = new Reader(r.delimited());
    let key = "";
    let value: unknown = null;
    while (!entry.done) {
      const t = entry.uvarint();
      const n = Math.floor(t / 8);
      if (n === 1) key = textDecoder.decode(entry.delimited());
      else if (n === 2) value = readStructValue(entry.delimited());
      else entry.skip(t & 7);
    }
    out[key] = value;
  }
  return out;
};

const readWellKnown = (
  d: ProtoDescriptors,
  name: string,
  bytes: Uint8Array,
): { value: unknown } | undefined => {
  if (!name.startsWith("google.protobuf.")) return undefined;
  switch (name) {
    case "google.protobuf.Empty":
      return { value: {} };
    case "google.protobuf.Timestamp":
    case "google.protobuf.Duration": {
      const r = new Reader(bytes);
      let seconds = 0n;
      let nanos = 0;
      while (!r.done) {
        const tag = r.uvarint();
        const n = Math.floor(tag / 8);
        if (n === 1) seconds = BigInt.asIntN(64, r.varint64());
        else if (n === 2) nanos = Number(BigInt.asIntN(32, r.varint64()));
        else r.skip(tag & 7);
      }
      if (name === "google.protobuf.Timestamp") return { value: formatTimestamp(seconds, nanos) };
      const total = Number(seconds) + nanos / 1e9;
      return { value: `${total}s` };
    }
    case "google.protobuf.Struct":
      return { value: readStruct(bytes) };
    case "google.protobuf.Value":
      return { value: readStructValue(bytes) };
    case "google.protobuf.ListValue":
      return { value: readStructValue(concatTag(6, bytes)) };
    case "google.protobuf.Any": {
      const r = new Reader(bytes);
      const out: Record<string, unknown> = {};
      while (!r.done) {
        const tag = r.uvarint();
        const n = Math.floor(tag / 8);
        if (n === 1) out["@type"] = textDecoder.decode(r.delimited());
        else if (n === 2) out.value = bytesToBase64(r.delimited());
        else r.skip(tag & 7);
      }
      return { value: out };
    }
    default: {
      const kind = WRAPPER_KINDS[name];
      if (!kind) return undefined;
      const r = new Reader(bytes);
      let value: unknown = kind === "string" || kind === "bytes" ? "" : kind === "bool" ? false : 0;
      while (!r.done) {
        const tag = r.uvarint();
        if (Math.floor(tag / 8) === 1) value = readValue(d, r, tag & 7, kind, undefined);
        else r.skip(tag & 7);
      }
      return { value };
    }
  }
};

/** Wrap `bytes` as field `num` (length-delimited) of an enclosing message. */
const concatTag = (num: number, bytes: Uint8Array): Uint8Array => {
  const w = new Writer();
  w.tag(num, 2);
  w.uvarint(bytes.length);
  w.bytes(bytes);
  return w.finish();
};

/** Decode protobuf bytes of message `name` to a proto3 JSON value. */
export const decodeMessage = (d: ProtoDescriptors, name: string, bytes: Uint8Array): unknown => {
  const wk = readWellKnown(d, name, bytes);
  if (wk) return wk.value;
  const fields = d.messages[name];
  if (!fields) throw new ProtobufDecodeError(`unknown message ${name}`);
  const byNumber = fieldIndex(fields);
  const out: Record<string, unknown> = {};
  const r = new Reader(bytes);
  while (!r.done) {
    const tag = r.uvarint();
    const num = Math.floor(tag / 8);
    const wire = tag & 7;
    const f = byNumber.get(num);
    if (!f) {
      r.skip(wire);
      continue;
    }
    const [, json, kind, ref, repeated] = f;
    if (kind === "map") {
      const [kk, vk, vr] = ref as MapRef;
      const entry = new Reader(r.delimited());
      let key: unknown = kk === "bool" ? false : kk === "string" ? "" : 0;
      let value: unknown =
        vk === "message" ? {} : vk === "string" || vk === "bytes" ? "" : vk === "bool" ? false : 0;
      while (!entry.done) {
        const t = entry.uvarint();
        const n = Math.floor(t / 8);
        if (n === 1) key = readValue(d, entry, t & 7, kk, undefined);
        else if (n === 2) value = readValue(d, entry, t & 7, vk, vr);
        else entry.skip(t & 7);
      }
      const map = (out[json] ??= {}) as Record<string, unknown>;
      map[String(key)] = value;
      continue;
    }
    if (repeated) {
      const list = (out[json] ??= []) as unknown[];
      if (wire === 2 && isPackable(kind)) {
        const packed = new Reader(r.delimited());
        while (!packed.done) list.push(readScalar(d, packed, kind, ref as string));
      } else {
        list.push(readValue(d, r, wire, kind, ref));
      }
      continue;
    }
    out[json] = readValue(d, r, wire, kind, ref);
  }
  for (const [, json, kind, ref, repeated, presence] of fields) {
    if (presence || kind === "message" || json in out) continue;
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
 * Compressed frames are rejected; gRPC-Web trailer frames are skipped.
 */
export class FrameReader {
  private buf: Uint8Array<ArrayBufferLike> = new Uint8Array(0);

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
      if (!(flag & 0x80)) out.push(this.buf.slice(pos + 5, pos + 5 + len));
      pos += 5 + len;
    }
    this.buf = this.buf.subarray(pos);
    return out;
  }
}

/** Split a whole gRPC body into message payloads. */
export const unframe = (body: Uint8Array): Uint8Array[] => {
  const reader = new FrameReader();
  const out = reader.push(body);
  if (reader.rest !== 0) throw new ProtobufDecodeError("truncated gRPC frame");
  return out;
};
