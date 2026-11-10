/**
 * HPACK (RFC 7541), the header compression of HTTP/2, for a client that
 * speaks HTTP/2 without a platform implementation
 * (`grpc-transport-cloudflare-http2`).
 *
 * {@link makeDecoder} reads everything a server may send: the static and
 * dynamic tables, every literal form, and Huffman-coded strings.
 * {@link encode} writes the simplest valid form, each field as a literal
 * with no indexing and no Huffman coding, so a connection keeps no encoder
 * state.
 */

/** A header block that breaks RFC 7541. HTTP/2 treats it as a connection error. */
export class HpackError extends Error {}

/** A header field: a lowercase name and its value. */
export type HeaderField = readonly [name: string, value: string];

/** RFC 7541 Appendix A. Index 1 is the first entry. */
const STATIC_TABLE: ReadonlyArray<HeaderField> = [
  [":authority", ""],
  [":method", "GET"],
  [":method", "POST"],
  [":path", "/"],
  [":path", "/index.html"],
  [":scheme", "http"],
  [":scheme", "https"],
  [":status", "200"],
  [":status", "204"],
  [":status", "206"],
  [":status", "304"],
  [":status", "400"],
  [":status", "404"],
  [":status", "500"],
  ["accept-charset", ""],
  ["accept-encoding", "gzip, deflate"],
  ["accept-language", ""],
  ["accept-ranges", ""],
  ["accept", ""],
  ["access-control-allow-origin", ""],
  ["age", ""],
  ["allow", ""],
  ["authorization", ""],
  ["cache-control", ""],
  ["content-disposition", ""],
  ["content-encoding", ""],
  ["content-language", ""],
  ["content-length", ""],
  ["content-location", ""],
  ["content-range", ""],
  ["content-type", ""],
  ["cookie", ""],
  ["date", ""],
  ["etag", ""],
  ["expect", ""],
  ["expires", ""],
  ["from", ""],
  ["host", ""],
  ["if-match", ""],
  ["if-modified-since", ""],
  ["if-none-match", ""],
  ["if-range", ""],
  ["if-unmodified-since", ""],
  ["last-modified", ""],
  ["link", ""],
  ["location", ""],
  ["max-forwards", ""],
  ["proxy-authenticate", ""],
  ["proxy-authorization", ""],
  ["range", ""],
  ["referer", ""],
  ["refresh", ""],
  ["retry-after", ""],
  ["server", ""],
  ["set-cookie", ""],
  ["strict-transport-security", ""],
  ["transfer-encoding", ""],
  ["user-agent", ""],
  ["vary", ""],
  ["via", ""],
  ["www-authenticate", ""],
];

/**
 * RFC 7541 Appendix B: the bit length of each symbol's code (the 256 octets,
 * then EOS). The code is canonical, so the codes themselves follow from the
 * lengths: symbols ordered by length, then by value, count up from zero.
 */
const HUFFMAN_BITS: ReadonlyArray<number> = [
  13, 23, 28, 28, 28, 28, 28, 28, 28, 24, 30, 28, 28, 30, 28, 28, 28, 28, 28, 28, 28, 28, 30, 28,
  28, 28, 28, 28, 28, 28, 28, 28, 6, 10, 10, 12, 13, 6, 8, 11, 10, 10, 8, 11, 8, 6, 6, 6, 5, 5, 5,
  6, 6, 6, 6, 6, 6, 6, 7, 8, 15, 6, 12, 10, 13, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
  7, 7, 7, 7, 7, 7, 8, 7, 8, 13, 19, 13, 14, 6, 15, 5, 6, 5, 6, 5, 6, 6, 6, 5, 7, 7, 6, 6, 6, 5, 6,
  7, 6, 5, 5, 6, 7, 7, 7, 7, 7, 15, 11, 14, 13, 28, 20, 22, 20, 20, 22, 22, 22, 23, 22, 23, 23, 23,
  23, 23, 24, 23, 24, 24, 22, 23, 24, 23, 23, 23, 23, 21, 22, 23, 22, 23, 23, 24, 22, 21, 20, 22,
  22, 23, 23, 21, 23, 22, 22, 24, 21, 22, 23, 23, 21, 21, 22, 21, 23, 22, 23, 23, 20, 22, 22, 22,
  23, 22, 22, 23, 26, 26, 20, 19, 22, 23, 22, 25, 26, 26, 26, 27, 27, 26, 24, 25, 19, 21, 26, 27,
  27, 26, 27, 24, 21, 21, 26, 26, 28, 27, 27, 27, 20, 24, 20, 21, 22, 21, 21, 23, 22, 22, 25, 25,
  24, 24, 26, 23, 26, 27, 26, 26, 27, 27, 27, 27, 27, 28, 27, 27, 27, 27, 27, 26, 30,
];

const EOS = 256;

/**
 * The code as a binary tree in one array. Node `n` keeps its two branches at
 * `2n` and `2n + 1`: a positive entry is the next node, a negative one is a
 * symbol (`-(symbol + 1)`).
 */
const buildHuffmanTree = (): number[] => {
  const symbols = HUFFMAN_BITS.map((bits, symbol) => ({ bits, symbol })).sort(
    (a, b) => a.bits - b.bits || a.symbol - b.symbol,
  );
  const tree = [0, 0];
  let code = 0;
  let previous = 0;
  for (const { bits, symbol } of symbols) {
    code <<= bits - previous;
    previous = bits;
    let node = 0;
    for (let bit = bits - 1; bit >= 0; bit--) {
      const slot = node * 2 + ((code >>> bit) & 1);
      if (bit === 0) tree[slot] = -(symbol + 1);
      else {
        if (tree[slot] === 0) {
          tree[slot] = tree.length / 2;
          tree.push(0, 0);
        }
        node = tree[slot]!;
      }
    }
    code++;
  }
  return tree;
};

let huffmanTree: number[] | undefined;

/** Decode a Huffman-coded string (RFC 7541 section 5.2). */
export const huffmanDecode = (bytes: Uint8Array): Uint8Array => {
  const tree = (huffmanTree ??= buildHuffmanTree());
  const out: number[] = [];
  let node = 0;
  // The bits read since the last symbol: at the end they are the padding,
  // which must be fewer than 8 bits, all ones.
  let pending = 0;
  let ones = true;
  for (const byte of bytes) {
    for (let bit = 7; bit >= 0; bit--) {
      const value = (byte >>> bit) & 1;
      const next = tree[node * 2 + value]!;
      if (next < 0) {
        const symbol = -next - 1;
        if (symbol === EOS) throw new HpackError("Huffman string contains EOS");
        out.push(symbol);
        node = 0;
        pending = 0;
        ones = true;
      } else {
        node = next;
        pending++;
        if (value === 0) ones = false;
      }
    }
  }
  if (pending > 7 || !ones) throw new HpackError("invalid Huffman padding");
  return Uint8Array.from(out);
};

// Header octets are opaque; one character per octet keeps them all, as
// `node:http2` does.
const textOf = (bytes: Uint8Array): string => {
  let out = "";
  for (let i = 0; i < bytes.length; i += 8192) {
    out += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return out;
};

interface Entry {
  readonly name: string;
  readonly value: string;
  /** RFC 7541 section 4.1: the octets of the name and value, plus 32. */
  readonly size: number;
}

/** Reads the header blocks of one connection, in the order they arrive. */
export interface HpackDecoder {
  /** The fields of one complete header block. */
  decode(block: Uint8Array): HeaderField[];
}

/**
 * A decoder for one connection. `maxTableSize` is the dynamic table size
 * this end allows (`SETTINGS_HEADER_TABLE_SIZE`, 4096 unless set).
 */
export const makeDecoder = (maxTableSize = 4096): HpackDecoder => {
  // Newest first, so dynamic index 62 is `dynamic[0]`.
  const dynamic: Entry[] = [];
  let size = 0;
  let limit = maxTableSize;

  const evict = () => {
    while (size > limit) size -= dynamic.pop()!.size;
  };

  const lookup = (index: number): { readonly name: string; readonly value: string } => {
    if (index >= 1 && index <= STATIC_TABLE.length) {
      const [name, value] = STATIC_TABLE[index - 1]!;
      return { name, value };
    }
    const entry = dynamic[index - STATIC_TABLE.length - 1];
    if (entry === undefined) throw new HpackError(`no header at index ${index}`);
    return entry;
  };

  return {
    decode(block) {
      const fields: HeaderField[] = [];
      let at = 0;

      const integer = (prefix: number): number => {
        if (at >= block.length) throw new HpackError("header block ends inside an integer");
        const max = 2 ** prefix - 1;
        let value = block[at++]! & max;
        if (value < max) return value;
        for (let shift = 0; ; shift += 7) {
          if (at >= block.length) throw new HpackError("header block ends inside an integer");
          if (shift > 28) throw new HpackError("integer is too large");
          const byte = block[at++]!;
          value += (byte & 0x7f) * 2 ** shift;
          if ((byte & 0x80) === 0) return value;
        }
      };

      const string = (): { readonly text: string; readonly octets: number } => {
        if (at >= block.length) throw new HpackError("header block ends inside a string");
        const huffman = (block[at]! & 0x80) !== 0;
        const length = integer(7);
        if (at + length > block.length) throw new HpackError("header block ends inside a string");
        const raw = block.subarray(at, at + length);
        at += length;
        const bytes = huffman ? huffmanDecode(raw) : raw;
        return { text: textOf(bytes), octets: bytes.length };
      };

      const literal = (prefix: number, index: boolean) => {
        const nameIndex = integer(prefix);
        let name: string;
        let nameOctets: number;
        if (nameIndex === 0) {
          const read = string();
          name = read.text;
          nameOctets = read.octets;
        } else {
          name = lookup(nameIndex).name;
          nameOctets = name.length;
        }
        const value = string();
        fields.push([name, value.text]);
        if (index) {
          const entry = { name, value: value.text, size: nameOctets + value.octets + 32 };
          dynamic.unshift(entry);
          size += entry.size;
          evict();
        }
      };

      while (at < block.length) {
        const first = block[at]!;
        if ((first & 0x80) !== 0) {
          const { name, value } = lookup(integer(7));
          fields.push([name, value]);
        } else if ((first & 0x40) !== 0) {
          literal(6, true);
        } else if ((first & 0x20) !== 0) {
          const next = integer(5);
          if (next > maxTableSize) throw new HpackError("dynamic table size exceeds the limit");
          limit = next;
          evict();
        } else {
          // Without indexing (0000) and never indexed (0001) read the same.
          literal(4, false);
        }
      }
      return fields;
    },
  };
};

const encoder = /*@__PURE__*/ new TextEncoder();

const pushInteger = (out: number[], value: number, prefix: number, flags: number) => {
  const max = 2 ** prefix - 1;
  if (value < max) {
    out.push(flags | value);
    return;
  }
  out.push(flags | max);
  let rest = value - max;
  while (rest >= 128) {
    out.push((rest % 128) | 0x80);
    rest = Math.floor(rest / 128);
  }
  out.push(rest);
};

const pushString = (out: number[], text: string) => {
  const bytes = encoder.encode(text);
  pushInteger(out, bytes.length, 7, 0);
  for (const byte of bytes) out.push(byte);
};

/**
 * A header block for `fields`, each a literal without indexing (RFC 7541
 * section 6.2.2). Names must be lowercase, pseudo-headers first.
 */
export const encode = (fields: ReadonlyArray<HeaderField>): Uint8Array => {
  const out: number[] = [];
  for (const [name, value] of fields) {
    out.push(0);
    pushString(out, name);
    pushString(out, value);
  }
  return Uint8Array.from(out);
};
