import * as http2 from "node:http2";
import * as net from "node:net";
import { describe, expect, test } from "vitest";
import {
  encode,
  type HeaderField,
  type HpackDecoder,
  HpackError,
  huffmanDecode,
  makeDecoder,
} from "../src/hpack.ts";
import { HUFFMAN_CODES, STATIC_TABLE } from "./fixtures/rfc7541.ts";

// The tests write header blocks with their own encoder, built here from the
// RFC's text, so the decoder is never checked against itself.

const hex = (text: string) => new Uint8Array(Buffer.from(text.replace(/\s+/g, ""), "hex"));

/** One octet per character. */
const octets = (text: string) => Uint8Array.from(text, (char) => char.charCodeAt(0));

const cat = (...parts: ReadonlyArray<ArrayLike<number>>) =>
  Uint8Array.from(parts.flatMap((part) => Array.from(part)));

/** RFC 7541 section 5.1: an integer in an N-bit prefix, under the `flags` of its first octet. */
const int = (value: number, prefix: number, flags = 0): number[] => {
  const max = 2 ** prefix - 1;
  if (value < max) return [flags | value];
  const out = [flags | max];
  let rest = value - max;
  while (rest >= 128) {
    out.push((rest % 128) + 128);
    rest = Math.floor(rest / 128);
  }
  out.push(rest);
  return out;
};

/** The bits of `text` in the Huffman code of Appendix B. */
const huffmanBits = (text: ArrayLike<number>): number[] => {
  const bits: number[] = [];
  for (const symbol of Array.from(text)) {
    const [code, length] = HUFFMAN_CODES[symbol]!;
    for (let bit = length - 1; bit >= 0; bit--) bits.push((code >>> bit) & 1);
  }
  return bits;
};

/** Bits as octets, the last one filled up with `padding`. */
const pack = (bits: ReadonlyArray<number>, padding: 0 | 1 = 1): Uint8Array => {
  const out = new Uint8Array(Math.ceil(bits.length / 8));
  for (let at = 0; at < out.length * 8; at++) {
    out[at >> 3]! |= (bits[at] ?? padding) << (7 - (at & 7));
  }
  return out;
};

const huffman = (text: string) => pack(huffmanBits(octets(text)));

/** Section 5.2: a string literal, plain or Huffman coded. */
const str = (text: string, coded = false): Uint8Array => {
  const body = coded ? huffman(text) : octets(text);
  return cat(int(body.length, 7, coded ? 0x80 : 0), body);
};

/** Section 6.1: an indexed field. */
const indexed = (index: number) => Uint8Array.from(int(index, 7, 0x80));

/** A literal field: its name is an index, or a string. */
const literal =
  (prefix: number, flags: number) =>
  (name: number | string, value: string, coded = false): Uint8Array =>
    typeof name === "number"
      ? cat(int(name, prefix, flags), str(value, coded))
      : cat([flags], str(name, coded), str(value, coded));

/** Section 6.2.1: a literal that joins the dynamic table. */
const incremental = literal(6, 0x40);
/** Section 6.2.2: a literal that does not. */
const without = literal(4, 0x00);
/** Section 6.2.3: a literal no hop may index. */
const never = literal(4, 0x10);

/** Section 6.3: a dynamic table size update. */
const resize = (size: number) => Uint8Array.from(int(size, 5, 0x20));

/** The dynamic table, newest first, read through indexed fields (which leave it alone). */
const tableOf = (decoder: HpackDecoder): HeaderField[] => {
  const entries: HeaderField[] = [];
  for (let index = STATIC_TABLE.length + 1; ; index++) {
    try {
      entries.push(decoder.decode(indexed(index))[0]!);
    } catch {
      return entries;
    }
  }
};

const refuses = (run: () => unknown, message: string) => {
  let thrown: unknown;
  try {
    run();
  } catch (error) {
    thrown = error;
  }
  expect(thrown).toBeInstanceOf(HpackError);
  expect((thrown as HpackError).message).toBe(message);
};

describe("the RFC 7541 fixture", () => {
  test("is whole", () => {
    expect(STATIC_TABLE).toHaveLength(61);
    expect(HUFFMAN_CODES).toHaveLength(257);
    expect(HUFFMAN_CODES[256]).toEqual([0x3fffffff, 30]);
  });

  test("its Huffman code is a prefix code", () => {
    const codes = HUFFMAN_CODES.map(([code, bits]) => code.toString(2).padStart(bits, "0")).sort();
    for (let at = 1; at < codes.length; at++) {
      expect(codes[at]!.startsWith(codes[at - 1]!)).toBe(false);
    }
  });
});

describe("the static table", () => {
  test("every index reads as Appendix A lists it", () => {
    const decoder = makeDecoder();
    STATIC_TABLE.forEach((field, at) => {
      expect(decoder.decode(indexed(at + 1))).toEqual([field]);
    });
    // All of it in one block.
    expect(decoder.decode(cat(...STATIC_TABLE.map((_, at) => indexed(at + 1))))).toEqual(
      STATIC_TABLE,
    );
  });

  test("every index names a literal of each form", () => {
    for (const form of [incremental, without, never]) {
      STATIC_TABLE.forEach(([name], at) => {
        expect(makeDecoder().decode(form(at + 1, `value ${at}`))).toEqual([[name, `value ${at}`]]);
      });
    }
  });

  test("there is no index 0", () => {
    refuses(() => makeDecoder().decode(hex("80")), "no header at index 0");
  });

  test("an index past it reads the dynamic table, which starts empty", () => {
    refuses(() => makeDecoder().decode(indexed(62)), "no header at index 62");
    refuses(() => makeDecoder().decode(indexed(100_000)), "no header at index 100000");
    refuses(() => makeDecoder().decode(incremental(62, "v")), "no header at index 62");
    refuses(() => makeDecoder().decode(without(62, "v")), "no header at index 62");
    refuses(() => makeDecoder().decode(never(62, "v")), "no header at index 62");
  });
});

// Each block of an example continues the connection of the one before.
describe("RFC 7541 Appendix C", () => {
  test("C.1: integers", () => {
    // 10 and 1337 in a 5-bit prefix, read as table sizes: the limit tells
    // the value that was read.
    expect(int(10, 5)).toEqual([0x0a]);
    expect(int(1337, 5)).toEqual([0x1f, 0x9a, 0x0a]);
    expect(int(42, 8)).toEqual([0x2a]);
    expect(makeDecoder(10).decode(hex("2a"))).toEqual([]);
    refuses(() => makeDecoder(9).decode(hex("2a")), "dynamic table size exceeds the limit");
    expect(makeDecoder(1337).decode(hex("3f9a0a"))).toEqual([]);
    refuses(() => makeDecoder(1336).decode(hex("3f9a0a")), "dynamic table size exceeds the limit");
  });

  test("C.2.1: a literal with indexing", () => {
    const decoder = makeDecoder();
    const block = hex("400a 6375 7374 6f6d 2d6b 6579 0d63 7573 746f 6d2d 6865 6164 6572");
    expect(decoder.decode(block)).toEqual([["custom-key", "custom-header"]]);
    expect(tableOf(decoder)).toEqual([["custom-key", "custom-header"]]);
    expect(incremental("custom-key", "custom-header")).toEqual(block);
  });

  test("C.2.2: a literal without indexing", () => {
    const decoder = makeDecoder();
    const block = hex("040c 2f73 616d 706c 652f 7061 7468");
    expect(decoder.decode(block)).toEqual([[":path", "/sample/path"]]);
    expect(tableOf(decoder)).toEqual([]);
    expect(without(4, "/sample/path")).toEqual(block);
  });

  test("C.2.3: a literal never indexed", () => {
    const decoder = makeDecoder();
    const block = hex("1008 7061 7373 776f 7264 0673 6563 7265 74");
    expect(decoder.decode(block)).toEqual([["password", "secret"]]);
    expect(tableOf(decoder)).toEqual([]);
    expect(never("password", "secret")).toEqual(block);
  });

  test("C.2.4: an indexed field", () => {
    const decoder = makeDecoder();
    expect(decoder.decode(hex("82"))).toEqual([[":method", "GET"]]);
    expect(tableOf(decoder)).toEqual([]);
  });

  const requests = (blocks: readonly [string, string, string]) => {
    const decoder = makeDecoder();
    expect(decoder.decode(hex(blocks[0]))).toEqual([
      [":method", "GET"],
      [":scheme", "http"],
      [":path", "/"],
      [":authority", "www.example.com"],
    ]);
    expect(tableOf(decoder)).toEqual([[":authority", "www.example.com"]]);
    expect(decoder.decode(hex(blocks[1]))).toEqual([
      [":method", "GET"],
      [":scheme", "http"],
      [":path", "/"],
      [":authority", "www.example.com"],
      ["cache-control", "no-cache"],
    ]);
    expect(tableOf(decoder)).toEqual([
      ["cache-control", "no-cache"],
      [":authority", "www.example.com"],
    ]);
    expect(decoder.decode(hex(blocks[2]))).toEqual([
      [":method", "GET"],
      [":scheme", "https"],
      [":path", "/index.html"],
      [":authority", "www.example.com"],
      ["custom-key", "custom-value"],
    ]);
    expect(tableOf(decoder)).toEqual([
      ["custom-key", "custom-value"],
      ["cache-control", "no-cache"],
      [":authority", "www.example.com"],
    ]);
  };

  test("C.3: requests without Huffman coding", () => {
    requests([
      "8286 8441 0f77 7777 2e65 7861 6d70 6c65 2e63 6f6d",
      "8286 84be 5808 6e6f 2d63 6163 6865",
      "8287 85bf 400a 6375 7374 6f6d 2d6b 6579 0c63 7573 746f 6d2d 7661 6c75 65",
    ]);
  });

  test("C.4: requests with Huffman coding", () => {
    requests([
      "8286 8441 8cf1 e3c2 e5f2 3a6b a0ab 90f4 ff",
      "8286 84be 5886 a8eb 1064 9cbf",
      "8287 85bf 4088 25a8 49e9 5ba9 7d7f 8925 a849 e95b b8e8 b4bf",
    ]);
  });

  // The table holds 256 octets, so each response evicts.
  const responses = (blocks: readonly [string, string, string]) => {
    const decoder = makeDecoder(256);
    expect(decoder.decode(hex(blocks[0]))).toEqual([
      [":status", "302"],
      ["cache-control", "private"],
      ["date", "Mon, 21 Oct 2013 20:13:21 GMT"],
      ["location", "https://www.example.com"],
    ]);
    expect(tableOf(decoder)).toEqual([
      ["location", "https://www.example.com"],
      ["date", "Mon, 21 Oct 2013 20:13:21 GMT"],
      ["cache-control", "private"],
      [":status", "302"],
    ]);
    expect(decoder.decode(hex(blocks[1]))).toEqual([
      [":status", "307"],
      ["cache-control", "private"],
      ["date", "Mon, 21 Oct 2013 20:13:21 GMT"],
      ["location", "https://www.example.com"],
    ]);
    expect(tableOf(decoder)).toEqual([
      [":status", "307"],
      ["location", "https://www.example.com"],
      ["date", "Mon, 21 Oct 2013 20:13:21 GMT"],
      ["cache-control", "private"],
    ]);
    expect(decoder.decode(hex(blocks[2]))).toEqual([
      [":status", "200"],
      ["cache-control", "private"],
      ["date", "Mon, 21 Oct 2013 20:13:22 GMT"],
      ["location", "https://www.example.com"],
      ["content-encoding", "gzip"],
      ["set-cookie", "foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1"],
    ]);
    expect(tableOf(decoder)).toEqual([
      ["set-cookie", "foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1"],
      ["content-encoding", "gzip"],
      ["date", "Mon, 21 Oct 2013 20:13:22 GMT"],
    ]);
  };

  test("C.5: responses without Huffman coding", () => {
    responses([
      `4803 3330 3258 0770 7269 7661 7465 611d 4d6f 6e2c 2032 3120 4f63 7420 3230 3133
       2032 303a 3133 3a32 3120 474d 546e 1768 7474 7073 3a2f 2f77 7777 2e65 7861 6d70
       6c65 2e63 6f6d`,
      "4803 3330 37c1 c0bf",
      `88c1 611d 4d6f 6e2c 2032 3120 4f63 7420 3230 3133 2032 303a 3133 3a32 3220 474d
       54c0 5a04 677a 6970 7738 666f 6f3d 4153 444a 4b48 514b 425a 584f 5157 454f 5049
       5541 5851 5745 4f49 553b 206d 6178 2d61 6765 3d33 3630 303b 2076 6572 7369 6f6e
       3d31`,
    ]);
  });

  test("C.6: responses with Huffman coding", () => {
    responses([
      `4882 6402 5885 aec3 771a 4b61 96d0 7abe 9410 54d4 44a8 2005 9504 0b81 66e0 82a6
       2d1b ff6e 919d 29ad 1718 63c7 8f0b 97c8 e9ae 82ae 43d3`,
      "4883 640e ffc1 c0bf",
      `88c1 6196 d07a be94 1054 d444 a820 0595 040b 8166 e084 a62d 1bff c05a 839b d9ab
       77ad 94e7 821d d7f2 e6c7 b335 dfdf cd5b 3960 d5af 2708 7f36 72c1 ab27 0fb5 291f
       9587 3160 65c0 03ed 4ee5 b106 3d50 07`,
    ]);
  });

  test("the Huffman strings of C.4 and C.6", () => {
    const strings: ReadonlyArray<readonly [string, string]> = [
      ["www.example.com", "f1e3 c2e5 f23a 6ba0 ab90 f4ff"],
      ["no-cache", "a8eb 1064 9cbf"],
      ["custom-key", "25a8 49e9 5ba9 7d7f"],
      ["custom-value", "25a8 49e9 5bb8 e8b4 bf"],
      ["302", "6402"],
      ["307", "640e ff"],
      ["private", "aec3 771a 4b"],
      ["Mon, 21 Oct 2013 20:13:21 GMT", "d07a be94 1054 d444 a820 0595 040b 8166 e082 a62d 1bff"],
      ["Mon, 21 Oct 2013 20:13:22 GMT", "d07a be94 1054 d444 a820 0595 040b 8166 e084 a62d 1bff"],
      ["https://www.example.com", "9d29 ad17 1863 c78f 0b97 c8e9 ae82 ae43 d3"],
      ["gzip", "9bd9 ab"],
      [
        "foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1",
        `94e7 821d d7f2 e6c7 b335 dfdf cd5b 3960 d5af 2708 7f36 72c1 ab27 0fb5 291f 9587
         3160 65c0 03ed 4ee5 b106 3d50 07`,
      ],
    ];
    for (const [text, coded] of strings) {
      expect(huffman(text)).toEqual(hex(coded));
      expect(huffmanDecode(hex(coded))).toEqual(octets(text));
    }
  });
});

describe("integers", () => {
  // A table size update reads a 5-bit prefix, and the limit tells its value.
  const reads = (bytes: string, value: number) => {
    expect(makeDecoder(value).decode(hex(bytes))).toEqual([]);
    if (value > 0) {
      refuses(
        () => makeDecoder(value - 1).decode(hex(bytes)),
        "dynamic table size exceeds the limit",
      );
    }
  };

  test("a value below the prefix's limit is one octet", () => {
    reads("20", 0);
    reads("21", 1);
    reads("3e", 30);
  });

  test("a value from the prefix's limit on continues, seven bits an octet", () => {
    reads("3f 00", 31);
    reads("3f 01", 32);
    reads("3f 7f", 158);
    reads("3f 80 01", 159);
    reads("3f ff 7f", 31 + 16_383);
    reads("3f 80 80 01", 31 + 16_384);
    reads("3f ff ff ff 7f", 31 + 2 ** 28 - 1);
    reads("3f 80 80 80 80 01", 31 + 2 ** 28);
    // The largest: five octets of continuation, 35 bits.
    reads("3f ff ff ff ff 7f", 31 + 2 ** 35 - 1);
  });

  test("an integer may be longer than it needs to be", () => {
    reads("3f 80 00", 31);
    reads("3f 81 80 80 80 00", 32);
  });

  test("the test encoder writes what the decoder reads", () => {
    for (const value of [0, 30, 31, 32, 158, 159, 4096, 2 ** 31, 2 ** 35 + 30]) {
      expect(makeDecoder(value).decode(resize(value))).toEqual([]);
    }
  });

  test("a sixth octet of continuation is too large", () => {
    refuses(() => makeDecoder().decode(hex("3f 80 80 80 80 80 01")), "integer is too large");
    refuses(() => makeDecoder().decode(hex("ff 80 80 80 80 80 01")), "integer is too large");
    refuses(() => makeDecoder().decode(hex("7f 80 80 80 80 80 01")), "integer is too large");
    refuses(() => makeDecoder().decode(hex("0f 80 80 80 80 80 01")), "integer is too large");
    refuses(() => makeDecoder().decode(hex("00 7f 80 80 80 80 80 01")), "integer is too large");
  });

  test("a block that ends inside one is refused", () => {
    for (const bytes of ["3f", "3f 80", "3f ff ff ff ff", "3f 80 80 80 80 80"]) {
      refuses(() => makeDecoder().decode(hex(bytes)), "header block ends inside an integer");
    }
    // An index, a name index of each prefix, and a string's length.
    for (const bytes of ["ff", "ff 80", "7f", "7f ff", "0f", "1f", "1f 80", "00 7f", "00 7f 80"]) {
      refuses(() => makeDecoder().decode(hex(bytes)), "header block ends inside an integer");
    }
  });

  test("an index of each prefix reads past its first octet", () => {
    // Sixty-five entries, so the indices 62 to 126 exist.
    const decoder = makeDecoder(65 * 34);
    for (let at = 0; at < 65; at++) {
      decoder.decode(incremental(String.fromCharCode(48 + at), ""));
    }
    // Index 126 is the oldest, 62 the newest.
    expect(decoder.decode(indexed(126))).toEqual([["0", ""]]);
    expect(decoder.decode(indexed(62))).toEqual([["p", ""]]);
    // 63 is the limit of a 6-bit prefix, 15 of a 4-bit one.
    expect(incremental(63, "v").subarray(0, 2)).toEqual(hex("7f 00"));
    expect(without(15, "v").subarray(0, 2)).toEqual(hex("0f 00"));
    expect(never(126, "v").subarray(0, 2)).toEqual(hex("1f 6f"));
    expect(decoder.decode(without(63, "v"))).toEqual([["o", "v"]]);
    expect(decoder.decode(never(126, "v"))).toEqual([["0", "v"]]);
    refuses(() => decoder.decode(indexed(127)), "no header at index 127");
    expect(decoder.decode(incremental(63, "v"))).toEqual([["o", "v"]]);
    // The new entry moved every other one up.
    expect(decoder.decode(indexed(127))).toEqual([["0", ""]]);
    refuses(() => decoder.decode(indexed(128)), "no header at index 128");
  });
});

describe("strings", () => {
  test("a name and a value may be empty", () => {
    expect(makeDecoder().decode(hex("00 00 00"))).toEqual([["", ""]]);
    expect(makeDecoder().decode(hex("00 80 80"))).toEqual([["", ""]]);
    expect(makeDecoder().decode(without("name", ""))).toEqual([["name", ""]]);
    expect(makeDecoder().decode(without(1, "", true))).toEqual([[":authority", ""]]);
  });

  test("every octet is kept, one character each", () => {
    const all = String.fromCharCode(...Array.from({ length: 256 }, (_, octet) => octet));
    expect(makeDecoder().decode(without("x", all))).toEqual([["x", all]]);
    expect(makeDecoder().decode(without("x", all, true))).toEqual([["x", all]]);
    expect(makeDecoder().decode(without(all, "x"))).toEqual([[all, "x"]]);
  });

  test("a string of any length is read whole", () => {
    // Around the limits of the 7-bit length, and of the step it is read in.
    for (const length of [1, 126, 127, 128, 255, 8191, 8192, 8193, 16_384, 20_000]) {
      const text = Array.from({ length }, (_, at) => String.fromCharCode(97 + (at % 26))).join("");
      expect(makeDecoder().decode(without("x", text))).toEqual([["x", text]]);
      expect(makeDecoder().decode(without(text, text, true))).toEqual([[text, text]]);
    }
  });

  test("a name and a value may be coded differently", () => {
    const block = cat([0x00], str("custom-key", true), str("custom-value"));
    expect(makeDecoder().decode(block)).toEqual([["custom-key", "custom-value"]]);
    const other = cat([0x00], str("custom-key"), str("custom-value", true));
    expect(makeDecoder().decode(other)).toEqual([["custom-key", "custom-value"]]);
  });

  test("a block that ends before or inside one is refused", () => {
    const cut = [
      // No name; no value after a name; no value after a name index.
      "00",
      "40",
      "10",
      "00 01 61",
      "40 01 61",
      "10 01 61",
      "04",
      "44",
      "14",
      // A name, then a value, shorter than its length.
      "00 05 61 62",
      "00 01 61 05 62",
      "00 01 61 01",
      "44 03 61 62",
      "00 85 f1 e3",
      // A length past any block.
      "00 7f ff ff ff ff 7f",
    ];
    for (const bytes of cut) {
      refuses(() => makeDecoder().decode(hex(bytes)), "header block ends inside a string");
    }
  });

  test("a Huffman string that breaks its code is refused", () => {
    refuses(() => makeDecoder().decode(hex("00 84 ffffffff 00")), "Huffman string contains EOS");
    refuses(() => makeDecoder().decode(hex("00 81 00 00")), "invalid Huffman padding");
    refuses(() => makeDecoder().decode(hex("00 00 82 1fff")), "invalid Huffman padding");
  });
});

describe("Huffman decoding", () => {
  test("nothing is nothing", () => {
    expect(huffmanDecode(new Uint8Array(0))).toEqual(new Uint8Array(0));
  });

  test("every octet has the code Appendix B gives it", () => {
    for (let octet = 0; octet < 256; octet++) {
      expect(huffmanDecode(pack(huffmanBits([octet])))).toEqual(Uint8Array.of(octet));
    }
  });

  test("every octet after every other", () => {
    const up = Array.from({ length: 256 }, (_, octet) => octet);
    expect(huffmanDecode(pack(huffmanBits(up)))).toEqual(Uint8Array.from(up));
    const down = up.toReversed();
    expect(huffmanDecode(pack(huffmanBits(down)))).toEqual(Uint8Array.from(down));
    // Each octet next to one of each code length.
    const mixed = up.flatMap((octet) => [octet, 48, 255 - octet, 10]);
    expect(huffmanDecode(pack(huffmanBits(mixed)))).toEqual(Uint8Array.from(mixed));
  });

  // "0" has a 5-bit code, so one to eight of them leave every length of padding.
  const zeros = (count: number) => huffmanBits(octets("0".repeat(count)));
  const paddings = [1, 2, 3, 4, 5, 6, 7, 8].map((count) => ({
    count,
    padding: (8 - ((count * 5) % 8)) % 8,
  }));

  test("padding is up to seven bits of ones", () => {
    expect(paddings.map((each) => each.padding).toSorted()).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    for (const { count } of paddings) {
      expect(huffmanDecode(pack(zeros(count)))).toEqual(octets("0".repeat(count)));
    }
  });

  /** Appendix B read the slow way: the symbols of `bits`, or nothing when they break the code. */
  const symbolOf = new Map(
    HUFFMAN_CODES.map(([code, bits], symbol) => [code.toString(2).padStart(bits, "0"), symbol]),
  );
  const reference = (bits: ReadonlyArray<number>): number[] | undefined => {
    const symbols: number[] = [];
    let pending = "";
    for (const bit of bits) {
      pending += bit;
      const symbol = symbolOf.get(pending);
      if (symbol === undefined) continue;
      if (symbol === 256) return undefined;
      symbols.push(symbol);
      pending = "";
    }
    return pending.length > 7 || pending.includes("0") ? undefined : symbols;
  };

  test("every way to fill the last octet", () => {
    // After the last whole code, every pattern of the bits that are left:
    // a short code and its padding, padding alone, or neither.
    let refused = 0;
    let read = 0;
    for (const { count, padding } of paddings) {
      for (let pattern = 0; pattern < 2 ** padding; pattern++) {
        const tail = Array.from({ length: padding }, (_, bit) => (pattern >> bit) & 1);
        const bits = [...zeros(count), ...tail];
        const expected = reference(bits);
        if (expected === undefined) {
          refuses(() => huffmanDecode(pack(bits)), "invalid Huffman padding");
          refused++;
        } else {
          expect(huffmanDecode(pack(bits))).toEqual(Uint8Array.from(expected));
          read++;
        }
      }
    }
    expect(refused + read).toBe(255);
    expect(refused).toBeGreaterThan(100);
    expect(read).toBeGreaterThan(8);
  });

  test("every two octets there are", () => {
    for (let octets = 0; octets < 0x10000; octets++) {
      const bytes = Uint8Array.of(octets >> 8, octets & 0xff);
      const bits = Array.from({ length: 16 }, (_, bit) => (octets >> (15 - bit)) & 1);
      const expected = reference(bits);
      if (expected === undefined) {
        refuses(() => huffmanDecode(bytes), "invalid Huffman padding");
      } else {
        expect(huffmanDecode(bytes)).toEqual(Uint8Array.from(expected));
      }
    }
  });

  test("padding of a whole octet or more is refused", () => {
    refuses(() => huffmanDecode(hex("ff")), "invalid Huffman padding");
    refuses(() => huffmanDecode(hex("ffff")), "invalid Huffman padding");
    refuses(() => huffmanDecode(hex("ffffff")), "invalid Huffman padding");
    for (const { count } of paddings) {
      refuses(() => huffmanDecode(cat(pack(zeros(count)), [0xff])), "invalid Huffman padding");
    }
  });

  test("a string that ends inside a code is refused", () => {
    // The first octet of codes of 13, 23 and 28 bits.
    for (const octet of [0, 1, 2]) {
      const bits = huffmanBits([octet]);
      refuses(() => huffmanDecode(pack(bits.slice(0, 8))), "invalid Huffman padding");
    }
  });

  test("EOS is refused wherever it stands", () => {
    refuses(() => huffmanDecode(hex("ffffffff")), "Huffman string contains EOS");
    refuses(() => huffmanDecode(pack(huffmanBits([256]))), "Huffman string contains EOS");
    refuses(() => huffmanDecode(pack(huffmanBits([97, 256, 98]))), "Huffman string contains EOS");
    refuses(() => huffmanDecode(pack(huffmanBits([97, 98, 256]))), "Huffman string contains EOS");
  });
});

describe("the dynamic table", () => {
  test("the newest entry is index 62", () => {
    const decoder = makeDecoder();
    decoder.decode(cat(incremental("a", "1"), incremental("b", "2")));
    decoder.decode(incremental("c", "3"));
    expect(tableOf(decoder)).toEqual([
      ["c", "3"],
      ["b", "2"],
      ["a", "1"],
    ]);
    // An entry may be used in the block that adds it.
    expect(decoder.decode(cat(incremental("d", "4"), indexed(62), indexed(63)))).toEqual([
      ["d", "4"],
      ["d", "4"],
      ["c", "3"],
    ]);
  });

  test("the same field twice is two entries", () => {
    const decoder = makeDecoder();
    decoder.decode(cat(incremental("a", "1"), incremental("a", "1")));
    expect(tableOf(decoder)).toEqual([
      ["a", "1"],
      ["a", "1"],
    ]);
  });

  test("only a literal with indexing adds to it", () => {
    const decoder = makeDecoder();
    decoder.decode(
      cat(without("a", "1"), never("b", "2"), without(1, "x"), never(1, "y"), indexed(2)),
    );
    expect(tableOf(decoder)).toEqual([]);
  });

  test("an entry takes its name, its value and 32 octets", () => {
    // "ab" and "cde": 37 octets.
    const fits = makeDecoder(37);
    fits.decode(incremental("ab", "cde"));
    expect(tableOf(fits)).toEqual([["ab", "cde"]]);
    const tight = makeDecoder(36);
    expect(tight.decode(incremental("ab", "cde"))).toEqual([["ab", "cde"]]);
    expect(tableOf(tight)).toEqual([]);
  });

  test("a Huffman string counts as the octets it decodes to", () => {
    // Twelve octets of "0" are eight coded, twelve octets of control
    // characters are forty-two.
    for (const text of ["0".repeat(12), "\u0001".repeat(12)]) {
      const fits = makeDecoder(12 + 12 + 32);
      fits.decode(incremental(text, text, true));
      expect(tableOf(fits)).toEqual([[text, text]]);
      const tight = makeDecoder(12 + 12 + 31);
      tight.decode(incremental(text, text, true));
      expect(tableOf(tight)).toEqual([]);
    }
  });

  test("an indexed name counts as the name's octets", () => {
    // ":authority" is ten octets.
    const fits = makeDecoder(10 + 3 + 32);
    fits.decode(incremental(1, "abc"));
    expect(tableOf(fits)).toEqual([[":authority", "abc"]]);
    const tight = makeDecoder(10 + 3 + 31);
    tight.decode(incremental(1, "abc"));
    expect(tableOf(tight)).toEqual([]);
    // A name from the dynamic table.
    const dynamic = makeDecoder(2 * (4 + 1 + 32));
    dynamic.decode(cat(incremental("name", "1"), incremental(62, "2")));
    expect(tableOf(dynamic)).toEqual([
      ["name", "2"],
      ["name", "1"],
    ]);
    dynamic.decode(incremental(62, "3"));
    expect(tableOf(dynamic)).toEqual([
      ["name", "3"],
      ["name", "2"],
    ]);
  });

  test("a full table evicts its oldest entries", () => {
    // Three entries of 34 octets fit in 102.
    const decoder = makeDecoder(102);
    decoder.decode(cat(incremental("a", "1"), incremental("b", "2"), incremental("c", "3")));
    expect(tableOf(decoder)).toHaveLength(3);
    decoder.decode(incremental("d", "4"));
    expect(tableOf(decoder)).toEqual([
      ["d", "4"],
      ["c", "3"],
      ["b", "2"],
    ]);
    // One of 68 octets takes the room of two.
    decoder.decode(incremental("e", "5".repeat(35)));
    expect(tableOf(decoder)).toEqual([
      ["e", "5".repeat(35)],
      ["d", "4"],
    ]);
    // After an eviction the room is counted afresh.
    decoder.decode(incremental("f", "6"));
    expect(tableOf(decoder)).toEqual([
      ["f", "6"],
      ["e", "5".repeat(35)],
    ]);
  });

  test("an entry larger than the table empties it", () => {
    const decoder = makeDecoder(102);
    decoder.decode(cat(incremental("a", "1"), incremental("b", "2")));
    expect(decoder.decode(incremental("big", "x".repeat(100)))).toEqual([["big", "x".repeat(100)]]);
    expect(tableOf(decoder)).toEqual([]);
    decoder.decode(incremental("c", "3"));
    expect(tableOf(decoder)).toEqual([["c", "3"]]);
  });

  test("an entry may be named after the one it evicts", () => {
    const decoder = makeDecoder(40);
    decoder.decode(incremental("name", "1"));
    expect(decoder.decode(incremental(62, "2"))).toEqual([["name", "2"]]);
    expect(tableOf(decoder)).toEqual([["name", "2"]]);
  });

  test("a table of no size holds nothing", () => {
    const decoder = makeDecoder(0);
    expect(decoder.decode(incremental("a", "1"))).toEqual([["a", "1"]]);
    expect(tableOf(decoder)).toEqual([]);
    expect(decoder.decode(resize(0))).toEqual([]);
    refuses(() => decoder.decode(resize(1)), "dynamic table size exceeds the limit");
  });

  test("the table is 4096 octets unless set", () => {
    expect(makeDecoder().decode(hex("3f e1 1f"))).toEqual([]);
    refuses(() => makeDecoder().decode(hex("3f e2 1f")), "dynamic table size exceeds the limit");
    // 120 entries of 34 octets fit, 121 do not.
    const decoder = makeDecoder();
    for (let at = 0; at < 121; at++) decoder.decode(incremental("n", String.fromCharCode(at)));
    const table = tableOf(decoder);
    expect(table).toHaveLength(120);
    expect(table[0]).toEqual(["n", String.fromCharCode(120)]);
    expect(table[119]).toEqual(["n", String.fromCharCode(1)]);
  });

  test("a size update shrinks the table, oldest entries first", () => {
    const decoder = makeDecoder(200);
    decoder.decode(cat(incremental("a", "1"), incremental("b", "2"), incremental("c", "3")));
    // Room for two entries of 34.
    expect(decoder.decode(resize(68))).toEqual([]);
    expect(tableOf(decoder)).toEqual([
      ["c", "3"],
      ["b", "2"],
    ]);
    decoder.decode(resize(67));
    expect(tableOf(decoder)).toEqual([["c", "3"]]);
    // The smaller size holds for what follows.
    decoder.decode(incremental("d", "4"));
    expect(tableOf(decoder)).toEqual([["d", "4"]]);
  });

  test("a size update to nothing empties the table, and a later one refills it", () => {
    const decoder = makeDecoder(200);
    decoder.decode(cat(incremental("a", "1"), incremental("b", "2")));
    decoder.decode(resize(0));
    expect(tableOf(decoder)).toEqual([]);
    decoder.decode(incremental("c", "3"));
    expect(tableOf(decoder)).toEqual([]);
    // Back to the limit: what was evicted stays gone.
    decoder.decode(cat(resize(200), incremental("d", "4")));
    expect(tableOf(decoder)).toEqual([["d", "4"]]);
    // Two updates may open a block: the smallest size, then the one to keep.
    decoder.decode(cat(resize(0), resize(100), incremental("e", "5")));
    expect(tableOf(decoder)).toEqual([["e", "5"]]);
  });

  test("a size update above the limit is refused", () => {
    expect(makeDecoder(256).decode(resize(256))).toEqual([]);
    refuses(() => makeDecoder(256).decode(resize(257)), "dynamic table size exceeds the limit");
    // The limit is the setting, not the last update.
    const decoder = makeDecoder(256);
    decoder.decode(resize(10));
    expect(decoder.decode(resize(256))).toEqual([]);
    refuses(() => decoder.decode(resize(257)), "dynamic table size exceeds the limit");
  });

  test("a size update after a field is refused", () => {
    for (const field of [indexed(2), incremental("a", "1"), without("a", "1"), never("a", "1")]) {
      refuses(
        () => makeDecoder().decode(cat(field, resize(100))),
        "dynamic table size update after a header field",
      );
    }
  });

  test("each connection has its own table", () => {
    const one = makeDecoder();
    const other = makeDecoder();
    one.decode(incremental("a", "1"));
    expect(tableOf(one)).toEqual([["a", "1"]]);
    expect(tableOf(other)).toEqual([]);
  });
});

describe("decoding", () => {
  test("an empty block has no fields", () => {
    expect(makeDecoder().decode(new Uint8Array(0))).toEqual([]);
  });

  test("a block is read from where its view starts", () => {
    const block = cat([0xff, 0xff], indexed(2), without("a", "1"), [0xff]);
    expect(makeDecoder().decode(block.subarray(2, block.length - 1))).toEqual([
      [":method", "GET"],
      ["a", "1"],
    ]);
  });

  test("the forms of a field mix in one block", () => {
    const decoder = makeDecoder();
    const block = cat(
      resize(1000),
      indexed(3),
      incremental("x-one", "1", true),
      without(62, "2"),
      never("x-two", "3"),
      incremental(31, "application/grpc"),
      indexed(62),
      indexed(63),
    );
    expect(decoder.decode(block)).toEqual([
      [":method", "POST"],
      ["x-one", "1"],
      ["x-one", "2"],
      ["x-two", "3"],
      ["content-type", "application/grpc"],
      ["content-type", "application/grpc"],
      ["x-one", "1"],
    ]);
    expect(tableOf(decoder)).toEqual([
      ["content-type", "application/grpc"],
      ["x-one", "1"],
    ]);
  });
});

describe("encoding", () => {
  test("no fields are an empty block", () => {
    expect(encode([])).toEqual(new Uint8Array(0));
  });

  test("each field is a literal without indexing, its strings plain", () => {
    expect(encode([["a", "b"]])).toEqual(hex("00 01 61 01 62"));
    expect(
      encode([
        [":method", "POST"],
        ["te", "trailers"],
        ["empty", ""],
      ]),
    ).toEqual(cat(without(":method", "POST"), without("te", "trailers"), without("empty", "")));
    // RFC 7541 C.2.2, with the name written out.
    expect(encode([[":path", "/sample/path"]])).toEqual(
      hex("00 05 3a70 6174 68 0c 2f73 616d 706c 652f 7061 7468"),
    );
  });

  test("a length continues past its prefix", () => {
    const lengths: ReadonlyArray<readonly [number, string]> = [
      [0, "00"],
      [1, "01"],
      [126, "7e"],
      [127, "7f 00"],
      [128, "7f 01"],
      [254, "7f 7f"],
      [255, "7f 80 01"],
      [1337 + 96, "7f 9a 0a"],
      [16_510, "7f ff 7f"],
      [16_511, "7f 80 80 01"],
      [100_000, "7f a1 8c 06"],
    ];
    for (const [length, prefix] of lengths) {
      const value = "v".repeat(length);
      const block = encode([["n", value]]);
      expect(block.subarray(0, 3)).toEqual(hex("00 01 6e"));
      expect(block.subarray(3, block.length - length)).toEqual(hex(prefix));
      expect(block.subarray(block.length - length)).toEqual(octets(value));
      expect(makeDecoder().decode(block)).toEqual([["n", value]]);
      // And as a name.
      expect(makeDecoder().decode(encode([[value, "x"]]))).toEqual([[value, "x"]]);
    }
  });

  test("text is written as UTF-8, its length in octets", () => {
    expect(encode([["grpc-message", "café"]])).toEqual(
      cat([0x00], str("grpc-message"), [5], octets("caf"), [0xc3, 0xa9]),
    );
    const [field] = makeDecoder().decode(encode([["grpc-message", "café ☕ 𝄞"]]));
    // One character per octet, so UTF-8 comes back as its octets.
    expect(Buffer.from(field![1], "latin1").toString("utf8")).toBe("café ☕ 𝄞");
  });

  test("decodes back to the same fields and leaves no table behind", () => {
    const fields: HeaderField[] = [
      [":method", "POST"],
      [":scheme", "https"],
      [":path", "/test.Svc/Get?a=1&b=%20"],
      [":authority", "example.com:8443"],
      ["authorization", `Bearer ${"t".repeat(300)}`],
      ["content-type", "application/grpc"],
      ["te", "trailers"],
      ["x-empty", ""],
      ["x-repeat", "1"],
      ["x-repeat", "2"],
    ];
    const decoder = makeDecoder();
    expect(decoder.decode(encode(fields))).toEqual(fields);
    expect(tableOf(decoder)).toEqual([]);
    // Every field of the static table.
    expect(makeDecoder().decode(encode(STATIC_TABLE))).toEqual(STATIC_TABLE);
  });

  test("is what node:http2 reads", async () => {
    const server = http2.createServer();
    const seen = new Promise<http2.IncomingHttpHeaders>((resolve) =>
      server.on("stream", (stream, headers) => {
        resolve(headers);
        stream.close();
      }),
    );
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const { port } = server.address() as net.AddressInfo;
    const socket = net.connect(port, "127.0.0.1");
    const block = encode([
      [":method", "POST"],
      [":scheme", "http"],
      [":path", "/test.Svc/Get"],
      [":authority", "localhost"],
      ["authorization", `Bearer ${"t".repeat(300)}`],
      ["x-empty", ""],
      ["grpc-message", "café"],
    ]);
    socket.write(
      Buffer.concat([
        Buffer.from("PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n", "latin1"),
        Buffer.from([0, 0, 0, 4, 0, 0, 0, 0, 0]),
        // HEADERS on stream 1, END_STREAM | END_HEADERS.
        Buffer.from([block.length >> 16, (block.length >> 8) & 0xff, block.length & 0xff, 1, 5]),
        Buffer.from([0, 0, 0, 1]),
        Buffer.from(block),
      ]),
    );
    const headers = await seen;
    socket.destroy();
    await new Promise((resolve) => server.close(resolve));
    expect(headers[":method"]).toBe("POST");
    expect(headers[":path"]).toBe("/test.Svc/Get");
    expect(headers[":authority"]).toBe("localhost");
    expect(headers.authorization).toBe(`Bearer ${"t".repeat(300)}`);
    expect(headers["x-empty"]).toBe("");
    expect(Buffer.from(headers["grpc-message"] as string, "latin1").toString("utf8")).toBe("café");
  });

  test("node:http2's encoder is what the decoder reads", async () => {
    // A real peer's blocks: Huffman strings, the dynamic table, size updates.
    const blocks: Uint8Array[] = [];
    const server = net.createServer((socket) => {
      let buffered = Buffer.alloc(0);
      let preface = 24;
      socket.on("data", (chunk: Buffer) => {
        buffered = Buffer.concat([buffered, chunk]);
        if (preface > 0) {
          if (buffered.length < preface) return;
          buffered = buffered.subarray(preface);
          preface = 0;
          // This end's SETTINGS, so the client goes on.
          socket.write(Buffer.from([0, 0, 0, 4, 0, 0, 0, 0, 0]));
        }
        while (buffered.length >= 9) {
          const length = buffered.readUIntBE(0, 3);
          if (buffered.length < 9 + length) return;
          // HEADERS with END_HEADERS and no padding or priority.
          if (buffered[3] === 1) blocks.push(new Uint8Array(buffered.subarray(9, 9 + length)));
          buffered = buffered.subarray(9 + length);
        }
      });
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const { port } = server.address() as net.AddressInfo;
    const session = http2.connect(`http://127.0.0.1:${port}`);
    session.on("error", () => undefined);
    const sent: HeaderField[][] = [1, 2, 3].map((call) => [
      [":method", "POST"],
      [":scheme", "http"],
      [":authority", `127.0.0.1:${port}`],
      [":path", "/test.Svc/Get"],
      ["authorization", `Bearer ${"t".repeat(300)}`],
      ["content-type", "application/grpc"],
      ["x-call", String(call)],
      ["grpc-message", "café \u0001"],
    ]);
    for (const fields of sent) {
      const stream = session.request(Object.fromEntries(fields), { endStream: true });
      stream.on("error", () => undefined);
    }
    await expect.poll(() => blocks.length, { timeout: 5000 }).toBe(3);
    session.destroy();
    await new Promise((resolve) => server.close(resolve));

    const decoder = makeDecoder();
    const sorted = (fields: ReadonlyArray<HeaderField>) =>
      fields.toSorted((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    blocks.forEach((block, at) => {
      expect(sorted(decoder.decode(block))).toEqual(sorted(sent[at]!));
    });
    // nghttp2 indexed what repeats, so later blocks are shorter and the
    // table is in use.
    expect(blocks[1]!.length).toBeLessThan(blocks[0]!.length);
    expect(tableOf(decoder).length).toBeGreaterThan(0);
  });
});
