import { expect } from "@effect/vitest";
import * as S from "effect/Schema";
import { describe, it } from "vitest";
import { SensitiveBlob } from "../src/sensitive.ts";

const encodeSensitiveBlob = S.encodeSync(SensitiveBlob as any) as (
  input: Uint8Array,
) => string;

describe("SensitiveBlob", () => {
  it("encodes small blobs correctly", () => {
    const bytes = Uint8Array.from([0, 1, 2, 253, 254, 255]);

    expect(encodeSensitiveBlob(bytes)).toBe("AAEC/f7/");
  });

  it("encodes large blobs without overflowing the stack", () => {
    const bytes = new Uint8Array(5_000_000);

    expect(() => encodeSensitiveBlob(bytes)).not.toThrow();
    expect(encodeSensitiveBlob(bytes).length).toBeGreaterThan(0);
  });
});
