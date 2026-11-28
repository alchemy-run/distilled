/**
 * CBOR (RFC 8949), as Smithy's rpcv2Cbor protocol uses it.
 *
 * https://www.rfc-editor.org/rfc/rfc8949
 * https://smithy.io/2.0/additional-specs/protocols/smithy-rpc-v2.html
 *
 * The encoder writes definite lengths, integers in their shortest form, and
 * other numbers as 64-bit floats. A `Date` is tag 1 (epoch seconds), a
 * `Uint8Array` a byte string, `null` CBOR null; an `undefined` object value
 * is left out.
 *
 * The decoder reads every major type, definite and indefinite lengths, and
 * half, single and double floats. Tag 1 becomes a `Date`, tags 2 and 3
 * (bignums) a number; other tags give their content. Integers past 2^53
 * lose precision, as `JSON.parse` does.
 */

/** A body that is not well-formed CBOR. */
export class CborError extends Error {}

//#region encode

const utf8 = /*@__PURE__*/ new TextEncoder();

class Writer {
  bytes = new Uint8Array(256);
  view = new DataView(this.bytes.buffer);
  length = 0;

  reserve(n: number): void {
    if (this.length + n <= this.bytes.length) return;
    let size = this.bytes.length * 2;
    while (size < this.length + n) size *= 2;
    const next = new Uint8Array(size);
    next.set(this.bytes.subarray(0, this.length));
    this.bytes = next;
    this.view = new DataView(next.buffer);
  }

  byte(b: number): void {
    this.reserve(1);
    this.bytes[this.length++] = b;
  }

  /** A major type with its argument, in the shortest form. */
  head(major: number, n: number | bigint): void {
    const m = major << 5;
    if (typeof n === "bigint" || n >= 0x100000000) {
      this.byte(m | 27);
      this.reserve(8);
      // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- every caller passes a bigint, a length or a safe integer
      this.view.setBigUint64(this.length, BigInt(n));
      this.length += 8;
    } else if (n < 24) {
      this.byte(m | n);
    } else if (n < 0x100) {
      this.byte(m | 24);
      this.byte(n);
    } else if (n < 0x10000) {
      this.byte(m | 25);
      this.reserve(2);
      this.view.setUint16(this.length, n);
      this.length += 2;
    } else {
      this.byte(m | 26);
      this.reserve(4);
      this.view.setUint32(this.length, n);
      this.length += 4;
    }
  }

  raw(b: Uint8Array): void {
    this.reserve(b.length);
    this.bytes.set(b, this.length);
    this.length += b.length;
  }

  float64(v: number): void {
    this.byte(0xfb);
    this.reserve(8);
    this.view.setFloat64(this.length, v);
    this.length += 8;
  }
}

const MAX_UINT64 = 0xffffffffffffffffn;

const bigintBytes = (n: bigint): Uint8Array => {
  const hex = n.toString(16);
  const padded = hex.length % 2 === 0 ? hex : `0${hex}`;
  const out = new Uint8Array(padded.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(padded.slice(i * 2, i * 2 + 2), 16);
  return out;
};

const writeNumber = (w: Writer, v: number): void => {
  if (Number.isSafeInteger(v) && !Object.is(v, -0)) {
    if (v >= 0) w.head(0, v);
    else w.head(1, -1 - v);
  } else {
    w.float64(v);
  }
};

const writeBigint = (w: Writer, v: bigint): void => {
  if (v >= 0n) {
    if (v <= MAX_UINT64) w.head(0, v);
    else {
      w.head(6, 2);
      const b = bigintBytes(v);
      w.head(2, b.length);
      w.raw(b);
    }
  } else {
    const n = -1n - v;
    if (n <= MAX_UINT64) w.head(1, n);
    else {
      w.head(6, 3);
      const b = bigintBytes(n);
      w.head(2, b.length);
      w.raw(b);
    }
  }
};

/* oxlint-disable distilled/or-throw -- write throws CborError for a function or a symbol; it is private to this file and runs only under encodeCborOrThrow */
const write = (w: Writer, v: unknown): void => {
  if (v === null || v === undefined) return w.byte(0xf6);
  switch (typeof v) {
    case "boolean":
      return w.byte(v ? 0xf5 : 0xf4);
    case "number":
      return writeNumber(w, v);
    case "bigint":
      return writeBigint(w, v);
    case "string": {
      const b = utf8.encode(v);
      w.head(3, b.length);
      return w.raw(b);
    }
  }
  if (v instanceof Uint8Array) {
    w.head(2, v.length);
    return w.raw(v);
  }
  if (v instanceof Date) {
    w.head(6, 1);
    const ms = v.getTime();
    return ms % 1000 === 0 ? writeNumber(w, ms / 1000) : w.float64(ms / 1000);
  }
  if (Array.isArray(v)) {
    w.head(4, v.length);
    for (const item of v) write(w, item);
    return;
  }
  if (typeof v === "object") {
    const entries = Object.entries(v).filter(([, x]) => x !== undefined);
    w.head(5, entries.length);
    for (const [key, x] of entries) {
      write(w, key);
      write(w, x);
    }
    return;
  }
  throw new CborError(`CBOR cannot encode a ${typeof v}`);
};
/* oxlint-enable distilled/or-throw */

/** `value` as CBOR. Throws {@link CborError} for a function or a symbol. */
export const encodeCborOrThrow = (value: unknown): Uint8Array => {
  const w = new Writer();
  write(w, value);
  return w.bytes.slice(0, w.length);
};

//#endregion

//#region decode

const utf8Decoder = /*@__PURE__*/ new TextDecoder();

/** The "break" stop code that ends an indefinite-length item. */
const BREAK = /*@__PURE__*/ Symbol("break");

const half = (h: number): number => {
  const sign = h & 0x8000 ? -1 : 1;
  const exponent = (h >> 10) & 0x1f;
  const fraction = h & 0x3ff;
  if (exponent === 0) return sign * fraction * 2 ** -24;
  if (exponent === 31) return fraction === 0 ? sign * Infinity : NaN;
  return sign * (1 + fraction / 1024) * 2 ** (exponent - 15);
};

/* oxlint-disable distilled/or-throw -- bignum and Reader's methods throw CborError; they are private to this file and run only under decodeCborOrThrow */
const bignum = (bytes: unknown, negative: boolean): number => {
  if (!(bytes instanceof Uint8Array)) throw new CborError("a bignum tag must hold a byte string");
  let n = 0n;
  // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `b` is a byte of a Uint8Array: an integer from 0 to 255
  for (const b of bytes) n = (n << 8n) | BigInt(b);
  return Number(negative ? -1n - n : n);
};

const setKey = (out: Record<string, unknown>, key: unknown, value: unknown): void => {
  const k = typeof key === "string" ? key : String(key);
  // A plain assignment to "__proto__" would replace the prototype.
  if (k === "__proto__") {
    Object.defineProperty(out, k, { value, enumerable: true, writable: true, configurable: true });
  } else {
    out[k] = value;
  }
};

class Reader {
  pos = 0;
  readonly view: DataView;
  readonly bytes: Uint8Array;
  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }

  need(n: number): void {
    if (this.pos + n > this.bytes.length) throw new CborError("unexpected end of CBOR data");
  }

  /** The argument of an initial byte with additional info `info` (not 31). */
  argument(info: number): number {
    if (info < 24) return info;
    switch (info) {
      case 24:
        this.need(1);
        return this.bytes[this.pos++]!;
      case 25:
        this.need(2);
        this.pos += 2;
        return this.view.getUint16(this.pos - 2);
      case 26:
        this.need(4);
        this.pos += 4;
        return this.view.getUint32(this.pos - 4);
      case 27:
        this.need(8);
        this.pos += 8;
        return Number(this.view.getBigUint64(this.pos - 8));
      default:
        throw new CborError(`reserved CBOR additional information ${info}`);
    }
  }

  /** A length that fits in what is left of the data. */
  length(info: number): number {
    const n = this.argument(info);
    if (n > this.bytes.length - this.pos) throw new CborError("unexpected end of CBOR data");
    return n;
  }

  item(): unknown {
    const value = this.next();
    if (value === BREAK) throw new CborError("unexpected CBOR break");
    return value;
  }

  next(): unknown {
    this.need(1);
    const initial = this.bytes[this.pos++]!;
    const major = initial >> 5;
    const info = initial & 0x1f;
    if (major === 7) return this.simple(info);
    if (info === 31) return this.indefinite(major);
    switch (major) {
      case 0:
        return this.argument(info);
      case 1:
        return -1 - this.argument(info);
      case 2: {
        const n = this.length(info);
        this.pos += n;
        return this.bytes.slice(this.pos - n, this.pos);
      }
      case 3: {
        const n = this.length(info);
        this.pos += n;
        return utf8Decoder.decode(this.bytes.subarray(this.pos - n, this.pos));
      }
      case 4: {
        const n = this.length(info);
        const out: unknown[] = [];
        for (let i = 0; i < n; i++) out.push(this.item());
        return out;
      }
      case 5: {
        const n = this.length(info);
        const out: Record<string, unknown> = {};
        for (let i = 0; i < n; i++) setKey(out, this.item(), this.item());
        return out;
      }
      default: {
        const tag = this.argument(info);
        const content = this.item();
        switch (tag) {
          case 1:
            if (typeof content !== "number") {
              throw new CborError("an epoch timestamp tag must hold a number");
            }
            return new Date(content * 1000);
          case 2:
            return bignum(content, false);
          case 3:
            return bignum(content, true);
          default:
            return content;
        }
      }
    }
  }

  simple(info: number): unknown {
    switch (info) {
      case 20:
        return false;
      case 21:
        return true;
      case 22:
      case 23:
        return null;
      case 25:
        this.need(2);
        this.pos += 2;
        return half(this.view.getUint16(this.pos - 2));
      case 26:
        this.need(4);
        this.pos += 4;
        return this.view.getFloat32(this.pos - 4);
      case 27:
        this.need(8);
        this.pos += 8;
        return this.view.getFloat64(this.pos - 8);
      case 31:
        return BREAK;
      default:
        throw new CborError(`unsupported CBOR simple value ${info}`);
    }
  }

  indefinite(major: number): unknown {
    switch (major) {
      case 2:
      case 3: {
        const chunks: Uint8Array[] = [];
        for (;;) {
          this.need(1);
          if (this.bytes[this.pos] === 0xff) {
            this.pos++;
            break;
          }
          const chunk = this.next();
          if (major === 2 ? !(chunk instanceof Uint8Array) : typeof chunk !== "string") {
            throw new CborError("an indefinite-length string chunk has the wrong type");
          }
          chunks.push(major === 2 ? (chunk as Uint8Array) : utf8.encode(chunk as string));
        }
        const out = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
        let offset = 0;
        for (const c of chunks) {
          out.set(c, offset);
          offset += c.length;
        }
        return major === 2 ? out : utf8Decoder.decode(out);
      }
      case 4: {
        const out: unknown[] = [];
        for (let v = this.next(); v !== BREAK; v = this.next()) out.push(v);
        return out;
      }
      case 5: {
        const out: Record<string, unknown> = {};
        for (let k = this.next(); k !== BREAK; k = this.next()) setKey(out, k, this.item());
        return out;
      }
      default:
        throw new CborError(`CBOR major type ${major} has no indefinite length`);
    }
  }
}
/* oxlint-enable distilled/or-throw */

/** The value `bytes` encode. Throws {@link CborError} when they are not well-formed CBOR. */
export const decodeCborOrThrow = (bytes: Uint8Array): unknown => {
  const reader = new Reader(bytes);
  const value = reader.item();
  if (reader.pos !== bytes.length) throw new CborError("trailing bytes after the CBOR item");
  return value;
};

//#endregion
