import { describe, expect, test } from "bun:test";
import * as zlib from "node:zlib";
import { Crc32, getCrc32ChecksumAlgorithmFunction } from "./crc32.ts";

const textEncoder = new TextEncoder();

describe("Crc32", () => {
  test("matches the standard CRC32 check value", async () => {
    const crc32 = new Crc32();
    crc32.update(textEncoder.encode("123456789"));

    expect(await crc32.digest()).toEqual(Uint8Array.of(0xcb, 0xf4, 0x39, 0x26));
  });

  test("supports incremental updates and reset", async () => {
    const crc32 = new Crc32();
    crc32.update(textEncoder.encode("hello"));
    crc32.update(textEncoder.encode("world"));

    const expected = zlib.crc32(textEncoder.encode("helloworld"));
    expect(await crc32.digest()).toEqual(
      Uint8Array.of(
        (expected & 0xff000000) >>> 24,
        (expected & 0x00ff0000) >>> 16,
        (expected & 0x0000ff00) >>> 8,
        expected & 0x000000ff,
      ),
    );

    crc32.reset();
    expect(await crc32.digest()).toEqual(Uint8Array.of(0, 0, 0, 0));
  });

  test("uses the native Node implementation when available", () => {
    expect(getCrc32ChecksumAlgorithmFunction()).not.toBe(Crc32);
  });
});
