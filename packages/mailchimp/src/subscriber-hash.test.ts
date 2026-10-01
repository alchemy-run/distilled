import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { md5, subscriberHash } from "./subscriber-hash.ts";

describe("subscriberHash", () => {
  test("matches the RFC 1321 vectors", () => {
    expect(md5("")).toBe("d41d8cd98f00b204e9800998ecf8427e");
    expect(md5("abc")).toBe("900150983cd24fb0d6963f7d28e17f72");
    expect(md5("message digest")).toBe("f96b697d7cb7938d525a2f31aaf161d0");
    expect(
      md5(
        "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
      ),
    ).toBe("57edf4a22be3c955ac49da2e2107b67a");
  });

  test("hashes the lowercased address", () => {
    expect(subscriberHash("Ada.Lovelace@Example.COM")).toBe(
      md5("ada.lovelace@example.com"),
    );
  });

  for (const input of [
    "zoë@example.com",
    "日本語@example.jp",
    "x".repeat(55),
    "x".repeat(56),
    "y".repeat(1000),
  ]) {
    test(`agrees with node:crypto on ${input.slice(0, 20)}`, () => {
      expect(md5(input)).toBe(
        createHash("md5").update(input, "utf8").digest("hex"),
      );
    });
  }
});
